"use client";

import { ExpertCard } from "./ExpertCard";
import { useLang } from "./LanguageProvider";
import { t, tx } from "@/lib/translations";

export function ExpertsSection() {
  const { lang } = useLang();

  return (
    <section
      id="experts"
      className="scroll-mt-20 bg-[var(--background)] px-6 py-20 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
            {tx(t.experts.eyebrow, lang)}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            {tx(t.experts.heading, lang)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
            {tx(t.experts.sub, lang)}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ExpertCard name="Dr Shaan Mocke" title="Author & Veterinarian." initials="SM" imageSrc="/dr-shaan-mocke.jpg" accent="primary">
            <p>{tx(t.experts.shaan, lang)}</p>
          </ExpertCard>

          <ExpertCard name="Kamal Kaur" title="Ayurvedic Animal Naturopath" initials="KK" imageSrc="/kamal-kaur.jpg" accent="accent">
            <p>{tx(t.experts.kamal, lang)}</p>
          </ExpertCard>

          <ExpertCard name="Dr. Shagufta Singh" title="Author & Veterinarian." initials="SS" imageSrc="/dr-shagufta-singh.jpg" accent="primary">
            <p>{tx(t.experts.shagufta, lang)}</p>
          </ExpertCard>
        </div>
      </div>
    </section>
  );
}
