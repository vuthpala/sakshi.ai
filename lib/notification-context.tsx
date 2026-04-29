"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { Notification } from "@/types/notification";
import { io, type Socket } from "socket.io-client";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  connect: (userId: string, userType: "user" | "lawyer") => void;
  disconnect: () => void;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: (userId: string, userType: "user" | "lawyer") => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const userIdRef = useRef<string | null>(null);

  // Connect to Socket.IO
  const connect = useCallback((userId: string, userType: "user" | "lawyer") => {
    if (socketRef.current?.connected) {
      console.log("Already connected to socket");
      return;
    }

    userIdRef.current = userId;

    const socket = io(process.env.NEXT_PUBLIC_APP_URL || "", {
      path: "/api/socket",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      
      // Join user room
      socket.emit("join", userId, userType);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("notification", (notification: Notification) => {
      console.log("New notification received:", notification);
      
      setNotifications((prev) => [notification, ...prev]);
      
      // Show browser notification if permission granted
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/icons/sakshi-logo.png",
          tag: notification.id,
        });
      }
      
      // Show toast notification (will integrate with toast system)
      if (typeof window !== "undefined" && (window as any).showNotificationToast) {
        (window as any).showNotificationToast(notification);
      }
    });

    socket.on("unread_count", (count: number) => {
      setUnreadCount(count);
    });

    socketRef.current = socket;
  }, []);

  // Disconnect from Socket.IO
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      if (userIdRef.current) {
        socketRef.current.emit("leave", userIdRef.current);
      }
      socketRef.current.disconnect();
      socketRef.current = null;
      userIdRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async (userId: string, userType: "user" | "lawyer") => {
    try {
      const response = await fetch(
        `/api/notifications?userId=${userId}&userType=${userType}&limit=50`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  // Mark single notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await fetch("/api/notifications/read", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationId,
          userId: userIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? { ...n, isRead: true, readAt: new Date().toISOString() }
            : n
        )
      );
      
      setUnreadCount((prev) => Math.max(0, prev - 1));
      
      // Emit via socket
      socketRef.current?.emit("mark_read", notificationId);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications/read", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userIdRef.current,
          markAll: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
          readAt: new Date().toISOString(),
        }))
      );
      
      setUnreadCount(0);
      
      // Emit via socket
      socketRef.current?.emit("mark_all_read");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, []);

  // Request browser notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isConnected,
        connect,
        disconnect,
        markAsRead,
        markAllAsRead,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
