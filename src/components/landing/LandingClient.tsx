"use client";

import { useEffect } from "react";
import { HeroSection } from "./HeroSection";
import { VideoPlayer } from "./VideoPlayer";
import { BenefitsSection } from "./BenefitsSection";
import { ProductsSection } from "./ProductsSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { WhatsAppButton } from "./WhatsAppButton";
import { getUtmFromSearch, saveUtmToStorage } from "@/lib/utm";

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
