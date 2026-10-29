/* PDF and Word generation, run in the browser from the shared render model.
   Both produce real selectable text so applicant tracking systems can parse them. */
import { jsPDF } from 'jspdf';
import * as d from 'docx';
import RF from '@shared/core.js';

const LONG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const todayLong = () => { const t = new Date(); return `${LONG_MONTHS[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`; };

/* ---------------- resume → PDF ---------------- */
export function resumePdf(state) {
  const m = RF.buildModel(state);
  const doc = new jsPDF({ unit: 'pt', format: m.pageSize === 'a4' ? 'a4' : 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxW = pageW - margin * 2;
  let y = margin;
  const accent = RF.hexToRgb(m.accent);
  const isModern = m.template === 'modern';
  const font = m.template === 'harvard' ? 'times' : 'helvetica';

  const space = (h) => { if (y + h > pageH - margin) { doc.addPage(); y = margin; } };
  const ink = () => doc.setTextColor(21, 21, 21);
  const accentInk = () => doc.setTextColor(accent.r, accent.g, accent.b);
  const anchorX = (align) => (align === 'center' ? pageW / 2 : align === 'right' ? pageW - margin : margin);

  function put(text, align, size, style, gap) {
    doc.setFont(font, style || 'normal');
    doc.setFontSize(size);
    const a = align === 'justify' ? 'left' : align;
    const lh = gap || size * 1.34;
    doc.splitTextToSize(String(text), maxW).forEach((line) => {
      space(lh);
      doc.text(line, anchorX(a), y, { align: a });
      y += lh;
    });
  }
  function putSplit(left, right, size, style, italic) {
    doc.setFont(font, italic ? 'italic' : style || 'normal');
    doc.setFontSize(size);
    const rightW = right ? doc.getTextWidth(right) + 12 : 0;
    const lines = doc.splitTextToSize(String(left || ''), maxW - rightW);
    const lh = size * 1.34;
    lines.forEach((line, i) => {
      space(lh);
      doc.text(line, margin, y);
      if (i === 0 && right) doc.text(right, pageW - margin, y, { align: 'right' });
      y += lh;
    });
    if (!lines.length && right) { space(lh); doc.text(right, pageW - margin, y, { align: 'right' }); y += lh; }
  }
  function bullets(items, align) {
    const size = 10.2;
    const indent = 13;
    doc.setFont(font, 'normal');
    doc.setFontSize(size);
    items.forEach((item) => {
      if (align === 'left' || align === 'justify') {
        doc.splitTextToSize(item, maxW - indent).forEach((line, i) => {
          space(size * 1.36);
          if (i === 0) doc.text('•', margin, y);
          doc.text(line, margin + indent, y);
          y += size * 1.36;
        });
      } else {
        put(`• ${item}`, align, size, 'normal');
      }
    });
  }
  function sectionTitle(text, align) {
    space(26);
    doc.setFont(font, 'bold');
    doc.setFontSize(11);
    if (isModern) accentInk(); else ink();
    const up = text.toUpperCase();
    doc.text(up, anchorX(align), y, { align, charSpace: 0.7 });
    const tw = doc.getTextWidth(up) + up.length * 0.7;
    y += 5;
    doc.setDrawColor(isModern ? accent.r : 60, isModern ? accent.g : 60, isModern ? accent.b : 60);
    doc.setLineWidth(isModern ? 1 : 1.2);
    if (align === 'right') doc.line(pageW - margin - Math.max(tw, 60), y, pageW - margin, y);
    else doc.line(margin, y, pageW - margin, y);
    ink();
    y += 12;
  }

  const ha = m.header.align;
  doc.setFont(font, 'bold');
  doc.setFontSize(isModern ? 20 : 19);
  if (isModern) accentInk(); else ink();
  space(24);
  doc.text(m.header.name || 'Your Name', anchorX(ha), y, { align: ha });
  y += 22;
  ink();
  if (m.header.role) put(m.header.role, ha, 11.5, 'normal');
  if (m.header.contacts.length) put(m.header.contacts.join('   |   '), ha, 9.6, 'normal', 13);
  y += 8;

  m.sections.forEach((s) => {
    sectionTitle(s.title, s.titleAlign);
    if (s.type === 'summary') put(s.text, s.bodyAlign, 10.4, 'normal');
    else if (s.type === 'skills') {
      if (s.display === 'list') bullets(s.items, s.bodyAlign);
      else put(s.items.join('   •   '), s.bodyAlign, 10.4, 'normal');
    } else if (s.type === 'languages') {
      s.items.forEach((l) => put(l.level ? `${l.language} – ${l.level}` : l.language, s.bodyAlign, 10.4, 'normal'));
    } else if (s.type === 'highlights') bullets(s.items, s.bodyAlign);
    else {
      s.entries.forEach((e) => {
        if (s.split) {
          putSplit(e.heading, e.dates, 10.8, 'bold');
          if (e.org || e.location) putSplit(e.org, e.location, 9.9, 'normal', true);
        } else {
          put([e.heading, e.dates].filter(Boolean).join('  |  '), s.bodyAlign, 10.8, 'bold');
          const l2 = [e.org, e.location].filter(Boolean).join('  |  ');
          if (l2) put(l2, s.bodyAlign, 9.9, 'italic');
        }
        if (e.description) put(e.description, s.bodyAlign, 10.2, 'normal');
        if (e.bullets.length) {
          if (s.style === 'paragraph') put(RF.joinAsParagraph(e.bullets), s.bodyAlign, 10.2, 'normal');
          else bullets(e.bullets, s.bodyAlign);
        }
        y += 5;
      });
    }
    y += 5;
  });

  return { blob: doc.output('blob'), filename: `${RF.sanitizeFilename(m.header.name)}-resume.pdf`, name: m.header.name };
}

/* ---------------- resume → DOCX ---------------- */
export async function resumeDocx(state) {
  const m = RF.buildModel(state);
  const AT = { left: d.AlignmentType.LEFT, center: d.AlignmentType.CENTER, right: d.AlignmentType.RIGHT, justify: d.AlignmentType.JUSTIFIED };
  const isModern = m.template === 'modern';
  const accentHex = isModern ? RF.rgbToHex2(RF.hexToRgb(m.accent)) : '111111';
  const font = m.template === 'harvard' ? 'Georgia' : isModern ? 'Calibri' : 'Arial';
  const run = (text, extra = {}) => new d.TextRun({ text, font, ...extra });
  const bullet = (text, align) => new d.Paragraph({ bullet: { level: 0 }, alignment: align, spacing: { after: 10 }, children: [run(text, { size: 19 })] });
  const kids = [];

  kids.push(new d.Paragraph({
    alignment: AT[m.header.align], spacing: { after: 40 },
    children: [run(m.header.name || 'Your Name', { bold: true, size: isModern ? 40 : 38, color: accentHex })],
  }));
  if (m.header.role) {
    kids.push(new d.Paragraph({ alignment: AT[m.header.align], spacing: { after: 40 }, children: [run(m.header.role, { size: 23, color: '444444' })] }));
  }
  if (m.header.contacts.length) {
    kids.push(new d.Paragraph({ alignment: AT[m.header.align], spacing: { after: 160 }, children: [run(m.header.contacts.join('   |   '), { size: 19, color: '333333' })] }));
  }

  const rightTab = [{ type: d.TabStopType.RIGHT, position: d.TabStopPosition.MAX }];

  m.sections.forEach((s) => {
    kids.push(new d.Paragraph({
      alignment: AT[s.titleAlign], spacing: { before: 200, after: 70 },
      border: { bottom: { color: isModern ? accentHex : '333333', space: 2, style: d.BorderStyle.SINGLE, size: 6 } },
      children: [run((s.title || '').toUpperCase(), { bold: true, size: 21, color: isModern ? accentHex : '111111', characterSpacing: 22 })],
    }));
    if (s.type === 'summary') {
      kids.push(new d.Paragraph({ alignment: AT[s.bodyAlign], spacing: { after: 80 }, children: [run(s.text, { size: 20 })] }));
    } else if (s.type === 'skills') {
      if (s.display === 'list') s.items.forEach((x) => kids.push(bullet(x, AT[s.bodyAlign])));
      else kids.push(new d.Paragraph({ alignment: AT[s.bodyAlign], spacing: { after: 80 }, children: [run(s.items.join('   •   '), { size: 20 })] }));
    } else if (s.type === 'languages') {
      s.items.forEach((l) => kids.push(new d.Paragraph({
        alignment: AT[s.bodyAlign], spacing: { after: 20 },
        children: [run(l.level ? `${l.language} – ${l.level}` : l.language, { size: 20 })],
      })));
    } else if (s.type === 'highlights') {
      s.items.forEach((x) => kids.push(bullet(x, AT[s.bodyAlign])));
    } else {
      const bodyAlign = s.split ? AT.left : AT[s.bodyAlign];
      s.entries.forEach((e) => {
        if (s.split) {
          kids.push(new d.Paragraph({ tabStops: rightTab, spacing: { after: 10 }, children: [
            run(e.heading, { bold: true, size: 21 }), run(e.dates ? `\t${e.dates}` : '', { size: 19 }),
          ] }));
          if (e.org || e.location) {
            kids.push(new d.Paragraph({ tabStops: rightTab, spacing: { after: 30 }, children: [
              run(e.org, { italics: true, size: 19 }), run(e.location ? `\t${e.location}` : '', { italics: true, size: 19 }),
            ] }));
          }
        } else {
          kids.push(new d.Paragraph({ alignment: AT[s.bodyAlign], spacing: { after: 10 }, children: [run([e.heading, e.dates].filter(Boolean).join('  |  '), { bold: true, size: 21 })] }));
          const l2 = [e.org, e.location].filter(Boolean).join('  |  ');
          if (l2) kids.push(new d.Paragraph({ alignment: AT[s.bodyAlign], spacing: { after: 30 }, children: [run(l2, { italics: true, size: 19 })] }));
        }
        if (e.description) kids.push(new d.Paragraph({ alignment: bodyAlign, spacing: { after: 30 }, children: [run(e.description, { size: 19 })] }));
        if (s.style === 'paragraph') {
          const para = RF.joinAsParagraph(e.bullets);
          if (para) kids.push(new d.Paragraph({ alignment: bodyAlign, spacing: { after: 10 }, children: [run(para, { size: 19 })] }));
        } else {
          e.bullets.forEach((b) => kids.push(bullet(b, bodyAlign)));
        }
        kids.push(new d.Paragraph({ text: '', spacing: { after: 40 } }));
      });
    }
  });

  const doc = new d.Document({
    creator: 'ResumeForge',
    title: m.header.name || 'Resume',
    sections: [{
      properties: { page: {
        size: { width: m.pageSize === 'a4' ? 11906 : 12240, height: m.pageSize === 'a4' ? 16838 : 15840 },
        margin: { top: 864, bottom: 864, left: 864, right: 864 },
      } },
      children: kids,
    }],
  });
  return { blob: await d.Packer.toBlob(doc), filename: `${RF.sanitizeFilename(m.header.name)}-resume.docx`, name: m.header.name };
}

/* ---------------- cover letter ---------------- */
export function coverLetterPdf(cl) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 54;
  const maxW = pageW - margin * 2;
  let y = margin;
  const put = (text, size = 10.5, style = 'normal') => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.splitTextToSize(text || '', maxW).forEach((line) => {
      if (y + size * 1.4 > pageH - margin) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += size * 1.4;
    });
  };
  put(todayLong()); y += 10;
  if (cl.recipientName) put(cl.recipientName);
  if (cl.company) put(cl.company);
  y += 10;
  put(cl.greeting); y += 10;
  [cl.opening, cl.body, cl.closing].forEach((p) => { if ((p || '').trim()) { put(p); y += 10; } });
  put(cl.signoff); y += 22;
  put(cl.applicantName, 10.5, 'bold');
  return { blob: doc.output('blob'), filename: `${RF.sanitizeFilename(cl.applicantName || 'cover-letter')}-cover-letter.pdf` };
}

export async function coverLetterDocx(cl) {
  const kids = [];
  const para = (text, after = 120, bold = false) =>
    kids.push(new d.Paragraph({ spacing: { after }, children: [new d.TextRun({ text: text || '', size: 21, font: 'Arial', bold })] }));
  para(todayLong(), 200);
  if (cl.recipientName) para(cl.recipientName, 20);
  if (cl.company) para(cl.company, 200);
  para(cl.greeting, 200);
  [cl.opening, cl.body, cl.closing].forEach((p) => { if ((p || '').trim()) para(p, 200); });
  para(cl.signoff, 400);
  para(cl.applicantName, 0, true);
  const doc = new d.Document({ creator: 'ResumeForge', sections: [{ children: kids }] });
  return { blob: await d.Packer.toBlob(doc), filename: `${RF.sanitizeFilename(cl.applicantName || 'cover-letter')}-cover-letter.docx` };
}

export { todayLong };
