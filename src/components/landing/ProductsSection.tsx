"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUtm } from "@/hooks/useUtm";
import { useTranslation } from "@/hooks/useTranslation";
import { PRODUCTS as PRODUCTS_DATA } from "@/lib/products";

function ProductImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-contain object-center p-6"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      unoptimized={false}
      onError={() => setCurrentSrc(fallback)}
    />
  );
}

const CTA_KEYS = { maxx: "products.ctaMaxx", thermo: "products.ctaThermo", gold: "products.ctaGold" } as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function ProductsSection() {
  const { utmQueryString } = useUtm();
  const { t } = useTranslation();
  const PRODUCTS = PRODUCTS_DATA.map((p, i) => ({
    ...p,
    name: t(`product.${p.id}.name`),
    tagline: t(`product.${p.id}.tagline`),
    description: t(`product.${p.id}.description`),
    price: `R$ ${p.price.toFixed(2).replace(".", ",")}`,
    oldPrice: p.oldPrice != null ? `R$ ${p.oldPrice.toFixed(2).replace(".", ",")}` : null,
    ctaKey: CTA_KEYS[p.id],
    href: `/produto/${p.id}`,
    badgeKey: i === 0 ? "products.badgeBestSeller" : null,
    popular: i === 0,
  }));

  return (
    <section
      id="oferta"
      className="w-full bg-white px-4 py-14 sm:py-20"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <motion.div variants={cardItem} className="mb-4 text-center">
          <Chip color="primary" variant="flat" size="sm" className="mb-4">
            {t("products.chip")}
          </Chip>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {t("products.title")}
          </h2>
        </motion.div>
        <motion.p
          variants={cardItem}
          className="mx-auto mb-10 max-w-xl text-center text-default-600"
        >
          {t("products.subtitle")}
        </motion.p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={cardItem}
              className="pt-6"
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <Card
                className={`group relative h-full w-full overflow-visible rounded-2xl border-2 transition-all duration-300 hover:border-sky-400 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2),0_0_0_2px_rgba(14,165,233,0.5)] ${
                  product.popular
                    ? "border-sky-400 bg-gradient-to-b from-sky-50/80 to-white"
                    : "border-sky-100 bg-white"
                }`}
              >
                  {product.badgeKey && (
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                      <Chip
                        color="primary"
                        size="sm"
                        className="whitespace-nowrap font-semibold shadow-md"
                      >
                        {t(product.badgeKey)}
                      </Chip>
                    </div>
                  )}
                  <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-t-xl">
                    <ProductImage
                      src={product.image}
                      fallback={product.imageFallback}
                      alt={product.name}
                    />
                  </div>
                  <CardHeader className="flex flex-col items-start gap-1 pb-2 pt-6">
                    <p className={`text-xs font-medium ${product.taglineClass}`}>
                      {product.tagline}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-small text-default-600">
                      {product.description}
                    </p>
                  </CardHeader>
                  <CardBody className="gap-2 pt-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      {product.oldPrice && (
                        <span className="text-sm text-default-400 line-through">
                          {product.oldPrice}
                        </span>
                      )}
                      <p className="text-2xl font-bold text-sky-600">
                        {product.price}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-default-600">
                      {product.installments}
                    </p>
<p className="text-xs text-default-600">
                    {t("products.paymentMethods")}
                  </p>
                  </CardBody>
                  <CardFooter className="flex-col gap-2 pt-0">
                    <Button
                      as={Link}
                      href={
                        utmQueryString
                          ? product.href + (product.href.includes("?") ? "&" + utmQueryString.slice(1) : utmQueryString)
                          : product.href
                      }
                      color="primary"
                      size="lg"
                      className="w-full font-semibold"
                    >
                      {t(product.ctaKey)}
                    </Button>
                  </CardFooter>
                </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
