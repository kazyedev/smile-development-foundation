export type NewsCategory = {
  id: number;
  titleEn: string;
  titleAr: string;
  featuredImageUrl: string;
  slugEn: string;
  slugAr: string;
};

export const mockNewsCategories: NewsCategory[] = [
  { id: 1, titleEn: 'Announcements', titleAr: 'إعلانات', featuredImageUrl: '/assets/mockimage.jpg', slugEn: 'announcements', slugAr: 'إعلانات' },
  { id: 2, titleEn: 'Programs', titleAr: 'البرامج', featuredImageUrl: '/assets/mockimage.jpg', slugEn: 'programs', slugAr: 'البرامج' },
  { id: 3, titleEn: 'Community', titleAr: 'المجتمع', featuredImageUrl: '/assets/mockimage.jpg', slugEn: 'community', slugAr: 'المجتمع' },
];


