"use client";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "@/hooks/useTranslation";

const BENEFIT_KEYS = [
  { id: "1", Icon: CheckCircleIcon, titleKey: "benefits.item1Title", descKey: "benefits.item1Desc" },
  { id: "2", Icon: ChartBarSquareIcon, titleKey: "benefits.item2Title", descKey: "benefits.item2Desc" },
  { id: "3", Icon: ChatBubbleLeftRightIcon, titleKey: "benefits.item3Title", descKey: "benefits.item3Desc" },
  { id: "4", Icon: LockClosedIcon, titleKey: "benefits.item4Title", descKey: "benefits.item4Desc" },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BenefitsSection() {
  const { t } = useTranslation();
  return (
    <section
      id="beneficios"
      className="w-full bg-gradient-to-b from-white to-sky-50/50 px-4 py-14 sm:py-20"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        <motion.h2
          variants={item}
          className="mb-4 text-center text-2xl font-bold text-foreground sm:text-3xl"
        >
          {t("benefits.title")}
        </motion.h2>
        <motion.p
          variants={item}
          className="mx-auto mb-12 max-w-xl text-center text-default-600"
        >
          {t("benefits.subtitle")}
        </motion.p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFIT_KEYS.map((b) => (
            <motion.div
              key={b.id}
              variants={item}
              className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <b.Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{t(b.titleKey)}</h3>
              <p className="text-sm text-default-600">{t(b.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
