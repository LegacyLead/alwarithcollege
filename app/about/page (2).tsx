const values = [
  { title: 'Excellence', blurb: 'We hold every student to a high standard, and support them in reaching it.' },
  { title: 'Character', blurb: 'Discipline, honesty and respect are taught alongside every subject.' },
  { title: 'Curiosity', blurb: 'We encourage students to ask questions and explore beyond the syllabus.' },
];

const milestones = [
  { year: '2010', event: 'Al-Warith College is founded by Mrs Shobowale R.A. as an Islamiyyah secondary school in Agbele, Oke Ota-Ona, Ikorodu.' },
  { year: 'Since', event: 'Growing from a small intake to a full JSS1–SS3 school, guided by the same founding leadership.' },
  { year: 'Today', event: 'A team of about 15 staff members serving students across Junior and Senior Secondary.' },
];

const leadership = [
  { name: 'Mrs Shobowale R.A.', role: 'Proprietress & Founder' },
  { name: 'Mr Abdu Salaam', role: 'Principal' },
  { name: 'Mrs Shotomiwa', role: 'Vice-Principal & Admin' },
  { name: 'Mr Isiaka', role: 'Data Processing Officer' },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <span className="ribbon">Our story</span>
      <h1 className="mt-4 font-display text-4xl font-800 text-navy">About Al-Warith College</h1>
      <p className="mt-6 font-body text-navy/80 leading-relaxed">
        Al-Warith College is an Islamiyyah secondary school located in Agbele,
        Oke Ota-Ona, Ikorodu, Lagos. Founded in 2010 by our Proprietress, Mrs
        Shobowale R.A., the school combines Islamic values with a strong
        academic core — from Junior Secondary through Senior Secondary —
        including practical skills like Computer Studies and Data Processing,
        so our students leave prepared for both examinations and the world
        beyond them.
      </p>
      <p className="mt-4 font-body text-navy/80 leading-relaxed">
        Our name carries our promise: to guide every student toward their own
        version of excellence, reaching for the stars with the support of
        dedicated teachers and a caring community.
      </p>

      <h2 className="mt-12 font-display text-2xl font-700 text-navy">Our history</h2>
      <ol className="mt-6 space-y-4 border-l-2 border-sky/30 pl-6">
        {milestones.map((m) => (
          <li key={m.event} className="relative">
            <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-sky" />
            <p className="font-mono text-xs uppercase tracking-wider text-sky">{m.year}</p>
            <p className="mt-1 font-body text-sm text-navy/80">{m.event}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-body text-xs text-navy/50">
        More milestones (WAEC results, school expansions, notable events) can
        be added here as you recall them.
      </p>

      <h2 className="mt-12 font-display text-2xl font-700 text-navy">What we stand for</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl bg-chalk p-6">
            <h3 className="font-display text-lg font-600 text-navy">{v.title}</h3>
            <p className="mt-2 font-body text-sm text-navy/70">{v.blurb}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-700 text-navy">Mission & Vision</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-sky/20 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-sky">Mission</p>
          <p className="mt-2 font-body text-sm text-navy/80">
            To provide quality, values-driven secondary education that
            prepares students academically, morally, and practically for
            higher learning and life.
          </p>
        </div>
        <div className="rounded-2xl border border-sky/20 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-sky">Vision</p>
          <p className="mt-2 font-body text-sm text-navy/80">
            To be a leading secondary school known for producing disciplined,
            innovative graduates who reach for the stars in every field they
            choose.
          </p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-700 text-navy">Leadership</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {leadership.map((l) => (
          <div key={l.name} className="flex items-center gap-4 rounded-2xl border border-sky/20 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chalk font-display text-lg font-700 text-sky">
              {l.name.replace(/^(Mrs|Mr)\s/, '').charAt(0)}
            </div>
            <div>
              <p className="font-display text-base font-600 text-navy">{l.name}</p>
              <p className="font-mono text-xs uppercase tracking-wider text-sky">{l.role}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-body text-xs text-navy/50">
        Al-Warith College is supported by a team of about 15 staff in total —
        more profiles will be added here as they're shared.
      </p>
    </div>
  );
}
