/* The ResumeForge "Spark Check" mark: a resume page with a check mark throwing
   sparks. Colors come from the theme tokens, so it adapts to light and dark. */
export default function Logo({ size = 26, title }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <path d="M14 6H36L46 16V58H14Z" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M36 6V16H46" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M21 37L28 44L43 27" fill="none" stroke="var(--accent)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 21L55 16M52 29L58 29M48 13L50 7" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
