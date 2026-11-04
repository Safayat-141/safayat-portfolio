# Safayat Portfolio

A personal portfolio website with a built-in admin dashboard. All content (bio, education, experience, skills, projects) lives in a Postgres database and is edited through a password-protected `/admin` page, so the site can be updated without touching code or redeploying.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Vercel Postgres**. Hosted on **Vercel**; source on **GitHub**.

---

## Features

- **Public portfolio** — About, Education, Experience, Skills, Projects, and Contact sections on a single page.
- **Database-driven content** — everything shown on the site is read from Postgres.
- **Admin dashboard** (`/admin`) — add and delete education, experience, skills, and projects, and edit site settings (tagline, about text, location, email, photo URL, LinkedIn URL).
- **Password login** — a single admin password, checked against an environment variable. No user accounts.
- **Incremental static regeneration** — the home page is cached, revalidated every 60 seconds and refreshed immediately after any admin change.
- **Graceful empty states** — if the database is unreachable or empty, the page still renders with placeholder text.

## Tech stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 14.2.35 (App Router, Server Actions) |
| Language   | TypeScript (strict mode)                 |
| Styling    | Tailwind CSS 3                           |
| Database   | Vercel Postgres (`@vercel/postgres`)     |
| Hosting    | Vercel                                   |

## Project structure

```
.
├── app/
│   ├── layout.tsx            # Root layout and site metadata
│   ├── page.tsx              # Public portfolio page (reads all tables)
│   ├── globals.css           # Tailwind directives, font, small utilities
│   └── admin/
│       ├── layout.tsx        # Admin navigation bar
│       ├── page.tsx          # Dashboard, tabbed via ?tab=
│       ├── actions.ts        # Server Actions: add/delete/update + logout
│       └── login/
│           ├── page.tsx      # Login form (shows an error on a wrong password)
│           └── action.ts     # Login Server Action (sets signed session cookie)
├── components/               # Presentational components
│   ├── hero.tsx, nav.tsx, section.tsx, section-title.tsx
│   ├── education-card.tsx, experience-card.tsx
│   ├── skill-badge.tsx, project-card.tsx
│   ├── admin-nav.tsx         # Client component: admin tabs (active highlight) + logout
│   ├── ConfirmButton.tsx     # Client component: confirm() before delete
│   └── ui.tsx                # Card, Badge, Button, Input, Textarea, cn()
├── lib/
│   ├── db.ts                 # All SQL queries
│   ├── session.ts            # Signed session cookie + password check (edge-safe)
│   ├── auth.ts               # isAdmin() / requireAdmin() for server code
│   └── settings.ts           # List of editable site settings
├── middleware.ts             # Guards /admin/* routes (except /admin/login)
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

## How it works

**Reading content.** `app/page.tsx` is a Server Component. It calls the query helpers in `lib/db.ts` to load settings, education, experience, skills, and projects, then renders them with the components in `components/`. The page uses `revalidate = 60`, so Vercel serves a cached copy and refreshes it in the background at most once a minute.

**Editing content.** The admin dashboard at `/admin` uses plain HTML forms that post to Server Actions in `app/admin/actions.ts`. Every action first calls `requireAdmin()`, writes to the database through `lib/db.ts`, refreshes the public page with `revalidatePath('/')`, and redirects back to the relevant tab. Each site setting has its own form and Save button.

**Authentication.** Two environment variables control access:

1. The visitor submits a password on `/admin/login`. It is compared in constant time against `ADMIN_PASSWORD`.
2. On success the server sets an `admin_session` cookie (HTTP-only, `SameSite=Lax`, `Secure` in production, 7 days). The cookie holds an expiry time plus an HMAC signature made with `ADMIN_SECRET`; the secret itself is never sent to the browser.
3. `middleware.ts` verifies that signature on every `/admin/*` request (except `/admin/login`), and each Server Action checks it again.
4. If `ADMIN_SECRET` or `ADMIN_PASSWORD` is missing, login is impossible and `/admin` stays locked (fail closed).
5. A wrong password is delayed by one second to slow down brute-force attempts.

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and in `.env.local` for local development):

| Variable         | Purpose                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `ADMIN_PASSWORD` | The password you type on the login page.                                |
| `ADMIN_SECRET`   | A long random string used as the session cookie value. Keep it private. |
| `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE` | Added automatically when you connect a Vercel Postgres database to the project. |

Generate a good `ADMIN_SECRET` with:

```bash
openssl rand -hex 32
```

> Never commit `.env` or `.env.local`. Both are already listed in `.gitignore`.

## Database schema

The repository does not ship migrations, so create the tables once (Vercel dashboard → Storage → your database → Query tab, or any Postgres client). This schema matches the queries in `lib/db.ts`:

```sql
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS education (
  id            SERIAL PRIMARY KEY,
  institution   TEXT NOT NULL,
  degree        TEXT NOT NULL,
  cgpa          TEXT,
  expected_grad TEXT,
  details       TEXT
);

CREATE TABLE IF NOT EXISTS experience (
  id           SERIAL PRIMARY KEY,
  role_title   TEXT NOT NULL,
  organization TEXT NOT NULL,
  start_date   TEXT NOT NULL,
  end_date     TEXT,
  description  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id       SERIAL PRIMARY KEY,
  name     TEXT NOT NULL,
  category TEXT,
  level    TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  tools       TEXT[],
  image_url   TEXT,
  date        TEXT,
  live_link   TEXT,
  github_link TEXT
);
```

### Settings keys

The `settings` table is a key/value store. The site reads these keys:

| Key             | Used for                      |
| --------------- | ----------------------------- |
| `name`          | Hero heading, footer, page title |
| `tagline`       | Line under the name in the hero |
| `about`         | About Me paragraph            |
| `location`      | Hero and Contact section      |
| `contact_email` | "Email Me" button and Contact |
| `photo_url`     | Profile photo                 |
| `linkedin_url`  | LinkedIn button               |

## Local development

Requirements: Node.js 18.17+ and a Postgres database reachable via Vercel's connection variables.

```bash
# 1. Clone and install
git clone <your-repo-url>
cd safayat-portfolio
npm install

# 2. Pull environment variables from Vercel (needs the Vercel CLI)
npm i -g vercel
vercel link
vercel env pull .env.local

# 3. Make sure ADMIN_PASSWORD and ADMIN_SECRET are in .env.local, then run
npm run dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/admin> for the dashboard.

### Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Create a production build    |
| `npm start`     | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Deployment

The project is deployed on Vercel and connected to the GitHub repository, so every push to the main branch triggers a new deployment.

First-time setup:

1. Import the GitHub repository into Vercel.
2. In **Storage**, create a Postgres database and connect it to the project.
3. Run the schema above against that database.
4. Add `ADMIN_PASSWORD` and `ADMIN_SECRET` under **Settings → Environment Variables**.
5. Redeploy so the new variables take effect.

## Updating content

1. Go to `/admin` and sign in.
2. Pick a tab (Settings, Education, Experience, Skills, Projects).
3. Add or delete entries, or save each setting with its own Save button.
4. The public page is refreshed immediately after each change.

## Security notes

- Keep `ADMIN_PASSWORD` and `ADMIN_SECRET` different, long, and unguessable.
- Rotate `ADMIN_SECRET` if you ever suspect it leaked; doing so signs out all sessions.
- Keep Next.js up to date. Security fixes are released regularly in the 14.x line.
- Login attempts are only slowed down, not rate-limited. Use a long, random `ADMIN_PASSWORD`.

## License

Personal project. All rights reserved unless a license file is added.
