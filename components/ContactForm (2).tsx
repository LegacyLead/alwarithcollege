'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
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
      form.reset();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border-2 border-sky bg-chalk p-8">
        <p className="font-display text-lg font-600 text-navy">Message sent</p>
        <p className="mt-2 font-body text-sm text-navy/70">
          Thanks for reaching out — we'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-sky/20 p-8">
      <h2 className="font-display text-lg font-600 text-navy">Send a message</h2>
      <div className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col gap-1 font-body text-sm text-navy">
          Your name
          <input name="name" required type="text" className="rounded-lg border border-sky/30 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1 font-body text-sm text-navy">
          Email
          <input name="email" required type="email" className="rounded-lg border border-sky/30 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1 font-body text-sm text-navy">
          Message
          <textarea name="message" required rows={4} className="rounded-lg border border-sky/30 px-3 py-2" />
        </label>

        {status === 'error' && <p className="font-body text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-fit rounded-full bg-navy px-6 py-3 font-body font-medium text-white hover:bg-sky disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
