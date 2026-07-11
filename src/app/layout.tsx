import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yashwanth D — Software Engineer",
  description:
    "Software Engineer with 3+ years building Laravel REST APIs, CRM & ERP systems, and workflow automation — now going full-stack with Next.js and React.",
  keywords: [
    "Yashwanth D",
    "Software Engineer",
    "Laravel",
    "Next.js",
    "React",
    "Backend Developer",
    "Full-Stack Developer",
    "India",
  ],
  openGraph: {
    title: "Yashwanth D — Software Engineer",
    description:
      "Laravel APIs, CRM & ERP systems, and workflow automation — now full-stack with Next.js and React.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
