


export interface Activity {
  id: number;
  isArabic: boolean;
  isEnglish: boolean;
  titleEn: string;
  titleAr: string;
  featuredImageUrl: string;
  date?: Date;
  contentEn: string;
  contentAr: string;
  otherImagesUrl: string[];
  programId: number;
  projectId?: number;
  slugEn: string;
  slugAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  tagsEn: string[];
  tagsAr: string[];
  pageViews: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
} 