import { useNavigate } from 'react-router-dom';
import TemplateThumb from '../components/TemplateThumb.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';
import { CAREER_STAGES, TEMPLATES, applyCareerStageOrder } from '../data/content.js';

export default function Templates() {
  const { resume, update } = useResume();
  const { showToast } = useUi();
  const navigate = useNavigate();

  const pick = (id) => { update((s) => { s.templateId = id; }); navigate('/builder'); };
  const applyStage = (stage) => {
    update((s) => { s.sections = applyCareerStageOrder(s.sections, stage.order); });
    navigate('/builder');
    showToast(`Sections reordered for “${stage.label}”.`);
  };

  return (
    <div className="gallery-wrap">
      <div className="gallery-head">
        <h1>Pick a format built to survive the software screen — and hold a recruiter’s attention.</h1>
        <p>All three formats are single-column and use the standard section headings parsers expect. Two-column “sidebar” resumes look sharp but frequently scramble text when an applicant tracking system reads across columns, so none of them are offered here.</p>
        <p className="note">Choose a look — you can switch templates at any point without losing a word of what you’ve written.</p>
      </div>

      <div className="gallery">
        {TEMPLATES.map((t) => {
          const selected = resume?.templateId === t.id;
          return (
            <div key={t.id} className={`tpl-card${selected ? ' selected' : ''}`}>
              <TemplateThumb template={t} />
              <div className="tpl-meta">
                <span className="tpl-tag">{t.tag}</span>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
                <button type="button" className="tpl-pick" onClick={() => pick(t.id)}>
                  {selected ? 'Continue with this' : 'Use this template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="stage-block">
        <h2>Not sure how to order things?</h2>
        <div className="gallery-head">
          <p>Apply a section order matched to your experience level. This only reorders the sections you already have — it never deletes anything.</p>
        </div>
        <div className="stage-grid">
          {CAREER_STAGES.map((stage) => (
            <div key={stage.id} className="static-card stage-card">
              <h3>{stage.label}</h3>
              <p>{stage.desc}</p>
              <button type="button" className="tpl-pick" onClick={() => applyStage(stage)}>Apply this order</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
