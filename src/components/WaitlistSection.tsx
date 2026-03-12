"use client";

import { useState } from "react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to real endpoint (e.g. Supabase, Mailchimp, Resend)
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      id="waitlist"
      className="scroll-mt-20 bg-[var(--primary)] px-6 py-20 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p
          className="text-sm font-medium uppercase tracking-[0.2em]"
          style={{ color: "rgba(250,248,245,0.7)" }}
        >
          Coming soon
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--primary-foreground)] sm:text-4xl">
          Be first to get the book
        </h2>
        <p className="mx-auto mt-4 max-w-lg" style={{ color: "rgba(250,248,245,0.8)" }}>
          Our comprehensive guide to Ayurvedic pet rehabilitation and massage is
          coming to Australia, New Zealand, and India. Join the waitlist for
          early-bird pricing and exclusive content.
        </p>

        {status === "success" ? (
          <div
            className="mt-8 rounded-[var(--radius-lg)] px-6 py-5"
            style={{ backgroundColor: "rgba(250,248,245,0.15)" }}
            role="status"
            aria-live="polite"
          >
            <p className="font-semibold text-[var(--primary-foreground)]">
              You&apos;re on the list! 🎉
            </p>
            <p className="mt-1 text-sm" style={{ color: "rgba(250,248,245,0.8)" }}>
              We&apos;ll be in touch when the book is ready.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2"
            noValidate
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-12 flex-1 rounded-[var(--radius)] border border-transparent bg-white/15 px-4 text-[var(--primary-foreground)] placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-describedby={status === "error" ? "waitlist-error" : undefined}
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--accent)] px-6 font-semibold text-white shadow-[var(--shadow)] transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)]"
            >
              Join the waitlist
            </button>
            {status === "error" && (
              <p id="waitlist-error" className="mt-2 text-sm text-red-200" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}

        <p className="mt-4 text-xs" style={{ color: "rgba(250,248,245,0.5)" }}>
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
