import { redirect } from 'next/navigation';
import PortalLogin from '@/components/PortalLogin';
import { Reveal } from '@/components/motion';
import { createClient } from '@/lib/supabase/server';

export default async function Portal() {
  const supabase = createClient();

  if (!supabase) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Reveal>
          <span className="ribbon">Portal</span>
          <h1 className="mt-4 font-display text-3xl font-800 text-navy">Staff & Student Login</h1>
          <div className="mt-6 rounded-2xl border border-sky/20 bg-chalk p-6">
            <p className="font-body text-sm text-navy/80">
              The portal isn't connected yet — an admin needs to add Supabase
              credentials to <code>.env.local</code> first. See the README
              for setup steps.
            </p>
          </div>
        </Reveal>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/portal/dashboard');
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Reveal>
        <span className="ribbon">Portal</span>
        <h1 className="mt-4 font-display text-3xl font-800 text-navy">Staff & Student Login</h1>
        <p className="mt-4 font-body text-sm text-navy/70">
          Log in with the Student or Staff ID and password provided by the
          school office.
        </p>
        <PortalLogin />
      </Reveal>
    </div>
  );
}
