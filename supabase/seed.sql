-- Optional starter data — run after schema.sql. Adjust class names to match
-- your actual class list (e.g. add arms like 'JSS1A'/'JSS1B' if you split by arm).

insert into classes (name) values
  ('JSS1'), ('JSS2'), ('JSS3'),
  ('SS1'), ('SS2'), ('SS3')
on conflict (name) do nothing;

insert into subjects (name) values
  ('Mathematics'), ('English Language'), ('Basic Science'), ('Basic Technology'),
  ('Digital Technologies'), ('Data Processing'), ('Business Studies'),
  ('Social Studies'), ('Civic Education'), ('Agricultural Science'),
  ('Home Economics'), ('Cultural and Creative Arts'), ('Physical and Health Education'),
  ('French'), ('Christian/Islamic Studies'), ('Physics'), ('Chemistry'), ('Biology'),
  ('Economics'), ('Government'), ('Commerce'), ('Accounting'),
  ('Literature-in-English'), ('Geography')
on conflict (name) do nothing;
