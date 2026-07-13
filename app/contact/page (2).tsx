import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <span className="ribbon">Get in touch</span>
      <h1 className="mt-4 font-display text-4xl font-800 text-navy">Contact Us</h1>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl bg-chalk p-8">
          <h2 className="font-display text-lg font-600 text-navy">School office</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-navy/80">
            <li>19 Fatayi Jeru Street, Agbele, Oke Ota-Ona, Ikorodu, Lagos</li>
            <li>info@alwarithcollege.edu.ng</li>
            <li>+234 800 000 0000</li>
            <li>Mon–Fri, 8:00 AM – 4:00 PM</li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
