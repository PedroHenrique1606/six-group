"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type ProductImageSliderProps = {
  images: string[];
  fallback: string;
  alt: string;
};

export function ProductImageSlider({
  images,
  fallback,
  alt,
}: ProductImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const currentSrc = failed[index] ? fallback : images[index];
  const total = images.length;

  const go = (dir: number) => {
    setIndex((i) => (i + dir + total) % total);
  };

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,420px)] overflow-hidden rounded-xl bg-white shadow-lg sm:max-w-none sm:rounded-2xl">
      <div className="relative aspect-square w-full max-h-[80vmin] sm:max-h-none sm:aspect-[4/5]">
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Image
            src={currentSrc}
            alt={`${alt} - imagem ${index + 1}`}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            unoptimized={false}
            priority={index === 0}
            onError={() => setFailed((f) => ({ ...f, [index]: true }))}
          />
        </motion.div>
        </AnimatePresence>
        {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagem anterior"
            className="absolute left-1.5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 sm:left-2 sm:h-10 sm:w-10"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima imagem"
            className="absolute right-1.5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 sm:right-2 sm:h-10 sm:w-10"
          >
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1 sm:bottom-3 sm:gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver imagem ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all sm:h-2 ${
                  i === index ? "w-5 bg-sky-500 sm:w-6" : "w-1.5 bg-white/80 hover:bg-white sm:w-2"
                }`}
              />
            ))}
          </div>
        </>
        )}
      </div>
    </div>
  );
}
