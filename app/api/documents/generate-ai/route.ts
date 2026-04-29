import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const DOCUMENT_PROMPTS: Record<string, (data: any) => string> = {
  "rent-agreement": (data) => `Generate a comprehensive Rent Agreement for India based on these details:

LANDLORD DETAILS:
- Name: ${data.landlord?.fullName}
- Address: ${data.landlord?.address}
- Phone: ${data.landlord?.phoneNumber}

TENANT DETAILS:
- Name: ${data.tenant?.fullName}
- Address: ${data.tenant?.permanentAddress}
- Phone: ${data.tenant?.phoneNumber}

PROPERTY DETAILS:
- Address: ${data.property?.address}
- City: ${data.property?.city}
- State: ${data.property?.state}
- Type: ${data.property?.propertyType}
- Furnishing: ${data.property?.furnishing}

AGREEMENT TERMS:
- Monthly Rent: ₹${data.terms?.monthlyRent}
- Security Deposit: ₹${data.terms?.securityDeposit}
- Duration: ${data.terms?.duration}
- Start Date: ${data.terms?.startDate}
- Notice Period: ${data.terms?.noticePeriod}
- Lock-in Period: ${data.terms?.lockInPeriod}
- Maintenance: ${data.terms?.maintenanceCharges}
- Electricity Bill: ${data.terms?.electricityBillPayer}
- Water Bill: ${data.terms?.waterBillPayer}
- Pets Allowed: ${data.terms?.petAllowed ? "Yes" : "No"}
- Subletting: ${data.terms?.sublettingAllowed ? "Yes" : "No"}

Create a professional, legally sound rent agreement suitable for Indian jurisdiction. Include standard clauses about maintenance, repairs, dispute resolution, and termination. Format with clear sections, proper legal language, and signature blocks.`,

  "power-of-attorney": (data) => `Generate a Power of Attorney document for India:

PRINCIPAL (Donor):
- Name: ${data.principalName}
- Address: ${data.principalAddress}
- Aadhaar: ${data.principalAadhaar || "Not provided"}

ATTORNEY (Donee):
- Name: ${data.attorneyName}
- Address: ${data.attorneyAddress}
- Aadhaar: ${data.attorneyAadhaar || "Not provided"}

PROPERTY/SCOPE:
- Description: ${data.propertyDescription}

POWERS GRANTED:
${data.powers?.map((p: string) => `- ${p}`).join("\n")}

EFFECTIVE DATE: ${data.effectiveDate}
STATE: ${data.state}

Create a comprehensive Power of Attorney document compliant with Indian law (Power of Attorney Act, 1882). Include all necessary clauses, revocation terms, and signature blocks.`,

  "gift-deed": (data) => `Generate a Gift Deed for India:

DONOR:
- Name: ${data.donorName}
- Address: ${data.donorAddress}
- Aadhaar: ${data.donorAadhaar || "Not provided"}

DONEE:
- Name: ${data.doneeName}
- Address: ${data.doneeAddress}
- Aadhaar: ${data.doneeAadhaar || "Not provided"}
- Relationship: ${data.doneeRelation}

PROPERTY DETAILS:
- Description: ${data.propertyDescription}
- Value: ₹${data.propertyValue || "Not specified"}

GIFT DATE: ${data.giftDate}
STATE: ${data.state}

Create a legally valid Gift Deed under the Transfer of Property Act, 1882. Include declaration of love and affection, acceptance clause, and all standard provisions for registration.`,

  "legal-notice": (data) => `Generate a Legal Notice for India:

SENDER:
- Name: ${data.senderName}
- Address: ${data.senderAddress}
- Phone: ${data.senderPhone}

RECIPIENT:
- Name: ${data.recipientName}
- Address: ${data.recipientAddress}
- Phone: ${data.recipientPhone}

NOTICE DETAILS:
- Type: ${data.noticeType}
- Date: ${data.noticeDate}
- Response Time: ${data.timeLimit} days

GRIEVANCE:
${data.grievanceDetails}

RELIEF SOUGHT:
${data.reliefSought}

Create a formal legal notice following the format used by Indian advocates. Include sender details, recipient details, cause of action, relief sought, and warning of legal action. Professional legal tone required.`,

  "affidavit": (data) => `Generate an Affidavit for India:

DEPONENT (Affiant):
- Name: ${data.affiantName}
- Age: ${data.affiantAge}
- Occupation: ${data.affiantOccupation || "Not specified"}
- Address: ${data.affiantAddress}
- Aadhaar: ${data.affiantAadhaar || "Not provided"}

AFFIDAVIT TYPE: ${data.affidavitType}

STATEMENT:
${data.statementDetails}

PURPOSE: ${data.purpose}

SWORN DATE: ${data.swornDate}
PLACE: ${data.place}

Create a sworn affidavit in the standard format used in Indian courts. Include verification clause, oath statement, and signature blocks for deponent and notary/oath commissioner.`,

  "nda": (data) => `Generate a Non-Disclosure Agreement (NDA) for India:

DISCLOSING PARTY:
- Name: ${data.disclosingPartyName || "Party A"}
- Address: ${data.disclosingPartyAddress || "Address"}

RECEIVING PARTY:
- Name: ${data.receivingPartyName || "Party B"}
- Address: ${data.receivingPartyAddress || "Address"}

AGREEMENT DETAILS:
- Effective Date: ${data.effectiveDate}
- Duration: ${data.duration || "3 years"}
- Jurisdiction: ${data.jurisdiction || "India"}

Create a comprehensive Non-Disclosure Agreement under Indian Contract Act, 1872. Include definition of confidential information, obligations, exceptions, term, return of information, remedies, and signature blocks.`,

  "freelance-contract": (data) => `Generate a Freelance Agreement for India:

CLIENT:
- Name: ${data.clientName}
- Address: ${data.clientAddress}

FREELANCER:
- Name: ${data.freelancerName}
- Address: ${data.freelancerAddress}

PROJECT DETAILS:
- Description: ${data.projectDescription}
- Deliverables: ${data.deliverables}

PAYMENT TERMS:
- Total Amount: ₹${data.totalAmount}
- Payment Schedule: ${data.paymentSchedule}

TIMELINE:
- Start Date: ${data.startDate}
- End Date: ${data.endDate}

Create a professional freelance service agreement under Indian Contract Act. Include scope of work, payment terms, intellectual property rights, confidentiality, termination, and dispute resolution clauses.`,

  "partnership-deed": (data) => `Generate a Partnership Deed for India:

FIRM DETAILS:
- Name: ${data.firmName}
- Business: ${data.businessNature}
- Address: ${data.firmAddress}

PARTNERS:
${data.partners?.map((p: any, i: number) => `
Partner ${i + 1}:
- Name: ${p.name}
- Address: ${p.address}
- Capital Contribution: ₹${p.capital}
- Profit Share: ${p.profitShare}%
`).join("\n")}

AGREEMENT DETAILS:
- Duration: ${data.duration}
- Start Date: ${data.startDate}

Create a comprehensive Partnership Deed under the Indian Partnership Act, 1932. Include capital contributions, profit/loss sharing, partner duties, retirement, dissolution, and dispute resolution.`,

  "sale-agreement": (data) => `Generate a Sale Agreement for India:

SELLER:
- Name: ${data.sellerName}
- Address: ${data.sellerAddress}

BUYER:
- Name: ${data.buyerName}
- Address: ${data.buyerAddress}

PROPERTY DETAILS:
- Description: ${data.propertyDescription}
- Sale Price: ₹${data.salePrice}

PAYMENT TERMS:
- Advance: ₹${data.advanceAmount || "0"}
- Balance: ₹${data.balanceAmount || data.salePrice}
- Payment Timeline: ${data.paymentTimeline}

Create a comprehensive Sale Agreement under the Sale of Goods Act, 1930 or Transfer of Property Act, 1882. Include property details, consideration, payment terms, possession, title transfer, representations, and default clauses.`,

  default: (data) => `Generate a legal document based on these details:

DOCUMENT TYPE: ${data.documentType || "Legal Document"}

PARTY 1:
${JSON.stringify(data.party1 || {}, null, 2)}

PARTY 2:
${JSON.stringify(data.party2 || {}, null, 2)}

DETAILS:
${JSON.stringify(data.details || data, null, 2)}

Create a professional, legally comprehensive document suitable for Indian jurisdiction. Include all necessary clauses, legal provisions, and signature blocks.`,
};

