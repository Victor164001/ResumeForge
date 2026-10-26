"""
Alignment resolution.

Direct port of ALIGN_DEFAULTS / resolveAlign from the frontend's
core_block.js. Every resume element (header, section title, section body)
resolves through here so a resume renders identically whether it's built
in the browser or through this API.
"""
from __future__ import annotations

ALIGN_DEFAULTS = {
    "classic": {"header": "left", "title": "left", "body": "left"},
    "harvard": {"header": "center", "title": "center", "body": "left"},
    "modern": {"header": "left", "title": "left", "body": "left"},
}


def resolve_align(align: str | None, role: str, template_id: str) -> str:
    """role is one of: 'header', 'title', 'body'."""
    defaults = ALIGN_DEFAULTS.get(template_id, ALIGN_DEFAULTS["classic"])
    if not align or align == "auto":
        return defaults.get(role, "left")
    if align == "justify":
        # justify only makes sense for flowing paragraph text
        return "justify" if role == "body" else "left"
    return align


def use_split_row(body_align: str) -> bool:
    """A title-left / date-right row only reads correctly when left-aligned."""
    return body_align in ("left", "justify")
