# StudyHub

Offline-first revision app for **IGCSE Physics (0625)** and **International Mathematics (0607)**.
No accounts, no backend: your progress and uploaded notes are stored in your browser (IndexedDB).

## Run it

```bash
npm install
npm run dev        # development at http://localhost:5173
npm run build      # production build (also generates the offline service worker)
npm run preview    # serve the production build; install it as an app from the browser
```

The site works offline after the first load of the production build.

## Put it online for free

The site is fully static (hash routing), so any static host works.

1. `npm run build` creates the `dist` folder (also zipped as `studyhub-site.zip` by the last build).
2. Netlify (quickest): open https://app.netlify.com/drop, sign in, drag the `dist` folder onto the page.
   You get a `https://<name>.netlify.app` link; rename it under Site configuration → Change site name.
3. Cloudflare Pages alternative: Workers & Pages → Create → Pages → Upload assets → drag `dist`.
4. To update the live site later: run `npm run build` and drag `dist` onto the site's Deploys page again.

`public/_headers` keeps the service worker fresh so updates reach people on their next visit.
Each visitor's profile, progress and notes stay in their own browser; nothing is stored on the host.

## Accounts and sync (optional)

Without configuration, accounts are device-only profiles. To get real accounts and progress that syncs
across devices, follow [docs/BACKEND.md](docs/BACKEND.md) (free Supabase project, about 10 minutes).

## AI helper and smart lessons (optional)

AI marking, an "Ask AI" study helper and AI-written lessons run through a Supabase Edge Function that
holds the model key (free Groq key supported). See [docs/AI.md](docs/AI.md).

## Add content

- Notes: `src/content/<subject>/notes/NN-slug.mdx`, starting with `export const meta = {...}`.
  Components: `<Key>`, `<Tip>`, `<Mistake>`. Maths: `$inline$` and `$$block$$`.
  Avoid `$` as a currency sign in MDX; write "dollars".
- Questions: `src/content/<subject>/questions.ts` (types: `mcq`, `numeric`, `structured`).
- Flashcards: `src/content/<subject>/flashcards.ts`.
- Topic structure: `src/content/subjects.ts`.

Design notes are in [docs/SPEC.md](docs/SPEC.md).

## Your data

Use **Settings → Export backup** regularly. Clearing browser site data erases progress and uploaded notes.
