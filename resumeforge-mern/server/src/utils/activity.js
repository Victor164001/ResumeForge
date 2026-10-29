import Activity from '../models/Activity.js';

const KEEP = 15;

/* Record a real user event and keep only the most recent few per user. */
export async function logActivity(userId, message) {
  await Activity.create({ user: userId, message: String(message).slice(0, 200) });
  const stale = await Activity.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(KEEP)
    .select('_id')
    .lean();
  if (stale.length) await Activity.deleteMany({ _id: { $in: stale.map((a) => a._id) } });
}
