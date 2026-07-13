import Link from 'next/link';
import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem, HoverLift, Tilt3D, Ripple } from '@/components/motion';

const stats = [
  { value: 'JSS1–SS3', label: 'Classes offered' },
  { value: '15+', label: 'Subjects taught' },
  { value: '1:20', label: 'Teacher-to-student ratio' },
  { value: '100%', label: 'WAEC/NECO registered' },
];

const programs = [
  { name: 'Junior Secondary (JSS1–JSS3)', blurb: 'Core foundation in Maths, English, Basic Science, and Data Processing.' },
  { name: 'Senior Secondary (SS1–SS3)', blurb: 'Science, Arts and Commercial tracks preparing students for WAEC & NECO.' },
  { name: 'Digital Technologies', blurb: 'Practical computing and digital literacy from JSS through to SS3.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-chalk">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <Reveal>
              <span className="ribbon">Admissions open for new session</span>
              <h1 className="mt-6 font-display text-4xl font-800 leading-tight text-navy sm:text-5xl">
                Reaching for the stars,{' '}
                <span className="text-sky">one student at a time.</span>
              </h1>
              <p className="mt-5 max-w-md font-body text-navy/80">
                Al-Warith College is a Nigerian secondary school building confident,
                curious learners from JSS1 through SS3 — grounded in strong values
                and modern skills.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/admissions"
                  className="relative overflow-hidden rounded-full bg-coral px-6 py-3 font-body font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-coral/90 hover:shadow-lg active:scale-95"
                >
                  Start Admission
                  <Ripple />
                </Link>
                <Link
                  href="/about"
                  className="relative overflow-hidden rounded-full border-2 border-navy px-6 py-3 font-body font-medium text-navy transition-all duration-200 hover:scale-105 hover:bg-navy hover:text-white active:scale-95"
                >
                  Learn About Us
                  <Ripple />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={0} className="relative flex items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-sun/40 blur-2xl sm:h-80 sm:w-80" />
            <Tilt3D strength={10}>
              <Image
                src="/logo.jpeg"
                alt="Al-Warith College crest"
                width={320}
                height={320}
                className="animate-float relative rounded-full border-8 border-white shadow-xl"
                priority
              />
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-navy">
        <StaggerGroup className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="font-mono text-2xl font-medium text-sun">{s.value}</p>
              <p className="mt-1 font-body text-xs text-white/70">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Academics preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <span className="ribbon">What we teach</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-navy">Academic Programs</h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-3">
          {programs.map((p) => (
            <StaggerItem key={p.name}>
              <Tilt3D strength={6}>
                <HoverLift>
                  <div className="h-full rounded-2xl border border-sky/20 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-sky/10">
                    <h3 className="font-display text-lg font-600 text-navy">{p.name}</h3>
                    <p className="mt-2 font-body text-sm text-navy/70">{p.blurb}</p>
                  </div>
                </HoverLift>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal delay={0.1}>
          <Link href="/academics" className="mt-6 inline-block font-body text-sm font-medium text-sky hover:underline">
            See full academic programs &rarr;
          </Link>
        </Reveal>
      </section>

      {/* Admissions CTA */}
      <section className="bg-coral">
        <Reveal className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-display text-2xl font-700 text-white sm:text-3xl">
            Ready to join the Al-Warith family?
          </h2>
          <p className="mt-3 font-body text-white/90">
            Applications for the new session are open now.
          </p>
          <Link
            href="/admissions"
            className="relative mt-6 inline-block overflow-hidden rounded-full bg-white px-8 py-3 font-body font-medium text-coral transition-all duration-200 hover:scale-105 hover:bg-sun hover:text-navy hover:shadow-lg active:scale-95"
          >
            Apply for Admission
            <Ripple />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
