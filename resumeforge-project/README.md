# ResumeForge

ATS-friendly resume builder: Dashboard, multi-resume library, 3 single-column
templates, ATS checker, cover letter, PDF + Word export.

## What is in this folder

| Folder | What it is | State |
|---|---|---|
| `frontend/index.html` | The complete app in one file (HTML + CSS + JS). | Working. This is what is published as the Claude artifact. |
| `backend/` | Python / FastAPI API: resume CRUD, server-side PDF + DOCX export, city search. 73 tests. | Working on its own. **Not connected to the frontend.** |
| `vercel-api-draft/data.js` | Draft Vercel Function for storing one JSON document per sync key in a private Vercel Blob store. | **Draft. Untested. Not wired to the frontend.** |

## Run the frontend

Open `frontend/index.html` in a browser, or upload it to any static host
(Vercel, Netlify, GitHub Pages). Resumes are saved in the browser
(localStorage). PDF and Word downloads work on any normal website.

Note: the "cloud sync" in this file uses a feature that only exists inside
claude.ai. Anywhere else the app runs in browser-only storage mode and says so
in the toolbar.

## Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload     # docs at http://localhost:8000/docs
pytest -q
```

## Put this on GitHub

1. Create an empty repository at https://github.com/new (no README).
2. Then, from the folder that contains this README:

```bash
git init
git add .
git commit -m "ResumeForge: initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/resumeforge.git
git push -u origin main
```

## Still to do for a public site with a real database

- Change the frontend's sync code to call a storage API (the draft in
  `vercel-api-draft/` is a starting point) instead of the claude.ai-only feature.
- Test it, then deploy. There is no login system: a "sync key" stored in the
  browser would be the only thing identifying someone's data.
