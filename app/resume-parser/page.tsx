import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ResumeParser from "@/src/components/resumeTools/ResumeParser";

export const metadata = {
  title: "Resume Parser | Flashfire",
  description: "Extract structured data from your resume instantly. Free online resume parser.",
};

export default function ResumeParserPage() {
  return (
    <>
      <Navbar />
      <ResumeParser />
      <Footer />
    </>
  );
}
