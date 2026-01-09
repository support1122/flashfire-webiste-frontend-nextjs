import { redirect } from "next/navigation";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyHowFlashfireWorks() {
  redirect("/how-it-works");
}

