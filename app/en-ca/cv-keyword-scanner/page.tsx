import { Metadata } from "next";

export { default } from "@/app/cv-keyword-scanner/page";

export const metadata: Metadata = {
  title: "CV Keyword Scanner | Flashfire Canada",
  description: "Scan your resume for missing keywords. Match your CV to job descriptions. Free CV keyword scanner.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/cv-keyword-scanner",
    languages: {
      "en-US": "https://www.flashfirejobs.com/cv-keyword-scanner",
      "en-CA": "https://www.flashfirejobs.com/en-ca/cv-keyword-scanner",
      "x-default": "https://www.flashfirejobs.com/cv-keyword-scanner",
    },
  },
};
