import { Metadata } from 'next';
import { StampDutyCalculator } from '@/components/stamp-duty-calculator';
import { Calculator, Info, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stamp Duty Calculator | Sakshi.ai',
  description: 'Calculate stamp duty for rent agreements, sale deeds across all 36 Indian states and UTs.',
  keywords: ['stamp duty calculator', 'stamp duty India', 'e-stamp paper']
};

export default function StampDutyCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <Calculator className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Stamp Duty Calculator
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Calculate stamp duty for all legal documents across 36 states & UTs of India
          </p>
        </div>

        {/* Calculator */}
        <StampDutyCalculator showDocumentInfo={true} />

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-green-600" />
              What is Stamp Duty?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Stamp duty is a tax levied by state governments on legal documents. 
              It validates your document and makes it legally enforceable in courts.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Why Calculate?
            </h2>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Know exact charges before creating document</li>
              <li>• Budget for government fees</li>
              <li>• Avoid penalties for under-stamping</li>
              <li>• Buy correct denomination stamp paper</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
