"use client";

import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { useTranslation } from "@/hooks/useTranslation";

const FAQ_KEYS = [
  { q: "faq.q1" as const, a: "faq.a1" as const },
  { q: "faq.q2" as const, a: "faq.a2" as const },
  { q: "faq.q3" as const, a: "faq.a3" as const },
];

export function FaqClient() {
  const { t } = useTranslation();
  return (
    <PageShell
      title={t("faq.title")}
      subtitle={<p className="text-default-600">{t("faq.subtitle")}</p>}
    >
      <dl className="space-y-6">
        {FAQ_KEYS.map(({ q, a }) => (
          <div key={q}>
            <dt className="font-semibold text-foreground">{t(q)}</dt>
            <dd className="mt-2 text-default-600">{t(a)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm text-default-500">
        {t("faq.contactPrompt")}{" "}
        <Link href="/contato" className="text-sky-600 underline hover:text-sky-700">
          {t("contact.title")}
        </Link>
        .
      </p>
    </PageShell>
  );
}
