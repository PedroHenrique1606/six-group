"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 text-center shadow-sm">
        <p className="mb-2 font-mono text-5xl font-bold tracking-tight text-sky-600 sm:text-6xl">
          404
        </p>
        <h1 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
          {t("notFound.title")}
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-default-600">
          {t("notFound.description")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {t("notFound.backHome")}
        </Link>
      </div>
      <p className="mt-8 text-center text-sm text-default-600">
        404 · {t("notFound.title")}
      </p>
    </div>
  );
}
