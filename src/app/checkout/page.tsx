import { Suspense } from "react";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata = {
  title: "Checkout | Grupo Six",
  description: "Finalize sua compra",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-sky-50">
          Carregando...
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
