# Document Expiry Tracking & Reminder System

## Overview
Sakshi.ai now includes a comprehensive document expiry tracking and reminder system that helps users stay on top of their document renewals.

## Features Implemented

### 1. Database Fields Added
Extended document model with:
- `startDate`: Document start date
- `endDate`: Document expiry/end date
- `reminder30Sent`: 30-day reminder sent flag
- `reminder7Sent`: 7-day reminder sent flag
- `reminder1Sent`: 1-day reminder sent flag
- `renewedFrom`: ID of original document (for tracking renewals)

### 2. Expiry Cron Job
- **File**: `lib/expiry-cron.ts`
- Runs daily at 9:00 AM IST
- Automatically detects documents expiring in:
  - Exactly 30 days
  - Exactly 7 days
  - Exactly 1 day
- Sends email and WhatsApp reminders
- Marks reminders as sent to prevent duplicates

### 3. Email Reminders
Three escalating reminder templates:

#### 30 Days Before (Informational)
- Subject: "Your Rent Agreement expires in 30 days"
- Tone: Friendly reminder
- CTA: "Renew Now" button
- Green/amber color scheme

#### 7 Days Before (Urgent)
- Subject: "⚠️ 7 days left — Rent Agreement expiring"
- Tone: Urgent warning
- CTA: Prominent "Renew Now →" button
- Orange/red color scheme
- Includes risk explanation

#### 1 Day Before (Critical)
- Subject: "🚨 URGENT — Agreement expires tomorrow"
- Tone: Emergency alert
- CTA: Large "RENEW IMMEDIATELY →" button
- Red color scheme with ⚠️ icons
- Lists potential legal consequences
- Includes phone number for immediate help

### 4. WhatsApp Reminders (Twilio Ready)
- Same 3 reminder points as email
- Concise message format
- Includes:
  - Urgency emoji (⏰/⚠️/🚨)
  - Document type
  - Property address
  - Expiry date
  - Renewal link
  - Support phone number

### 5. Dashboard Expiry Widget
**File**: `components/expiry-dashboard-widget.tsx`

Features:
- Yellow warning card: "⚠️ 3 documents expiring soon"
- Color-coded urgency levels:
  - 🔴 Red: Less than 7 days
  - 🟡 Yellow: 7-30 days remaining
  - 🟢 Green: 30+ days (all good)
- Lists each expiring document with:
  - Document type badge
  - Property address
  - Days remaining
  - End date
- "Renew" button for one-click renewal
- "View all documents" link

### 6. One-Click Renewal API
**File**: `app/api/documents/[id]/renew/route.ts`

- `GET /api/documents/:id/renew`
  - Creates new draft from existing document
  - Pre-fills all original data
  - Calculates new dates based on duration
  - Returns redirect URL to pre-filled form

- `POST /api/documents/:id/renew`
  - Same as GET but accepts modifications
  - User can update rent amount, dates, etc.
  - Creates renewal with `renewedFrom` link

### 7. Manual Cron Trigger API
**File**: `app/api/cron/expiry/route.ts`

- `GET /api/cron/expiry` - Run full expiry check
- `POST /api/cron/expiry` - Test specific reminder

Useful for:
- Testing reminders
- Manual trigger during setup
- Monitoring and debugging

## Technical Implementation

### Core Files
1. `lib/expiry-tracking.ts` - Core tracking functions
2. `lib/expiry-email-templates.ts` - Email templates
3. `lib/expiry-cron.ts` - Cron job logic
4. `app/api/documents/[id]/renew/route.ts` - Renewal API
5. `app/api/cron/expiry/route.ts` - Cron trigger API
6. `components/expiry-dashboard-widget.tsx` - Dashboard widget

### Dependencies Added
```json
{
  "node-cron": "^3.0.3",
  "@types/node-cron": "^3.0.11"
}
```

### Cron Job Setup (for production backend)

```typescript
// server.ts or main entry file
import cron from 'node-cron';
import { setupExpiryCron } from '@/lib/expiry-cron';
import { MOCK_DOCUMENTS } from '@/lib/mock-data';

// Production: Run daily at 9:00 AM IST
setupExpiryCron(cron, MOCK_DOCUMENTS);

// Testing: Run every minute
// import { setupTestCron } from '@/lib/expiry-cron';
// setupTestCron(cron, MOCK_DOCUMENTS);
```

## Usage

### For Users
1. **Dashboard View**: Yellow warning card shows expiring documents
2. **Click Renew**: One-click creates new draft with pre-filled data
3. **Update Dates**: User only needs to adjust start/end dates
4. **Payment**: Complete payment to finalize renewal
5. **Reminders**: Automatic emails/WhatsApp at 30, 7, and 1 days

### For Testing
```bash
# Run manual expiry check
curl https://sakshi.ai/api/cron/expiry

# Test specific reminder
curl -X POST https://sakshi.ai/api/cron/expiry \
  -H "Content-Type: application/json" \
  -d '{"documentId": "doc_xxx", "reminderType": "7"}'
```

### WhatsApp Integration (Twilio)
To enable WhatsApp reminders:

1. Set up Twilio account
2. Configure WhatsApp Business API
3. Update `sendWhatsAppReminder()` in `lib/expiry-cron.ts`
4. Add Twilio credentials to environment variables

## Future Enhancements
- SMS reminders via Twilio
- Push notifications
- Calendar integration (ICS files)
- Auto-renewal with saved payment
- Renewal history tracking
- Expiry analytics dashboard
