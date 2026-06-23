import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import JobSearch from "@/src/components/pages/jobSearch/JobSearch";

export const metadata: Metadata = {
  title: "AI Job Search Automation | Flashfire",
  description:
    "Flashfire applies to relevant jobs on your behalf so you don't have to search manually. Get updates without lifting a finger.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/job-search",
  },
  openGraph: {
    title: "Job Search - Find Jobs Faster With Human-Powered Automation",
    description:
      "Flashfire applies to relevant jobs on your behalf so you don't have to search manually.",
    url: "https://www.flashfirejobs.com/job-search",
    type: "website",
  },
};

export default function JobSearchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Job Search - Find Jobs Faster With Human-Powered Automation | Flashfire",
    "url": "https://www.flashfirejobs.com/job-search",
    "description": "Flashfire applies to relevant jobs on your behalf so you don't have to search manually. Get updates without lifting a finger.",
    "publisher": {
      "@type": "Organization",
      "name": "Flashfire",
      "url": "https://www.flashfirejobs.com"
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="mt-0">
        <JobSearch />
      </main>
      <Footer />
    </div>
  );
}

