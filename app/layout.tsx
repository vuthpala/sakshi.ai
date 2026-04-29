import type { Metadata } from "next";
import { 
  Playfair_Display, 
  Inter, 
  Noto_Sans_Telugu,
  Noto_Sans_Tamil,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
} from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/chatbot";
import { AuthProvider } from "@/lib/auth-context";
import { AdminProvider } from "@/lib/admin-context";
import { LawyerProvider } from "@/lib/lawyer-context";
import { I18nProvider } from "@/components/i18n-provider";
import { ToastProvider } from "@/components/toast-provider";
import { NotificationProvider } from "@/lib/notification-context";

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

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoKannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoMalayalam = Noto_Sans_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakshi.ai — India's Legal Witness | Government e-Stamp & Advocate Sign",
  description: "Sakshi.ai — India's trusted legal document platform. Generate documents in 9 Indian languages, find verified lawyers near you, and get digitally signed documents in minutes.",
  keywords: "legal documents india, rent agreement online, sale deed, will, legal notice, affidavit, contract agreement india, sakshi, sakshi.ai, lawyer verified, e-stamp, aadhaar esign",
  authors: [{ name: "Sakshi.ai" }],
  creator: "Sakshi.ai",
  publisher: "Sakshi.ai",
  metadataBase: new URL("https://doc-mu-olive.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sakshi.ai — India's Legal Witness",
    description: "Sakshi.ai — India's trusted legal document platform. Generate documents in 9 Indian languages, find verified lawyers near you, and get digitally signed documents in minutes.",
    type: "website",
    locale: "te_IN",
    siteName: "Sakshi.ai",
    url: "https://doc-mu-olive.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sakshi.ai — India's Legal Witness - Legal Documents with Government e-Stamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakshi.ai — India's Legal Witness",
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
      <body className={`min-h-full bg-white font-sans ${playfair.variable} ${inter.variable} ${notoTelugu.variable} ${notoTamil.variable} ${notoKannada.variable} ${notoMalayalam.variable} ${notoBengali.variable} ${notoDevanagari.variable} ${notoGujarati.variable}`}>
        <AuthProvider>
          <AdminProvider>
            <LawyerProvider>
              <NotificationProvider>
                <I18nProvider>
                  {children}
                  <Chatbot />
                  <ToastProvider />
                </I18nProvider>
              </NotificationProvider>
            </LawyerProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
