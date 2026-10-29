import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { ResumeProvider, useResume } from './context/ResumeContext.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Builder from './pages/builder/Builder.jsx';
import Templates from './pages/Templates.jsx';
import MyResumes from './pages/MyResumes.jsx';
import AtsChecker from './pages/AtsChecker.jsx';
import CoverLetter from './pages/CoverLetter.jsx';
import Examples from './pages/Examples.jsx';
import Tips from './pages/Tips.jsx';

function Splash({ text }) {
  return <div className="splash">{text}</div>;
}

/* Signed-in shell: loads the resume library, then shows the navbar + page. */
function ProtectedLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Splash text="Loading your account…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return (
    <ResumeProvider key={user.id}>
      <Shell />
    </ResumeProvider>
  );
}

function Shell() {
  const { loading, resume } = useResume();
  return (
    <>
      <Navbar />
      {loading || !resume ? <Splash text="Loading your resumes…" /> : <Outlet />}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder" element={<Builder />} />
        <Route path="templates" element={<Templates />} />
        <Route path="resumes" element={<MyResumes />} />
        <Route path="ats" element={<AtsChecker />} />
        <Route path="cover-letter" element={<CoverLetter />} />
        <Route path="examples" element={<Examples />} />
        <Route path="tips" element={<Tips />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
