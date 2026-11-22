/* Vercel entry point: the whole Express API runs as one serverless function.
   vercel.json rewrites every /api/* request here; Express still sees the
   original path (/api/resumes, /api/auth/login...), so routes are unchanged.
   The React app is served as static files from client/dist. */
import { createApp } from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

const app = createApp();

/* Reuse one MongoDB connection across requests on a warm function;
   retry on the next request if connecting failed. */
let ready = null;
function ensureDB() {
  if (!ready) {
    ready = connectDB().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}

export default async function handler(req, res) {
  try {
    await ensureDB();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'The database is unavailable right now. Try again in a moment.' }));
    return;
  }
  return app(req, res);
}
