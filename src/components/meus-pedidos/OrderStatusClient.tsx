"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Card, CardBody, Input } from "@heroui/react";
import {
  MagnifyingGlassIcon,
  TruckIcon,
  CubeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import {
  getOrders,
  getOrderById,
  type Order,
  type OrderStatus,
} from "@/lib/orders";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { ProductImageFallback } from "@/components/ui/ProductImageFallback";
import { PageShell } from "@/components/ui/PageShell";
import { useTranslation } from "@/hooks/useTranslation";

const STATUS_KEYS: Record<OrderStatus, string> = {
  confirmado: "meusPedidos.statusConfirmado",
  em_separacao: "meusPedidos.statusEmSeparacao",
  enviado: "meusPedidos.statusEnviado",
  entregue: "meusPedidos.statusEntregue",
};

const STATUS_STEPS: OrderStatus[] = [
  "confirmado",
  "em_separacao",
  "enviado",
  "entregue",
];

function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function OrderTimeline({ order, t, getStatusLabel }: { order: Order; t: (k: string) => string; getStatusLabel: (s: OrderStatus) => string }) {
  const currentIndex = STATUS_STEPS.indexOf(order.status);
  return (
    <div className="space-y-4">
      {STATUS_STEPS.map((step, index) => {
        const isDone = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <div
            key={step}
            className="flex items-start gap-3 sm:gap-4"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                isDone
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-slate-200 bg-slate-50 text-default-400"
              }`}
            >
              {isDone ? (
                <CheckCircleSolid className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p
                className={`font-medium ${
                  isCurrent ? "text-sky-700" : "text-foreground"
                }`}
              >
                {getStatusLabel(step)}
              </p>
              {isCurrent && (
                <p className="mt-0.5 text-xs text-default-500">
                  {t("meusPedidos.currentStatus")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderDetail({ order, onBack, t, getStatusLabel }: { order: Order; onBack: () => void; t: (k: string) => string; getStatusLabel: (s: OrderStatus) => string }) {
  return (
    <div className="min-w-0 space-y-6">
      <Button variant="light" size="sm" onPress={onBack} className="-ml-2">
        ← {t("meusPedidos.backToList")}
      </Button>
      <Card className="min-w-0 overflow-hidden border border-slate-200/80 shadow-sm">
        <CardBody className="min-w-0 gap-6 overflow-hidden p-4 sm:p-6">
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-default-500">{t("meusPedidos.order")}</p>
              <p className="break-all font-mono text-lg font-bold text-foreground">
                {order.id}
              </p>
              <p className="mt-1 text-sm text-default-600">
                {formatOrderDate(order.createdAt)}
              </p>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-medium text-sky-700">
              {getStatusLabel(order.status)}
            </span>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t("meusPedidos.progress")}
            </h3>
            <OrderTimeline order={order} t={t} getStatusLabel={getStatusLabel} />
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <CubeIcon className="h-4 w-4" />
              {t("meusPedidos.items")}
            </h3>
            <ul className="space-y-3">
              {order.items.map(({ slug, quantity }) => {
                const product = getProductBySlug(slug);
                if (!product) return null;
                return (
                  <li
                    key={slug}
                    className="flex min-w-0 gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                      <ProductImageFallback
                        src={product.image}
                        fallback={product.imageFallback}
                        alt={product.name}
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-sm text-default-500">
                        Qtd: {quantity} · {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {order.address && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <MapPinIcon className="h-4 w-4" />
                {t("meusPedidos.delivery")}
              </h3>
              <p className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-sm text-default-600">
                {order.address.logradouro}
                {order.address.bairro ? `, ${order.address.bairro}` : ""}
                <br />
                {order.address.localidade} - {order.address.uf} · CEP{" "}
                {order.address.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="font-semibold text-foreground">{t("meusPedidos.total")}</span>
            <span className="text-lg font-bold text-sky-600">
              {formatPrice(order.total)}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export function OrderStatusClient() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const getStatusLabel = (s: OrderStatus) => t(STATUS_KEYS[s]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    const id = searchParams?.get("id");
    if (id) {
      const order = getOrderById(id);
      if (order) setSelectedOrder(order);
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearchError("");
    setSearchedOrder(null);
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchError(t("meusPedidos.searchError"));
      return;
    }
    const order = getOrderById(trimmed);
    if (order) {
      setSearchedOrder(order);
      setSelectedOrder(order);
    } else {
      setSearchError(t("meusPedidos.notFound"));
    }
  };

  const showDetail = selectedOrder !== null;
  const displayOrder = selectedOrder ?? searchedOrder;

  return (
    <PageShell
      title={t("meusPedidos.title")}
      subtitle={
        <p className="text-default-600">
          {t("meusPedidos.subtitle")}
        </p>
      }
      className="min-h-screen bg-sky-50/30"
      maxWidth="max-w-2xl"
    >
      {!showDetail ? (
        <div className="space-y-8">
          <Card className="border border-slate-200/80 shadow-sm">
            <CardBody className="gap-4 p-4 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <MagnifyingGlassIcon className="h-5 w-5 text-sky-600" />
                {t("meusPedidos.search")}
              </h2>
              <p className="text-sm text-default-600">
                {t("meusPedidos.searchHint")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Input
                  placeholder={t("meusPedidos.searchPlaceholder")}
                  value={query}
                  onValueChange={(v) => {
                    setQuery(v);
                    setSearchError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  size="md"
                  classNames={{ input: "font-mono" }}
                  className="flex-1"
                  isInvalid={!!searchError}
                  errorMessage={searchError}
                />
                <Button
                  color="primary"
                  onPress={handleSearch}
                  className="w-full sm:w-auto"
                >
                  {t("meusPedidos.consult")}
                </Button>
              </div>
            </CardBody>
          </Card>

          {orders.length > 0 && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <TruckIcon className="h-5 w-5 text-sky-600" />
                {t("meusPedidos.ordersThisDevice")}
              </h2>
              <ul className="space-y-3">
                {orders.map((order) => (
                  <li key={order.id}>
                    <Card
                      className="cursor-pointer border border-slate-200/80 shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50/30"
                      isPressable
                      onPress={() => setSelectedOrder(order)}
                    >
                      <CardBody className="flex flex-row flex-wrap items-center justify-between gap-3 p-4 sm:flex-nowrap">
                        <div className="min-w-0">
                          <p className="font-mono font-semibold text-foreground">
                            {order.id}
                          </p>
                          <p className="text-sm text-default-500">
                            {formatOrderDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">
                            {getStatusLabel(order.status)}
                          </span>
                          <span className="font-semibold text-sky-600">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {orders.length === 0 && !searchedOrder && !query && (
            <Card className="border border-slate-200/80 shadow-sm">
              <CardBody className="py-10 text-center">
                <TruckIcon className="mx-auto mb-3 h-12 w-12 text-default-300" />
                <p className="text-default-600">
                  {t("meusPedidos.noOrders")}
                </p>
              </CardBody>
            </Card>
          )}
        </div>
      ) : displayOrder ? (
        <OrderDetail
          order={displayOrder}
          onBack={() => {
            setSelectedOrder(null);
            setSearchedOrder(null);
          }}
          t={t}
          getStatusLabel={getStatusLabel}
        />
      ) : null}
    </PageShell>
  );
}
