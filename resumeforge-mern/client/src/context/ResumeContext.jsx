import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useUi } from './UiContext.jsx';
import { useAuth } from './AuthContext.jsx';
import { activeKey } from '../store/stores.js';

/* Owns the resume library and the active resume being edited.
   - `store` is the browser store for guests or the API store for signed-in users;
     both have the same methods, so nothing below cares which one it is.
   - `resume` is the active resume's data object (the builder's single source of truth).
   - every edit goes through `update(mutator)`, which clones, mutates, records undo
     history and queues a debounced autosave.
   - continuous typing in one field collapses into one undo step per burst. */
const ResumeContext = createContext(null);
const SAVE_DELAY = 700;

export function ResumeProvider({ store, children }) {
  const { showToast } = useUi();
  const { registerBeforeAuth } = useAuth();
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
  const ACTIVE_KEY = activeKey(store.scope);

  const setResume = (next) => { resumeRef.current = next; setResumeState(next); };
  const setActiveId = (id) => {
    activeIdRef.current = id;
    setActiveIdState(id);
    try { localStorage.setItem(ACTIVE_KEY, id); } catch { /* storage blocked */ }
  };
  const resetHistory = () => { history.current = []; future.current = []; typingPending.current = true; bump(); };
  const activityChanged = () => window.dispatchEvent(new Event('resumeforge:activity'));

  /* ---------- saving ---------- */
  const flushSave = useCallback(async () => {
    clearTimeout(saveTimer.current);
    const job = pending.current;
    if (!job) return;
    pending.current = null;
    try {
      const r = await store.updateResume(job.id, { data: job.data });
      setLibrary((lib) => lib.map((x) => (x.id === r.id ? { ...x, ...r } : x)));
      setLastSavedAt(Date.now());
      setSaveStatus(pending.current ? 'saving' : 'saved');
    } catch (e) {
      setSaveStatus('error');
      showToast(`Couldn’t save: ${e.message} Retrying…`);
      /* keep the unsaved edit and try again, e.g. while a sleeping server wakes up */
      if (!pending.current && e.status !== 401 && e.status !== 404) {
        pending.current = job;
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => flushSaveRef.current(), 5000);
      }
    }
  }, [store, showToast]);
  const flushSaveRef = useRef(flushSave);
  flushSaveRef.current = flushSave;

  /* Signing in moves the guest's work into the account, so unsaved edits go first. */
  useEffect(() => registerBeforeAuth(() => flushSaveRef.current()), [registerBeforeAuth]);

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
      if (job) store.updateResume(job.id, { data: job.data }, { keepalive: true }).catch(() => {});
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [store]);

  /* ---------- loading ---------- */
  const openResume = useCallback(async (id) => {
    await flushSave();
    const r = await store.getResume(id);
    setActiveId(id);
    setResume(r.data);
    resetHistory();
    setLastSavedAt(null);
    setSaveStatus('idle');
    return r;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, flushSave]);

  const refreshLibrary = useCallback(async () => {
    const list = await store.listResumes();
    setLibrary(list);
    return list;
  }, [store]);

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
  }, [refreshLibrary, openResume, showToast, ACTIVE_KEY]);

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
    const r = await store.createResume(name, data);
    setLibrary((lib) => [r, ...lib]);
    setActiveId(r.id);
    setResume(r.data);
    resetHistory();
    activityChanged();
    return r;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, flushSave]);

  const duplicateResume = useCallback(async (id) => {
    await flushSave();
    const r = await store.duplicateResume(id);
    setLibrary((lib) => [r, ...lib]);
    activityChanged();
    return r;
  }, [store, flushSave]);

  const renameResume = useCallback(async (id, name) => {
    const r = await store.updateResume(id, { name });
    setLibrary((lib) => lib.map((x) => (x.id === id ? { ...x, ...r } : x)));
  }, [store]);

  const deleteResume = useCallback(async (id) => {
    if (pending.current?.id === id) { pending.current = null; clearTimeout(saveTimer.current); }
    await store.deleteResume(id);
    const remaining = library.filter((x) => x.id !== id);
    setLibrary(remaining);
    if (activeIdRef.current === id && remaining[0]) await openResume(remaining[0].id);
    activityChanged();
  }, [store, library, openResume]);

  /* Data for any resume: live state for the active one, fetched otherwise. */
  const getResumeData = useCallback(async (id) => {
    if (id === activeIdRef.current && resumeRef.current) return resumeRef.current;
    return (await store.getResume(id)).data;
  }, [store]);

  const value = useMemo(() => ({
    store, isGuest: store.scope === 'guest',
    library, activeId, resume, loading, saveStatus, lastSavedAt,
    canUndo: history.current.length > 0, canRedo: future.current.length > 0,
    update, replaceResume, undo, redo, flushSave,
    openResume, refreshLibrary, createResume, duplicateResume, renameResume, deleteResume, getResumeData,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [store, library, activeId, resume, loading, saveStatus, lastSavedAt, history.current.length, future.current.length,
    update, replaceResume, undo, redo, flushSave, openResume, refreshLibrary, createResume, duplicateResume,
    renameResume, deleteResume, getResumeData]);

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export const useResume = () => useContext(ResumeContext);

/* Count an event (template view, export) in whichever store is active. */
export function useTrack() {
  const { store } = useResume();
  return useCallback((statKey, message) => {
    const calls = [];
    if (statKey) calls.push(store.incrementStat(statKey));
    if (message) calls.push(store.addActivity(message));
    return Promise.allSettled(calls).then(() => window.dispatchEvent(new Event('resumeforge:activity')));
  }, [store]);
}
