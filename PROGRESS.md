# K + T — Progress Log

Track versions and notable changes as the app evolves.

---

## v0.1.0 — Initial release

**Date:** 2026-05-20  
**Commit:** `feat: intialize K + T project`

### Included
- Full React + TypeScript + Vite app with Tailwind CSS
- Three categories: North Cali, South Cali, Either
- Activity CRUD: add, edit, delete, complete/uncomplete, favorites
- Filtering (all / active / completed), search, sorting
- Stats dashboard and recently completed section
- Confetti on activity completion
- Dark mode toggle
- Supabase schema, seed data, and demo mode (no backend required)
- Vercel-ready deployment config and README setup guide

### Branding
- Header subtitle: **"Being big and round, together"**

### Removed from initial spec
- Random Date Picker (removed per preference)

---

## v0.1.1 — Completion celebration

**Date:** 2026-05-20

### Changed
- Checking off an activity plays `public/giphy-downsized.gif` (full-screen overlay) and `public/myinstants.mp3`
- Replaced canvas confetti with custom media
- Tap overlay or wait ~4s to dismiss

---

## Upcoming / ideas

- [ ] Supabase Auth for private couple-only access
- [ ] Photo attachments per activity
- [ ] Shared notes or comments on activities
- [ ] Export / backup list

---

## How to update this file

When you ship a meaningful change, add a new section above **Upcoming / ideas** with:

- Version number (semver: `v0.2.0`, etc.)
- Date
- Short bullet list of what changed
- Any breaking changes or migration notes
