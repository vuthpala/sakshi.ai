import { NextRequest, NextResponse } from "next/server";
import { generateRentAgreement } from "@/lib/claude";
import { supabase } from "@/lib/supabase";
import { RentAgreementFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { documentType, formData } = await request.json();

    if (!documentType || !formData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let generatedText = "";

    if (documentType === "rent-agreement") {
      generatedText = await generateRentAgreement(formData as RentAgreementFormData);
    } else {
      return NextResponse.json(
        { error: "Unsupported document type" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("documents")
      .insert({
        document_type: documentType,
        form_data: formData,
        generated_text: generatedText,
        payment_status: "pending",
        city: formData.property?.city || "",
        state: formData.property?.state || "",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save document" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      documentId: data.id,
      status: "success",
    });
  } catch (error) {
    console.error("Error generating document:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
