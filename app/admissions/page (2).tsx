import AdmissionsForm from '@/components/AdmissionsForm';

const steps = [
  { title: 'Submit an inquiry', blurb: 'Fill the form below or visit the school office with your ward.' },
  { title: 'Entrance assessment', blurb: 'Students sit a short assessment in Maths and English.' },
  { title: 'Interview', blurb: 'A brief interview with the student and parent/guardian.' },
  { title: 'Offer & registration', blurb: 'Successful applicants receive an admission letter and complete registration.' },
];

export default function Admissions() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <span className="ribbon">Join us</span>
      <h1 className="mt-4 font-display text-4xl font-800 text-navy">Admissions</h1>
      <p className="mt-6 max-w-2xl font-body text-navy/80">
        Admission into Al-Warith College is open to students entering JSS1
        through SS3. Here is how the process works.
      </p>

      <ol className="mt-10 grid gap-6 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl bg-chalk p-6">
            <span className="font-mono text-xs text-sky">Step {i + 1}</span>
            <h3 className="mt-1 font-display text-lg font-600 text-navy">{s.title}</h3>
            <p className="mt-2 font-body text-sm text-navy/70">{s.blurb}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-700 text-navy">Send an admission inquiry</h2>
        <p className="mt-2 font-body text-sm text-navy/70">
          Tell us about your ward and our admissions office will contact you.
        </p>
        <AdmissionsForm />
      </div>
    </div>
  );
}
