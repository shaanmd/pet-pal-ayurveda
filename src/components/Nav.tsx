"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { t, tx } from "@/lib/translations";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle } = useLang();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]"
          aria-label="PetPal Ayurveda — home"
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Main navigation">
          <a href="#experts" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]">
            {tx(t.nav.authors, lang)}
          </a>
          <a href="#waitlist" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]">
            {tx(t.nav.book, lang)}
          </a>
          <Link
            href="/quiz"
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90"
          >
            {tx(t.nav.quiz, lang)}
          </Link>
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] border border-[var(--card-border)] px-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
        </nav>

        {/* Mobile right: lang toggle + hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={toggle}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] border border-[var(--card-border)] px-3 text-sm font-semibold text-[var(--foreground)]"
            aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-[var(--card-border)]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {menuOpen ? (
                <><line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" /></>
              ) : (
                <><line x1="2" y1="4" x2="14" y2="4" /><line x1="2" y1="8" x2="14" y2="8" /><line x1="2" y1="12" x2="14" y2="12" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[var(--card-border)] bg-[var(--background)] px-6 pb-4 sm:hidden">
          <nav className="flex flex-col gap-3 pt-3" aria-label="Mobile navigation">
            <a href="#experts" className="text-sm font-medium text-[var(--muted)]" onClick={() => setMenuOpen(false)}>
              {tx(t.nav.authors, lang)}
            </a>
            <a href="#waitlist" className="text-sm font-medium text-[var(--muted)]" onClick={() => setMenuOpen(false)}>
              {tx(t.nav.book, lang)}
            </a>
            <Link
              href="/quiz"
              className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)]"
              onClick={() => setMenuOpen(false)}
            >
              {tx(t.nav.quiz, lang)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
