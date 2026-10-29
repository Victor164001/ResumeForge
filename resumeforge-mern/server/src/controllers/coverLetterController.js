import CoverLetter, { COVER_FIELDS } from '../models/CoverLetter.js';
import Resume from '../models/Resume.js';
import { asyncHandler } from '../utils/http.js';

function serialize(doc) {
  const out = {};
  COVER_FIELDS.forEach((k) => { out[k] = doc[k] ?? ''; });
  out.updatedAt = doc.updatedAt || null;
  return out;
}

/* GET /api/cover-letter - the user's letter, or a draft seeded from their latest resume */
export const getCoverLetter = asyncHandler(async (req, res) => {
  const existing = await CoverLetter.findOne({ user: req.user._id });
  if (existing) return res.json({ coverLetter: serialize(existing) });

  const latest = await Resume.findOne({ user: req.user._id }).sort({ updatedAt: -1 }).lean();
  const heading = latest?.data?.heading || {};
  const firstContact = (heading.contacts || []).find((c) => (c.value || '').trim());
  res.json({
    coverLetter: serialize({
      applicantName: heading.name || req.user.name,
      applicantContact: firstContact?.value || req.user.email,
      greeting: 'Dear Hiring Manager,',
      signoff: 'Sincerely,',
    }),
  });
});

/* PUT /api/cover-letter - upsert; unknown fields are ignored */
export const saveCoverLetter = asyncHandler(async (req, res) => {
  const update = {};
  COVER_FIELDS.forEach((k) => {
    if (req.body?.[k] !== undefined) update[k] = String(req.body[k]);
  });
  const doc = await CoverLetter.findOneAndUpdate(
    { user: req.user._id },
    { $set: update, $setOnInsert: { user: req.user._id } },
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ coverLetter: serialize(doc) });
});
