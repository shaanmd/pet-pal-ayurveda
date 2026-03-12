import Link from "next/link";
import { DOSHA_RESULTS } from "@/lib/dosha-results";
import type { DoshaType } from "@/lib/quiz-data";

type Props = {
  searchParams: Promise<{ d?: string }>;
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

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const d = (params.d ?? "vata").toLowerCase() as DoshaType;
  const dosha: DoshaType =
    d === "vata" || d === "pitta" || d === "kapha" ? d : "vata";
  const content = DOSHA_RESULTS[dosha];

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 sm:px-8 md:px-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--primary)] hover:underline"
        >
          ← Back to home
        </Link>

        <article className="mt-10 rounded-[var(--radius-lg)] border-2 border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow-lg)] sm:p-10">
          {/* Header */}
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
            Your pet&apos;s Dosha profile
          </p>
          <div className="mt-2 flex items-start gap-3">
            <span className="text-4xl" aria-hidden="true">{content.emoji}</span>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
                {content.title}
              </h1>
              <p className="mt-1 text-lg text-[var(--accent)]">{content.subtitle}</p>
            </div>
          </div>
          <p className="mt-6 text-[var(--muted)]">{content.description}</p>

          {/* Traits */}
          <Section title="Typical traits" items={content.traits} />

          {/* Massage */}
          <Section title="Ayurvedic massage guide" items={content.massageTips} />

          {/* Diet */}
          <Section title="Diet & nutrition tips" items={content.dietTips} />

          {/* Herbs */}
          <Section title="Supportive herbs (vet-approved use only)" items={content.herbTips} />

          {/* Lifestyle */}
          <Section title="Lifestyle & routine" items={content.lifestyleTips} />

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

          {/* PDF download */}
          {content.pdfUrl && (
            <p className="mt-8">
              <a
                href={content.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-[var(--primary)] hover:underline"
              >
                Download your Dosha Guide PDF →
              </a>
            </p>
          )}

          <p className="mt-10 text-sm text-[var(--muted)]">
            Check your inbox — we&apos;ll share more about our upcoming book and
            natural pet care support.
          </p>
        </article>

        <div className="mt-10 text-center">
          <Link
            href="/quiz"
            className="mr-4 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            Retake the quiz
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 font-semibold text-[var(--primary-foreground)] hover:opacity-95"
          >
            Return to PetPal Ayurveda
          </Link>
        </div>
      </div>
    </main>
  );
}
