"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LanguageProvider, useLang } from "@/components/LanguageProvider";
import { t, tx } from "@/lib/translations";

/** Countdown target: 11 April 2026, end of day AEST (UTC+11) */
const EARLY_BIRD_DEADLINE = new Date("2026-04-11T23:59:59+11:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function PreOrderContent() {
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const countdown = useCountdown(EARLY_BIRD_DEADLINE);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "pre-order" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const earlyBirdExpired = countdown?.expired ?? false;

  const tiers = [
    {
      label: tx(t.preOrder.tier1Label, lang),
      price: "$17.17",
      description: tx(t.preOrder.tier1Desc, lang),
      active: true,
      href: "https://square.link/u/flx4Iqp3",
    },
    {
      label: tx(t.preOrder.tier2Label, lang),
      price: "$19.99",
      description: tx(t.preOrder.tier2Desc, lang),
      active: false,
      href: null,
    },
    {
      label: tx(t.preOrder.tier3Label, lang),
      price: "$27.00",
      description: tx(t.preOrder.tier3Desc, lang),
      active: false,
      href: null,
    },
  ];

  return (
    <>
      {/* Nav bar */}
      <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--primary-foreground)]"
              style={{ backgroundColor: "var(--primary)" }}
              aria-hidden="true"
            >
              🌿
            </span>
            PetPal Ayurveda
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            {tx(t.preOrder.backHome, lang)}
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-[var(--background)]">
        {/* Hero section */}
        <section className="px-6 pt-16 pb-12 sm:px-8 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
              {tx(t.preOrder.eyebrow, lang)}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl md:text-5xl">
              {tx(t.preOrder.heading, lang)}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
              {tx(t.preOrder.sub, lang)}
            </p>

            {/* Countdown timer */}
            {countdown && !countdown.expired && (
              <div className="mx-auto mt-8 max-w-md">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {tx(t.preOrder.countdownLabel, lang)}
                </p>
                <div className="flex justify-center gap-3 sm:gap-4">
                  {[
                    { value: countdown.days, label: tx(t.preOrder.days, lang) },
                    { value: countdown.hours, label: tx(t.preOrder.hours, lang) },
                    { value: countdown.minutes, label: tx(t.preOrder.mins, lang) },
                    { value: countdown.seconds, label: tx(t.preOrder.secs, lang) },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-[var(--radius)] border-2 border-[var(--primary)] bg-[var(--card)] font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)] shadow-[var(--shadow)] sm:h-18 sm:w-18 sm:text-3xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Video section */}
        <section className="px-6 pb-16 sm:px-8 md:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-[var(--radius-lg)] border-2 border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
              {/* YouTube embed placeholder — replace YOUR_VIDEO_ID with actual ID */}
              <div className="relative aspect-video w-full bg-gray-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--muted)]">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-[var(--primary)] opacity-60"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" opacity="0.2" />
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p className="text-sm font-medium">{tx(t.preOrder.videoPlaceholder, lang)}</p>
                </div>
                {/*
                  When your YouTube video is ready, replace the placeholder div above with:
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="PetPal Ayurveda book trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                */}
              </div>
            </div>
          </div>
        </section>

        {/* Book + Pricing */}
        <section className="px-6 pb-20 sm:px-8 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
              {/* Book cover */}
              <div className="flex shrink-0 justify-center">
                <div className="relative">
                  <div className="absolute -bottom-4 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />
                  <Image
                    src="/book-cover.jpg"
                    alt="PetPal Ayurveda book cover"
                    width={280}
                    height={400}
                    className="rounded-lg shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>

              {/* Pricing tiers */}
              <div className="w-full flex-1">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
                  {tx(t.preOrder.pricingHeading, lang)}
                </h2>
                <p className="mt-2 text-[var(--muted)]">
                  {tx(t.preOrder.pricingSub, lang)}
                </p>

                <div className="mt-8 space-y-4">
                  {tiers.map((tier) => (
                    <div
                      key={tier.label}
                      className={`relative overflow-hidden rounded-[var(--radius-lg)] border-2 p-5 transition sm:p-6 ${
                        tier.active
                          ? "border-[var(--primary)] bg-[var(--card)] shadow-[var(--shadow-lg)]"
                          : "border-[var(--card-border)] bg-[var(--card)] opacity-60"
                      }`}
                    >
                      {tier.active && (
                        <span className="absolute top-0 right-0 rounded-bl-lg bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--primary-foreground)]">
                          {tx(t.preOrder.currentBadge, lang)}
                        </span>
                      )}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            {tier.label}
                          </p>
                          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--foreground)]">
                            {tier.price}
                          </p>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {tier.description}
                          </p>
                        </div>
                        {tier.active && tier.href ? (
                          <a
                            href={tier.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-8 font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90"
                          >
                            {tx(t.preOrder.buyNow, lang)}
                          </a>
                        ) : (
                          <span className="inline-flex h-12 shrink-0 items-center justify-center rounded-[var(--radius)] border-2 border-[var(--card-border)] px-8 text-sm font-medium text-[var(--muted)]">
                            {tier.active ? tx(t.preOrder.buyNow, lang) : tx(t.preOrder.comingSoon, lang)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* What you get */}
                <div className="mt-10">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {tx(t.preOrder.includesHeading, lang)}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {t.preOrder.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--muted)]">
                        <span className="mt-0.5 shrink-0 text-[var(--primary)]">✓</span>
                        {tx(item, lang)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Email signup / Notify me */}
        <section className="border-t border-[var(--card-border)] bg-[var(--card)] px-6 py-16 sm:px-8 md:px-12">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              {tx(t.preOrder.emailHeading, lang)}
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              {tx(t.preOrder.emailSub, lang)}
            </p>

            {status === "success" ? (
              <div
                className="mt-6 rounded-[var(--radius-lg)] border-2 border-[var(--primary)] bg-[var(--background)] px-6 py-5"
                role="status"
              >
                <p className="font-semibold text-[var(--foreground)]">
                  {tx(t.waitlist.success, lang)}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {tx(t.waitlist.successSub, lang)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="preorder-email" className="sr-only">Email address</label>
                <input
                  id="preorder-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tx(t.waitlist.placeholder, lang)}
                  disabled={status === "loading"}
                  className="h-12 flex-1 rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--background)] px-4 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 font-semibold text-[var(--primary-foreground)] transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "..." : tx(t.preOrder.notifyMe, lang)}
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-[var(--muted)]">
              {tx(t.waitlist.noSpam, lang)}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] bg-[var(--background)] px-6 py-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} PetPal Ayurveda ·{" "}
          <a href="https://petpalayurveda.com" className="underline transition hover:text-[var(--foreground)]">
            petpalayurveda.com
          </a>
      </footer>
    </>
  );
}

export default function PreOrderPage() {
  return (
    <LanguageProvider>
      <PreOrderContent />
    </LanguageProvider>
  );
}
