"""
Location search endpoints, backing the frontend's city/country picker.
"""
from __future__ import annotations

from fastapi import APIRouter, Query

from app.services import geo

router = APIRouter(prefix="/api/locations", tags=["locations"])


@router.get("/countries")
def list_countries(q: str = Query("", description="Optional fuzzy filter on country name")):
    return [{"name": c.name, "cityCount": len(c.cities)} for c in geo.search_countries(q)]


@router.get("/search")
def search_locations(
    q: str = Query("", description="Fuzzy search text, e.g. 'bangalore', 'sfo', 'mumb'"),
    country: str = Query("__all__", description="Country name to restrict to, or __all__"),
    limit: int = Query(40, ge=1, le=200),
):
    results = geo.search_locations(q, country, limit)
    return [{"city": r.city, "country": r.country, "label": r.label} for r in results]
