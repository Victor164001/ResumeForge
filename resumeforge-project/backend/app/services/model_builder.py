"""
Render-ready model builder.

Direct port of buildModel() from the frontend's core_block.js. Both the
PDF and DOCX export services consume this same model, so a resume renders
identically across formats - exactly like the client-side exporters share
one buildModel() output.
"""
from __future__ import annotations

from typing import Any, Dict, List

from app.models.schemas import Resume
from app.services.alignment import resolve_align, use_split_row
from app.services.dates import format_date_range


def build_model(resume: Resume) -> Dict[str, Any]:
    t = resume.template_id.value
    header_align = resolve_align(resume.heading.align.value, "header", t)

    model: Dict[str, Any] = {
        "template": t,
        "accent": resume.accent,
        "page_size": resume.page_size.value,
        "header": {
            "align": header_align,
            "name": (resume.heading.name or "").strip(),
            "role": (resume.heading.role or "").strip(),
            "contacts": [c.value.strip() for c in resume.heading.contacts if (c.value or "").strip()],
        },
        "sections": [],
    }

    for s in resume.sections:
        body_align = resolve_align(s.align.value, "body", t)
        title_align = resolve_align(s.align.value, "title", t)
        out: Dict[str, Any] = {
            "type": s.type.value,
            "title": (s.title or "").strip(),
            "title_align": title_align,
            "body_align": body_align,
            "split": use_split_row(body_align),
        }

        if s.type.value == "summary":
            out["text"] = (s.text or "").strip()
            if not out["text"]:
                continue
        elif s.type.value == "skills":
            out["items"] = [i for i in (s.items or []) if i]
            if not out["items"]:
                continue
        else:
            out["style"] = "paragraph" if (s.style and s.style.value == "paragraph") else "bullets"
            entries: List[Dict[str, Any]] = []
            for e in (s.entries or []):
                bullets = [str(b or "").strip() for b in e.bullets if str(b or "").strip()]
                entry_out = {
                    "heading": (e.heading or "").strip(),
                    "org": (e.org or "").strip(),
                    "location": (e.location or "").strip(),
                    "dates": format_date_range({
                        "startMonth": e.start_month, "startYear": e.start_year,
                        "endMonth": e.end_month, "endYear": e.end_year,
                        "isPresent": e.is_present,
                    }),
                    "bullets": bullets,
                }
                if entry_out["heading"] or entry_out["org"] or entry_out["bullets"]:
                    entries.append(entry_out)
            out["entries"] = entries
            if not entries:
                continue

        if not out["title"]:
            continue
        model["sections"].append(out)

    return model
