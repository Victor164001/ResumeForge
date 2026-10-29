export const TEMPLATES = [
  { id: 'classic', name: 'ATS Classic', tag: 'Safest choice', thumbClass: '',
    desc: 'Single-column reverse-chronological layout modelled on the format applicant tracking systems parse most reliably. The default for corporate, tech, finance and government roles.' },
  { id: 'harvard', name: 'Harvard Minimal', tag: 'Education-first', thumbClass: 'harvard',
    desc: 'The centred serif format taught by university career centres. Understated and credible — strong for academia, consulting, law and early-career applications.' },
  { id: 'modern', name: 'Modern Compact', tag: 'Subtle colour', thumbClass: 'modern',
    desc: 'The same safe skeleton as Classic with a restrained accent colour on headings. A little more personality for startups, still fully machine-readable.' },
];

/* Based on Korn Ferry's guidance on structuring a resume by experience level.
   Applying one only reorders existing sections; nothing is deleted. */
export const CAREER_STAGES = [
  { id: 'grad', label: 'Recent graduate',
    desc: 'Leads with Education, since you have more to show there than in a short work history. Keeps internships and activities specific rather than just listed.',
    order: ['education', 'experience', 'projects', 'skills', 'certifications', 'summary', 'custom'] },
  { id: 'junior', label: 'Early career (0–2 yrs)',
    desc: 'Skips the summary — with limited experience it tends to restate the obvious — and puts your relevant work front and center.',
    order: ['skills', 'experience', 'projects', 'education', 'certifications', 'summary', 'custom'] },
  { id: 'mid', label: 'Mid-level professional (7+ yrs)',
    desc: "Leads with a Summary seeded with the target role's keywords, then gives most of the page to your most recent role's achievements.",
    order: ['summary', 'experience', 'projects', 'skills', 'education', 'certifications', 'custom'] },
];

export function applyCareerStageOrder(sections, order) {
  const rank = (type) => { const i = order.indexOf(type); return i === -1 ? order.length : i; };
  return sections.slice().sort((a, b) => rank(a.type) - rank(b.type));
}

export const SECTION_SUBTITLES = {
  summary: 'Write a short summary about yourself (2–4 lines). Tip: rename this section to “Profile” if you prefer that heading.',
  skills: 'Add relevant skills — press Enter or click Add after each one.',
  languages: 'Add the languages you speak and how well you speak each.',
  highlights: 'A short bullet list of your overall career highlights, separate from the detailed Experience section.',
  experience: 'Add your work experience, most recent first.',
  projects: 'Showcase notable projects: what each was, and what you did on it.',
  education: 'Add your education history, most recent first.',
  certifications: 'List relevant certifications or licenses.',
  custom: 'Add whatever belongs in this section.',
};

export const ENTRY_LABELS = {
  experience: { add: 'Add experience', heading: 'Job Title', org: 'Company', desc: 'Description (optional)', bullets: 'Key achievements (one per line)' },
  projects: { add: 'Add project', heading: 'Project Name', org: 'Tech stack / role', desc: 'Project Description (optional)', bullets: 'Role & Contribution (one per line)' },
  education: { add: 'Add education', heading: 'Degree / Qualification', org: 'Institution', desc: 'Description (optional)', bullets: 'Details (one per line)' },
  certifications: { add: 'Add certification', heading: 'Certification Name', org: 'Issuing Organization', desc: 'Description (optional)', bullets: 'Details (one per line)' },
  custom: { add: 'Add entry', heading: 'Title', org: 'Subtitle', desc: 'Description (optional)', bullets: 'Details (one per line)' },
};

export const ADD_SECTION_OPTIONS = [
  ['summary', 'Summary / Profile'], ['skills', 'Skills'], ['languages', 'Languages'],
  ['highlights', 'Experience Summary (bullet list)'], ['experience', 'Experience'], ['projects', 'Projects'],
  ['education', 'Education'], ['certifications', 'Certifications'], ['custom', 'Custom — your own heading'],
];

