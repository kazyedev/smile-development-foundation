

export interface Program  {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  aboutEn: string;
  aboutAr: string;
  goalsEn: string[];
  goalsAr: string[];
  statics: {
    titleEn: string;
    titleAr: string;
    value: number;
  }[];
  icon: string;
  featuredImageUrl: string;
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