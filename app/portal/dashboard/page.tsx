import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardShell from '@/components/dashboard/DashboardShell';

export default async function DashboardPage() {
  const supabase = createClient();

  if (!supabase) {
    redirect('/portal');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/portal');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, role, staff_title, class_id, classes(name)')
    .eq('id', user!.id)
    .single();

  if (!profile) {
    // Account exists in Supabase Auth but has no matching profiles row yet —
    // this happens if an admin created the login but hasn't added the
    // profile record. See README for how to fix this.
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-700 text-navy">Account not fully set up</h1>
        <p className="mt-3 font-body text-sm text-navy/70">
          You're signed in, but there's no profile record for this account yet.
          Please contact the school office — this is a one-time setup step an
          admin needs to complete in Supabase.
        </p>
      </div>
    );
  }

  return <DashboardShell profile={profile as any} />;
}
