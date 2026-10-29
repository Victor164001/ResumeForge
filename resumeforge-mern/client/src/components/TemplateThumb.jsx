export default function TemplateThumb({ template, name = 'Alex Rivera', compact = false }) {
  return (
    <div className={`tpl-thumb ${template.thumbClass}`}>
      <div className="tn">{name}</div>
      <div className="tc">{compact ? 'Preview' : 'alex@email.com · +91 98765 43210 · Mumbai, India'}</div>
      <div className="th">Summary</div><div className="tl w80" />{!compact && <div className="tl w60" />}
      <div className="th">Experience</div><div className="tl w40" /><div className="tl w80" />{!compact && <div className="tl w60" />}
      <div className="th">{compact ? 'Skills' : 'Education'}</div><div className="tl w60" />
    </div>
  );
}
