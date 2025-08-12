

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
  color: string;
  implementationLocationEn: string;
  implementationLocationAr: string;
  fundingProviders: {
    nameEn: string;
    nameAr: string;
    imageUrl: string;
  }[];
  donors: {
    nameEn: string;
    nameAr: string;
    imageUrl: string;
  }[];
  partners: {
    nameEn: string;
    nameAr: string;
    imageUrl: string;
  }[];
  featuredImageUrl: string;
  slides: {
    titleEn: string;
    titleAr: string;
    imageUrl: string;
  }[];
    slugEn: string;
  slugAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  tagsEn: string[];
  tagsAr: string[];
  includeInSitemapEn: boolean;
  includeInSitemapAr: boolean;
  pageViews: number;
  createdBy: string; // FK auth.users.id type uuid
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
} 