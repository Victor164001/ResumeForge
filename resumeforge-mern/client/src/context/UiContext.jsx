import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/* Toasts plus promise-based prompt/confirm dialogs (replacing window.prompt/confirm). */
const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', show: false });
  const toastTimer = useRef();
  const [dialog, setDialog] = useState(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400);
  }, []);

  const prompt = useCallback(
    (opts) => new Promise((resolve) => setDialog({ kind: 'prompt', opts, resolve })),
    []
  );
  const confirm = useCallback(
    (opts) => new Promise((resolve) => setDialog({ kind: 'confirm', opts, resolve })),
    []
  );

  const close = (value) => {
    dialog?.resolve(value);
    setDialog(null);
  };

  const value = useMemo(() => ({ showToast, prompt, confirm }), [showToast, prompt, confirm]);

  return (
    <UiContext.Provider value={value}>
      {children}
      <div className={`toast${toast.show ? ' show' : ''}`} role="status" aria-live="polite">{toast.msg}</div>
      {dialog && <Dialog dialog={dialog} onClose={close} />}
    </UiContext.Provider>
  );
}

function Dialog({ dialog, onClose }) {
  const { kind, opts } = dialog;
  const [value, setValue] = useState(opts.defaultValue || '');
  const inputRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCloseRef.current(kind === 'prompt' ? null : false); };
    document.addEventListener('keydown', onKey);
    if (inputRef.current) { inputRef.current.focus(); inputRef.current.select(); }
    return () => document.removeEventListener('keydown', onKey);
  }, [kind]);

  const submit = (e) => {
    e?.preventDefault();
    if (kind === 'prompt') {
      const v = value.trim();
      if (!v) { inputRef.current?.focus(); return; }
      onClose(v);
    } else onClose(true);
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(kind === 'prompt' ? null : false); }}>
      <form className="modal-box" onSubmit={submit} role="dialog" aria-modal="true">
        {opts.title && <h3>{opts.title}</h3>}
        {(opts.description || opts.message) && <p>{opts.description || opts.message}</p>}
        {kind === 'prompt' && (
          <input
            id="dialog-input"
            ref={inputRef}
            className="text-input"
            value={value}
            placeholder={opts.placeholder || ''}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={() => onClose(kind === 'prompt' ? null : false)}>Cancel</button>
          <button type="submit" className={`btn ${kind === 'prompt' ? 'btn-primary' : 'btn-accent'}`}>
            {opts.confirmLabel || (kind === 'prompt' ? 'Add' : 'Yes')}
          </button>
        </div>
      </form>
    </div>
  );
}

export const useUi = () => useContext(UiContext);
