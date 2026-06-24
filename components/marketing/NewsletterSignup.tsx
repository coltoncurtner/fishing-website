"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Mock: wire to a real ESP / API route later.
    setDone(true);
  }

  if (done) {
    return (
      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-kelp/20 px-4 py-2 text-sm font-semibold text-kelp-light">
        <Check className="h-4 w-4" /> You're in — welcome to the crew.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <p className="text-sm font-semibold text-white/90">
        Get 10% off your first order
      </p>
      <div className="mt-2 flex max-w-sm overflow-hidden rounded-full bg-white/10 p-1 ring-1 ring-white/15 focus-within:ring-kelp">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kelp text-white transition hover:bg-kelp-dark"
          aria-label="Subscribe"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
