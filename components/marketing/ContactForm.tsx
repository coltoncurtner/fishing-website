"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-kelp text-white">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="font-display text-xl font-bold text-deep">
          Message sent!
        </h2>
        <p className="text-ink/65">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" />
        <Field label="Email" type="email" />
      </div>
      <Field label="Subject" />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink/70">
          Message
        </span>
        <textarea
          required
          rows={5}
          className="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-deep placeholder:text-ink/30 focus:border-kelp focus:outline-none focus:ring-2 focus:ring-kelp/30"
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-kelp px-6 font-semibold text-white transition hover:bg-kelp-dark"
      >
        <Send className="h-4 w-4" /> Send message
      </button>
    </form>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">
        {label}
      </span>
      <input
        type={type}
        required
        className="h-11 w-full rounded-xl border border-sand bg-white px-4 text-sm text-deep focus:border-kelp focus:outline-none focus:ring-2 focus:ring-kelp/30"
      />
    </label>
  );
}
