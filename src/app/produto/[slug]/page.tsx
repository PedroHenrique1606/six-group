import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { ProdutoClient } from "@/components/produto/ProdutoClient";

export async function generateStaticParams() {
  return [{ slug: "maxx" }, { slug: "thermo" }, { slug: "gold" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto | Grupo Six" };
  return {
    title: `${product.name} | Grupo Six`,
    description: product.description,
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProdutoClient product={product} />;
}
