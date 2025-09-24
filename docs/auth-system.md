# Authentication System Documentation

## Overview

Your authentication system is now fully configured and integrated with your existing `users` table in Supabase. The system supports role-based access control and email verification.

## Database Schema

### Users Table

The system uses the existing `users` table with the following structure:

```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name_en VARCHAR NOT NULL,
  name_ar VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  image_url VARCHAR,
  role user_role DEFAULT 'default',
  allowed_sections JSONB DEFAULT '[]',
  bio TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### User Roles Enum

The `user_role` enum includes:
- `super_admin` - Full system access
- `admin` - Administrative access to CMS
- `content_manager` - Content management permissions
- `viewer` - Read-only access
- `author` - Content creation permissions
- `default` - Basic user with limited access

## API Endpoints

### Authentication Routes

1. **POST /api/auth/signup** - User registration
   - Creates Supabase auth user
   - Inserts user data into `users` table
   - Sends email verification

2. **POST /api/auth/login** - User login
   - Authenticates with Supabase
   - Returns user session

3. **POST /api/auth/logout** - User logout
   - Clears Supabase session

4. **GET /api/auth/profile** - Get user profile
   - Returns user data from `users` table

5. **POST /api/auth/reset-password** - Password reset request
   - Sends password reset email

6. **GET /auth/callback** - Auth callback handler
   - Handles email verification and password reset

### OTP Routes

1. **POST /api/auth/otp/send** - Send OTP verification
2. **POST /api/auth/otp/verify** - Verify OTP code
3. **POST /api/auth/otp/confirm** - Confirm OTP and activate account

## Pages

### Public Auth Pages

1. **Login** (`/[locale]/login`) - User login form
2. **Signup** (`/[locale]/signup`) - User registration with OTP verification
3. **Reset Password** (`/[locale]/reset-password`) - Password reset request
4. **Reset Password Complete** (`/[locale]/reset-password/complete`) - Set new password
5. **Not Authorized** (`/[locale]/not-authorized`) - Message for users without admin access

### Protected Routes

- **CMS** (`/[locale]/cms`) - Admin dashboard (requires admin+ role)

## Middleware Protection

The middleware (`src/middleware.ts`) provides:

1. **Route Protection**
   - Protects `/cms` routes for admin users only
   - Redirects unauthenticated users to login

2. **Role-Based Access**
   - `admin`, `super_admin`, `content_manager` → Access to CMS
   - `default`, `viewer`, `author` → Redirect to home

3. **Auth State Management**
   - Checks user session and role from `users` table
   - Handles inactive users

## User Flow

### Registration Flow

1. User fills signup form
2. Supabase creates auth user
3. User data inserted into `users` table with `default` role
4. Email verification sent (optional OTP)
5. User verifies email/OTP
6. Account activated (`is_active: true`)

### Login Flow

1. User provides credentials
2. Supabase authenticates user
3. System checks `users` table for role and status
4. Redirects based on role:
   - Admin roles (admin, super_admin, content_manager) → CMS dashboard
   - Regular users (default, viewer, author) → Automatic logout + Not Authorized page

### Access Control

- **Public**: Home, about, contact pages, not-authorized page
- **Auth Required**: None currently (all handled by middleware)
- **Admin Required**: CMS routes (`/cms/*`)
- **Auto-Logout**: Users without admin roles are automatically logged out and redirected

## Environment Variables

Required variables in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://smile-development-foundation-xvjd.vercel.app

# Optional
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Security Features

1. **Row Level Security (RLS)** - Database level security
2. **JWT Tokens** - Secure session management via Supabase
3. **Email Verification** - Prevents unauthorized signups
4. **Role-based Access** - Granular permission control
5. **Middleware Protection** - Server-side route protection
6. **Session Management** - Automatic token refresh

## User Management

### Creating Admin Users

To promote a user to admin:

```sql
UPDATE users 
SET role = 'admin', updated_at = now() 
WHERE email = 'user@example.com';
```

### Deactivating Users

```sql
UPDATE users 
SET is_active = false, updated_at = now() 
WHERE email = 'user@example.com';
```

## Testing the System

### 1. User Registration
- Visit `/en/signup`
- Create account with email/password
- Check email for verification (if configured)
- User should be created in `users` table with `default` role

### 2. Admin Access
- Promote user to `admin` role in database
- Login at `/en/login`
- Should redirect to `/en/cms`

### 3. Regular User Access
- Login with `default` role user
- Should redirect to `/en` (home page)

## Troubleshooting

### Common Issues

1. **Users not created in table**: Check signup API logs
2. **CMS access denied**: Verify user role is admin+
3. **Redirect loops**: Check middleware configuration
4. **Email not sending**: Verify Supabase email settings
5. **User redirected to not-authorized**: User has `default` role, needs admin+ role assignment

### Debug Steps

1. Check browser console for errors
2. Verify Supabase auth state
3. Check `users` table for user record
4. Test API endpoints directly

## Next Steps

The authentication system is now complete and integrated with your existing database structure. Users can:

- Sign up and verify accounts
- Login with role-based redirects
- Access protected CMS routes (if admin)
- Reset passwords securely

The system automatically handles user creation in the `users` table and respects the existing role-based architecture.
