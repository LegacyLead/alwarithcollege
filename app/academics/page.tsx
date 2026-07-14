import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion';

const junior = [
  'Mathematics', 'English Language', 'Basic Science', 'Basic Technology',
  'Digital Technologies', 'Coding', 'Data Processing', 'Business Studies',
  'Social Studies', 'Civic Education', 'Agricultural Science', 'Home Economics',
  'Cultural and Creative Arts', 'Physical and Health Education', 'French',
  'Arabic', 'Islamic Religious Studies',
];
const senior = [
  'Mathematics', 'Further Mathematics', 'English Language', 'Civic Education',
  'Digital Technologies', 'Coding', 'Data Processing', 'Physics', 'Chemistry',
  'Biology', 'Agricultural Science', 'Economics', 'Government', 'Commerce',
  'Accounting', 'Literature-in-English', 'Geography', 'Arabic',
  'Islamic Religious Studies',
];

export default function Academics() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <span className="ribbon">Curriculum</span>
        <h1 className="mt-4 font-display text-4xl font-800 text-navy">Academic Programs</h1>
        <p className="mt-6 max-w-2xl font-body text-navy/80">
          Our curriculum follows the Nigerian secondary school framework across
          two stages, with Digital Technologies and Data Processing woven in
          throughout so every student graduates digitally literate.
        </p>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-8 md:grid-cols-2">
        <StaggerItem>
          <div className="h-full rounded-2xl bg-chalk p-8 transition-shadow duration-300 hover:shadow-lg">
            <h2 className="font-display text-xl font-700 text-navy">Junior Secondary (JSS1–JSS3)</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-sky">Foundational stage</p>
            <ul className="mt-4 space-y-2">
              {junior.map((s) => (
                <li key={s} className="flex items-center gap-2 font-body text-sm text-navy/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="h-full rounded-2xl bg-chalk p-8 transition-shadow duration-300 hover:shadow-lg">
            <h2 className="font-display text-xl font-700 text-navy">Senior Secondary (SS1–SS3)</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-sky">Science / Arts / Commercial tracks</p>
            <ul className="mt-4 space-y-2">
              {senior.map((s) => (
                <li key={s} className="flex items-center gap-2 font-body text-sm text-navy/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </StaggerGroup>

      <Reveal>
        <div className="mt-12 rounded-2xl border border-sky/20 p-8">
          <h2 className="font-display text-xl font-700 text-navy">Examinations</h2>
          <p className="mt-3 font-body text-sm text-navy/80">
            Students are registered for WAEC and NECO in SS3, alongside regular
            internal assessments and mock examinations each term to track
            progress ahead of external exams.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
