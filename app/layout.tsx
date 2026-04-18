import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PaperWise - Smart Legal Documents for India",
  description: "India's smartest AI-powered legal document platform. Create court-ready Rent Agreements, Sale Deeds, Wills, Legal Notices & 50+ documents in 60 seconds. As per Indian Contract Act & Registration Act.",
  keywords: "legal documents india, rent agreement online, sale deed, will, legal notice, affidavit, contract agreement india, paperwise",
  openGraph: {
    title: "PaperWise - Smart Legal Documents for India",
    description: "Create professional legal documents in 60 seconds. Trusted by 50,000+ Indians.",
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans">{children}</body>
    </html>
  );
}
