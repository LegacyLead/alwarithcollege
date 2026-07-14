-- Al-Warith College Portal — Database Schema
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query) after
-- creating your Supabase project. Safe to run once on a fresh project.

-- ─────────────────────────────────────────────────────────────
-- Extensions & enums
-- ─────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

create type user_role as enum ('student', 'teacher', 'admin', 'proprietress');
create type attendance_status as enum ('present', 'absent', 'late');
create type fee_status as enum ('paid', 'partial', 'outstanding');

-- ─────────────────────────────────────────────────────────────
-- Core tables
-- ─────────────────────────────────────────────────────────────

create table classes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique, -- e.g. 'JSS1', 'SS2'
  created_at timestamptz not null default now()
);

create table subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null unique, -- e.g. 'Mathematics', 'Data Processing'
  created_at timestamptz not null default now()
);

-- Extends Supabase's built-in auth.users with school-specific fields.
-- One row per person who can log in (students AND staff).
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role user_role not null,
  class_id uuid references classes (id), -- set for students; null for most staff
  staff_title text, -- e.g. 'Principal', 'Vice-Principal & Admin', 'Data Processing Officer'
  created_at timestamptz not null default now()
);

-- Which teacher teaches which subject to which class. Also drives "which
-- classes/subjects can this teacher see attendance/results for".
create table class_subjects (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes (id) on delete cascade,
  subject_id uuid not null references subjects (id) on delete cascade,
  teacher_id uuid references profiles (id) on delete set null,
  unique (class_id, subject_id)
);

create table timetable_entries (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes (id) on delete cascade,
  subject_id uuid not null references subjects (id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 1 and 5), -- 1=Mon .. 5=Fri
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now()
);

create table attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles (id) on delete cascade,
  class_id uuid not null references classes (id) on delete cascade,
  date date not null,
  status attendance_status not null,
  marked_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  unique (student_id, date)
);

create table results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles (id) on delete cascade,
  subject_id uuid not null references subjects (id) on delete cascade,
  term text not null, -- e.g. '2026 Term 1'
  ca_score numeric(5, 2) not null check (ca_score between 0 and 40),
  exam_score numeric(5, 2) not null check (exam_score between 0 and 60),
  -- 40% CA / 60% exam split — adjust the weights below if your grading differs.
  term_average numeric(5, 2) generated always as (ca_score + exam_score) stored,
  entered_by uuid references profiles (id),
  created_at timestamptz not null default now(),
  unique (student_id, subject_id, term)
);

create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  class_id uuid references classes (id), -- null = visible to everyone
  posted_by uuid references profiles (id),
  created_at timestamptz not null default now()
);

create table assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes (id) on delete cascade,
  subject_id uuid not null references subjects (id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  posted_by uuid references profiles (id),
  created_at timestamptz not null default now()
);

create table fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles (id) on delete cascade,
  term text not null,
  amount_due numeric(10, 2) not null,
  amount_paid numeric(10, 2) not null default 0,
  status fee_status not null default 'outstanding',
  due_date date,
  updated_by uuid references profiles (id),
  updated_at timestamptz not null default now(),
  unique (student_id, term)
);

-- ─────────────────────────────────────────────────────────────
-- Helper functions (security definer — used inside RLS policies
-- to safely read the caller's own role/class without recursive RLS checks)
-- ─────────────────────────────────────────────────────────────

create function my_role() returns user_role
language sql security definer stable as $$
  select role from profiles where id = auth.uid();
$$;

create function my_class_id() returns uuid
language sql security definer stable as $$
  select class_id from profiles where id = auth.uid();
$$;

create function is_staff() returns boolean
language sql security definer stable as $$
  select my_role() in ('teacher', 'admin', 'proprietress');
$$;

create function teaches_class(target_class uuid) returns boolean
language sql security definer stable as $$
  select exists (
    select 1 from class_subjects
    where class_id = target_class and teacher_id = auth.uid()
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────

alter table classes enable row level security;
alter table subjects enable row level security;
alter table profiles enable row level security;
alter table class_subjects enable row level security;
alter table timetable_entries enable row level security;
alter table attendance enable row level security;
alter table results enable row level security;
alter table announcements enable row level security;
alter table assignments enable row level security;
alter table fees enable row level security;

-- classes / subjects: readable by any logged-in user; only admin/proprietress manage
create policy "classes readable by all" on classes for select using (auth.uid() is not null);
create policy "classes managed by admin" on classes for all using (my_role() in ('admin', 'proprietress'));

create policy "subjects readable by all" on subjects for select using (auth.uid() is not null);
create policy "subjects managed by admin" on subjects for all using (my_role() in ('admin', 'proprietress'));

-- profiles: everyone can see their own row; staff can see everyone (needed for
-- attendance/results entry, class rosters, and admin dashboards)
create policy "profiles: self read" on profiles for select using (id = auth.uid());
create policy "profiles: staff read all" on profiles for select using (is_staff());
create policy "profiles: self update limited fields" on profiles for update using (id = auth.uid());
create policy "profiles: admin manage all" on profiles for all using (my_role() in ('admin', 'proprietress'));

-- class_subjects: readable by all logged-in users; admin manages
create policy "class_subjects readable" on class_subjects for select using (auth.uid() is not null);
create policy "class_subjects managed by admin" on class_subjects for all using (my_role() in ('admin', 'proprietress'));

-- timetable: a student sees their own class's timetable; a teacher sees classes
-- they teach; admin/proprietress see everything
create policy "timetable: student own class" on timetable_entries for select
  using (class_id = my_class_id());
create policy "timetable: teacher own classes" on timetable_entries for select
  using (teaches_class(class_id));
create policy "timetable: admin manage all" on timetable_entries for all
  using (my_role() in ('admin', 'proprietress'));

-- attendance: a student sees only their own rows; a teacher sees/marks rows for
-- classes they teach; admin/proprietress see everything
create policy "attendance: student own" on attendance for select
  using (student_id = auth.uid());
create policy "attendance: teacher for own classes" on attendance for all
  using (teaches_class(class_id));
create policy "attendance: admin manage all" on attendance for all
  using (my_role() in ('admin', 'proprietress'));

-- results: a student sees only their own; a teacher enters/updates results for
-- subjects they teach (checked via class_subjects); admin/proprietress see all
create policy "results: student own" on results for select
  using (student_id = auth.uid());
create policy "results: teacher for own subject" on results for all
  using (
    exists (
      select 1 from class_subjects cs
      join profiles p on p.id = results.student_id
      where cs.teacher_id = auth.uid()
        and cs.subject_id = results.subject_id
        and cs.class_id = p.class_id
    )
  );
create policy "results: admin manage all" on results for all
  using (my_role() in ('admin', 'proprietress'));

-- announcements: visible to everyone if class_id is null, or to that class's
-- students/teachers; only staff can post
create policy "announcements: visible" on announcements for select
  using (class_id is null or class_id = my_class_id() or is_staff());
create policy "announcements: staff post" on announcements for insert
  with check (is_staff());
create policy "announcements: staff manage own" on announcements for all
  using (is_staff());

-- assignments: visible to that class's students/teachers; teachers/admin post
create policy "assignments: visible" on assignments for select
  using (class_id = my_class_id() or is_staff());
create policy "assignments: staff manage" on assignments for all
  using (is_staff());

-- fees: a student sees only their own; only admin/proprietress manage
create policy "fees: student own" on fees for select
  using (student_id = auth.uid());
create policy "fees: admin manage all" on fees for all
  using (my_role() in ('admin', 'proprietress'));
