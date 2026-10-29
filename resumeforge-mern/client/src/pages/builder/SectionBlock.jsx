import { useState } from 'react';
import RF from '@shared/core.js';
import Icon, { SECTION_ICON } from '../../components/Icon.jsx';
import { useResume } from '../../context/ResumeContext.jsx';
import { ENTRY_LABELS, SECTION_SUBTITLES } from '../../data/content.js';
import EntryCard from './EntryCard.jsx';
import { AlignPills, LinesArea, PillGroup, TextArea } from './fields.jsx';

export default function SectionBlock({ section: s, index, dragId, setDragId }) {
  const { resume, update } = useResume();
  /* mutate this section by index inside the cloned state */
  const set = (fn, typing = false) => update((st) => { fn(st.sections[index]); }, { typing });

  const move = (dir) => {
    const j = index + dir;
    if (j < 0 || j >= resume.sections.length) return;
    update((st) => { const t = st.sections[index]; st.sections[index] = st.sections[j]; st.sections[j] = t; });
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (!dragId || dragId === s.id) return;
    update((st) => {
      const from = st.sections.findIndex((x) => x.id === dragId);
      const to = st.sections.findIndex((x) => x.id === s.id);
      if (from < 0 || to < 0) return;
      st.sections.splice(to, 0, st.sections.splice(from, 1)[0]);
    });
    setDragId(null);
  };

  return (
    <div
      className="form-block"
      id={`form-section-${s.id}`}
      onDragOver={(e) => { if (dragId && dragId !== s.id) e.preventDefault(); }}
      onDrop={onDrop}
    >
      <div className="form-block-head">
        <span
          className="drag-handle"
          draggable
          title="Drag to reorder"
          onDragStart={(e) => { setDragId(s.id); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', s.id); }}
          onDragEnd={() => setDragId(null)}
        >
          <Icon name="grip" size={15} />
        </span>
        <div className="form-block-titlewrap">
          <div className="form-block-title-row">
            <Icon name={SECTION_ICON[s.type] || 'bookmark'} size={16} />
            <input
              id={`section-title-${s.id}`}
              className="form-block-title-input"
              value={s.title}
              aria-label="Section heading"
              onChange={(e) => set((x) => { x.title = e.target.value; }, true)}
            />
          </div>
          <div className="form-block-sub">{SECTION_SUBTITLES[s.type] || ''}</div>
        </div>
        <div className="form-block-actions">
          <button type="button" className="tiny-icon-btn" title="Move up" onClick={() => move(-1)}><Icon name="chevronUp" size={15} /></button>
          <button type="button" className="tiny-icon-btn" title="Move down" onClick={() => move(1)}><Icon name="chevronDown" size={15} /></button>
          <button type="button" className="tiny-icon-btn danger" title="Delete section"
            onClick={() => update((st) => { st.sections.splice(index, 1); })}>
            <Icon name="trash" size={15} />
          </button>
        </div>
      </div>

      <AlignPills value={s.align} justify={s.type === 'summary'} onChange={(v) => set((x) => { x.align = v; })} />
      <SectionBody s={s} set={set} />
    </div>
  );
}

function SectionBody({ s, set }) {
  if (s.type === 'summary') {
    return <TextArea id={`summary-${s.id}`} rows={4} counter={500} value={s.text}
      onChange={(v) => set((x) => { x.text = v; }, true)} />;
  }
  if (s.type === 'skills') {
    return (
      <>
        <PillGroup
          label="Display"
          value={s.display || 'tags'}
          onChange={(v) => set((x) => { x.display = v; })}
          options={[
            ['tags', 'Inline', 'All skills on one flowing line, separated by dots'],
            ['list', 'Vertical list', 'One skill per line with a bullet, stacked vertically'],
          ]}
        />
        <SkillTags s={s} set={set} />
      </>
    );
  }
  if (s.type === 'languages') return <LanguageRows s={s} set={set} />;
  if (s.type === 'highlights') {
    return <LinesArea id={`highlights-${s.id}`} label="One bullet per line" rows={5} lines={s.items}
      onChange={(lines) => set((x) => { x.items = lines; }, true)} />;
  }

  const labels = ENTRY_LABELS[s.type] || ENTRY_LABELS.custom;
  return (
    <>
      <PillGroup
        label="Format"
        value={s.style || 'bullets'}
        onChange={(v) => set((x) => { x.style = v; })}
        options={[
          ['bullets', 'Bullets', 'One line per achievement (default, safest for ATS)'],
          ['paragraph', 'Paragraph', "Read as flowing prose, like Harvard's paragraph-style resume"],
        ]}
      />
      {(s.entries || []).map((entry, i) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          labels={labels}
          set={(fn, typing) => set((x) => { fn(x.entries[i]); }, typing)}
          onRemove={() => set((x) => { x.entries.splice(i, 1); })}
        />
      ))}
      <button type="button" className="add-entry-btn" onClick={() => set((x) => { x.entries.push(RF.emptyEntry(s.type)); })}>
        <Icon name="plus" size={14} /><span>{labels.add}</span>
      </button>
    </>
  );
}

function SkillTags({ s, set }) {
  const [draft, setDraft] = useState('');
  const items = s.items || [];
  const commit = () => {
    const v = draft.trim().replace(/,$/, '');
    if (!v) return;
    set((x) => { x.items.push(v); });
    setDraft('');
  };
  return (
    <div>
      <div className="tag-field">
        {items.map((skill, i) => (
          <span className="skill-tag" key={`${skill}-${i}`}>
            <span>{skill}</span>
            <button type="button" title={`Remove ${skill}`} onClick={() => set((x) => { x.items.splice(i, 1); })}>
              <Icon name="x" size={11} />
            </button>
          </span>
        ))}
        <input
          id={`skill-input-${s.id}`}
          className="skill-tag-input"
          value={draft}
          placeholder={items.length ? 'Add another…' : 'Type a skill and press Enter'}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit(); }
            else if (e.key === 'Backspace' && !draft && items.length) set((x) => { x.items.pop(); });
          }}
        />
        <button type="button" className="skill-add-btn" onClick={commit}><Icon name="plus" size={13} /><span>Add</span></button>
      </div>
      <div className="field-help">Press Enter to add a skill</div>
    </div>
  );
}

function LanguageRows({ s, set }) {
  return (
    <div>
      {(s.items || []).map((item, i) => (
        <div className="contact-row" key={item.id || i}>
          <div className="contact-value-wrap">
            <input id={`lang-${s.id}-${i}`} value={item.language || ''} placeholder="Language (e.g. Tamil)"
              onChange={(e) => set((x) => { x.items[i].language = e.target.value; }, true)} />
          </div>
          <div className="contact-value-wrap">
            <input id={`lang-level-${s.id}-${i}`} value={item.level || ''} placeholder="Level (e.g. Mother tongue, Proficient)"
              onChange={(e) => set((x) => { x.items[i].level = e.target.value; }, true)} />
          </div>
          <button type="button" className="tiny-icon-btn danger" title="Remove language"
            onClick={() => set((x) => { x.items.splice(i, 1); })}>
            <Icon name="trash" size={14} />
          </button>
        </div>
      ))}
      <button type="button" className="add-entry-btn" onClick={() => set((x) => { x.items.push(RF.emptyLanguage()); })}>
        <Icon name="plus" size={14} /><span>Add language</span>
      </button>
    </div>
  );
}
