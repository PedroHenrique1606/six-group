"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/hooks/useTranslation";

export function GuaranteeSection() {
  const { t } = useTranslation();
  return (
    <section
      id="garantia"
      className="w-full border-y border-sky-100 bg-sky-50/50 px-5 py-12 sm:px-6 sm:py-16"
    >
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-stretch gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="sr-only">{t("guarantee.title1")}</h2>
        <div className="flex items-start gap-4 sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <ShieldCheckIcon className="h-7 w-7" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground">
              {t("guarantee.title1")}
            </h3>
            <p className="text-sm text-default-600">
              {t("guarantee.desc1")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <LockClosedIcon className="h-7 w-7" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground">
              {t("guarantee.title2")}
            </h3>
            <p className="text-sm text-default-600">
              {t("guarantee.desc2")}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
