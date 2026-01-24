import { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/src/components/pages/home/Home";
import CanadaHome from "@/src/components/countries/ca/Home";

interface LocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

const validLocales = ["en-ca"];

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";

  if (!isCanada) {
    return {
      title: "AI Job Search, Job Application Platform | Ai Job Hunting Sites - FlashFireJobs",
      description:
        "FlashFireJobs is an AI-powered job search platform offering auto apply to jobs, job application assistance, AI job board & smart career job search tools.",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: "https://www.flashfirejobs.com/",
      },
      openGraph: {
        title: "AI Job Search, Job Application Platform | Ai Job Hunting Sites - FlashFireJobs",
        description:
          "FlashFireJobs is an AI-powered job search platform offering auto apply to jobs, job application assistance, AI job board & smart career job search tools.",
        url: "https://www.flashfirejobs.com/",
        type: "website",
        images: [
          {
            url: "https://www.flashfirejobs.com/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "FLASHFIRE Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  return {
    title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster (Canada)",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://www.flashfirejobs.com/en-ca",
    },
    openGraph: {
      title: "FLASHFIRE - AI-Powered Job Search Automation (Canada)",
      description:
        "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
      url: "https://www.flashfirejobs.com/en-ca",
      type: "website",
      images: [
        {
          url: "https://www.flashfirejobs.com/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "FLASHFIRE Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  // Handle default locale (no locale in URL)
  if (!locale || locale === "default") {
    return <HomePage />;
  }

  // Handle Canada locale
  if (locale === "en-ca") {
    return <CanadaHome />;
  }

  // Invalid locale - 404
  notFound();
}

