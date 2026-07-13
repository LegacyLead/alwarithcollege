'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/types';

type ResultRow = {
  id: string;
  term: string;
  ca_score: number;
  exam_score: number;
  term_average: number;
  subjects: { name: string } | null;
};

type Assignment = { class_id: string; subject_id: string; class_name: string; subject_name: string };
type Student = { id: string; full_name: string };

const CURRENT_TERM = '2026 Term 1';

export default function Results({ profile }: { profile: Profile }) {
  if (profile.role === 'student') return <StudentResults profile={profile} />;
  return <TeacherResults profile={profile} />;
}

function StudentResults({ profile }: { profile: Profile }) {
  const [rows, setRows] = useState<ResultRow[] | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('results')
        .select('id, term, ca_score, exam_score, term_average, subjects(name)')
        .eq('student_id', profile.id)
        .order('term', { ascending: false });
      setRows((data as any) ?? []);
    }
    load();
  }, [profile.id]);

  if (rows === null) return <p className="font-body text-sm text-navy/60">Loading…</p>;
  if (rows.length === 0) return <p className="font-body text-sm text-navy/60">No results published yet.</p>;

  return (
    <div className="overflow-hidden rounded-2xl border border-sky/20">
      <table className="w-full text-left font-body text-sm">
        <thead className="bg-chalk">
          <tr>
            <th className="px-4 py-3 font-600 text-navy">Subject</th>
            <th className="px-4 py-3 font-600 text-navy">Term</th>
            <th className="px-4 py-3 font-600 text-navy">CA (40)</th>
            <th className="px-4 py-3 font-600 text-navy">Exam (60)</th>
            <th className="px-4 py-3 font-600 text-navy">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sky/20">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3 text-navy">{r.subjects?.name}</td>
              <td className="px-4 py-3 text-navy/70">{r.term}</td>
              <td className="px-4 py-3 text-navy/70">{r.ca_score}</td>
              <td className="px-4 py-3 text-navy/70">{r.exam_score}</td>
              <td className="px-4 py-3 font-600 text-sky">{r.term_average}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TeacherResults({ profile }: { profile: Profile }) {
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [selected, setSelected] = useState<string>('');
  const [students, setStudents] = useState<Student[] | null>(null);
  const [scores, setScores] = useState<Record<string, { ca: string; exam: string }>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('class_subjects')
        .select('class_id, subject_id, classes(name), subjects(name)')
        .eq('teacher_id', profile.id);
      const opts: Assignment[] = (data as any[])?.map((row) => ({
        class_id: row.class_id,
        subject_id: row.subject_id,
        class_name: row.classes?.name ?? 'Class',
        subject_name: row.subjects?.name ?? 'Subject',
      })) ?? [];
      setAssignments(opts);
      if (opts.length > 0) setSelected(`${opts[0].class_id}::${opts[0].subject_id}`);
    }
    load();
  }, [profile.id]);

  useEffect(() => {
    if (!selected) return;
    const [classId] = selected.split('::');
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('class_id', classId)
        .eq('role', 'student')
        .order('full_name');
      setStudents(data ?? []);
      setScores({});
      setSaved(false);
    }
    load();
  }, [selected]);

  async function handleSave() {
    if (!selected) return;
    const [, subjectId] = selected.split('::');
    setSaving(true);
    const supabase = createClient();
    const rows = Object.entries(scores)
      .filter(([, v]) => v.ca !== '' && v.exam !== '')
      .map(([student_id, v]) => ({
        student_id,
        subject_id: subjectId,
        term: CURRENT_TERM,
        ca_score: Number(v.ca),
        exam_score: Number(v.exam),
        entered_by: profile.id,
      }));
    if (rows.length > 0) {
      await supabase.from('results').upsert(rows, { onConflict: 'student_id,subject_id,term' });
    }
    setSaving(false);
    setSaved(true);
  }

  if (assignments === null) return <p className="font-body text-sm text-navy/60">Loading…</p>;
  if (assignments.length === 0) {
    return (
      <p className="font-body text-sm text-navy/60">
        You're not yet assigned to any subject in <code>class_subjects</code> —
        an admin needs to link you to a class/subject in Supabase first.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="font-body text-sm text-navy">Class & subject:</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-lg border border-sky/30 px-3 py-2 font-body text-sm"
        >
          {assignments.map((a) => (
            <option key={`${a.class_id}::${a.subject_id}`} value={`${a.class_id}::${a.subject_id}`}>
              {a.class_name} — {a.subject_name}
            </option>
          ))}
        </select>
        <span className="font-mono text-xs text-sky">{CURRENT_TERM}</span>
      </div>

      {students === null && <p className="font-body text-sm text-navy/60">Loading roster…</p>}
      {students?.length === 0 && <p className="font-body text-sm text-navy/60">No students in this class yet.</p>}

      {students && students.length > 0 && (
        <>
          <div className="overflow-hidden rounded-2xl border border-sky/20">
            <table className="w-full text-left font-body text-sm">
              <thead className="bg-chalk">
                <tr>
                  <th className="px-4 py-3 font-600 text-navy">Student</th>
                  <th className="px-4 py-3 font-600 text-navy">CA (0–40)</th>
                  <th className="px-4 py-3 font-600 text-navy">Exam (0–60)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky/20">
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 text-navy">{s.full_name}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min={0}
                        max={40}
                        className="w-20 rounded-lg border border-sky/30 px-2 py-1"
                        value={scores[s.id]?.ca ?? ''}
                        onChange={(e) =>
                          setScores((sc) => ({ ...sc, [s.id]: { ca: e.target.value, exam: sc[s.id]?.exam ?? '' } }))
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min={0}
                        max={60}
                        className="w-20 rounded-lg border border-sky/30 px-2 py-1"
                        value={scores[s.id]?.exam ?? ''}
                        onChange={(e) =>
                          setScores((sc) => ({ ...sc, [s.id]: { ca: sc[s.id]?.ca ?? '', exam: e.target.value } }))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 rounded-full bg-coral px-6 py-2 font-body text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-coral/90 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save results'}
          </button>
          {saved && <p className="mt-2 font-body text-xs text-sky">Saved.</p>}
        </>
      )}
    </div>
  );
}
