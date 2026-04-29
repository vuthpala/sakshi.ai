# Sakshi.ai — India's Legal Witness

Sakshi.ai — India's trusted legal document platform. Generate documents in 9 Indian languages, find verified lawyers near you, and get digitally signed documents in minutes.

## Features

- **AI Conversational Chat**: Create documents by simply chatting with AI
- **Voice Input**: Speak in your language to create documents (removes literacy barrier)
- **9 Indian Languages**: English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Gujarati, Bengali
- **6 Document Types**: Rent Agreement, Freelance Contract, NDA, Employment Offer, Sale Agreement, Partnership Deed
- **AI-Powered Generation**: Uses Claude AI to generate legally worded documents
- **Payment Integration**: Razorpay integration for ₹49 per document
- **PDF Export**: Download documents as professional PDFs
- **Indian Legal Compliance**: Documents comply with Indian Contract Act 1872, Transfer of Property Act 1882

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Claude API (Anthropic) - AI document generation
- Razorpay Payments - Payment processing
- Razorpay Payouts - Lawyer payments
- Supabase Database
- jsPDF for PDF generation
- Web Speech API - Voice input

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd docready
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Fill in your environment variables:

```env
# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Claude/Anthropic API
ANTHROPIC_API_KEY=your_anthropic_api_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Database Setup

Create a `documents` table in Supabase with the following schema:

```sql
create table documents (
  id uuid default gen_random_uuid() primary key,
  document_type text not null,
  form_data jsonb not null,
  generated_text text not null,
  payment_status text default 'pending',
  razorpay_payment_id text,
  created_at timestamp with time zone default now(),
  city text,
  state text
);
```

## Document Flow

1. User selects a document type from the home page
2. Fills a multi-step form (e.g., 4 steps for Rent Agreement)
3. AI generates a legally worded document
4. User previews the document (bottom half blurred)
5. User pays ₹49 via Razorpay
6. Full document unlocked, PDF available for download

## Project Structure

```
sakshi-ai/
├── app/
│   ├── api/              # API routes
│   │   ├── documents/    # Document generation & chat
│   │   ├── lawyer/       # Lawyer verification & payouts
│   │   └── payment/      # Razorpay integration
│   ├── documents/        # Document forms & pages
│   ├── generate/chat/    # AI conversational chat
│   ├── lawyer/           # Lawyer dashboard
│   ├── admin/            # Admin panel
│   ├── page.tsx          # Home page
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   └── document-card.tsx # Document type card
├── lib/
│   ├── utils.ts          # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── claude.ts         # Claude AI integration
│   ├── lawyer-context.tsx # Lawyer state management
│   └── pdf-generator.ts  # PDF generation
└── types/
    └── index.ts          # TypeScript types
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | Yes |
| `ANTHROPIC_API_KEY` | Claude API key | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Yes |

## License

This project is for educational purposes. Not a substitute for professional legal advice.
