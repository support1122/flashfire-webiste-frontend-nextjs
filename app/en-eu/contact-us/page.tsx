import { Metadata } from "next";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Contact Flashfire: Get in Touch | Flashfire EU",
  description:
    "Have questions about Flashfire? Contact our European team for support, partnerships, or job search automation inquiries.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-eu/contact-us",
    languages: {
      "en-US": "https://www.flashfirejobs.com/contact-us",
      "en-CA": "https://www.flashfirejobs.com/en-ca/contact-us",
      "en-GB": "https://www.flashfirejobs.com/en-gb/contact-us",
      "en-AU": "https://www.flashfirejobs.com/en-au/contact-us",
      "en-EU": "https://www.flashfirejobs.com/en-eu/contact-us",
      "x-default": "https://www.flashfirejobs.com/contact-us",
    },
  },
  openGraph: {
    title: "Contact Flashfire: Get in Touch | Flashfire EU",
    description:
      "Talk to Flashfire’s European team for support, partnerships, or general questions.",
    url: "https://www.flashfirejobs.com/en-eu/contact-us",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function ContactUsPageEU() {
  return (
    <>
      <Navbar />
      <ContactUsClient />
      <Footer />
    </>
  );
}

