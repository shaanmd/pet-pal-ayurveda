import Image from "next/image";
import Link from "next/link";

export function BookSection() {
  return (
    <section className="bg-[var(--background)] px-6 py-20 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">

          {/* Book cover */}
          <div className="flex w-full shrink-0 justify-center lg:w-auto">
            <div className="relative">
              {/* Shadow beneath book */}
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
              The book
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
              A guide unlike any other
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Written by two veterinarians and a certified Ayurvedic animal
              naturopath, this book brings together 5,000 years of Indian healing
              wisdom and modern veterinary science — in a practical, home-based
              guide for pet owners in Australia, New Zealand, and India.
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {[
                "Discover your pet's unique Dosha constitution",
                "Learn safe, vet-approved massage and rehabilitation techniques",
                "Understand diet, herbs, and lifestyle through an Ayurvedic lens",
                "Practical routines you can start at home today",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[var(--muted)]">
                  <span className="mt-0.5 shrink-0 text-[var(--primary)]">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:justify-start">
              <a
                href="#waitlist"
                className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90 sm:w-auto"
              >
                Join the waitlist
              </a>
              <Link
                href="/quiz"
                className="inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] border-2 border-[var(--card-border)] bg-[var(--card)] px-6 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] sm:w-auto"
              >
                Take the Dosha quiz
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
