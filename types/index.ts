export interface DocumentType {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
}

export interface LandlordDetails {
  fullName: string;
  aadhaarNumber?: string;
  address: string;
  phoneNumber: string;
}

export interface TenantDetails {
  fullName: string;
  aadhaarNumber?: string;
  permanentAddress: string;
  phoneNumber: string;
}

export interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  propertyType: 'residential_flat' | 'independent_house' | 'pg_room' | 'commercial_space';
  furnishing: 'fully_furnished' | 'semi_furnished' | 'unfurnished';
}

export interface AgreementTerms {
  monthlyRent: number;
  securityDeposit: number;
  startDate: string;
  duration: '11_months' | '1_year' | '2_years';
  noticePeriod: '1_month' | '2_months' | '3_months';
  lockInPeriod: 'none' | '3_months' | '6_months';
  maintenanceCharges: 'included' | 'tenant_pays' | 'landlord_pays';
  electricityBillPayer: 'tenant' | 'landlord';
  waterBillPayer: 'tenant' | 'landlord';
  petAllowed: boolean;
  sublettingAllowed: boolean;
}

export interface RentAgreementFormData {
  landlord: LandlordDetails;
  tenant: TenantDetails;
  property: PropertyDetails;
  terms: AgreementTerms;
}

export interface GeneratedDocument {
  id: string;
  documentType: string;
  formData: RentAgreementFormData;
  generatedText: string;
  paymentStatus: 'pending' | 'paid';
  razorpayPaymentId?: string;
  createdAt: string;
  city: string;
  state: string;
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

// Featured Documents (shown on homepage)
export const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: 'rent-agreement',
    name: 'Rent Agreement',
    icon: 'Home',
    price: 49,
    description: 'Legally binding rental contract for residential or commercial properties',
  },
  {
    id: 'freelance-contract',
    name: 'Freelance Contract',
    icon: 'Briefcase',
    price: 49,
    description: 'Service agreement between freelancer and client with payment terms',
  },
  {
    id: 'nda',
    name: 'NDA (Non-Disclosure)',
    icon: 'Shield',
    price: 49,
    description: 'Protect confidential information with a legally enforceable NDA',
  },
  {
    id: 'employment-offer',
    name: 'Employment Offer Letter',
    icon: 'UserCheck',
    price: 49,
    description: 'Formal job offer with compensation, benefits, and joining terms',
  },
  {
    id: 'sale-agreement',
    name: 'Sale Agreement',
    icon: 'ShoppingCart',
    price: 49,
    description: 'Contract for sale of goods, assets, or property with payment terms',
  },
  {
    id: 'partnership-deed',
    name: 'Partnership Deed',
    icon: 'Users',
    price: 49,
    description: 'Define partnership terms, profit sharing, and responsibilities',
  },
];

