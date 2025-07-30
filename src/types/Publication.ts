
export interface Publication {
  id: number;
  isEnglish: boolean;
  isArabic: boolean;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  url: string;
  programId?: number;
  projectId?: number;
  activityId?: number;  
  categoryId?: number;
  featuredImageUrl?: string;
    slugEn: string;
  slugAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  tagsEn: string[];
  tagsAr: string[];
  pageViews: number;
  downloads: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}   