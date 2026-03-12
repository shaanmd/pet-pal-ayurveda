import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ExpertsSection } from "@/components/ExpertsSection";
import { BookSection } from "@/components/BookSection";
import { WaitlistSection } from "@/components/WaitlistSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ExpertsSection />
        <BookSection />
        <WaitlistSection />
      </main>
      <footer className="border-t border-[var(--card-border)] bg-[var(--card)] px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            {/* Brand */}
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                PetPal Ayurveda
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Ancient wisdom for modern pets
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]" aria-label="Footer navigation">
              <Link href="/quiz" className="transition hover:text-[var(--foreground)]">
                Free Dosha quiz
              </Link>
              <a href="#experts" className="transition hover:text-[var(--foreground)]">
                Our experts
              </a>
              <a href="#waitlist" className="transition hover:text-[var(--foreground)]">
                The book
              </a>
            </nav>
          </div>

          <div className="mt-8 border-t border-[var(--card-border)] pt-6 text-center text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} PetPal Ayurveda · petpalayurveda.com
          </div>
        </div>
      </footer>
    </>
  );
}
