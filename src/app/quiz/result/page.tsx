import Link from "next/link";
import { DOSHA_RESULTS } from "@/lib/dosha-results";
import type { DoshaType } from "@/lib/quiz-data";

type Props = {
  searchParams: Promise<{ d?: string; pet?: string; owner?: string; species?: string }>;
};

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[var(--muted)]">
            <span className="mt-0.5 shrink-0 text-[var(--primary)]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const SPECIES_LABELS: Record<string, string> = {
  dog: "dog",
  cat: "cat",
  horse: "horse",
  bird: "bird",
  "pocket-pet": "pocket pet",
};

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const d = (params.d ?? "vata").toLowerCase() as DoshaType;
  const dosha: DoshaType =
    d === "vata" || d === "pitta" || d === "kapha" ? d : "vata";
  const content = DOSHA_RESULTS[dosha];

  const petName = params.pet || "your pet";
  const ownerName = params.owner || "";
  const species = params.species || "";
  const speciesLabel = SPECIES_LABELS[species] || "pet";

  return (
    <>
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
          <div className="flex items-center gap-4">
            <Link
              href="/pre-order"
              className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90"
            >
              Pre-order the Book
            </Link>
            <Link
              href="/"
              className="hidden text-sm font-medium text-[var(--primary)] hover:underline sm:inline"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

    <main className="min-h-screen bg-[var(--background)] px-6 py-12 sm:px-8 md:px-12">
      <div className="mx-auto max-w-2xl">

        <article className="mt-10 rounded-[var(--radius-lg)] border-2 border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow-lg)] sm:p-10">
          {/* Header */}
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
            {petName}&apos;s Dosha profile
          </p>
          <div className="mt-2 flex items-start gap-3">
            <span className="text-4xl" aria-hidden="true">{content.emoji}</span>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
                {petName} is {content.title}
              </h1>
              <p className="mt-1 text-lg text-[var(--accent)]">{content.subtitle}</p>
            </div>
          </div>
          {ownerName && (
            <p className="mt-4 text-[var(--foreground)]">
              Hey {ownerName}, here&apos;s what we found about your {speciesLabel}!
            </p>
          )}
          <p className="mt-4 text-[var(--muted)]">{content.description}</p>

          {/* Traits */}
          <Section title={`${petName}'s typical traits`} items={content.traits} />

          {/* One care tip */}
          <section className="mt-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              Care tip for {petName}
            </h2>
            <p className="mt-3 flex gap-2 text-[var(--muted)]">
              <span className="mt-0.5 shrink-0 text-[var(--primary)]">✓</span>
              <span>{content.massageTips[0]}</span>
            </p>
          </section>

          {/* Imbalances */}
          <section className="mt-8 rounded-[var(--radius)] border border-[var(--card-border)] bg-[var(--background)] p-4">
            <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
              Signs of imbalance to watch for
            </h2>
            <ul className="mt-3 space-y-1">
              {content.commonImbalances.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-[var(--muted)]">
                  <span className="mt-0.5 shrink-0 text-orange-400">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-10 text-sm text-[var(--muted)]">
            Check your inbox — we&apos;ll share more about our upcoming book and
            natural pet care support.
          </p>
        </article>

        {/* Book upsell CTA */}
        <div className="mt-10 rounded-[var(--radius-lg)] border-2 border-[var(--primary)] bg-[var(--card)] p-6 text-center shadow-[var(--shadow)] sm:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
            Want the full care guide for {petName}?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[var(--muted)]">
            Our book covers personalised massage routines, diet &amp; nutrition, herbal support, lifestyle tips, and more — all tailored to your {speciesLabel}&apos;s Dosha.
          </p>
          <Link
            href="/pre-order"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-8 font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90"
          >
            Pre-order the Book
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/quiz"
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            Retake the quiz
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
