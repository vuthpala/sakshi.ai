import { NextRequest, NextResponse } from "next/server";
import { MOCK_NOTIFICATIONS } from "@/types/notification";

// In-memory storage (replace with database in production)
let notifications = [...MOCK_NOTIFICATIONS];

// PUT /api/notifications/read - Mark notifications as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, userId, markAll = false } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (markAll) {
      // Mark all notifications as read for this user
      notifications = notifications.map((n) => {
        if (n.recipientId === userId && !n.isRead) {
          return {
            ...n,
            isRead: true,
            readAt: new Date().toISOString(),
          };
        }
        return n;
      });

      return NextResponse.json({
        success: true,
        message: "All notifications marked as read",
      });
    }

    if (!notificationId) {
      return NextResponse.json(
        { error: "notificationId is required (or use markAll: true)" },
        { status: 400 }
      );
    }

    // Mark single notification as read
    const notifIndex = notifications.findIndex(
      (n) => n.id === notificationId && n.recipientId === userId
    );

    if (notifIndex === -1) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    notifications[notifIndex] = {
      ...notifications[notifIndex],
      isRead: true,
      readAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      notification: notifications[notifIndex],
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      { status: 500 }
    );
  }
}

// GET /api/notifications/read?userId=xxx - Get unread count
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const unreadCount = notifications.filter(
      (n) => n.recipientId === userId && !n.isRead
    ).length;

    return NextResponse.json({ unreadCount });
  } catch (error) {
    console.error("Error getting unread count:", error);
    return NextResponse.json(
      { error: "Failed to get unread count" },
      { status: 500 }
    );
  }
}
