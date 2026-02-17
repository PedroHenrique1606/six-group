"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ProductSlug } from "@/lib/products";
import { getProductBySlug } from "@/lib/products";

export interface CartItem {
  slug: ProductSlug;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (slug: ProductSlug, quantity?: number) => void;
  removeItem: (slug: ProductSlug) => void;
  updateQuantity: (slug: ProductSlug, quantity: number) => void;
  totalCount: number;
  subtotal: number;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "supreme_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const addItem = useCallback((slug: ProductSlug, quantity = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === slug);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + quantity };
        return next;
      }
      return [...prev, { slug, quantity }];
    });
  }, []);

  const removeItem = useCallback((slug: ProductSlug) => {
    setItems((prev) => prev.filter((x) => x.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: ProductSlug, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      return;
    }
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === slug);
      if (i < 0) return prev;
      const next = [...prev];
      next[i] = { ...next[i], quantity };
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { totalCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    items.forEach(({ slug, quantity }) => {
      const p = getProductBySlug(slug);
      if (p) {
        count += quantity;
        sum += p.price * quantity;
      }
    });
    return { totalCount: count, subtotal: sum };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      totalCount,
      subtotal,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      totalCount,
      subtotal,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
