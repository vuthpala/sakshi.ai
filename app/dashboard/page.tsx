"use client";

import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Clock,
  CheckCircle,
  Trash2,
  Plus,
  User,
  Mail,
  Phone,
  Calendar,
  FileSignature,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading, deleteDocument } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"documents" | "profile">("documents");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const documents = user.documents || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "downloaded":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "completed":
        return <FileSignature className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-orange-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "downloaded":
        return "Downloaded";
      case "completed":
        return "Completed";
      default:
        return "Draft";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user.name || "User"}!
          </h1>
          <p className="text-slate-500">
            Manage your legal documents and account settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Documents</p>
                <p className="text-2xl font-bold text-slate-900">{documents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Completed</p>
                <p className="text-2xl font-bold text-slate-900">
                  {documents.filter((d) => d.status === "completed" || d.status === "downloaded").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Downloaded</p>
                <p className="text-2xl font-bold text-slate-900">
                  {documents.filter((d) => d.status === "downloaded").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "documents"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            My Documents
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Profile
          </button>
        </div>

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div>
            {documents.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No documents yet
                </h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  You haven't created any documents yet. Start by creating your first legal document.
                </p>
                <Link
                  href="/documents"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Create Document
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                        <FileText className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(doc.status)}
                            {getStatusText(doc.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.downloadUrl && (
                        <a
                          href={doc.downloadUrl}
                          download
                          className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                      )}
                      <Link
                        href={`/documents/preview/${doc.id}`}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <FileText className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-medium text-slate-900">{user.name || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">{user.email || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">{user.phone || "Not set"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
