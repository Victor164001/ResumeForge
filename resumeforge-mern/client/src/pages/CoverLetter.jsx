import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { api } from '../api/client.js';
import { useUi } from '../context/UiContext.jsx';
import { useExporter } from '../hooks/useExporter.js';
import { todayLong } from '../lib/exporters.js';

const FIELDS = [
  ['applicantName', 'Your name'],
  ['applicantContact', 'Your email or phone'],
  ['recipientName', 'Recipient name', 'e.g. Jordan Lee (optional)'],
  ['company', 'Company', 'e.g. Acme Inc.'],
];
const PARAGRAPHS = [
  ['opening', 'Opening paragraph', 'Why you’re writing and the role you want.', 3],
  ['body', 'Body paragraph', 'Your strongest, most relevant achievement.', 4],
  ['closing', 'Closing paragraph', 'What you want to happen next.', 3],
];

export default function CoverLetter() {
  const { showToast } = useUi();
  const { exportCoverLetter, busy } = useExporter();
  const [cl, setCl] = useState(null);
  const [status, setStatus] = useState('');
  const timer = useRef();
  const latest = useRef(null);

  useEffect(() => {
    api('/cover-letter').then((r) => setCl(r.coverLetter)).catch((e) => showToast(e.message));
  }, [showToast]);

  /* Save after a pause in typing, and on leaving the page. */
  const save = async () => {
    clearTimeout(timer.current);
    if (!latest.current) return;
    const body = latest.current;
    latest.current = null;
    try {
      await api('/cover-letter', { method: 'PUT', body });
      setStatus('Saved');
    } catch (e) {
      setStatus('Not saved');
      showToast(`Couldn’t save the cover letter: ${e.message}`);
    }
  };
  useEffect(() => () => { save(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key, value) => {
    const next = { ...cl, [key]: value };
    setCl(next);
    latest.current = next;
    setStatus('Saving…');
    clearTimeout(timer.current);
    timer.current = setTimeout(save, 700);
  };

  if (!cl) return <div className="cover-wrap"><div className="empty-note">Loading your cover letter…</div></div>;

  return (
    <div className="cover-wrap">
      <div className="page-head">
        <h1 className="page-title">Cover Letter</h1>
        {status && <span className="saved-indicator">{status}</span>}
      </div>
      <p className="page-lede">A short, tailored cover letter - same export quality as your resume.</p>

      <div className="cover-grid">
        <div className="cover-form">
          <div className="field-grid">
            {FIELDS.slice(0, 2).map(([k, l, ph]) => <Field key={k} k={k} label={l} ph={ph} cl={cl} set={set} />)}
          </div>
          <div className="field-grid">
            {FIELDS.slice(2).map(([k, l, ph]) => <Field key={k} k={k} label={l} ph={ph} cl={cl} set={set} />)}
          </div>
          <Field k="greeting" label="Greeting" cl={cl} set={set} />
          {PARAGRAPHS.map(([k, l, ph, rows]) => <Field key={k} k={k} label={l} ph={ph} rows={rows} cl={cl} set={set} area />)}
          <Field k="signoff" label="Sign-off" cl={cl} set={set} />
        </div>

        <div className="preview-wrap cover-preview">
          <div className="page-shell">
            <div className="page tpl-classic cover-page">
              <div className="cover-date">{todayLong()}</div>
              {(cl.recipientName || cl.company) && (
                <div className="cover-recipient">{[cl.recipientName, cl.company].filter(Boolean).join('\n')}</div>
              )}
              <div className="cover-greeting">{cl.greeting}</div>
              {[cl.opening, cl.body, cl.closing].filter((p) => (p || '').trim()).map((p, i) => (
                <p key={i} className="cover-para">{p}</p>
              ))}
              <div className="cover-signoff">{cl.signoff}</div>
              <div className="cover-name">{cl.applicantName}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tb-group cover-actions">
        <button type="button" className="tb-btn primary" disabled={busy} onClick={() => exportCoverLetter(cl, 'pdf')}>
          <Icon name="download" size={15} /><span>Download PDF</span>
        </button>
        <button type="button" className="tb-btn outline" disabled={busy} onClick={() => exportCoverLetter(cl, 'docx')}>
          <Icon name="download" size={15} /><span>Download Word</span>
        </button>
      </div>
    </div>
  );
}

function Field({ k, label, ph, cl, set, area, rows }) {
  const id = `cl-${k}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {area ? (
        <textarea id={id} rows={rows} value={cl[k] || ''} placeholder={ph || label} onChange={(e) => set(k, e.target.value)} />
      ) : (
        <input id={id} value={cl[k] || ''} placeholder={ph || label} onChange={(e) => set(k, e.target.value)} />
      )}
    </div>
  );
}
