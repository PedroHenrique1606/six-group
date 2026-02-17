"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "./HeroSection";
import { WhatsAppButton } from "./WhatsAppButton";
import { getUtmFromSearch, saveUtmToStorage } from "@/lib/utm";

const VideoPlayer = dynamic(() => import("./VideoPlayer").then((m) => ({ default: m.VideoPlayer })), { ssr: true });
const BenefitsSection = dynamic(() => import("./BenefitsSection").then((m) => ({ default: m.BenefitsSection })), { ssr: true });
const ProductsSection = dynamic(() => import("./ProductsSection").then((m) => ({ default: m.ProductsSection })), { ssr: true });
const GuaranteeSection = dynamic(() => import("./GuaranteeSection").then((m) => ({ default: m.GuaranteeSection })), { ssr: true });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })), { ssr: true });
const FinalCtaSection = dynamic(() => import("./FinalCtaSection").then((m) => ({ default: m.FinalCtaSection })), { ssr: true });

export function LandingClient() {
  useEffect(() => {
    const fromUrl = getUtmFromSearch(
      typeof window !== "undefined" ? window.location.search : ""
    );
    if (Object.keys(fromUrl).length > 0) {
      saveUtmToStorage(fromUrl);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeroSection />
      <VideoPlayer />
      <BenefitsSection />
      <ProductsSection />
      <GuaranteeSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <WhatsAppButton />
    </div>
  );
}
