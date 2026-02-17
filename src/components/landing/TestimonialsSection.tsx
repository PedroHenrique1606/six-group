"use client";

import { useRef, useState, useEffect } from "react";
import { Card, CardBody, Avatar, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/hooks/useTranslation";

const TESTIMONIAL_IDS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;
const SEEDS = ["Maria", "Joao", "Ana", "Ricardo", "Fernanda", "Carlos", "Patricia", "Lucas"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScroll - 8);
    if (clientWidth > 0) {
      const pages = Math.ceil(scrollWidth / clientWidth) || 1;
      const page = Math.min(pages - 1, Math.max(0, Math.round(scrollLeft / clientWidth)));
      setTotalPages(pages);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    el.addEventListener("scroll", updateScrollState);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth;
    el.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  };

  const goToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: page * el.clientWidth,
      behavior: "smooth",
    });
  };

  const { t, tm } = useTranslation();
  const testimonials = TESTIMONIAL_IDS.map((id, idx) => {
    const item = tm(`testimonials.item${id}`) as { name: string; role: string; text: string } | undefined;
    return {
      id,
      name: item?.name ?? "",
      role: item?.role ?? "",
      text: item?.text ?? "",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${SEEDS[idx]}`,
      rating: 5,
    };
  });

  return (
    <section
      id="depoimentos"
      className="w-full bg-gradient-to-b from-sky-50/50 to-white px-4 py-14 sm:py-20"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <motion.h2
          variants={item}
          className="mb-4 text-center text-2xl font-bold text-foreground sm:text-3xl"
        >
          {t("testimonials.title")}
        </motion.h2>
        <motion.p
          variants={item}
          className="mx-auto mb-10 max-w-xl text-center text-default-600"
        >
          {t("testimonials.subtitle")}
        </motion.p>

        <motion.div variants={item} className="relative">
          <div className="scrollbar-hide flex gap-4 overflow-x-auto overflow-y-hidden py-2 pb-4 pl-1 pr-1 sm:pl-2 sm:pr-2"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
            ref={scrollRef}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[85vw] max-w-[320px] shrink-0 sm:w-[320px] lg:w-[340px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <Card className="h-full border border-sky-100 bg-white shadow-sm">
                  <CardBody className="gap-4">
                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5" aria-hidden />
                      ))}
                    </div>
                    <p className="text-default-700">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="mt-auto flex items-center gap-3">
                      <Avatar
                        name={testimonial.name}
                        src={testimonial.image}
                        size="sm"
                        className="shrink-0 bg-sky-100 text-sky-600"
                        showFallback
                      />
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-default-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              aria-label={t("testimonials.prev")}
              onPress={() => scroll("left")}
              isDisabled={!canScrollLeft}
              className="shrink-0"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <div className="flex gap-1.5" role="tablist" aria-label={t("testimonials.title")}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === currentPage}
                  aria-label={t("testimonials.page", { n: i + 1 })}
                  onClick={() => goToPage(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentPage
                      ? "w-6 bg-sky-500"
                      : "w-2 bg-sky-200 hover:bg-sky-300"
                  }`}
                />
              ))}
            </div>
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              aria-label={canScrollRight ? t("testimonials.next") : t("common.backToHome")}
              onPress={() => (canScrollRight ? scroll("right") : goToPage(0))}
              className="shrink-0"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
