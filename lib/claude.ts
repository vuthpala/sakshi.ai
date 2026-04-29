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
  const propertyTypeDisplay = formData.property.propertyType.replace(/_/g, ' ');
  const furnishingDisplay = formData.property.furnishing.replace(/_/g, ' ');
  const durationDisplay = formData.terms.duration.replace(/_/g, ' ');
  const noticeDisplay = formData.terms.noticePeriod.replace(/_/g, ' ');
  const lockInDisplay = formData.terms.lockInPeriod.replace(/_/g, ' ');
  
  return `RENT AGREEMENT

This Rent Agreement (hereinafter referred to as "Agreement") is made and executed on this ${today} at ${formData.property.city}, ${formData.property.state}.


BETWEEN

${formData.landlord.fullName},
Residing at: ${formData.landlord.address}
Contact: ${formData.landlord.phoneNumber}${formData.landlord.aadhaarNumber ? `
Aadhaar: ${formData.landlord.aadhaarNumber}` : ''}

Hereinafter referred to as the "LESSOR" (which expression shall, unless repugnant to the context, meaning or import thereof, be deemed to include his/her heirs, legal representatives, successors and assigns) of the ONE PART;


AND

${formData.tenant.fullName},
Residing at: ${formData.tenant.permanentAddress}
Contact: ${formData.tenant.phoneNumber}${formData.tenant.aadhaarNumber ? `
Aadhaar: ${formData.tenant.aadhaarNumber}` : ''}

Hereinafter referred to as the "LESSEE" (which expression shall, unless repugnant to the context, meaning or import thereof, be deemed to include his/her heirs, legal representatives, successors and assigns) of the OTHER PART.


RECITALS

WHEREAS the Lessor is the sole and absolute owner of the ${propertyTypeDisplay} property situated at ${formData.property.address}, ${formData.property.city}, ${formData.property.state}, India, which is ${furnishingDisplay};

AND WHEREAS the Lessee has requested the Lessor to grant a lease of the said property for residential purposes, and the Lessor has agreed to grant such lease on the terms and conditions hereinafter set forth;

AND WHEREAS the Lessee has paid a security deposit and the first month's rent as consideration for entering into this Agreement;

NOW THEREFORE, in consideration of the mutual covenants, conditions, and agreements hereinafter contained, the Parties hereto agree as follows:


1. PREMISES
1.1 The Lessor hereby lets and the Lessee hereby hires the ${propertyTypeDisplay} property located at ${formData.property.address}, ${formData.property.city}, ${formData.property.state} (hereinafter referred to as the "Premises"), together with all fixtures, fittings, and appurtenances thereto.
1.2 The Premises shall be used exclusively for ${formData.property.propertyType === 'commercial_space' ? 'commercial' : 'residential'} purposes only.


2. TERM AND COMMENCEMENT
2.1 This Agreement shall commence with effect from ${formData.terms.startDate} ("Commencement Date").
2.2 The term of this Agreement shall be for a period of ${durationDisplay} from the Commencement Date.
2.3 Upon expiry of the said term, this Agreement may be renewed for a further period by mutual consent of both parties in writing.


3. MONTHLY RENT
3.1 The Lessee shall pay to the Lessor a monthly rent of Rs. ${formData.terms.monthlyRent}/- (Rupees ${rentInWords} Only) (hereinafter referred to as "Rent").
3.2 The Rent shall be payable in advance on or before the 5th day of each calendar month.
3.3 Payment shall be made by cash/cheque/online transfer to the Lessor's designated account.
3.4 In the event of delayed payment beyond the due date, the Lessee shall be liable to pay a late payment charge of Rs. 500/- per week or part thereof.
3.5 A grace period of 3 days shall be allowed for payment of Rent, after which the late payment charge shall apply.


4. SECURITY DEPOSIT
4.1 The Lessee has paid to the Lessor a sum of Rs. ${formData.terms.securityDeposit}/- (Rupees ${depositInWords} Only) as interest-free refundable security deposit (hereinafter referred to as "Deposit").
4.2 The Deposit is held by the Lessor as security for the due performance and observance by the Lessee of all terms and conditions of this Agreement.
4.3 The Deposit shall be refundable to the Lessee within 15 (fifteen) days from the date of handover of peaceful vacant possession of the Premises, after deducting any outstanding dues, damages, or amounts payable by the Lessee.
4.4 The Lessee shall not be entitled to adjust the Deposit against the Rent or any other charges payable under this Agreement.


5. MAINTENANCE CHARGES AND UTILITIES
${formData.terms.maintenanceCharges === 'included' ? `5.1 Monthly maintenance charges are included in the Rent and shall be paid by the Lessor to the Residents' Welfare Association (RWA) or Society.` : formData.terms.maintenanceCharges === 'tenant_pays' ? `5.1 Monthly maintenance charges shall be paid separately by the Lessee directly to the Residents' Welfare Association (RWA) or Society, over and above the Rent.` : `5.1 Monthly maintenance charges shall be paid by the Lessor to the Residents' Welfare Association (RWA) or Society.`}
5.2 ${formData.terms.electricityBillPayer === 'tenant' ? 'Electricity bills shall be in the name of the Lessee and shall be paid directly by the Lessee to the Electricity Board.' : 'Electricity bills shall remain in the name of the Lessor and the actual amount shall be reimbursed by the Lessee to the Lessor upon presentation of bills.'}
5.3 ${formData.terms.waterBillPayer === 'tenant' ? 'Water bills shall be paid directly by the Lessee to the concerned authority.' : 'Water bills shall be paid by the Lessor and reimbursed by the Lessee.'}
5.4 Any other government charges, taxes, or levies in respect of the Premises shall be borne by the Lessor.


