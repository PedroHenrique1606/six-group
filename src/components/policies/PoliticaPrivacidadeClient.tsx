"use client";

import { PageShell } from "@/components/ui/PageShell";
import { useTranslation } from "@/hooks/useTranslation";

const SECTION_KEYS = [
  { titleKey: "policies.privacy.s1Title", textKey: "policies.privacy.s1Text" },
  { titleKey: "policies.privacy.s2Title", textKey: "policies.privacy.s2Text" },
  { titleKey: "policies.privacy.s3Title", textKey: "policies.privacy.s3Text" },
  { titleKey: "policies.privacy.s4Title", textKey: "policies.privacy.s4Text" },
  { titleKey: "policies.privacy.s5Title", textKey: "policies.privacy.s5Text" },
  { titleKey: "policies.privacy.s6Title", textKey: "policies.privacy.s6Text" },
  { titleKey: "policies.privacy.s7Title", textKey: "policies.privacy.s7Text" },
  { titleKey: "policies.privacy.s8Title", textKey: "policies.privacy.s8Text" },
];

export function PoliticaPrivacidadeClient() {
  const { t, locale } = useTranslation();
  const dateStr = new Date().toLocaleDateString(locale === "en" ? "en-US" : "pt-BR");
  return (
    <PageShell
      title={t("policies.privacy.title")}
      subtitle={
        <p className="text-sm text-default-500">
          {t("policies.privacy.lastUpdate")} {dateStr}
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
