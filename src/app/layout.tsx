import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, Permanent_Marker } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const marker = Permanent_Marker({ variable: "--font-marker", subsets: ["latin"], weight: "400" });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: profile.siteTitle, template: `%s | ${profile.name}` },
  description: profile.siteDescription,
  openGraph: {
    title: profile.siteTitle,
    description: profile.siteDescription,
    type: "website",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0614",
};

// Runs before paint so a saved light theme never flashes dark.
const themeScript = `try{var t=localStorage.getItem("gig-theme");if(t==="light")document.documentElement.dataset.theme="light";if(localStorage.getItem("gig-intro-seen")==="1")document.documentElement.dataset.intro="seen"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${anton.variable} ${grotesk.variable} ${marker.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.curtain-root{display:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
