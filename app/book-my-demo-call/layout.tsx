import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Flashfire",
  description: "Book a demo call with Flashfire to see how our AI job search automation can help you land more interviews.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookMyDemoCallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
