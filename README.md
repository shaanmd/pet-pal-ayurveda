# PetPal Ayurveda

High-converting landing page and **Pet Dosha Quiz** lead magnet for the upcoming book on Ayurvedic pet rehab and massage. Target audience: pet owners in Australia, New Zealand, and India.

**Domain:** [petpalayurveda.com](https://petpalayurveda.com)

## Stack

- **Next.js** (Vercel) — App Router, fast and SEO-friendly
- **Supabase** (optional) — store quiz results and/or dynamic Dosha tips
- **Systeme.io** — email capture, tagging by Dosha, welcome + nurture sequences
- **Canva** — design the Dosha Guide PDF(s) and add links in `src/lib/dosha-results.ts`

## Quick start

```bash
npm install
cp .env.example .env.local   # add Supabase keys if using
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Take the quiz at `/quiz`.

## Project structure

- **Landing** (`/`) — Hero + CTA, three expert cards (Dr Shaan Mocke, Dr. Shagufta Singh, Kamal)
- **Quiz** (`/quiz`) — 7-question Dosha quiz → email capture → result
- **Result** (`/quiz/result?d=vata|pitta|kapha`) — personalised Dosha profile and massage tips

Quiz logic and result copy live in `src/lib/quiz-data.ts` and `src/lib/dosha-results.ts`. Add your Canva PDF URLs to `pdfUrl` in `dosha-results.ts` when ready.

## Systeme.io integration

1. **Form / webhook:** In Systeme.io, create a form or automation that accepts an email and a tag (e.g. `Vata_Pet`, `Pitta_Pet`, `Kapha_Pet`).
2. **Trigger:** When the user submits the quiz email form, send a server action or API request to Systeme.io (webhook or their form endpoint) with:
   - `email`
   - `tag` = primary Dosha (e.g. `Vata_Pet`).
3. **Automation:** Tag the contact and send the welcome email with the lead magnet (link to result page or PDF). Run your 3-part nurture sequence.

The app currently redirects to the result page with `?d=...` after email submit; you can add a fetch to your Systeme.io webhook in `src/app/quiz/page.tsx` (EmailCaptureStep) before redirecting.

## Supabase (optional)

**Store quiz results:** Create a table and optionally call it from the quiz completion step.

```sql
create table quiz_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null,
  primary_dosha text not null check (primary_dosha in ('vata','pitta','kapha')),
  vata_score int not null default 0,
  pitta_score int not null default 0,
  kapha_score int not null default 0,
  tips_json jsonb
);
```

**Dynamic tips (Option B):** Create a `dosha_tips` table with columns matching `DoshaTipRow` in `src/lib/supabase-types.ts`, then load result content from Supabase in `src/app/quiz/result/page.tsx` instead of the static `DOSHA_RESULTS` object.

## Canva PDFs

Design three “Dosha Guide” PDFs in Canva (Vata, Pitta, Kapha). Publish or share a link for each, then set `pdfUrl` in `src/lib/dosha-results.ts` for each Dosha. The result page will show a “Download your Dosha Guide PDF” link when `pdfUrl` is set.

## Deploy on Vercel

Connect the repo to Vercel and deploy. Add env vars (e.g. Supabase, Systeme.io webhook) in the Vercel project settings.

## License

Private. All rights reserved.
