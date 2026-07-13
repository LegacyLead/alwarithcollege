'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/types';

type FeeRow = {
  id: string;
  term: string;
  amount_due: number;
  amount_paid: number;
  status: string;
  due_date: string | null;
};

const statusStyles: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  partial: 'bg-sun/30 text-navy',
  outstanding: 'bg-coral/10 text-coral',
};

export default function Fees({ profile }: { profile: Profile }) {
  const [rows, setRows] = useState<FeeRow[] | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('fees')
        .select('id, term, amount_due, amount_paid, status, due_date')
        .eq('student_id', profile.id)
        .order('term', { ascending: false });
      setRows(data ?? []);
    }
    load();
  }, [profile.id]);

  if (rows === null) return <p className="font-body text-sm text-navy/60">Loading…</p>;
  if (rows.length === 0) return <p className="font-body text-sm text-navy/60">No fee records yet.</p>;

  return (
    <div className="space-y-4">
      {rows.map((f) => (
        <div key={f.id} className="rounded-2xl border border-sky/20 p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-600 text-navy">{f.term}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[f.status]}`}>
              {f.status}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 font-body text-sm text-navy/80">
            <div>
              <p className="font-mono text-xs text-navy/50">Due</p>
              <p>₦{f.amount_due.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-navy/50">Paid</p>
              <p>₦{f.amount_paid.toLocaleString()}</p>
            </div>
            {f.due_date && (
              <div>
                <p className="font-mono text-xs text-navy/50">Due date</p>
                <p>{new Date(f.due_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
