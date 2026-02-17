import { Suspense } from "react";
import { ObrigadoClient } from "@/components/obrigado/ObrigadoClient";

export const metadata = {
  title: "Obrigado pela sua compra | Grupo Six",
  description: "Confirmação de compra",
};

export default function ObrigadoPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <ObrigadoClient />
    </Suspense>
  );
}
