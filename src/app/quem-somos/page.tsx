import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";

export const metadata = {
  title: "Quem somos | Grupo Six",
  description: "Conheça a Grupo Six",
};

export default function QuemSomosPage() {
  return (
    <PageShell
      title="Quem somos"
      subtitle={
        <p className="text-default-600">
          A Grupo Six atua em marketing digital e na oferta de suplementos de
          qualidade. Nossa missão é entregar produtos que fazem diferença,
          com transparência e suporte ao cliente.
        </p>
      }
    >
      <div className="max-w-none space-y-4 text-default-600">
        <p>
          Trabalhamos com garantia de 7 dias e políticas claras de reembolso.
          Dúvidas? Acesse nossa página de{" "}
          <Link href="/contato" className="text-sky-600 underline hover:text-sky-700">
            Contato
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
