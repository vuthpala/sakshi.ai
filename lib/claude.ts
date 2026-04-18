import Anthropic from "@anthropic-ai/sdk";
import { RentAgreementFormData } from "@/types";
import { CONFIG } from "./config";

const apiKey = CONFIG.ANTHROPIC.API_KEY;

const anthropic = apiKey 
  ? new Anthropic({ apiKey })
  : null;

const RENT_AGREEMENT_SYSTEM_PROMPT = `You are an expert Indian legal document drafting assistant with deep knowledge of Indian Contract Act 1872, Transfer of Property Act 1882, and state-specific tenancy laws.

Generate a complete, legally worded Rent Agreement in formal legal English based on the details provided.

The document must include:
1. Title: RENT AGREEMENT
2. Date and place of execution
3. Parties section (Landlord as "LESSOR", Tenant as "LESSEE")
4. Recitals / Background
5. Property description clause
6. Term and commencement clause
7. Rent and payment terms clause
8. Security deposit clause
9. Utilities and maintenance clause
10. Rules and restrictions clause (pets, subletting, modifications)
11. Termination and notice period clause
12. Lock-in period clause (if applicable)
13. Dispute resolution clause (jurisdiction based on city/state)
14. General terms and conditions (10-12 standard clauses)
15. Signature block for both parties with date, place, witness 1, witness 2

IMPORTANT RULES:
- Use formal legal language throughout
- Add "WHEREAS" and "NOW THEREFORE" in recitals
- Number every clause properly (1.1, 1.2, 2.1 etc)
- Add jurisdiction clause based on the city provided
- All amounts must appear in both numbers AND words
  Example: Rs. 15,000/- (Rupees Fifteen Thousand Only)
- Add standard clauses about property maintenance, no illegal activities, right of inspection
- End with proper execution block
- Total document should be 1200-1800 words
- Do NOT add any commentary before or after the document
- Output ONLY the legal document text, nothing else`;

