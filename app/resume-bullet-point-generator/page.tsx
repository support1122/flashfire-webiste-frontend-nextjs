import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import ResumeBulletPointGenerator from "@/src/components/resumeTools/ResumeBulletPointGenerator";

export const metadata = {
  title: "Resume Bullet Point Generator | Flashfire",
  description: "Turn vague job duties into sharp, ATS-friendly bullet points. Free AI resume bullet point generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/resume-bullet-point-generator",
  },
};

export default function ResumeBulletPointGeneratorPage() {
  return (
    <>
      <Navbar />
      <ResumeBulletPointGenerator />
      <Footer />
    </>
  );
}
