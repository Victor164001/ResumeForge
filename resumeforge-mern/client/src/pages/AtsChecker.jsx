import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RF from '@shared/core.js';
import Icon from '../components/Icon.jsx';
import { api } from '../api/client.js';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';

export default function AtsChecker() {
  const { library, activeId, resume, openResume } = useResume();
  const { showToast } = useUi();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(activeId);
  const [remote, setRemote] = useState(null);

  const isActive = selected === activeId;

  /* The open resume is scored live in the browser (it may have unsaved edits);
     any other resume is scored by the server with the same shared rules. */
  useEffect(() => {
    if (!selected || isActive) { setRemote(null); return undefined; }
    let cancelled = false;
    api(`/resumes/${selected}/ats`)
      .then((r) => { if (!cancelled) setRemote(r); })
      .catch((e) => showToast(e.message));
    return () => { cancelled = true; };
  }, [selected, isActive, showToast]);

  const result = isActive ? (resume ? RF.scoreAts(resume) : null) : remote;
  const verdict = !result ? '' : result.score >= 80 ? 'Strong' : result.score >= 55 ? 'Needs work' : 'Not there yet';

  return (
    <div className="dash-wrap ats-wrap">
      <h1 className="page-title">ATS Checker</h1>
      <p className="page-lede">
        A deterministic checklist, not a black box - every item below is a real, inspectable rule this resume was checked against.
        It estimates how a resume reads to keyword-based screening and to a quick human skim; it isn’t a guarantee of any specific company’s ATS.
      </p>

      <div className="field ats-select">
        <label htmlFor="ats-resume">Checking</label>
        <select id="ats-resume" value={selected || ''} onChange={(e) => setSelected(e.target.value)}>
          {library.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      {!result ? (
        <div className="empty-note">Scoring…</div>
      ) : (
        <>
          <div className="ats-score-card">
            <div className="ats-ring" style={{ '--pct': result.score }}>
              <div className="ats-ring-value">{result.score}%</div>
            </div>
            <div>
              <div className="ats-verdict">{verdict}</div>
              <div className="ats-verdict-sub">{result.checks.filter((c) => c.pass).length} of {result.checks.length} checks passed</div>
            </div>
          </div>

          <div className="ats-checklist">
            {result.checks.map((c) => (
              <div key={c.id} className={`ats-check-row ${c.pass ? 'pass' : 'fail'}`}>
                <div className="ats-check-icon"><Icon name={c.pass ? 'check' : 'x'} size={14} /></div>
                <div>
                  <div className="ats-check-label">{c.label}</div>
                  {!c.pass && <div className="ats-check-detail">{c.detail}</div>}
                </div>
                <div className="ats-check-weight">{c.weight}pt</div>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        className="tb-btn primary ats-edit"
        onClick={async () => {
          try { if (!isActive) await openResume(selected); navigate('/builder'); } catch (e) { showToast(e.message); }
        }}
      >
        Edit this resume
      </button>
    </div>
  );
}
