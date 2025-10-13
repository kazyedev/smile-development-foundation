# Vercel Deployment Guide

## Required Environment Variables

Before deploying to Vercel, make sure to add the following environment variables in your Vercel project settings:

### 1. Supabase Configuration (Required)

Get these from your Supabase project settings: https://app.supabase.com/project/_/settings/api

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Site Configuration (Required for Production)

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

⚠️ **Important**: Replace `https://your-domain.com` with your actual Vercel deployment URL.

### 3. Database Configuration (Optional)

Only needed if you're using Drizzle ORM directly:

```
DATABASE_URL=your-database-connection-string
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Make sure to select the appropriate environments (Production, Preview, Development)
5. Click **Save**

## Common Build Issues Fixed

### Issue 1: useSearchParams() Error
**Error**: `useSearchParams() should be wrapped in a suspense boundary`

**Solution**: We've wrapped all `useSearchParams()` usage in Suspense boundaries and added `dynamic = 'force-dynamic'` to pages that use it.

### Issue 2: API Fetch Errors During Build
**Error**: `Failed to fetch program: 400` during static generation

**Solution**: We've disabled static generation for dynamic pages that require Supabase data by adding `export const dynamic = 'force-dynamic'`.

### Issue 3: Edge Runtime Warnings
**Warning**: Node.js API used in Edge Runtime

**Solution**: This is just a warning from Supabase SSR. It won't affect your deployment.

## Deployment Steps

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add all required environment variables
4. Deploy!

## Verifying Your Deployment

After deployment:

1. Check that all pages load correctly
2. Test the programs page: `https://your-domain.com/en/programs`
3. Test individual program pages
4. Verify search functionality works
5. Test the donation flow

## Support

If you encounter issues during deployment, check:

- Are all environment variables set correctly in Vercel?
- Is your Supabase database accessible from the internet?
- Are there any error logs in the Vercel deployment logs?

