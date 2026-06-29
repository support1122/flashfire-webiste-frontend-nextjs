import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import HomeImagePreloader from "./HomeImagePreloader";

export const metadata: Metadata = {
  title: "Flashfire: Automate Job Applications with AI",
  description:
    "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/",
    languages: {
      "en-US": "https://www.flashfirejobs.com/",
      "en-CA": "https://www.flashfirejobs.com/en-ca",
      "x-default": "https://www.flashfirejobs.com/",
    },
  },
  openGraph: {
    title: "Flashfire: Automate Job Applications with AI",
    description:
      "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
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
    title: "Flashfire: Automate Job Applications with AI",
    description:
      "Flashfire is an AI job application platform that automates job search, auto-applies to jobs using AI, and matches you with the right roles faster.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.flashfirejobs.com/#organization",
    "name": "Flashfire",
    "url": "https://www.flashfirejobs.com/",
    "logo": "https://www.flashfirejobs.com/images/flashfire-logo.png",
    "description": "Flashfire is an AI-powered job search platform helping candidates get interview calls faster through intelligent job matching and automation.",
    "sameAs": [
      "https://www.instagram.com/flashfirejobs/",
      "https://www.youtube.com/@flashfireindia",
      "https://www.linkedin.com/company/flashfire-pvt-ltd/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why are we the best job hunting site to find opportunities quickly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because we don't just show jobs — we apply to them for you. You skip browsing, resume editing, and forms. We do it all."
        }
      },
      {
        "@type": "Question",
        "name": "How does an AI-powered job search improve my chances of finding relevant positions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-powered job search uses intelligent matching, resume optimization, and automation to apply only to roles that fit your profile. Flashfire's AI-powered job search ensures higher relevance and better recruiter response rates."
        }
      },
      {
        "@type": "Question",
        "name": "Can AI job application tools help me apply for jobs faster?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Job search automation allows AI to apply for jobs automatically on your behalf, saving time while increasing application volume and accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of using AI for job search on FlashFireJobs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Using AI for job search on FlashFireJobs offers several benefits, including personalized job recommendations, faster applications, and improved recruiter visibility. As an AI-powered job search platform, FlashFireJobs combines intelligent job discovery, AI resume matching, and automated applications to help modern job seekers find opportunities quickly and apply with confidence."
        }
      },
      {
        "@type": "Question",
        "name": "Does FlashFireJobs act as an AI job board?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire works as an AI job search platform, combining job discovery, AI job matching, and automated applications."
        }
      },
      {
        "@type": "Question",
        "name": "How does an AI-powered job search differ from traditional job searching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional job searching is manual and time-consuming. AI-powered job search automates resume matching, job applications, and tracking, making job search automation faster and more effective."
        }
      },
      {
        "@type": "Question",
        "name": "What is a job search virtual assistant and how can it make job hunting easier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FlashFireJobs acts as your virtual assistant and team — finding jobs, optimizing your resume, and applying for you every day."
        }
      },
      {
        "@type": "Question",
        "name": "Can FlashFireJobs auto apply to jobs on my behalf?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Flashfire is an AI job application platform that can auto-apply to jobs using AI-driven resume matching and role-specific optimization."
        }
      },
      {
        "@type": "Question",
        "name": "What job application assistance features does FlashFireJobs offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "✔️ Resume optimization ✔️ Cover letter submission ✔️ 1,200+ manual applications ✔️ LinkedIn profile tips ✔️ Live job tracker ✔️ WhatsApp support ✔️ Weekly progress updates"
        }
      },
      {
        "@type": "Question",
        "name": "Which is the best app to find job opportunities in my field?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FlashFireJobs is ideal if you want results. We don't show jobs — we apply to them with tailored resumes and real human effort."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeImagePreloader />
      <HomePage />
    </>
  );
}
