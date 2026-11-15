import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { api, tokenStore } from '../api/client.js';
import { guestHasWork, migrateGuestToAccount } from '../store/stores.js';
import { useUi } from './UiContext.jsx';
import AuthForm from '../components/AuthForm.jsx';

/* Signing in is optional: guests can use everything and their work is kept in
   the browser. `requireAuth()` opens a sign-in / create-account dialog only when
   an action needs an account (downloading), and resolves true once signed in.
   On sign-in, the guest's edited resumes and cover letter move into the account. */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { showToast } = useUi();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => !!tokenStore.get());
  const [dialog, setDialog] = useState(null); // { mode, reason, resolve }
  const beforeAuth = useRef(new Set());

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  useEffect(() => {
    if (!tokenStore.get()) return;
    api('/auth/me')
      .then((r) => setUser(r.user))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [logout]);

  useEffect(() => {
    const onUnauthorized = () => logout();
    window.addEventListener('resumeforge:unauthorized', onUnauthorized);
    return () => window.removeEventListener('resumeforge:unauthorized', onUnauthorized);
  }, [logout]);

  /* Editors register their "save now" here so nothing typed is lost when the
     guest's work moves into the account. */
  const registerBeforeAuth = useCallback((fn) => {
    beforeAuth.current.add(fn);
    return () => { beforeAuth.current.delete(fn); };
  }, []);
  const runBeforeAuth = () => Promise.allSettled([...beforeAuth.current].map((fn) => fn()));

  const finishAuth = useCallback(async (r) => {
    tokenStore.set(r.token);
    try {
      const moved = await migrateGuestToAccount();
      if (moved) showToast(moved === 1 ? 'Your resume is now saved to your account.' : `Your ${moved} resumes are now saved to your account.`);
    } catch (e) {
      showToast(`Signed in, but your browser work couldn’t be moved yet (${e.message}). It’s still saved in this browser.`);
    }
    setUser(r.user);
  }, [showToast]);

  const login = useCallback(async (email, password) => {
    await runBeforeAuth();
    const r = await api('/auth/login', { method: 'POST', body: { email, password } });
    await finishAuth(r);
  }, [finishAuth]);

  const register = useCallback(async (name, email, password) => {
    await runBeforeAuth();
    /* skip the server's example resume when the guest already built their own */
    const r = await api('/auth/register', { method: 'POST', body: { name, email, password, starter: !guestHasWork() } });
    await finishAuth(r);
  }, [finishAuth]);

  /* Resolves true when signed in (immediately if already), false if the dialog is closed. */
  const requireAuth = useCallback((opts = {}) => {
    if (user) return Promise.resolve(true);
    return new Promise((resolve) => setDialog({ mode: opts.mode || 'register', reason: opts.reason, resolve }));
  }, [user]);

  const closeDialog = (ok) => {
    dialog?.resolve(ok);
    setDialog(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, requireAuth, registerBeforeAuth }),
    [user, loading, login, register, logout, requireAuth, registerBeforeAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {dialog && <AuthDialog dialog={dialog} onClose={closeDialog} />}
    </AuthContext.Provider>
  );
}

function AuthDialog({ dialog, onClose }) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCloseRef.current(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(false); }}>
      <div className="modal-box auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button type="button" className="tiny-icon-btn auth-modal-close" aria-label="Close" onClick={() => onClose(false)}>×</button>
        <AuthForm initialMode={dialog.mode} reason={dialog.reason} onDone={() => onClose(true)} />
      </div>
    </div>
  );
}

export const useAuth = () => useContext(AuthContext);
