
export interface Photo {
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
  url: string;
  alt?: string;
  locationEn?: string;
  locationAr?: string;
  takenAt?: Date;
  photographer?: string;
  isPublic: boolean;
  programId?: number;
  projectId?: number;
  activityId?: number;
  categoryId?: number;
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