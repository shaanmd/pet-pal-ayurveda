"use client";

import { useLang } from "./LanguageProvider";
import { t, tx } from "@/lib/translations";

const icons = ["🐾", "🌿", "✨"];
const numbers = ["01", "02", "03"];

export function HowItWorks() {
  const { lang } = useLang();

  return (
    <section className="bg-[var(--card)] px-6 py-20 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
            {tx(t.howItWorks.eyebrow, lang)}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            {tx(t.howItWorks.heading, lang)}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
            {tx(t.howItWorks.sub, lang)}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-start">
              <span
                className="mb-4 font-[family-name:var(--font-display)] text-4xl font-bold leading-none sm:text-5xl"
                style={{ color: "var(--card-border)" }}
                aria-hidden="true"
              >
                {numbers[i]}
              </span>
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: "var(--background)" }}
                aria-hidden="true"
              >
                {icons[i]}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
                {tx(step.title, lang)}
              </h3>
              <p className="mt-2 text-[var(--muted)]">{tx(step.description, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
