
export interface News {
  id: number;
  isEnglish: boolean;
  isArabic: boolean;
  titleEn: string;
  titleAr: string;
  featuredImageUrl: string;
  otherImagesUrl: string[];
  contentEn: string;
  contentAr: string;
  categoryId?: number;
    slugEn: string;
  slugAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  tagsEn: string[];
  tagsAr: string[];
  readTime: number;
  pageViews: number;
  authorId: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
} 