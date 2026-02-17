"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Divider } from "@heroui/react";
import { XMarkIcon, TrashIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { ProductImageFallback } from "@/components/ui/ProductImageFallback";
import { fetchCep, getShippingValue } from "@/lib/cep";
import type { CepResponse } from "@/lib/cep";
import { useTranslation } from "@/hooks/useTranslation";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0 },
};


export function CartDrawer() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalCount,
    isCartOpen,
    closeCart,
  } = useCart();
  const [cep, setCep] = useState("");
  const [cepAddress, setCepAddress] = useState<CepResponse | null>(null);
  const [cepError, setCepError] = useState("");
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  useEffect(() => {
    if (!isCartOpen) {
      setCep("");
      setCepAddress(null);
      setCepError("");
    }
  }, [isCartOpen]);

  const shippingValue = cepAddress ? getShippingValue(subtotal, true) : 0;
  const shippingLabel = cepAddress
    ? shippingValue === 0
      ? t("checkout.freeShipping")
      : formatPrice(shippingValue)
    : t("cart.calculateShipping");
  const total = subtotal + shippingValue;

  const handleCalculateShipping = async () => {
    const digits = cep.replace(/\D/g, "");
    setCepError("");
    if (digits.length !== 8) {
      setCepError(t("checkout.cepError"));
      return;
    }
    setIsLoadingCep(true);
    const result = await fetchCep(cep);
    setIsLoadingCep(false);
    if (result) {
      setCepAddress(result);
    } else {
      setCepAddress(null);
      setCepError(t("checkout.cepNotFound"));
    }
  };

  const handleFinalize = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence mode="wait">
      {isCartOpen && (
        <>
          <motion.div
            key="cart-overlay"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            aria-hidden
            onClick={closeCart}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          />
          <motion.aside
            key="cart-panel"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-sm"
            role="dialog"
            aria-label={t("cart.title")}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-foreground">{t("cart.title")}</h2>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            aria-label={t("cart.close")}
            onPress={closeCart}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8">
              <p className="text-center text-default-600">
                {t("cart.empty")}
              </p>
              <Button as={Link} href="/#oferta" color="primary" onPress={closeCart}>
                {t("checkout.seeProducts")}
              </Button>
            </div>
          ) : (
            <>
              <motion.ul
                className="flex-1 overflow-y-auto px-4 py-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {items.map(({ slug, quantity }) => {
                  const product = getProductBySlug(slug);
                  if (!product) return null;
                  return (
                    <motion.li
                      key={slug}
                      variants={listItemVariants}
                      className="flex gap-3 border-b border-slate-100 py-3 last:border-0"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                        <ProductImageFallback
                          src={product.image}
                          fallback={product.imageFallback}
                          alt={product.name}
                          sizes="72px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm">
                          {t(`product.${slug}.name`)}
                        </p>
                        <p className="text-xs text-default-500">
                          {formatPrice(product.price)} × {quantity}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="flat"
                            className="min-w-6 h-6 p-0 text-xs"
                            onPress={() =>
                              updateQuantity(slug, Math.max(1, quantity - 1))
                            }
                          >
                            −
                          </Button>
                          <span className="w-6 text-center text-xs">
                            {quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="flat"
                            className="min-w-6 h-6 p-0 text-xs"
                            onPress={() => updateQuantity(slug, quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            className="min-w-6 h-6"
                            aria-label={t("checkout.remove")}
                            onPress={() => removeItem(slug)}
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="shrink-0 font-semibold text-sky-600 text-sm">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </motion.li>
                  );
                })}
              </motion.ul>
              <div className="border-t border-slate-200 px-4 py-4">
                <div className="flex justify-between text-sm text-default-600">
                  <span>{t("cart.subtotalWithCount", { count: totalCount })}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder={t("checkout.cep")}
                    value={cep}
                    onValueChange={(v) => {
                      setCep(v.replace(/\D/g, "").slice(0, 8));
                      setCepError("");
                      setCepAddress(null);
                    }}
                    maxLength={8}
                    size="sm"
                    classNames={{ input: "font-mono" }}
                    description="Sem hífen"
                    isInvalid={!!cepError}
                    errorMessage={cepError}
                  />
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={handleCalculateShipping}
                    isLoading={isLoadingCep}
                    className="shrink-0"
                  >
                    {t("checkout.calculate")}
                  </Button>
                </div>
                {cepAddress && (
                  <p className="mt-1 text-xs text-default-500">
                    {cepAddress.localidade} - {cepAddress.uf}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-default-600">
                    <TruckIcon className="h-4 w-4" />
                    {t("checkout.shippingCost")}
                  </span>
                  <span className="font-medium">{shippingLabel}</span>
                </div>
                <Divider className="my-3" />
                <div className="flex justify-between text-base font-semibold">
                  <span>{t("checkout.total")}</span>
                  <span className="text-sky-600">
                    {formatPrice(total)}
                  </span>
                </div>
                <motion.div
                  className="mt-4 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    color="primary"
                    className="w-full font-semibold"
                    onPress={handleFinalize}
                  >
                    {t("checkout.finishOrder")}
                  </Button>
                </motion.div>
              </div>
            </>
          )}
        </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
