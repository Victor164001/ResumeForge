"""
City/country fuzzy search.

Ports the frontend's searchLocations()/searchCountries() AND their
fallbackScore() algorithm (core_block.js) directly, rather than relying on
a generic fuzzy-matching library, so the ranking behaviour is identical on
both surfaces - a prefix match always wins, then a subsequence match with
a gap penalty, checked across city, alias and country and combined the
same way the frontend combines them.
"""
from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from typing import List, Optional

from app.data.geo_data import ALIASES, GEO_RAW


@dataclass(frozen=True)
class LocationRecord:
    city: str
    country: str
    alias: str
    label: str


@dataclass(frozen=True)
class CountryRecord:
    name: str
    cities: tuple


@lru_cache(maxsize=1)
def _build_geo():
    countries: List[CountryRecord] = []
    index: List[LocationRecord] = []
    for line in GEO_RAW:
        country, cities_str = line.split("::", 1)
        cities = tuple(c for c in cities_str.split("|") if c)
        countries.append(CountryRecord(name=country, cities=cities))
        for city in cities:
            label = city if country == "Remote" else f"{city}, {country}"
            index.append(LocationRecord(city=city, country=country, alias=ALIASES.get(city, ""), label=label))
    return countries, index


def get_countries() -> List[CountryRecord]:
    return _build_geo()[0]


def get_index() -> List[LocationRecord]:
    return _build_geo()[1]


def fallback_score(hay: str, needle: str) -> float:
    """Direct port of the frontend's fallbackScore(): prefix match beats
    everything, then a subsequence match penalized by the gaps between
    matched characters. Returns -1 for no match."""
    hay = (hay or "").lower()
    needle = (needle or "").lower()
    if not needle:
        return 1
    direct = hay.find(needle)
    if direct == 0:
        return 1000 - len(hay)
    if direct > 0:
        return 700 - direct - len(hay) * 0.1

    hi, score, gaps, last = 0, 0, 0, -1
    for ch in needle:
        found = hay.find(ch, hi)
        if found == -1:
            return -1
        if last >= 0:
            gaps += (found - last - 1)
        last = found
        hi = found + 1
        score += 10
    return 300 + score - gaps


def search_locations(query: str, country: Optional[str] = None, limit: int = 40) -> List[LocationRecord]:
    pool = get_index()
    if country and country != "__all__":
        pool = [r for r in pool if r.country == country]

    q = (query or "").strip()
    if not q:
        return pool[:limit]

    scored = []
    for r in pool:
        s = max(
            fallback_score(r.city, q),
            (fallback_score(r.alias, q) - 20) if r.alias else -1,
            fallback_score(r.country, q) - 200,
        )
        if s > 0:
            scored.append((s, r))
    scored.sort(key=lambda x: -x[0])
    return [r for _s, r in scored[:limit]]


def search_countries(query: str) -> List[CountryRecord]:
    countries = get_countries()
    q = (query or "").strip()
    if not q:
        return countries
    scored = [(fallback_score(c.name, q), c) for c in countries]
    scored = [(s, c) for s, c in scored if s > 0]
    scored.sort(key=lambda x: -x[0])
    return [c for _s, c in scored]
