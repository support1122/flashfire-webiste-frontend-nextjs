import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AiResumeSummaryGenerator from "@/src/components/resumeTools/AiResumeSummaryGenerator";

export const metadata = {
  title: "AI Resume Summary Generator | Flashfire",
  description: "Generate a compelling professional resume summary in seconds. Free AI resume summary generator.",
};

export default function AiResumeSummaryGeneratorPage() {
  return (
    <>
      <Navbar />
      <AiResumeSummaryGenerator />
      <Footer />
    </>
  );
}
