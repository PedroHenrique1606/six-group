"use client";

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { PageShell } from "@/components/ui/PageShell";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";

const CONTACT_KEYS = [
  { labelKey: "contact.email" as const, descKey: "contact.emailDesc" as const, href: `mailto:${CONTACT_EMAIL}`, Icon: EnvelopeIcon },
  { labelKey: "contact.whatsapp" as const, descKey: "contact.whatsappDesc" as const, href: `https://wa.me/${WHATSAPP_NUMBER}`, Icon: WhatsAppIcon },
  { labelKey: "contact.phone" as const, descKey: "contact.phoneDesc" as const, href: `tel:+${WHATSAPP_NUMBER}`, Icon: PhoneIcon },
];

export function ContatoClient() {
  const { t } = useTranslation();
  return (
    <PageShell
      title={t("contact.title")}
      subtitle={<p className="text-default-600">{t("contact.subtitle")}</p>}
      className="min-h-screen bg-sky-50/30"
      maxWidth="max-w-4xl"
    >
      <div className="rounded-2xl border border-sky-100 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {CONTACT_KEYS.map(({ labelKey, descKey, href, Icon }) => (
            <a
              key={labelKey}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 rounded-xl border border-sky-100 bg-sky-50/50 p-4 transition-colors hover:border-sky-200 hover:bg-sky-50 sm:flex-col sm:gap-3 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 sm:h-12 sm:w-12">
                {Icon === WhatsAppIcon ? (
                  <WhatsAppIcon className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" strokeWidth={2} />
                )}
              </span>
              <div className="min-w-0 flex-1 sm:text-center">
                <p className="font-semibold text-foreground">{t(labelKey)}</p>
                <p className="text-sm text-default-600">{t(descKey)}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 border-t border-sky-100 pt-6 text-sm text-default-500">
          {t("contact.orderHelp")}
        </p>
      </div>
    </PageShell>
  );
}
