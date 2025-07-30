export interface FAQ {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  views: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
} 