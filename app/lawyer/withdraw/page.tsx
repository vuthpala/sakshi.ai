"use client";

import { useState } from "react";
import { useLawyer } from "@/lib/lawyer-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Building2, 
  Smartphone, 
  ArrowLeft, 
  AlertCircle,
  CheckCircle2,
  Info,
  IndianRupee,
  Landmark
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const MIN_WITHDRAWAL = 500;

export default function WithdrawPage() {
  const { lawyer, transactions, requestPayout, updateBankDetails } = useLawyer();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bank");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Bank form state
  const [accountHolderName, setAccountHolderName] = useState(lawyer?.bankDetails?.accountHolderName || "");
  const [accountNumber, setAccountNumber] = useState(lawyer?.bankDetails?.accountNumber || "");
  const [ifscCode, setIfscCode] = useState(lawyer?.bankDetails?.ifscCode || "");
  const [bankName, setBankName] = useState(lawyer?.bankDetails?.bankName || "");
  
  // UPI form state
  const [upiId, setUpiId] = useState(lawyer?.upiId || "");
  
  const availableBalance = lawyer?.pendingPayout || 0;
  const canWithdraw = availableBalance >= MIN_WITHDRAWAL;

  const validateBankDetails = () => {
    if (!accountHolderName.trim()) return "Account holder name is required";
    if (!accountNumber.trim() || accountNumber.length < 9) return "Valid account number is required";
    if (!ifscCode.trim() || ifscCode.length !== 11) return "Valid IFSC code is required (11 characters)";
    if (!bankName.trim()) return "Bank name is required";
    return null;
  };

  const validateUpiId = () => {
    if (!upiId.trim()) return "UPI ID is required";
    if (!upiId.includes("@")) return "Valid UPI ID is required (e.g., name@upi)";
    return null;
  };

  const handleSaveBankDetails = async () => {
    const error = validateBankDetails();
    if (error) {
      toast({ title: "Validation Error", description: error, variant: "destructive" });
      return;
    }

    const success = await updateBankDetails({
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
    });

    if (success) {
      toast({ title: "Success", description: "Bank details saved successfully" });
    }
  };

  const handleSaveUpiId = async () => {
    const error = validateUpiId();
    if (error) {
      toast({ title: "Validation Error", description: error, variant: "destructive" });
      return;
    }

    const success = await updateBankDetails(null, upiId);

    if (success) {
      toast({ title: "Success", description: "UPI ID saved successfully" });
    }
  };

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    if (withdrawAmount < MIN_WITHDRAWAL) {
      toast({ title: "Error", description: `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL}`, variant: "destructive" });
      return;
    }

    if (withdrawAmount > availableBalance) {
      toast({ title: "Error", description: "Insufficient balance", variant: "destructive" });
      return;
    }

    const method = activeTab === "bank" ? "bank_transfer" : "upi";
    
    if (method === "bank_transfer") {
      const error = validateBankDetails();
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
        return;
      }
      await handleSaveBankDetails();
    } else {
      const error = validateUpiId();
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
        return;
      }
      await handleSaveUpiId();
    }

    setIsSubmitting(true);
    
    try {
      await requestPayout(withdrawAmount, method);
      setShowSuccess(true);
      toast({
        title: "Payout Requested",
        description: `₹${withdrawAmount} has been requested for withdrawal. You will receive it within 2-3 business days.`,
      });
      setAmount("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to request payout",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <p className="text-center text-slate-500">Please log in to access withdrawals</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payout Requested!</h2>
            <p className="text-slate-500 mb-6">
              Your withdrawal request has been submitted successfully. You will receive the amount within 2-3 business days.
            </p>
            <div className="space-y-3">
              <Link href="/lawyer/earnings">
                <Button className="w-full">View Transaction History</Button>
              </Link>
              <Link href="/lawyer/dashboard">
                <Button variant="outline" className="w-full">Back to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Link href="/lawyer/earnings">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-slate-900">Request Withdrawal</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <Card className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Available Balance</p>
                <p className="text-3xl font-bold">₹{availableBalance.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Wallet className="h-8 w-8" />
              </div>
            </div>
            {!canWithdraw && (
              <Alert className="mt-4 bg-white/10 border-white/20">
                <AlertCircle className="h-4 w-4 text-white" />
                <AlertDescription className="text-white">
                  Minimum withdrawal amount is ₹{MIN_WITHDRAWAL}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Details</CardTitle>
            <CardDescription>
              Enter the amount you want to withdraw and select your preferred payout method.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  min={MIN_WITHDRAWAL}
                  max={availableBalance}
                />
              </div>
              <div className="flex gap-2">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                    disabled={amt > availableBalance}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payout Method Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  Bank Transfer
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  UPI
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bank" className="space-y-4 mt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Bank transfers typically take 2-3 business days to process.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input
                      id="accountHolder"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="As per bank records"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="XXXXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ifsc">IFSC Code</Label>
                    <Input
                      id="ifsc"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      placeholder="HDFC0001234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g., HDFC Bank"
                    />
                  </div>
                </div>

                {lawyer.bankDetails && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500">Saved Bank Account</p>
                    <p className="font-medium">{lawyer.bankDetails.accountNumber.slice(-4).padStart(lawyer.bankDetails.accountNumber.length, "*")}</p>
                    <p className="text-sm text-slate-500">{lawyer.bankDetails.bankName}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upi" className="space-y-4 mt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    UPI transfers are usually instant but may take up to 24 hours.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                  />
                  <p className="text-sm text-slate-500">
                    Enter your UPI ID (e.g., name@okicici, name@paytm)
                  </p>
                </div>

                {lawyer.upiId && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500">Saved UPI ID</p>
                    <p className="font-medium">{lawyer.upiId}</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Submit Button */}
            <Button 
              onClick={handleWithdraw}
              disabled={!canWithdraw || isSubmitting || !amount}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Processing..." : `Withdraw ₹${amount || 0}`}
            </Button>

            <p className="text-xs text-center text-slate-500">
              By clicking withdraw, you agree to our Terms of Service and authorize us to process this payout.
            </p>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">Platform Fee</Badge>
              <p className="text-sm text-slate-600">
                We charge a 20% platform fee on each document signing. You keep 80%.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">Processing Time</Badge>
              <p className="text-sm text-slate-600">
                Bank transfers: 2-3 business days<br />
                UPI: Instant to 24 hours
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">Minimum</Badge>
              <p className="text-sm text-slate-600">
                Minimum withdrawal amount is ₹{MIN_WITHDRAWAL}. There is no maximum limit.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
