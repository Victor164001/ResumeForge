import Icon from '../components/Icon.jsx';
import { STAGE_TIPS, TIPS } from '../data/content.js';

export default function Tips() {
  return (
    <div className="static-wrap">
      <h1>Getting past the screen, then the reader</h1>
      <p className="lede">Two different readers look at your resume: parsing software first, then a person. These hold up for both.</p>
      {TIPS.map((t) => (
        <div key={t.title} className="static-card">
          <h3><Icon name="lightbulb" size={15} /><span>{t.title}</span></h3>
          <p>{t.body}</p>
        </div>
      ))}

      <h1>Writing for your experience level</h1>
      <p className="lede">
        A senior hire and a new graduate shouldn’t structure a resume the same way. Adapted from Korn Ferry’s guidance on resumes by
        career stage — apply a matching section order from the Templates tab.
      </p>
      {STAGE_TIPS.map((s) => (
        <div key={s.title} className="static-card">
          <h3><Icon name="user" size={15} /><span>{s.title}</span></h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
