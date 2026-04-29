import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateStampDuty, 
  getAllStates, 
  getDocumentTypes,
  formatDocumentType 
} from '@/lib/stamp-duty-data';

/**
 * GET /api/stamp-duty
 * Query params: state, type, value (optional)
 * Returns stamp duty calculation for a state and document type
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const documentType = searchParams.get('type');
    const propertyValue = searchParams.get('value');

    // Return list of states and document types if no params
    if (!state && !documentType) {
      return NextResponse.json({
        states: getAllStates(),
        documentTypes: getDocumentTypes().map(type => ({
          value: type,
          label: formatDocumentType(type)
        }))
      });
    }

    if (!state || !documentType) {
      return NextResponse.json(
        { error: 'Missing required parameters: state and type' },
        { status: 400 }
      );
    }

    const value = propertyValue ? parseFloat(propertyValue) : undefined;

    const result = calculateStampDuty(state, documentType, value);

    if (!result) {
      return NextResponse.json(
        { 
          error: 'Stamp duty rule not found',
          message: `No stamp duty data available for ${documentType} in ${state}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      state,
      documentType,
      propertyValue: value,
      stampDuty: result.stampDuty,
      registrationFee: result.registrationFee,
      total: result.total,
      note: result.note,
      paymentUrl: result.paymentUrl,
      formatted: {
        stampDuty: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(result.stampDuty),
        registrationFee: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(result.registrationFee),
        total: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(result.total)
      }
    });

  } catch (error) {
    console.error('Stamp duty calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate stamp duty' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stamp-duty
 * Batch calculation or validation
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { calculations } = body;

    if (!Array.isArray(calculations)) {
      return NextResponse.json(
        { error: 'Invalid request. Expected array of calculations.' },
        { status: 400 }
      );
    }

    const results = calculations.map(calc => {
      const result = calculateStampDuty(
        calc.state,
        calc.documentType,
        calc.propertyValue
      );
      
      return {
        state: calc.state,
        documentType: calc.documentType,
        propertyValue: calc.propertyValue,
        ...result
      };
    });

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Stamp duty batch calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to process calculations' },
      { status: 500 }
    );
  }
}
