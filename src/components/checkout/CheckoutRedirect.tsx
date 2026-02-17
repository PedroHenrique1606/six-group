"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadUtmFromStorage } from "@/lib/utm";

export function CheckoutRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmParams = loadUtmFromStorage();
    const plan = searchParams?.get("plan");
    const base = "/obrigado";
    const query = new URLSearchParams();
    if (plan) query.set("plan", plan);
    Object.entries(utmParams).forEach(([k, v]) => query.set(k, v));
    const href = query.toString() ? `${base}?${query.toString()}` : base;
    router.replace(href);
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-50">
      <p className="text-default-600">Redirecionando para confirmação...</p>
    </div>
  );
}
