"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Lawyer, LawyerRegistrationData, AgreementRequest, Transaction, Payout, PayoutMethod } from "@/types/lawyer";
import { MOCK_LAWYERS, MOCK_AGREEMENTS, MOCK_TRANSACTIONS, MOCK_PAYOUTS } from "@/types/lawyer";

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
  // Earnings & Payouts
  transactions: Transaction[];
  payouts: Payout[];
  requestPayout: (amount: number, method: PayoutMethod) => Promise<boolean>;
  updateBankDetails: (bankDetails: { accountHolderName: string; accountNumber: string; ifscCode: string; bankName: string; } | null, upiId?: string) => Promise<boolean>;
  refreshTransactions: () => void;
  refreshPayouts: () => void;
}

const LawyerContext = createContext<LawyerContextType | undefined>(undefined);

const LAWYER_ROUTES = ["/lawyer"];

export function LawyerProvider({ children }: { children: ReactNode }) {
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [agreements, setAgreements] = useState<AgreementRequest[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Load lawyer session
  useEffect(() => {
    const storedLawyer = localStorage.getItem("sakshi_lawyer");
    const storedAuth = localStorage.getItem("sakshi_lawyer_auth");

    if (storedLawyer && storedAuth === "true") {
      try {
        const parsed = JSON.parse(storedLawyer);
        setLawyer(parsed);
        // Load mock agreements for this lawyer
        const lawyerAgreements = MOCK_AGREEMENTS.filter(a => a.lawyerId === parsed.id);
        setAgreements(lawyerAgreements);
      } catch (error) {
        console.error("Error parsing lawyer data:", error);
        localStorage.removeItem("sakshi_lawyer");
        localStorage.removeItem("sakshi_lawyer_auth");
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
      localStorage.setItem("sakshi_lawyer", JSON.stringify(foundLawyer));
      localStorage.setItem("sakshi_lawyer_auth", "true");
      
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
      address: data.city + ", " + data.state, // Temporary address
      pincode: "000000", // Default pincode
      latitude: 0, // Will be geocoded on server
      longitude: 0,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      status: "offline",
      verificationStatus: "pending",
      isActive: true,
      totalDocumentsSigned: 0,
      rating: 0,
      totalReviews: 0,
      totalEarnings: 0,
      pendingPayout: 0,
      withdrawnAmount: 0,
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    // Store in localStorage (mock)
    setLawyer(newLawyer);
    localStorage.setItem("sakshi_lawyer", JSON.stringify(newLawyer));
    localStorage.setItem("sakshi_lawyer_auth", "true");
    setAgreements([]);
    
    return true;
  };

  const logout = () => {
    setLawyer(null);
    setAgreements([]);
    localStorage.removeItem("sakshi_lawyer");
    localStorage.removeItem("sakshi_lawyer_auth");
    router.push("/lawyer/login");
  };

  const updateStatus = (status: Lawyer["status"]) => {
    if (lawyer) {
      const updated = { ...lawyer, status, lastActiveAt: new Date().toISOString() };
      setLawyer(updated);
      localStorage.setItem("sakshi_lawyer", JSON.stringify(updated));
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

  const markAsOpened = async (agreementId: string) => {
    const agreement = agreements.find(a => a.id === agreementId);
    
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

    // Send notification to user
    if (agreement && lawyer) {
      try {
        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "agreement_opened",
            title: "Document Opened",
            message: `${lawyer.fullName} opened your ${agreement.documentTitle || "document"}`,
            recipientId: agreement.userId,
            recipientType: "user",
            agreementId: agreement.id,
            documentId: agreement.documentId,
            documentType: agreement.documentType,
            documentTitle: agreement.documentTitle,
            lawyerId: lawyer.id,
            lawyerName: lawyer.fullName,
            priority: "medium",
          }),
        });
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
  };

  const markAsReviewing = async (agreementId: string) => {
    const agreement = agreements.find(a => a.id === agreementId);
    
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

    // Send notification to user
    if (agreement && lawyer) {
      try {
        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "agreement_reviewing",
            title: "Reviewing Document",
            message: `${lawyer.fullName} is reviewing your ${agreement.documentTitle || "document"}`,
            recipientId: agreement.userId,
            recipientType: "user",
            agreementId: agreement.id,
            documentId: agreement.documentId,
            documentType: agreement.documentType,
            documentTitle: agreement.documentTitle,
            lawyerId: lawyer.id,
            lawyerName: lawyer.fullName,
            priority: "medium",
          }),
        });
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
  };

  const signDocument = async (agreementId: string, signatureData: any) => {
    if (!lawyer) return;

    const agreement = agreements.find(a => a.id === agreementId);

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
    localStorage.setItem("sakshi_lawyer", JSON.stringify(updated));

    // Send notification to user
    if (agreement) {
      try {
        await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "agreement_signed",
            title: "Document Signed! 🎉",
            message: `Your ${agreement.documentTitle || "document"} has been signed by ${lawyer.fullName}`,
            recipientId: agreement.userId,
            recipientType: "user",
            agreementId: agreement.id,
            documentId: agreement.documentId,
            documentType: agreement.documentType,
            documentTitle: agreement.documentTitle,
            lawyerId: lawyer.id,
            lawyerName: lawyer.fullName,
            priority: "high",
          }),
        });

        // Also send completed notification after a delay
        setTimeout(async () => {
          await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "agreement_completed",
              title: "Agreement Completed",
              message: `Your ${agreement.documentTitle || "document"} is ready for download`,
              recipientId: agreement.userId,
              recipientType: "user",
              agreementId: agreement.id,
              documentId: agreement.documentId,
              documentType: agreement.documentType,
              documentTitle: agreement.documentTitle,
              lawyerId: lawyer.id,
              lawyerName: lawyer.fullName,
              priority: "high",
            }),
          });
        }, 2000);
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
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

  // Earnings & Payout Functions
  const refreshTransactions = () => {
    if (lawyer) {
      const lawyerTransactions = MOCK_TRANSACTIONS.filter(t => t.lawyerId === lawyer.id);
      setTransactions(lawyerTransactions);
    }
  };

  const refreshPayouts = () => {
    if (lawyer) {
      const lawyerPayouts = MOCK_PAYOUTS.filter(p => p.lawyerId === lawyer.id);
      setPayouts(lawyerPayouts);
    }
  };

  const requestPayout = async (amount: number, method: PayoutMethod): Promise<boolean> => {
    if (!lawyer) return false;
    
    if (amount < 500) {
      throw new Error("Minimum withdrawal amount is ₹500");
    }
    
    if (amount > lawyer.pendingPayout) {
      throw new Error("Insufficient balance");
    }

    // Create payout request
    const newPayout: Payout = {
      id: `payout_${Date.now()}`,
      lawyerId: lawyer.id,
      amount,
      status: "pending",
      method,
      ...(method === "bank_transfer" && lawyer.bankDetails ? {
        bankAccountNumber: lawyer.bankDetails.accountNumber,
        ifscCode: lawyer.bankDetails.ifscCode,
        bankName: lawyer.bankDetails.bankName,
        accountHolderName: lawyer.bankDetails.accountHolderName,
      } : {}),
      ...(method === "upi" && lawyer.upiId ? {
        upiId: lawyer.upiId,
      } : {}),
      requestedAt: new Date().toISOString(),
    };

    setPayouts(prev => [newPayout, ...prev]);
    
    // Update lawyer's pending payout
    const updatedLawyer = {
      ...lawyer,
      pendingPayout: lawyer.pendingPayout - amount,
    };
    setLawyer(updatedLawyer);
    localStorage.setItem("sakshi_lawyer", JSON.stringify(updatedLawyer));

    // Notify admin (mock)
    await fetch("/api/lawyer/payout/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payoutId: newPayout.id,
        lawyerId: lawyer.id,
        amount,
        method,
      }),
    }).catch(() => {/* Silent fail for mock */});

    return true;
  };

  const updateBankDetails = async (bankDetails: { accountHolderName: string; accountNumber: string; ifscCode: string; bankName: string; } | null, upiId?: string): Promise<boolean> => {
    if (!lawyer) return false;

    const updatedLawyer = {
      ...lawyer,
      bankDetails: bankDetails || undefined,
      upiId: upiId || undefined,
    };
    
    setLawyer(updatedLawyer);
    localStorage.setItem("sakshi_lawyer", JSON.stringify(updatedLawyer));
    return true;
  };

  // Load transactions and payouts when lawyer loads
  useEffect(() => {
    if (lawyer) {
      refreshTransactions();
      refreshPayouts();
    }
  }, [lawyer]);

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
        // Earnings & Payouts
        transactions,
        payouts,
        requestPayout,
        updateBankDetails,
        refreshTransactions,
        refreshPayouts,
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
