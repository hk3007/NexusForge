'use client';

import { useState } from 'react';

export default function RegisterForm({ eventId }: { eventId: string }) {
  const [form, setForm] = useState({ name: '', email: '', teamName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, eventId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Register your spot</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-line bg-shade/20 px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-line bg-shade/20 px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        />
        <input
          placeholder="Team name (optional)"
          value={form.teamName}
          onChange={(e) => setForm({ ...form, teamName: e.target.value })}
          className="rounded-lg border border-line bg-shade/20 px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {loading ? 'Redirecting…' : 'Pay & Register'}
      </button>
    </form>
  );
}