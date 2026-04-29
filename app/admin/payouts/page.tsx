"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MOCK_PAYOUTS, MOCK_LAWYERS, Payout } from "@/types/lawyer";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  IndianRupee, 
  Building2, 
  Smartphone,
  Search,
  Filter,
  MoreHorizontal,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function AdminPayoutsPage() {
  const { toast } = useToast();
  const [payouts, setPayouts] = useState<Payout[]>(MOCK_PAYOUTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredPayouts = payouts.filter(payout => {
    const lawyer = MOCK_LAWYERS.find(l => l.id === payout.lawyerId);
    const matchesSearch = 
      lawyer?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payout.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingPayouts = filteredPayouts.filter(p => p.status === "pending");
  const processedPayouts = filteredPayouts.filter(p => p.status === "paid");
  const failedPayouts = filteredPayouts.filter(p => p.status === "failed" || p.status === "rejected");

  const totalPendingAmount = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);
  const totalProcessedAmount = processedPayouts.reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Processing</Badge>;
      case "paid":
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Paid</Badge>;
      case "failed":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = async (payout: Payout) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedPayouts = payouts.map(p => 
      p.id === payout.id 
        ? { ...p, status: "paid" as const, processedAt: new Date().toISOString(), adminNote }
        : p
    );
    
    setPayouts(updatedPayouts);
    setSelectedPayout(null);
    setAdminNote("");
    
    toast({
      title: "Payout Approved",
      description: `₹${payout.amount} has been approved and processed.`,
    });
    
    setIsProcessing(false);
  };

  const handleReject = async (payout: Payout) => {
    if (!adminNote.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedPayouts = payouts.map(p => 
      p.id === payout.id 
        ? { ...p, status: "rejected" as const, adminNote }
        : p
    );
    
    setPayouts(updatedPayouts);
    setSelectedPayout(null);
    setAdminNote("");
    
    toast({
      title: "Payout Rejected",
      description: `Payout request has been rejected with reason: ${adminNote}`,
    });
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-slate-900">Payout Management</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Pending Payouts</p>
              <p className="text-2xl font-bold">{pendingPayouts.length}</p>
              <p className="text-sm text-slate-500">₹{totalPendingAmount.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Processed Today</p>
              <p className="text-2xl font-bold">{processedPayouts.filter(p => new Date(p.processedAt || 0).toDateString() === new Date().toDateString()).length}</p>
              <p className="text-sm text-green-600">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Total Processed (All Time)</p>
              <p className="text-2xl font-bold">{processedPayouts.length}</p>
              <p className="text-sm text-slate-500">₹{totalProcessedAmount.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Failed/Rejected</p>
              <p className="text-2xl font-bold">{failedPayouts.length}</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by lawyer name, email, or payout ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Payouts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Requests</CardTitle>
            <CardDescription>Manage lawyer withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Lawyer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      No payout requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayouts.map((payout) => {
                    const lawyer = MOCK_LAWYERS.find(l => l.id === payout.lawyerId);
                    return (
                      <TableRow key={payout.id}>
                        <TableCell className="font-mono text-sm">{payout.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{lawyer?.fullName || 'Unknown'}</p>
                            <p className="text-sm text-slate-500">{lawyer?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">₹{payout.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {payout.method === "upi" ? (
                              <><Smartphone className="h-4 w-4" /> UPI</>
                            ) : (
                              <><Building2 className="h-4 w-4" /> Bank</>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(payout.status)}</TableCell>
                        <TableCell>{format(new Date(payout.requestedAt), "dd MMM yyyy HH:mm")}</TableCell>
                        <TableCell>
                          {payout.status === "pending" && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => setSelectedPayout(payout)}
                              >
                                Review
                              </Button>
                            </div>
                          )}
                          {payout.status !== "pending" && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedPayout(payout)}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Review Dialog */}
        <Dialog open={!!selectedPayout} onOpenChange={() => setSelectedPayout(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Review Payout Request</DialogTitle>
              <DialogDescription>
                Review and approve or reject this payout request.
              </DialogDescription>
            </DialogHeader>
            
            {selectedPayout && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500">Amount</span>
                    <span className="text-xl font-bold">₹{selectedPayout.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Method</span>
                    <span className="flex items-center gap-1">
                      {selectedPayout.method === "upi" ? (
                        <><Smartphone className="h-4 w-4" /> UPI: {selectedPayout.upiId}</>
                      ) : (
                        <><Building2 className="h-4 w-4" /> Bank: {selectedPayout.bankName}</>
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Admin Note (optional for approval, required for rejection)</Label>
                  <Input
                    id="note"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add a note..."
                  />
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPayout(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedPayout)}
                    disabled={isProcessing}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedPayout)}
                    disabled={isProcessing}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve & Process
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
