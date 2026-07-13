import { Metadata } from "next";

export { default } from "@/app/resume-bullet-point-generator/page";

export const metadata: Metadata = {
  title: "Resume Bullet Point Generator | Flashfire Canada",
  description: "Turn vague job duties into sharp, ATS-friendly bullet points. Free AI resume bullet point generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/resume-bullet-point-generator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/resume-bullet-point-generator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/resume-bullet-point-generator",
      "x-default": "https://www.flashfirejobs.com/resume-bullet-point-generator",
    },
  },
};
