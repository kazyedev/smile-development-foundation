import { Activity } from './activity';
import { MediaCategory } from './mediaCategory';
import { Program } from './program';
import { Project } from './project';

export interface Story {
  isEnglish: boolean;
  isArabic: boolean;
  titleEn: string;
  titleAr: string;
  featuredImageUrl: string;
  video: string;
  programId?: number;
  personNameEn: string;
  personNameAr: string;
  personAge: number;
  personLocationEn: string;
  personLocationAr: string;
  cityEn: string;
  cityAr: string;
  otherImagesUrl: string[];
  contentEn: string; // Rich text content with HTML/markdown formatting
  contentAr: string; // Rich text content with HTML/markdown formatting
  program?: Program;
  project?: Project;
  activity?: Activity;
  category?: MediaCategory;
    slugEn: string;
  slugAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  tagsEn: string[];
  tagsAr: string[];
  readTime: number;
  pageViews: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
} 