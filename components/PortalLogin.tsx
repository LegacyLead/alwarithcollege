'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { idToPortalEmail } from '@/lib/supabase/helpers';
import { Ripple } from '@/components/motion';

export default function PortalLogin() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const idValue = String(data.get('portalId') || '');
    const password = String(data.get('password') || '');

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: idToPortalEmail(idValue),
      password,
    });

    if (signInError) {
      setError('That ID or password is incorrect. Please try again.');
      setStatus('error');
      return;
    }

    router.push('/portal/dashboard');
    router.refresh();
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4 rounded-2xl border border-sky/20 p-6"
    >
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Student or Staff ID
        <input
          name="portalId"
          required
          type="text"
          placeholder="e.g. AWC-STU-0001"
          className="rounded-lg border border-sky/30 px-3 py-2 transition-shadow duration-200 focus:shadow-md"
        />
      </label>
      <label className="flex flex-col gap-1 font-body text-sm text-navy">
        Password
        <input
          name="password"
          required
          type="password"
          className="rounded-lg border border-sky/30 px-3 py-2 transition-shadow duration-200 focus:shadow-md"
        />
      </label>

      {status === 'error' && <p className="font-body text-sm text-coral">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="relative overflow-hidden rounded-full bg-coral px-6 py-3 font-body font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-coral/90 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === 'loading' ? 'Signing in…' : 'Log in'}
        <Ripple />
      </button>
    </motion.form>
  );
}
