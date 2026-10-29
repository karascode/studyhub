# AI helper, AI marking and smart lessons

The AI features call a small Supabase Edge Function (`supabase/functions/ai/index.ts`) that holds the
model key. The website never sees the key. The function:

- accepts only signed-in users,
- limits each person to 30 requests a day (`AI_DAILY_LIMIT` to change),
- contains all the prompts, so it cannot be used as a free general-purpose chatbot,
- answers from the student's own notes and mark schemes, which the website sends along as source text,
- falls back to a smaller model when the main one is rate limited (useful on Groq's free tier).

## What students get

| Feature | Where |
|---|---|
| **AI study helper** | "Ask AI" button on every page; answers from the student's notes, with links to the notes it used |
| **AI marking** | Written practice questions: "Get AI feedback" ticks the mark-scheme boxes and explains; the student reviews and saves |
| **Explain why** | After a wrong answer: what went wrong, the idea to remember, a similar question to try |
| **Smart lessons** | Lessons page: picks the topic from the student's results (this part needs no AI), then writes a 5-minute lesson aimed at the questions they missed |

## One-time setup

1. **Daily limits.** Supabase SQL Editor, New query, paste `supabase/ai.sql`, Run.
2. **Model key.** Dashboard, Edge Functions, Secrets, add `GROQ_API_KEY` (get one free at console.groq.com).
   Enter it only there. It must never be pasted into chat, code or `.env` files.
3. **Deploy the function.** Edge Functions, Deploy a new function (via Editor), name it exactly `ai`,
   paste the contents of `supabase/functions/ai/index.ts`, switch **Verify JWT off** (the function checks
   the signed-in user itself), Deploy.
   (CLI alternative: `npx supabase functions deploy ai --project-ref <ref>`; `supabase/config.toml` already
   sets `verify_jwt = false`.)
4. **Switch it on in the site.** Add `VITE_AI_ENABLED=true` to `.env.production`, commit and push.

## Optional secrets

| Secret | Default | Purpose |
|---|---|---|
| `AI_MODEL` | `llama-3.3-70b-versatile` | main model |
| `AI_FALLBACK_MODEL` | `llama-3.1-8b-instant` | used when the main model is rate limited |
| `AI_DAILY_LIMIT` | `30` | requests per user per day |
| `AI_BASE_URL` | `https://api.groq.com/openai/v1` | any OpenAI-compatible provider |
| `AI_API_KEY` | falls back to `GROQ_API_KEY` | key for that provider |

## Free-tier reality

Groq's free tier limits requests and tokens per day for the whole project, not per user. A lesson uses
roughly 2-3K tokens and a chat answer about 1.5-2K. When the main model is exhausted the function drops
to the smaller one, and when both are exhausted students see "The AI service is busy". Check current
limits at console.groq.com. If usage grows, add credit or point `AI_BASE_URL`/`AI_API_KEY` at another
provider; the website does not change.

## Privacy

Question text, the student's typed answers and the relevant note text are sent to the model provider to
produce a reply. Names and emails are never sent. The helper tells students not to share personal details.
If students are under 18, mention this in your own privacy notice and check the provider's data terms
(some free tiers use prompts to improve their models).

## Testing

`supabase/functions/ai/index.ts` exports `handle()` with injectable dependencies, so the access control,
limits, scoring and model fallback can be tested without a network. See the repository history for the
test script used when it was written.
