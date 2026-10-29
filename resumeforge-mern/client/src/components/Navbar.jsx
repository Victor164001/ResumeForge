import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import RF from '@shared/core.js';
import Icon from './Icon.jsx';
import { api, track } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';
import { useTheme } from '../hooks/useTheme.js';
import { downloadBlob } from '../lib/download.js';
import { relativeTimeShort } from '../lib/time.js';

const TABS = [
  ['/', 'Dashboard'], ['/builder', 'Resume Builder'], ['/templates', 'Templates'],
  ['/resumes', 'My Resumes'], ['/ats', 'ATS Checker'], ['/cover-letter', 'Cover Letter'],
  ['/examples', 'Examples'], ['/tips', 'Guides & Tips'],
];

/* Close a popover when clicking outside it. */
function useOutsideClose(open, ref, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, ref, onClose]);
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="navbar">
      <div className="brand">Resume<em>Forge</em></div>
      <nav className="nav-tabs">
        {TABS.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}
            onClick={to === '/templates' ? () => track('templateViews') : undefined}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-right">
        <ActivityBell />
        <button type="button" className="icon-btn" title="Toggle light / dark" onClick={toggle}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}

function ActivityBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unseen, setUnseen] = useState(0);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClose(open, ref, close);

  const load = useCallback(() => {
    api('/activity').then((r) => { setItems(r.items); setUnseen(r.unseenCount); }).catch(() => {});
  }, []);

  useEffect(() => {
    load();
    window.addEventListener('resumeforge:activity', load);
    return () => window.removeEventListener('resumeforge:activity', load);
  }, [load]);

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next && unseen) {
      setUnseen(0);
      api('/activity/seen', { method: 'POST' }).catch(() => {});
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" className="icon-btn" title="Recent activity" onClick={toggleOpen}>
        <Icon name="bell" size={17} />
        {unseen > 0 && <span className="notif-dot" />}
      </button>
      {open && (
        <div className="activity-menu">
          <div className="activity-menu-head">Recent activity</div>
          {!items.length ? (
            <div className="activity-empty">Nothing yet - actions like creating, exporting or duplicating a resume will show up here.</div>
          ) : items.map((a) => (
            <div key={a.id} className="activity-row">
              <div>{a.message}</div>
              <div className="activity-time">{relativeTimeShort(a.at)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const { resume, replaceResume, flushSave } = useResume();
  const { showToast, confirm } = useUi();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const fileRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClose(open, ref, close);

  const name = user?.name || 'Account';

  const saveJson = () => {
    downloadBlob(new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' }), 'resume-data.json');
    close();
  };

  const loadJson = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = RF.migrate(JSON.parse(reader.result));
        if (!parsed) { showToast('That file isn’t a ResumeForge save.'); return; }
        replaceResume(parsed);
        navigate('/builder');
        showToast('Progress loaded into the open resume.');
      } catch {
        showToast('Couldn’t read that file.');
      }
    };
    reader.readAsText(f);
    close();
  };

  const startOver = async () => {
    close();
    const ok = await confirm({
      title: 'Start over?',
      message: 'This resets the open resume to the example content. You can undo it from the builder.',
      confirmLabel: 'Yes, reset it',
    });
    if (ok) { replaceResume(RF.defaultState()); navigate('/builder'); }
  };

  const signOut = async () => {
    close();
    await flushSave();
    logout();
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" className="profile-btn" onClick={() => setOpen((o) => !o)} title="Account and data">
        <span className="avatar-circle">{name.charAt(0).toUpperCase()}</span>
        <span className="profile-name">{name}</span>
        <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <div className="profile-menu">
          <div className="profile-menu-head">
            <div className="profile-menu-name">{user?.name}</div>
            <div className="profile-menu-email">{user?.email}</div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={saveJson} disabled={!resume}>Save progress (.json)</button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()} disabled={!resume}>Load progress (.json)</button>
          <input ref={fileRef} id="load-json" type="file" accept="application/json" hidden onChange={loadJson} />
          <button type="button" className="btn btn-ghost btn-sm danger-text" onClick={startOver} disabled={!resume}>Start over</button>
          <div className="menu-divider" />
          <button type="button" className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
