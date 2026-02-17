"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

function Serpentines() {
  const colors = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-16 rounded-full opacity-30"
          style={{
            background: `linear-gradient(90deg, ${colors[i % colors.length]}, transparent)`,
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            transform: `rotate(${-30 + i * 15}deg)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.3 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`b-${i}`}
          className="absolute h-1 w-12 rounded-full bg-sky-300/40"
          style={{
            right: `${5 + (i % 4) * 20}%`,
            bottom: `${10 + (i % 3) * 30}%`,
            transform: `rotate(${20 + i * 20}deg)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8 + i * 0.06, duration: 0.3 }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50/80 px-4 pt-8 pb-14 sm:pt-12 sm:pb-20">
      <Serpentines />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          className="relative order-2 flex justify-center lg:order-1 lg:justify-end"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
            <motion.div
              className="relative w-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                <Image
                  src="/supreme.png"
                  alt="Linha Supreme: Supreme Maxx, Supreme Thermo e Supreme Gold - Suplementos vitamínicos minerais em cápsulas"
                  fill
                  priority
                  fetchPriority="high"
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                  unoptimized={false}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="order-1 text-center lg:order-2 lg:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.p
            className="mb-4 inline-block rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            {t("hero.badge")}
          </motion.p>
          <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {(() => {
              const full = t("hero.title");
              const highlight = t("hero.titleHighlight");
              const parts = full.split(highlight);
              if (parts.length === 2) {
                return (
                  <>
                    {parts[0]}
                    <span className="text-sky-600">{highlight}</span>
                    {parts[1]}
                  </>
                );
              }
              return full;
            })()}
          </h1>
          <motion.p
            className="mx-auto mb-8 max-w-xl text-lg text-default-600 lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              as={Link}
              href="#oferta"
              color="primary"
              size="lg"
              className="h-12 min-w-[220px] font-semibold"
            >
              {t("hero.ctaOffers")}
            </Button>
            <Button
              as={Link}
              href="#video"
              variant="bordered"
              size="lg"
              className="h-12 min-w-[220px] border-sky-300 text-sky-700"
            >
              {t("hero.ctaVideo")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
