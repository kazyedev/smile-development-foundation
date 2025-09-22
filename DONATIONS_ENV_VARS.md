# Environment Variables Needed for Donations System

Add these to your `.env.local` file:

```env
# Supabase Configuration (you should already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# NEW: Service Role Key (needed for file uploads)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration (for credit card payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## How to get the Service Role Key:

1. Go to your Supabase dashboard
2. Navigate to Settings > API
3. Copy the "service_role" key under "Project API keys"
4. Add it as `SUPABASE_SERVICE_ROLE_KEY` in your .env.local

⚠️ **Important**: The service role key has admin privileges. Keep it secure and never expose it in client-side code.

## Storage Buckets:

The system will automatically use these buckets (already created via Supabase MCP):
- `cash_transfers_attachments` - for transfer receipts
- `bank_deposits_attachments` - for deposit certificates

## Testing:

Once you add the environment variables, you can test:
1. Select "Cash Transfer" method and upload a receipt
2. Select "Bank Deposit" method, choose a bank account, and upload a certificate
3. Check the `donations` table in Supabase for the record
4. Check the storage buckets for uploaded files
