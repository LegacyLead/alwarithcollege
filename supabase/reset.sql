-- Al-Warith College Portal — Reset script
-- Run this ONLY if schema.sql fails with "already exists" errors (usually
-- because a previous run partially completed). This drops everything
-- schema.sql creates, so you can then run schema.sql fresh.
--
-- WARNING: this deletes all data in these tables. Fine during initial setup
-- when there's nothing important stored yet — NOT something to run once
-- you have real students/staff/results in the system.

drop table if exists fees cascade;
drop table if exists assignments cascade;
drop table if exists announcements cascade;
drop table if exists results cascade;
drop table if exists attendance cascade;
drop table if exists timetable_entries cascade;
drop table if exists class_subjects cascade;
drop table if exists profiles cascade;
drop table if exists subjects cascade;
drop table if exists classes cascade;

drop function if exists teaches_class(uuid);
drop function if exists is_staff();
drop function if exists my_class_id();
drop function if exists my_role();

drop type if exists fee_status;
drop type if exists attendance_status;
drop type if exists user_role;
