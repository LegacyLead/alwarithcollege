# Al-Warith College Website

A Next.js (App Router) website for Al-Warith College — "Reaching for the Stars."

## Pages
- `/` — Home
- `/about` — About the college
- `/academics` — Class levels & subjects
- `/admissions` — Admissions process + inquiry form
- `/news` — News, upcoming events, and gallery
- `/contact` — Contact details + message form
- `/portal` — Staff/Student portal login (real Supabase auth — see setup below)
- `/portal/dashboard` — Role-based dashboard (announcements, timetable, attendance, results, fees)

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

## Setting up the Staff & Student Portal (Supabase)
The portal (`/portal`) now has real authentication and a role-based
dashboard — no longer a mock. Here's how to switch it on:

### 1. Create a Supabase project
Go to https://supabase.com, create a free project, then go to
**Project Settings → API Keys** and copy your Project URL. For the key,
Supabase now calls it the **publishable key** (starts with `sb_publishable_...`)
instead of the older `anon` key — that's the one you want; it's the same
role (safe for the browser, respects row-level security).

### 2. Add the environment variables
```bash
cp .env.example .env.local
```
Fill in `NEXT_PUBLIC_SUPABASE_URL` (the Project URL) and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` (the publishable key, despite the "ANON" in
the variable name — same thing, older naming).

### 3. Create the database schema
In the Supabase dashboard, go to **SQL Editor → New query**, paste in the
contents of `supabase/schema.sql`, and run it. This creates all the tables
(profiles, classes, subjects, attendance, results, fees, etc.) with row-level
security already configured — students can only ever see their own records,
teachers only see their assigned classes, and admins/the proprietress see
everything.

**If this fails with an "already exists" error** (e.g. `type "user_role"
already exists`), it means a previous attempt partially ran. Run
`supabase/reset.sql` first (this cleanly drops everything schema.sql
creates — safe during initial setup, since there's no real data yet), then
run `schema.sql` again.

Optionally also run `supabase/seed.sql` to pre-fill JSS1–SS3 classes and the
standard subject list.

### 4. Create login accounts
Supabase Auth needs an email + password per account — but students/staff log
in with a simple ID (e.g. `AWC-STU-0001`), not an email. The trick: create
each account's email using this exact pattern (see `lib/supabase/helpers.ts`):

```
lowercase the ID, strip everything except letters/numbers, add @portal.alwarithcollege.local
```
e.g. `AWC-STU-0001` → `awcstu0001@portal.alwarithcollege.local`

To create an account:
1. **Authentication → Users → Add user** in the Supabase dashboard — enter
   the converted email and a password, then copy the generated user ID.
2. **Table Editor → profiles → Insert row** — paste that same user ID as
   `id`, fill in `full_name`, `role` (`student`/`teacher`/`admin`/`proprietress`),
   and `class_id` (for students) or `staff_title` (for staff).

This is manual for now — fine for a handful of staff and a class at a time,
but worth scripting (or building an admin "create account" form) once you're
adding students in bulk. Happy to build that next if it'd help.

### 5. Link teachers to their classes/subjects
In **Table Editor → class_subjects**, add a row per (class, subject, teacher)
combination — e.g. `SS2` + `Data Processing` + your profile ID. This is what
lets a teacher mark attendance and enter results for that class/subject, and
what a student's timetable is built from (once you also add rows to
`timetable_entries`).

### What each dashboard shows
- **Students**: announcements, timetable, attendance record, results (CA +
  exam scores, 40/60 split — adjust in `supabase/schema.sql` if your school
  weighs differently), and fee status.
- **Teachers**: announcements, timetable, a "mark attendance" tool and a
  "enter results" tool scoped to whatever classes/subjects they're linked to
  in `class_subjects`.
- **Admin / Proprietress**: announcements (school-wide) and timetable. Full
  data management (adding classes, students, fees) is via the Supabase Table
  Editor for now — a dedicated admin UI would be a good next step.

### What's still simple/manual by design
- **Fees** are marked paid/outstanding manually by an admin in Supabase —
  there's no online payment gateway (Paystack/Flutterwave) wired in yet.
- **Creating accounts** is manual via the Supabase dashboard, as above.

Both are very buildable next steps once the basics are in daily use.

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
- **Portal** (`/portal`): real Supabase authentication and a role-based
  dashboard (see setup steps above) — no longer a mock.

## Design tokens
- Colors: sky `#1CA7E0`, navy `#0B2545`, coral `#E64A3F`, sun `#FFC93C`,
  paper `#F7FAFC`, chalk `#EAF6FC`
- Fonts: Baloo 2 (display/headings), Work Sans (body), IBM Plex Mono
  (dates, stats, labels)
- Signature element: the ribbon-banner shape from the school crest, reused
  as section eyebrows/labels site-wide (`.ribbon` class in `globals.css`)
