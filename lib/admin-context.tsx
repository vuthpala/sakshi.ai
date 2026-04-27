"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminUser {
  email: string;
  name: string;
  role: "admin" | "superadmin";
}

interface AdminContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Admin routes that require authentication
const ADMIN_ROUTES = ["/admin"];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check for existing admin session on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("paperwise_admin");
    const storedAuth = localStorage.getItem("paperwise_admin_auth");

    if (storedAdmin && storedAuth === "true") {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error("Error parsing admin data:", error);
        localStorage.removeItem("paperwise_admin");
        localStorage.removeItem("paperwise_admin_auth");
      }
    }
    setIsLoading(false);
  }, []);

  // Protect admin routes
  useEffect(() => {
    if (isLoading) return;

    const isAdminRoute = ADMIN_ROUTES.some((route) => pathname?.startsWith(route));
    const isAuthenticated = !!admin;

    if (isAdminRoute && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (isAuthenticated && pathname === "/admin/login") {
      router.push("/admin");
    }
  }, [admin, isLoading, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple admin authentication (in production, use proper backend auth)
    const ADMIN_CREDENTIALS = [
      { email: "admin@paperwise.in", password: "admin123", name: "Admin", role: "admin" as const },
      { email: "super@paperwise.in", password: "super123", name: "Super Admin", role: "superadmin" as const },
    ];

    const matched = ADMIN_CREDENTIALS.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (matched) {
      const adminUser: AdminUser = {
        email: matched.email,
        name: matched.name,
        role: matched.role,
      };
      setAdmin(adminUser);
      localStorage.setItem("paperwise_admin", JSON.stringify(adminUser));
      localStorage.setItem("paperwise_admin_auth", "true");
      return true;
    }

    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("paperwise_admin");
    localStorage.removeItem("paperwise_admin_auth");
    router.push("/admin/login");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
