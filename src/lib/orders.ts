import type { ProductSlug } from "./products";
import type { CepResponse } from "./cep";

export type OrderStatus =
  | "confirmado"
  | "em_separacao"
  | "enviado"
  | "entregue";

export interface OrderItem {
  slug: ProductSlug;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: CepResponse | null;
}

const STORAGE_KEY = "six_orders";

function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GS-${date}-${random}`;
}

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {}
}

export function createOrderId(): string {
  return generateOrderId();
}

export function saveOrder(order: Order): void {
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function getOrders(): Order[] {
  return loadOrders();
}

export function getOrderById(id: string): Order | undefined {
  const normalized = id.trim().toUpperCase();
  return loadOrders().find((o) => o.id.toUpperCase() === normalized);
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  confirmado: "Confirmado",
  em_separacao: "Em separação",
  enviado: "Enviado",
  entregue: "Entregue",
};
