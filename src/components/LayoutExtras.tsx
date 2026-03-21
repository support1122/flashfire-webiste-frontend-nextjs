"use client";

import dynamic from "next/dynamic";

// Lazy-load non-critical layout components — never visible on first paint
const WhatsAppButton = dynamic(() => import("@/src/components/WhatsAppButton/WhatsAppButton"), { ssr: false });
const GlobalModals = dynamic(() => import("@/src/components/ClientLogicWrapper"), { ssr: false });
const CalendlyPreloader = dynamic(() => import("@/src/components/CalendlyPreloader"), { ssr: false });

/** Client-only layout extras loaded after hydration — WhatsApp FAB + global modals */
export default function LayoutExtras() {
  return (
    <>
      <WhatsAppButton />
      <GlobalModals />
      <CalendlyPreloader />
    </>
  );
}
