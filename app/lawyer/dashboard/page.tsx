"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLawyer } from "@/lib/lawyer-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  Star,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Calendar,
  Activity,
  MoreHorizontal,
  Filter,
  ChevronRight,
  Scale,
  Bell,
  LogOut,
  User,
} from "lucide-react";
import { getStatusColor, getStatusLabel } from "@/lib/lawyer-utils";

export default function LawyerDashboard() {
  const router = useRouter();
  const { lawyer, isAuthenticated, isLoading, agreements, logout } = useLawyer();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/lawyer/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !lawyer) {
    return null;
  }

  const totalAgreements = agreements.length;
  const pendingAgreements = agreements.filter((a) => ["new", "opened", "reviewing"].includes(a.status)).length;
  const completedAgreements = agreements.filter((a) => a.status === "completed").length;
  const totalEarnings = lawyer.totalEarnings;
  
  const earningsTrend = +12.5;
  const agreementsTrend = +8.2;
  const completionTrend = +15.3;

  const recentAgreements = agreements.slice(0, 5);

  const handleLogout = () => {
    logout();
    router.push("/lawyer/login");
  };

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
              <h1 className="text-lg font-bold text-white">Sakshi.ai Lawyer</h1>
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
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{lawyer.fullName}</p>
                <p className="text-xs text-slate-400">Bar ID: {lawyer.barCouncilNumber}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {lawyer.fullName.split(" ")[1] || lawyer.fullName}
              </h1>
              <p className="text-slate-400 mt-1">Here&apos;s what&apos;s happening with your practice today.</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                <FileText className="w-4 h-4 mr-2" />
                New Agreement
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Earnings</p>
                    <p className="text-2xl font-bold text-white mt-1">₹{totalEarnings.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{earningsTrend}%</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Agreements</p>
                    <p className="text-2xl font-bold text-white mt-1">{totalAgreements}</p>
                    <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>+{agreementsTrend}%</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Pending</p>
                    <p className="text-2xl font-bold text-white mt-1">{pendingAgreements}</p>
                    <div className="flex items-center gap-1 mt-2 text-orange-400 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Needs attention</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Completed</p>
                    <p className="text-2xl font-bold text-white mt-1">{completedAgreements}</p>
                    <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>+{completionTrend}%</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Agreements */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-white text-lg">Recent Agreements</CardTitle>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Filter className="h-4 w-4" />
                </button>
                <Link href="/lawyer/agreements">
                  <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAgreements.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No agreements yet</p>
                  </div>
                ) : (
                  recentAgreements.map((agreement) => (
                    <div
                      key={agreement.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{agreement.documentTitle}</p>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>{agreement.userName}</span>
                            <span>•</span>
                            <span>{new Date(agreement.sentAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>
                          {getStatusLabel(agreement.status)}
                        </span>
                        <span className="text-white font-medium">₹{agreement.lawyerFee.toLocaleString()}</span>
                        <button className="p-1 text-slate-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Users className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Find Clients</h3>
                    <p className="text-sm text-slate-400 mt-1">Connect with new clients in your area</p>
                    <Button variant="link" className="text-amber-500 p-0 h-auto mt-2">
                      Explore Opportunities →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Schedule</h3>
                    <p className="text-sm text-slate-400 mt-1">Manage your consultation calendar</p>
                    <Button variant="link" className="text-blue-400 p-0 h-auto mt-2">
                      View Calendar →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reviews</h3>
                    <p className="text-sm text-slate-400 mt-1">Check your client feedback</p>
                    <Button variant="link" className="text-green-400 p-0 h-auto mt-2">
                      See Reviews →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
