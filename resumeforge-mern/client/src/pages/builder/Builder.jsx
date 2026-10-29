import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RF from '@shared/core.js';
import Icon, { SECTION_ICON } from '../../components/Icon.jsx';
import ResumePreview from '../../components/ResumePreview.jsx';
import { useResume } from '../../context/ResumeContext.jsx';
import { useUi } from '../../context/UiContext.jsx';
import { useExporter } from '../../hooks/useExporter.js';
import { ADD_SECTION_OPTIONS, TEMPLATES } from '../../data/content.js';
import { relativeSaved } from '../../lib/time.js';
import PersonalInfo from './PersonalInfo.jsx';
import SectionBlock from './SectionBlock.jsx';

export default function Builder() {
  const { resume, undo, redo } = useResume();
  const [previewOnly, setPreviewOnly] = useState(false);

  /* Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z or Ctrl+Y redo */
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  if (!resume) return null;

  return (
    <>
      <Toolbar previewOnly={previewOnly} setPreviewOnly={setPreviewOnly} />
      <div className={`workspace ${previewOnly ? 'preview-only' : 'with-sidenav'}`}>
        {!previewOnly && <Workspace />}
        <div className="preview-wrap">
          <div className="page-shell"><ResumePreview data={resume} id="resume-page" /></div>
          <div className="footer-hint">
            Live preview. Exports carry real selectable text — not a screenshot — so an ATS can read every line. Page breaks are set when you export.
          </div>
        </div>
      </div>
    </>
  );
}

