import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import CVKeywordScanner from "@/src/components/resumeTools/CVKeywordScanner";

export const metadata = {
  title: "CV Keyword Scanner | Flashfire",
  description: "Scan your resume for missing keywords. Match your CV to job descriptions. Free CV keyword scanner.",
};

export default function CVKeywordScannerPage() {
  return (
    <>
      <Navbar />
      <CVKeywordScanner />
      <Footer />
    </>
  );
}
