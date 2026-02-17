"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUtmFromSearch, saveUtmToStorage } from "@/lib/utm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  NumberInput,
  Chip,
  Tabs,
  Tab,
  Divider,
  Tooltip,
} from "@heroui/react";
import {
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CubeIcon,
  ChevronDownIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ProductImageSlider } from "./ProductImageSlider";
import { useTranslation } from "@/hooks/useTranslation";

const TAB_KEYS = { desc: "product.tabDesc", beneficios: "product.tabBenefits", uso: "product.tabUsage" } as const;
const INFO_SECTION_KEYS = [
  { key: "composicao", titleKey: "product.composition" as const, contentKey: "product.compositionText" as const, Icon: BeakerIcon },
  { key: "garantia", titleKey: "product.guaranteeTitle" as const, contentKey: "product.guaranteeText" as const, Icon: ShieldCheckIcon },
  { key: "entrega", titleKey: "product.deliveryTitle" as const, contentKey: "product.deliveryText" as const, Icon: TruckIcon },
] as const;

export function ProdutoClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [openInfoKey, setOpenInfoKey] = useState<string | null>("composicao");
  const productName = t(`product.${product.id}.name`);
  const productTagline = t(`product.${product.id}.tagline`);
  const productDescription = t(`product.${product.id}.description`);
  const productInstallments = t(`product.${product.id}.installments`);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromUrl = getUtmFromSearch(window.location.search);
    if (Object.keys(fromUrl).length > 0) saveUtmToStorage(fromUrl);
  }, []);

  const goToCheckout = () => {
    addItem(product.id, quantity);
    router.push("/checkout");
  };

  const goToCart = () => {
    addItem(product.id, quantity);
    openCart();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10 lg:py-12">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ProductImageSlider
              images={product.gallery}
              fallback={product.imageFallback}
              alt={productName}
            />
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="mb-2 flex flex-wrap gap-1.5 sm:mb-3 sm:gap-2">
              <Chip
                size="sm"
                variant="flat"
                classNames={{
                  base: product.taglineClass,
                  content: "text-xs font-medium sm:text-sm",
                }}
              >
                {productTagline}
              </Chip>
              <Chip size="sm" variant="flat" color="success" classNames={{ content: "text-xs sm:text-sm" }}>
                {t("product.inStock")}
              </Chip>
              <Chip size="sm" variant="flat" color="primary" classNames={{ content: "text-xs sm:text-sm" }}>
                {t("product.deliveryBrazil")}
              </Chip>
            </div>
            <h1 className="mb-1.5 break-words text-2xl font-bold text-foreground sm:mb-2 sm:text-3xl lg:text-4xl">
              {productName}
            </h1>
            <p className="mb-4 text-sm text-default-600 sm:mb-6 sm:text-base">{productDescription}</p>

            <div className="mb-3 flex min-w-0 flex-wrap items-baseline gap-2 sm:mb-4 sm:gap-3">
              {product.oldPrice != null && (
                <span className="text-base text-default-400 line-through sm:text-lg">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-sky-600 sm:text-3xl">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="mb-4 flex items-center gap-2 sm:mb-6">
              <Tooltip
                content={t("product.installmentsTooltip")}
                delay={300}
                closeDelay={0}
              >
                <span className="cursor-help text-xs text-default-500 underline decoration-dotted underline-offset-2 sm:text-sm">
                  {productInstallments}
                </span>
              </Tooltip>
            </div>

            <Card className="mb-4 min-w-0 overflow-hidden border border-slate-200/80 shadow-sm sm:mb-6">
              <CardHeader className="flex gap-3 px-4 pt-4 sm:px-6 sm:pt-6">
                <div className="min-w-0 flex flex-col">
                  <p className="text-medium text-foreground">{t("product.quantity")}</p>
                  <p className="text-small text-default-500">
                    {t("product.addToCartOrBuy")}
                  </p>
                </div>
              </CardHeader>
              <CardBody className="gap-4 px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
                <NumberInput
                  label={t("product.quantity")}
                  value={quantity}
                  onValueChange={(v) =>
                    setQuantity(Math.max(1, typeof v === "number" ? v : 1))
                  }
                  min={1}
                  max={99}
                  size="sm"
                  className="w-full max-w-[120px]"
                />
                <Divider />
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full font-semibold sm:min-w-[160px] sm:w-auto"
                    onPress={goToCheckout}
                  >
                    {t("product.buyNow")}
                  </Button>
                  <Button
                    variant="bordered"
                    size="lg"
                    className="w-full border-sky-300 font-medium text-sky-700 sm:min-w-[160px] sm:w-auto"
                    startContent={<ShoppingCartIcon className="h-5 w-5 shrink-0" />}
                    onPress={goToCart}
                  >
                    {t("product.addToCart")}
                  </Button>
                </div>
              </CardBody>
            </Card>

            <div className="mb-4 flex flex-wrap gap-3 text-xs text-default-600 sm:mb-6 sm:gap-4 sm:text-sm">
              <span className="flex items-center gap-1.5">
                <TruckIcon className="h-4 w-4 text-sky-600" />
                {t("product.shippingBrazil")}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="h-4 w-4 text-sky-600" />
                {t("product.guarantee7")}
              </span>
              <span className="flex items-center gap-1.5">
                <CubeIcon className="h-4 w-4 text-sky-600" />
                {t("product.discreetPackaging")}
              </span>
            </div>

            <Tabs
              aria-label={t("product.moreInfo")}
              variant="underlined"
              classNames={{
                tabList: "w-full overflow-x-auto overflow-y-hidden gap-4 sm:gap-6",
                cursor: "bg-sky-500",
                tab: "min-w-0 px-0 text-sm sm:text-base",
                panel: "min-w-0 px-0 pt-4",
              }}
            >
              <Tab key="desc" title={t("product.tabs.desc")}>
                <p className="text-sm text-default-600 sm:text-base">{t(TAB_KEYS.desc)}</p>
              </Tab>
              <Tab key="beneficios" title={t("product.tabs.benefits")}>
                <p className="text-sm text-default-600 sm:text-base">{t(TAB_KEYS.beneficios)}</p>
              </Tab>
              <Tab key="uso" title={t("product.tabs.usage")}>
                <p className="text-sm text-default-600 sm:text-base">{t(TAB_KEYS.uso)}</p>
              </Tab>
            </Tabs>

            <div className="mt-4 space-y-2 sm:mt-6">
              <p className="mb-2 text-sm font-semibold text-foreground sm:mb-3">
                {t("product.moreInfo")}
              </p>
              {INFO_SECTION_KEYS.map((item) => {
                const isOpen = openInfoKey === item.key;
                const Icon = item.Icon;
                return (
                  <div
                    key={item.key}
                    className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-sky-200"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenInfoKey(isOpen ? null : item.key)
                      }
                      className="flex w-full min-w-0 items-center gap-3 px-3 py-3 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 sm:px-4 sm:py-3.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 sm:h-9 sm:w-9">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                        {t(item.titleKey)}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="shrink-0 text-slate-400"
                      >
                        <ChevronDownIcon className="h-5 w-5" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: "easeInOut" },
                            opacity: { duration: 0.2 },
                          }}
                          className="border-t border-slate-100"
                        >
                          <p className="px-3 py-2.5 pl-11 text-sm leading-relaxed text-default-600 sm:px-4 sm:py-3 sm:pl-[52px]">
                            {t(item.contentKey)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <Link
              href="/#oferta"
              className="mt-6 inline-flex text-sm font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline sm:mt-8"
            >
              {t("product.otherVariations")}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
