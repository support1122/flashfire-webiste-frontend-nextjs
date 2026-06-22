import { Metadata } from "next";
import StrategyCallCard from "@/src/components/schedule-call/StrategyCallCard";

export const metadata: Metadata = {
  title: "Strategy Call",
  description: "Strategy Call",
  alternates: {
    canonical: "https://www.flashfirejobs.com/strategy-call-card",
  },
};

export default function StrategyCallPage() {
  return (
    <main className="min-h-screen bg-[#f4fbf7] px-4 py-16 flex items-center justify-center">
      <StrategyCallCard />
    </main>
  );
}