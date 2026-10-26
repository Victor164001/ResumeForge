"""
Server-side PDF export.

Ports the layout logic of the frontend's exportPdf() (jsPDF, ui_part2.js)
to ReportLab: same margins, same per-template fonts and accent handling,
same split-row vs inline date layout, same bullets/paragraph modes. Output
is real selectable text, never a rasterized image, so it stays ATS-safe.
"""
from __future__ import annotations

import io
from typing import Any, Dict, List, Tuple

from reportlab.lib.pagesizes import A4, LETTER
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas as pdfcanvas

from app.services.dates import join_as_paragraph

MARGIN = 48.0


def _font_for(template: str, style: str) -> str:
    """style: 'normal' | 'bold' | 'italic'."""
    if template == "harvard":
        return {"normal": "Times-Roman", "bold": "Times-Bold", "italic": "Times-Italic"}[style]
    return {"normal": "Helvetica", "bold": "Helvetica-Bold", "italic": "Helvetica-Oblique"}[style]


def _hex_to_rgb01(hex_color: str) -> Tuple[float, float, float]:
    h = (hex_color or "#B23A2F").lstrip("#")
    if len(h) != 6:
        h = "B23A2F"
    return tuple(int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4))


def _wrap_text(text: str, font: str, size: float, max_width: float) -> List[str]:
    words = str(text or "").split()
    if not words:
        return []
    lines, current = [], words[0]
    for w in words[1:]:
        trial = current + " " + w
        if stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            lines.append(current)
            current = w
    lines.append(current)
    return lines


class _PdfWriter:
    """Mirrors the closure-based cursor pattern in the JS exportPdf()."""

    def __init__(self, c: pdfcanvas.Canvas, page_w: float, page_h: float, template: str, accent_hex: str):
        self.c = c
        self.page_w = page_w
        self.page_h = page_h
        self.template = template
        self.is_modern = template == "modern"
        self.accent = _hex_to_rgb01(accent_hex)
        self.margin = MARGIN
        self.max_w = page_w - self.margin * 2
        self.y = self.margin

    def _anchor_x(self, align: str) -> float:
        if align == "center":
            return self.page_w / 2
        if align == "right":
            return self.page_w - self.margin
        return self.margin

    def ensure_space(self, h: float):
        if self.y + h > self.page_h - self.margin:
            self.c.showPage()
            self.y = self.margin

    def ink(self):
        self.c.setFillColorRGB(0.08, 0.08, 0.08)

    def accent_ink(self):
        self.c.setFillColorRGB(*self.accent)

    def put(self, text: str, align: str, size: float, style: str = "normal", line_gap: float | None = None):
        font = _font_for(self.template, style)
        lg = line_gap or size * 1.34
        real_align = "left" if align == "justify" else align
        for line in _wrap_text(text, font, size, self.max_w):
            self.ensure_space(lg)
            self.c.setFont(font, size)
            x = self._anchor_x(real_align)
            if real_align == "center":
                self.c.drawCentredString(x, self.page_h - self.y - size, line)
            elif real_align == "right":
                self.c.drawRightString(x, self.page_h - self.y - size, line)
            else:
                self.c.drawString(x, self.page_h - self.y - size, line)
            self.y += lg

    def put_split(self, left: str, right: str, size: float, style: str = "normal", italic: bool = False):
        font = _font_for(self.template, "italic" if italic else style)
        right_w = (stringWidth(right, font, size) + 12) if right else 0
        lines = _wrap_text(left, font, size, self.max_w - right_w) or [""]
        lg = size * 1.34
        for i, line in enumerate(lines):
            self.ensure_space(lg)
            self.c.setFont(font, size)
            self.c.drawString(self.margin, self.page_h - self.y - size, line)
            if i == 0 and right:
                self.c.drawRightString(self.page_w - self.margin, self.page_h - self.y - size, right)
            self.y += lg

    def bullets(self, items: List[str], align: str):
        size, indent = 10.2, 13
        font = _font_for(self.template, "normal")
        for item in items:
            if align in ("left", "justify"):
                lines = _wrap_text(item, font, size, self.max_w - indent) or [""]
                for i, line in enumerate(lines):
                    self.ensure_space(size * 1.36)
                    self.c.setFont(font, size)
                    if i == 0:
                        # a small drawn dot, not a text glyph: some PDF text
                        # extractors mis-decode the unicode bullet character
                        # under non-embedded base-14 fonts, and a vector
                        # shape sidesteps that ambiguity entirely.
                        dot_y = self.page_h - self.y - size + size * 0.32
                        self.c.circle(self.margin + 2.2, dot_y, 1.4, stroke=0, fill=1)
                    self.c.drawString(self.margin + indent, self.page_h - self.y - size, line)
                    self.y += size * 1.36
            else:
                self.put("- " + item, align, size, "normal")

    def section_title(self, text: str, align: str):
        self.ensure_space(26)
        font = _font_for(self.template, "bold")
        size = 11
        if self.is_modern:
            self.accent_ink()
        else:
            self.ink()
        up = text.upper()
        self.c.setFont(font, size)
        x = self._anchor_x(align)
        yy = self.page_h - self.y - size
        if align == "center":
            self.c.drawCentredString(x, yy, up)
            tw = stringWidth(up, font, size)
            line_y = yy - 5
            self.c.setLineWidth(1 if self.is_modern else 1.2)
            if self.is_modern:
                self.c.setStrokeColorRGB(*self.accent)
            else:
                self.c.setStrokeColorRGB(60 / 255, 60 / 255, 60 / 255)
            self.c.line(self.margin, line_y, self.page_w - self.margin, line_y)
        elif align == "right":
            self.c.drawRightString(x, yy, up)
            tw = stringWidth(up, font, size)
            line_y = yy - 5
            self.c.setLineWidth(1 if self.is_modern else 1.2)
            if self.is_modern:
                self.c.setStrokeColorRGB(*self.accent)
            else:
                self.c.setStrokeColorRGB(60 / 255, 60 / 255, 60 / 255)
            self.c.line(self.page_w - self.margin - max(tw, 60), line_y, self.page_w - self.margin, line_y)
        else:
            self.c.drawString(x, yy, up)
            line_y = yy - 5
            self.c.setLineWidth(1 if self.is_modern else 1.2)
            if self.is_modern:
                self.c.setStrokeColorRGB(*self.accent)
            else:
                self.c.setStrokeColorRGB(60 / 255, 60 / 255, 60 / 255)
            self.c.line(self.margin, line_y, self.page_w - self.margin, line_y)
        self.ink()
        self.y += 5 + 12


