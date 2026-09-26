import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/resume-optimizer",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/resume-optimizer",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/resume-optimizer",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/resume-optimizer",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/resume-optimizer",
      "x-default": "https://www.flashfirejobs.com/features/resume-optimizer",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
