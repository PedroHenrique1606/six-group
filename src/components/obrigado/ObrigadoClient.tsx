"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  mergeUtmFromUrlAndStorage,
  saveUtmToStorage,
  getUtmFromSearch,
  type UtmParams,
} from "@/lib/utm";
import { useTranslation } from "@/hooks/useTranslation";

function UtmDisplay({ params, title }: { params: UtmParams; title: string }) {
  const entries = Object.entries(params);
  if (entries.length === 0) return null;
  return (
    <div className="mt-8 rounded-xl border border-sky-100 bg-sky-50/50 p-4 text-left">
      <p className="mb-3 text-sm font-medium text-sky-800">
        {title}
      </p>
      <dl className="space-y-1 text-sm text-default-600">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <dt className="font-medium text-default-600">{key}:</dt>
            <dd className="m-0">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ObrigadoClient() {
  const searchParams = useSearchParams();
  const [utmParams, setUtmParams] = useState<UtmParams>({});
  const { t } = useTranslation();

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const fromUrl = getUtmFromSearch(searchParams?.toString() ?? search);
    if (Object.keys(fromUrl).length > 0) {
      saveUtmToStorage(fromUrl);
    }
    const merged = mergeUtmFromUrlAndStorage(searchParams?.toString() ?? search);
    setUtmParams(merged);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4 py-16">
      <motion.div
        className="w-full max-w-lg text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.05 },
          },
        }}
      >
        <motion.div
          className="mb-6 flex justify-center"
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { type: "spring", damping: 14, stiffness: 200 },
            },
          }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-200/50">
            <CheckCircleIcon className="h-12 w-12" />
          </div>
        </motion.div>
        <motion.h1
          className="mb-3 text-2xl font-bold text-foreground sm:text-3xl"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          {t("obrigado.title")}
        </motion.h1>
        <motion.p
          className="mb-2 text-sm font-medium text-emerald-700"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          {t("obrigado.confirmed")}
        </motion.p>
        {searchParams?.get("orderId") && (
          <motion.div
            className="mb-4 rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <p className="text-sm font-medium text-sky-800">
              {t("obrigado.orderNumber")}{" "}
              <span className="font-mono font-bold">{searchParams.get("orderId")}</span>
            </p>
            <Link
              href="/meus-pedidos"
              className="mt-2 inline-block text-sm font-medium text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              {t("obrigado.trackOrder")}
            </Link>
          </motion.div>
        )}
        <motion.p
          className="mb-6 text-default-600"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
          }}
        >
          {t("obrigado.emailSoon")}
        </motion.p>
        <UtmDisplay params={utmParams} title={t("obrigado.utmBlock")} />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35 },
            },
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="mt-8"
        >
          <Button
            as={Link}
            href="/"
            color="primary"
            size="lg"
            className="w-full font-semibold sm:w-auto"
          >
            {t("obrigado.backHome")}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
