"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/admin-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  LogOut,
  Shield,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
} from "lucide-react";

// Mock data for admin dashboard
const MOCK_DOCUMENTS = [
  { id: "doc_1", type: "rent-agreement", title: "Rent Agreement - John Doe", user: "john@example.com", status: "paid", amount: 99, createdAt: "2024-01-15", downloadCount: 3 },
  { id: "doc_2", type: "nda", title: "NDA - Tech Corp", user: "sarah@techcorp.com", status: "paid", amount: 49, createdAt: "2024-01-14", downloadCount: 1 },
  { id: "doc_3", type: "power-of-attorney", title: "Power of Attorney - Rajesh K", user: "rajesh@example.com", status: "draft", amount: 0, createdAt: "2024-01-13", downloadCount: 0 },
  { id: "doc_4", type: "gift-deed", title: "Gift Deed - Priya Sharma", user: "priya@example.com", status: "paid", amount: 79, createdAt: "2024-01-12", downloadCount: 2 },
  { id: "doc_5", type: "legal-notice", title: "Legal Notice - Property Dispute", user: "amit@example.com", status: "paid", amount: 59, createdAt: "2024-01-11", downloadCount: 1 },
];

const MOCK_USERS = [
  { id: "user_1", name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", documents: 3, joinedAt: "2024-01-10" },
  { id: "user_2", name: "Sarah Smith", email: "sarah@techcorp.com", phone: "+91 98765 43211", documents: 2, joinedAt: "2024-01-09" },
  { id: "user_3", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 98765 43212", documents: 1, joinedAt: "2024-01-08" },
  { id: "user_4", name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43213", documents: 4, joinedAt: "2024-01-07" },
  { id: "user_5", name: "Amit Patel", email: "amit@example.com", phone: "+91 98765 43214", documents: 2, joinedAt: "2024-01-06" },
];

export default function AdminDashboard() {
  const { admin, isAuthenticated, isLoading, logout } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "users">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !admin) {
    return null;
  }

  // Calculate stats
  const totalDocuments = MOCK_DOCUMENTS.length;
  const paidDocuments = MOCK_DOCUMENTS.filter((d) => d.status === "paid").length;
  const totalRevenue = MOCK_DOCUMENTS.reduce((sum, d) => sum + d.amount, 0);
  const totalUsers = MOCK_USERS.length;
  const totalDownloads = MOCK_DOCUMENTS.reduce((sum, d) => sum + d.downloadCount, 0);

  // Filter documents
  const filteredDocuments = MOCK_DOCUMENTS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter users
  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
            <CheckCircle className="h-3 w-3" />
            Paid
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/10 text-orange-400 text-xs rounded-full">
            <Clock className="h-3 w-3" />
            Draft
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Sakshi.ai Admin</h1>
              <p className="text-xs text-slate-400">{admin.role === "superadmin" ? "Super Admin" : "Admin"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{admin.name}</p>
              <p className="text-xs text-slate-400">{admin.email}</p>
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
              activeTab === "overview"
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "documents"
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "users"
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Users
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
                      <p className="text-sm text-slate-400">Total Documents</p>
                      <p className="text-3xl font-bold text-white mt-1">{totalDocuments}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                      <FileText className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-green-400">{paidDocuments} paid</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-orange-400">{totalDocuments - paidDocuments} draft</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Users</p>
                      <p className="text-3xl font-bold text-white mt-1">{totalUsers}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +12% this week
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Revenue</p>
                      <p className="text-3xl font-bold text-white mt-1">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +₹2,456 this week
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Downloads</p>
                      <p className="text-3xl font-bold text-white mt-1">{totalDownloads}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                      <Download className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    Across all paid documents
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-700">
                    {MOCK_DOCUMENTS.slice(0, 5).map((doc) => (
                      <div key={doc.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{doc.title}</p>
                          <p className="text-xs text-slate-400">{doc.user}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(doc.status)}
                          <span className="text-sm text-slate-400">
                            {doc.amount > 0 ? `₹${doc.amount}` : "Free"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">New Users</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-700">
                    {MOCK_USERS.slice(0, 5).map((user) => (
                      <div key={user.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                            <span className="text-sm font-medium text-white">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white">{user.documents} docs</p>
                          <p className="text-xs text-slate-400">{user.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Documents Table */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Downloads</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-white">{doc.title}</p>
                          <p className="text-xs text-slate-400 capitalize">{doc.type.replace(/-/g, " ")}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{doc.user}</td>
                        <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-6 py-4 text-sm text-white">
                          {doc.amount > 0 ? `₹${doc.amount}` : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{doc.downloadCount}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{doc.createdAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-slate-400 hover:text-blue-400">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-slate-400 hover:text-green-400">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-slate-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Users Table */}
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Documents</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                              <span className="text-sm font-medium text-white">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-white">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                            {user.documents} docs
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{user.joinedAt}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-slate-400 hover:text-blue-400">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-slate-400 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
