import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ResumeRow from '../components/ResumeRow.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';

export default function MyResumes() {
  const { library, createResume } = useResume();
  const { prompt, showToast } = useUi();
  const navigate = useNavigate();
  const sorted = library.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const onNew = async () => {
    const name = await prompt({ title: 'Name this resume', defaultValue: 'Untitled Resume', confirmLabel: 'Create', placeholder: 'Resume name' });
    if (!name) return;
    try { await createResume(name); navigate('/builder'); } catch (e) { showToast(e.message); }
  };

  return (
    <div className="dash-wrap">
      <div className="dash-panel-head page-head">
        <h2>My Resumes</h2>
        <button type="button" className="tb-btn primary" onClick={onNew}><Icon name="plus" size={15} /><span>New Resume</span></button>
      </div>
      <div className="dash-panel">
        {sorted.map((meta) => <ResumeRow key={meta.id} meta={meta} />)}
      </div>
    </div>
  );
}
