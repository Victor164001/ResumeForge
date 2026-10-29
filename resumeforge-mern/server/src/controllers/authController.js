import User from '../models/User.js';
import Resume from '../models/Resume.js';
import { signToken } from '../utils/token.js';
import { asyncHandler, HttpError } from '../utils/http.js';
import { logActivity } from '../utils/activity.js';
import { RF } from '../utils/resumeData.js';

function authResponse(res, user, status = 200) {
  res.status(status).json({ token: signToken(user._id), user: user.toJSON() });
}

/* POST /api/auth/register  { name, email, password } */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password) {
    throw new HttpError(400, 'Name, email and password are required.');
  }
  if (String(password).length < 8) throw new HttpError(400, 'Use a password of at least 8 characters.');

  const exists = await User.exists({ email: String(email).toLowerCase().trim() });
  if (exists) throw new HttpError(409, 'An account with that email already exists. Sign in instead.');

  const user = await User.create({ name, email, password });

  /* Every account starts with one example resume, pre-filled with the name they signed up with. */
  const data = RF.defaultState();
  data.heading.name = user.name;
  const emailContact = data.heading.contacts.find((c) => c.label === 'Email');
  if (emailContact) emailContact.value = user.email;
  await Resume.create({ user: user._id, name: `${user.name}'s Resume`, data });
  await logActivity(user._id, 'Created your account');

  authResponse(res, user, 201);
});

/* POST /api/auth/login  { email, password } */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) throw new HttpError(400, 'Enter your email and password.');
  const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select('+password');
  if (!user || !(await user.comparePassword(String(password)))) {
    throw new HttpError(401, 'That email and password don’t match an account.');
  }
  authResponse(res, user);
});

/* GET /api/auth/me */
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toJSON() });
});

/* PATCH /api/auth/me  { name } */
export const updateMe = asyncHandler(async (req, res) => {
  const { name } = req.body || {};
  if (name !== undefined) {
    if (!String(name).trim()) throw new HttpError(400, 'Name can’t be empty.');
    req.user.name = String(name).trim();
  }
  await req.user.save();
  res.json({ user: req.user.toJSON() });
});
