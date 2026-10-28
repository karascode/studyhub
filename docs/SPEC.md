# StudyHub — technical spec (v0.1)

Local-first revision platform for **IGCSE Physics (0625)** and **Cambridge International Mathematics (0607)**.
No accounts, no backend, no network needed after first load.

## Principles
- All user data lives on the device (IndexedDB via Dexie). A JSON backup export/import protects against cleared browser data.
- All content is authored in-repo as MDX / TS data files. Content is original, written to the public syllabus outline — not copied from any publisher or exam board.
- Works offline: a service worker (vite-plugin-pwa) precaches the app and all content.

## Stack
Vite + React + TypeScript · React Router (hash routing) · MDX (`@mdx-js/rollup`) · KaTeX · Dexie · MiniSearch · vite-plugin-pwa

## Content model
```
src/content/<subject>/
  notes/<NN>-<slug>.mdx     export const meta = { topic, title, summary, keywords, level }
  questions.ts              Question[]
  flashcards.ts             Flashcard[]
src/content/subjects.ts     Subject → Topic tree (syllabus structure)
```
Question types: `mcq`, `numeric` (auto-marked, tolerance + unit), `structured` (reveal mark scheme, tick each point earned).

## Features in this version
| Area | Feature |
|---|---|
| Learn | Subject → topic → note pages, KaTeX maths, callouts (key idea / exam tip / common mistake), prev/next, mark note as learning/confident, bookmarks |
| Practice | Quiz builder (subject, topics, difficulty, level, count, optional timer), MCQ/numeric auto-marking, structured self-marking, results by topic, "mistakes only" mode |
| Flashcards | SM-2 spaced repetition per syllabus topic, due counts |
| Progress | Per-topic mastery from latest attempts, weak topics, streak, dashboard |
| Organizer | Own notes per subject/topic: write Markdown+maths notes, upload PDFs/images/text files, tags, search, preview, delete |
| Search | Full-text across notes, questions, flashcards and your organizer notes |
| App | Dark mode, responsive, keyboard-friendly, backup export/import, offline PWA |

## Data (IndexedDB)
`attempts`, `cards` (SRS state), `noteState` (status, bookmark), `docs` (organizer, with blobs), `activity` (day log for streaks), `settings`.

## Later
Study planner, predicted grade, mock-exam grade boundaries, AI marking/tutor (needs API key), more subjects.
