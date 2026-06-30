import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/precision-targeting",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/precision-targeting",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/precision-targeting",
      "x-default": "https://www.flashfirejobs.com/features/precision-targeting",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
