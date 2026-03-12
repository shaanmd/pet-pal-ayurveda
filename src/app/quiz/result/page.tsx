import Link from "next/link";
import { DOSHA_RESULTS } from "@/lib/dosha-results";
import type { DoshaType } from "@/lib/quiz-data";

type Props = {
  searchParams: Promise<{ d?: string }>;
};

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
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--primary)]">
            Your pet&apos;s Dosha profile
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-2 text-lg text-[var(--accent)]">{content.subtitle}</p>
          <p className="mt-6 text-[var(--muted)]">{content.description}</p>
          <section className="mt-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
              Ayurvedic massage tips for your pet
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--muted)]">
              {content.massageTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
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
            Check your inbox for your welcome email and waitlist updates. We&apos;ll
            share more on our upcoming book and natural pet support.
          </p>
        </article>
        <div className="mt-10 text-center">
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
