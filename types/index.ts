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

// All Available Documents (for documents page)
export const ALL_DOCUMENT_TYPES: DocumentType[] = [
  ...DOCUMENT_TYPES,
  {
    id: 'llc-operating-agreement',
    name: 'LLC Operating Agreement',
    icon: 'Building',
    price: 99,
    description: 'Define LLC ownership, management structure, and operating procedures',
  },
  {
    id: 'service-agreement',
    name: 'Service Agreement',
    icon: 'Handshake',
    price: 49,
    description: 'Professional services contract between business and client',
  },
  {
    id: 'independent-contractor',
    name: 'Independent Contractor',
    icon: 'HardHat',
    price: 49,
    description: 'Agreement for hiring contractors with clear scope and payment terms',
  },
  {
    id: 'consulting-agreement',
    name: 'Consulting Agreement',
    icon: 'Lightbulb',
    price: 49,
    description: 'Professional consulting services with deliverables and timeline',
  },
  {
    id: 'power-of-attorney',
    name: 'Power of Attorney',
    icon: 'FileKey',
    price: 79,
    description: 'Legal authorization for someone to act on your behalf',
  },
  {
    id: 'will-testament',
    name: 'Last Will & Testament',
    icon: 'Scroll',
    price: 99,
    description: 'Distribute your assets and name guardians for your children',
  },
  {
    id: 'loan-agreement',
    name: 'Loan Agreement',
    icon: 'Banknote',
    price: 49,
    description: 'Personal or business loan with repayment terms and interest',
  },
  {
    id: 'promissory-note',
    name: 'Promissory Note',
    icon: 'Receipt',
    price: 39,
    description: 'Written promise to pay a specific amount by a certain date',
  },
  {
    id: 'intellectual-property',
    name: 'IP Assignment Agreement',
    icon: 'Copyright',
    price: 79,
    description: 'Transfer ownership of intellectual property rights',
  },
  {
    id: 'licensing-agreement',
    name: 'Licensing Agreement',
    icon: 'Key',
    price: 79,
    description: 'License your intellectual property to others for use',
  },
  {
    id: 'franchise-agreement',
    name: 'Franchise Agreement',
    icon: 'Store',
    price: 149,
    description: 'Franchise relationship with fees, territory, and obligations',
  },
  {
    id: 'joint-venture',
    name: 'Joint Venture Agreement',
    icon: 'Globe',
    price: 99,
    description: 'Collaborate on a specific project with profit/loss sharing',
  },
  {
    id: 'shareholders-agreement',
    name: 'Shareholders Agreement',
    icon: 'PieChart',
    price: 149,
    description: 'Rights and obligations of shareholders in a corporation',
  },
  {
    id: 'asset-purchase',
    name: 'Asset Purchase Agreement',
    icon: 'Package',
    price: 99,
    description: 'Buy or sell business assets with warranties and terms',
  },
  {
    id: 'stock-purchase',
    name: 'Stock Purchase Agreement',
    icon: 'TrendingUp',
    price: 149,
    description: 'Purchase company shares with representations and warranties',
  },
  {
    id: 'merger-agreement',
    name: 'Merger Agreement',
    icon: 'GitMerge',
    price: 199,
    description: 'Combine two companies with detailed terms and conditions',
  },
  {
    id: 'separation-agreement',
    name: 'Employment Separation',
    icon: 'UserX',
    price: 79,
    description: 'Terms of employment termination with severance and release',
  },
  {
    id: 'internship-agreement',
    name: 'Internship Agreement',
    icon: 'GraduationCap',
    price: 39,
    description: 'Internship terms with learning objectives and stipend',
  },
  {
    id: 'commercial-lease',
    name: 'Commercial Lease',
    icon: 'Building2',
    price: 99,
    description: 'Long-term commercial property lease with CAM charges',
  },
  {
    id: 'sublease-agreement',
    name: 'Sublease Agreement',
    icon: 'ArrowLeftRight',
    price: 49,
    description: 'Rent property from existing tenant with landlord consent',
  },
  {
    id: 'roommate-agreement',
    name: 'Roommate Agreement',
    icon: 'UsersRound',
    price: 29,
    description: 'House rules and responsibilities for shared living',
  },
  {
    id: 'prenuptial-agreement',
    name: 'Prenuptial Agreement',
    icon: 'Heart',
    price: 149,
    description: 'Protect assets and define property rights before marriage',
  },
  {
    id: 'separation-divorce',
    name: 'Separation Agreement',
    icon: 'Scale',
    price: 129,
    description: 'Terms for separation including assets and child custody',
  },
  {
    id: 'child-custody',
    name: 'Child Custody Agreement',
    icon: 'Baby',
    price: 99,
    description: 'Custody arrangement with visitation and support terms',
  },
  {
    id: 'deed-of-trust',
    name: 'Deed of Trust',
    icon: 'Landmark',
    price: 99,
    description: 'Transfer property to a trustee for beneficiary',
  },
  {
    id: 'quitclaim-deed',
    name: 'Quitclaim Deed',
    icon: 'FileOutput',
    price: 79,
    description: 'Transfer property interest without warranties',
  },
  {
    id: 'warranty-deed',
    name: 'Warranty Deed',
    icon: 'BadgeCheck',
    price: 99,
    description: 'Transfer property with full title guarantees',
  },
  {
    id: 'release-of-liability',
    name: 'Release of Liability',
    icon: 'ShieldCheck',
    price: 49,
    description: 'Waiver releasing one party from future legal claims',
  },
  {
    id: 'cease-desist',
    name: 'Cease & Desist Letter',
    icon: 'OctagonAlert',
    price: 39,
    description: 'Demand someone stop illegal or harmful activities',
  },
  {
    id: 'demand-letter',
    name: 'Demand Letter',
    icon: 'MailWarning',
    price: 39,
    description: 'Formal request for payment or action before legal proceedings',
  },
  {
    id: 'affidavit',
    name: 'General Affidavit',
    icon: 'FileCheck',
    price: 29,
    description: 'Sworn written statement for legal or official purposes',
  },
  {
    id: 'bill-of-sale',
    name: 'Bill of Sale',
    icon: 'ShoppingBag',
    price: 29,
    description: 'Proof of purchase transferring ownership of items',
  },
  {
    id: 'receipt-template',
    name: 'Receipt Template',
    icon: 'ReceiptText',
    price: 19,
    description: 'Professional receipt for payments and transactions',
  },
  {
    id: 'invoice-template',
    name: 'Invoice Template',
    icon: 'FileDigit',
    price: 19,
    description: 'Professional invoice for billing clients',
  },
  {
    id: 'purchase-order',
    name: 'Purchase Order',
    icon: 'ClipboardList',
    price: 29,
    description: 'Commercial document for ordering goods or services',
  },
  {
    id: 'delivery-note',
    name: 'Delivery Note',
    icon: 'Truck',
    price: 19,
    description: 'Document accompanying shipped goods with details',
  },
];
