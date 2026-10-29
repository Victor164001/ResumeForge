import RF from '../../../shared/core.js';
import { HttpError } from './http.js';

const MAX_SECTIONS = 40;

/* Validate and normalise an incoming resume body using the shared core.
   Throws a 400 when the payload isn't a resume the builder could render. */
export function cleanResumeData(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new HttpError(400, 'Resume data must be an object.');
  }
  const data = RF.migrate(structuredClone(input));
  if (!data) throw new HttpError(400, 'Resume data needs a sections list.');
  if (!data.heading || typeof data.heading !== 'object' || !Array.isArray(data.heading.contacts)) {
    throw new HttpError(400, 'Resume data needs a heading with a contacts list.');
  }
  if (!Array.isArray(data.sections) || data.sections.length > MAX_SECTIONS) {
    throw new HttpError(400, `A resume can have at most ${MAX_SECTIONS} sections.`);
  }
  if (!['classic', 'harvard', 'modern'].includes(data.templateId)) data.templateId = 'classic';
  if (!['letter', 'a4'].includes(data.pageSize)) data.pageSize = 'letter';
  return data;
}

export function atsScore(data) {
  try {
    return RF.scoreAts(data).score;
  } catch {
    return 0;
  }
}

/* Shape sent to the client. `full` includes the editable body. */
export function serializeResume(doc, { full = false } = {}) {
  const out = {
    id: doc._id.toString(),
    name: doc.name,
    templateId: doc.data?.templateId || 'classic',
    updatedAt: doc.updatedAt,
    createdAt: doc.createdAt,
    atsScore: atsScore(doc.data),
  };
  if (full) out.data = doc.data;
  return out;
}

export { RF };
