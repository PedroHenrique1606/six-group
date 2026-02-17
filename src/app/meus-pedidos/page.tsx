import { Suspense } from "react";
import { OrderStatusClient } from "@/components/meus-pedidos/OrderStatusClient";

export const metadata = {
  title: "Meus pedidos | Grupo Six",
  description: "Consulte o status dos seus pedidos",
};

export default function MeusPedidosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-sky-50/30">
          Carregando...
        </div>
      }
    >
      <OrderStatusClient />
    </Suspense>
  );
}
