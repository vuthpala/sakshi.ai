'use client';

import { useState, useEffect } from 'react';
import { Calculator, MapPin, FileText, IndianRupee, ExternalLink, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculateStampDuty, getAllStates, formatDocumentType } from '@/lib/stamp-duty-data';

interface StampDutyResult {
  stampDuty: number;
  registrationFee: number;
  total: number;
  note: string;
  paymentUrl?: string;
  formatted: {
    stampDuty: string;
    registrationFee: string;
    total: string;
  };
}

interface StampDutyCalculatorProps {
  initialState?: string;
  initialDocumentType?: string;
  showDocumentInfo?: boolean;
  onCalculated?: (result: StampDutyResult) => void;
  className?: string;
}

const DOCUMENT_TYPES = [
  { value: 'rent_agreement', label: 'Rent Agreement', icon: '🏠' },
  { value: 'sale_deed', label: 'Sale Deed', icon: '🏢' },
  { value: 'gift_deed', label: 'Gift Deed', icon: '🎁' },
  { value: 'power_of_attorney', label: 'Power of Attorney', icon: '📋' },
  { value: 'affidavit', label: 'Affidavit', icon: '📄' },
];

export function StampDutyCalculator({
  initialState,
  initialDocumentType = 'rent_agreement',
  showDocumentInfo = true,
  onCalculated,
  className = ''
}: StampDutyCalculatorProps) {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState(initialState || '');
  const [selectedDocType, setSelectedDocType] = useState(initialDocumentType);
  const [propertyValue, setPropertyValue] = useState('');
  const [result, setResult] = useState<StampDutyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user's location on mount
  useEffect(() => {
    setStates(getAllStates());

    // Try to detect state from browser location
    if (!initialState && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In production, you would use reverse geocoding
          // For now, we'll skip auto-detection
          console.log('Location detected:', position.coords);
        },
        (error) => {
          console.log('Location access denied or unavailable');
        }
      );
    }
  }, [initialState]);

  const handleCalculate = async () => {
    if (!selectedState || !selectedDocType) {
      setError('Please select both state and document type');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const value = propertyValue ? parseFloat(propertyValue.replace(/,/g, '')) : undefined;
      
      // Call API for calculation
      const response = await fetch(
        `/api/stamp-duty?state=${encodeURIComponent(selectedState)}&type=${selectedDocType}${value ? `&value=${value}` : ''}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Calculation failed');
      }

      const data = await response.json();
      
      const calcResult: StampDutyResult = {
        stampDuty: data.stampDuty,
        registrationFee: data.registrationFee,
        total: data.total,
        note: data.note,
        paymentUrl: data.paymentUrl,
        formatted: data.formatted
      };

      setResult(calcResult);
      onCalculated?.(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const requiresPropertyValue = selectedDocType === 'sale_deed' || selectedDocType === 'gift_deed';

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Calculator className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Stamp Duty Calculator</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate government charges for your document
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* State Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            Select State/UT
          </label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your state" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Document Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            Document Type
          </label>
          <Select value={selectedDocType} onValueChange={setSelectedDocType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose document type" />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className="flex items-center gap-2">
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Value (for percentage-based) */}
        {requiresPropertyValue && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-slate-500" />
              Property Value (₹)
            </label>
            <Input
              type="text"
              placeholder="e.g., 50,00,000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              Enter the market value or consideration amount
            </p>
          </div>
        )}

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={loading || !selectedState || !selectedDocType}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculate Stamp Duty
            </span>
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Stamp Duty for {formatDocumentType(selectedDocType)} in {selectedState}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Stamp Duty</span>
                  <span className="font-bold text-lg text-slate-900 dark:text-white">
                    {result.formatted.stampDuty}
                  </span>
                </div>

                {result.registrationFee > 0 && (
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">Registration Fee</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">
                      {result.formatted.registrationFee}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-300 dark:border-green-700">
                  <span className="font-semibold text-green-800 dark:text-green-300">Total Government Charges</span>
                  <span className="font-bold text-xl text-green-700 dark:text-green-400">
                    {result.formatted.total}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm text-green-700 dark:text-green-400">
                {result.note}
              </p>

              {result.paymentUrl && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-700 hover:bg-green-50"
                    asChild
                  >
                    <a href={result.paymentUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buy e-Stamp Paper Online
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {showDocumentInfo && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-300">
                    <p className="font-medium mb-1">Important Note:</p>
                    <p>
                      Sakshi.ai handles digital document creation and signing. You are responsible for purchasing and attaching the physical stamp paper to the printed document. The stamp paper must be affixed before signing.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for document forms
export function StampDutyInfoBox({
  state,
  documentType,
  propertyValue
}: {
  state: string;
  documentType: string;
  propertyValue?: number;
}) {
  const [result, setResult] = useState<StampDutyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const calculate = async () => {
      try {
        const response = await fetch(
          `/api/stamp-duty?state=${encodeURIComponent(state)}&type=${documentType}${propertyValue ? `&value=${propertyValue}` : ''}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setResult(data);
        }
      } catch (error) {
        console.error('Failed to calculate stamp duty:', error);
      } finally {
        setLoading(false);
      }
    };

    calculate();
  }, [state, documentType, propertyValue]);

  if (loading) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg animate-pulse">
        <div className="h-4 bg-yellow-200 dark:bg-yellow-800 rounded w-3/4" />
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg space-y-3">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full shrink-0">
          <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
            📋 Stamp Duty Requirements
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            For {formatDocumentType(documentType)} in {state}:
          </p>
          <p className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mt-1">
            Required: {result.formatted.stampDuty} stamp paper
          </p>
          {result.registrationFee > 0 && (
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              + {result.formatted.registrationFee} registration fee
            </p>
          )}
          <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
            {result.note}
          </p>
          {result.paymentUrl && (
            <a
              href={result.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-yellow-700 dark:text-yellow-400 hover:underline mt-2"
            >
              Buy e-Stamp Paper Online
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-yellow-200 dark:border-yellow-800">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1 w-4 h-4 text-green-600 border-yellow-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-yellow-800 dark:text-yellow-300">
            I understand this document requires {result.formatted.stampDuty} stamp paper in {state} and I am responsible for purchasing it.
          </span>
        </label>
      </div>
    </div>
  );
}
