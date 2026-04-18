import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import "@/lib/i18n";
import { Chatbot } from "@/components/chatbot";
import { AuthProvider } from "@/lib/auth-context";

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
  title: "LexMeet (లెక్స్‌మీట్) - Legal Documents in 15 Minutes",
  description: "మీ న్యాయపరమైన పత్రాలు 15 నిమిషాల్లో రెడీ! Government e-Stamp తో. Advocate Sign తో. India's fastest legal document platform with Telugu & English support.",
  keywords: "legal documents india, rent agreement online, sale deed, will, legal notice, affidavit, contract agreement india, lexmeet, తెలుగు, న్యాయ పత్రాలు",
  openGraph: {
    title: "LexMeet (లెక్స్‌మీట్) - Legal Documents in 15 Minutes",
    description: "Your legal documents ready in 15 minutes with Government e-Stamp and Advocate signature.",
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
      lang="te"
      className={`${playfair.variable} ${inter.variable} ${notoTelugu.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans">
        <AuthProvider>
          {children}
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
