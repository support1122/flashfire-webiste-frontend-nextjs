import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export const metadata: Metadata = {
  title: "Flashfire FAQ: Job Search Automation Questions",
  description:
    "Find answers to common questions about Flashfire's job search automation service, pricing, how it works, and more.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/faq",
  },
  openGraph: {
    title: "FAQ - Frequently Asked Questions",
    description:
      "Find answers to common questions about Flashfire's job search automation.",
    url: "https://www.flashfirejobs.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Flashfire's job search automation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire uses AI to find relevant job listings, optimizes your resume for each role, and our human team manually submits tailored applications on your behalf — so you get interviews without spending hours applying."
        }
      },
      {
        "@type": "Question",
        "name": "How many jobs does Flashfire apply to per week?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire applies to 200–400+ targeted jobs per month on your behalf, focusing on roles that match your profile, experience, and preferences."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flashfire customize the resume for each job application?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every application submitted through Flashfire includes a resume that is tailored to the specific job description using ATS-optimized keywords relevant to that role."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to start getting interview calls with Flashfire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most users start receiving interview calls within 2–4 weeks of onboarding, depending on their target roles, location, and how competitive the job market is."
        }
      },
      {
        "@type": "Question",
        "name": "What is the pricing for Flashfire's job search automation service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire offers multiple plans based on your job search volume and duration. Visit our pricing page at flashfirejobs.com/pricing for current plan details and pricing."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flashfire work for jobs in Canada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Flashfire supports job seekers in both the US and Canada. Canadian users get a dedicated experience at flashfirejobs.com/en-ca with region-specific job targeting."
        }
      },
      {
        "@type": "Question",
        "name": "Can Flashfire help with LinkedIn profile optimization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Flashfire's LinkedIn profile optimization service restructures your headline, summary, and skills section with recruiter-friendly keywords to improve your visibility in LinkedIn search results."
        }
      },
      {
        "@type": "Question",
        "name": "Is Flashfire suitable for freshers or new graduates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Flashfire is designed to help both experienced professionals and fresh graduates find jobs faster by automating the most time-consuming parts of the job search."
        }
      },
      {
        "@type": "Question",
        "name": "How do I track the status of my job applications with Flashfire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire provides a real-time dashboard where you can track all applications submitted on your behalf, see which companies have responded, and monitor your interview conversion rate."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main style={{ paddingTop: "5rem", minHeight: "60vh" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            margin: "2rem auto 1rem",
            maxWidth: "800px",
            padding: "0 1rem",
          }}
        >
          Frequently Asked Questions
        </h1>
        <HomePageFAQ />
      </main>
      <Footer />
    </>
  );
}

