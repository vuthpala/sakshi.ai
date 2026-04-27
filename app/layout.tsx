import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/chatbot";
import { AuthProvider } from "@/lib/auth-context";
import { AdminProvider } from "@/lib/admin-context";
import { I18nProvider } from "@/components/i18n-provider";
import { ToastProvider } from "@/components/toast-provider";

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

const notoTelugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PaperWise - Legal Documents in 15 Minutes | Government e-Stamp & Advocate Sign",
  description: "Your legal documents ready in 15 minutes! Government e-Stamp and Advocate Sign included. India's fastest legal document platform. Rent Agreement, Sale Deed, Will, Legal Notice & more.",
  keywords: "legal documents india, rent agreement online, sale deed, will, legal notice, affidavit, contract agreement india, paperwise, lawyer verified, e-stamp, aadhaar esign",
  authors: [{ name: "PaperWise" }],
  creator: "PaperWise",
  publisher: "PaperWise",
  metadataBase: new URL("https://doc-mu-olive.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PaperWise - Legal Documents in 15 Minutes",
    description: "Your legal documents ready in 15 minutes with Government e-Stamp and Advocate signature. India's #1 legal document platform.",
    type: "website",
    locale: "te_IN",
    siteName: "PaperWise",
    url: "https://doc-mu-olive.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PaperWise - Legal Documents in 15 Minutes with Government e-Stamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperWise - Legal Documents in 15 Minutes",
    description: "Government e-Stamp + Advocate Sign. India's #1 legal document platform.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#1B3A6B",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="te"
      className={`${playfair.variable} ${inter.variable} ${notoTelugu.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans">
        <AuthProvider>
          <AdminProvider>
            <I18nProvider>
              {children}
              <Chatbot />
              <ToastProvider />
            </I18nProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
