# Al-Warith College Website

A Next.js (App Router) website for Al-Warith College — "Reaching for the Stars."

## Pages
- `/` — Home
- `/about` — About the college
- `/academics` — Class levels & subjects
- `/admissions` — Admissions process + inquiry form
- `/news` — News, upcoming events, and gallery
- `/contact` — Contact details + message form
- `/portal` — Staff/Student portal (demo login only — see below)

## Running locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Building for production
```bash
npm run build
npm run start
```

## Deploying
This is a standard Next.js app — the easiest path is [Vercel](https://vercel.com):
push this folder to a GitHub repo, then import it on Vercel with default settings.
It will also run on any Node.js host (Railway, Render, a VPS, etc).

## Making the forms work (5 minutes)
The admissions and contact forms now send real emails via
[Resend](https://resend.com) — a free tier covers a school's volume easily.

1. Create a free account at https://resend.com and grab an API key.
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in `RESEND_API_KEY` and `SCHOOL_EMAIL` (the inbox that should
   receive inquiries) in `.env.local`.
4. Run `npm run dev` — submissions from `/admissions` and `/contact` will
   now arrive by email.

**Note on the sender address:** the code sends from
`onboarding@resend.dev`, Resend's shared test address, which works
immediately with no setup. Once you're ready to go live, verify your own
domain in the Resend dashboard and change the `from` address in
`app/api/admissions/route.ts` and `app/api/contact/route.ts` to something
like `Al-Warith College <admissions@alwarithcollege.edu.ng>` — this makes
the emails look official and improves deliverability.

When deploying (e.g. to Vercel), add `RESEND_API_KEY` and `SCHOOL_EMAIL`
as environment variables in the project settings — `.env.local` is only
read locally and is not committed to git.

## What's real vs. placeholder
- **Design & structure**: fully built — colors, type, layout, and the ribbon
  motif (echoing the logo's "Reaching for the Stars" banner) are used
  throughout.
- **Content**: subjects and classes (JSS1–SS3, Computer Studies, Data
  Processing) reflect real Nigerian secondary curriculum structure. News
  items, events, contact details, and gallery photos are placeholders —
  swap them for real content in `app/news/page.tsx`, `app/contact/page.tsx`,
  and `public/`.
- **Forms**: admissions and contact forms are fully wired to send real
  emails (see above) — no longer just UI mockups.
- **Portal login** (`/portal`): still a visual mock only, no real
  authentication yet. To make it real, you'd add a backend — Supabase
  (which you're already using in ReceiptGen) would work well here for
  auth + a students/staff table.

## Design tokens
- Colors: sky `#1CA7E0`, navy `#0B2545`, coral `#E64A3F`, sun `#FFC93C`,
  paper `#F7FAFC`, chalk `#EAF6FC`
- Fonts: Baloo 2 (display/headings), Work Sans (body), IBM Plex Mono
  (dates, stats, labels)
- Signature element: the ribbon-banner shape from the school crest, reused
  as section eyebrows/labels site-wide (`.ribbon` class in `globals.css`)
