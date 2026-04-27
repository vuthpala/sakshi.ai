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
  | "marathi" 
  | "gujarati" 
  | "bengali" 
  | "punjabi" 
  | "urdu";

export interface Lawyer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photo?: string;
  
  // Professional Details
  barCouncilNumber: string;
  state: string;
  city: string;
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
}

// Mock Data for Development
export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: "lawyer_1",
    fullName: "Adv. Rajesh Kumar Sharma",
    email: "rajesh.sharma@advocate.com",
    phone: "+91 98765 43210",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
    barCouncilNumber: "MH/1234/2010",
    state: "Maharashtra",
    city: "Mumbai",
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
    joinedAt: "2023-01-15",
    lastActiveAt: "2024-01-27",
  },
  {
    id: "lawyer_2",
    fullName: "Adv. Priya Venkatesh",
    email: "priya.v@advocate.com",
    phone: "+91 98765 43211",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    barCouncilNumber: "AP/5678/2015",
    state: "Andhra Pradesh",
    city: "Hyderabad",
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
    totalEarnings: 52300,
    joinedAt: "2023-03-20",
    lastActiveAt: "2024-01-27",
  },
  {
    id: "lawyer_3",
    fullName: "Adv. Suresh Iyer",
    email: "suresh.iyer@advocate.com",
    phone: "+91 98765 43212",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh",
    barCouncilNumber: "KA/9012/2008",
    state: "Karnataka",
    city: "Bangalore",
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
    joinedAt: "2022-11-05",
    lastActiveAt: "2024-01-26",
  },
  {
    id: "lawyer_4",
    fullName: "Adv. Fatima Khan",
    email: "fatima.khan@advocate.com",
    phone: "+91 98765 43213",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
    barCouncilNumber: "DL/3456/2012",
    state: "Delhi",
    city: "New Delhi",
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
    joinedAt: "2023-02-10",
    lastActiveAt: "2024-01-27",
  },
  {
    id: "lawyer_5",
    fullName: "Adv. Vikram Patel",
    email: "vikram.patel@advocate.com",
    phone: "+91 98765 43214",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    barCouncilNumber: "GJ/7890/2018",
    state: "Gujarat",
    city: "Ahmedabad",
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
    joinedAt: "2023-06-15",
    lastActiveAt: "2024-01-25",
  },
  {
    id: "lawyer_6",
    fullName: "Adv. Lakshmi Narayan",
    email: "lakshmi.n@advocate.com",
    phone: "+91 98765 43215",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=lakshmi",
    barCouncilNumber: "TN/4567/2014",
    state: "Tamil Nadu",
    city: "Chennai",
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
  { value: "marathi", label: "Marathi" },
  { value: "gujarati", label: "Gujarati" },
  { value: "bengali", label: "Bengali" },
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
