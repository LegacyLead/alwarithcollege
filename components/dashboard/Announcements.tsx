'use client';

import { useEffect, useState, FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/supabase/types';

type Announcement = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export default function Announcements({ profile }: { profile: Profile }) {
  const [items, setItems] = useState<Announcement[] | null>(null);
  const [posting, setPosting] = useState(false);
  const isStaff = profile.role !== 'student';

  async function load() {
    const supabase = createClient();
    const { data } = await supabase
      .from('announcements')
      .select('id, title, body, created_at')
      .order('created_at', { ascending: false });
    setItems(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handlePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPosting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const supabase = createClient();

    await supabase.from('announcements').insert({
      title: String(data.get('title')),
      body: String(data.get('body')),
      class_id: profile.role === 'teacher' ? profile.class_id : null,
      posted_by: profile.id,
    });

    form.reset();
    setPosting(false);
    load();
  }

  return (
    <div>
      {isStaff && (
        <form onSubmit={handlePost} className="mb-8 flex flex-col gap-3 rounded-2xl border border-sky/20 p-6">
          <p className="font-display text-sm font-600 text-navy">Post an announcement</p>
          <input
            name="title"
            required
            placeholder="Title"
            className="rounded-lg border border-sky/30 px-3 py-2 font-body text-sm"
          />
          <textarea
            name="body"
            required
            rows={3}
            placeholder="Message"
            className="rounded-lg border border-sky/30 px-3 py-2 font-body text-sm"
          />
          <button
            type="submit"
            disabled={posting}
            className="w-fit rounded-full bg-navy px-5 py-2 font-body text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-sky disabled:opacity-60"
          >
            {posting ? 'Posting…' : 'Post'}
          </button>
        </form>
      )}

      {items === null && <p className="font-body text-sm text-navy/60">Loading…</p>}
      {items?.length === 0 && <p className="font-body text-sm text-navy/60">No announcements yet.</p>}

      <div className="space-y-4">
        {items?.map((a) => (
          <article key={a.id} className="rounded-2xl border border-sky/20 p-5">
            <p className="font-mono text-xs text-sky">
              {new Date(a.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <h3 className="mt-1 font-display text-base font-600 text-navy">{a.title}</h3>
            <p className="mt-1 font-body text-sm text-navy/70">{a.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
