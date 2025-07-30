

export interface MediaCategory {
  nameEn: string;
  nameAr: string;
  slugEn: string;
  slugAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  imageUrl?: string;
  imageAltEn?: string;
  imageAltAr?: string;
  pageViews: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
  icon?: string;
  isEnglish: boolean;
  isArabic: boolean;
} 