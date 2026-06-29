import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-tracker",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/job-tracker",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/job-tracker",
      "x-default": "https://www.flashfirejobs.com/features/job-tracker",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
