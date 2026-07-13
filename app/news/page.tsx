import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion';
import PhotoGallery from '@/components/PhotoGallery';

const news = [
  { date: 'July 2026', title: 'Mathematics Award of Excellence', blurb: 'Al-Warith College honoured standout students with an Award of Excellence in Mathematics, presented alongside proud family members — recognising strong performance and dedication in the subject.' },
  { date: 'July 2026', title: 'SS2 Entrepreneurship Exhibition 2026', blurb: 'SS2 students organized and ran a school-wide entrepreneurship exhibition, presenting original student ventures — from snacks and beverages to beauty and tech services — judged on branding, product presentation and pitching. Certificates of participation went to every student, with special certificates of exhibition excellence for top-performing ventures.' },
  { date: '2026-09-02', title: 'New academic session resumes', blurb: 'Students return for the new session with a revised timetable and new textbooks.' },
  { date: '2026-08-15', title: 'Inter-house sports day announced', blurb: 'This year\'s sports competition holds on the school field, with four competing houses.' },
];

const events = [
  { date: '2026-09-15', title: 'Resumption & orientation for new students' },
  { date: '2026-10-10', title: 'Mid-term test week begins' },
  { date: '2026-11-05', title: 'Inter-house sports competition' },
  { date: '2026-12-12', title: 'End-of-term prize-giving ceremony' },
];

const exhibitionPhotos = [
  { src: '/gallery/entrepreneurship-2026/proprietress-speaking.jpg', caption: 'The Proprietress addressing students and judges' },
  { src: '/gallery/entrepreneurship-2026/judges-panel.jpg', caption: 'The judging panel reviewing student ventures' },
  { src: '/gallery/entrepreneurship-2026/judges-reviewing-products.jpg', caption: 'The judging panel sampling and reviewing student products' },
  { src: '/gallery/entrepreneurship-2026/presenter-addressing-audience.jpg', caption: 'A presenter addressing the exhibition audience' },
  { src: '/gallery/entrepreneurship-2026/student-with-product.jpg', caption: 'A student presenting her product at the exhibition' },
  { src: '/gallery/entrepreneurship-2026/exhibition-hall-overview.jpg', caption: 'A wide view of the exhibition floor, with student stalls set up around the room' },
  { src: '/gallery/entrepreneurship-2026/students-watching.jpg', caption: 'Students in the audience during the exhibition' },
  { src: '/gallery/entrepreneurship-2026/students-with-drinks.jpg', caption: 'Students enjoying refreshments from fellow students\u2019 stalls' },
  { src: '/gallery/entrepreneurship-2026/students-with-certificate.jpg', caption: 'Award recipients with their Certificate of Exhibition Excellence' },
  { src: '/gallery/entrepreneurship-2026/certificate-presentation.jpg', caption: 'Alade Wahab Amirat receiving her Certificate of Participation' },
  { src: '/gallery/entrepreneurship-2026/group-celebration.jpg', caption: 'SS2 students celebrating with their certificates of participation' },
];

const mathAwardPhotos = [
  { src: '/gallery/mathematics-award-2026/award-01.jpg', caption: 'A student receiving the Mathematics Award of Excellence with family' },
  { src: '/gallery/mathematics-award-2026/award-02.jpg', caption: 'A student receiving the Mathematics Award of Excellence with family' },
  { src: '/gallery/mathematics-award-2026/award-03.jpg', caption: 'A student receiving the Mathematics Award of Excellence with family' },
  { src: '/gallery/mathematics-award-2026/award-04.jpg', caption: 'A student receiving the Mathematics Award of Excellence with family' },
  { src: '/gallery/mathematics-award-2026/award-05.jpg', caption: 'A student receiving the Mathematics Award of Excellence with family' },
  { src: '/gallery/mathematics-award-2026/award-06.jpg', caption: 'A student receiving the Mathematics Award of Excellence with family' },
];

export default function News() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <span className="ribbon">Happenings</span>
        <h1 className="mt-4 font-display text-4xl font-800 text-navy">News & Gallery</h1>
      </Reveal>

      {/* Mathematics Award */}
      <Reveal className="mt-12 rounded-3xl bg-chalk p-6 sm:p-10">
        <span className="ribbon">Just concluded</span>
        <h2 className="mt-4 font-display text-2xl font-700 text-navy sm:text-3xl">
          Mathematics Award of Excellence
        </h2>
        <p className="mt-3 max-w-2xl font-body text-sm text-navy/80">{news[0].blurb}</p>
        <PhotoGallery photos={mathAwardPhotos} />
      </Reveal>

      {/* Entrepreneurship Exhibition */}
      <Reveal className="mt-10 rounded-3xl bg-chalk p-6 sm:p-10">
        <span className="ribbon">Recent</span>
        <h2 className="mt-4 font-display text-2xl font-700 text-navy sm:text-3xl">
          SS2 Entrepreneurship Exhibition 2026
        </h2>
        <p className="mt-3 max-w-2xl font-body text-sm text-navy/80">{news[1].blurb}</p>
        <PhotoGallery photos={exhibitionPhotos} />
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-display text-2xl font-700 text-navy">More news</h2>
        <StaggerGroup className="mt-6 space-y-5">
          {news.slice(2).map((n) => (
            <StaggerItem key={n.title}>
              <article className="rounded-2xl border border-sky/20 p-6 transition-shadow duration-300 hover:shadow-lg">
                <p className="font-mono text-xs text-sky">{n.date}</p>
                <h3 className="mt-1 font-display text-lg font-600 text-navy">{n.title}</h3>
                <p className="mt-2 font-body text-sm text-navy/70">{n.blurb}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-display text-2xl font-700 text-navy">Upcoming events</h2>
        <ul className="mt-6 divide-y divide-sky/20 rounded-2xl border border-sky/20">
          {events.map((e) => (
            <li key={e.title} className="flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-chalk">
              <span className="font-mono text-xs text-sky whitespace-nowrap">{e.date}</span>
              <span className="font-body text-sm text-navy">{e.title}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
