"use client";

import Link from "next/link";
import { Link as HeroUILink } from "@heroui/react";
import {
  LockClosedIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";

const CNPJ = "50.946.400/0001-62";
const COMPANY_NAME = "Grupo Six Marketing Digital Ltda";

const FOOTER_COLUMNS = [
  {
    titleKey: "footer.institutional" as const,
    links: [
      { labelKey: "footer.about" as const, href: "/quem-somos" },
      { labelKey: "footer.privacy" as const, href: "/politica-de-privacidade" },
      { labelKey: "footer.terms" as const, href: "/termos-de-uso" },
    ],
  },
  {
    titleKey: "footer.help" as const,
    links: [
      { labelKey: "footer.myOrders" as const, href: "/meus-pedidos" },
      { labelKey: "footer.faq" as const, href: "/faq" },
      { labelKey: "footer.contact" as const, href: "/contato" },
      { labelKey: "footer.refund" as const, href: "/politica-de-reembolso" },
    ],
  },
  {
    titleKey: "footer.payment" as const,
    links: [
      { labelKey: "footer.creditCard" as const, href: "#" },
      { labelKey: "footer.pix" as const, href: "#" },
      { labelKey: "footer.boleto" as const, href: "#" },
    ],
  },
];

const CONTACT_ICONS_DATA = [
  { labelKey: "footer.email" as const, href: `mailto:${CONTACT_EMAIL}`, Icon: EnvelopeIcon },
  { labelKey: "footer.whatsapp" as const, href: `https://wa.me/${WHATSAPP_NUMBER}`, Icon: WhatsAppIcon },
  { labelKey: "footer.watchVideo" as const, href: "/#video", Icon: PlayCircleIcon },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full overflow-x-hidden border-t border-sky-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <div className="min-w-0">
            <p className="mb-3 text-base font-bold text-sky-600 sm:mb-4 sm:text-lg">{t("footer.companyName")}</p>
            <p className="text-sm text-default-600">
              {t("footer.tagline")}
            </p>
            <p className="mt-2 text-xs text-default-600">
              {COMPANY_NAME}
              <br />
              CNPJ: {CNPJ}
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.titleKey} className="min-w-0">
              <h4 className="mb-3 font-semibold text-foreground sm:mb-4">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.titleKey}-${link.labelKey}`}>
                    <HeroUILink
                      href={link.href}
                      size="sm"
                      className="text-default-600 transition-colors hover:text-sky-600"
                      as={Link}
                    >
                      {t(link.labelKey)}
                    </HeroUILink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col flex-wrap gap-4 border-t border-sky-100 pt-8 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-10">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {CONTACT_ICONS_DATA.map((c, i) => (
              <a
                key={`${c.labelKey}-${i}`}
                href={c.href}
                target={c.href.startsWith("http") || c.href.startsWith("mailto") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={t(c.labelKey)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition-colors hover:bg-sky-200 hover:text-sky-700"
              >
                {c.Icon === WhatsAppIcon ? (
                  <WhatsAppIcon className="h-5 w-5 text-sky-600" />
                ) : (
                  <c.Icon className="h-5 w-5" strokeWidth={2} />
                )}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 rounded bg-white px-2.5 py-1.5 text-xs font-medium text-default-600 shadow-sm sm:px-3">
              <LockClosedIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
              {t("footer.securePurchase")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded bg-white px-2.5 py-1.5 text-xs font-medium text-default-600 shadow-sm sm:px-3">
              <ShieldCheckIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
              {t("footer.guarantee7")}
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-5">
          <p className="text-sm font-semibold text-foreground">{t("footer.disclaimerTitle")}</p>
          <p className="whitespace-pre-line text-xs leading-relaxed text-default-600">
            {t("footer.disclaimer")}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 sm:gap-x-6">
            <HeroUILink
              href="/politica-de-privacidade"
              size="sm"
              className="text-default-600 underline underline-offset-2 transition-colors hover:text-sky-600"
              as={Link}
            >
              {t("footer.privacy")}
            </HeroUILink>
            <HeroUILink
              href="/termos-de-uso"
              size="sm"
              className="text-default-600 underline underline-offset-2 transition-colors hover:text-sky-600"
              as={Link}
            >
              {t("footer.terms")}
            </HeroUILink>
          </nav>
          <p className="border-t border-slate-100 pt-4 text-center text-xs text-default-600">
            © {new Date().getFullYear()} {COMPANY_NAME}. CNPJ {CNPJ}. {t("footer.allRights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
