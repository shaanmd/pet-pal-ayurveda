"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { t, tx } from "@/lib/translations";

export function Hero() {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-6 pt-16 pb-24 sm:px-8 md:px-12 lg:px-16">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%232d5a4a' stroke-width='.5' fill='none'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)] sm:text-base">
          {tx(t.hero.eyebrow, lang)}
        </p>

        <h1 className="animate-fade-up animate-fade-up-delay-1 mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.15] text-[var(--foreground)] sm:text-5xl md:text-6xl">
          {tx(t.hero.heading, lang)}
        </h1>

        <p className="animate-fade-up animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base text-[var(--muted)] sm:text-xl">
          {tx(t.hero.sub, lang)}
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up animate-fade-up-delay-3 mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/quiz"
            className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 sm:w-auto"
          >
            {tx(t.hero.cta1, lang)}
          </Link>
          <a
            href="#experts"
            className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--card)] px-6 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[var(--background)] sm:w-auto"
          >
            {tx(t.hero.cta2, lang)}
          </a>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-up animate-fade-up-delay-4 mt-8 flex flex-col items-center gap-2 text-sm text-[var(--muted)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
          {([t.hero.badge1, t.hero.badge2, t.hero.badge3] as const).map((badge, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-[var(--primary)]">✓</span>
              {tx(badge, lang)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
