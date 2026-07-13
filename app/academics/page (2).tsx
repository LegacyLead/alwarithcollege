const junior = ['Mathematics', 'English Language', 'Basic Science', 'Basic Technology', 'Data Processing', 'Social Studies', 'Civic Education', 'Agricultural Science', 'French', 'Christian/Islamic Studies'];
const senior = ['Mathematics', 'English Language', 'Computer Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Government', 'Commerce', 'Accounting', 'Literature-in-English'];

export default function Academics() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <span className="ribbon">Curriculum</span>
      <h1 className="mt-4 font-display text-4xl font-800 text-navy">Academic Programs</h1>
      <p className="mt-6 max-w-2xl font-body text-navy/80">
        Our curriculum follows the Nigerian secondary school framework across
        two stages, with Computer Studies and Data Processing woven in
        throughout so every student graduates digitally literate.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-chalk p-8">
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

        <div className="rounded-2xl bg-chalk p-8">
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
      </div>

      <div className="mt-12 rounded-2xl border border-sky/20 p-8">
        <h2 className="font-display text-xl font-700 text-navy">Examinations</h2>
        <p className="mt-3 font-body text-sm text-navy/80">
          Students are registered for WAEC and NECO in SS3, alongside regular
          internal assessments and mock examinations each term to track
          progress ahead of external exams.
        </p>
      </div>
    </div>
  );
}
