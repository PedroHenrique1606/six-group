export type ProductSlug = "maxx" | "thermo" | "gold";

export interface Product {
  id: ProductSlug;
  name: string;
  tagline: string;
  description: string;
  price: number;
  oldPrice: number | null;
  installments: string;
  image: string;
  imageFallback: string;
  gallery: string[];
  taglineClass: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "maxx",
    name: "Supreme Maxx",
    tagline: "Vitaminas e minerais",
    description:
      "Suplemento alimentar em cápsulas. 30 cápsulas de 500 mg. Energia e disposição no dia a dia.",
    price: 97,
    oldPrice: 147,
    installments: "ou 3x de R$ 32,33",
    image: "/supreme-maxx.png",
    imageFallback: "/supreme.png",
    gallery: ["/supreme-maxx.png", "/supreme-1.webp", "/supreme-3.webp"],
    taglineClass: "text-purple-800",
  },
  {
    id: "thermo",
    name: "Supreme Thermo",
    tagline: "Termogênico + espirulina",
    description:
      "À base de goma guar, psyllium e espirulina. 30 cápsulas de 500 mg. Suplemento alimentar.",
    price: 97,
    oldPrice: 147,
    installments: "ou 3x de R$ 32,33",
    image: "/supreme-thermo.png",
    imageFallback: "/supreme.png",
    gallery: ["/supreme-thermo.png", "/supreme-1.webp", "/supreme-3.webp"],
    taglineClass: "text-emerald-800",
  },
  {
    id: "gold",
    name: "Supreme Gold",
    tagline: "Quitosana em cápsulas",
    description:
      "À base de Quitosana. 30 cápsulas de 700 mg. Suplemento alimentar em cápsulas.",
    price: 117,
    oldPrice: 167,
    installments: "ou 3x de R$ 39,00",
    image: "/supreme-gold.png",
    imageFallback: "/supreme.png",
    gallery: ["/supreme-gold.png", "/supreme-1.webp", "/supreme-3.webp"],
    taglineClass: "text-amber-800",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
