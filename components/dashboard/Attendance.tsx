'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/types';

type AttendanceRow = { id: string; date: string; status: string };
type ClassOption = { class_id: string; name: string };
type Student = { id: string; full_name: string };

const TODAY = new Date().toISOString().slice(0, 10);

export default function Attendance({ profile }: { profile: Profile }) {
  if (profile.role === 'student') return <StudentAttendance profile={profile} />;
  return <TeacherAttendance profile={profile} />;
}

function StudentAttendance({ profile }: { profile: Profile }) {
  const [rows, setRows] = useState<AttendanceRow[] | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('attendance')
        .select('id, date, status')
        .eq('student_id', profile.id)
        .order('date', { ascending: false })
        .limit(30);
      setRows(data ?? []);
    }
    load();
  }, [profile.id]);

  if (rows === null) return <p className="font-body text-sm text-navy/60">Loading…</p>;
  if (rows.length === 0) return <p className="font-body text-sm text-navy/60">No attendance recorded yet.</p>;

  const present = rows.filter((r) => r.status === 'present').length;

  return (
    <div>
      <p className="mb-4 font-body text-sm text-navy/70">
        {present} of {rows.length} recent days present.
      </p>
      <ul className="divide-y divide-sky/20 rounded-2xl border border-sky/20">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center justify-between px-5 py-3 font-body text-sm">
            <span className="text-navy">{new Date(r.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                r.status === 'present'
                  ? 'bg-green-100 text-green-800'
                  : r.status === 'late'
                  ? 'bg-sun/30 text-navy'
                  : 'bg-coral/10 text-coral'
              }`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeacherAttendance({ profile }: { profile: Profile }) {
  const [classes, setClasses] = useState<ClassOption[] | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [students, setStudents] = useState<Student[] | null>(null);
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('class_subjects')
        .select('class_id, classes(name)')
        .eq('teacher_id', profile.id);
      const unique = new Map<string, string>();
      (data as any[])?.forEach((row) => unique.set(row.class_id, row.classes?.name ?? 'Class'));
      const opts = Array.from(unique, ([class_id, name]) => ({ class_id, name }));
      setClasses(opts);
      if (opts.length > 0) setSelectedClass(opts[0].class_id);
    }
    load();
  }, [profile.id]);

  useEffect(() => {
    if (!selectedClass) return;
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('class_id', selectedClass)
        .eq('role', 'student')
        .order('full_name');
      setStudents(data ?? []);
      setMarks({});
      setSaved(false);
    }
    load();
  }, [selectedClass]);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const rows = Object.entries(marks).map(([student_id, status]) => ({
      student_id,
      class_id: selectedClass,
      date: TODAY,
      status,
      marked_by: profile.id,
    }));
    if (rows.length > 0) {
      await supabase.from('attendance').upsert(rows, { onConflict: 'student_id,date' });
    }
    setSaving(false);
    setSaved(true);
  }

  if (classes === null) return <p className="font-body text-sm text-navy/60">Loading…</p>;
  if (classes.length === 0) {
    return (
      <p className="font-body text-sm text-navy/60">
        You're not yet assigned to any class in <code>class_subjects</code> — an
        admin needs to link you to a class/subject in Supabase first.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <label className="font-body text-sm text-navy">Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="rounded-lg border border-sky/30 px-3 py-2 font-body text-sm"
        >
          {classes.map((c) => (
            <option key={c.class_id} value={c.class_id}>{c.name}</option>
          ))}
        </select>
        <span className="font-mono text-xs text-sky">{TODAY}</span>
      </div>

      {students === null && <p className="font-body text-sm text-navy/60">Loading roster…</p>}
      {students?.length === 0 && <p className="font-body text-sm text-navy/60">No students in this class yet.</p>}

      {students && students.length > 0 && (
        <>
          <ul className="divide-y divide-sky/20 rounded-2xl border border-sky/20">
            {students.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-5 py-3">
                <span className="font-body text-sm text-navy">{s.full_name}</span>
                <div className="flex gap-1">
                  {['present', 'late', 'absent'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setMarks((m) => ({ ...m, [s.id]: status }))}
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors duration-150 ${
                        marks[s.id] === status ? 'bg-navy text-white' : 'bg-chalk text-navy hover:bg-sky/20'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSave}
            disabled={saving || Object.keys(marks).length === 0}
            className="mt-4 rounded-full bg-coral px-6 py-2 font-body text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-coral/90 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save attendance'}
          </button>
          {saved && <p className="mt-2 font-body text-xs text-sky">Saved.</p>}
        </>
      )}
    </div>
  );
}
