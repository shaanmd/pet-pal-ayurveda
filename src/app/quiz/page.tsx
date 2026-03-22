"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QUIZ_QUESTIONS,
  computeDoshaScores,
  getPrimaryDosha,
  type QuizOption,
  type DoshaType,
} from "@/lib/quiz-data";

type AnswersState = Record<string, Partial<Record<DoshaType, number>>>;

type PetInfo = {
  ownerName: string;
  petName: string;
  species: string;
};

const SPECIES_OPTIONS = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "horse", label: "Horse" },
  { value: "bird", label: "Bird" },
  { value: "pocket-pet", label: "Pocket Pet" },
];

function QuizHeader() {
  return (
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
  );
}

export default function QuizPage() {
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});

  // Show intro form first
  if (!petInfo) {
    return <IntroStep onContinue={(info) => setPetInfo(info)} />;
  }

  const question = QUIZ_QUESTIONS[step];
  const isLastQuestion = step === QUIZ_QUESTIONS.length - 1;
  const totalSteps = QUIZ_QUESTIONS.length;

  const handleSelect = (option: QuizOption) => {
    const next: AnswersState = { ...answers, [question.id]: option.doshas };
    setAnswers(next);
    if (isLastQuestion) {
      setStep(QUIZ_QUESTIONS.length); // go to email step
    } else {
      setStep(step + 1);
    }
  };

  if (step >= QUIZ_QUESTIONS.length) {
    return (
      <EmailCaptureStep
        petInfo={petInfo}
        answers={answers}
        onBack={() => setStep(QUIZ_QUESTIONS.length - 1)}
      />
    );
  }

  // Personalise question text: replace "your pet" / "your pet's" with pet name
  const personalised = question.question
    .replace(/your pet's/gi, `${petInfo.petName}'s`)
    .replace(/your pet/gi, petInfo.petName);

  return (
    <>
      <QuizHeader />
      <main className="min-h-screen bg-[var(--background)] px-6 py-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="mt-8">
            <p className="text-sm font-medium text-[var(--muted)]">
              Question {step + 1} of {totalSteps}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--card-border)]">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
                style={{
                  width: `${((step + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>
          </div>
          <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
            {personalised}
          </h2>
          <ul className="mt-8 space-y-3" role="listbox" aria-label="Choose one option">
            {question.options.map((option) => (
              <li key={option.label}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--card)] px-5 py-4 text-left font-medium text-[var(--foreground)] shadow-[var(--shadow)] transition hover:border-[var(--primary)] hover:bg-[var(--background)] focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-8 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              ← Previous question
            </button>
          )}
        </div>
      </main>
    </>
  );
}

function IntroStep({ onContinue }: { onContinue: (info: PetInfo) => void }) {
  const [ownerName, setOwnerName] = useState("");
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !petName.trim() || !species) return;
    onContinue({ ownerName: ownerName.trim(), petName: petName.trim(), species });
  };

  return (
    <>
      <QuizHeader />
      <main className="min-h-screen bg-[var(--background)] px-6 py-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-[var(--radius-lg)] border-2 border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] sm:p-8">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              Discover your pet&apos;s Dosha
            </h1>
            <p className="mt-2 text-[var(--muted)]">
              Tell us a little about you and your pet so we can personalise the quiz.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="owner-name" className="block text-sm font-medium text-[var(--foreground)]">
                  Your first name
                </label>
                <input
                  id="owner-name"
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="mt-1 w-full rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                />
              </div>

              <div>
                <label htmlFor="pet-name" className="block text-sm font-medium text-[var(--foreground)]">
                  Your pet&apos;s name
                </label>
                <input
                  id="pet-name"
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g. Bella"
                  className="mt-1 w-full rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                />
              </div>

              <div>
                <label htmlFor="species" className="block text-sm font-medium text-[var(--foreground)]">
                  Species
                </label>
                <select
                  id="species"
                  required
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="mt-1 w-full rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                >
                  <option value="" disabled>Select species…</option>
                  {SPECIES_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-[var(--radius)] bg-[var(--primary)] px-4 py-3 font-semibold text-[var(--primary-foreground)] transition hover:opacity-95"
              >
                Start the Quiz
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

function EmailCaptureStep({
  petInfo,
  answers,
  onBack,
}: {
  petInfo: PetInfo;
  answers: AnswersState;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const scores = computeDoshaScores(answers);
  const primaryDosha = getPrimaryDosha(scores);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await fetch("/api/quiz-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ownerName: petInfo.ownerName,
          petName: petInfo.petName,
          species: petInfo.species,
          primaryDosha,
          vataScore: scores.vata,
          pittaScore: scores.pitta,
          kaphaScore: scores.kapha,
        }),
      });
      setStatus("done");
      const params = new URLSearchParams({
        d: primaryDosha,
        email,
        pet: petInfo.petName,
        owner: petInfo.ownerName,
        species: petInfo.species,
      });
      window.location.href = `/quiz/result?${params.toString()}`;
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <QuizHeader />
      <main className="min-h-screen bg-[var(--background)] px-6 py-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            ← Previous question
          </button>
          <div className="mt-8 rounded-[var(--radius-lg)] border-2 border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
              See {petInfo.petName}&apos;s Dosha profile
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Enter your email to unlock {petInfo.petName}&apos;s personalised result and care tips.
              We&apos;ll also add you to the waitlist for our upcoming book.
            </p>
            <form onSubmit={handleSubmit} className="mt-6">
              <label htmlFor="quiz-email" className="sr-only">
                Email address
              </label>
              <input
                id="quiz-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="w-full rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-4 w-full rounded-[var(--radius)] bg-[var(--primary)] px-4 py-3 font-semibold text-[var(--primary-foreground)] transition hover:opacity-95 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : `Get ${petInfo.petName}'s Dosha profile`}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
