// Helper functions to send notifications across all channels

import { NotificationPayload, NotificationType, getNotificationMessage } from "@/types/notification";
import { getSMSTemplate } from "@/app/api/sms/send/route";

interface SendNotificationOptions {
  type: NotificationType;
  recipientId: string;
  recipientType: "user" | "lawyer";
  recipientEmail?: string;
  recipientPhone?: string;
  
  // Context data
  userId?: string;
  userName?: string;
  lawyerId?: string;
  lawyerName?: string;
  agreementId?: string;
  documentId?: string;
  documentType?: string;
  documentTitle?: string;
  earningAmount?: number;
  
  // Priority
  priority?: "low" | "medium" | "high";
}

// Send notification across all channels
export async function sendMultiChannelNotification(options: SendNotificationOptions) {
  const { type, recipientId, recipientType } = options;
  
  // Get notification message
  const { title, message } = getNotificationMessage(type, {
    userName: options.userName,
    lawyerName: options.lawyerName,
    documentType: options.documentType,
    documentTitle: options.documentTitle,
    earningAmount: options.earningAmount,
  });

  const payload: NotificationPayload = {
    type,
    title,
    message,
    recipientId,
    recipientType,
    userId: options.userId,
    userName: options.userName,
    lawyerId: options.lawyerId,
    lawyerName: options.lawyerName,
    agreementId: options.agreementId,
    documentId: options.documentId,
    documentType: options.documentType,
    documentTitle: options.documentTitle,
    earningAmount: options.earningAmount,
    priority: options.priority || "medium",
  };

  // 1. Send Real-time Notification (Socket.IO)
  try {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      console.error("Failed to send real-time notification");
    }
  } catch (error) {
    console.error("Error sending real-time notification:", error);
  }

  // 2. Send Email Notification (if email provided)
  if (options.recipientEmail) {
    try {
      const emailType = getEmailType(type);
      if (emailType) {
        await fetch("/api/notifications/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: options.recipientEmail,
            type: emailType,
            userName: options.userName,
            lawyerName: options.lawyerName,
            documentType: options.documentType,
            documentTitle: options.documentTitle,
            earningAmount: options.earningAmount,
            agreementId: options.agreementId,
          }),
        });
      }
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  }

  // 3. Send SMS Notification (if phone provided)
  if (options.recipientPhone) {
    try {
      const smsType = getSMSType(type);
      if (smsType) {
        const smsMessage = getSMSTemplate(smsType, {
          userName: options.userName,
          lawyerName: options.lawyerName,
          documentType: options.documentType,
          documentTitle: options.documentTitle,
          earningAmount: options.earningAmount,
        });

        await fetch("/api/sms/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: options.recipientPhone,
            message: smsMessage,
            type: smsType,
          }),
        });
      }
    } catch (error) {
      console.error("Error sending SMS notification:", error);
    }
  }
}

// Map notification type to email type
function getEmailType(type: NotificationType): string | null {
  const emailTypeMap: Record<string, string> = {
    new_agreement: "new_agreement",
    agreement_signed: "agreement_signed",
    agreement_opened: "agreement_opened",
    agreement_reviewing: "agreement_reviewing",
    agreement_editing: "agreement_editing",
  };
  
  return emailTypeMap[type] || null;
}

// Map notification type to SMS type
function getSMSType(type: NotificationType): "new_agreement" | "agreement_signed" | null {
  switch (type) {
    case "new_agreement":
      return "new_agreement";
    case "agreement_signed":
      return "agreement_signed";
    default:
      return null;
  }
}

// Helper to notify lawyer when user sends agreement
export async function notifyLawyerNewAgreement(
  lawyerId: string,
  lawyerEmail: string,
  lawyerPhone: string,
  data: {
    userId: string;
    userName: string;
    agreementId: string;
    documentId: string;
    documentType: string;
    documentTitle: string;
    earningAmount: number;
  }
) {
  return sendMultiChannelNotification({
    type: "new_agreement",
    recipientId: lawyerId,
    recipientType: "lawyer",
    recipientEmail: lawyerEmail,
    recipientPhone: lawyerPhone,
    priority: "high",
    ...data,
  });
}

// Helper to notify user when lawyer takes action
export async function notifyUserAgreementStatus(
  userId: string,
  userEmail: string,
  userPhone: string,
  type: "agreement_opened" | "agreement_reviewing" | "agreement_editing" | "agreement_signed",
  data: {
    lawyerId: string;
    lawyerName: string;
    agreementId: string;
    documentId: string;
    documentType: string;
    documentTitle: string;
  }
) {
  return sendMultiChannelNotification({
    type,
    recipientId: userId,
    recipientType: "user",
    recipientEmail: userEmail,
    recipientPhone: userPhone,
    priority: type === "agreement_signed" ? "high" : "medium",
    ...data,
  });
}
