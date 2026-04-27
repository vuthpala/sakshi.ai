import type { AgreementStatus } from "@/types/lawyer";

export function getStatusColor(status: AgreementStatus): string {
  const colors: Record<AgreementStatus, string> = {
    new: "inline-flex items-center px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full",
    opened: "inline-flex items-center px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full",
    reviewing: "inline-flex items-center px-2 py-1 bg-orange-500/10 text-orange-400 text-xs rounded-full",
    editing: "inline-flex items-center px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full",
    signed: "inline-flex items-center px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full",
    completed: "inline-flex items-center px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full",
    rejected: "inline-flex items-center px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full",
  };
  return colors[status] || colors.new;
}

export function getStatusLabel(status: AgreementStatus): string {
  const labels: Record<AgreementStatus, string> = {
    new: "New",
    opened: "Opened",
    reviewing: "Reviewing",
    editing: "Editing",
    signed: "Signed",
    completed: "Completed",
    rejected: "Rejected",
  };
  return labels[status] || status;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getDocumentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "rent-agreement": "Rent Agreement",
    "power-of-attorney": "Power of Attorney",
    "gift-deed": "Gift Deed",
    "legal-notice": "Legal Notice",
    "affidavit": "Affidavit",
    "nda": "NDA",
    "freelance-contract": "Freelance Contract",
    "partnership-deed": "Partnership Deed",
    "sale-agreement": "Sale Agreement",
    "employment-offer": "Employment Offer",
  };
  return labels[type] || type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function getLanguageLabel(language: string): string {
  const labels: Record<string, string> = {
    english: "English",
    hindi: "Hindi",
    telugu: "Telugu",
    tamil: "Tamil",
    kannada: "Kannada",
    marathi: "Marathi",
    gujarati: "Gujarati",
    bengali: "Bengali",
    punjabi: "Punjabi",
    urdu: "Urdu",
  };
  return labels[language] || language;
}

export function getSpecializationLabel(spec: string): string {
  const labels: Record<string, string> = {
    property: "Property & Real Estate",
    criminal: "Criminal Law",
    business: "Business & Commercial",
    family: "Family Law",
    civil: "Civil Law",
    tax: "Tax Law",
    corporate: "Corporate Law",
    ip: "Intellectual Property",
    labor: "Labor & Employment",
    consumer: "Consumer Protection",
  };
  return labels[spec] || spec;
}

export function calculateExperienceYears(joinDate: string): number {
  const joined = new Date(joinDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - joined.getTime());
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Indian phone number validation
  const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
  return phoneRegex.test(phone);
}

export function formatPhoneNumber(phone: string): string {
  // Format Indian phone number
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateTrackingTimeline(agreement: {
  sentAt: string;
  openedAt?: string;
  reviewingAt?: string;
  editedAt?: string;
  signedAt?: string;
  completedAt?: string;
}) {
  const timeline = [
    { label: "Document Generated", completed: true, time: agreement.sentAt },
    { label: "Lawyer Selected", completed: true, time: agreement.sentAt },
    { label: "Sent to Lawyer", completed: true, time: agreement.sentAt },
    { label: "Lawyer Notified", completed: true, time: agreement.sentAt },
    { label: "Lawyer Opened", completed: !!agreement.openedAt, time: agreement.openedAt },
    { label: "Lawyer Reviewing", completed: !!agreement.reviewingAt, time: agreement.reviewingAt },
    { label: "Edits Made", completed: !!agreement.editedAt, time: agreement.editedAt },
    { label: "Lawyer Signed", completed: !!agreement.signedAt, time: agreement.signedAt },
    { label: "Completed", completed: !!agreement.completedAt, time: agreement.completedAt },
  ];

  return timeline;
}
