import { Metadata } from "next";

export { default } from "@/app/resume-parser/page";

export const metadata: Metadata = {
  title: "Resume Parser | Flashfire Canada",
  description: "Extract structured data from your resume instantly. Free online resume parser.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/resume-parser",
    languages: {
      "en-US": "https://www.flashfirejobs.com/resume-parser",
      "en-CA": "https://www.flashfirejobs.com/en-ca/resume-parser",
      "x-default": "https://www.flashfirejobs.com/resume-parser",
    },
  },
};
