import Resume from '../models/Resume.js';
import { asyncHandler, HttpError } from '../utils/http.js';
import { logActivity } from '../utils/activity.js';
import { cleanResumeData, serializeResume, RF } from '../utils/resumeData.js';

async function findOwned(req) {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) throw new HttpError(404, 'Resume not found.');
  return resume;
}

function cleanName(name, fallback) {
  const n = String(name ?? '').trim().slice(0, 120);
  return n || fallback;
}

/* GET /api/resumes  -> summaries, newest first (always at least one) */
export const listResumes = asyncHandler(async (req, res) => {
  let docs = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
  if (!docs.length) {
    const data = RF.defaultState();
    data.heading.name = req.user.name;
    docs = [await Resume.create({ user: req.user._id, name: 'My Resume', data })];
  }
  res.json({ resumes: docs.map((d) => serializeResume(d)) });
});

/* GET /api/resumes/:id  -> full resume including editable data */
export const getResume = asyncHandler(async (req, res) => {
  const resume = await findOwned(req);
  res.json({ resume: serializeResume(resume, { full: true }) });
});

/* POST /api/resumes  { name, data? } */
export const createResume = asyncHandler(async (req, res) => {
  const name = cleanName(req.body?.name, 'Untitled Resume');
  const data = req.body?.data ? cleanResumeData(req.body.data) : RF.defaultState();
  const resume = await Resume.create({ user: req.user._id, name, data });
  await logActivity(req.user._id, `Created “${name}”`);
  res.status(201).json({ resume: serializeResume(resume, { full: true }) });
});

/* PUT /api/resumes/:id  { name?, data? } - the builder autosaves here */
export const updateResume = asyncHandler(async (req, res) => {
  const resume = await findOwned(req);
  if (req.body?.name !== undefined) resume.name = cleanName(req.body.name, resume.name);
  if (req.body?.data !== undefined) {
    resume.data = cleanResumeData(req.body.data);
    resume.markModified('data');
  }
  await resume.save();
  res.json({ resume: serializeResume(resume) });
});

/* POST /api/resumes/:id/duplicate */
export const duplicateResume = asyncHandler(async (req, res) => {
  const src = await findOwned(req);
  const copy = await Resume.create({
    user: req.user._id,
    name: cleanName(`${src.name} (Copy)`, 'Untitled Resume'),
    data: structuredClone(src.data),
  });
  await logActivity(req.user._id, `Duplicated “${src.name}”`);
  res.status(201).json({ resume: serializeResume(copy) });
});

/* DELETE /api/resumes/:id - the last remaining resume can't be deleted */
export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await findOwned(req);
  const count = await Resume.countDocuments({ user: req.user._id });
  if (count <= 1) throw new HttpError(400, 'You need at least one resume. Create another before deleting this one.');
  await resume.deleteOne();
  await logActivity(req.user._id, `Deleted “${resume.name}”`);
  res.status(204).end();
});

/* GET /api/resumes/:id/ats -> full checklist from the shared scorer */
export const resumeAts = asyncHandler(async (req, res) => {
  const resume = await findOwned(req);
  res.json(RF.scoreAts(resume.data));
});
