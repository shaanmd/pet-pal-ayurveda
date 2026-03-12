const steps = [
  {
    number: "01",
    icon: "🐾",
    title: "Discover your pet's Dosha",
    description:
      "Answer a short quiz about your pet's body type, temperament, and habits. We'll identify whether they are Vata, Pitta, or Kapha — the three Ayurvedic constitutions.",
  },
  {
    number: "02",
    icon: "🌿",
    title: "Get personalised care tips",
    description:
      "Receive tailored Ayurvedic massage techniques, dietary guidance, and herbal recommendations matched to your pet's unique constitution.",
  },
  {
    number: "03",
    icon: "✨",
    title: "Support whole-being wellness",
    description:
      "Apply gentle, home-based practices rooted in 5,000 years of Ayurvedic wisdom. Track improvements and join our community of holistic pet owners.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--card)] px-6 py-20 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
            How it works
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Ancient wisdom, three simple steps
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
            Start with the free quiz and get
            results in under five minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start">
              {/* Step number accent */}
              <span
                className="mb-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-none"
                style={{ color: "var(--card-border)" }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: "var(--background)" }}
                aria-hidden="true"
              >
                {step.icon}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-2 text-[var(--muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
