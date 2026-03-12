"use client";

import { useState } from "react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          <div className="mt-8 rounded-2xl bg-white/10 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm ring-1 ring-white/20 sm:p-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row"
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
                placeholder="Enter your email address"
                className="h-13 flex-1 rounded-xl border-0 bg-white px-5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-describedby={status === "error" ? "waitlist-error" : undefined}
              />
              <button
                type="submit"
                className="inline-flex h-13 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-7 text-base font-semibold text-white shadow-lg transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] sm:w-auto"
              >
                Join the waitlist
              </button>
            </form>
            {status === "error" && (
              <p id="waitlist-error" className="mt-2 px-2 text-sm text-red-200" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        )}

        <p className="mt-4 text-xs" style={{ color: "rgba(250,248,245,0.5)" }}>
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
