import { MediaCategory } from './MediaCategory';

export interface Video  {
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
  url: string;
  locationEn?: string;
  locationAr?: string;
  isPublic: boolean;
  category?: MediaCategory;
    slugEn: string;
  slugAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  tagsEn: string[];
  tagsAr: string[];
  views: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}   