'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Calendar, Clock, RefreshCw, ChevronRight, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DocumentWithExpiry } from '@/lib/mock-data';
import { getDashboardExpiringDocuments, formatExpiryMessage, ExpiryStatus } from '@/lib/expiry-tracking';

interface ExpiryDashboardWidgetProps {
  documents: DocumentWithExpiry[];
  onRenewClick: (documentId: string) => void;
}

interface ExpiringDoc extends DocumentWithExpiry {
  daysRemaining: number;
  color: string;
}

export function ExpiryDashboardWidget({ documents, onRenewClick }: ExpiryDashboardWidgetProps) {
  const [expiringDocs, setExpiringDocs] = useState<ExpiringDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expiring = getDashboardExpiringDocuments(documents);
    setExpiringDocs(expiring);
    setLoading(false);
  }, [documents]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-red-50 dark:bg-red-950/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-700 dark:text-red-400',
          badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
          icon: 'text-red-500',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-950/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-700 dark:text-yellow-400',
          badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
          icon: 'text-yellow-500',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        };
      default:
        return {
          bg: 'bg-green-50 dark:bg-green-950/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-700 dark:text-green-400',
          badge: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
          icon: 'text-green-500',
          button: 'bg-green-600 hover:bg-green-700'
        };
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (expiringDocs.length === 0) {
    return (
      <Card className="w-full bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-green-800 dark:text-green-300">
                All documents are up to date
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                No documents expiring in the next 30 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Count by urgency
  const redCount = expiringDocs.filter(d => d.color === 'red').length;
  const yellowCount = expiringDocs.filter(d => d.color === 'yellow').length;

  return (
    <Card className="w-full border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle className="text-lg">
              ⚠️ {expiringDocs.length} document{expiringDocs.length > 1 ? 's' : ''} expiring soon
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {redCount > 0 && <span className="text-red-600 mr-2">{redCount} urgent</span>}
            {yellowCount > 0 && <span className="text-amber-600">{yellowCount} soon</span>}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {expiringDocs.map((doc) => {
          const colors = getColorClasses(doc.color);
          
          return (
            <div
              key={doc.id}
              className={`p-4 rounded-lg border ${colors.bg} ${colors.border} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={colors.badge}>
                      {formatDocumentType(doc.type)}
                    </Badge>
                    {doc.renewedFrom && (
                      <span className="text-xs text-gray-500">Renewal</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {doc.propertyAddress}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className={`flex items-center gap-1 ${colors.text}`}>
                      <Clock className={`w-4 h-4 ${colors.icon}`} />
                      <span className="font-medium">
                        {formatExpiryMessage(doc.daysRemaining)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Ends {formatDate(doc.endDate!)}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className={`${colors.button} text-white`}
                  onClick={() => onRenewClick(doc.id)}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Renew
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 text-center">
          <Button variant="outline" size="sm" className="text-gray-600" asChild>
            <a href="/dashboard/documents">View all documents</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions
function formatDocumentType(type: string): string {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
