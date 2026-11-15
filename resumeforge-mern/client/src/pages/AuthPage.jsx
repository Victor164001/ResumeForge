import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.jsx';
import Logo from '../components/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/* Optional full-page sign-in (the app itself never requires it until you download). */
export default function AuthPage({ mode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.state?.from || '/';

  if (user) return <Navigate to={next} replace />;

  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <div className="brand"><Logo size={30} /><span>Resume<em>Forge</em></span></div>
        <h1 className="auth-title">Resumes that survive the software screen.</h1>
        <p className="auth-sub">
          Build without an account. Sign in when you want to download, and everything you made in this browser is saved to your account.
        </p>
      </div>
      <div className="auth-card">
        <AuthForm
          initialMode={mode}
          onDone={() => navigate(next, { replace: true })}
          onModeChange={(m) => navigate(m === 'login' ? '/login' : '/register', { replace: true, state: location.state })}
        />
      </div>
    </div>
  );
}