// Language-specific system prompt additions
const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  english: "",
  hindi: "Generate this document in HINDI (हिंदी). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Hindi.",
  telugu: "Generate this document in TELUGU (తెలుగు). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Telugu.",
  tamil: "Generate this document in TAMIL (தமிழ்). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Tamil.",
  kannada: "Generate this document in KANNADA (ಕನ್ನಡ). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Kannada.",
  malayalam: "Generate this document in MALAYALAM (മലയാളം). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Malayalam.",
  bengali: "Generate this document in BENGALI (বাংলা). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Bengali.",
  marathi: "Generate this document in MARATHI (मराठी). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Marathi.",
  gujarati: "Generate this document in GUJARATI (ગુજરાતી). Use formal legal terminology appropriate for Indian courts. Keep all numbers, dates, and amounts in standard format. Include party names in both English and Gujarati.",
};

export async function POST(request: NextRequest) {
  try {
    const { documentType, formData, language = "english" } = await request.json();

    if (!documentType || !formData) {
      return NextResponse.json(
        { error: "Missing required fields: documentType and formData" },
        { status: 400 }
      );
    }

    // Get the appropriate prompt function
    const promptFn = DOCUMENT_PROMPTS[documentType] || DOCUMENT_PROMPTS.default;
    const prompt = promptFn(formData);

    // Build system prompt with language instructions
    let systemPrompt = `You are an expert Indian legal document drafter with 20+ years of experience. You create professional, legally sound documents that comply with Indian laws and are suitable for registration/notarization where applicable.

Guidelines:
1. Use formal legal language appropriate for Indian jurisdiction
2. Include all necessary statutory references
3. Add appropriate witness clauses and signature blocks
4. Include eStamp paper references where applicable
5. Format with clear sections and numbering
6. Use proper legal terminology and standard clauses
7. Include dispute resolution mechanisms (arbitration/mediation)
8. Add jurisdiction clauses (courts of competent jurisdiction)
9. Include force majeure and termination clauses where relevant
10. Ensure the document is comprehensive and legally enforceable`;

    // Add language-specific instructions
    if (language !== "english" && LANGUAGE_INSTRUCTIONS[language]) {
      systemPrompt += "\n\n" + LANGUAGE_INSTRUCTIONS[language];
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4000,
      temperature: 0.3,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const generatedContent = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      success: true,
      documentType,
      language,
      generatedContent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI document generation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate document",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
