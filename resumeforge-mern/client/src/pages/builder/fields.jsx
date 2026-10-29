import { useEffect, useState } from 'react';
import RF from '@shared/core.js';

/* Small form primitives used across the builder. */

export function TextField({ id, label, value, onChange, required, optionalNote, placeholder }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span className="req">*</span>}
        {!required && optionalNote && <span className="optional-note"> {optionalNote}</span>}
      </label>
      <input id={id} value={value || ''} placeholder={placeholder || label} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function TextArea({ id, label, value, onChange, rows = 3, counter, help }) {
  const len = (value || '').length;
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      {help && <div className="field-help">{help}</div>}
      <textarea id={id} rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      {counter && <div className={`charcount${len > counter ? ' over' : ''}`}>{len}/{counter}</div>}
    </div>
  );
}

/* A textarea editing an array of lines (bullets). Keeps its own text so blank
   lines survive while typing; resyncs when the array changes elsewhere (undo). */
export function LinesArea({ id, label, lines, onChange, rows = 3 }) {
  const joined = (lines || []).join('\n');
  const [text, setText] = useState(joined);
  useEffect(() => {
    if (RF.splitLines(text).join('\n') !== joined) setText(joined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined]);
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        rows={rows}
        value={text}
        onChange={(e) => { setText(e.target.value); onChange(RF.splitLines(e.target.value)); }}
      />
    </div>
  );
}

export function PillGroup({ label, options, value, onChange }) {
  return (
    <div className="align-row">
      <span className="lbl">{label}</span>
      <div className="align-pills">
        {options.map(([v, text, title]) => (
          <button
            key={v}
            type="button"
            title={title}
            className={`align-pill${value === v ? ' active' : ''}`}
            onClick={() => onChange(v)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AlignPills({ value, onChange, justify }) {
  const opts = [['auto', 'Auto'], ['left', 'Left'], ['center', 'Center'], ['right', 'Right']];
  if (justify) opts.push(['justify', 'Justify']);
  return <PillGroup label="Align" options={opts} value={value || 'auto'} onChange={onChange} />;
}
