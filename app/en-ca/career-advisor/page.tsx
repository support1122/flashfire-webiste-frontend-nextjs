import { Metadata } from "next";
import CareerAdvisor from "@/src/components/careerAdvisor/careerAdvisor";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
export const metadata: Metadata = {
    title: "AI Career Advisor: Personalized Job Recommendations",
    description:
        "Get personalized job recommendations based on your skills, experience, and career goals. Our career advisor is here to help you find the perfect job.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/en-ca/career-advisor",
    },
    openGraph: {
        title: "AI Career Advisor: Personalized Job Recommendations",
        description:
            "Get personalized job recommendations based on your skills, experience, and career goals.",
        url: "https://www.flashfirejobs.com/career-advisor",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
};

export default function CareerAdvisorPage() {
    return (
        <>
            <Navbar />
            <CareerAdvisor />
            <Footer />
        </>
    );
}