function Toolbar({ previewOnly, setPreviewOnly }) {
  const { resume, update, undo, redo, canUndo, canRedo, saveStatus, lastSavedAt } = useResume();
  const { showToast } = useUi();
  const { exportResume, busy } = useExporter();
  const [, tick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const syncLabel = {
    saving: 'Saving…',
    saved: 'Saved to your account',
    error: 'Not saved — check your connection',
    idle: 'Saved to your account',
  }[saveStatus];

  return (
    <div className="toolbar2">
      <Link to="/templates" className="back-link"><Icon name="arrowLeft" size={15} /><span>Templates</span></Link>
      <div className="tb-group">
        <select id="tb-template" className="tb-select" value={resume.templateId}
          onChange={(e) => update((s) => { s.templateId = e.target.value; })}>
          {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select id="tb-pagesize" className="tb-select" value={resume.pageSize}
          onChange={(e) => update((s) => { s.pageSize = e.target.value; })}>
          <option value="letter">US Letter</option>
          <option value="a4">A4</option>
        </select>
      </div>
      <button
        type="button"
        className="tb-btn"
        title="Reset every block to this template's recommended alignment"
        onClick={() => {
          update((s) => { s.heading.align = 'auto'; s.sections.forEach((x) => { x.align = 'auto'; }); });
          showToast('Alignment reset to template defaults.');
        }}
      >
        <Icon name="sliders" size={15} /><span>Auto-align</span>
      </button>

      <div className="tb-spacer" />

      <div className="saved-indicator"><Icon name="check" size={13} /><span>{relativeSaved(lastSavedAt)}</span></div>
      <div className={`saved-indicator cloud-indicator${saveStatus === 'error' ? '' : ' is-synced'}`}>
        <Icon name={saveStatus === 'error' ? 'cloudOff' : saveStatus === 'saving' ? 'cloud' : 'cloudCheck'} size={13} />
        <span>{syncLabel}</span>
      </div>

      <button type="button" className="tb-icon-btn" title="Undo (Ctrl/Cmd+Z)" disabled={!canUndo} onClick={undo}><Icon name="undo" size={15} /></button>
      <button type="button" className="tb-icon-btn" title="Redo (Ctrl/Cmd+Shift+Z)" disabled={!canRedo} onClick={redo}><Icon name="redo" size={15} /></button>
      <button type="button" className="tb-btn" onClick={() => setPreviewOnly((p) => !p)}>
        <Icon name={previewOnly ? 'eyeOff' : 'eye'} size={15} /><span>{previewOnly ? 'Edit' : 'Preview'}</span>
      </button>
      <button type="button" className="tb-btn primary" disabled={busy} onClick={() => exportResume(resume, 'pdf')}>
        <Icon name="download" size={15} /><span>Download PDF</span>
      </button>
      <button type="button" className="tb-btn outline" disabled={busy} onClick={() => exportResume(resume, 'docx')}>
        <Icon name="download" size={15} /><span>Download Word</span>
      </button>
    </div>
  );
}

function Workspace() {
  const { resume } = useResume();
  const [activeSection, setActiveSection] = useState('form-personal');
  const [dragId, setDragId] = useState(null);
  const panelRef = useRef(null);
  const sectionKey = resume.sections.map((s) => s.id).join('|');

  /* Highlight the sidenav item for whichever block is most visible. */
  useEffect(() => {
    const root = panelRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    const visible = {};
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { visible[e.target.id] = e.intersectionRatio; });
      let best = null; let bestRatio = 0;
      Object.keys(visible).forEach((id) => { if (visible[id] > bestRatio) { bestRatio = visible[id]; best = id; } });
      if (best) setActiveSection(best);
    }, { root: window.innerWidth >= 1080 ? root : null, threshold: [0.1, 0.3, 0.6] });
    root.querySelectorAll('.form-block[id]').forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, [sectionKey]);

  const targets = [{ id: 'form-personal', label: 'Personal Info', icon: 'user' }].concat(
    resume.sections.map((s) => ({ id: `form-section-${s.id}`, label: s.title || 'Untitled', icon: SECTION_ICON[s.type] || 'bookmark' }))
  );
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <nav className="sidenav">
        {targets.map((t) => (
          <button key={t.id} type="button" className={`sidenav-item${activeSection === t.id ? ' active' : ''}`} onClick={() => scrollTo(t.id)}>
            <Icon name={t.icon} size={15} /><span className="sn-label">{t.label}</span>
          </button>
        ))}
        <div className="sidenav-add">
          <button
            type="button"
            className="sidenav-item"
            onClick={() => {
              const node = document.getElementById('add-section-anchor');
              node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              node?.querySelector('select')?.focus();
            }}
          >
            <Icon name="plusCircle" size={15} /><span className="sn-label">Add a section</span>
          </button>
        </div>
        <div className="sidenav-tips">
          <div className="sidenav-tips-head"><Icon name="lightbulb" size={14} /><span>Tip</span></div>
          <p>Keep your resume concise, clear and ATS-friendly — one page for under 8 years of experience.</p>
        </div>
      </nav>

      <div className="form-panel" ref={panelRef}>
        <PersonalInfo />
        {resume.sections.map((s, i) => (
          <SectionBlock key={s.id} section={s} index={i} dragId={dragId} setDragId={setDragId} />
        ))}
        <AddSectionRow panelRef={panelRef} />
      </div>
    </>
  );
}

function AddSectionRow({ panelRef }) {
  const { update } = useResume();
  const { prompt } = useUi();
  const [type, setType] = useState('summary');

  const add = async () => {
    let title = null;
    if (type === 'custom') {
      title = await prompt({
        title: 'Name this section',
        description: 'This becomes the heading printed on your resume — e.g. Publications, Volunteering, Awards.',
        placeholder: 'Section name',
        defaultValue: 'Achievements',
        confirmLabel: 'Add section',
      });
      if (!title) return;
    }
    update((s) => { s.sections.push(RF.defaultSection(type, title)); });
    setTimeout(() => {
      const p = panelRef.current;
      if (p && p.scrollHeight > p.clientHeight) p.scrollTop = p.scrollHeight;
      else document.getElementById('add-section-anchor')?.scrollIntoView({ block: 'center' });
    }, 0);
  };

  return (
    <div className="add-section-row" id="add-section-anchor">
      <Icon name="plusCircle" size={16} />
      <select id="add-section-type" value={type} onChange={(e) => setType(e.target.value)}>
        {ADD_SECTION_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <button type="button" className="tb-btn primary" onClick={add}>Add section</button>
    </div>
  );
}
