import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";

export const metadata = {
  title: "Política de Reembolso | Grupo Six",
  description: "Política de reembolso e garantia",
};

export default function PoliticaReembolsoPage() {
  return (
    <PageShell
      title="Política de Reembolso"
      subtitle={<p className="text-sm text-default-500">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>}
    >
      <div className="max-w-none space-y-6 text-default-600">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              1. Garantia de 7 dias
            </h2>
            <p>
              Oferecemos garantia incondicional de 7 (sete) dias a contar da
              data de recebimento do produto. Dentro desse prazo, você pode
              solicitar o reembolso integral sem necessidade de justificativa.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              2. Como solicitar o reembolso
            </h2>
            <p>
              Entre em contato conosco pelo e-mail ou WhatsApp informado na
              página de Contato. Informe o número do pedido e o motivo (opcional).
              Nossa equipe irá orientar os próximos passos e a devolução do
              produto, quando aplicável.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              3. Devolução do produto
            </h2>
            <p>
              Para pedidos com garantia ativa, o produto deve ser devolvido
              em condições de revenda (embalagem íntegra, lacre preservado
              quando houver). Após a confirmação do recebimento, o reembolso
              será processado no mesmo meio de pagamento utilizado na compra,
              em até 7 dias úteis.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              4. Prazos do reembolso
            </h2>
            <p>
              Cartão de crédito: o estorno pode levar até 2 ciclos de fatura
              para aparecer. PIX e boleto: o valor será devolvido em até 7
              dias úteis após a aprovação do pedido de reembolso. Os prazos
              finais dependem da instituição financeira.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              5. Casos fora da garantia
            </h2>
            <p>
              Após o período de 7 dias, não aceitamos pedidos de reembolso
              por insatisfação. Em caso de defeito de fabricação ou produto
              incorreto, entre em contato para análise e possível troca ou
              reembolso, conforme a legislação consumerista.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              6. Dúvidas
            </h2>
            <p>
              Para mais informações, acesse a página de{" "}
              <Link href="/contato" className="text-sky-600 underline hover:text-sky-700">
                Contato
              </Link>
              .
            </p>
          </section>
        </div>
    </PageShell>
  );
}
