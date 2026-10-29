import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { api } from '../api/client.js';
import { useUi } from './UiContext.jsx';

/* Owns the resume library and the active resume being edited.
   - `resume` is the active resume's data object (the builder's single source of truth).
   - every edit goes through `update(mutator)`, which clones, mutates, records undo
     history and queues a debounced autosave (PUT /api/resumes/:id).
   - continuous typing collapses into one undo step per burst. */
const ResumeContext = createContext(null);
const ACTIVE_KEY = 'resumeforge:active-resume';
const SAVE_DELAY = 700;

export function ResumeProvider({ children }) {
  const { showToast } = useUi();
  const [library, setLibrary] = useState([]);
  const [activeId, setActiveIdState] = useState(null);
  const [resume, setResumeState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [, bump] = useReducer((x) => x + 1, 0);

  const resumeRef = useRef(null);
  const activeIdRef = useRef(null);
  const history = useRef([]);
  const future = useRef([]);
  const typingPending = useRef(true);
  const typingTimer = useRef();
  const typingField = useRef('');
  const pending = useRef(null);
  const saveTimer = useRef();

  const setResume = (next) => { resumeRef.current = next; setResumeState(next); };
  const setActiveId = (id) => {
    activeIdRef.current = id;
    setActiveIdState(id);
    try { localStorage.setItem(ACTIVE_KEY, id); } catch { /* storage blocked */ }
  };
  const resetHistory = () => { history.current = []; future.current = []; typingPending.current = true; bump(); };

  /* ---------- saving ---------- */
  const flushSave = useCallback(async () => {
    clearTimeout(saveTimer.current);
    const job = pending.current;
    if (!job) return;
    pending.current = null;
    try {
      const r = await api(`/resumes/${job.id}`, { method: 'PUT', body: { data: job.data } });
      setLibrary((lib) => lib.map((x) => (x.id === r.resume.id ? { ...x, ...r.resume } : x)));
      setLastSavedAt(Date.now());
      setSaveStatus(pending.current ? 'saving' : 'saved');
    } catch (e) {
      setSaveStatus('error');
      showToast(`Couldn’t save: ${e.message}`);
    }
  }, [showToast]);

  const queueSave = useCallback((data) => {
    pending.current = { id: activeIdRef.current, data };
    setSaveStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, SAVE_DELAY);
  }, [flushSave]);

  /* Save unsent edits if the tab closes mid-debounce. */
  useEffect(() => {
    const onUnload = () => {
      const job = pending.current;
      if (job) api(`/resumes/${job.id}`, { method: 'PUT', body: { data: job.data }, keepalive: true }).catch(() => {});
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, []);

  /* ---------- loading ---------- */
  const openResume = useCallback(async (id) => {
    await flushSave();
    const r = await api(`/resumes/${id}`);
    setActiveId(id);
    setResume(r.resume.data);
    resetHistory();
    setLastSavedAt(null);
    setSaveStatus('idle');
    return r.resume;
  }, [flushSave]);

  const refreshLibrary = useCallback(async () => {
    const r = await api('/resumes');
    setLibrary(r.resumes);
    return r.resumes;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await refreshLibrary();
        let stored = null;
        try { stored = localStorage.getItem(ACTIVE_KEY); } catch { /* ignore */ }
        const first = list.find((r) => r.id === stored) || list[0];
        if (first && !cancelled) await openResume(first.id);
      } catch (e) {
        showToast(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [refreshLibrary, openResume, showToast]);

  /* ---------- editing ---------- */
  const snapshot = () => {
    history.current.push(resumeRef.current);
    if (history.current.length > 60) history.current.shift();
    future.current = [];
    bump();
  };

  const update = useCallback((mutator, { typing = false } = {}) => {
    const cur = resumeRef.current;
    if (!cur) return;
    if (typing) {
      /* a new burst starts after a pause or when the user moves to another field */
      const field = typeof document !== 'undefined' ? document.activeElement?.id || '' : '';
      if (typingPending.current || field !== typingField.current) {
        snapshot();
        typingPending.current = false;
        typingField.current = field;
      }
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => { typingPending.current = true; }, 800);
    } else {
      snapshot();
      typingPending.current = true;
    }
    const next = structuredClone(cur);
    mutator(next);
    setResume(next);
    queueSave(next);
  }, [queueSave]);

  const replaceResume = useCallback((data) => {
    snapshot();
    setResume(data);
    queueSave(data);
  }, [queueSave]);

  const undo = useCallback(() => {
    if (!history.current.length) return;
    future.current.push(resumeRef.current);
    const prev = history.current.pop();
    typingPending.current = true;
    setResume(prev);
    queueSave(prev);
    bump();
  }, [queueSave]);

  const redo = useCallback(() => {
    if (!future.current.length) return;
    history.current.push(resumeRef.current);
    const next = future.current.pop();
    typingPending.current = true;
    setResume(next);
    queueSave(next);
    bump();
  }, [queueSave]);

  /* ---------- library actions ---------- */
  const createResume = useCallback(async (name, data) => {
    await flushSave();
    const r = await api('/resumes', { method: 'POST', body: { name, data } });
    setLibrary((lib) => [r.resume, ...lib]);
    setActiveId(r.resume.id);
    setResume(r.resume.data);
    resetHistory();
    window.dispatchEvent(new Event('resumeforge:activity'));
    return r.resume;
  }, [flushSave]);

  const duplicateResume = useCallback(async (id) => {
    await flushSave();
    const r = await api(`/resumes/${id}/duplicate`, { method: 'POST' });
    setLibrary((lib) => [r.resume, ...lib]);
    window.dispatchEvent(new Event('resumeforge:activity'));
    return r.resume;
  }, [flushSave]);

  const renameResume = useCallback(async (id, name) => {
    const r = await api(`/resumes/${id}`, { method: 'PUT', body: { name } });
    setLibrary((lib) => lib.map((x) => (x.id === id ? { ...x, ...r.resume } : x)));
  }, []);

  const deleteResume = useCallback(async (id) => {
    if (pending.current?.id === id) { pending.current = null; clearTimeout(saveTimer.current); }
    await api(`/resumes/${id}`, { method: 'DELETE' });
    const remaining = library.filter((x) => x.id !== id);
    setLibrary(remaining);
    if (activeIdRef.current === id && remaining[0]) await openResume(remaining[0].id);
    window.dispatchEvent(new Event('resumeforge:activity'));
  }, [library, openResume]);

  /* Data for any resume: live state for the active one, fetched otherwise. */
  const getResumeData = useCallback(async (id) => {
    if (id === activeIdRef.current && resumeRef.current) return resumeRef.current;
    const r = await api(`/resumes/${id}`);
    return r.resume.data;
  }, []);

  const value = useMemo(() => ({
    library, activeId, resume, loading, saveStatus, lastSavedAt,
    canUndo: history.current.length > 0, canRedo: future.current.length > 0,
    update, replaceResume, undo, redo, flushSave,
    openResume, refreshLibrary, createResume, duplicateResume, renameResume, deleteResume, getResumeData,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [library, activeId, resume, loading, saveStatus, lastSavedAt, history.current.length, future.current.length,
    update, replaceResume, undo, redo, flushSave, openResume, refreshLibrary, createResume, duplicateResume,
    renameResume, deleteResume, getResumeData]);

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export const useResume = () => useContext(ResumeContext);
