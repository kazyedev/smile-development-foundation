import { VolunteerQuestions } from "./volunteerQuestions";

export interface VolunteerRequest {
  id: number;
  isEnglish: boolean;
  isArabic: boolean;
  cvUrl: string;
  questionsAnswers: {
    question: VolunteerQuestions;
    answerEn: string;
    answerAr: string;
  }[];
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}