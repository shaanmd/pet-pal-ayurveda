import { Hero } from "@/components/Hero";
import { ExpertsSection } from "@/components/ExpertsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExpertsSection />
      <footer className="border-t border-[var(--card-border)] bg-[var(--card)] px-6 py-8 text-center text-sm text-[var(--muted)] sm:px-8">
        <p>© {new Date().getFullYear()} PetPal Ayurveda. petpalayurveda.com</p>
      </footer>
    </main>
  );
}
