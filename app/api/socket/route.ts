import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "@/types/notification";

// Store connected users and their socket IDs
const connectedUsers = new Map<string, string>(); // userId -> socketId
const connectedLawyers = new Map<string, string>(); // lawyerId -> socketId

// In-memory storage for notifications (replace with database in production)
const notificationsStore = new Map<string, any[]>();

export async function GET(req: NextApiRequest) {
  if ((req as any).socket?.server?.io) {
    return new Response("Socket.IO server already running", { status: 200 });
  }

  const res = { socket: { server: {} } };
  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
    (req as any).socket.server as NetServer,
    {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    }
  );

  (req as any).socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join room based on user type and ID
    socket.on("join", (userId: string, userType: "user" | "lawyer") => {
      socket.join(userId);
      
      if (userType === "lawyer") {
        connectedLawyers.set(userId, socket.id);
      } else {
        connectedUsers.set(userId, socket.id);
      }
      
      console.log(`${userType} ${userId} joined room`);
      
      // Send unread count
      const unreadCount = getUnreadCount(userId);
      socket.emit("unread_count", unreadCount);
    });

    // Leave room
    socket.on("leave", (userId: string) => {
      socket.leave(userId);
      connectedUsers.delete(userId);
      connectedLawyers.delete(userId);
      console.log(`User ${userId} left room`);
    });

    // Mark single notification as read
    socket.on("mark_read", (notificationId: string) => {
      // Update in storage
      for (const [userId, notifications] of notificationsStore.entries()) {
        const notif = notifications.find((n) => n.id === notificationId);
        if (notif) {
          notif.isRead = true;
          notif.readAt = new Date().toISOString();
          
          // Update unread count
          const unreadCount = getUnreadCount(userId);
          io.to(userId).emit("unread_count", unreadCount);
          break;
        }
      }
    });

    // Mark all notifications as read
    socket.on("mark_all_read", () => {
      // Get userId from socket rooms
      const rooms = Array.from(socket.rooms);
      const userId = rooms.find((r) => r !== socket.id);
      
      if (userId) {
        const notifications = notificationsStore.get(userId) || [];
        notifications.forEach((n) => {
          if (!n.isRead) {
            n.isRead = true;
            n.readAt = new Date().toISOString();
          }
        });
        
        io.to(userId).emit("unread_count", 0);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      // Clean up maps
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
      for (const [lawyerId, socketId] of connectedLawyers.entries()) {
        if (socketId === socket.id) {
          connectedLawyers.delete(lawyerId);
          break;
        }
      }
    });
  });

  // Helper function to get unread count
  function getUnreadCount(userId: string): number {
    const notifications = notificationsStore.get(userId) || [];
    return notifications.filter((n) => !n.isRead).length;
  }

  // Export helper to send notifications
  (global as any).sendNotification = (
    recipientId: string,
    notification: any
  ) => {
    // Store notification
    const userNotifications = notificationsStore.get(recipientId) || [];
    userNotifications.unshift(notification);
    notificationsStore.set(recipientId, userNotifications);

    // Send to socket
    io.to(recipientId).emit("notification", notification);
    
    // Update unread count
    const unreadCount = getUnreadCount(recipientId);
    io.to(recipientId).emit("unread_count", unreadCount);
  };

  return new Response("Socket.IO server initialized", { status: 200 });
}
