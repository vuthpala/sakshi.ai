# Stamp Duty Calculator System

## Overview
Sakshi.ai includes a comprehensive stamp duty calculator for all 28 Indian states and 8 Union Territories, helping users understand government charges before creating legal documents.

## Files Created

1. **lib/stamp-duty-data.ts** - Database of stamp duty rules
   - Complete data for all 36 states/UTs
   - Fixed and percentage-based calculations
   - Registration fees included
   - Payment portal links for each state

2. **app/api/stamp-duty/route.ts** - API endpoint
   - GET: Calculate stamp duty for any state/document
   - POST: Batch calculations
   - Returns formatted currency values

3. **components/stamp-duty-calculator.tsx** - React component
   - Full calculator with state/document selection
   - Property value input for percentage-based docs
   - Shows stamp duty + registration fees + total
   - Links to state e-stamp portals
   - Compact `StampDutyInfoBox` for document forms

4. **app/stamp-duty-calculator/page.tsx** - Public SEO page
   - Accessible at `/stamp-duty-calculator`
   - No login required
   - Good for organic search traffic

## Supported Documents

- Rent Agreement (₹100-500 fixed)
- Sale Deed (4-8% of property value)
- Gift Deed (0.5-2.5% of property value)
- Power of Attorney (₹100-1000 fixed)
- Affidavit (₹10-100 fixed)

## State Coverage

All 36 states and UTs covered:

### States (28)
Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Chhattisgarh, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal

### Union Territories (8)
Andaman & Nicobar Islands, Chandigarh, Dadra & Nagar Haveli and Daman & Diu, Delhi, Jammu & Kashmir, Ladakh, Lakshadweep, Puducherry

## Usage

### Public Calculator
Visit `/stamp-duty-calculator` to:
1. Select your state
2. Choose document type
3. Enter property value (if needed)
4. Get instant calculation

### API Usage
```bash
# Calculate stamp duty
curl "https://sakshi.ai/api/stamp-duty?state=Telangana&type=rent_agreement"

# With property value
curl "https://sakshi.ai/api/stamp-duty?state=Maharashtra&type=sale_deed&value=5000000"

# Get all states and document types
curl "https://sakshi.ai/api/stamp-duty"
```

### In Document Forms
```tsx
import { StampDutyInfoBox } from '@/components/stamp-duty-calculator';

<StampDutyInfoBox 
  state="Telangana" 
  documentType="rent_agreement" 
/>
```

## Key Features

1. **Accurate Data**: Based on official government schedules
2. **Currency Formatting**: Proper ₹ (INR) formatting
3. **Min/Max Limits**: Respects government caps
4. **Payment Links**: Direct links to state portals
5. **Acknowledgment**: User must confirm understanding
6. **Mobile Responsive**: Works on all devices

## E-Stamp Paper Links

Major state portals included:
- Maharashtra: gras.mahakosh.gov.in
- Karnataka: igr.karnataka.gov.in
- Telangana: registration.telangana.gov.in
- Delhi: legalaffairs.delhi.gov.in
- Tamil Nadu: tnreginet.gov.in
- Andhra Pradesh: igrs.ap.gov.in
- Gujarat: gujaratigr.gujarat.gov.in
- Uttar Pradesh: igrsup.gov.in

## Future Enhancements

- GPS-based auto state detection
- Document form integration with stamp duty widget
- Quarterly data updates via admin panel
- WhatsApp bot for stamp duty queries
- PDF download of calculation
- Multi-language support
