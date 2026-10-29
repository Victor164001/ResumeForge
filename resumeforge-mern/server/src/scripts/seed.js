/* Creates a demo account you can sign in with:
     email: demo@resumeforge.dev   password: demo12345
   Run with: npm run seed (from the server folder). Safe to re-run. */
import 'dotenv/config';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';
import Resume from '../models/Resume.js';
import { RF } from '../utils/resumeData.js';

const EMAIL = 'demo@resumeforge.dev';

await connectDB();
let user = await User.findOne({ email: EMAIL });
if (!user) {
  user = await User.create({ name: 'Alex Rivera', email: EMAIL, password: 'demo12345' });
  await Resume.create({ user: user._id, name: 'Senior PM - Example', data: RF.defaultState() });
  const harvard = RF.defaultState();
  harvard.templateId = 'harvard';
  await Resume.create({ user: user._id, name: 'Consulting - Example', data: harvard });
  console.log(`Created demo user ${EMAIL} / demo12345`);
} else {
  console.log(`Demo user ${EMAIL} already exists`);
}
await disconnectDB();
