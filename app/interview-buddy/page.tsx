import { Metadata } from "next";
import InterviewBuddy from "@/src/components/interviewBuddy/interviewBuddy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
export const metadata: Metadata = {
    title: "Interview Buddy - Get personalized interview tips | Flashfire",
    description:
        "Get personalized interview tips based on your skills, experience, and career goals. Our interview buddy is here to help you land your dream job.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/interview-buddy",
    },
    openGraph: {
        title: "Interview Buddy - Get personalized interview tips",
        description:
            "Get personalized interview tips based on your skills, experience, and career goals.",
        url: "https://www.flashfirejobs.com/interview-buddy",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
};

export default function InterviewBuddyPage() {
    return (
        <>
            <Navbar />
            <InterviewBuddy />
            <Footer />
        </>
    )
}