export async function generateRentAgreement(formData: RentAgreementFormData): Promise<string> {
  const userPrompt = `Generate a Rent Agreement with these details:

LANDLORD: ${formData.landlord.fullName}, residing at ${formData.landlord.address}, Phone: ${formData.landlord.phoneNumber}${formData.landlord.aadhaarNumber ? `, Aadhaar: ${formData.landlord.aadhaarNumber}` : ''}

TENANT: ${formData.tenant.fullName}, residing at ${formData.tenant.permanentAddress}, Phone: ${formData.tenant.phoneNumber}${formData.tenant.aadhaarNumber ? `, Aadhaar: ${formData.tenant.aadhaarNumber}` : ''}

PROPERTY: ${formData.property.address}, ${formData.property.city}, ${formData.property.state}
Type: ${formData.property.propertyType.replace('_', ' ')}
Furnishing: ${formData.property.furnishing.replace('_', ' ')}

TERMS:
- Monthly Rent: Rs. ${formData.terms.monthlyRent}/-
- Security Deposit: Rs. ${formData.terms.securityDeposit}/-
- Start Date: ${formData.terms.startDate}
- Duration: ${formData.terms.duration.replace('_', ' ')}
- Notice Period: ${formData.terms.noticePeriod.replace('_', ' ')}
- Lock-in Period: ${formData.terms.lockInPeriod.replace('_', ' ')}
- Maintenance: ${formData.terms.maintenanceCharges.replace('_', ' ')}
- Electricity: Paid by ${formData.terms.electricityBillPayer}
- Water: Paid by ${formData.terms.waterBillPayer}
- Pets Allowed: ${formData.terms.petAllowed ? 'Yes' : 'No'}
- Subletting Allowed: ${formData.terms.sublettingAllowed ? 'Yes' : 'No'}`;

  if (!anthropic) {
    // Demo mode: Generate mock Rent Agreement without AI
    return generateMockRentAgreement(formData);
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    system: RENT_AGREEMENT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const content = response.content[0];
  if (content.type === "text") {
    return content.text;
  }
  
  throw new Error("Failed to generate document text");
}

// Demo mode: Generate a mock Rent Agreement without AI
function generateMockRentAgreement(formData: RentAgreementFormData): string {
  const today = new Date().toLocaleDateString('en-IN');
  const rentInWords = numberToWords(formData.terms.monthlyRent);
  const depositInWords = numberToWords(formData.terms.securityDeposit);
  
  return `RENT AGREEMENT

Date: ${today}
Place: ${formData.property.city}, ${formData.property.state}

PARTIES:

THIS RENT AGREEMENT is made and executed on this ${today} at ${formData.property.city}, ${formData.property.state}.

BETWEEN

${formData.landlord.fullName}, residing at ${formData.landlord.address}, hereinafter referred to as the "LESSOR" (which expression shall unless repugnant to the context mean and include his/her heirs, legal representatives, successors and assigns) of the ONE PART;

AND

${formData.tenant.fullName}, residing at ${formData.tenant.permanentAddress}, hereinafter referred to as the "LESSEE" (which expression shall unless repugnant to the context mean and include his/her heirs, legal representatives, successors and assigns) of the OTHER PART.

The Lessor and Lessee are hereinafter individually referred to as "Party" and collectively as "Parties".


RECITALS:

WHEREAS the Lessor is the absolute owner of the property situated at ${formData.property.address}, ${formData.property.city}, ${formData.property.state}, being a ${formData.property.propertyType.replace('_', ' ')} property with ${formData.property.furnishing.replace('_', ' ')} furnishing.

AND WHEREAS the Lessee has approached the Lessor to take on rent the said property for residential/commercial purposes.

AND WHEREAS the Lessor has agreed to let out the said property to the Lessee on the terms and conditions hereinafter mentioned.

NOW THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth, the Parties agree as follows:


1. PROPERTY DESCRIPTION
1.1 The property is situated at: ${formData.property.address}, ${formData.property.city}, ${formData.property.state}
1.2 Property Type: ${formData.property.propertyType.replace('_', ' ')}
1.3 Furnishing Status: ${formData.property.furnishing.replace('_', ' ')}

2. TERM AND COMMENCEMENT
2.1 This Agreement shall commence from ${formData.terms.startDate}.
2.2 The duration of this Agreement shall be ${formData.terms.duration.replace('_', ' ')}.
2.3 The Agreement may be renewed by mutual consent of both parties.

3. RENT AND PAYMENT TERMS
3.1 The monthly rent is fixed at Rs. ${formData.terms.monthlyRent}/- (Rupees ${rentInWords} Only).
3.2 The rent shall be paid by the ${formData.terms.monthlyRent}th day of each calendar month.
3.3 Rent shall be paid via bank transfer/cash/cheque as mutually agreed.
3.4 Late payment beyond 5 days shall attract interest at 2% per month.

4. SECURITY DEPOSIT
4.1 The Lessee has paid a security deposit of Rs. ${formData.terms.securityDeposit}/- (Rupees ${depositInWords} Only).
4.2 The security deposit shall be refunded within 15 days of vacation of the property, after deduction of any dues.
4.3 The security deposit shall not carry any interest.

5. UTILITIES AND MAINTENANCE
5.1 ${formData.terms.electricityBillPayer === 'tenant' ? 'The Lessee shall pay all electricity bills directly to the concerned authority.' : 'The Lessor shall pay all electricity bills.'}
5.2 ${formData.terms.waterBillPayer === 'tenant' ? 'The Lessee shall pay all water bills directly to the concerned authority.' : 'The Lessor shall pay all water bills.'}
5.3 ${formData.terms.maintenanceCharges === 'included' ? 'Maintenance charges are included in the monthly rent.' : formData.terms.maintenanceCharges === 'tenant_pays' ? 'The Lessee shall pay all maintenance charges separately.' : 'The Lessor shall pay all maintenance charges.'}

6. RULES AND RESTRICTIONS
6.1 The property shall be used strictly for ${formData.property.propertyType === 'commercial_space' ? 'commercial' : 'residential'} purposes only.
6.2 ${formData.terms.petAllowed ? 'Pets are allowed with prior written consent of the Lessor.' : 'No pets are allowed in the property without prior written consent of the Lessor.'}
6.3 ${formData.terms.sublettingAllowed ? 'Subletting is permitted with prior written consent of the Lessor.' : 'The Lessee shall not sublet, assign, or transfer this Agreement to any third party without prior written consent of the Lessor.'}
6.4 No structural alterations or modifications shall be made without written consent of the Lessor.
6.5 The Lessee shall not engage in any illegal activities on the premises.

7. TERMINATION AND NOTICE PERIOD
7.1 Either party may terminate this Agreement by giving ${formData.terms.noticePeriod.replace('_', ' ')} notice in writing.
7.2 The Lessee shall hand over peaceful possession of the property on termination.
7.3 The Lessor has the right to inspect the property with prior notice.

8. LOCK-IN PERIOD
${formData.terms.lockInPeriod === 'none' ? '8.1 There is no lock-in period for this Agreement.' : `8.1 There is a lock-in period of ${formData.terms.lockInPeriod.replace('_', ' ')} from the commencement date. Neither party can terminate during this period.`}

9. DISPUTE RESOLUTION
9.1 Any dispute arising from this Agreement shall be subject to the jurisdiction of courts at ${formData.property.city}, ${formData.property.state}.
9.2 The parties shall first attempt to resolve disputes through amicable negotiation.

10. GENERAL TERMS
10.1 This Agreement constitutes the entire understanding between the parties.
10.2 Any amendment must be in writing and signed by both parties.
10.3 The Lessee shall maintain the property in good condition.
10.4 The Lessee shall allow the Lessor or authorized agents to inspect the property with 24 hours notice.
10.5 The Lessee shall not cause nuisance or disturbance to neighbors.
10.6 All fixtures and fittings shall remain the property of the Lessor.
10.7 The Lessee shall pay for any damages caused by negligence.
10.8 The Lessor shall ensure peaceful enjoyment of the property by the Lessee.
10.9 No waiver of any breach shall be deemed a waiver of subsequent breaches.
10.10 If any clause is found invalid, the remaining Agreement shall continue in force.


IN WITNESS WHEREOF, the parties have set their hands on this ${today} at ${formData.property.city}, ${formData.property.state}.


LESSOR (LANDLORD):

Signature: _______________________

Name: ${formData.landlord.fullName}

Date: ${today}

Phone: ${formData.landlord.phoneNumber}


LESSEE (TENANT):

Signature: _______________________

Name: ${formData.tenant.fullName}

Date: ${today}

Phone: ${formData.tenant.phoneNumber}


WITNESS 1:

Signature: _______________________

Name: _______________________

Address: _______________________


WITNESS 2:

Signature: _______________________

Name: _______________________

Address: _______________________


---
[DEMO MODE: This is a template document. For legally compliant documents, configure Anthropic API key in .env.local]`;
}

// Helper function to convert numbers to words
function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
  function convert(n: number): string {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convert(n % 100) : '');
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convert(n % 1000) : '');
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + convert(n % 100000) : '');
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + convert(n % 10000000) : '');
  }
  
  return convert(num);
}
