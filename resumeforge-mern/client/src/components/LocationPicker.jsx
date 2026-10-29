import { useEffect, useMemo, useRef, useState } from 'react';
import RF from '@shared/core.js';
import Icon from './Icon.jsx';

function guessCountry(value) {
  if (!value) return '__all__';
  const tail = String(value).split(',').pop().trim().toLowerCase();
  const found = RF.GEO.countries.find((c) => c.name.toLowerCase() === tail);
  return found ? found.name : '__all__';
}

/* Pin button that opens a city search popover. Calls onPick(label) or onPick('') to clear. */
export default function LocationPicker({ value, onPick }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.parentElement.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <button
        ref={wrapRef}
        type="button"
        className="tb-icon-btn loc-trigger"
        title="Look up a city"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="mapPin" size={14} />
      </button>
      {open && (
        <LocationPopover
          initialCountry={guessCountry(value)}
          onPick={(v) => { onPick(v); setOpen(false); }}
        />
      )}
    </>
  );
}

function LocationPopover({ initialCountry, onPick }) {
  const [country, setCountry] = useState(initialCountry);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const results = useMemo(() => RF.searchLocations(query, country, 60), [query, country]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { listRef.current?.children[cursor]?.scrollIntoView({ block: 'nearest' }); }, [cursor]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (cursor >= 0 && results[cursor]) onPick(results[cursor].label);
      else if (query.trim()) onPick(query.trim());
    }
  };

  return (
    <div className="loc-pop" onMouseDown={(e) => e.stopPropagation()}>
      <div className="row">
        <select id="loc-country" value={country} onChange={(e) => { setCountry(e.target.value); setCursor(-1); }}>
          <option value="__all__">All countries</option>
          {RF.GEO.countries.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <input
          id="loc-search"
          ref={inputRef}
          placeholder="Type a city — e.g. bang, mumb, sfo"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCursor(-1); }}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="loc-results" ref={listRef}>
        {!results.length ? (
          <div className="loc-empty">No match. You can still use exactly what you typed.</div>
        ) : results.map((r, i) => (
          <button
            type="button"
            key={`${r.country}-${r.city}`}
            className={`loc-item${i === cursor ? ' active' : ''}`}
            onClick={() => onPick(r.label)}
          >
            {r.city}
            {r.country !== 'Remote' && <span className="cty">{r.country}</span>}
          </button>
        ))}
      </div>
      <div className="loc-foot">
        <button type="button" className="btn btn-sm" onClick={() => query.trim() && onPick(query.trim())} disabled={!query.trim()}>
          Use what I typed
        </button>
        <button type="button" className="muted-btn" onClick={() => onPick('')}>Clear</button>
      </div>
    </div>
  );
}
