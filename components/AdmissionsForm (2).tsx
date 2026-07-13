'use client';

import { useState, FormEvent } from 'react';

export default function AdmissionsForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      parentName: data.get('parentName'),
      phone: data.get('phone'),
      studentName: data.get('studentName'),
      studentClass: data.get('studentClass'),
      message: data.get('message'),
    };

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-6 rounded-2xl border-2 border-sky bg-chalk p-6">
        <p className="font-display text-lg font-600 text-navy">Inquiry received</p>
        <p className="mt-2 font-body text-sm text-navy/70">
          Thank you. Our admissions office will reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Parent/Guardian name
        <input name="parentName" required type="text" className="rounded-lg border border-sky/30 px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Phone number
        <input name="phone" required type="tel" className="rounded-lg border border-sky/30 px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Student's full name
        <input name="studentName" required type="text" className="rounded-lg border border-sky/30 px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Class applying for
        <select name="studentClass" required className="rounded-lg border border-sky/30 px-3 py-2">
          <option value="">Select a class</option>
          <option>JSS1</option>
          <option>JSS2</option>
          <option>JSS3</option>
          <option>SS1</option>
          <option>SS2</option>
          <option>SS3</option>
        </select>
      </label>
      <label className="sm:col-span-2 flex flex-col gap-1 font-body text-sm text-navy">
        Message (optional)
        <textarea name="message" rows={4} className="rounded-lg border border-sky/30 px-3 py-2" />
      </label>

      {status === 'error' && (
        <p className="sm:col-span-2 font-body text-sm text-coral">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="sm:col-span-2 w-fit rounded-full bg-coral px-6 py-3 font-body font-medium text-white hover:bg-coral/90 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
