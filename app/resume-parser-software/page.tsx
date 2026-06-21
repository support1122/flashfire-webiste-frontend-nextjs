import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ResumeParserSoftware from "@/src/components/resumeTools/ResumeParserSoftware";

export const metadata = {
  title: "Resume Parser Software | Flashfire",
  description: "AI-powered resume parser software. Extract contact info, skills, experience and education instantly.",
};

export default function ResumeParserSoftwarePage() {
  return (
    <>
      <Navbar />
      <ResumeParserSoftware />
      <Footer />
    </>
  );
}