def render_pdf(model: Dict[str, Any]) -> bytes:
    page_size = A4 if model.get("page_size") == "a4" else LETTER
    page_w, page_h = page_size
    buf = io.BytesIO()
    c = pdfcanvas.Canvas(buf, pagesize=page_size)
    c.setTitle(model["header"].get("name") or "Resume")

    w = _PdfWriter(c, page_w, page_h, model["template"], model.get("accent", "#B23A2F"))
    header = model["header"]
    ha = header["align"]

    # header
    name_font = _font_for(w.template, "bold")
    name_size = 20 if w.is_modern else 19
    (w.accent_ink if w.is_modern else w.ink)()
    c.setFont(name_font, name_size)
    x = w._anchor_x(ha)
    yy = page_h - w.y - name_size
    name_text = header.get("name") or "Your Name"
    if ha == "center":
        c.drawCentredString(x, yy, name_text)
    elif ha == "right":
        c.drawRightString(x, yy, name_text)
    else:
        c.drawString(x, yy, name_text)
    w.y += 22
    w.ink()

    if header.get("role"):
        w.put(header["role"], ha, 11.5, "normal")
    contacts = "   |   ".join(header.get("contacts", []))
    if contacts:
        w.put(contacts, ha, 9.6, "normal", line_gap=13)
    w.y += 8

    for s in model["sections"]:
        w.section_title(s["title"] or "Section", s["title_align"])
        if s["type"] == "summary":
            w.put(s.get("text", ""), s["body_align"], 10.4, "normal")
        elif s["type"] == "skills":
            w.put("   \u2022   ".join(s.get("items", [])), s["body_align"], 10.4, "normal")
        else:
            for e in s.get("entries", []):
                if s["split"]:
                    w.put_split(e["heading"], e.get("dates", ""), 10.8, "bold")
                    if e.get("org") or e.get("location"):
                        w.put_split(e.get("org", ""), e.get("location", ""), 9.9, "normal", italic=True)
                else:
                    line1 = "  |  ".join(filter(None, [e["heading"], e.get("dates", "")]))
                    w.put(line1, s["body_align"], 10.8, "bold")
                    line2 = "  |  ".join(filter(None, [e.get("org", ""), e.get("location", "")]))
                    if line2:
                        w.put(line2, s["body_align"], 9.9, "italic")
                if e.get("bullets"):
                    if s.get("style") == "paragraph":
                        w.put(join_as_paragraph(e["bullets"]), s["body_align"], 10.2, "normal")
                    else:
                        w.bullets(e["bullets"], s["body_align"])
                w.y += 5
        w.y += 5

    c.showPage()
    c.save()
    return buf.getvalue()
