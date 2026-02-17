"use client";

import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const DEFAULT_MESSAGE = "Olá, tenho interesse no Supreme (Maxx, Thermo ou Gold). Pode me passar mais informações?";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="whatsapp-in fixed bottom-6 right-6 z-50">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-sky-600 hover:shadow-xl sm:h-16 sm:w-16"
      >
        <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      </Link>
    </div>
  );
}
