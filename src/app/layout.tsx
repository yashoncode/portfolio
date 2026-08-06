import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import Galaxy from "@/components/Galaxy";
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
  title: "Yashwanth D | Full-Stack Developer & AI Systems",
  description:
    "Full-Stack Developer building AI systems: agentic AI (multi-agent systems, RAG, FastAPI) and Laravel, React and Next.js applications for logistics.",
  keywords: [
    "Yashwanth D",
    "AI Engineer",
    "Generative AI Engineer",
    "Software Engineer",
    "Full Stack Engineer",
    "Agentic AI",
    "Multi-Agent Systems",
    "RAG",
    "LangGraph",
    "LangChain",
    "FastAPI",
    "Laravel",
    "Next.js",
    "React",
    "Python",
    "India",
  ],
  openGraph: {
    title: "Yashwanth D | Full-Stack Developer & AI Systems",
    description:
      "Full-Stack Developer · AI Systems · Agentic AI · Multi-Agent Systems · RAG · FastAPI · React · Laravel",
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
        <Galaxy />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
