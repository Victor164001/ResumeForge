import Resume from '../models/Resume.js';
import { asyncHandler, HttpError } from '../utils/http.js';
import { atsScore } from '../utils/resumeData.js';

const COUNTERS = ['templateViews', 'exportsCount'];

/* GET /api/stats -> dashboard numbers, all computed from the user's real data */
export const getStats = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).select('data').lean();
  const avg = resumes.length
    ? Math.round(resumes.reduce((sum, r) => sum + atsScore(r.data), 0) / resumes.length)
    : 0;
  res.json({
    resumeCount: resumes.length,
    templateViews: req.user.stats?.templateViews || 0,
    exportsCount: req.user.stats?.exportsCount || 0,
    averageAtsScore: avg,
  });
});

/* POST /api/stats/:key/increment */
export const incrementStat = asyncHandler(async (req, res) => {
  const { key } = req.params;
  if (!COUNTERS.includes(key)) throw new HttpError(400, `Unknown counter "${key}".`);
  req.user.stats[key] = (req.user.stats[key] || 0) + 1;
  await req.user.save();
  res.json({ [key]: req.user.stats[key] });
});
