import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ResumeHeadlineGenerator from "@/src/components/resumeTools/ResumeHeadlineGenerator";

export const metadata = {
  title: "Resume Headline Generator | Flashfire",
  description: "Generate 5 AI-powered, recruiter-tested resume headlines instantly. Free resume headline generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/resume-headline-generator",
  },
};

export default function ResumeHeadlineGeneratorPage() {
  return (
    <>
      <Navbar />
      <ResumeHeadlineGenerator />
      <Footer />
    </>
  );
}
