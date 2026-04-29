// Lawyer Types for the Legal Document Platform

export type LawyerStatus = "online" | "busy" | "offline";
export type LawyerVerificationStatus = "pending" | "verified" | "rejected";
export type Specialization = 
  | "property" 
  | "criminal" 
  | "business" 
  | "family" 
  | "civil" 
  | "tax" 
  | "corporate" 
  | "ip" 
  | "labor" 
  | "consumer";

export type Language = 
  | "english" 
  | "hindi" 
  | "telugu" 
  | "tamil" 
  | "kannada" 
  | "malayalam"
  | "bengali" 
  | "marathi" 
  | "gujarati" 
  | "punjabi" 
  | "urdu";

export interface Lawyer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photo?: string;
  
  // Location Details
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  
  // Professional Details
  barCouncilNumber: string;
  courtOfPractice: string;
  yearsOfExperience: number;
  specializations: Specialization[];
  languages: Language[];
  
  // Status
  status: LawyerStatus;
  verificationStatus: LawyerVerificationStatus;
  isActive: boolean;
  
  // Stats
  totalDocumentsSigned: number;
  rating: number; // 1-5
  totalReviews: number;
  totalEarnings: number;
  pendingPayout: number; // Amount available for withdrawal
  withdrawnAmount: number; // Total amount withdrawn
  
  // Timestamps
  joinedAt: string;
  lastActiveAt: string;
  
  // Bank Details for payouts
  bankDetails?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  upiId?: string; // Alternative to bank details
}

export interface AgreementRequest {
  id: string;
  documentId: string;
  documentType: string;
  documentTitle: string;
  documentLanguage: Language;
  
  // User Details
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userLocation: string;
  
  // Lawyer Details
  lawyerId: string;
  
  // Status
  status: AgreementStatus;
  
  // Timeline
  sentAt: string;
  openedAt?: string;
  reviewingAt?: string;
  editedAt?: string;
  signedAt?: string;
  completedAt?: string;
  
  // Content
  originalContent: string;
  editedContent?: string;
  edits?: Edit[];
  
  // Signature
  lawyerSignature?: SignatureData;
  
  // Payment
  lawyerFee: number;
  platformFee: number;
  totalPaid: number;
  
  // Chat
  messages: ChatMessage[];
}

export type AgreementStatus = 
  | "new"
  | "opened"
  | "reviewing"
  | "editing"
  | "signed"
  | "completed"
  | "rejected";

export interface Edit {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  editedAt: string;
}

export interface SignatureData {
  type: "drawn" | "typed";
  data: string; // Base64 for drawn, text for typed
  signedAt: string;
  stampUrl?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: "user" | "lawyer";
  senderName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Lawyer Registration Form Data
export interface LawyerRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  barCouncilNumber: string;
  state: string;
  city: string;
  courtOfPractice: string;
  yearsOfExperience: number;
  specializations: Specialization[];
  languages: Language[];
  password: string;
}

// Lawyer Search Filters
export interface LawyerSearchFilters {
  location?: string;
  status?: LawyerStatus;
  specializations?: Specialization[];
  languages?: Language[];
  minRating?: number;
  minExperience?: number;
  lat?: number;
  lng?: number;
  radius?: number; // in km
}

// Lawyer with distance (for location-based search)
export interface LawyerWithDistance extends Lawyer {
  distanceKm?: number;
}

// Haversine formula to calculate distance between two points
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

