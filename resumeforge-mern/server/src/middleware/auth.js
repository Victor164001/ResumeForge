import User from '../models/User.js';
import { verifyToken } from '../utils/token.js';
import { asyncHandler, HttpError } from '../utils/http.js';

/* Require a valid `Authorization: Bearer <jwt>` header; attaches req.user. */
export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new HttpError(401, 'Sign in to continue.');

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new HttpError(401, 'Your session has expired. Sign in again.');
  }

  const user = await User.findById(payload.sub);
  if (!user) throw new HttpError(401, 'This account no longer exists.');
  req.user = user;
  next();
});
