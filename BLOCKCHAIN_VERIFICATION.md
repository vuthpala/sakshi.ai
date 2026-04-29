# Blockchain Document Verification System

## Overview
Sakshi.ai now includes blockchain-style document verification using SHA-256 cryptographic hashing. This provides tamper-proof verification of document authenticity without requiring an actual blockchain.

## Features Implemented

### 1. Hash Generation on Signing
- When a lawyer digitally signs a document:
  - SHA-256 hash is generated from: `documentId + content + lawyerSignature + timestamp`
  - Hash is unique fingerprint of the document
  - Hash is displayed on the signed PDF

### 2. Public Verification Page
- **URL**: `/verify` (accessible without login)
- **Features**:
  - Clean, simple interface
  - Enter Document ID or Hash
  - Instant verification results
  - Shows document type, signing date, lawyer name, Bar Council ID
  - No sensitive content displayed

### 3. QR Code on Signed PDFs
- QR code added to bottom right of every signed PDF page
- Links to: `sakshi.ai/verify?id=[documentId]`
- Anyone can scan and verify instantly
- Displays truncated hash below QR code

### 4. Verification Badge
- "🔒 Blockchain Verified" badge shown on:
  - User dashboard for signed documents
  - Lawyer dashboard for signed documents
- Clickable badge opens verification page

### 5. Verification Logging
- Each verification attempt logged with:
  - Document ID
  - Timestamp
  - IP address
  - Success/failure status
- Logs stored in localStorage (upgradeable to database)

### 6. API Endpoints
- `GET /api/verify/:documentId` - Verify by document ID
- `GET /api/verify/hash/:hash` - Verify by hash

## Technical Implementation

### Core Files
1. **lib/blockchain.ts** - Core verification functions
2. **lib/pdf-generator.ts** - PDF generation with QR codes
3. **app/verify/page.tsx** - Public verification page
4. **app/api/verify/[id]/route.ts** - ID verification API
5. **app/api/verify/hash/[hash]/route.ts** - Hash verification API
6. **components/blockchain-badge.tsx** - Verification badge component

### Dependencies Added
```json
{
  "qrcode": "^1.5.3",
  "@types/qrcode": "^1.5.5"
}
```

## Usage

### For Users
1. Download signed PDF from dashboard
2. QR code on PDF links to verification page
3. Can also manually enter Document ID at `/verify`

### For Lawyers
1. Sign document in lawyer dashboard
2. PDF automatically includes QR code
3. Document marked as "Blockchain Verified"

### Verification Process
1. User scans QR code or visits `/verify?id=[docId]`
2. System looks up document in database
3. Recomputes hash and verifies integrity
4. Returns verification status
5. Logs verification attempt

## Security
- SHA-256 cryptographic hashing (same as Bitcoin)
- Hash includes document content, signature, and timestamp
- Any tampering changes the hash
- Legally defensible in Indian courts
- No sensitive document content in verification

## Future Enhancements
- Database storage for verification logs
- Email verification receipts
- Verification analytics dashboard
- Mobile app scanning
- Third-party audit integration
