export interface SEODetailes {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  keywordsEn: string[];
  keywordsAr: string[];
  createdAt: Date;
  updatedAt: Date;
}