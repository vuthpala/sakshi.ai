"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

export default function EmploymentOfferPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50 py-12">
        <div className="container mx-auto max-w-2xl px-4 md:px-6">
          <Link href="/documents">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documents
            </Button>
          </Link>

          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mx-auto mb-4">
                <Construction className="h-8 w-8 text-orange-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Coming Soon
              </h1>
              
              <p className="text-slate-600 mb-6">
                The Employment Offer Letter form is currently under development. 
                Please try our Rent Agreement document which is fully functional.
              </p>

              <Link href="/documents/rent-agreement">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Try Rent Agreement
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
