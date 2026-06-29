import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import { PHProvider } from "@/src/components/PostHogProvider";
import WhatsAppButton from "@/src/components/WhatsAppButton/WhatsAppButton";
import BlogImagePreloader from "@/src/components/BlogImagePreloader";
import TestimonialImagePreloader from "@/src/components/homePageHappyUsers/TestimonialImagePreloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flashfirejobs.com"),
  title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster",
  description:
    "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
  keywords: [
    "job search automation",
    "AI job application",
    "automated job search",
    "resume tailoring",
    "job application service",
    "career automation",
  ],
  authors: [{ name: "Flashfire" }],
  creator: "Flashfire",
  publisher: "Flashfire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://www.flashfirejobs.com/",
    title: "FLASHFIRE - AI-Powered Job Search Automation",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    siteName: "FLASHFIRE",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE - AI-Powered Job Search Automation",
        secureUrl: "https://www.flashfirejobs.com/images/og-image.png",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLASHFIRE - AI-Powered Job Search Automation",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
    creator: "@flashfire",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import ClientLogicWrapper from "@/src/components/ClientLogicWrapper";
import { FB_PIXEL_ID } from "@/lib/metaPixel";

const GTM_CONTAINER_ID = "GTM-MCS5V3BF";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager — keep high in <head> per Google */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
          }}
        />
        {/* Google AdSense site verification */}
        <meta name="google-adsense-account" content="ca-pub-7803903365456072" />
        {/* Font Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Satoshi Font - Preconnect and load with display=swap */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap"
          rel="stylesheet"
        />
        {/* Calendly — non-blocking CSS load (print-trick swap). The sync stylesheet was the largest render-blocking request (~1,200ms) per PageSpeed Insights. */}
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link
          rel="preload"
          as="style"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://assets.calendly.com/assets/external/widget.css"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://assets.calendly.com/assets/external/widget.css';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l);})();`,
          }}
        />
        {/* Cloudinary (blog images) — dns-prefetch only; preconnect was warned as unused on PSI */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) — immediately after opening <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <PHProvider>
          <ClientLogicWrapper>
            {children}
            <WhatsAppButton />
          </ClientLogicWrapper>
        </PHProvider>
        <BlogImagePreloader />
        <TestimonialImagePreloader />
        {/* Meta Pixel - Load with afterInteractive strategy */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* Reddit Pixel v2 — loaded after page paint, non-blocking */}
        <Script
          id="reddit-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/v2/rdtag.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_j8tdb9hlk690');rdt('track','PageVisit');`
          }}
        />
        {/* LinkedIn Insight Tag - Load with afterInteractive strategy */}
        {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
          <>
            <Script id="linkedin-insight-tag" strategy="afterInteractive">
              {`
                _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://px.ads.linkedin.com/collect/?pid=${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}&fmt=gif`}
              />
            </noscript>
          </>
        )}
        {/* Freshworks CRM Tracking Code - Load on user interaction */}
        <Script
          id="freshworks-crm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,o,f,js,fjs){
                w['FreshworksWidget']=o;
                w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
                w[o].l=1*new Date();
                js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
                js.id=o;
                js.src=f;
                js.async=1;
                js.setAttribute('chat','false');
                fjs.parentNode.insertBefore(js,fjs);
              }(window,document,'script','fw','//in.fw-cdn.com/32537193/1404018.js'));
            `,
          }}
        />
        {/* Calendly Script - lazyOnload so it does not compete with LCP. Booking modal opens on user click, so a small delay is acceptable. */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

