'use client';

import { useState } from 'react';

export default function PortalLogin() {
  const [role, setRole] = useState<'staff' | 'student'>('student');
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="mt-8 rounded-2xl border-2 border-sky bg-chalk p-6">
        <p className="font-display text-lg font-600 text-navy">
          Welcome, {role === 'staff' ? 'Staff Member' : 'Student'}
        </p>
        <p className="mt-2 font-body text-sm text-navy/70">
          This is a placeholder dashboard. Real portal features (timetable,
          results, attendance) would live here once connected to a backend.
        </p>
        <button
          onClick={() => setLoggedIn(false)}
          className="mt-4 rounded-full border-2 border-navy px-4 py-2 font-body text-sm font-medium text-navy hover:bg-navy hover:text-white"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoggedIn(true);
      }}
      className="mt-8 flex flex-col gap-4 rounded-2xl border border-sky/20 p-6"
    >
      <div className="flex gap-2">
        {(['student', 'staff'] as const).map((r) => (
          <button
            type="button"
            key={r}
            onClick={() => setRole(r)}
            className={`flex-1 rounded-full px-4 py-2 font-body text-sm font-medium capitalize ${
              role === r ? 'bg-navy text-white' : 'bg-chalk text-navy'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        {role === 'staff' ? 'Staff ID' : 'Student ID'}
        <input required type="text" className="rounded-lg border border-sky/30 px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Password
        <input required type="password" className="rounded-lg border border-sky/30 px-3 py-2" />
      </label>

      <button
        type="submit"
        className="rounded-full bg-coral px-6 py-3 font-body font-medium text-white hover:bg-coral/90"
      >
        Log in
      </button>
    </form>
  );
}
