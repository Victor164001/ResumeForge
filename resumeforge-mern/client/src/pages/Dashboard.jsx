import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import ResumeRow from '../components/ResumeRow.jsx';
import TemplateThumb from '../components/TemplateThumb.jsx';
import { api, track } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';
import { TEMPLATES } from '../data/content.js';

function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon name={icon} size={20} /></div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { resume, library, update, createResume } = useResume();
  const { prompt, showToast } = useUi();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api('/stats').then(setStats).catch(() => {});
  }, [library]);

  const firstName = (user?.name || '').trim().split(' ')[0] || 'there';
  const sorted = library.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const onCreate = async () => {
    const name = await prompt({
      title: 'Name this resume',
      description: 'e.g. “Product Manager - Acme”. You can rename it any time from My Resumes.',
      placeholder: 'Resume name',
      defaultValue: 'Untitled Resume',
      confirmLabel: 'Create',
    });
    if (!name) return;
    try { await createResume(name); navigate('/builder'); } catch (e) { showToast(e.message); }
  };

  const pickTemplate = (id) => { update((s) => { s.templateId = id; }); navigate('/builder'); };

  const quick = [
    ['fileText', 'Build Resume', 'Create and edit your resume with our easy builder.', '/builder'],
    ['barChart', 'Browse Templates', 'Choose from ATS-safe resume templates.', '/templates'],
    ['award', 'ATS Checker', 'Check your resume score and get suggestions.', '/ats'],
    ['mail', 'Cover Letter', 'Create a tailored cover letter in minutes.', '/cover-letter'],
  ];

  return (
    <div className="dash-wrap">
      <div className="dash-hero">
        <div>
          <div className="dash-hero-eyebrow">WELCOME BACK, {firstName.toUpperCase()}</div>
          <h1 className="dash-hero-title">Create a Professional Resume That Gets You Hired</h1>
          <p className="dash-hero-sub">Choose a template, build your resume with ease, and check how it scores before you send it.</p>
          <div className="dash-hero-actions">
            <button type="button" className="tb-btn primary lg" onClick={onCreate}><Icon name="plus" size={16} /><span>Create New Resume</span></button>
            <Link to="/templates" className="tb-btn lg" onClick={() => track('templateViews')}>Explore Templates</Link>
          </div>
        </div>
        {resume && (
          <div className="dash-hero-preview">
            <div className="dash-hero-preview-inner"><ResumePreview data={resume} /></div>
          </div>
        )}
      </div>

      <div className="stats-row">
        <StatCard icon="fileText" value={stats?.resumeCount ?? library.length} label="Resumes Created" />
        <StatCard icon="eye" value={stats?.templateViews ?? '–'} label="Template Views" />
        <StatCard icon="download" value={stats?.exportsCount ?? '–'} label="Exports (PDF/Word)" />
        <StatCard icon="award" value={stats ? `${stats.averageAtsScore}%` : '–'} label="ATS Score (Avg.)" />
      </div>

      <div className="dash-grid">
        <div className="dash-panel">
          <div className="dash-panel-head">
            <h2>Choose a Template</h2>
            <Link to="/templates" className="link-btn" onClick={() => track('templateViews')}>View All Templates →</Link>
          </div>
          <p className="dash-panel-sub">Pick a template and start building your resume</p>
          <div className="dash-tpl-row">
            {TEMPLATES.map((t) => (
              <button
                type="button"
                key={t.id}
                className={`dash-tpl-card${resume?.templateId === t.id ? ' selected' : ''}`}
                onClick={() => pickTemplate(t.id)}
              >
                <TemplateThumb template={t} name={resume?.heading?.name || 'Alex Rivera'} compact />
                <div className="dash-tpl-name">{t.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="dash-panel">
          <div className="dash-panel-head">
            <h2>My Resumes</h2>
            <Link to="/resumes" className="link-btn">View All →</Link>
          </div>
          {sorted.slice(0, 3).map((meta) => <ResumeRow key={meta.id} meta={meta} />)}
        </div>
      </div>

      <div className="quick-actions-row">
        {quick.map(([icon, title, desc, to]) => (
          <Link key={to} to={to} className="quick-action-card" onClick={to === '/templates' ? () => track('templateViews') : undefined}>
            <div className="qa-icon"><Icon name={icon} size={18} /></div>
            <div>
              <div className="qa-title">{title}</div>
              <div className="qa-desc">{desc}</div>
            </div>
            <div className="qa-chevron"><Icon name="chevronRight" size={16} /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
