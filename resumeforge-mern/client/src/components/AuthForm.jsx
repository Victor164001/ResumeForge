import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Icon from './Icon.jsx';

/* Sign-in / create-account form, used in the download dialog and on /login, /register. */
export default function AuthForm({ initialMode = 'register', reason, onDone, onModeChange }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const isRegister = mode === 'register';

  const switchMode = (m) => {
    setMode(m);
    setError('');
    onModeChange?.(m);
  };
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isRegister && !form.name.trim()) { setError('Enter your name.'); return; }
    if (!form.email.trim() || !form.password) { setError('Enter your email and password.'); return; }
    if (isRegister && form.password.length < 8) { setError('Use a password of at least 8 characters.'); return; }
    setBusy(true);
    try {
      if (isRegister) await register(form.name.trim(), form.email.trim(), form.password);
      else await login(form.email.trim(), form.password);
      onDone?.();
    } catch (err) {
      setError(err.status === 409
        ? 'An account with that email already exists. Sign in instead.'
        : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <h2 id="auth-title">{isRegister ? 'Create your free account' : 'Sign in'}</h2>
      {reason && <p className="auth-reason">{reason}</p>}

      <div className="auth-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={isRegister} className={`auth-tab${isRegister ? ' active' : ''}`} onClick={() => switchMode('register')}>
          New here
        </button>
        <button type="button" role="tab" aria-selected={!isRegister} className={`auth-tab${!isRegister ? ' active' : ''}`} onClick={() => switchMode('login')}>
          I have an account
        </button>
      </div>

      {isRegister && (
        <div className="field">
          <label htmlFor="auth-name">Full name</label>
          <input id="auth-name" name="name" autoComplete="name" value={form.name} onChange={onChange} />
        </div>
      )}
      <div className="field">
        <label htmlFor="auth-email">Email</label>
        <input id="auth-email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} />
      </div>
      <div className="field">
        <label htmlFor="auth-password">Password</label>
        <div className="password-wrap">
          <input
            id="auth-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={form.password}
            onChange={onChange}
          />
          <button
            type="button"
            className="password-toggle"
            aria-pressed={showPassword}
            aria-controls="auth-password"
            onClick={() => setShowPassword((s) => !s)}
          >
            <Icon name={showPassword ? 'eyeOff' : 'eye'} size={15} />
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        {isRegister && <div className="field-help">At least 8 characters.</div>}
      </div>

      {error && (
        <div className="auth-error" role="alert">
          {error}
          {isRegister && /already exists/.test(error) && (
            <> <button type="button" className="link-inline" onClick={() => switchMode('login')}>Sign in</button></>
          )}
        </div>
      )}

      <button type="submit" className="tb-btn primary lg auth-submit" disabled={busy}>
        {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
      </button>
    </form>
  );
}
