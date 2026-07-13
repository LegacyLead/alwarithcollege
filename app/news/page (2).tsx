const news = [
  { date: '2026-09-02', title: 'New academic session resumes', blurb: 'Students return for the new session with a revised timetable and new textbooks.' },
  { date: '2026-08-15', title: 'Inter-house sports day announced', blurb: 'This year\'s sports competition holds on the school field, with four competing houses.' },
  { date: '2026-07-20', title: 'WAEC results released', blurb: 'Al-Warith College records strong pass rates across core subjects this year.' },
];

const events = [
  { date: '2026-09-15', title: 'Resumption & orientation for new students' },
  { date: '2026-10-10', title: 'Mid-term test week begins' },
  { date: '2026-11-05', title: 'Inter-house sports competition' },
  { date: '2026-12-12', title: 'End-of-term prize-giving ceremony' },
];

export default function News() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <span className="ribbon">Happenings</span>
      <h1 className="mt-4 font-display text-4xl font-800 text-navy">News & Gallery</h1>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-700 text-navy">Latest news</h2>
        <div className="mt-6 space-y-5">
          {news.map((n) => (
            <article key={n.title} className="rounded-2xl border border-sky/20 p-6">
              <p className="font-mono text-xs text-sky">{n.date}</p>
              <h3 className="mt-1 font-display text-lg font-600 text-navy">{n.title}</h3>
              <p className="mt-2 font-body text-sm text-navy/70">{n.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-700 text-navy">Upcoming events</h2>
        <ul className="mt-6 divide-y divide-sky/20 rounded-2xl border border-sky/20">
          {events.map((e) => (
            <li key={e.title} className="flex items-center gap-4 px-6 py-4">
              <span className="font-mono text-xs text-sky whitespace-nowrap">{e.date}</span>
              <span className="font-body text-sm text-navy">{e.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-700 text-navy">Gallery</h2>
        <p className="mt-2 font-body text-sm text-navy/70">
          Photos from school life — replace these placeholders with real photos any time.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl bg-chalk font-mono text-xs text-sky"
            >
              Photo {i + 1}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
