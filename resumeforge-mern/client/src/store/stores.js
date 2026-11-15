/* Two interchangeable stores with the same methods:
   - localStore: guests. Everything lives in this browser (localStorage).
   - apiStore:   signed-in users. Everything lives in MongoDB via the Express API.
   Pages never talk to either directly; they get the current one from ResumeContext. */
import RF from '@shared/core.js';
import { api } from '../api/client.js';

/* ---------------- summaries ---------------- */
function atsScore(data) {
  try { return RF.scoreAts(data).score; } catch { return 0; }
}
function summary(r, full = false) {
  const out = {
    id: r.id, name: r.name, templateId: r.data?.templateId || 'classic',
    updatedAt: r.updatedAt, createdAt: r.createdAt, atsScore: atsScore(r.data),
  };
  if (full) out.data = r.data;
  return out;
}

/* ---------------- API store ---------------- */
export const apiStore = {
  scope: 'account',
  async listResumes() { return (await api('/resumes')).resumes; },
  async getResume(id) { return (await api(`/resumes/${id}`)).resume; },
  async createResume(name, data) { return (await api('/resumes', { method: 'POST', body: { name, data } })).resume; },
  async updateResume(id, patch, opts = {}) {
    return (await api(`/resumes/${id}`, { method: 'PUT', body: patch, keepalive: !!opts.keepalive })).resume;
  },
  async duplicateResume(id) { return (await api(`/resumes/${id}/duplicate`, { method: 'POST' })).resume; },
  async deleteResume(id) { await api(`/resumes/${id}`, { method: 'DELETE' }); },
  async atsFor(id) { return api(`/resumes/${id}/ats`); },
  async getCoverLetter() { return (await api('/cover-letter')).coverLetter; },
  async saveCoverLetter(cl) { return (await api('/cover-letter', { method: 'PUT', body: cl })).coverLetter; },
  async listActivity() { return api('/activity'); },
  async addActivity(message) { await api('/activity', { method: 'POST', body: { message } }); },
  async markActivitySeen() { await api('/activity/seen', { method: 'POST' }); },
  async getStats() { return api('/stats'); },
  async incrementStat(key) { await api(`/stats/${key}/increment`, { method: 'POST' }); },
};

/* ---------------- browser (guest) store ---------------- */
const GUEST_KEY = 'resumeforge:guest:v1';
let memoryFallback = null; // used when localStorage is blocked (private mode etc.)

function emptyGuest() {
  return { resumes: [], cover: null, coverTouched: false, activity: [], activitySeenAt: 0, stats: { templateViews: 0 } };
}
function readGuest() {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    if (raw) return { ...emptyGuest(), ...JSON.parse(raw) };
  } catch { /* fall through */ }
  return memoryFallback ? structuredClone(memoryFallback) : emptyGuest();
}
function writeGuest(g) {
  memoryFallback = structuredClone(g);
  try { localStorage.setItem(GUEST_KEY, JSON.stringify(g)); } catch { /* keep in memory */ }
}
function mutateGuest(fn) {
  const g = readGuest();
  const out = fn(g);
  writeGuest(g);
  return out;
}
const now = () => new Date().toISOString();
function notFound() { const e = new Error('Resume not found.'); e.status = 404; return e; }
function logLocal(g, message) {
  g.activity.unshift({ id: RF.uid(), message, at: now() });
  g.activity = g.activity.slice(0, 15);
}
function cleanName(name, fallback) {
  const n = String(name ?? '').trim().slice(0, 120);
  return n || fallback;
}

