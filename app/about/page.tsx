import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem, HoverLift, Tilt3D } from '@/components/motion';
// ==========================================
// 🔒 CONTROL FLAG: Set to 'true' to make the page dormant. 
// Change to 'false' to instantly restore the page once paid!
const IS_DORMANT = true; 
// ==========================================
export default function About() {
  // If dormant mode is active, show this professional administrative hold screen
  if (IS_DORMANT) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 text-center sm:px-6">
        <div className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold tracking-wider text-amber-800 uppercase">
          System Hold
        </div>
        <h1 className="mt-6 font-display text-3xl font-800 text-navy">
          Access Temporarily Suspended
        </h1>
        <p className="mt-4 font-body text-sm text-navy/70 leading-relaxed">
          This portal page is temporarily inactive due to pending administrative clearances and account audits. Normal services will resume shortly.
        </p>
        <p className="mt-6 font-mono text-xs text-navy/40">
          Error Code: 402 (Payment/Contract Verification Required)
        </p>
      </div>
    );
  }

  // ... (Your original school website code follows here untouched)
const values = [
  { title: 'Excellence', blurb: 'We hold every student to a high standard, and support them in reaching it.' },
  { title: 'Character', blurb: 'Discipline, honesty and respect are taught alongside every subject.' },
  { title: 'Curiosity', blurb: 'We encourage students to ask questions and explore beyond the syllabus.' },
];

const milestones = [
  { year: '2010', event: 'Al-Warith College is founded by Mrs Shobowale R.A. as an Islamiyyah secondary school in Agbele, Oke Ota-Ona, Ikorodu.' },
  { year: '2024', event: 'Al-Warith College is approved for WAEC and NECO, allowing students to sit for these examinations at the school.' },
  { year: 'Today', event: 'A growing team of dedicated staff serves students across Junior and Senior Secondary, alongside a Primary School section at a separate location.' },
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
      <Reveal>
        <span className="ribbon">Our story</span>
        <h1 className="mt-4 font-display text-4xl font-800 text-navy">About Al-Warith College</h1>
        <p className="mt-6 font-body text-navy/80 leading-relaxed">
          Al-Warith College is an Islamiyyah secondary school located in Agbele,
          Oke Ota-Ona, Ikorodu, Lagos. Founded in 2010 by our Proprietress, Mrs
          Shobowale R.A., the school combines Islamic values with a strong
          academic core — from Junior Secondary through Senior Secondary —
          including practical skills like Digital Technologies and Data Processing,
          so our students leave prepared for both examinations and the world
          beyond them.
        </p>
        <p className="mt-4 font-body text-navy/80 leading-relaxed">
          Our name carries our promise: to guide every student toward their own
          version of excellence, reaching for the stars with the support of
          dedicated teachers and a caring community.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-8 overflow-hidden rounded-3xl shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/school-building.jpg"
            alt="Al-Warith College campus building"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </Reveal>

      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-700 text-navy">Our history</h2>
      </Reveal>
      <StaggerGroup className="mt-6 space-y-4 border-l-2 border-sky/30 pl-6">
        {milestones.map((m) => (
          <StaggerItem key={m.event} className="relative">
            <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-sky" />
            <p className="font-mono text-xs uppercase tracking-wider text-sky">{m.year}</p>
            <p className="mt-1 font-body text-sm text-navy/80">{m.event}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <p className="mt-4 font-body text-xs text-navy/50">
        More milestones (WAEC results, school expansions, notable events) can
        be added here as you recall them.
      </p>

      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-700 text-navy">What we stand for</h2>
      </Reveal>
      <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <StaggerItem key={v.title}>
            <HoverLift>
              <div className="h-full rounded-2xl bg-chalk p-6 transition-shadow duration-300 hover:shadow-lg">
                <h3 className="font-display text-lg font-600 text-navy">{v.title}</h3>
                <p className="mt-2 font-body text-sm text-navy/70">{v.blurb}</p>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-700 text-navy">Mission & Vision</h2>
      </Reveal>
      <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2">
        <StaggerItem>
          <HoverLift>
            <div className="h-full rounded-2xl border border-sky/20 p-6 transition-shadow duration-300 hover:shadow-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-sky">Mission</p>
              <p className="mt-2 font-body text-sm text-navy/80">
                To provide quality, values-driven secondary education that
                prepares students academically, morally, and practically for
                higher learning and life.
              </p>
            </div>
          </HoverLift>
        </StaggerItem>
        <StaggerItem>
          <HoverLift>
            <div className="h-full rounded-2xl border border-sky/20 p-6 transition-shadow duration-300 hover:shadow-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-sky">Vision</p>
              <p className="mt-2 font-body text-sm text-navy/80">
                To be a leading secondary school known for producing disciplined,
                innovative graduates who reach for the stars in every field they
                choose.
              </p>
            </div>
          </HoverLift>
        </StaggerItem>
      </StaggerGroup>

      <Reveal>
        <h2 className="mt-12 font-display text-2xl font-700 text-navy">Leadership</h2>
      </Reveal>
      <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2">
        {leadership.map((l) => (
          <StaggerItem key={l.name}>
            <Tilt3D strength={6}>
              <HoverLift>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-sky/20 p-6 transition-shadow duration-300 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chalk font-display text-lg font-700 text-sky">
                    {l.name.replace(/^(Mrs|Mr)\s/, '').charAt(0)}
                  </div>
                  <div>
                    <p className="font-display text-base font-600 text-navy">{l.name}</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-sky">{l.role}</p>
                  </div>
                </div>
              </HoverLift>
            </Tilt3D>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <p className="mt-4 font-body text-xs text-navy/50">
        Al-Warith College is supported by a growing team of staff — more
        profiles will be added here as they're shared.
      </p>
    </div>
  );
}
