# ResumeForge (MERN)

ATS-friendly resume builder: **MongoDB + Express + React + Node**.

Accounts, resumes, cover letters, activity and dashboard stats live in MongoDB. The React app autosaves while you type, and PDF / Word files are generated in the browser with real, selectable text.

## Project structure

```
resumeforge-mern/
├── package.json            # root scripts: install:all, dev, build, start, seed
├── shared/
│   └── core.js             # pure logic used by BOTH server and client:
│                           #   ATS scorer, render model, date/alignment rules,
│                           #   city search, data migration
├── server/                 # Express + Mongoose API
│   ├── .env.example
│   └── src/
│       ├── index.js        # entry: connect MongoDB, start HTTP server
│       ├── app.js          # express app, middleware, routes, serves client/dist in production
│       ├── config/db.js
│       ├── models/         # User, Resume, CoverLetter, Activity
│       ├── controllers/    # auth, resume, coverLetter, activity, stats
│       ├── routes/
│       ├── middleware/     # auth (JWT), error handler
│       ├── utils/          # token, activity log, resume validation
│       └── scripts/seed.js # demo account
└── client/                 # React 18 + Vite
    ├── index.html
    ├── vite.config.js      # proxies /api → :5000, @shared alias
    └── src/
        ├── main.jsx, App.jsx
        ├── api/client.js           # fetch wrapper with JWT
        ├── context/                # Auth, Resume (autosave + undo/redo), Ui (toasts, dialogs)
        ├── components/             # Navbar, ResumePreview, LocationPicker, ResumeRow, Icon...
        ├── pages/                  # Dashboard, Templates, MyResumes, AtsChecker, CoverLetter,
        │   └── builder/            #   Examples, Tips, AuthPage, and the Builder
        ├── hooks/                  # useExporter, useTheme
        ├── lib/                    # PDF/DOCX exporters, download, time formatting
        ├── data/content.js         # templates, career stages, tips, examples
        └── styles/                 # base.css (design tokens, light/dark) + app.css
```

## Prerequisites

- Node.js 18.17 or newer
- MongoDB: a local install (`mongodb://127.0.0.1:27017`) or a free MongoDB Atlas cluster

## Setup

```bash
npm run install:all                  # installs root, server and client packages
cp server/.env.example server/.env   # then edit MONGO_URI and JWT_SECRET
npm run seed                         # optional: demo@resumeforge.dev / demo12345
npm run dev                          # API on :5000, React on :5173
```

Open http://localhost:5173 and create an account (or sign in with the demo account).

## Production

```bash
npm run build    # builds client/dist
npm start        # Express serves the API and the built React app on PORT
```

If you host the client separately, set `VITE_API_URL` in `client/.env` to the API's URL and add the client's origin to `CLIENT_URL` in `server/.env` (comma-separated for several). Deploy the `shared/` folder alongside `server/`, since the server imports it.

## API

All routes except register/login need `Authorization: Bearer <token>`.

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` → `{token, user}`; creates a starter resume |
| POST | `/api/auth/login` | `{email, password}` → `{token, user}` |
| GET / PATCH | `/api/auth/me` | current user / update name |
| GET | `/api/resumes` | list (summaries with ATS score) |
| POST | `/api/resumes` | `{name, data?}` create |
| GET / PUT / DELETE | `/api/resumes/:id` | read, autosave `{name?, data?}`, delete (last one is kept) |
| POST | `/api/resumes/:id/duplicate` | copy |
| GET | `/api/resumes/:id/ats` | full ATS checklist |
| GET / PUT | `/api/cover-letter` | read / upsert the cover letter |
| GET / POST | `/api/activity` | recent events / record one (e.g. an export) |
| POST | `/api/activity/seen` | clear the unread dot |
| GET | `/api/stats` | dashboard numbers |
| POST | `/api/stats/:key/increment` | `templateViews` or `exportsCount` |
| GET | `/api/health` | health check |

## Security notes

- Passwords hashed with bcrypt (12 rounds); JWT sessions (7 days by default)
- Login/register rate-limited (20 attempts / 15 min / IP)
- Every resume query is scoped to the signed-in user
- Resume payloads are validated and migrated with the shared core; JSON bodies capped at 1 MB
- Helmet security headers with a CSP that allows only Google Fonts as an outside source