export const localStore = {
  scope: 'guest',
  async listResumes() {
    return mutateGuest((g) => {
      if (!g.resumes.length) {
        /* first visit: one example resume to start from (not counted as the guest's own work) */
        g.resumes.push({ id: `local-${RF.uid()}`, name: 'My Resume', data: RF.defaultState(), createdAt: now(), updatedAt: now(), touched: false });
      }
      return g.resumes.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((r) => summary(r));
    });
  },
  async getResume(id) {
    const r = readGuest().resumes.find((x) => x.id === id);
    if (!r) throw notFound();
    return summary(r, true);
  },
  async createResume(name, data) {
    return mutateGuest((g) => {
      const r = {
        id: `local-${RF.uid()}`, name: cleanName(name, 'Untitled Resume'),
        data: data ? RF.migrate(structuredClone(data)) : RF.defaultState(),
        createdAt: now(), updatedAt: now(), touched: true,
      };
      g.resumes.push(r);
      logLocal(g, `Created “${r.name}”`);
      return summary(r, true);
    });
  },
  async updateResume(id, patch) {
    return mutateGuest((g) => {
      const r = g.resumes.find((x) => x.id === id);
      if (!r) throw notFound();
      if (patch.name !== undefined) r.name = cleanName(patch.name, r.name);
      if (patch.data !== undefined) r.data = patch.data;
      r.updatedAt = now();
      r.touched = true;
      return summary(r);
    });
  },
  async duplicateResume(id) {
    return mutateGuest((g) => {
      const src = g.resumes.find((x) => x.id === id);
      if (!src) throw notFound();
      const copy = { ...structuredClone(src), id: `local-${RF.uid()}`, name: cleanName(`${src.name} (Copy)`, 'Untitled Resume'), createdAt: now(), updatedAt: now(), touched: true };
      g.resumes.push(copy);
      logLocal(g, `Duplicated “${src.name}”`);
      return summary(copy);
    });
  },
  async deleteResume(id) {
    mutateGuest((g) => {
      const r = g.resumes.find((x) => x.id === id);
      if (!r) throw notFound();
      if (g.resumes.length <= 1) throw new Error('You need at least one resume. Create another before deleting this one.');
      g.resumes = g.resumes.filter((x) => x.id !== id);
      logLocal(g, `Deleted “${r.name}”`);
    });
  },
  async atsFor(id) {
    const r = readGuest().resumes.find((x) => x.id === id);
    if (!r) throw notFound();
    return RF.scoreAts(r.data);
  },
  async getCoverLetter() {
    const g = readGuest();
    if (g.cover) return g.cover;
    const latest = g.resumes.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    const heading = latest?.data?.heading || {};
    const firstContact = (heading.contacts || []).find((c) => (c.value || '').trim());
    return {
      applicantName: heading.name || '', applicantContact: firstContact?.value || '',
      recipientName: '', company: '', greeting: 'Dear Hiring Manager,',
      opening: '', body: '', closing: '', signoff: 'Sincerely,', updatedAt: null,
    };
  },
  async saveCoverLetter(cl) {
    return mutateGuest((g) => {
      g.cover = { ...cl, updatedAt: now() };
      g.coverTouched = true;
      return g.cover;
    });
  },
  async listActivity() {
    const g = readGuest();
    const seen = g.activitySeenAt || 0;
    return { items: g.activity, unseenCount: g.activity.filter((a) => new Date(a.at).getTime() > seen).length };
  },
  async addActivity(message) { mutateGuest((g) => logLocal(g, message)); },
  async markActivitySeen() { mutateGuest((g) => { g.activitySeenAt = Date.now(); }); },
  async getStats() {
    const g = readGuest();
    const avg = g.resumes.length ? Math.round(g.resumes.reduce((s, r) => s + atsScore(r.data), 0) / g.resumes.length) : 0;
    return { resumeCount: g.resumes.length, templateViews: g.stats.templateViews || 0, exportsCount: 0, averageAtsScore: avg };
  },
  async incrementStat(key) {
    mutateGuest((g) => { g.stats[key] = (g.stats[key] || 0) + 1; });
  },
};

/* ---------------- moving a guest's work into their account ---------------- */
export const activeKey = (scope) => `resumeforge:active-resume:${scope}`;

/* True when the guest has made something worth keeping (not just the untouched example). */
export function guestHasWork() {
  const g = readGuest();
  return g.resumes.some((r) => r.touched) || g.coverTouched;
}

/* Copy the guest's edited resumes and cover letter into the signed-in account,
   then clear them from the browser. Must run after the auth token is stored.
   The browser copy is kept if anything fails, so nothing is lost. */
export async function migrateGuestToAccount() {
  const g = readGuest();
  const resumes = g.resumes.filter((r) => r.touched).sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  let guestActive = null;
  try { guestActive = localStorage.getItem(activeKey('guest')); } catch { /* ignore */ }

  let newActive = null;
  for (const r of resumes) {
    const created = await apiStore.createResume(r.name, r.data);
    if (r.id === guestActive || !newActive) newActive = created.id;
    if (r.id === guestActive) guestActive = `done:${created.id}`;
  }
  if (g.coverTouched && g.cover) {
    const { updatedAt, ...cover } = g.cover; // eslint-disable-line no-unused-vars
    await apiStore.saveCoverLetter(cover);
  }
  if (resumes.length) {
    const active = guestActive?.startsWith('done:') ? guestActive.slice(5) : newActive;
    try { localStorage.setItem(activeKey('account'), active); } catch { /* ignore */ }
    await apiStore.addActivity(
      resumes.length === 1 ? 'Saved your resume from this browser to your account' : `Saved ${resumes.length} resumes from this browser to your account`
    ).catch(() => {});
  }
  writeGuest(emptyGuest());
  try { localStorage.removeItem(activeKey('guest')); } catch { /* ignore */ }
  return resumes.length;
}