// Mock Data for Development
export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: "lawyer_1",
    fullName: "Adv. Rajesh Kumar Sharma",
    email: "rajesh.sharma@advocate.com",
    phone: "+91 98765 43210",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
    address: "123 Marine Drive, Fort",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    latitude: 19.0760,
    longitude: 72.8777,
    barCouncilNumber: "MH/1234/2010",
    courtOfPractice: "Bombay High Court",
    yearsOfExperience: 14,
    specializations: ["property", "civil"],
    languages: ["english", "hindi", "marathi"],
    status: "online",
    verificationStatus: "verified",
    isActive: true,
    totalDocumentsSigned: 156,
    rating: 4.8,
    totalReviews: 89,
    totalEarnings: 78500,
    pendingPayout: 4500,
    withdrawnAmount: 74000,
    joinedAt: "2023-01-15",
    lastActiveAt: "2024-01-15",
    bankDetails: {
      accountHolderName: "Rajesh Kumar Sharma",
      accountNumber: "123456789012",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank"
    },
    upiId: "rajesh.sharma@upi"
  },
  {
    id: "lawyer_2",
    fullName: "Adv. Priya Venkatesh",
    email: "priya.v@advocate.com",
    phone: "+91 98765 43211",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    address: "456 Banjara Hills, Road No. 12",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500034",
    latitude: 17.3850,
    longitude: 78.4867,
    barCouncilNumber: "AP/5678/2015",
    courtOfPractice: "Telangana High Court",
    yearsOfExperience: 9,
    specializations: ["family", "property"],
    languages: ["english", "telugu", "hindi"],
    status: "online",
    verificationStatus: "verified",
    isActive: true,
    totalDocumentsSigned: 98,
    rating: 4.9,
    totalReviews: 67,
    totalEarnings: 12300,
    pendingPayout: 2300,
    withdrawnAmount: 10000,
    joinedAt: "2023-03-20",
    lastActiveAt: "2024-01-27",
  },
  {
    id: "lawyer_3",
    fullName: "Adv. Suresh Iyer",
    email: "suresh.iyer@advocate.com",
    phone: "+91 98765 43212",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh",
    address: "789 MG Road, Near Trinity Circle",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    latitude: 12.9716,
    longitude: 77.5946,
    barCouncilNumber: "KA/9012/2008",
    courtOfPractice: "Karnataka High Court",
    yearsOfExperience: 16,
    specializations: ["business", "corporate", "ip"],
    languages: ["english", "kannada", "tamil"],
    status: "busy",
    verificationStatus: "verified",
    isActive: true,
    totalDocumentsSigned: 234,
    rating: 4.7,
    totalReviews: 112,
    totalEarnings: 125600,
    pendingPayout: 5600,
    withdrawnAmount: 120000,
    joinedAt: "2022-11-05",
    lastActiveAt: "2024-01-26",
  },
  {
    id: "lawyer_4",
    fullName: "Adv. Fatima Khan",
    email: "fatima.khan@advocate.com",
    phone: "+91 98765 43213",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
    address: "321 Connaught Place, Block C",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    latitude: 28.6139,
    longitude: 77.2090,
    barCouncilNumber: "DL/3456/2012",
    courtOfPractice: "Delhi High Court",
    yearsOfExperience: 12,
    specializations: ["criminal", "civil"],
    languages: ["english", "hindi", "urdu"],
    status: "online",
    verificationStatus: "verified",
    isActive: true,
    totalDocumentsSigned: 178,
    rating: 4.9,
    totalReviews: 95,
    totalEarnings: 89200,
    pendingPayout: 4200,
    withdrawnAmount: 85000,
    joinedAt: "2023-02-10",
    lastActiveAt: "2024-01-27",
  },
  {
    id: "lawyer_5",
    fullName: "Adv. Vikram Patel",
    email: "vikram.patel@advocate.com",
    phone: "+91 98765 43214",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    address: "654 CG Road, Near Law Garden",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380009",
    latitude: 23.0225,
    longitude: 72.5714,
    barCouncilNumber: "GJ/7890/2018",
    courtOfPractice: "Gujarat High Court",
    yearsOfExperience: 6,
    specializations: ["tax", "business"],
    languages: ["english", "hindi", "gujarati"],
    status: "offline",
    verificationStatus: "verified",
    isActive: true,
    totalDocumentsSigned: 67,
    rating: 4.5,
    totalReviews: 34,
    totalEarnings: 34100,
    pendingPayout: 2100,
    withdrawnAmount: 32000,
    joinedAt: "2023-06-15",
    lastActiveAt: "2024-01-25",
  },
  {
    id: "lawyer_6",
    fullName: "Adv. Lakshmi Narayan",
    email: "lakshmi.n@advocate.com",
    phone: "+91 98765 43215",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi",
    address: "987 Anna Salai, Near Spencer Plaza",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600002",
    latitude: 13.0827,
    longitude: 80.2707,
    barCouncilNumber: "TN/4567/2014",
    courtOfPractice: "Madras High Court",
    yearsOfExperience: 10,
    specializations: ["family", "property", "civil"],
    languages: ["english", "tamil", "telugu"],
    status: "online",
    verificationStatus: "verified",
    isActive: true,
    totalDocumentsSigned: 145,
    rating: 4.8,
    totalReviews: 78,
    totalEarnings: 67800,
    pendingPayout: 4200,
    withdrawnAmount: 63600,
    joinedAt: "2023-04-01",
    lastActiveAt: "2024-01-27",
  },
];

