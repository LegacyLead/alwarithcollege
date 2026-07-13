'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/types';

const DAY_NAMES = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

type Entry = {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  subjects: { name: string } | null;
  classes: { name: string } | null;
};

export default function Timetable({ profile }: { profile: Profile }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('timetable_entries')
        .select('id, day_of_week, start_time, end_time, subjects(name), classes(name)')
        .order('day_of_week')
        .order('start_time');
      setEntries((data as any) ?? []);
    }
    load();
  }, []);

  if (entries === null) return <p className="font-body text-sm text-navy/60">Loading…</p>;
  if (entries.length === 0) {
    return (
      <p className="font-body text-sm text-navy/60">
        No timetable entries yet — an admin can add these in Supabase.
      </p>
    );
  }

  const byDay = [1, 2, 3, 4, 5].map((d) => ({
    day: d,
    items: entries.filter((e) => e.day_of_week === d),
  }));

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {byDay.map(({ day, items }) => (
        <div key={day} className="rounded-2xl border border-sky/20 p-5">
          <p className="font-display text-sm font-600 text-navy">{DAY_NAMES[day]}</p>
          {items.length === 0 ? (
            <p className="mt-2 font-body text-xs text-navy/50">No classes</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {items.map((e) => (
                <li key={e.id} className="flex items-center justify-between font-body text-sm text-navy/80">
                  <span>
                    {e.subjects?.name}
                    {profile.role !== 'student' && e.classes?.name ? ` — ${e.classes.name}` : ''}
                  </span>
                  <span className="font-mono text-xs text-sky">
                    {e.start_time.slice(0, 5)}–{e.end_time.slice(0, 5)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
