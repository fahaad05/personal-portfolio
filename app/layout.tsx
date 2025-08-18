import { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "../global.css";
import { Analytics } from "./components/analytics";

const SITE_URL = process.env.PUBLIC_SITE_URL || "https://url.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fahaad",
    template: "%s | Fahaad",
  },
  description: "Fahaad's Portoflio",
  openGraph: {
    title: "Fahaad",
    description: "Fahaad's Portoflio",
    url: SITE_URL,
    siteName: "Fahaad",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "it-CH",
    type: "website",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, 
      { url: "/icon.png", type: "image/png" }, 
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head></head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
