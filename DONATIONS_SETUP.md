# Donations API Configuration Guide

This guide explains how to set up the donations API with file upload functionality using Supabase storage.

## Environment Variables Required

Copy `.env.example` to `.env.local` and fill in the required values:

### Database
- `DATABASE_URL`: Your PostgreSQL database connection string

### Supabase (Required for file uploads)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key  
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (server-side only)

### Stripe (Optional - only if using Stripe payments)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

## Storage Buckets

The following Supabase storage buckets are required and have been created:

1. `cash_transfers_attachments` - For cash transfer receipt uploads
2. `bank_deposits_attachments` - For bank deposit certificate uploads

These buckets should be configured with appropriate access policies in your Supabase dashboard.

## Database Schema

The donations table has been updated to include:
- `transfer_attachment_url` - URL to uploaded cash transfer receipt
- `deposit_attachment_url` - URL to uploaded bank deposit certificate

## API Endpoints

### POST /api/donations
Handles donation submissions with file uploads for cash transfer and bank deposit methods.

**FormData fields:**
- `amount` (required)
- `currency` (required): USD, SAR, AED, YER
- `method` (required): stripe, cash_transfer, bank_deposit
- `frequency`: once, monthly (default: once)
- `donorName` (optional)
- `donorEmail` (required)
- `donorNote` (optional)
- `bankAccountId` (required for bank_deposit method)
- `transferFile` (required for cash_transfer method)
- `depositFile` (required for bank_deposit method)

### GET /api/donations
Returns recent donations for testing/debugging.

### GET /api/bank-accounts
Returns bank accounts filtered by currency.

## File Upload Process

1. Files are uploaded to appropriate Supabase storage buckets
2. Public URLs are generated and stored in the database
3. Files are validated for size and type on the frontend
4. Supported formats: Images (JPG, PNG) and PDF files up to 5MB

## Testing

1. Ensure all environment variables are set
2. Test the API with tools like Postman using FormData
3. Verify files are uploaded to the correct Supabase buckets
4. Check database entries include the attachment URLs
