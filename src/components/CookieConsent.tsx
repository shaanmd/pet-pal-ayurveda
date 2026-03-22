"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const CONSENT_KEY = "petpal_cookie_consent";

type Consent = "accepted" | "declined" | null;

function getStoredConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "accepted" || v === "declined") return v;
  return null;
}

export function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (!stored) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {/* Load GA4 only after consent */}
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Banner */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[var(--card-border)] bg-[var(--card)] px-4 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--muted)]">
              We use cookies to analyse site traffic and improve your experience.
              No personal data is sold or shared with third parties.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={handleDecline}
                className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] border border-[var(--card-border)] px-4 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="inline-flex h-9 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow)] transition hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
