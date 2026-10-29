import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';
import { useExporter } from '../hooks/useExporter.js';
import { formatDateShort } from '../lib/time.js';

export default function ResumeRow({ meta }) {
  const { activeId, library, openResume, duplicateResume, renameResume, deleteResume, getResumeData } = useResume();
  const { prompt, confirm, showToast } = useUi();
  const { exportResume } = useExporter();
  const navigate = useNavigate();

  const guard = (fn) => async () => {
    try { await fn(); } catch (e) { showToast(e.message); }
  };

  const rename = guard(async () => {
    const name = await prompt({ title: 'Rename resume', defaultValue: meta.name, confirmLabel: 'Save', placeholder: 'Resume name' });
    if (name) await renameResume(meta.id, name);
  });
  const edit = guard(async () => { await openResume(meta.id); navigate('/builder'); });
  const duplicate = guard(async () => { await duplicateResume(meta.id); showToast(`Duplicated “${meta.name}”`); });
  const exportAs = (format) => guard(async () => exportResume(await getResumeData(meta.id), format));
  const remove = guard(async () => {
    if (library.length <= 1) { showToast('You need at least one resume - create another before deleting this one.'); return; }
    const ok = await confirm({ title: `Delete “${meta.name}”?`, message: 'This can’t be undone.', confirmLabel: 'Delete' });
    if (ok) await deleteResume(meta.id);
  });

  return (
    <div className={`resume-row${meta.id === activeId ? ' is-active' : ''}`}>
      <div className="resume-row-icon"><Icon name="fileText" size={18} /></div>
      <div className="resume-row-mid">
        <button type="button" className="resume-row-name" title="Rename" onClick={rename}>{meta.name}</button>
        <div className="resume-row-updated">
          Updated {formatDateShort(meta.updatedAt)} · ATS {meta.atsScore}%
        </div>
      </div>
      <div className="resume-row-actions">
        <button type="button" className="tiny-icon-btn" title="Edit" onClick={edit}><Icon name="fileText" size={15} /></button>
        <button type="button" className="tiny-icon-btn" title="Duplicate" onClick={duplicate}><Icon name="copy" size={15} /></button>
        <button type="button" className="tiny-icon-btn" title="Download PDF" onClick={exportAs('pdf')}><Icon name="download" size={15} /></button>
        <button type="button" className="tiny-icon-btn word-btn" title="Download Word" onClick={exportAs('docx')}>W</button>
        <button type="button" className="tiny-icon-btn danger" title="Delete" onClick={remove}><Icon name="trash" size={15} /></button>
      </div>
    </div>
  );
}
