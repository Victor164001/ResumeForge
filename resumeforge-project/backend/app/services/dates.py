"""
Date formatting and bullet/paragraph text shaping.

Direct ports of formatDateRange / formatOneDate / joinAsParagraph from the
frontend's core_block.js.
"""
from __future__ import annotations

import re
from datetime import date
from typing import Iterable, List

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def year_options() -> List[str]:
    now = date.today().year
    return [str(y) for y in range(now + 6, 1969, -1)]


def format_one_date(month: str, year: str) -> str:
    if not year and not month:
        return ""
    if not year:
        return month or ""
    if not month:
        return str(year)
    return f"{month} {year}"


def format_date_range(entry: dict) -> str:
    start = format_one_date(entry.get("start_month") or entry.get("startMonth", ""),
                             entry.get("start_year") or entry.get("startYear", ""))
    if entry.get("is_present") or entry.get("isPresent"):
        end = "Present"
    else:
        end = format_one_date(entry.get("end_month") or entry.get("endMonth", ""),
                               entry.get("end_year") or entry.get("endYear", ""))
    if start and end:
        return f"{start} \u2013 {end}"
    return start or end or ""


LEGACY_MONTH_RE = re.compile(r"[A-Za-z]{3,}")
LEGACY_YEAR_RE = re.compile(r"(19|20)\d{2}")


def parse_legacy_date(text: str) -> dict:
    """Parses old free-text dates like 'Jan 2023' / 'Present' / '2019',
    for importing resumes saved before structured dates existed."""
    out = {"month": "", "year": "", "present": False}
    if not text:
        return out
    s = str(text).strip()
    if re.match(r"^(present|current|now|ongoing)$", s, re.I):
        out["present"] = True
        return out
    m = LEGACY_MONTH_RE.search(s)
    if m:
        token = m.group(0).lower()
        for mo in MONTHS:
            if token.startswith(mo.lower()):
                out["month"] = mo
                break
    y = LEGACY_YEAR_RE.search(s)
    if y:
        out["year"] = y.group(0)
    return out


def join_as_paragraph(bullets: Iterable[str]) -> str:
    """Turns bullet lines into flowing prose - used by the paragraph-format
    entry style. The underlying bullet data never changes; this only
    affects how it's displayed/exported."""
    parts = []
    for b in bullets or []:
        t = str(b or "").strip()
        if not t:
            continue
        if not re.search(r"[.!?]$", t):
            t += "."
        parts.append(t)
    return " ".join(parts)
