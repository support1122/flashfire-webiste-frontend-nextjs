import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ATSScoreChecker from "@/src/components/resumeTools/ATSScoreChecker";

export const metadata = {
  title: "ATS Score Checker | Flashfire",
  description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ats-score-checker",
  },
};

export default function ATSScoreCheckerPage() {
  return (
    <>
      <Navbar />
      <ATSScoreChecker />
      <Footer />
    </>
  );
}
