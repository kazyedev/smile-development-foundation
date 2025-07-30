import { BankAccount } from "./BankAccount";

interface Static {
  icon: string;
  titleEn: string;
  titleAr: string;
  value: number;
}

export interface FoundationProfile {
  id: number;
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  email: string;
  phone: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  telegram: string;
  bankAccounts: BankAccount[];
  statics: Static[];
  createdAt: Date;
  updatedAt: Date;
}