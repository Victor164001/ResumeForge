import Icon from '../components/Icon.jsx';
import { BULLET_EXAMPLES, VERB_GROUPS } from '../data/content.js';

export default function Examples() {
  return (
    <div className="static-wrap">
      <h1>Bullet phrases worth adapting</h1>
      <p className="lede">
        Real resumes read well because each line names an action, what it acted on, and a result. These are patterns to borrow and
        rewrite in your own words — never copy a line verbatim into your resume, since specifics are what make a bullet credible.
      </p>
      {BULLET_EXAMPLES.map((g) => (
        <div key={g.title} className="static-card">
          <h3><Icon name={g.icon} size={15} /><span>{g.title}</span></h3>
          <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}

      <h1>Action verbs by category</h1>
      <p className="lede">
        Adapted from Harvard’s career-services action verb list. Starting a bullet with a strong, specific verb makes the achievement
        easier to scan — and easier to believe.
      </p>
      <div className="static-card">
        {VERB_GROUPS.map((vg) => (
          <p key={vg.title}><strong>{vg.title}:</strong> {vg.verbs.join(', ')}</p>
        ))}
      </div>
    </div>
  );
}
