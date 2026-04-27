"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLawyer } from "@/lib/lawyer-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scale,
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  Star,
  Bell,
  LogOut,
  User,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Eye,
} from "lucide-react";
import { getStatusColor, getStatusLabel } from "@/lib/lawyer-utils";

export default function LawyerDashboard() {
  const router = useRouter();
  const { lawyer, isAuthenticated, isLoading, agreements, notifications, logout, updateStatus } = useLawyer();
  const [activeTab, setActiveTab] = useState<"overview" | "agreements" | "earnings">("overview");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/lawyer/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !lawyer) {
    return null;
  }

  // Calculate stats
  const totalAgreements = agreements.length;
  const pendingAgreements = agreements.filter((a) => ["new", "opened", "reviewing", "editing"].includes(a.status)).length;
  const completedAgreements = agreements.filter((a) => a.status === "completed").length;
  const totalEarnings = lawyer.totalEarnings;

  // Get recent agreements (last 5)
  const recentAgreements = agreements.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600">
              <Scale className="h-5 w-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">PaperWise Lawyer</h1>
              <p className="text-xs text-slate-400">
                {lawyer.verificationStatus === "verified" ? (
                  <span className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="h-3 w-3" />
                    Verified Advocate
                  </span>
                ) : (
                  <span className="text-orange-400">Verification Pending</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {notifications}
                </span>
              )}
            </button>

            {/* Status Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Status:</span>
              <select
                value={lawyer.status}
                onChange={(e) => updateStatus(e.target.value as any)}
                className="text-sm px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="online">🟢 Online</option>
                <option value="busy">🟡 Busy</option>
                <option value="offline">🔴 Offline</option>
              </select>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{lawyer.fullName}</p>
                <p className="text-xs text-slate-400">{lawyer.barCouncilNumber}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                {lawyer.photo ? (
                  <img src={lawyer.photo} alt={lawyer.fullName} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-slate-800 rounded-lg mb-8 w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "overview" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("agreements")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "agreements" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Agreements ({totalAgreements})
          </button>
          <button
            onClick={() => setActiveTab("earnings")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "earnings" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Earnings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Agreements</p>
                      <p className="text-3xl font-bold text-white mt-1">{totalAgreements}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                      <FileText className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-green-400">{completedAgreements} completed</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-orange-400">{pendingAgreements} pending</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Pending Action</p>
                      <p className="text-3xl font-bold text-white mt-1">{pendingAgreements}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-orange-400">
                    {notifications > 0 ? `${notifications} new agreements waiting` : "No new agreements"}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Earnings</p>
                      <p className="text-3xl font-bold text-white mt-1">₹{totalEarnings.toLocaleString()}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-400">
                    ₹{Math.round(totalEarnings / 12).toLocaleString()} avg. per month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Rating</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-3xl font-bold text-white">{lawyer.rating.toFixed(1)}</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(lawyer.rating)
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                      <Star className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    Based on {lawyer.totalReviews} reviews
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            {pendingAgreements > 0 && (
              <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                        <AlertCircle className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">
                          You have {pendingAgreements} pending agreement{pendingAgreements > 1 ? "s" : ""}
                        </p>
                        <p className="text-sm text-slate-400">
                          Review and sign documents waiting in your inbox
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveTab("agreements")}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    >
                      View Agreements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Agreements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-500" />
                    Recent Agreements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-700">
                    {recentAgreements.length > 0 ? (
                      recentAgreements.map((agreement) => (
                        <div key={agreement.id} className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                          <div>
                            <p className="text-sm font-medium text-white">{agreement.documentTitle}</p>
                            <p className="text-xs text-slate-400">
                              {agreement.userName} • {agreement.documentLanguage}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={getStatusColor(agreement.status)}>
                              {getStatusLabel(agreement.status)}
                            </span>
                            <span className="text-sm font-medium text-amber-500">₹{agreement.lawyerFee}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">No agreements yet</p>
                        <p className="text-sm text-slate-500">Documents sent to you will appear here</p>
                      </div>
                    )}
                  </div>
                  {recentAgreements.length > 0 && (
                    <div className="p-4 border-t border-slate-700">
                      <button
                        onClick={() => setActiveTab("agreements")}
                        className="text-sm text-amber-500 hover:text-amber-400 font-medium"
                      >
                        View all agreements →
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                    Performance Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Documents Signed</span>
                      <span className="text-white font-medium">{lawyer.totalDocumentsSigned}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${Math.min((lawyer.totalDocumentsSigned / 200) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Client Rating</span>
                      <span className="text-white font-medium">{lawyer.rating}/5.0</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(lawyer.rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Response Rate</span>
                      <span className="text-white font-medium">98%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "98%" }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">{lawyer.totalDocumentsSigned}</p>
                        <p className="text-xs text-slate-400">Total Signed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{lawyer.totalReviews}</p>
                        <p className="text-xs text-slate-400">Reviews</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Agreements Tab */}
        {activeTab === "agreements" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="opened">Opened</option>
                <option value="reviewing">Reviewing</option>
                <option value="completed">Completed</option>
              </select>
              <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Fee</option>
              </select>
            </div>

            {/* Agreements List */}
            <div className="space-y-4">
              {agreements.length > 0 ? (
                agreements.map((agreement) => (
                  <Card
                    key={agreement.id}
                    className={`bg-slate-800 border-slate-700 hover:border-amber-500/30 transition-all ${
                      agreement.status === "new" ? "ring-1 ring-amber-500/20" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{agreement.documentTitle}</h3>
                            <span className={getStatusColor(agreement.status)}>
                              {getStatusLabel(agreement.status)}
                            </span>
                            {agreement.status === "new" && (
                              <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-full font-medium">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {agreement.userName}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {agreement.documentType}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {agreement.messages.length} messages
                            </span>
                            <span>Received: {new Date(agreement.sentAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold text-amber-500">₹{agreement.lawyerFee}</p>
                            <p className="text-xs text-slate-500">Your fee</p>
                          </div>
                          <Link href={`/lawyer/agreements/${agreement.id}`}>
                            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No agreements yet</h3>
                    <p className="text-slate-400 mb-6">
                      When users send you documents to review and sign, they will appear here.
                    </p>
                    <div className="text-sm text-slate-500">
                      <p>Make sure your status is set to &quot;Online&quot; to receive agreements</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            {/* Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-400">Total Earnings</p>
                  <p className="text-3xl font-bold text-white mt-2">₹{totalEarnings.toLocaleString()}</p>
                  <p className="text-sm text-green-400 mt-2">Lifetime earnings</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-400">This Month</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    ₹{Math.round(totalEarnings / 12).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-400 mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-400">Pending Payout</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    ₹{agreements
                      .filter((a) => a.status === "completed")
                      .reduce((sum, a) => sum + a.lawyerFee, 0)
                      .toLocaleString()}
                  </p>
                  <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                    Request Payout
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Earnings Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Earnings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Document</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {agreements
                        .filter((a) => a.status === "completed")
                        .map((agreement) => (
                          <tr key={agreement.id} className="hover:bg-slate-700/30">
                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-white">{agreement.documentTitle}</p>
                              <p className="text-xs text-slate-400">{agreement.userName}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-300">
                              {agreement.completedAt
                                ? new Date(agreement.completedAt).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium text-amber-500">
                              ₹{agreement.lawyerFee}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
