# K + T

A beautiful, mobile-friendly shared couples bucket-list and date-planning web app. Track adventures, trips, restaurants, and future date ideas together across **North Cali**, **South Cali**, and **Either**.

![K + T](public/heart.svg)

## Features

- **Three categories**: North Cali, South Cali, Either
- **Full activity management**: add, edit, delete, complete/uncomplete
- **Rich activity details**: title, notes, location, cost, tags, favorites
- **Filtering & search**: by status, favorites, title/notes/location
- **Sorting**: newest, oldest, alphabetical
- **Confetti** on completion
- **Stats dashboard** and recently completed section
- **Dark mode** toggle
- **Responsive** mobile-first design
- **Demo mode** when Supabase is not configured (works offline with sample data)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Supabase (PostgreSQL)
- TanStack React Query
- React Router
- canvas-confetti

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) account (optional — app runs in demo mode without it)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Without Supabase**: Leave `.env` empty or unset. The app loads with built-in demo data so you can explore immediately.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## Supabase Setup

### Create a project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Wait for the database to provision.

### Run the schema

1. Open your project → **SQL Editor**.
2. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. (Optional) Run [`supabase/seed.sql`](supabase/seed.sql) for sample activities.

### Get API keys

1. Go to **Project Settings** → **API**.
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### Row Level Security

The default schema uses open policies suitable for a personal couple app. For production, tighten RLS and add Supabase Auth so only you two can read/write.

---

## Database Schema

| Column           | Type      | Description                    |
|------------------|-----------|--------------------------------|
| `id`             | uuid      | Primary key                    |
| `title`          | text      | Required activity title        |
| `notes`          | text      | Optional details               |
| `location`       | text      | Optional location              |
| `estimated_cost` | text      | Optional cost estimate         |
| `tag`            | enum      | Food, Outdoors, Adventure, etc.|
| `category`       | enum      | north_cali, south_cali, either |
| `completed`      | boolean   | Completion status              |
| `favorite`       | boolean   | Favorite flag                  |
| `created_at`     | timestamp | Auto-set on create             |
| `completed_at`   | timestamp | Set when marked complete       |
| `updated_at`     | timestamp | Auto-updated on change         |

---

## Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B: GitHub integration

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy.

`vercel.json` is included for SPA routing (all routes → `index.html`).

---

## Project Structure

```
K+T/
├── public/
├── src/
│   ├── components/
│   │   ├── activities/    # ActivityCard, ActivityForm, TagBadge
│   │   ├── categories/    # CategoryCard
│   │   ├── layout/        # Header
│   │   └── ui/            # Button, Modal, ProgressBar
│   ├── hooks/             # useActivities, useTheme
│   ├── lib/               # supabase, confetti, demoData
│   ├── pages/             # HomePage, CategoryPage
│   ├── types/             # Activity types & labels
│   └── utils/             # filter, sort, stats helpers
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── .env.example
├── vercel.json
└── README.md
```

---

## Activity Tags

Food · Outdoors · Adventure · Travel · Coffee · Date Night · Event · Creative · Other

---

## License

Private — built with love for K + T.
