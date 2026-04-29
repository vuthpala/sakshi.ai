"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Document {
  id: string;
  type: string;
  title: string;
  createdAt: string;
  status: "draft" | "completed" | "downloaded";
  downloadUrl?: string;
}

interface User {
  email?: string;
  phone?: string;
  name?: string;
  documents?: Document[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  addDocument: (document: Omit<Document, "id" | "createdAt">) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("sakshi_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Protect routes
  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthenticated = !!user;

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if not authenticated and trying to access protected route
      router.push("/login");
    } else if (isAuthenticated && pathname === "/login") {
      // Redirect to home if already logged in and trying to access login
      router.push("/");
    }
  }, [user, isLoading, pathname, router]);

  const login = (userData: User) => {
    const userWithDocs = { ...userData, documents: userData.documents || [] };
    setUser(userWithDocs);
    localStorage.setItem("sakshi_user", JSON.stringify(userWithDocs));
    localStorage.setItem("sakshi_auth", "true");
  };

  const addDocument = (document: Omit<Document, "id" | "createdAt">) => {
    if (!user) return;
    const newDoc: Document = {
      ...document,
      id: `doc_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedUser = {
      ...user,
      documents: [...(user.documents || []), newDoc],
    };
    setUser(updatedUser);
    localStorage.setItem("sakshi_user", JSON.stringify(updatedUser));
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      documents: (user.documents || []).map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    };
    setUser(updatedUser);
    localStorage.setItem("sakshi_user", JSON.stringify(updatedUser));
  };

  const deleteDocument = (id: string) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      documents: (user.documents || []).filter((doc) => doc.id !== id),
    };
    setUser(updatedUser);
    localStorage.setItem("sakshi_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sakshi_user");
    localStorage.removeItem("sakshi_auth");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        addDocument,
        updateDocument,
        deleteDocument,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook to protect components
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}
