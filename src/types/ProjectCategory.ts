

export interface ProjectCategory {
   id: number;
   titleEn: string;
   titleAr: string;
   featuredImageUrl: string;
     slugEn: string;
  slugAr: string;
   descriptionEn?: string;
   descriptionAr?: string;
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