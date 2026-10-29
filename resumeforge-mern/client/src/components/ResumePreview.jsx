import { useMemo } from 'react';
import RF from '@shared/core.js';

/* Renders the same model the PDF/Word exporters use, so what you see is what you export. */
export default function ResumePreview({ data, id }) {
  const m = useMemo(() => RF.buildModel(data), [data]);

  return (
    <div className={`page tpl-${m.template}`} id={id} style={{ '--rf-accent': m.accent }}>
      <div className={`rf-header ${m.header.align}`}>
        <div className="rf-name">{m.header.name || 'Your Name'}</div>
        {m.header.role && <div className="rf-role">{m.header.role}</div>}
        {m.header.contacts.length > 0 && (
          <div className="rf-contact">{m.header.contacts.join('  |  ')}</div>
        )}
      </div>

      {m.sections.map((s, si) => (
        <div className="rf-section" key={si}>
          <div className={`rf-sectitle ${s.titleAlign}`}>{s.title}</div>
          <SectionBody s={s} />
        </div>
      ))}
    </div>
  );
}

function SectionBody({ s }) {
  if (s.type === 'summary') {
    return <div className={s.bodyAlign} style={{ whiteSpace: 'pre-line' }}>{s.text}</div>;
  }
  if (s.type === 'skills') {
    return s.display === 'list' ? (
      <ul className={`rf-bullets rf-skills-list ${s.bodyAlign}`}>{s.items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    ) : (
      <div className={`rf-skills-line ${s.bodyAlign}`}>{s.items.join('  •  ')}</div>
    );
  }
  if (s.type === 'languages') {
    return s.items.map((l, i) => (
      <div key={i} className={`rf-language-line ${s.bodyAlign}`}>{l.level ? `${l.language} – ${l.level}` : l.language}</div>
    ));
  }
  if (s.type === 'highlights') {
    return <ul className={`rf-bullets ${s.bodyAlign}`}>{s.items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
  }
  return s.entries.map((e, i) => (
    <div key={i} className={`rf-entry ${s.bodyAlign}`}>
      {s.split ? (
        <>
          <div className="rf-entry-top rf-split"><span>{e.heading}</span>{e.dates && <span>{e.dates}</span>}</div>
          {(e.org || e.location) && (
            <div className="rf-entry-sub rf-split"><span>{e.org}</span>{e.location && <span>{e.location}</span>}</div>
          )}
        </>
      ) : (
        <>
          <div className="rf-entry-top">{[e.heading, e.dates].filter(Boolean).join('  |  ')}</div>
          {(e.org || e.location) && <div className="rf-entry-sub">{[e.org, e.location].filter(Boolean).join('  |  ')}</div>}
        </>
      )}
      {e.description && <p className="rf-entry-desc">{e.description}</p>}
      {e.bullets.length > 0 && (s.style === 'paragraph' ? (
        <p className="rf-paragraph">{RF.joinAsParagraph(e.bullets)}</p>
      ) : (
        <ul className="rf-bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
      ))}
    </div>
  ));
}
