"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Lawyer, LawyerRegistrationData, AgreementRequest } from "@/types/lawyer";
import { MOCK_LAWYERS, MOCK_AGREEMENTS } from "@/types/lawyer";

interface LawyerContextType {
  lawyer: Lawyer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  agreements: AgreementRequest[];
  notifications: number;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: LawyerRegistrationData) => Promise<boolean>;
  logout: () => void;
  updateStatus: (status: Lawyer["status"]) => void;
  refreshAgreements: () => void;
  sendMessage: (agreementId: string, message: string) => void;
  markAsOpened: (agreementId: string) => void;
  markAsReviewing: (agreementId: string) => void;
  signDocument: (agreementId: string, signatureData: any) => void;
  editDocument: (agreementId: string, edits: any[]) => void;
}

const LawyerContext = createContext<LawyerContextType | undefined>(undefined);

const LAWYER_ROUTES = ["/lawyer"];

export function LawyerProvider({ children }: { children: ReactNode }) {
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [agreements, setAgreements] = useState<AgreementRequest[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Load lawyer session
  useEffect(() => {
    const storedLawyer = localStorage.getItem("paperwise_lawyer");
    const storedAuth = localStorage.getItem("paperwise_lawyer_auth");

    if (storedLawyer && storedAuth === "true") {
      try {
        const parsed = JSON.parse(storedLawyer);
        setLawyer(parsed);
        // Load mock agreements for this lawyer
        const lawyerAgreements = MOCK_AGREEMENTS.filter(a => a.lawyerId === parsed.id);
        setAgreements(lawyerAgreements);
      } catch (error) {
        console.error("Error parsing lawyer data:", error);
        localStorage.removeItem("paperwise_lawyer");
        localStorage.removeItem("paperwise_lawyer_auth");
      }
    }
    setIsLoading(false);
  }, []);

  // Protect lawyer routes
  useEffect(() => {
    if (isLoading) return;

    const isLawyerRoute = LAWYER_ROUTES.some((route) => pathname?.startsWith(route));
    const isAuthenticated = !!lawyer;

    if (isLawyerRoute && !isAuthenticated && pathname !== "/lawyer/login" && pathname !== "/lawyer/register") {
      router.push("/lawyer/login");
    } else if (isAuthenticated && (pathname === "/lawyer/login" || pathname === "/lawyer/register")) {
      router.push("/lawyer/dashboard");
    }
  }, [lawyer, isLoading, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, validate against backend
    const foundLawyer = MOCK_LAWYERS.find(l => l.email === email);
    
    if (foundLawyer) {
      // Store in localStorage (mock auth)
      setLawyer(foundLawyer);
      localStorage.setItem("paperwise_lawyer", JSON.stringify(foundLawyer));
      localStorage.setItem("paperwise_lawyer_auth", "true");
      
      // Load agreements
      const lawyerAgreements = MOCK_AGREEMENTS.filter(a => a.lawyerId === foundLawyer.id);
      setAgreements(lawyerAgreements);
      
      return true;
    }
    return false;
  };

  const register = async (data: LawyerRegistrationData): Promise<boolean> => {
    // Mock registration - in production, send to backend
    const newLawyer: Lawyer = {
      id: `lawyer_${Date.now()}`,
      ...data,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      status: "offline",
      verificationStatus: "pending",
      isActive: true,
      totalDocumentsSigned: 0,
      rating: 0,
      totalReviews: 0,
      totalEarnings: 0,
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    // Store in localStorage (mock)
    setLawyer(newLawyer);
    localStorage.setItem("paperwise_lawyer", JSON.stringify(newLawyer));
    localStorage.setItem("paperwise_lawyer_auth", "true");
    setAgreements([]);
    
    return true;
  };

  const logout = () => {
    setLawyer(null);
    setAgreements([]);
    localStorage.removeItem("paperwise_lawyer");
    localStorage.removeItem("paperwise_lawyer_auth");
    router.push("/lawyer/login");
  };

  const updateStatus = (status: Lawyer["status"]) => {
    if (lawyer) {
      const updated = { ...lawyer, status, lastActiveAt: new Date().toISOString() };
      setLawyer(updated);
      localStorage.setItem("paperwise_lawyer", JSON.stringify(updated));
    }
  };

  const refreshAgreements = () => {
    if (lawyer) {
      const lawyerAgreements = MOCK_AGREEMENTS.filter(a => a.lawyerId === lawyer.id);
      setAgreements(lawyerAgreements);
    }
  };

  const sendMessage = (agreementId: string, message: string) => {
    if (!lawyer) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: lawyer.id,
      senderType: "lawyer" as const,
      senderName: lawyer.fullName,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setAgreements(prev => prev.map(agreement => {
      if (agreement.id === agreementId) {
        return {
          ...agreement,
          messages: [...agreement.messages, newMessage],
        };
      }
      return agreement;
    }));
  };

  const markAsOpened = (agreementId: string) => {
    setAgreements(prev => prev.map(agreement => {
      if (agreement.id === agreementId && !agreement.openedAt) {
        return {
          ...agreement,
          status: "opened",
          openedAt: new Date().toISOString(),
        };
      }
      return agreement;
    }));
  };

  const markAsReviewing = (agreementId: string) => {
    setAgreements(prev => prev.map(agreement => {
      if (agreement.id === agreementId) {
        return {
          ...agreement,
          status: "reviewing",
          reviewingAt: new Date().toISOString(),
        };
      }
      return agreement;
    }));
  };

  const signDocument = (agreementId: string, signatureData: any) => {
    if (!lawyer) return;

    setAgreements(prev => prev.map(agreement => {
      if (agreement.id === agreementId) {
        return {
          ...agreement,
          status: "completed",
          signedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          lawyerSignature: {
            type: signatureData.type,
            data: signatureData.data,
            signedAt: new Date().toISOString(),
          },
        };
      }
      return agreement;
    }));

    // Update lawyer stats
    const updated = {
      ...lawyer,
      totalDocumentsSigned: lawyer.totalDocumentsSigned + 1,
      totalEarnings: lawyer.totalEarnings + (agreements.find(a => a.id === agreementId)?.lawyerFee || 0),
    };
    setLawyer(updated);
    localStorage.setItem("paperwise_lawyer", JSON.stringify(updated));
  };

  const editDocument = (agreementId: string, edits: any[]) => {
    setAgreements(prev => prev.map(agreement => {
      if (agreement.id === agreementId) {
        return {
          ...agreement,
          status: "editing",
          editedAt: new Date().toISOString(),
          edits: [...(agreement.edits || []), ...edits],
        };
      }
      return agreement;
    }));
  };

  // Calculate unread notifications
  const notifications = agreements.filter(a => a.status === "new").length;

  return (
    <LawyerContext.Provider
      value={{
        lawyer,
        isAuthenticated: !!lawyer,
        isLoading,
        agreements,
        notifications,
        login,
        register,
        logout,
        updateStatus,
        refreshAgreements,
        sendMessage,
        markAsOpened,
        markAsReviewing,
        signDocument,
        editDocument,
      }}
    >
      {children}
    </LawyerContext.Provider>
  );
}

export function useLawyer() {
  const context = useContext(LawyerContext);
  if (context === undefined) {
    throw new Error("useLawyer must be used within a LawyerProvider");
  }
  return context;
}
