import { NextRequest, NextResponse } from "next/server";
import type { Notification, NotificationPayload } from "@/types/notification";
import { MOCK_NOTIFICATIONS } from "@/types/notification";

// In-memory storage (replace with database in production)
let notifications = [...MOCK_NOTIFICATIONS];

// GET /api/notifications - Get user's notifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const userType = searchParams.get("userType") as "user" | "lawyer" | null;
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Filter notifications
    let userNotifications = notifications.filter(
      (n) => n.recipientId === userId && n.recipientType === (userType || n.recipientType)
    );

    if (unreadOnly) {
      userNotifications = userNotifications.filter((n) => !n.isRead);
    }

    // Sort by newest first
    userNotifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply limit
    userNotifications = userNotifications.slice(0, limit);

    // Get unread count
    const unreadCount = notifications.filter(
      (n) => n.recipientId === userId && !n.isRead
    ).length;

    return NextResponse.json({
      notifications: userNotifications,
      unreadCount,
      total: userNotifications.length,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// POST /api/notifications - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const payload: NotificationPayload = await request.json();

    // Generate notification ID
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const notification: Notification = {
      id: notificationId,
      type: payload.type,
      recipientId: payload.recipientId,
      recipientType: payload.recipientType,
      title: payload.title,
      message: payload.message,
      agreementId: payload.agreementId,
      documentId: payload.documentId,
      documentType: payload.documentType,
      documentTitle: payload.documentTitle,
      userId: payload.userId,
      userName: payload.userName,
      lawyerId: payload.lawyerId,
      lawyerName: payload.lawyerName,
      earningAmount: payload.earningAmount,
      priority: payload.priority || "medium",
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    // Store notification
    notifications.unshift(notification);

    // Emit socket event if available
    if ((global as any).sendNotification) {
      (global as any).sendNotification(payload.recipientId, notification);
    }

    return NextResponse.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
