// Import Drizzle types
import type {
  Program as DrizzleProgram,
  NewProgram,
  ProgramStatic,
  ProgramProviderDonorPartner,
  ProgramSlide,
  insertProgramSchema,
  selectProgramSchema,
} from '@/lib/db/schema/programs';

// Use Drizzle inferred types as the main program interface
export type Program = DrizzleProgram;
export type CreateProgram = NewProgram;
export type ProgramStatistic = ProgramStatic;
export type ProgramProvider = ProgramProviderDonorPartner;
export type ProgramDonor = ProgramProviderDonorPartner;
export type ProgramPartner = ProgramProviderDonorPartner;
export type ProgramSlideType = ProgramSlide;

// Export validation schemas
export { insertProgramSchema, selectProgramSchema };

// Legacy interface for backward compatibility (if needed)
export interface LegacyProgram {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  aboutEn?: string | null;
  aboutAr?: string | null;
  goalsEn?: string[] | null;
  goalsAr?: string[] | null;
  statics?: ProgramStatistic[] | null;
  icon?: string | null;
  color?: string | null;
  implementationLocationEn?: string | null;
  implementationLocationAr?: string | null;
  fundingProviders?: ProgramProvider[] | null;
  donors?: ProgramDonor[] | null;
  partners?: ProgramPartner[] | null;
  featuredImageUrl?: string | null;
  slides?: ProgramSlideType[] | null;
  slugEn: string;
  slugAr: string;
  keywordsEn?: string[] | null;
  keywordsAr?: string[] | null;
  tagsEn?: string[] | null;
  tagsAr?: string[] | null;
  includeInSitemapEn?: boolean | null;
  includeInSitemapAr?: boolean | null;
  pageViews?: number | null;
  createdBy?: string | null;
  isPublished?: boolean | null;
  publishedAt?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
