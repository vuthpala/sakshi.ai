// Notification Types for Real-time Notifications

export type NotificationType = 
  | "new_agreement"      // Lawyer: User sent agreement
  | "agreement_opened"   // User: Lawyer opened document
  | "agreement_reviewing" // User: Lawyer reviewing
  | "agreement_editing"  // User: Lawyer editing
  | "agreement_signed"   // User: Lawyer signed
  | "agreement_completed" // User: Agreement completed
  | "message_received"; // Both: New chat message

export type NotificationPriority = "low" | "medium" | "high";

export interface Notification {
  id: string;
  type: NotificationType;
  recipientId: string;
  recipientType: "user" | "lawyer";
  
  // Content
  title: string;
  message: string;
  
  // Related entities
  agreementId?: string;
  documentId?: string;
  documentType?: string;
  documentTitle?: string;
  userId?: string;
  userName?: string;
  lawyerId?: string;
  lawyerName?: string;
  
  // Financial info (for lawyer notifications)
  earningAmount?: number;
  
  // Meta
  priority: NotificationPriority;
  isRead: boolean;
  readAt?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  message: string;
  recipientId: string;
  recipientType: "user" | "lawyer";
  agreementId?: string;
  documentId?: string;
  documentType?: string;
  documentTitle?: string;
  userId?: string;
  userName?: string;
  lawyerId?: string;
  lawyerName?: string;
  earningAmount?: number;
  priority?: NotificationPriority;
}

// Socket.io Events
export interface ServerToClientEvents {
  notification: (notification: Notification) => void;
  unread_count: (count: number) => void;
  connect: () => void;
  disconnect: () => void;
}

export interface ClientToServerEvents {
  join: (userId: string, userType: "user" | "lawyer") => void;
  leave: (userId: string) => void;
  mark_read: (notificationId: string) => void;
  mark_all_read: () => void;
}

// Helper functions for notification messages
export function getNotificationMessage(type: NotificationType, data: {
  userName?: string;
  lawyerName?: string;
  documentType?: string;
  documentTitle?: string;
  earningAmount?: number;
}): { title: string; message: string } {
  switch (type) {
    case "new_agreement":
      return {
        title: "New Agreement",
        message: `New agreement from ${data.userName} — ${data.documentTitle || data.documentType} — ₹${data.earningAmount} to earn`,
      };
    
    case "agreement_opened":
      return {
        title: "Document Opened",
        message: `${data.lawyerName} opened your ${data.documentTitle || "document"}`,
      };
    
    case "agreement_reviewing":
      return {
        title: "Reviewing Document",
        message: `${data.lawyerName} is reviewing your ${data.documentTitle || "document"}`,
      };
    
    case "agreement_editing":
      return {
        title: "Editing Document",
        message: `${data.lawyerName} is making edits to your ${data.documentTitle || "document"}`,
      };
    
    case "agreement_signed":
      return {
        title: "Document Signed! 🎉",
        message: `Your ${data.documentTitle || "document"} has been signed by ${data.lawyerName}`,
      };
    
    case "agreement_completed":
      return {
        title: "Agreement Completed",
        message: `Your ${data.documentTitle || "document"} is ready for download`,
      };
    
    case "message_received":
      return {
        title: "New Message",
        message: `New message from ${data.userName || data.lawyerName}`,
      };
    
    default:
      return {
        title: "Notification",
        message: "You have a new notification",
      };
  }
}

// Mock notifications for development
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_1",
    type: "new_agreement",
    recipientId: "lawyer_1",
    recipientType: "lawyer",
    title: "New Agreement",
    message: "New agreement from Rahul Sharma — Rent Agreement — ₹250 to earn",
    agreementId: "agreement_1",
    documentId: "doc_123",
    documentType: "rent-agreement",
    documentTitle: "Rent Agreement - 2BHK Apartment",
    userId: "user_1",
    userName: "Rahul Sharma",
    earningAmount: 250,
    priority: "high",
    isRead: false,
    createdAt: "2024-01-27T10:00:00Z",
  },
  {
    id: "notif_2",
    type: "agreement_opened",
    recipientId: "user_2",
    recipientType: "user",
    title: "Document Opened",
    message: "Adv. Rajesh Kumar Sharma opened your Power of Attorney",
    agreementId: "agreement_2",
    documentId: "doc_124",
    lawyerId: "lawyer_1",
    lawyerName: "Adv. Rajesh Kumar Sharma",
    priority: "medium",
    isRead: true,
    readAt: "2024-01-27T10:15:00Z",
    createdAt: "2024-01-27T09:45:00Z",
  },
  {
    id: "notif_3",
    type: "agreement_reviewing",
    recipientId: "user_3",
    recipientType: "user",
    title: "Reviewing Document",
    message: "Adv. Rajesh Kumar Sharma is reviewing your Affidavit",
    agreementId: "agreement_3",
    documentId: "doc_125",
    lawyerId: "lawyer_1",
    lawyerName: "Adv. Rajesh Kumar Sharma",
    priority: "medium",
    isRead: false,
    createdAt: "2024-01-26T14:45:00Z",
  },
];
