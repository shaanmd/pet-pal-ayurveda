"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { t, tx } from "@/lib/translations";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { lang } = useLang();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="waitlist"
      className="scroll-mt-20 bg-[var(--primary)] px-6 py-20 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em]" style={{ color: "rgba(250,248,245,0.7)" }}>
          {tx(t.waitlist.eyebrow, lang)}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--primary-foreground)] sm:text-4xl">
          {tx(t.waitlist.heading, lang)}
        </h2>
        <p className="mx-auto mt-4 max-w-lg" style={{ color: "rgba(250,248,245,0.8)" }}>
          {tx(t.waitlist.body, lang)}
        </p>

        {status === "success" ? (
          <div
            className="mt-8 rounded-[var(--radius-lg)] px-6 py-5"
            style={{ backgroundColor: "rgba(250,248,245,0.15)" }}
            role="status"
            aria-live="polite"
          >
            <p className="font-semibold text-[var(--primary-foreground)]">
              {tx(t.waitlist.success, lang)}
            </p>
            <p className="mt-1 text-sm" style={{ color: "rgba(250,248,245,0.8)" }}>
              {tx(t.waitlist.successSub, lang)}
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white/10 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm ring-1 ring-white/20 sm:p-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tx(t.waitlist.placeholder, lang)}
                className="h-14 flex-1 rounded-xl border-0 bg-white px-5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                aria-describedby={status === "error" ? "waitlist-error" : undefined}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-7 text-base font-semibold text-white shadow-lg transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "..." : tx(t.waitlist.cta, lang)}
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
          {tx(t.waitlist.noSpam, lang)}
        </p>
      </div>
    </section>
  );
}
