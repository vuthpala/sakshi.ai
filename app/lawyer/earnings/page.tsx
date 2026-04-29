"use client";

import { useState, useMemo } from "react";
import { useLawyer } from "@/lib/lawyer-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText, TrendingUp, Wallet, Clock, IndianRupee, ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type DateFilter = "all" | "week" | "month" | "year";

export default function EarningsPage() {
  const { transactions, payouts, lawyer } = useLawyer();
  const { toast } = useToast();
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const filteredTransactions = useMemo(() => {
    if (dateFilter === "all") return transactions;
    
    const now = new Date();
    const cutoff = new Date();
    
    switch (dateFilter) {
      case "week":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "year":
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return transactions.filter(t => new Date(t.completedAt) >= cutoff);
  }, [transactions, dateFilter]);

  const totalEarnings = filteredTransactions.reduce((sum, t) => sum + t.lawyerEarning, 0);
  const totalDocuments = filteredTransactions.length;

  const exportToCSV = () => {
    const headers = ["Date", "Document Type", "Client", "Total Amount", "Your Earning", "Status"];
    const rows = filteredTransactions.map(t => [
      format(new Date(t.completedAt), "dd/MM/yyyy"),
      t.documentTitle,
      t.clientName,
      t.totalAmount.toFixed(2),
      t.lawyerEarning.toFixed(2),
      t.status,
    ]);
    
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `earnings_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    
    toast({
      title: "Export Complete",
      description: "Your earnings data has been downloaded.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "refunded":
        return <Badge className="bg-red-100 text-red-800">Refunded</Badge>;
      case "disputed":
        return <Badge className="bg-yellow-100 text-yellow-800">Disputed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <p className="text-center text-slate-500">Please log in to view earnings</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/lawyer/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeftRight className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-slate-900">Earnings & Payouts</h1>
            </div>
            <Link href="/lawyer/withdraw">
              <Button>
                <Wallet className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Earnings</p>
                  <p className="text-2xl font-bold text-slate-900">₹{lawyer.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Available Balance</p>
                  <p className="text-2xl font-bold text-slate-900">₹{lawyer.pendingPayout.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Withdrawn</p>
                  <p className="text-2xl font-bold text-slate-900">₹{lawyer.withdrawnAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <IndianRupee className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Documents Signed</p>
                  <p className="text-2xl font-bold text-slate-900">{lawyer.totalDocumentsSigned}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payouts */}
        {payouts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payouts.slice(0, 3).map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">₹{payout.amount.toLocaleString()}</p>
                      <p className="text-sm text-slate-500">
                        {payout.method === "upi" ? `UPI: ${payout.upiId}` : `Bank: ${payout.bankName}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={payout.status === "paid" ? "default" : payout.status === "pending" ? "secondary" : "destructive"}
                      >
                        {payout.status}
                      </Badge>
                      <p className="text-sm text-slate-500 mt-1">
                        {format(new Date(payout.requestedAt), "dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transaction History
              </CardTitle>
              <div className="flex items-center gap-4">
                <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilter)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportToCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Your Earning (80%)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No transactions found for the selected period.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {format(new Date(transaction.completedAt), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.documentTitle}</p>
                          <p className="text-sm text-slate-500">{transaction.documentType}</p>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.clientName}</TableCell>
                      <TableCell className="text-right">₹{transaction.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium text-emerald-600">
                        ₹{transaction.lawyerEarning.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {/* Total Row */}
            {filteredTransactions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                <p className="text-slate-500">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </p>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Total Earnings</p>
                  <p className="text-2xl font-bold text-slate-900">₹{totalEarnings.toFixed(2)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
