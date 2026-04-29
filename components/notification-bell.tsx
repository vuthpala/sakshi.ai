"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useNotifications } from "@/lib/notification-context";
import { useAuth } from "@/lib/auth-context";
import { useLawyer } from "@/lib/lawyer-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Check,
  FileText,
  MessageSquare,
  Star,
  Clock,
  CheckCheck,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import type { Notification } from "@/types/notification";

interface NotificationBellProps {
  userType: "user" | "lawyer";
}

export function NotificationBell({ userType }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { lawyer } = useLawyer();
  const {
    notifications,
    unreadCount,
    isConnected,
    connect,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
  } = useNotifications();

  const userId = userType === "lawyer" ? lawyer?.id : user?.id;

  // Connect to notifications on mount
  useEffect(() => {
    if (userId) {
      connect(userId, userType);
      fetchNotifications(userId, userType);
    }
  }, [userId, userType, connect, fetchNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get icon for notification type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_agreement":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "agreement_opened":
        return <ExternalLink className="w-5 h-5 text-purple-500" />;
      case "agreement_reviewing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "agreement_editing":
        return <FileText className="w-5 h-5 text-orange-500" />;
      case "agreement_signed":
      case "agreement_completed":
        return <Check className="w-5 h-5 text-green-500" />;
      case "message_received":
        return <MessageSquare className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  // Get link for notification
  const getNotificationLink = (notification: Notification): string => {
    if (notification.agreementId) {
      if (userType === "lawyer") {
        return `/lawyer/agreements/${notification.agreementId}`;
      }
      return `/documents/${notification.documentId}`;
    }
    return userType === "lawyer" ? "/lawyer/dashboard" : "/dashboard";
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
        
        {/* Connection Status */}
        <span
          className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <div>
              <h3 className="font-semibold text-white">Notifications</h3>
              <p className="text-xs text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread` : "No new notifications"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={getNotificationLink(notification)}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex items-start gap-3 p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                    !notification.isRead ? "bg-slate-800/30" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      !notification.isRead ? "text-white" : "text-slate-300"
                    }`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatDistanceToNow(notification.createdAt)}
                    </p>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                  )}
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400">No notifications yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  You&apos;ll see updates about your documents here
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-800 bg-slate-800/50">
            <Link
              href={userType === "lawyer" ? "/lawyer/dashboard" : "/dashboard"}
              onClick={() => setIsOpen(false)}
              className="text-xs text-amber-500 hover:text-amber-400 flex items-center justify-center gap-1"
            >
              View all notifications
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