export const MOCK_AGREEMENTS: AgreementRequest[] = [
  {
    id: "agreement_1",
    documentId: "doc_123",
    documentType: "rent-agreement",
    documentTitle: "Rent Agreement - 2BHK Apartment",
    documentLanguage: "english",
    userId: "user_1",
    userName: "Rahul Sharma",
    userEmail: "rahul@example.com",
    userPhone: "+91 98765 12345",
    userLocation: "Mumbai, Maharashtra",
    lawyerId: "lawyer_1",
    status: "new",
    sentAt: "2024-01-27T10:00:00Z",
    originalContent: "Sample content...",
    lawyerFee: 200,
    platformFee: 50,
    totalPaid: 250,
    messages: [],
  },
  {
    id: "agreement_2",
    documentId: "doc_124",
    documentType: "power-of-attorney",
    documentTitle: "Power of Attorney - Property Transfer",
    documentLanguage: "hindi",
    userId: "user_2",
    userName: "Anita Patel",
    userEmail: "anita@example.com",
    userPhone: "+91 98765 12346",
    userLocation: "Ahmedabad, Gujarat",
    lawyerId: "lawyer_1",
    status: "opened",
    sentAt: "2024-01-27T09:30:00Z",
    openedAt: "2024-01-27T09:45:00Z",
    originalContent: "Sample content...",
    lawyerFee: 300,
    platformFee: 50,
    totalPaid: 350,
    messages: [],
  },
  {
    id: "agreement_3",
    documentId: "doc_125",
    documentType: "affidavit",
    documentTitle: "Affidavit - Name Change",
    documentLanguage: "english",
    userId: "user_3",
    userName: "Kiran Kumar",
    userEmail: "kiran@example.com",
    userPhone: "+91 98765 12347",
    userLocation: "Bangalore, Karnataka",
    lawyerId: "lawyer_1",
    status: "reviewing",
    sentAt: "2024-01-26T14:00:00Z",
    openedAt: "2024-01-26T14:30:00Z",
    reviewingAt: "2024-01-26T14:45:00Z",
    originalContent: "Sample content...",
    lawyerFee: 150,
    platformFee: 50,
    totalPaid: 200,
    messages: [
      {
        id: "msg_1",
        senderId: "lawyer_1",
        senderType: "lawyer",
        senderName: "Adv. Rajesh Kumar Sharma",
        message: "Hello, I'm reviewing your affidavit. It looks good, but I need to make a small correction in the address section.",
        timestamp: "2024-01-26T14:50:00Z",
        isRead: true,
      },
    ],
  },
  {
    id: "agreement_4",
    documentId: "doc_126",
    documentType: "nda",
    documentTitle: "NDA - Tech Startup",
    documentLanguage: "english",
    userId: "user_4",
    userName: "Sneha Gupta",
    userEmail: "sneha@example.com",
    userPhone: "+91 98765 12348",
    userLocation: "Delhi, NCR",
    lawyerId: "lawyer_1",
    status: "signed",
    sentAt: "2024-01-25T11:00:00Z",
    openedAt: "2024-01-25T11:15:00Z",
    reviewingAt: "2024-01-25T11:30:00Z",
    signedAt: "2024-01-25T12:00:00Z",
    completedAt: "2024-01-25T12:05:00Z",
    originalContent: "Sample content...",
    lawyerFee: 250,
    platformFee: 50,
    totalPaid: 300,
    messages: [],
    lawyerSignature: {
      type: "drawn",
      data: "data:image/png;base64,...",
      signedAt: "2024-01-25T12:00:00Z",
    },
  },
  {
    id: "agreement_5",
    documentId: "doc_127",
    documentType: "partnership-deed",
    documentTitle: "Partnership Deed - Restaurant Business",
    documentLanguage: "hindi",
    userId: "user_5",
    userName: "Ravi & Sons",
    userEmail: "ravi@example.com",
    userPhone: "+91 98765 12349",
    userLocation: "Jaipur, Rajasthan",
    lawyerId: "lawyer_1",
    status: "editing",
    sentAt: "2024-01-24T16:00:00Z",
    openedAt: "2024-01-24T16:30:00Z",
    reviewingAt: "2024-01-24T17:00:00Z",
    editedAt: "2024-01-24T17:30:00Z",
    originalContent: "Sample content...",
    editedContent: "Sample edited content...",
    edits: [
      {
        id: "edit_1",
        field: "profit_sharing",
        oldValue: "50-50",
        newValue: "60-40 (Senior partner gets 60%)",
        editedAt: "2024-01-24T17:30:00Z",
      },
    ],
    lawyerFee: 500,
    platformFee: 100,
    totalPaid: 600,
    messages: [
      {
        id: "msg_2",
        senderId: "lawyer_1",
        senderType: "lawyer",
        senderName: "Adv. Rajesh Kumar Sharma",
        message: "I've made some important edits to the profit sharing clause. Please review the changes.",
        timestamp: "2024-01-24T17:35:00Z",
        isRead: false,
      },
    ],
  },
];

