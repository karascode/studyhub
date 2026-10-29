# Backend setup (Supabase)

StudyHub works with no backend at all: accounts are device-local profiles. Adding a free Supabase
project turns on real accounts and syncs progress across devices. The app stays offline-first:
everything is kept in the browser and synced in the background.

## What lives in the cloud

| Synced | Stays on the device |
|---|---|
| Question attempts, flashcard schedule, note status and bookmarks, streak days, written notes | Uploaded files (PDFs, images). They live in the browser only. |

Every table has row-level security: a signed-in user can read and write only their own rows. The
public "anon" key in the website cannot reach anything on its own.

## One-time setup (about 10 minutes)

1. **Create the project.** https://supabase.com, sign in, New project. Pick the free plan and the
   region nearest your users. Save the database password somewhere safe (the app never needs it).
2. **Create the tables.** Open SQL Editor, New query, paste the contents of `supabase/schema.sql`, Run.
   It is safe to run more than once.
3. **Email settings.** Authentication, Sign In / Providers, Email:
   - Turn **Confirm email** off while you are starting out. Supabase's built-in sender is limited to a
     few emails an hour, so confirmation emails would block sign-ups. Turn it on later once you add
     your own email provider.
4. **Redirect URLs.** Authentication, URL Configuration:
   - Site URL: `https://karascode.github.io/studyhub/`
   - Redirect URLs: add `https://karascode.github.io/studyhub/` and `http://localhost:5173/`
   (password-reset links return to these).
5. **Copy the two public values.** Project Settings, API:
   - **Project URL**, e.g. `https://abcdefgh.supabase.co`
   - **anon / publishable key** (safe to publish; it is meant for browsers)
   - Never use the **service_role** key anywhere in this project.

## Connect the site

Create `.env.production` in the project root:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

Commit and push; GitHub Pages rebuilds with accounts switched on. For local development put the same
two lines in `.env.local` (not committed). With no values set the app falls back to device profiles.

## How sync works

- Local data (IndexedDB) is the source of truth; the app never waits for the network.
- Changes are pushed a couple of seconds after they happen, and pulled when the app opens, regains
  focus or comes back online.
- Merging: attempts are unique by id; flashcard, note and written-note records use "newest change wins";
  streak days keep the larger count. Deletions sync as tombstones.
- The pull cursor is the server's `synced_at`, so a device that was offline for weeks never misses rows.

## Moving existing progress into an account

Sign in, then Settings, "Progress from before accounts", Add to my account. This copies the old
on-device profile into the account (and syncs it).

## Costs and limits (free tier)

500 MB database, 50,000 monthly active users, projects pause after a week of no activity (they resume
from the dashboard). Study data is tiny; a heavy user is well under 1 MB.
