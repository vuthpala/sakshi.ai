import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/chatbot";
import { AuthProvider } from "@/lib/auth-context";
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
  title: "LexMeet (లెక్స్‌మీట్) - Legal Documents in 15 Minutes | Government e-Stamp & Advocate Sign",
  description: "మీ న్యాయపరమైన పత్రాలు 15 నిమిషాల్లో రెడీ! Government e-Stamp తో. Advocate Sign తో. India's fastest legal document platform with Telugu & English support. Rent Agreement, Sale Deed, Will, Legal Notice & more.",
  keywords: "legal documents india, rent agreement online, sale deed, will, legal notice, affidavit, contract agreement india, lexmeet, తెలుగు, న్యాయ పత్రాలు, అద్దె ఒప్పందం, వీలునామా, lawyer verified, e-stamp, aadhaar esign",
  authors: [{ name: "LexMeet" }],
  creator: "LexMeet",
  publisher: "LexMeet",
  metadataBase: new URL("https://doc-mu-olive.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LexMeet (లెక్స్‌మీట్) - Legal Documents in 15 Minutes",
    description: "Your legal documents ready in 15 minutes with Government e-Stamp and Advocate signature. India's #1 legal document platform with Telugu & English support.",
    type: "website",
    locale: "te_IN",
    siteName: "LexMeet",
    url: "https://doc-mu-olive.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LexMeet - Legal Documents in 15 Minutes with Government e-Stamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexMeet (లెక్స్‌మీట్) - Legal Documents in 15 Minutes",
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
          <I18nProvider>
            {children}
            <Chatbot />
            <ToastProvider />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
