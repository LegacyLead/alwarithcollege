import PortalLogin from '@/components/PortalLogin';

export default function Portal() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <span className="ribbon">Portal</span>
      <h1 className="mt-4 font-display text-3xl font-800 text-navy">Staff & Student Login</h1>
      <p className="mt-4 font-body text-sm text-navy/70">
        This is a demo login screen. It isn't wired to a real account system yet —
        wiring it up to a database (e.g. Supabase, like ReceiptGen uses) is a
        natural next step once you're ready for real accounts.
      </p>
      <PortalLogin />
    </div>
  );
}
