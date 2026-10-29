/* Minimal line-icon set: generic geometric shapes, no icon font or CDN. */
const ICON_PATHS = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  fileText: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>',
  barChart: '<line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="15"/>',
  briefcase: '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/>',
  folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
  cap: '<path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/><line x1="22" y1="9.5" x2="22" y2="15"/>',
  award: '<circle cx="12" cy="8" r="5.5"/><path d="M8.2 12.8 6.5 21l5.5-3 5.5 3-1.7-8.2"/>',
  bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v16l-7-4-7 4V4a1 1 0 0 1 1-1z"/>',
  plusCircle: '<circle cx="12" cy="12" r="9.5"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  trash: '<path d="M3.5 6.5h17"/><path d="M8.5 6.5v-2a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2"/><path d="M18.5 6.5 17.6 20a1.5 1.5 0 0 1-1.5 1.4H7.9A1.5 1.5 0 0 1 6.4 20L5.5 6.5"/><line x1="10" y1="10.5" x2="10" y2="17"/><line x1="14" y1="10.5" x2="14" y2="17"/>',
  grip: '<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>',
  chevronUp: '<polyline points="18 15 12 9 6 15"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  undo: '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-6a4 4 0 0 0-4-4H4"/>',
  redo: '<polyline points="15 14 20 9 15 4"/><path d="M4 20v-6a4 4 0 0 1 4-4h12"/>',
  eye: '<path d="M1.5 12S5.6 4.5 12 4.5 22.5 12 22.5 12 18.4 19.5 12 19.5 1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.6A9.9 9.9 0 0 1 12 5.5c6.4 0 10.5 6.5 10.5 6.5a15.6 15.6 0 0 1-3.4 4.1M6.6 6.7C4 8.4 1.5 12 1.5 12s4.1 6.5 10.5 6.5a10.4 10.4 0 0 0 3.7-.7"/><path d="M9.9 14.1a3 3 0 0 0 4.2-4.2"/>',
  download: '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M4.5 21h15"/>',
  moon: '<path d="M20.5 13.9A8.5 8.5 0 1 1 10.1 3.5a7 7 0 0 0 10.4 10.4z"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="5.9" y2="5.9"/><line x1="18.1" y1="18.1" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="5.9" y2="18.1"/><line x1="18.1" y1="5.9" x2="19.8" y2="4.2"/>',
  arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.7.5 1 1 1 2.3h6c0-1.3.3-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  mapPin: '<path d="M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.7"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="13"/><line x1="4" y1="9" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="11"/><line x1="12" y1="7" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="15"/><line x1="20" y1="11" x2="20" y2="3"/><line x1="1" y1="13" x2="7" y2="13"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="17" y1="15" x2="23" y2="15"/>',
  moreVertical: '<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 4.5 1.5 6 2 6.5H4c.5-.5 2-2 2-6.5z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4.5 16H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v.5"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/>',
  chevronRight: '<polyline points="9 6 15 12 9 18"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><line x1="2.5" y1="12" x2="21.5" y2="12"/><path d="M12 2.5c2.6 2.8 4 6 4 9.5s-1.4 6.7-4 9.5c-2.6-2.8-4-6-4-9.5s1.4-6.7 4-9.5z"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.3 8.1 4 4 0 0 1 17 16H7z"/>',
  cloudCheck: '<path d="M7 17a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 16.8 7.6 4 4 0 0 1 17 15.5"/><polyline points="9.2 15.3 11.3 17.4 15.3 12.8"/>',
  cloudOff: '<path d="M3 3l18 18"/><path d="M8.3 8.3A4.5 4.5 0 0 0 7 17h8.3"/><path d="M17.3 15.9A4 4 0 0 0 17 8.1 5.5 5.5 0 0 0 7.3 7.1"/>'
};

export const SECTION_ICON = {
  summary: 'fileText', skills: 'barChart', languages: 'globe', highlights: 'award',
  experience: 'briefcase', projects: 'folder', education: 'cap', certifications: 'award', custom: 'bookmark',
};

export default function Icon({ name, size = 16, className = '' }) {
  const body = ICON_PATHS[name] || ICON_PATHS.bookmark;
  return (
    <svg
      className={`ic${className ? ` ${className}` : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
