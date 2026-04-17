"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mx-auto mb-6">
            <FileQuestion className="h-10 w-10 text-blue-900" />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-slate-600 max-w-md mx-auto mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/documents">
              <Button variant="outline">
                Browse Documents
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
