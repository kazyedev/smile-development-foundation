// Import Drizzle types
import type {
  Project as DrizzleProject,
  NewProject,
  ProjectBanner,
  ProjectStatic,
  ProjectProviderDonorPartner,
  ProjectDeliverable,
  ProjectResource,
  ProjectCost,
  ProjectBeneficiary,
  insertProjectSchema,
  selectProjectSchema,
} from '@/lib/db/schema/projects';

// Use Drizzle inferred types as the main project interface
export type Project = DrizzleProject;
export type CreateProject = NewProject;

// Export all the sub-types for components and forms
export type Banner = ProjectBanner;
export type Static = ProjectStatic;
export type Deliverables = ProjectDeliverable;
export type Resource = ProjectResource;
export type Cost = ProjectCost;
export type Beneficiaries = ProjectBeneficiary;
export type ProjectProvider = ProjectProviderDonorPartner;
export type ProjectDonor = ProjectProviderDonorPartner;
export type ProjectPartner = ProjectProviderDonorPartner;

// Export validation schemas
export { insertProjectSchema, selectProjectSchema };

// Legacy interface for backward compatibility (if needed)
export interface LegacyProject {
  id: number;
  isEnglish?: boolean | null;
  isArabic?: boolean | null;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuredImageUrl: string;
  color: string;
  banners?: Banner[] | null;
  goalsEn?: string[] | null;
  goalsAr?: string[] | null;
  videoUrl?: string | null;
  statics?: Static[] | null;
  fundingProviders?: ProjectProvider[] | null;
  donors?: ProjectDonor[] | null;
  partners?: ProjectPartner[] | null;
  deliverables?: Deliverables[] | null;
  resources?: Resource[] | null;
  slugEn: string;
  slugAr: string;
  keywordsEn?: string[] | null;
  keywordsAr?: string[] | null;
  tagsEn?: string[] | null;
  tagsAr?: string[] | null;
  pageViews?: number | null;
  programId?: number | null;
  categoryId?: number | null;
  activityIds?: number[] | null;
  isPublished?: boolean | null;
  publishedAt?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  cost?: Cost[] | null;
  beneficiaries?: Beneficiaries[] | null;
}
