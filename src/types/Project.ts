interface Static {
  icon: string;
  titleEn: string;
  titleAr: string;
  value: number;
  unitEn: string;
  unitAr: string;
}

interface Banner {
  titleEn: string;
  titleAr: string;
  imageUrl: string;
}


interface Deliverables {
  titleEn: string;
  titleAr: string;
  value: string;
  unitEn: string;
  unitAr: string;
}

interface Resource {
  titleEn: string;
  titleAr: string;
  image: string;
}

export interface Project {
   id: number;
   isEnglish: boolean;
   isArabic: boolean;
   titleEn: string;
   titleAr: string;
   descriptionEn: string;
   descriptionAr: string;
   featuredImageUrl: string;
   color: string;
   banners: Banner[];
   goalsEn: string[];
   goalsAr: string[];
   videoUrl: string;
   statics: Static[];
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
   deliverables: Deliverables[];
   resources: Resource[];
   slugEn: string;
   slugAr: string;
   keywordsEn: string[];
   keywordsAr: string[];
   tagsEn: string[];
   tagsAr: string[];
   pageViews: number;
   programId: number;
   categoryId: number;
   activityIds: number[];
   isPublished: boolean;
   publishedAt: Date;
   createdAt: Date;
   updatedAt: Date;   
} 