export const SPECIALIZATIONS: { value: Specialization; label: string }[] = [
  { value: "property", label: "Property & Real Estate" },
  { value: "criminal", label: "Criminal Law" },
  { value: "business", label: "Business & Commercial" },
  { value: "family", label: "Family Law" },
  { value: "civil", label: "Civil Law" },
  { value: "tax", label: "Tax Law" },
  { value: "corporate", label: "Corporate Law" },
  { value: "ip", label: "Intellectual Property" },
  { value: "labor", label: "Labor & Employment" },
  { value: "consumer", label: "Consumer Protection" },
];

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "telugu", label: "Telugu" },
  { value: "tamil", label: "Tamil" },
  { value: "kannada", label: "Kannada" },
  { value: "malayalam", label: "Malayalam" },
  { value: "bengali", label: "Bengali" },
  { value: "marathi", label: "Marathi" },
  { value: "gujarati", label: "Gujarati" },
  { value: "punjabi", label: "Punjabi" },
  { value: "urdu", label: "Urdu" },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// Payout Types
export type PayoutStatus = "pending" | "processing" | "paid" | "failed" | "rejected";
export type PayoutMethod = "bank_transfer" | "upi";

export interface Payout {
  id: string;
  lawyerId: string;
  amount: number;
  status: PayoutStatus;
  method: PayoutMethod;
  // Bank details (if bank transfer)
  bankAccountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  accountHolderName?: string;
  // UPI details (if UPI)
  upiId?: string;
  // Razorpay
  razorpayPayoutId?: string;
  razorpayStatus?: string;
  failureReason?: string;
  // Timestamps
  requestedAt: string;
  processedAt?: string;
  // Admin
  adminNote?: string;
  processedBy?: string;
}

export interface Transaction {
  id: string;
  lawyerId: string;
  agreementId: string;
  documentId: string;
  documentType: string;
  documentTitle: string;
  clientName: string;
  // Amounts
  totalAmount: number; // What user paid
  platformFee: number; // 20%
  lawyerEarning: number; // 80%
  // Status
  status: "completed" | "refunded" | "disputed";
  // Payout reference (if withdrawn)
  payoutId?: string;
  // Timestamps
  completedAt: string;
  createdAt: string;
}

// Platform config
export interface PlatformConfig {
  platformFeePercent: number; // Default 20%
  minimumWithdrawalAmount: number; // Default 500
  payoutMethods: PayoutMethod[];
}

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  platformFeePercent: 20,
  minimumWithdrawalAmount: 500,
  payoutMethods: ["bank_transfer", "upi"],
};

// Mock Transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_1",
    lawyerId: "lawyer_1",
    agreementId: "agreement_1",
    documentId: "doc_123",
    documentType: "rent-agreement",
    documentTitle: "Residential Rent Agreement",
    clientName: "Ravi Kumar",
    totalAmount: 499,
    platformFee: 99.8,
    lawyerEarning: 399.2,
    status: "completed",
    completedAt: "2024-01-20T10:30:00Z",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "txn_2",
    lawyerId: "lawyer_1",
    agreementId: "agreement_2",
    documentId: "doc_456",
    documentType: "affidavit",
    documentTitle: "Address Affidavit",
    clientName: "Priya Sharma",
    totalAmount: 299,
    platformFee: 59.8,
    lawyerEarning: 239.2,
    status: "completed",
    payoutId: "payout_1",
    completedAt: "2024-01-18T14:15:00Z",
    createdAt: "2024-01-18T14:00:00Z",
  },
  {
    id: "txn_3",
    lawyerId: "lawyer_1",
    agreementId: "agreement_3",
    documentId: "doc_789",
    documentType: "power-of-attorney",
    documentTitle: "Power of Attorney",
    clientName: "Amit Patel",
    totalAmount: 599,
    platformFee: 119.8,
    lawyerEarning: 479.2,
    status: "completed",
    completedAt: "2024-01-15T09:45:00Z",
    createdAt: "2024-01-15T09:30:00Z",
  },
];

// Mock Payouts
export const MOCK_PAYOUTS: Payout[] = [
  {
    id: "payout_1",
    lawyerId: "lawyer_1",
    amount: 638.4,
    status: "paid",
    method: "bank_transfer",
    bankAccountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank",
    accountHolderName: "Rajesh Kumar Sharma",
    razorpayPayoutId: "pout_razorpay_123",
    requestedAt: "2024-01-19T10:00:00Z",
    processedAt: "2024-01-19T12:30:00Z",
    processedBy: "admin_1",
  },
  {
    id: "payout_2",
    lawyerId: "lawyer_1",
    amount: 1200,
    status: "pending",
    method: "upi",
    upiId: "rajesh.sharma@upi",
    requestedAt: "2024-01-26T15:00:00Z",
  },
];
