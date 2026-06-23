import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ATSScoreChecker from "@/src/components/resumeTools/ATSScoreChecker";

export const metadata = {
  title: "ATS Score Checker | Flashfire",
  description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ats-score-checker",
  },
  openGraph: {
    title: "ATS Score Checker | Flashfire",
    description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
    url: "https://www.flashfirejobs.com/ats-score-checker",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashfire",
      },
    ],
  },
};

export default function ATSScoreCheckerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ATS Score Checker | Flashfire",
    "url": "https://www.flashfirejobs.com/ats-score-checker",
    "description": "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
    "applicationCategory": "BusinessApplication",
    "publisher": {
      "@type": "Organization",
      "name": "Flashfire",
      "url": "https://www.flashfirejobs.com"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <ATSScoreChecker />
      <Footer />
    </>
  );
}
