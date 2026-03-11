import { ExpertCard } from "./ExpertCard";

export function ExpertsSection() {
  return (
    <section
      id="experts"
      className="scroll-mt-20 bg-[var(--background)] px-6 py-20 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          Meet the experts behind PetPal Ayurveda
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          A unique blend of veterinary science, holistic practice, and ancient
          Ayurvedic wisdom for your pet&apos;s wellbeing.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ExpertCard
            name="Dr Shaan Mocke"
            title="Veterinary lead & author"
            accent="primary"
          >
            <p>
              You bring veterinary expertise and a passion for integrating
              natural, Ayurvedic methods into pet rehabilitation and massage.
              Your upcoming book will guide pet owners in Australia, New Zealand,
              and India toward safe, home-based care rooted in ancient wisdom.
            </p>
          </ExpertCard>
          <ExpertCard
            name="Dr. Shagufta Singh"
            title="The Holistic Vet"
            accent="primary"
          >
            <p>
              The Holistic Vet bridges conventional veterinary medicine with
              holistic approaches. Her perspective ensures that Ayurvedic pet
              care is both evidence-aware and deeply nurturing for animals and
              their families.
            </p>
          </ExpertCard>
          <ExpertCard
            name="Kamal"
            title="Ayurvedic Animal Naturopath — the Lore expert"
            accent="accent"
          >
            <p>
              Founder of Seva Holistic Healing, Kamal brings over 20 years of
              experience in Ayurveda, herbal medicine, naturopathy, and Reiki.
              As a certified Reiki Grandmaster, she combines ancient wisdom with
              modern approaches to support whole-being wellness.
            </p>
            <p className="mt-3">
              At Seva, healing is a way of life. Kamal designs personalised
              therapies rooted in Ayurvedic principles to address the root
              cause of health concerns—whether physical, emotional, or
              spiritual—and guides clients toward balance and lasting vitality.
            </p>
          </ExpertCard>
        </div>
      </div>
    </section>
  );
}