6. USE OF PREMISES
6.1 The Premises shall be used strictly for ${formData.property.propertyType === 'commercial_space' ? 'commercial business' : 'bona fide residential'} purposes only.
6.2 ${formData.terms.petAllowed ? 'The Lessee may keep pets with the prior written consent of the Lessor, subject to compliance with society rules and regulations.' : 'The Lessee shall not keep any pets, animals, or birds in the Premises without the prior written consent of the Lessor.'}
6.3 ${formData.terms.sublettingAllowed ? 'The Lessee may sublet a portion of the Premises with the prior written consent of the Lessor, provided the Lessee remains responsible for all obligations under this Agreement.' : 'The Lessee shall not sublet, assign, transfer, or part with possession of the whole or any part of the Premises to any third party without the prior written consent of the Lessor.'}
6.4 The Lessee shall not use the Premises for any illegal, immoral, or unlawful activities, nor cause any nuisance or disturbance to the neighbors or other residents.
6.5 The Lessee shall not make any structural alterations, additions, or modifications to the Premises without the prior written consent of the Lessor. Any approved alterations shall be made at the Lessee's cost and shall become the property of the Lessor.


7. REPAIRS AND MAINTENANCE
7.1 The Lessor shall be responsible for all major structural repairs to the Premises, including repairs to the roof, external walls, and foundation.
7.2 The Lessee shall maintain the Premises in good and tenantable condition and shall be responsible for all minor repairs, including plumbing, electrical fittings, and internal maintenance.
7.3 The Lessee shall promptly report any defects or damages to the Lessor and shall permit the Lessor or authorized agents to enter the Premises for inspection and repairs with prior notice.


8. INSPECTION
8.1 The Lessor or their authorized representatives shall have the right to enter the Premises with 24 hours prior written notice for the purpose of inspection, repairs, or showing the property to prospective tenants.
8.2 In case of any emergency, the Lessor may enter the Premises without notice.


9. TERMINATION
9.1 Either party may terminate this Agreement by giving ${noticeDisplay} prior written notice to the other party.
9.2 Upon termination, the Lessee shall hand over peaceful vacant possession of the Premises to the Lessor in the same condition as received (fair wear and tear excepted).
9.3 The Lessor shall return the Deposit to the Lessee within 15 days after deducting any outstanding Rent, damages, or dues.
${formData.terms.lockInPeriod !== 'none' ? `
9.4 LOCK-IN PERIOD: This Agreement is subject to a lock-in period of ${lockInDisplay} from the Commencement Date. During this period, neither party shall terminate this Agreement except for breach of terms or under circumstances beyond control.` : ''}


10. DEFAULT AND CONSEQUENCES
10.1 If the Lessee fails to pay Rent for a period of two consecutive months, the Lessor shall have the right to terminate this Agreement and take possession of the Premises.
10.2 If the Lessee breaches any material term of this Agreement, the Lessor may serve a notice of 15 days requiring the Lessee to rectify the breach. If the breach is not rectified, the Lessor may terminate this Agreement.
10.3 Upon termination due to default by the Lessee, the Lessor shall be entitled to forfeit the Deposit and recover any outstanding amounts.


11. INDEMNITY
11.1 The Lessee shall indemnify and keep the Lessor harmless against any claims, demands, actions, or proceedings arising from the Lessee's use or occupation of the Premises.


12. DISPUTE RESOLUTION
12.1 Any dispute, difference, or claim arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the Courts at ${formData.property.city}, ${formData.property.state}, India.
12.2 The parties shall first attempt to resolve any dispute through amicable negotiation and mediation before resorting to legal proceedings.


13. ENTIRE AGREEMENT
13.1 This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, understandings, and agreements.
13.2 No modification, alteration, or amendment of this Agreement shall be valid unless made in writing and signed by both parties.


14. SEVERABILITY
14.1 If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.


IN WITNESS WHEREOF, the parties have executed this Agreement on the date first above written at ${formData.property.city}, ${formData.property.state}.


___________________________                    ___________________________
Signature of LESSOR                              Signature of LESSEE

Name: ${formData.landlord.fullName}                  Name: ${formData.tenant.fullName}
Date: ${today}                                        Date: ${today}


WITNESS 1:

Name: ___________________________
Signature: ___________________________
Address: ___________________________


WITNESS 2:

Name: ___________________________
Signature: ___________________________
Address: ___________________________


---
[DEMO MODE: This is a template document generated by Sakshi.ai. For legally compliant and customized documents, configure Anthropic API key in .env.local]`;
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
