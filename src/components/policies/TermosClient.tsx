"use client";

import { PageShell } from "@/components/ui/PageShell";
import { useTranslation } from "@/hooks/useTranslation";

const SECTION_KEYS = [
  { titleKey: "policies.terms.s1Title", textKey: "policies.terms.s1Text" },
  { titleKey: "policies.terms.s2Title", textKey: "policies.terms.s2Text" },
  { titleKey: "policies.terms.s3Title", textKey: "policies.terms.s3Text" },
  { titleKey: "policies.terms.s4Title", textKey: "policies.terms.s4Text" },
  { titleKey: "policies.terms.s5Title", textKey: "policies.terms.s5Text" },
  { titleKey: "policies.terms.s6Title", textKey: "policies.terms.s6Text" },
  { titleKey: "policies.terms.s7Title", textKey: "policies.terms.s7Text" },
  { titleKey: "policies.terms.s8Title", textKey: "policies.terms.s8Text" },
];

export function TermosClient() {
  const { t, locale } = useTranslation();
  const dateStr = new Date().toLocaleDateString(locale === "en" ? "en-US" : "pt-BR");
  return (
    <PageShell
      title={t("policies.terms.title")}
      subtitle={
        <p className="text-sm text-default-500">
          {t("policies.terms.lastUpdate")} {dateStr}
        </p>
      }
    >
      <div className="max-w-none space-y-6 text-default-600">
        {SECTION_KEYS.map(({ titleKey, textKey }) => (
          <section key={titleKey}>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              {t(titleKey)}
            </h2>
            <p>{t(textKey)}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
