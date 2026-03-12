"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { t, tx } from "@/lib/translations";

export function BookSection() {
  const { lang } = useLang();

  return (
    <section className="bg-[var(--background)] px-6 py-20 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">

          {/* Book cover */}
          <div className="flex w-full shrink-0 justify-center lg:w-auto">
            <div className="relative">
              <div className="absolute -bottom-4 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />
              <Image
                src="/book-cover.jpg"
                alt="PetPal Ayurveda book cover"
                width={320}
                height={460}
                className="rounded-lg shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
              {tx(t.book.eyebrow, lang)}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
              {tx(t.book.heading, lang)}
            </h2>
            <p className="mt-4 text-[var(--muted)]">{tx(t.book.body, lang)}</p>
            <ul className="mt-6 space-y-3 text-left">
              {t.book.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--muted)]">
                  <span className="mt-0.5 shrink-0 text-[var(--primary)]">✓</span>
                  {tx(point, lang)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:justify-start">
              <a
                href="#waitlist"
                className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90 sm:w-auto"
              >
                {tx(t.book.cta1, lang)}
              </a>
              <Link
                href="/quiz"
                className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--card)] px-6 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] sm:w-auto"
              >
                {tx(t.book.cta2, lang)}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
