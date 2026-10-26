# ResumeForge API

The backend for ResumeForge: resume storage plus server-side PDF/DOCX
export and city lookup. Every piece of logic here is a direct port of the
same-named function in the frontend's `core_block.js` / `ui_part2.js`, so
a resume renders identically whether it's exported in the browser or
through this API — same alignment rules, same date formatting, same
bullet/paragraph modes, same city-search behaviour (including aliases
like "Bangalore" → Bengaluru, "blr" → Bengaluru).

## Setup

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:
- `http://localhost:8000/docs` — interactive Swagger UI
- `http://localhost:8000/api/health` — health check

Data is stored in a local SQLite file (`resumeforge.db`, created
automatically on first run). No external services required.

## Running the tests

```bash
pytest -q
```

73 tests, organized by module (see below). API tests run against an
isolated in-memory database via FastAPI's `dependency_overrides` — they
never touch `resumeforge.db`.

## Module map

| Module | Purpose | Ported from |
|---|---|---|
| `app/models/schemas.py` | Pydantic models for the resume data | `core_block.js` (`defaultState`/`defaultSection`/`emptyEntry`) |
| `app/services/alignment.py` | Per-template alignment resolution | `resolveAlign` / `ALIGN_DEFAULTS` |
| `app/services/dates.py` | Date formatting, legacy-date parsing, paragraph joining | `formatDateRange` / `parseLegacyDate` / `joinAsParagraph` |
| `app/services/geo.py` | Fuzzy city/country search with aliases | `searchLocations` / `fallbackScore` |
| `app/services/model_builder.py` | Builds the shared render-ready model | `buildModel` |
| `app/services/pdf_export.py` | Server-side PDF generation (ReportLab) | `exportPdf` (jsPDF) |
| `app/services/docx_export.py` | Server-side DOCX generation (python-docx) | `exportDocx` (docx.js) |
| `app/db.py` | SQLite persistence (SQLAlchemy) | — new to the backend |
| `app/routers/resumes.py` | CRUD + `/export.pdf` + `/export.docx` | — new to the backend |
| `app/routers/locations.py` | `/api/locations/search`, `/api/locations/countries` | — new to the backend |
| `app/data/geo_data.py` | City/country dataset + aliases | generated from `cities.js` — see the header comment before hand-editing |

## API summary

```
GET    /api/health
POST   /api/resumes                    create a resume, returns it with an id
GET    /api/resumes                    list resumes (most recent first)
GET    /api/resumes/{id}               fetch one resume
PUT    /api/resumes/{id}               update a resume
DELETE /api/resumes/{id}               delete a resume
GET    /api/resumes/{id}/export.pdf    real selectable-text PDF
GET    /api/resumes/{id}/export.docx   real Word document
GET    /api/locations/search?q=...     fuzzy city search, optional &country=
GET    /api/locations/countries?q=...  fuzzy country search
```

## Notes on parity with the frontend

- **Alignment, dates, and paragraph-joining** are behavior-identical to
  the frontend by direct port — the same test cases (e.g. `"blr"` →
  Bengaluru, `"Jan 2023 – Present"` formatting) pass on both sides.
- **PDF bullets are drawn as vector dots, not the unicode bullet
  character.** Some PDF text-extraction tools mis-decode `•` under
  non-embedded standard fonts; since ATS-parseability is the whole point
  of this product, the bullet marker carries no semantic meaning anyway —
  only the achievement text after it matters, and that always extracts
  cleanly. This is a deliberate deviation from the frontend's jsPDF output
  in service of the same goal both are built for.
- **Storage** is intentionally simple (SQLite, one JSON column per
  resume) so the schema in `schemas.py` can evolve without ever touching
  a database migration.

## Production notes

Before deploying for real: restrict `CORSMiddleware`'s `allow_origins` in
`app/main.py` to your actual frontend origin(s), and consider swapping
SQLite for Postgres by changing `RESUMEFORGE_DATABASE_URL` — the code
doesn't assume SQLite anywhere except the default connection string.
