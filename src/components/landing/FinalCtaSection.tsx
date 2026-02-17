"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export function FinalCtaSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full overflow-x-hidden px-4 py-16 sm:py-24">
      <motion.div
        className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 text-center shadow-lg sm:rounded-3xl sm:p-10 lg:p-12"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-xl font-bold text-foreground sm:mb-3 sm:text-2xl md:text-3xl">
          {t("finalCta.title")}
        </h2>
        <p className="mb-6 text-sm text-default-600 sm:mb-8 sm:text-base">
          {t("finalCta.subtitle")}
        </p>
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            as={Link}
            href="#oferta"
            color="primary"
            size="lg"
            className="w-full max-w-[280px] font-semibold transition-colors sm:w-auto sm:min-w-[260px]"
          >
            {t("finalCta.button")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
