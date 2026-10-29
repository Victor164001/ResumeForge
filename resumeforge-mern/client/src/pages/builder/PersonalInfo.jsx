import RF from '@shared/core.js';
import Icon from '../../components/Icon.jsx';
import LocationPicker from '../../components/LocationPicker.jsx';
import { useResume } from '../../context/ResumeContext.jsx';
import { AlignPills, TextField } from './fields.jsx';

export default function PersonalInfo() {
  const { resume, update } = useResume();
  const h = resume.heading;

  return (
    <div className="form-block" id="form-personal">
      <div className="form-block-head">
        <div className="form-block-titlewrap">
          <h2 className="form-block-title">Personal Information</h2>
          <div className="form-block-sub">Add your basic details and contact information.</div>
        </div>
      </div>

      <AlignPills value={h.align} onChange={(v) => update((s) => { s.heading.align = v; })} />

      <div className="field-grid">
        <TextField id="pi-name" label="Full Name" required value={h.name}
          onChange={(v) => update((s) => { s.heading.name = v; }, { typing: true })} />
        <TextField id="pi-role" label="Target Role" optionalNote="(Optional)" value={h.role}
          onChange={(v) => update((s) => { s.heading.role = v; }, { typing: true })} />
      </div>

      {h.contacts.map((c, i) => <ContactRow key={c.id} contact={c} index={i} />)}

      <button
        type="button"
        className="add-contact-btn"
        onClick={() => update((s) => { s.heading.contacts.push({ id: RF.uid(), label: 'Email', value: '', custom: false }); })}
      >
        <Icon name="plus" size={13} /><span>Add contact field</span>
      </button>
    </div>
  );
}

function ContactRow({ contact: c, index }) {
  const { update } = useResume();
  const isCustom = !!c.custom || RF.CONTACT_PRESETS.indexOf(c.label) === -1;
  const wantsPicker = RF.isLocationLabel(c.label);
  const set = (fn, typing) => update((s) => { fn(s.heading.contacts[index]); }, { typing });

  const labelSelect = (
    <select
      id={`contact-label-${c.id}`}
      value={isCustom ? '__custom__' : c.label}
      onChange={(e) => set((x) => {
        if (e.target.value === '__custom__') { x.custom = true; x.label = ''; }
        else { x.custom = false; x.label = e.target.value; }
      })}
    >
      {RF.CONTACT_PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
      <option value="__custom__">Custom…</option>
    </select>
  );

  return (
    <div className="contact-row">
      <div className={`contact-label-wrap${isCustom ? ' is-custom' : ''}`}>
        {isCustom ? (
          <div className="row2">
            {labelSelect}
            <input
              id={`contact-custom-${c.id}`}
              value={c.label}
              placeholder="e.g. Skype"
              title="Name this field"
              onChange={(e) => set((x) => { x.label = e.target.value; }, true)}
            />
          </div>
        ) : labelSelect}
      </div>
      <div className="contact-value-wrap loc-field">
        <div className="value-with-help">
          <input
            id={`contact-value-${c.id}`}
            value={c.value}
            placeholder={wantsPicker ? 'Pick or type a city' : 'Value'}
            onChange={(e) => set((x) => { x.value = e.target.value; }, true)}
          />
          {wantsPicker && <LocationPicker value={c.value} onPick={(v) => set((x) => { x.value = v; })} />}
        </div>
      </div>
      <button
        type="button"
        className="tiny-icon-btn danger"
        title="Remove field"
        onClick={() => update((s) => { s.heading.contacts.splice(index, 1); })}
      >
        <Icon name="trash" size={14} />
      </button>
    </div>
  );
}
