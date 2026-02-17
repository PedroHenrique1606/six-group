"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImageFallbackProps = {
  src: string;
  fallback: string;
  alt: string;
  sizes?: string;
  className?: string;
};

export function ProductImageFallback({
  src,
  fallback,
  alt,
  sizes = "80px",
  className = "object-contain object-center",
}: ProductImageFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      unoptimized={false}
      onError={() => setCurrentSrc(fallback)}
    />
  );
}
