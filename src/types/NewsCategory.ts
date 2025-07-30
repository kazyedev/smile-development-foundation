

export interface NewsCategory {
  nameEn: string;
  nameAr: string;
    slugEn: string;
  slugAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  color?: string;
  pageViews: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  icon?: string;
} 