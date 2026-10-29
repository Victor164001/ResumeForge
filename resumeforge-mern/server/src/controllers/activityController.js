import Activity from '../models/Activity.js';
import { asyncHandler, HttpError } from '../utils/http.js';
import { logActivity } from '../utils/activity.js';

/* GET /api/activity -> { items, unseenCount } */
export const listActivity = asyncHandler(async (req, res) => {
  const items = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(15).lean();
  const seenAt = req.user.activitySeenAt || new Date(0);
  res.json({
    items: items.map((a) => ({ id: a._id.toString(), message: a.message, at: a.createdAt })),
    unseenCount: items.filter((a) => a.createdAt > seenAt).length,
  });
});

/* POST /api/activity  { message } - client-side events such as exports */
export const addActivity = asyncHandler(async (req, res) => {
  const message = String(req.body?.message || '').trim();
  if (!message) throw new HttpError(400, 'Activity needs a message.');
  await logActivity(req.user._id, message);
  res.status(201).json({ ok: true });
});

/* POST /api/activity/seen */
export const markSeen = asyncHandler(async (req, res) => {
  req.user.activitySeenAt = new Date();
  await req.user.save();
  res.json({ ok: true });
});
