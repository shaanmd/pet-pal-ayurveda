"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-6 pt-16 pb-24 sm:px-8 md:px-12 lg:px-16">
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%232d5a4a' stroke-width='.5' fill='none'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)] sm:text-base">
          Ancient wisdom for modern pets
        </p>
        <h1 className="animate-fade-up animate-fade-up-delay-1 mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.15] text-[var(--foreground)] sm:text-5xl md:text-6xl">
          Unlock Your Pet&apos;s Ancient Path to Healing from India
        </h1>
        <p className="animate-fade-up animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
          Discover your pet&apos;s Dosha with our free quiz and receive personalised
          Ayurvedic massage and care tips. Join the waitlist for our upcoming book.
        </p>
        <div className="animate-fade-up animate-fade-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/quiz"
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          >
            Take the Pet Dosha Quiz
          </Link>
          <a
            href="#experts"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--card)] px-6 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[var(--background)]"
          >
            Meet our experts
          </a>
        </div>
      </div>
    </section>
  );
}
