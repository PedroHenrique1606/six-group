"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  TrashIcon,
  CreditCardIcon,
  BanknotesIcon,
  QrCodeIcon,
  DocumentTextIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon as CheckSolid } from "@heroicons/react/24/solid";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { ProductImageFallback } from "@/components/ui/ProductImageFallback";
import { loadUtmFromStorage } from "@/lib/utm";
import { formatCardNumber, formatValidity } from "@/lib/checkout-format";
import { fetchCep, getShippingValue } from "@/lib/cep";
import type { CepResponse } from "@/lib/cep";
import { createOrderId, saveOrder } from "@/lib/orders";
import { useTranslation } from "@/hooks/useTranslation";

type PaymentMethod = "credit" | "debit" | "pix" | "boleto";

const PAYMENT_OPTION_KEYS: { id: PaymentMethod; labelKey: string; descKey: string; Icon: typeof CreditCardIcon }[] = [
  { id: "credit", labelKey: "checkout.credit", descKey: "checkout.creditDesc", Icon: CreditCardIcon },
  { id: "debit", labelKey: "checkout.debit", descKey: "checkout.debitDesc", Icon: BanknotesIcon },
  { id: "pix", labelKey: "checkout.pix", descKey: "checkout.pixDesc", Icon: QrCodeIcon },
  { id: "boleto", labelKey: "checkout.boleto", descKey: "checkout.boletoDesc", Icon: DocumentTextIcon },
];

