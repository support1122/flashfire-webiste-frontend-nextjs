import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/resume-optimizer",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/resume-optimizer",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/resume-optimizer",
      "x-default": "https://www.flashfirejobs.com/features/resume-optimizer",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
