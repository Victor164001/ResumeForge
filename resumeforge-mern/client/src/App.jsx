import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { ResumeProvider, useResume } from './context/ResumeContext.jsx';
import { apiStore, localStore } from './store/stores.js';
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

/* Open to everyone. Guests work from the browser store; signed-in users from the API.
   Switching (sign in / sign out) remounts the provider so it loads the right library. */
function AppLayout() {
  const { user, loading } = useAuth();
  if (loading) return <Splash text="Loading…" />;
  return (
    <ResumeProvider key={user ? user.id : 'guest'} store={user ? apiStore : localStore}>
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
      <Route element={<AppLayout />}>
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
