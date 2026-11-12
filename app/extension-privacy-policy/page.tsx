import { Metadata } from "next";
import ExtensionPrivacyPolicy from "@/src/components/legal/ExtensionPrivacyPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

// Linked from the Chrome Web Store listing's Privacy Policy field and from the
// extension's consent screen. Keep the URL stable.
export const metadata: Metadata = {
  title: "Chrome Extension Privacy Policy | Flashfire",
  description:
    "How the FlashFire Jobs Auto Fill Chrome extension collects, uses, stores and shares your data.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.flashfirejobs.com/extension-privacy-policy" },
};

export default function ExtensionPrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <ExtensionPrivacyPolicy />
      <Footer />
    </>
  );
}
