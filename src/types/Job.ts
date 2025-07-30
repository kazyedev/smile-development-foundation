
export interface Job  {
  id: number;
  isEnglish: boolean;
  isArabic: boolean;
  titleEn: string;
  titleAr: string;
  slugEn: string;
  slugAr: string;
  descriptionEn: string;
  descriptionAr: string;
  availablePositions: number;
  requirementsEn: string[];
  requirementsAr: string[];
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  locationEn: string;
  locationAr: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'volunteer';
  applyUrl: string;
  pageViews: number;
  isPublished: boolean;
  publishedAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
} 