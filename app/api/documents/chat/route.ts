import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const DOCUMENT_FIELDS: Record<string, Record<string, string>> = {
  "rent-agreement": {
    propertyAddress: "Complete address of the property being rented",
    monthlyRent: "Monthly rent amount in rupees",
    rentalStartDate: "When the rental period begins (date)",
    rentalEndDate: "When the rental period ends (date)",
    securityDeposit: "Security deposit amount in rupees",
    landlordName: "Full name of the landlord/owner",
    tenantName: "Full name of the tenant",
    specialTerms: "Any special terms like parking, pets, maintenance responsibilities",
  },
  "employment-offer": {
    companyName: "Name of the company",
    employeeName: "Full name of the employee",
    position: "Job title/position",
    salary: "Monthly or annual salary",
    startDate: "Employment start date",
    workLocation: "Work location or if remote",
  },
  "nda": {
    disclosingParty: "Name of the party sharing confidential information",
    receivingParty: "Name of the party receiving confidential information",
    purpose: "Purpose for sharing the information",
    duration: "How long the NDA lasts",
    governingLaw: "Which state/country law governs the agreement",
  },
  "freelance-contract": {
    clientName: "Name of the client",
    freelancerName: "Name of the freelancer",
    projectDescription: "Description of the work to be done",
    paymentAmount: "Total payment amount",
    deadline: "Project completion deadline",
  },
  "sale-agreement": {
    sellerName: "Name of the seller",
    buyerName: "Name of the buyer",
    itemDescription: "Description of the item being sold",
    salePrice: "Price of the item",
    deliveryTerms: "How and when delivery will happen",
  },
  "partnership-deed": {
    partnershipName: "Name of the partnership firm",
    partner1Name: "Name of first partner",
    partner2Name: "Name of second partner",
    businessNature: "Nature of the business",
    capitalContribution: "Capital contribution of each partner",
  },
};

const GREETINGS: Record<string, Record<string, string>> = {
  english: {
    "rent-agreement": "Hello! I'll help you create your Rent Agreement. Let me ask you a few quick questions to generate a legally valid document.",
    "employment-offer": "Hello! I'll help you create an Employment Offer Letter. Let me gather the necessary details.",
    "nda": "Hello! I'll help you create a Non-Disclosure Agreement. Let's start with some basic information.",
    "freelance-contract": "Hello! I'll help you create a Freelance Contract. I'll ask you about the project details.",
    "sale-agreement": "Hello! I'll help you create a Sale Agreement. Let me collect the transaction details.",
    "partnership-deed": "Hello! I'll help you create a Partnership Deed. Let's gather the partnership information.",
  },
  hindi: {
    "rent-agreement": "नमस्ते! मैं आपका किराया समझौता बनाने में मदद करूंगा। कृपया मुझे कुछ जानकारी दें।",
    "employment-offer": "नमस्ते! मैं आपका नियुक्ति पत्र बनाने में मदद करूंगा।",
    "nda": "नमस्ते! मैं आपका गोपनीयता समझौता बनाने में मदद करूंगा।",
    "freelance-contract": "नमस्ते! मैं आपका फ्रीलांस अनुबंध बनाने में मदद करूंगा।",
    "sale-agreement": "नमस्ते! मैं आपका बिक्री समझौता बनाने में मदद करूंगा।",
    "partnership-deed": "नमस्ते! मैं आपका साझेदारी विलेख बनाने में मदद करूंगा।",
  },
  telugu: {
    "rent-agreement": "నమస్తే! నేను మీ అద్దేకం ఒప్పందాన్ని తయారు చేయడంలో సహాయం చేస్తాను.",
  },
  tamil: {
    "rent-agreement": "வணக்கம்! நான் உங்கள் வாடகை ஒப்பந்தத்தை உருவாக்க உதவுவேன்.",
  },
  kannada: {
    "rent-agreement": "ನಮಸ್ತೆ! ನಾನು ನಿಮ್ಮ ಬಾಡಿಗೆ ಒಪ್ಪಂದವನ್ನು ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
  },
  malayalam: {
    "rent-agreement": "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ വാടക കരാർ തയ്യാറാക്കാൻ സഹായിക്കാം.",
  },
};