export const BULLET_EXAMPLES = [
  { title: 'Led or owned something', icon: 'briefcase', items: [
    'Led a cross-functional team of 6 to redesign the onboarding flow, cutting time-to-first-value by 35%.',
    'Owned the roadmap for a product used by 50,000+ monthly active users.',
    'Directed the migration of a legacy billing system with zero downtime.',
  ] },
  { title: 'Improved a number', icon: 'barChart', items: [
    'Reduced page load time from 4.2s to 1.1s by optimizing the image pipeline.',
    'Increased qualified pipeline by 22% by rebuilding the lead-scoring model.',
    'Cut customer support tickets by 40% by shipping self-serve account recovery.',
  ] },
  { title: 'Built something new', icon: 'folder', items: [
    'Designed and shipped an internal analytics dashboard now used by 8 teams.',
    'Built a CI/CD pipeline that reduced deploy time from 45 minutes to 6.',
    'Prototyped and launched a referral program that drove 12% of new signups.',
  ] },
  { title: 'Collaborated across teams', icon: 'user', items: [
    'Partnered with design and legal to ship GDPR-compliant data export in 3 weeks.',
    'Worked directly with 5 enterprise customers to prioritize the Q3 roadmap.',
    'Mentored 2 junior engineers, both promoted within a year.',
  ] },
];

export const VERB_GROUPS = [
  { title: 'Leadership', verbs: ['Directed', 'Coordinated', 'Delegated', 'Executed', 'Orchestrated', 'Spearheaded', 'Mentored'] },
  { title: 'Communication', verbs: ['Authored', 'Presented', 'Negotiated', 'Persuaded', 'Facilitated', 'Advocated', 'Briefed'] },
  { title: 'Research & analysis', verbs: ['Analyzed', 'Investigated', 'Evaluated', 'Synthesized', 'Forecasted', 'Benchmarked', 'Diagnosed'] },
  { title: 'Technical', verbs: ['Built', 'Engineered', 'Automated', 'Deployed', 'Debugged', 'Migrated', 'Optimized'] },
  { title: 'Quantitative', verbs: ['Reduced', 'Increased', 'Generated', 'Forecasted', 'Budgeted', 'Reconciled', 'Projected'] },
  { title: 'Organizational', verbs: ['Streamlined', 'Standardized', 'Consolidated', 'Restructured', 'Implemented', 'Scheduled'] },
];

export const TIPS = [
  { title: 'Stick to one column', body: "Multi-column “sidebar” layouts look modern but many ATS engines read left-to-right across the whole line, scrambling a sidebar's contact info into the middle of your work history. All three templates here are single-column for this reason." },
  { title: 'Use the headings parsers expect', body: 'Summary, Skills, Experience, Education — not “What I bring” or “My journey.” Creative headings are the single most common reason a real section gets skipped entirely by parsing software.' },
  { title: 'Quantify wherever you can', body: '“Improved onboarding” is a claim. “Cut onboarding time from 12 minutes to 4” is evidence. A number, a percentage, or a before/after tells a reader more in less space.' },
  { title: 'Keep dates consistent', body: "Pick one date format and use it everywhere — this builder's date pickers do that for you automatically, including a clean “Present” for your current role." },
  { title: 'Save as PDF unless a form says otherwise', body: 'PDF preserves your layout exactly. Only send a Word file if an application explicitly asks for one — some older systems still expect .docx.' },
  { title: 'Match your language to the job post', body: "If the listing says “stakeholder management” and your resume says “worked with clients,” a keyword-matching system may not connect the two. Mirror the phrasing where it's honestly true of your experience." },
];

export const STAGE_TIPS = [
  { title: 'Recent graduate', body: "Put Education first — school, degree, GPA if strong, honors. Keep internship bullets short and specific rather than padded. Use activities to tell a story, not just list memberships. Keep it to one page with generous white space, and skip “references available upon request” — it's assumed." },
  { title: 'Early career (0–2 years)', body: "Skip the objective statement — it rarely says anything a hiring manager can use. No summary either; with limited experience it tends to just restate the obvious. It's fine to credit a team (“we shipped”, “our team improved”) rather than overclaiming solo credit. Only include experience relevant to the role, not every job you've held." },
  { title: 'Mid-level professional (7+ years)', body: "Lead with a short professional summary seeded with the exact keywords from the job description. Give roughly three-quarters of your Experience section's space to your most recent role. Quantify results (“35% increase”) without over-explaining the mechanism. Limit each job to 2–4 bullets and prioritize achievements over routine duties." },
];
