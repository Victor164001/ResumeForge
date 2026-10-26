"""
ResumeForge API - application entrypoint.

Run locally with:
    uvicorn app.main:app --reload

Interactive docs are then available at /docs (Swagger) and /redoc.
"""
from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import db
from app.routers import locations, resumes


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_db()
    yield


app = FastAPI(
    title="ResumeForge API",
    description="Backend for the ResumeForge resume builder: resume storage plus "
                "server-side PDF/DOCX export and city lookup, mirroring the exact "
                "logic used by the client-side app.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your real frontend origin(s) before production use
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


app.include_router(resumes.router)
app.include_router(locations.router)
