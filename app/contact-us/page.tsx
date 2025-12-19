import { Metadata } from "next";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Flashfire | Flashfire",
  description:
    "Have questions about Flashfire? Contact our team for support, partnerships, or general inquiries. We're here to help with your job search automation needs.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/contact-us",
  },
  openGraph: {
    title: "Contact Us - Get in Touch with Flashfire",
    description:
      "Have questions about Flashfire? Contact our team for support, partnerships, or general inquiries.",
    url: "https://www.flashfirejobs.com/contact-us",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <ContactUsClient />
      <Footer />
    </>
  );
}
