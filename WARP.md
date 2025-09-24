# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The Smile Development Foundation website is a bilingual (English/Arabic) Next.js application that serves as a comprehensive content management and donation platform for a non-profit organization. The project features a public website, admin CMS, and integrated donation system with file upload capabilities.

## Core Architecture

### Technology Stack
- **Framework**: Next.js 15.4.3 with App Router and TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase Auth with role-based access control
- **Storage**: Supabase Storage for file uploads
- **Styling**: Tailwind CSS with shadcn/ui components
- **Payments**: Stripe integration for online donations
- **Internationalization**: Custom i18n with route-based locale handling (`[locale]` routes)

### Project Structure
```
src/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes (en/ar)
│   │   ├── (website)/       # Public website pages
│   │   ├── (auth)/          # Authentication pages
│   │   └── cms/             # Admin dashboard (protected)
│   └── api/                 # API routes
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui base components
│   ├── website/             # Public website components
│   ├── cms/                 # Admin dashboard components
│   └── auth/                # Authentication components
├── lib/
│   └── db/                  # Database layer with Drizzle ORM
│       ├── schema/          # Database table definitions
│       └── repositories/    # Data access layer (Repository pattern)
└── hooks/                   # Custom React hooks
```

### Database Architecture
The application uses Drizzle ORM with a repository pattern for type-safe database operations. Key entities include:
- **Programs** - Main organizational programs with multilingual content
- **Projects** - Individual projects under programs
- **Users** - Role-based user management (super_admin, admin, content_manager, etc.)
- **Donations** - Multi-currency donation tracking with file attachments
- **Content entities** - News, activities, videos, publications, success stories

### Authentication System
- Supabase-based authentication with custom user profiles in `users` table
- Role-based access control with middleware protection
- Admin roles get CMS access, regular users are redirected to public site
- Protected routes: `/cms/*` (requires admin+ roles)
- Auth flow includes email verification and password reset functionality

### Internationalization
- Route-based i18n with `[locale]` dynamic segments supporting English (`en`) and Arabic (`ar`)
- RTL support for Arabic content
- Middleware handles locale detection and redirection
- Content stored bilingually in database with `_en` and `_ar` field suffixes

## Essential Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Database Management
```bash
# Generate migrations from schema changes
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Push schema directly to database (development)
npm run db:push

# Pull existing schema from database
npm run db:pull

# Open Drizzle Studio (database GUI)
npm run db:studio

# Drop migrations
npm run db:drop

# Apply migrations with custom scripts
npm run db:prepare-migration

# Create missing tables directly
npm run db:create-missing-tables

# Get migration summary
npm run db:summary
```

### Testing Individual Components
Since there's no formal testing setup, test individual API endpoints and components manually:
```bash
# Test API endpoints using curl or similar tools
curl http://localhost:3000/api/programs
curl http://localhost:3000/api/donations

# Test specific pages
# Navigate to http://localhost:3000/en/cms (requires admin login)
# Navigate to http://localhost:3000/en/donate
```

## Development Workflow

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Configure required environment variables:
   ```env
   # Database
   DATABASE_URL=your_postgresql_connection_string

   # Supabase (Authentication & Storage)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Stripe (Optional - for donations)
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Adding New Database Tables
1. Create schema file in `src/lib/db/schema/[table-name].ts`
2. Export the table from `src/lib/db/schema/index.ts`
3. Create repository in `src/lib/db/repositories/[table-name].ts`
4. Generate migration: `npm run db:generate`
5. Apply migration: `npm run db:migrate`

### Working with Drizzle ORM
```typescript
// Import repositories
import { ProgramsRepository, ProjectsRepository } from '@/lib/db/repositories';

// Basic operations
const programs = await ProgramsRepository.findMany({ published: true });
const program = await ProgramsRepository.create({ titleEn: "New Program", ... });
const projects = await ProjectsRepository.findByProgramId(programId);
```

### Adding New API Routes
1. Create route file in `src/app/api/[route-name]/route.ts`
2. Import necessary repositories from `@/lib/db/repositories`
3. Implement proper error handling and database availability checks
4. Use repository pattern for database operations

### CMS Development
- CMS routes are under `src/app/[locale]/cms/`
- Protected by middleware requiring admin+ roles
- Uses custom components from `src/components/cms/`
- Forms integrate with repository pattern for data operations

### Adding New Localized Pages
1. Create page in `src/app/[locale]/(website)/[page-name]/page.tsx`
2. Access locale from params: `const { locale } = await params;`
3. Handle RTL layout with `dir={locale === 'ar' ? 'rtl' : 'ltr'}`
4. Use appropriate language-specific content fields from database

## Key Integration Points

### Donation System
- Supports multiple payment methods: Stripe, cash transfer, bank deposit
- File upload integration with Supabase Storage
- Multi-currency support (USD, SAR, AED, YER)
- Storage buckets: `cash_transfers_attachments`, `bank_deposits_attachments`

### Content Management
- All content entities support bilingual fields
- Published/unpublished status for content control
- Page view tracking for analytics
- Image and file upload capabilities through Supabase Storage

### Authentication Flow
- Registration with email verification
- Role-based dashboard access
- Middleware handles route protection and redirects
- User profiles stored in custom `users` table with Supabase Auth integration

## Common Development Patterns

### Repository Usage
```typescript
// Check database availability in API routes
const database = db();
if (!database) {
  return NextResponse.json({ error: "Database not configured" }, { status: 503 });
}
```

### Multilingual Content Handling
```typescript
// Access locale-appropriate fields
const title = locale === 'ar' ? program.titleAr : program.titleEn;
const description = locale === 'ar' ? program.descriptionAr : program.descriptionEn;
```

### Form Integration with Zod Validation
```typescript
import { insertProgramSchema } from '@/lib/db/schema/programs';

// Validate form data
const validatedData = insertProgramSchema.parse(formData);
const result = await ProgramsRepository.create(validatedData);
```

## File Upload Patterns
- Use Supabase client with service role key for server-side uploads
- Validate file types and sizes on both client and server
- Store public URLs in database, not file contents
- Organize files in logical bucket structures

## Middleware Considerations
The middleware handles multiple concerns:
- Locale detection and redirection
- Authentication state checking  
- Role-based access control for CMS routes
- Automatic CMS dashboard redirection

When adding new protected routes, update the `PROTECTED_ROUTES` array in `src/middleware.ts`.
