# Programs CMS - Code Issues & Inconsistencies

## Critical Issues

### 1. Inconsistent Field Transformation Functions

**Location 1**: `src/app/api/cms/programs/route.ts` (lines 6-41)
```typescript
// ❌ PROBLEM: Unconditional transformation - sets undefined values
const transformToDatabaseFields = (data: any) => {
  return {
    title_en: data.titleEn,  // Could be undefined
    // ... all fields mapped regardless of existence
  };
};
```

**Location 2**: `src/app/api/cms/programs/[id]/route.ts` (lines 5-40)
```typescript
// ✅ CORRECT: Conditional transformation - only includes defined fields
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  if (data.titleEn !== undefined) transformed.title_en = data.titleEn;
  // ... only transforms fields that exist
};
```

**Impact**: 
- POST route may insert `undefined` values into database
- PATCH route correctly handles partial updates
- Inconsistent behavior between create and update operations

**Recommendation**: 
- Standardize on the conditional approach (from [id]/route.ts)
- Extract to shared utility function
- Apply to POST route

### 2. Missing Slug Uniqueness Validation

**Location**: Both create and edit forms
- No API endpoint to check slug uniqueness before submission
- Relies on database constraint error (poor UX)

**Impact**: 
- Users get database errors instead of friendly validation messages
- No way to check availability before submitting

**Recommendation**: 
- Add `/api/cms/programs/check-slug` endpoint
- Call it on slug input blur
- Show validation error if slug exists

### 3. Schema Field Name Mismatch

**Issue**: Database schema uses snake_case (`title_en`) but TypeScript schema uses camelCase (`titleEn`)

**Location**: `src/lib/db/schema/programs.ts`
```typescript
// Schema definition uses camelCase
titleEn: varchar("title_en", { length: 500 }).notNull(),
titleAr: varchar("title_ar", { length: 500 }).notNull(),
```

**Impact**: 
- Confusion about which naming convention to use
- Transformation needed everywhere
- Type mismatches

**Note**: This is intentional (Drizzle ORM pattern), but transformation must be consistent

### 4. ProgramStaticSchema Mismatch

**Location**: `src/lib/db/schema/programs.ts` (lines 16-23)

**Schema defines**:
```typescript
export const ProgramStaticSchema = z.object({
  icon: z.string().optional(),
  titleEn: z.string(),
  titleAr: z.string(),
  value: z.number(),
  unitEn: z.string().optional(),  // ✅ Defined in schema
  unitAr: z.string().optional(),  // ✅ Defined in schema
});
```

**Form schema uses** (from new/page.tsx):
```typescript
statics: z.array(z.object({
  titleEn: z.string(),
  titleAr: z.string(),
  value: z.number(),
  // ❌ Missing: icon, unitEn, unitAr
})).default([]),
```

**Impact**: 
- Form doesn't support all schema fields
- Data loss if schema fields are used elsewhere

### 5. No Pagination in List API

**Location**: `src/app/api/cms/programs/route.ts` GET endpoint

**Current**:
```typescript
let query = supabase
  .from("programs")
  .select("...")
  .order("created_at", { ascending: false });
// No limit, no pagination
```

**Impact**: 
- All records fetched at once
- Performance issues with large datasets
- Frontend must handle all data

**Recommendation**: 
```typescript
const page = parseInt(searchParams.get('page') || '1');
const limit = parseInt(searchParams.get('limit') || '50');
const offset = (page - 1) * limit;

query = query.range(offset, offset + limit - 1);
```

### 6. Client-Side Sorting vs Server-Side

**Location**: `src/app/[locale]/cms/programs/page.tsx`

**Current**: 
- Data fetched from API
- Sorting happens client-side (lines 245-266)
- All data must be in memory

**Impact**: 
- Inefficient for large datasets
- Extra work on client
- Doesn't leverage database indexes

**Recommendation**: 
- Add `sortBy` and `sortOrder` query params to API
- Move sorting to server-side
- Keep client-side as fallback

### 7. Missing Error Boundary

**Location**: All page components

**Issue**: 
- No error boundary components
- Errors crash entire page
- No graceful error handling

**Recommendation**: 
- Add React Error Boundaries
- Show friendly error messages
- Provide retry options

### 8. Duplicate Form Schema

**Location**: 
- `src/app/[locale]/cms/programs/new/page.tsx` (lines 18-63)
- `src/app/[locale]/cms/programs/[id]/edit/page.tsx` (lines 19-64)

**Issue**: 
- Identical schema defined in both files
- Changes must be made in two places
- Risk of inconsistencies

**Recommendation**: 
- Extract to `src/lib/schemas/program-form.ts`
- Import in both files

### 9. Missing Type Definitions

**Location**: API routes

**Issue**: 
- Uses `any` type in several places
- No shared types for API responses
- Type safety lost

**Examples**:
```typescript
const transformToDatabaseFields = (data: any) => { ... }
const payload = await req.json().catch(() => ({}));
```

**Recommendation**: 
- Define proper types
- Use TypeScript interfaces
- Share types between frontend and backend

### 10. No Transaction Support

**Location**: API routes

**Issue**: 
- No database transactions
- Multiple operations not atomic
- Could leave inconsistent state

**Example**: 
- Bulk delete fails halfway through
- Some records deleted, others not
- No rollback mechanism

**Recommendation**: 
- Use Supabase transactions where needed
- Especially for bulk operations

## Performance Issues

### 1. No Caching
- Every page load fetches fresh data
- No React Query or SWR
- Unnecessary API calls

### 2. No Optimistic Updates
- UI waits for server response
- Slower perceived performance
- No instant feedback

### 3. Inefficient Queries
- GET endpoint selects all fields (even unused ones)
- No query optimization
- Could use select more efficiently

## Security Issues

### 1. No Rate Limiting
- API endpoints don't have rate limits
- Vulnerable to abuse
- No DDoS protection

### 2. No Input Sanitization
- Rich text fields not sanitized
- Potential XSS vulnerability
- Should sanitize HTML content

### 3. No CSRF Protection
- No CSRF tokens
- Relies on Next.js defaults
- May need explicit protection

## Missing Features

### 1. Image Upload
- Only URL input, no file upload
- Users must upload elsewhere
- Poor UX

### 2. Auto-Slug Generation
- Manual slug creation
- No auto-generation from title
- Inconsistent slugs

### 3. Preview Functionality
- Can't preview before publishing
- Must publish to see result
- No draft preview

### 4. Bulk Operations
- Only bulk delete
- No bulk publish/unpublish
- No bulk status update

### 5. Export Functionality
- No CSV/Excel export
- Can't export data
- Limited reporting

### 6. Search Limitations
- Only searches title fields
- No full-text search
- No advanced filters

## Code Quality Issues

### 1. Console.log Statements
**Location**: Multiple files
- Leftover debug logs
- Should use proper logging
- Remove before production

### 2. Error Messages
- Some hardcoded English strings
- Not using translation system
- Inconsistent error handling

### 3. Magic Numbers/Strings
- Hardcoded values throughout
- Should be constants
- Not configurable

## Recommendations Priority

### High Priority (Fix Immediately)
1. ✅ Fix field transformation inconsistency
2. ✅ Add slug uniqueness validation
3. ✅ Extract duplicate form schema
4. ✅ Add pagination to list API

### Medium Priority (Fix Soon)
1. Add image upload functionality
2. Implement server-side sorting
3. Add proper error boundaries
4. Improve type safety

### Low Priority (Nice to Have)
1. Add preview functionality
2. Implement bulk operations
3. Add export functionality
4. Improve search capabilities

