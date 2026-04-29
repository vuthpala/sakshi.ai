import { NextRequest, NextResponse } from 'next/server';
import { MOCK_DOCUMENTS } from '@/lib/mock-data';
import { checkExpiries } from '@/lib/expiry-cron';

/**
 * GET /api/cron/expiry
 * Manually trigger expiry check (for testing)
 * In production, use cron job instead
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Optional: Add authorization check
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    console.log('[API] Manual expiry check triggered');

    // Run the expiry check
    const results = await checkExpiries(MOCK_DOCUMENTS);

    const summary = {
      timestamp: new Date().toISOString(),
      results: {
        '30_days': {
          sent: results.days30.sent,
          failed: results.days30.failed,
          errors: results.days30.errors
        },
        '7_days': {
          sent: results.days7.sent,
          failed: results.days7.failed,
          errors: results.days7.errors
        },
        '1_day': {
          sent: results.days1.sent,
          failed: results.days1.failed,
          errors: results.days1.errors
        }
      },
      totalProcessed: results.days30.sent + results.days7.sent + results.days1.sent +
                     results.days30.failed + results.days7.failed + results.days1.failed
    };

    console.log('[API] Expiry check completed:', summary);

    return NextResponse.json({
      success: true,
      message: 'Expiry check completed',
      summary
    });

  } catch (error) {
    console.error('[API] Error in expiry check:', error);
    return NextResponse.json(
      { error: 'Expiry check failed', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/expiry
 * Trigger specific reminder type (for testing individual flows)
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { documentId, reminderType } = body;

    if (!documentId || !reminderType) {
      return NextResponse.json(
        { error: 'Missing documentId or reminderType' },
        { status: 400 }
      );
    }

    const document = MOCK_DOCUMENTS.find(d => d.id === documentId);
    
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Generate appropriate email based on reminder type
    const { generate30DayReminderEmail, generate7DayReminderEmail, generate1DayReminderEmail } = await import('@/lib/expiry-email-templates');
    
    let email;
    switch (reminderType) {
      case '30':
        email = generate30DayReminderEmail(document, document.userName);
        break;
      case '7':
        email = generate7DayReminderEmail(document, document.userName);
        break;
      case '1':
        email = generate1DayReminderEmail(document, document.userName);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid reminderType. Use 30, 7, or 1' },
          { status: 400 }
        );
    }

    // In production, send the email here
    console.log(`[API] Test ${reminderType}-day reminder generated for ${documentId}`);

    return NextResponse.json({
      success: true,
      message: `Test ${reminderType}-day reminder generated`,
      documentId,
      reminderType,
      email: {
        subject: email.subject,
        preview: email.text.substring(0, 200) + '...'
      }
    });

  } catch (error) {
    console.error('[API] Error generating test reminder:', error);
    return NextResponse.json(
      { error: 'Failed to generate reminder', details: String(error) },
      { status: 500 }
    );
  }
}
