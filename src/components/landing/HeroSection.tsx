"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

function Serpentines() {
  const colors = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="hero-line absolute h-2 w-16 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${colors[i % colors.length]}, transparent)`,
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            transform: `rotate(${-30 + i * 15}deg)`,
            animationDelay: `${0.5 + i * 0.08}s`,
          }}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <div
          key={`b-${i}`}
          className="hero-line-thin absolute h-1 w-12 rounded-full bg-sky-300/40"
          style={{
            right: `${5 + (i % 4) * 20}%`,
            bottom: `${10 + (i % 3) * 30}%`,
            transform: `rotate(${20 + i * 20}deg)`,
            animationDelay: `${0.8 + i * 0.06}s`,
          }}
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
        <div
          className="hero-fade-in relative order-2 flex justify-center opacity-0 lg:order-1 lg:justify-end"
          style={{ animationDelay: "0s" }}
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
            <div className="hero-float relative w-full">
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                <img
                  src="/supreme.png"
                  alt="Linha Supreme: Supreme Maxx, Thermo e Gold - Suplementos"
                  width={420}
                  height={315}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-fade-in-up-delay order-1 text-center lg:order-2 lg:text-left">
          <p className="hero-scale-in-delay mb-4 inline-block rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700">
            {t("hero.badge")}
          </p>
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
          <p className="mx-auto mb-8 max-w-xl text-lg text-default-600 lg:mx-0" style={{ animation: "hero-fade-in 0.6s ease-out 0.35s forwards", opacity: 0 }}>
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start" style={{ animation: "hero-fade-in 0.6s ease-out 0.5s forwards", opacity: 0 }}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
