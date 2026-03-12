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

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const question = QUIZ_QUESTIONS[step];
  const isLastQuestion = step === QUIZ_QUESTIONS.length - 1;

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
        answers={answers}
        onBack={() => setStep(QUIZ_QUESTIONS.length - 1)}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 sm:px-8 md:px-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--primary)] hover:underline"
        >
          ← Back to home
        </Link>
        <div className="mt-8">
          <p className="text-sm font-medium text-[var(--muted)]">
            Question {step + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--card-border)]">
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
              style={{
                width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
          {question.question}
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
  );
}

function EmailCaptureStep({
  answers,
  onBack,
}: {
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
          primaryDosha,
          vataScore: scores.vata,
          pittaScore: scores.pitta,
          kaphaScore: scores.kapha,
        }),
      });
      setStatus("done");
      window.location.href = `/quiz/result?d=${primaryDosha}&email=${encodeURIComponent(email)}`;
    } catch {
      setStatus("error");
    }
  };

  return (
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
            See your pet&apos;s Dosha profile
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Enter your email to unlock your personalised result and massage tips.
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
              {status === "loading" ? "Sending…" : "Get my pet's Dosha profile"}
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
  );
}