export function CheckoutClient() {
  const router = useRouter();
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, subtotal, totalCount, clearCart } =
    useCart();
  const installmentsOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: i === 0 ? t("checkout.cashPayment") : `${i + 1}x`,
  }));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [installments, setInstallments] = useState("1");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardValidity, setCardValidity] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [cep, setCep] = useState("");
  const [cepAddress, setCepAddress] = useState<CepResponse | null>(null);
  const [cepError, setCepError] = useState("");
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleCardNumberChange = useCallback((v: string) => {
    setCardNumber(formatCardNumber(v));
  }, []);

  const handleValidityChange = useCallback((v: string) => {
    setCardValidity(formatValidity(v));
  }, []);

  const handleCalculateShipping = useCallback(async () => {
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
  }, [cep, t]);

  const shipping = cepAddress ? getShippingValue(subtotal, true) : 0;
  const total = subtotal + shipping;

  const handleSubmit = useCallback(() => {
    setSubmitStatus("submitting");
    const orderId = createOrderId();
    saveOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "confirmado",
      items: [...items],
      subtotal,
      shipping: cepAddress ? getShippingValue(subtotal, true) : 0,
      total: subtotal + (cepAddress ? getShippingValue(subtotal, true) : 0),
      address: cepAddress ?? null,
    });
    clearCart();
    const utmParams = loadUtmFromStorage();
    const query = new URLSearchParams(utmParams);
    query.set("orderId", orderId);
    const redirectUrl = `/obrigado?${query.toString()}`;
    setTimeout(() => setSubmitStatus("success"), 600);
    setTimeout(() => router.push(redirectUrl), 2200);
  }, [clearCart, router, items, subtotal, cepAddress]);

  const isCard = paymentMethod === "credit" || paymentMethod === "debit";

  if (items.length === 0 && submitStatus === "idle") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-4">
        <p className="text-center text-default-600">{t("checkout.emptyCart")}</p>
        <Button as={Link} href="/#oferta" color="primary" size="lg">
          {t("checkout.seeProducts")}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            key="success-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mx-4 max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
            >
              <motion.div
                className="mb-4 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: 0.1,
                }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckSolid className="h-9 w-9" />
                </span>
              </motion.div>
              <motion.h2
                className="text-xl font-bold text-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {t("checkout.orderConfirmed")}
              </motion.h2>
              <motion.p
                className="mt-2 text-sm text-default-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.25 }}
              >
                {t("checkout.redirecting")}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 sm:px-6">
        <h1 className="mb-6 truncate text-xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-2xl md:text-3xl">
          {t("checkout.title")}
        </h1>

        <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-0">
          <section className="min-w-0 space-y-4 sm:space-y-6 lg:border-r lg:border-slate-200 lg:pr-8">
            <Card className="min-w-0 border border-slate-200/80 shadow-sm overflow-hidden">
              <CardBody className="min-w-0 gap-4 p-4 sm:gap-5 sm:p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {t("checkout.orderSummary")}
                </h2>
                <ul className="space-y-4">
                  {items.map(({ slug, quantity }) => {
                    const product = getProductBySlug(slug);
                    if (!product) return null;
                    return (
                      <li
                        key={slug}
                        className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20">
                            <ProductImageFallback
                              src={product.image}
                              fallback={product.imageFallback}
                              alt={t(`product.${slug}.name`)}
                              sizes="80px"
                            />
                          </div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="truncate font-medium text-foreground sm:whitespace-normal">
                              {t(`product.${slug}.name`)}
                            </p>
                            <p className="truncate text-xs text-default-500 sm:text-sm">
                              {formatPrice(product.price)} × {quantity}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-semibold text-sky-600 sm:text-base">
                            {formatPrice(product.price * quantity)}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-1 border-t border-slate-100 pt-3 sm:justify-start sm:border-0 sm:pt-0">
                          <Button
                            size="sm"
                            variant="flat"
                            className="min-w-8"
                            onPress={() =>
                              updateQuantity(slug, Math.max(1, quantity - 1))
                            }
                          >
                            −
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="flat"
                            className="min-w-8"
                            onPress={() => updateQuantity(slug, quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            aria-label={t("checkout.remove")}
                            onPress={() => removeItem(slug)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Divider />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">{t("checkout.shipping")}</p>
                  <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
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
                      isInvalid={!!cepError}
                      errorMessage={cepError}
                      className="w-full sm:w-auto sm:min-w-[140px]"
                    />
                    <Button
                      size="sm"
                      variant="bordered"
                      onPress={handleCalculateShipping}
                      isLoading={isLoadingCep}
                      className="w-full shrink-0 sm:w-auto"
                    >
                      {t("checkout.calculate")}
                    </Button>
                  </div>
                  {cepAddress && (
                    <div className="flex min-w-0 items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                      <TruckIcon className="h-4 w-4 shrink-0 text-sky-600" />
                      <div className="min-w-0 flex-1 overflow-hidden text-xs text-default-600">
                        <p className="truncate font-medium text-foreground">
                          {cepAddress.logradouro}
                          {cepAddress.bairro ? `, ${cepAddress.bairro}` : ""}
                        </p>
                        <p className="truncate">
                          {cepAddress.localidade} - {cepAddress.uf}
                        </p>
                        <p className="mt-1 font-medium text-sky-600">
                          {t("checkout.shippingCost")}:{" "}
                          {shipping === 0 ? t("checkout.freeShipping") : formatPrice(shipping)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Divider />
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-default-600">
                    {t("checkout.subtotal")} ({totalCount} {totalCount === 1 ? t("checkout.item") : t("checkout.items")})
                  </span>
                  <span className="shrink-0 font-semibold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {cepAddress && (
                  <div className="flex min-w-0 items-center justify-between gap-2 text-sm text-default-600">
                    <span className="min-w-0 truncate">{t("checkout.shippingCost")}</span>
                    <span className="shrink-0">
                      {shipping === 0 ? t("checkout.freeShipping") : formatPrice(shipping)}
                    </span>
                  </div>
                )}
                <div className="flex min-w-0 items-center justify-between gap-2 text-lg">
                  <span className="min-w-0 truncate font-semibold text-foreground">{t("checkout.total")}</span>
                  <span className="shrink-0 font-bold text-sky-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </CardBody>
            </Card>
            <Button
              as={Link}
              href="/#oferta"
              variant="bordered"
              className="w-full border-slate-300"
            >
              {t("checkout.continueShopping")}
            </Button>
          </section>

          <section className="min-w-0 lg:pl-8">
            <Card className="min-w-0 overflow-hidden border border-slate-200/80 shadow-sm lg:sticky lg:top-24">
              <CardBody className="min-w-0 gap-4 p-4 sm:gap-6 sm:p-6">
                <h2 className="text-base font-semibold text-foreground sm:text-lg">
                  {t("checkout.payment")}
                </h2>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                  {PAYMENT_OPTION_KEYS.map(({ id, labelKey, descKey, Icon }) => {
                    const selected = paymentMethod === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`relative flex min-w-0 flex-col items-center gap-1.5 overflow-hidden rounded-xl border-2 p-3 transition-all duration-200 ease-out sm:gap-2 sm:p-4 ${
                          selected
                            ? "border-sky-500 bg-sky-50 text-sky-700"
                            : "border-slate-200 bg-white text-default-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {selected && (
                          <span className="absolute right-2 top-2 shrink-0 rounded-full bg-sky-500 p-0.5 text-white">
                            <CheckSolid className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                            selected ? "bg-sky-500 text-white" : "bg-slate-100"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="min-w-0 truncate font-medium">{t(labelKey)}</span>
                        <span className="line-clamp-2 min-w-0 text-center text-xs opacity-80">{t(descKey)}</span>
                      </button>
                    );
                  })}
                </div>

                {isCard && (
                  <div className="min-w-0 space-y-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    {paymentMethod === "credit" && (
                      <Select
                        label={t("checkout.installments")}
                        selectedKeys={[installments]}
                        onSelectionChange={(keys) => {
                          const v = Array.from(keys)[0];
                          if (v) setInstallments(String(v));
                        }}
                        size="sm"
                        classNames={{ trigger: "bg-white" }}
                      >
                        {installmentsOptions.map(({ value, label }) => (
                          <SelectItem key={value}>{label}</SelectItem>
                        ))}
                      </Select>
                    )}
                    <Input
                      label={t("checkout.cardNumber")}
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onValueChange={handleCardNumberChange}
                      maxLength={19}
                      size="sm"
                      classNames={{ input: "font-mono tracking-wider" }}
                    />
                    <Input
                      label={t("checkout.cardName")}
                      placeholder={t("checkout.cardNamePlaceholder")}
                      value={cardName}
                      onValueChange={setCardName}
                      size="sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label={t("checkout.validity")}
                        placeholder="MM/AA"
                        value={cardValidity}
                        onValueChange={handleValidityChange}
                        maxLength={5}
                        size="sm"
                        classNames={{ input: "font-mono" }}
                      />
                      <Input
                        label={t("checkout.cvv")}
                        placeholder="123"
                        value={cardCvv}
                        onValueChange={setCardCvv}
                        maxLength={4}
                        type="password"
                        size="sm"
                        description={t("checkout.cvvHint")}
                        classNames={{ input: "font-mono" }}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <QrCodeIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1 overflow-hidden text-sm text-emerald-800">
                      <p className="font-medium">{t("checkout.payInstant")}</p>
                      <p className="mt-1 break-words opacity-90">
                        {t("checkout.payInstantDesc")}
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                      <DocumentTextIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1 overflow-hidden text-sm text-amber-900">
                      <p className="font-medium">{t("checkout.boleto")}</p>
                      <p className="mt-1 break-words opacity-90">
                        {t("checkout.boletoDesc2")}
                      </p>
                    </div>
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full"
                >
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full min-w-0 font-semibold"
                    onPress={handleSubmit}
                    isLoading={submitStatus === "submitting"}
                    isDisabled={submitStatus === "submitting"}
                  >
                    <span className="truncate">{t("checkout.finishOrder")} · {formatPrice(total)}</span>
                  </Button>
                </motion.div>
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
