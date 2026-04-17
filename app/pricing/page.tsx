"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Preview documents",
    features: [
      "Preview any document type",
      "Watermarked preview",
      "No downloads",
      "Basic support",
    ],
    cta: "Get Started",
    href: "/documents",
    popular: false,
  },
  {
    name: "Single Document",
    price: "$4.99",
    description: "Per document",
    features: [
      "Generate any document",
      "Full PDF download",
      "Valid for 30 days",
      "Email support",
    ],
    cta: "Generate Document",
    href: "/documents",
    popular: false,
  },
  {
    name: "Unlimited",
    price: "$49.99",
    period: "/year",
    description: "Best value",
    features: [
      "Unlimited documents",
      "All 40+ document types",
      "Priority support",
      "Save drafts",
      "Document history",
    ],
    cta: "Get Unlimited",
    href: "/documents",
    popular: true,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 py-16 md:py-24">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Choose the plan that works for you. No hidden fees, no surprises. Cancel anytime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col ${
                    plan.popular
                      ? "border-orange-500 shadow-lg scale-105"
                      : "border-slate-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        BEST VALUE
                      </span>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-slate-900">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-slate-500">{plan.period}</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={plan.href} className="w-full">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-slate-900 hover:bg-slate-800"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Are these documents legally valid?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Yes, our documents are drafted using AI trained on international legal standards. 
                    However, we recommend having important documents reviewed by a local lawyer 
                    to ensure compliance with your specific jurisdiction.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Can I edit the document after generation?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Once you download the PDF, you can print it and make handwritten amendments 
                    with both parties' initials. For major changes, regenerate the document.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    What payment methods are accepted?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    We accept all major credit/debit cards, PayPal, and various local payment methods 
                    depending on your region. All payments are secure and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
