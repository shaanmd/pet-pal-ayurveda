import type { ReactNode } from "react";

type ExpertCardProps = {
  name: string;
  title: string;
  children: ReactNode;
  accent?: "primary" | "accent";
};

export function ExpertCard({ name, title, children, accent = "primary" }: ExpertCardProps) {
  const borderColor = accent === "accent" ? "var(--accent-muted)" : "var(--primary)";
  return (
    <article
      className="flex flex-col rounded-[var(--radius-lg)] border-2 bg-[var(--card)] p-6 shadow-[var(--shadow)] transition hover:shadow-[var(--shadow-lg)] sm:p-8"
      style={{ borderColor: `${borderColor}40` }}
    >
      <div
        className="mb-4 h-1 w-12 rounded-full"
        style={{ backgroundColor: borderColor }}
      />
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
        {name}
      </h3>
      <p className="mt-1 text-sm font-medium text-[var(--primary)]">{title}</p>
      <div className="mt-4 flex-1 text-[var(--muted)] [&>p]:mt-2 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