// All Available Documents - REAL Indian Legal Documents
export const ALL_DOCUMENT_TYPES: DocumentType[] = [
  // ===== PROPERTY & REAL ESTATE (Most Popular) =====
  {
    id: 'rent-agreement',
    name: 'Rent Agreement',
    icon: 'Home',
    price: 49,
    description: 'Residential rental agreement as per Indian Contract Act & state tenancy laws',
  },
  {
    id: 'leave-license',
    name: 'Leave & License Agreement',
    icon: 'Key',
    price: 99,
    description: 'Maharashtra/Gujarat style agreement - no ownership transfer, only permission to use',
  },
  {
    id: 'commercial-lease',
    name: 'Commercial Lease Deed',
    icon: 'Building',
    price: 149,
    description: 'Shop, office, warehouse lease with maintenance and CAM charges',
  },
  {
    id: 'sale-deed',
    name: 'Sale Deed (Property)',
    icon: 'FileCheck',
    price: 199,
    description: 'Property ownership transfer with clear title - Registration Act 1908 compliant',
  },
  {
    id: 'gift-deed',
    name: 'Gift Deed',
    icon: 'Gift',
    price: 149,
    description: 'Transfer property to family/relatives without consideration - Stamp Act compliant',
  },
  {
    id: 'mortgage-deed',
    name: 'Mortgage Deed',
    icon: 'Banknote',
    price: 199,
    description: 'Property mortgage for bank loan - Transfer of Property Act 1882',
  },
  {
    id: 'partition-deed',
    name: 'Partition Deed',
    icon: 'Split',
    price: 249,
    description: 'Divide ancestral property among co-owners - Hindu Succession Act compliant',
  },
  {
    id: 'family-settlement',
    name: 'Family Settlement Deed',
    icon: 'Users',
    price: 299,
    description: 'Resolve property disputes within family without court litigation',
  },
  {
    id: 'relinquishment-deed',
    name: 'Relinquishment Deed',
    icon: 'ArrowLeftRight',
    price: 149,
    description: 'Give up property rights in favor of other legal heirs',
  },
  {
    id: 'power-of-attorney',
    name: 'Power of Attorney (Property)',
    icon: 'FileKey',
    price: 99,
    description: 'Authorize someone to handle property matters on your behalf',
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement (NDA)',
    icon: 'Shield',
    price: 49,
    description: 'Protect confidential business information under Indian Contract Act',
  },
  {
    id: 'partnership-deed',
    name: 'Partnership Deed',
    icon: 'Users',
    price: 149,
    description: 'Business partnership with profit/loss sharing - Partnership Act 1932',
  },
  {
    id: 'llp-agreement',
    name: 'LLP Agreement',
    icon: 'Building',
    price: 299,
    description: 'Limited Liability Partnership deed - LLP Act 2008 compliant',
  },
  {
    id: 'employment-offer',
    name: 'Employment Offer Letter',
    icon: 'UserCheck',
    price: 49,
    description: 'Job offer with CTC, benefits, joining date - Shops Act compliant',
  },
  {
    id: 'appointment-letter',
    name: 'Appointment Letter',
    icon: 'Briefcase',
    price: 49,
    description: 'Official employment contract post-acceptance with terms & conditions',
  },
  {
    id: 'service-agreement',
    name: 'Service Agreement',
    icon: 'Handshake',
    price: 79,
    description: 'Professional service contract between vendor and client',
  },
  {
    id: 'consultancy-agreement',
    name: 'Consultancy Agreement',
    icon: 'Lightbulb',
    price: 99,
    description: 'Expert consulting services with deliverables and retainer fees',
  },
  {
    id: 'freelance-contract',
    name: 'Freelance Agreement',
    icon: 'Laptop',
    price: 49,
    description: 'Independent contractor agreement with milestone payments',
  },
  {
    id: 'vendor-agreement',
    name: 'Vendor Agreement',
    icon: 'Truck',
    price: 99,
    description: 'Supplier/vendor contract with payment terms and delivery SLA',
  },
  {
    id: 'franchise-agreement',
    name: 'Franchise Agreement',
    icon: 'Store',
    price: 299,
    description: 'Franchisee relationship with royalty, territory, brand guidelines',
  },
  {
    id: 'distribution-agreement',
    name: 'Distribution Agreement',
    icon: 'Package',
    price: 199,
    description: 'Appoint distributors for products with exclusivity terms',
  },
  {
    id: 'loan-agreement',
    name: 'Loan Agreement',
    icon: 'Banknote',
    price: 99,
    description: 'Personal/business loan with interest, EMI, collateral terms',
  },
  {
    id: 'promissory-note',
    name: 'Promissory Note',
    icon: 'Receipt',
    price: 49,
    description: 'Written promise to repay borrowed money - Negotiable Instruments Act',
  },
  {
    id: 'surety-bond',
    name: 'Surety Bond',
    icon: 'ShieldCheck',
    price: 79,
    description: 'Guarantee performance of obligation by third party',
  },
  {
    id: 'indemnity-bond',
    name: 'Indemnity Bond',
    icon: 'FileCheck',
    price: 99,
    description: 'Compensate for loss or damage - Contract Act Section 124',
  },
  {
    id: 'will-testament',
    name: 'Will / Testament',
    icon: 'Scroll',
    price: 149,
    description: 'Property distribution after death - Indian Succession Act 1925',
  },
  {
    id: 'huf-deed',
    name: 'HUF Deed (Hindu Undivided Family)',
    icon: 'Users',
    price: 199,
    description: 'Create HUF for tax benefits - Hindu Law provisions',
  },
  {
    id: 'trust-deed',
    name: 'Trust Deed',
    icon: 'Landmark',
    price: 249,
    description: 'Create private/public trust - Indian Trusts Act 1882',
  },
  {
    id: 'general-affidavit',
    name: 'General Affidavit',
    icon: 'FileText',
    price: 29,
    description: 'Sworn statement on stamp paper for legal/official purposes',
  },
  {
    id: 'address-proof-affidavit',
    name: 'Address Proof Affidavit',
    icon: 'MapPin',
    price: 29,
    description: 'Self-declaration of residence address for KYC/official use',
  },
  {
    id: 'name-change-affidavit',
    name: 'Name Change Affidavit',
    icon: 'User',
    price: 49,
    description: 'Legal declaration for name change - Gazette notification ready',
  },
  {
    id: 'legal-notice',
    name: 'Legal Notice',
    icon: 'MailWarning',
    price: 79,
    description: 'Formal legal communication before filing court case',
  },
  {
    id: 'cheque-bounce-notice',
    name: 'Cheque Bounce Notice',
    icon: 'OctagonAlert',
    price: 99,
    description: 'Section 138 NI Act notice - 15 days demand for payment',
  },
  {
    id: 'eviction-notice',
    name: 'Tenant Eviction Notice',
    icon: 'UserX',
    price: 99,
    description: 'Terminate tenancy and demand vacant possession',
  },
  {
    id: 'rent-increase-notice',
    name: 'Rent Increase Notice',
    icon: 'TrendingUp',
    price: 49,
    description: 'Intimate tenant of rental hike as per agreement terms',
  },
  {
    id: 'termination-letter',
    name: 'Employment Termination',
    icon: 'UserX',
    price: 79,
    description: 'Employee dismissal with notice period and final settlement',
  },
  {
    id: 'resignation-letter',
    name: 'Resignation Letter',
    icon: 'Send',
    price: 29,
    description: 'Professional resignation with notice period and handover',
  },
  {
    id: 'experience-certificate',
    name: 'Experience Certificate',
    icon: 'Award',
    price: 29,
    description: 'Employment verification letter with roles and tenure',
  },
  {
    id: 'rent-receipt',
    name: 'Rent Receipt Format',
    icon: 'Receipt',
    price: 19,
    description: 'Monthly rent receipt with revenue stamp for HRA claims',
  },
  {
    id: 'security-deposit-receipt',
    name: 'Security Deposit Receipt',
    icon: 'Shield',
    price: 19,
    description: 'Acknowledgment of deposit for rental property',
  },
  {
    id: 'property-handover',
    name: 'Property Handover Certificate',
    icon: 'Key',
    price: 49,
    description: 'Takeover/takeback property with fixture inventory',
  },
];
