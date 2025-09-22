# Donations System Configuration

## Required Environment Variables

Copy `.env.example` to `.env.local` and set these values:

```bash
# Database Connection
DATABASE_URL="your_postgresql_connection_string"

# Supabase for file uploads (same pattern as volunteer form)
NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# Stripe for card payments (optional)
STRIPE_SECRET_KEY="sk_test_..." # or sk_live_...
STRIPE_PUBLISHABLE_KEY="pk_test_..." # or pk_live_...
```

## How It Works

The donations system follows the same pattern as your volunteer form:

1. **Client-side file upload**: Files are uploaded directly to Supabase storage using the anon key
2. **URL storage**: The API stores the file URLs in the database, not the files themselves
3. **Storage buckets**: Uses `cash_transfers_attachments` and `bank_deposits_attachments` buckets

## File Upload Flow

### Cash Transfer
1. User selects file → uploads to `cash_transfers_attachments` bucket
2. Gets public URL → sends to `/api/donations` with other form data
3. API stores donation record with `transferAttachmentUrl`

### Bank Deposit  
1. User selects file → uploads to `bank_deposits_attachments` bucket
2. Gets public URL → sends to `/api/donations` with other form data
3. API stores donation record with `depositAttachmentUrl`

This is identical to how your volunteer CV uploads work in `src/app/[locale]/(website)/become-a-volunteer/page.tsx`.

## Testing

1. Ensure Supabase environment variables are set
2. Test file uploads work (files appear in storage buckets)  
3. Test donation records are created with correct URLs
4. Verify thank you page redirection works
