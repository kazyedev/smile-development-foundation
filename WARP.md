# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `npm run dev` (uses Next.js with Turbopack)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

### Development Server
- Development server runs on http://localhost:3000
- Uses Turbopack for faster compilation
- Hot reload is enabled for immediate feedback

## Architecture Overview

### Project Structure
This is a Next.js 15 application with App Router, featuring a multilingual foundation website with CMS capabilities.

**Key architectural patterns:**
- **App Router structure**: Uses Next.js 13+ App Router with nested layouts
- **Internationalization**: Built-in i18n with English (en) and Arabic (ar) locales
- **Route Groups**: Organized with `(auth)` and `(website)` route groups
- **Dynamic routes**: Extensive use of `[slug]` and `[locale]` dynamic segments

### Core Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Components**: Radix UI primitives with custom styling
- **Rich Text**: TipTap editor with Lexical integration
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Validation**: Zod schemas
- **Payment**: Stripe integration

### Directory Architecture

**`src/app/`** - Next.js App Router structure
- `[locale]/` - Internationalized routes (en/ar)
- `(auth)/` - Authentication pages (login, signup, reset-password)
- `(website)/` - Public website pages
- `cms/` - Content management system
- `api/` - API routes for backend functionality

**`src/components/`** - Organized by domain
- `auth/` - Authentication components
- `cms/` - CMS-specific components
- `ui/` - Reusable UI components (shadcn/ui style)
- `website/` - Website-specific components

**`src/lib/`** - Utility libraries
- `supabase/` - Database client configuration (client/server)
- `controllers/` - Business logic controllers
- `i18n.ts` - Internationalization configuration
- `utils.ts` - Common utilities (cn function for class merging)

### Key Configuration Files
- **`next.config.ts`**: Next.js configuration with image domains and build settings
- **`tailwind.config.js`**: Custom design system with CSS variables
- **`tsconfig.json`**: TypeScript configuration with path aliases (`@/*`)
- **`middleware.ts`**: Handles i18n routing and CMS redirects

### Authentication & Authorization
- Supabase Auth integration for user management
- JWT-based authentication with SSR support
- Protected routes with middleware-based redirects

### Content Management
- Custom CMS built on top of the main application
- Rich text editing with TipTap/Lexical
- Media management for images, videos, publications
- Multi-level content categorization

### Internationalization
- Route-based i18n with `[locale]` segments
- Default locale: English (en)
- Supported locales: English (en), Arabic (ar)
- Middleware handles locale detection and redirects

### Database Schema (Inferred)
Based on the structure, likely includes:
- User authentication tables
- Content tables (news, programs, projects)
- Media management tables
- Categorization/taxonomy tables
- Foundation identity/profile data

## Development Notes

### Running Single Tests
Currently no test framework is configured. Consider adding Jest/Vitest for unit testing.

### Database Development
- Uses Supabase for backend services
- Drizzle ORM for type-safe database operations  
- Environment variables needed: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### CMS Access
- CMS routes are under `/[locale]/cms/`
- Default CMS redirect: `/[locale]/cms` → `/[locale]/cms/dashboard`
- Requires authentication to access

### Styling System
- Uses CSS custom properties for theming
- Class utility function `cn()` for conditional styling
- Tailwind plugins: forms, typography, aspect-ratio

### API Structure
- RESTful API routes under `/api/`
- Organized by domain: auth, cms, content, programs, projects
- Supports CRUD operations for all content types
