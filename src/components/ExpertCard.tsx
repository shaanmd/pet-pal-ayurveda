import Image from "next/image";
import type { ReactNode } from "react";

type ExpertCardProps = {
  name: string;
  title: string;
  initials: string;
  imageSrc?: string;
  children: ReactNode;
  accent?: "primary" | "accent";
};

export function ExpertCard({
  name,
  title,
  initials,
  imageSrc,
  children,
  accent = "primary",
}: ExpertCardProps) {
  const color = accent === "accent" ? "var(--accent-muted)" : "var(--primary)";

  return (
    <article
      className="flex flex-col rounded-[var(--radius-lg)] border-2 bg-[var(--card)] p-6 shadow-[var(--shadow)] transition hover:shadow-[var(--shadow-lg)] sm:p-8"
      style={{ borderColor: `${color}40` }}
    >
      {/* Avatar */}
      {imageSrc ? (
        <div
          className="mb-5 h-40 w-40 overflow-hidden rounded-full"
          style={{ outline: `2px solid ${color}40` }}
        >
          <Image
            src={imageSrc}
            alt={name}
            width={160}
            height={160}
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : (
        <div
          className="mb-5 flex h-40 w-40 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--primary-foreground)]"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--foreground)]">
        {name}
      </h3>
      <p className="mt-1 text-sm font-medium" style={{ color }}>{title}</p>

      <div className="mt-4 flex-1 text-[var(--muted)] [&>p]:mt-2 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
