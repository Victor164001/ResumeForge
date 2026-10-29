import RF from '@shared/core.js';
import Icon from '../../components/Icon.jsx';
import LocationPicker from '../../components/LocationPicker.jsx';
import { LinesArea, TextArea, TextField } from './fields.jsx';

const YEARS = RF.yearOptions();

/* One timeline entry (job, project, degree...). `set(fn, typing)` mutates this entry. */
export default function EntryCard({ entry, labels, set, onRemove }) {
  const id = (k) => `entry-${entry.id}-${k}`;
  return (
    <div className="entry-card">
      <button type="button" className="tiny-icon-btn danger entry-card-top" title="Remove entry" onClick={onRemove}>
        <Icon name="trash" size={14} />
      </button>

      <div className="field-grid">
        <TextField id={id('org')} label={labels.org} required value={entry.org}
          onChange={(v) => set((e) => { e.org = v; }, true)} />
        <TextField id={id('heading')} label={labels.heading} required value={entry.heading}
          onChange={(v) => set((e) => { e.heading = v; }, true)} />
      </div>

      <TextArea id={id('desc')} label={labels.desc} value={entry.description}
        onChange={(v) => set((e) => { e.description = v; }, true)} />

      <div className="field-grid stack-always">
        <div className="field loc-field">
          <label htmlFor={id('loc')}>Location</label>
          <div className="loc-input-row">
            <input id={id('loc')} value={entry.location || ''} placeholder="City"
              onChange={(ev) => set((e) => { e.location = ev.target.value; }, true)} />
            <LocationPicker value={entry.location} onPick={(v) => set((e) => { e.location = v; })} />
          </div>
        </div>
        <DateField entry={entry} set={set} id={id} />
      </div>

      <LinesArea id={id('bullets')} label={labels.bullets} lines={entry.bullets}
        onChange={(lines) => set((e) => { e.bullets = lines; }, true)} />
    </div>
  );
}

function DatePair({ entry, set, id, monthKey, yearKey, disabled }) {
  return (
    <div className="date-pair" style={disabled ? { opacity: 0.45 } : undefined}>
      <select id={id(monthKey)} className="mon" disabled={disabled} value={entry[monthKey] || ''}
        onChange={(ev) => set((e) => { e[monthKey] = ev.target.value; })}>
        <option value="">Month</option>
        {RF.MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select id={id(yearKey)} className="yr" disabled={disabled} value={String(entry[yearKey] || '')}
        onChange={(ev) => set((e) => { e[yearKey] = ev.target.value; })}>
        <option value="">Year</option>
        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}

function DateField({ entry, set, id }) {
  return (
    <div className="field">
      <label>Dates</label>
      <div className="date-grid">
        <DatePair entry={entry} set={set} id={id} monthKey="startMonth" yearKey="startYear" />
        <DatePair entry={entry} set={set} id={id} monthKey="endMonth" yearKey="endYear" disabled={!!entry.isPresent} />
      </div>
      <label className="present-toggle">
        <input
          id={id('present')}
          type="checkbox"
          checked={!!entry.isPresent}
          onChange={(ev) => set((e) => {
            e.isPresent = ev.target.checked;
            if (e.isPresent) { e.endMonth = ''; e.endYear = ''; }
          })}
        />
        Currently here (Present)
      </label>
      <div className="date-shows-as">Shows as: {RF.formatDateRange(entry) || '—'}</div>
    </div>
  );
}
