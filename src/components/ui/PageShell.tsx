"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

type PageShellProps = {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
};

export function PageShell({
  title,
  subtitle,
  children,
  className = "min-h-screen bg-white",
  maxWidth = "max-w-3xl",
}: PageShellProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className={`mx-auto ${maxWidth} px-4 py-12 sm:py-16`}>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-sky-600 hover:text-sky-700"
        >
          <span aria-hidden>←</span> {t("common.back")}
        </button>
        <h1 className="mb-2 text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && <div className="mb-10">{subtitle}</div>}
        {children}
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-600"
        >
          {t("common.backToHome")}
        </Link>
      </div>
    </div>
  );
}