export async function POST(request: NextRequest) {
  try {
    const {
      document_type,
      language = "english",
      conversation_history = [],
      user_message,
      collected_data = {},
      is_initial = false,
    } = await request.json();

    const fields = DOCUMENT_FIELDS[document_type] || DOCUMENT_FIELDS["rent-agreement"];
    const fieldNames = Object.keys(fields);
    const missingFields = fieldNames.filter(
      (field) => !collected_data[field] || collected_data[field] === ""
    );

    // If we have all required data, return complete
    if (missingFields.length === 0 && !is_initial) {
      return NextResponse.json({
        complete: true,
        document_data: collected_data,
        message: "Perfect! I have all the information needed. Generating your document now...",
      });
    }

    // Build system prompt
    const systemPrompt = `You are a helpful legal document assistant for Sakshi.ai, an Indian legal document platform.

Document Type: ${document_type.replace(/-/g, " ")}
Language: ${language}

Required Information:
${Object.entries(fields)
  .map(([key, desc]) => `- ${key}: ${desc}`)
  .join("\n")}

Already Collected:
${Object.entries(collected_data)
  .filter(([_, val]) => val)
  .map(([key, val]) => `- ${key}: ${val}`)
  .join("\n") || "None yet"}

Missing Information:
${missingFields.map((field) => `- ${field}: ${fields[field]}`).join("\n")}

Instructions:
1. Be conversational, friendly, and professional
2. Ask ONE question at a time to collect missing information
3. Acknowledge what the user has already provided
4. If the user provides multiple pieces of information, extract all of them
5. When asking about dates, request in DD/MM/YYYY format
6. When all information is collected, indicate completion
7. Respond in ${language} language
8. Keep responses concise but warm
9. If user asks to edit something, acknowledge and update accordingly

${language !== "english" ? `IMPORTANT: Respond entirely in ${language} language.` : ""}`;

    // Prepare messages for Claude
    const messages: any[] = [];
    
    if (is_initial) {
      // For initial greeting, just ask the first question
      const firstMissingField = missingFields[0];
      const greeting = GREETINGS[language]?.[document_type] || GREETINGS.english[document_type];
      
      return NextResponse.json({
        complete: false,
        message: `${greeting}\n\nLet me start by asking: ${fields[firstMissingField]}?`,
        extracted_data: {},
        next_field: firstMissingField,
      });
    }

    // Build conversation history
    for (const msg of conversation_history.slice(-10)) {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: user_message,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    });

    const aiResponse = response.content[0].type === "text" ? response.content[0].text : "";

    // Extract data from user message using a simple extraction prompt
    const extractionPrompt = `Extract structured data from this user message for a ${document_type}.

User message: "${user_message}"

Possible fields to extract:
${missingFields.map((f) => `- ${f}: ${fields[f]}`).join("\n")}

Respond ONLY with a JSON object containing the extracted fields. Use empty string if not found.
Example: {"monthlyRent": "15000", "landlordName": "John Doe"}

JSON:`;

    const extractionResponse = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 500,
      messages: [{ role: "user", content: extractionPrompt }],
    });

    const extractionText = extractionResponse.content[0].type === "text" 
      ? extractionResponse.content[0].text 
      : "{}";

    let extractedData = {};
    try {
      // Clean up the response to get valid JSON
      const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse extracted data:", e);
    }

    // Merge with existing collected data
    const updatedData = { ...collected_data, ...extractedData };
    
    // Check if we now have all required fields
    const stillMissing = fieldNames.filter(
      (field) => !updatedData[field] || updatedData[field] === ""
    );

    return NextResponse.json({
      complete: stillMissing.length === 0,
      message: aiResponse,
      extracted_data: extractedData,
      document_data: stillMissing.length === 0 ? updatedData : undefined,
      next_field: stillMissing.length > 0 ? stillMissing[0] : undefined,
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
