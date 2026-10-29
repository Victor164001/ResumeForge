import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={location.state?.from || '/'} replace />;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isRegister && form.password.length < 8) { setError('Use a password of at least 8 characters.'); return; }
    setBusy(true);
    try {
      if (isRegister) await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="brand">Resume<em>Forge</em></div>
        <h1 className="auth-title">Resumes that survive the software screen.</h1>
        <p className="auth-sub">Single-column templates, a transparent ATS checklist, and PDF or Word exports with real, selectable text. Your resumes are saved to your account.</p>
      </div>

      <form className="auth-card" onSubmit={onSubmit} noValidate>
        <h2>{isRegister ? 'Create your account' : 'Sign in'}</h2>
        <p className="auth-card-sub">
          {isRegister ? 'Already have an account? ' : 'New to ResumeForge? '}
          <Link to={isRegister ? '/login' : '/register'} state={location.state}>{isRegister ? 'Sign in' : 'Create an account'}</Link>
        </p>

        {isRegister && (
          <div className="field">
            <label htmlFor="auth-name">Full name</label>
            <input id="auth-name" name="name" autoComplete="name" value={form.name} onChange={onChange} required />
          </div>
        )}
        <div className="field">
          <label htmlFor="auth-email">Email</label>
          <input id="auth-email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required />
        </div>
        <div className="field">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={form.password}
            onChange={onChange}
            required
          />
          {isRegister && <div className="field-help">At least 8 characters.</div>}
        </div>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <button type="submit" className="tb-btn primary lg auth-submit" disabled={busy}>
          {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
