import { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "../global.css";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Fahaad", 
    template: "%s | Fahaad", 
  },
  description: "Software Engineer and Master's student in Cybersecurity",
  openGraph: {
    title: "url.com",
    description:
      "Software Engineer and Master's student in Cybersecurity",
    url: "url.com",
    siteName: "Fahaad",
    images: [
      {
        url: "https://url.com/og.png", // TODO change with the url
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
    shortcut: "/favicon.png",
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
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
