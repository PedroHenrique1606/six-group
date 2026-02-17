"use client";

import { HeroUIProvider } from "@heroui/react";
import { CartProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <LocaleProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </LocaleProvider>
    </HeroUIProvider>
  );
}
