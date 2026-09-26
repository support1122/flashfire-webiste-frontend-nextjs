import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";

export const metadata: Metadata = {
  title: "Flashfire Product Demo - See the Platform in Action | UK",
  description:
    "Watch a full walkthrough of the Flashfire platform: how we find roles, tailor your CV for every application, and track everything from one dashboard.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/product-demo",
    languages: {
      "en-US": "https://www.flashfirejobs.com/product-demo",
      "en-CA": "https://www.flashfirejobs.com/en-ca/product-demo",
      "en-GB": "https://www.flashfirejobs.com/en-gb/product-demo",
      "en-AU": "https://www.flashfirejobs.com/en-au/product-demo",
      "x-default": "https://www.flashfirejobs.com/product-demo",
    },
  },
  openGraph: {
    title: "Flashfire Product Demo - See the Platform in Action",
    description:
      "A full walkthrough of the Flashfire job search automation platform.",
    url: "https://www.flashfirejobs.com/en-gb/product-demo",
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

export default function ProductDemoPageUK() {
  return (
    <>
      <Navbar />
      <HomePageVideo />
      <Footer />
    </>
  );
}
