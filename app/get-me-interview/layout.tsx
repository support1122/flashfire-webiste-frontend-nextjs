import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/get-me-interview",
    languages: {
      "en-US": "https://www.flashfirejobs.com/get-me-interview",
      "en-CA": "https://www.flashfirejobs.com/en-ca/get-me-interview",
      "en-GB": "https://www.flashfirejobs.com/en-gb/get-me-interview",
      "en-AU": "https://www.flashfirejobs.com/en-au/get-me-interview",
      "x-default": "https://www.flashfirejobs.com/get-me-interview",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
