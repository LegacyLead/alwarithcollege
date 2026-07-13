'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { roleLabels } from '@/lib/supabase/helpers';
import Announcements from './Announcements';
import Timetable from './Timetable';
import Attendance from './Attendance';
import Results from './Results';
import Fees from './Fees';

type Profile = {
  id: string;
  full_name: string;
  role: 'student' | 'teacher' | 'admin' | 'proprietress';
  staff_title: string | null;
  class_id: string | null;
  classes: { name: string } | null;
};

const TABS_BY_ROLE: Record<Profile['role'], { key: string; label: string }[]> = {
  student: [
    { key: 'announcements', label: 'Announcements' },
    { key: 'timetable', label: 'Timetable' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'results', label: 'Results' },
    { key: 'fees', label: 'Fees' },
  ],
  teacher: [
    { key: 'announcements', label: 'Announcements' },
    { key: 'timetable', label: 'Timetable' },
    { key: 'attendance', label: 'Mark Attendance' },
    { key: 'results', label: 'Enter Results' },
  ],
  admin: [
    { key: 'announcements', label: 'Announcements' },
    { key: 'timetable', label: 'Timetable' },
  ],
  proprietress: [
    { key: 'announcements', label: 'Announcements' },
    { key: 'timetable', label: 'Timetable' },
  ],
};

export default function DashboardShell({ profile }: { profile: Profile }) {
  const tabs = TABS_BY_ROLE[profile.role];
  const [active, setActive] = useState(tabs[0].key);
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/portal');
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="ribbon">{roleLabels[profile.role]}</span>
          <h1 className="mt-3 font-display text-3xl font-800 text-navy">
            Welcome, {profile.full_name}
          </h1>
          {profile.classes?.name && (
            <p className="mt-1 font-body text-sm text-navy/60">{profile.classes.name}</p>
          )}
          {profile.staff_title && (
            <p className="mt-1 font-body text-sm text-navy/60">{profile.staff_title}</p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-full border-2 border-navy px-4 py-2 font-body text-sm font-medium text-navy transition-all duration-200 hover:scale-105 hover:bg-navy hover:text-white active:scale-95"
        >
          Log out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-sky/20 pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`relative rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-200 ${
              active === t.key ? 'text-white' : 'text-navy hover:bg-chalk'
            }`}
          >
            {active === t.key && (
              <motion.span
                layoutId="dash-tab-pill"
                className="absolute inset-0 rounded-full bg-navy"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          {active === 'announcements' && <Announcements profile={profile} />}
          {active === 'timetable' && <Timetable profile={profile} />}
          {active === 'attendance' && <Attendance profile={profile} />}
          {active === 'results' && <Results profile={profile} />}
          {active === 'fees' && <Fees profile={profile} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
