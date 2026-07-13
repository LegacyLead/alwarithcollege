import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion';

const MAP_QUERY = encodeURIComponent(
  '19 Fatayi Jeru Street, Agbele, Oke Ota-Ona, Ikorodu, Lagos, Nigeria'
);

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <span className="ribbon">Get in touch</span>
        <h1 className="mt-4 font-display text-4xl font-800 text-navy">Contact Us</h1>
      </Reveal>

      <Reveal delay={0.05} className="mt-8 overflow-hidden rounded-3xl shadow-md">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <Image
            src="/school-building.jpg"
            alt="Al-Warith College campus building"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </Reveal>

      <StaggerGroup className="mt-10 grid gap-8 sm:grid-cols-2">
        <StaggerItem>
          <div className="h-full rounded-2xl bg-chalk p-8 transition-shadow duration-300 hover:shadow-lg">
            <h2 className="font-display text-lg font-600 text-navy">School office</h2>
            <ul className="mt-4 space-y-2 font-body text-sm text-navy/80">
              <li>19 Fatayi Jeru Street, Agbele, Oke Ota-Ona, Ikorodu, Lagos</li>
              <li>
                <a href="mailto:alwarithschools@yahoo.com" className="hover:text-sky">alwarithschools@yahoo.com</a>
              </li>
              <li>
                <a href="tel:+2348028358372" className="hover:text-sky">+234 802 835 8372</a>
              </li>
              <li>
                <a href="https://wa.me/2348028358372" target="_blank" rel="noopener noreferrer" className="font-medium text-sky hover:underline">
                  Chat on WhatsApp
                </a>
              </li>
              <li>Mon–Fri, 8:00 AM – 4:00 PM</li>
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem>
          <ContactForm />
        </StaggerItem>
      </StaggerGroup>

      <Reveal delay={0.1} className="mt-8">
        <h2 className="font-display text-lg font-600 text-navy">Find us</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-sky/20 shadow-sm">
          <iframe
            title="Al-Warith College location"
            src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-body text-sm font-medium text-sky hover:underline"
        >
          Open in Google Maps &rarr;
        </a>
      </Reveal>
    </div>
  );
}
