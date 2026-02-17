"use client";

import { useCallback } from "react";
import { useLocale, type Locale } from "@/context/LocaleContext";
import { getString, getMessage, type Messages } from "@/lib/i18n";
import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

const messages: Record<Locale, Messages> = { pt: pt as Messages, en: en as Messages };

function interpolate(str: string, vars: Record<string, string | number>): string {
  let out = str;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value));
  }
  return out;
}

export function useTranslation() {
  const { locale, setLocale } = useLocale();

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const raw = getString(messages[locale], key);
      return vars ? interpolate(raw, vars) : raw;
    },
    [locale]
  );

  const tm = useCallback(
    (key: string): unknown => {
      return getMessage(messages[locale], key);
    },
    [locale]
  );

  return { t, tm, locale, setLocale };
}
