export enum Roles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CONTENT_MANAGER = 'content_manager',
  VIEWER = 'viewer',
  AUTHOR = 'author',
  DEFAULT = 'default',
}

export enum Sections {
  Programs = 'programs',
  Projects = 'projects',
  ProjectCategories = 'project_categories',
  Activities = 'activities',
  News = 'news',
  NewsCategories = 'news_categories',
  EmailNewsletters = 'email_newsletters',
  Videos = 'videos',
  Photos = 'photos',
  Publications = 'publications',
  Reports = 'reports',
  SuccessStories = 'success_stories',
  FoundationProfile = 'foundation_profile',
  AdminAccounts = 'admin_accounts',
  BoardOfDirectors = 'board_of_directors',
  TeamMembers = 'team_members',
  Jobs = 'jobs',
  Faqs = 'faqs',
  Statics = 'statics',
  Donations = 'donations',
  Partners = 'partners',
}
export enum SectionActions {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface SectionPermissions {
  section: Sections;
  actions: SectionActions[];
}

export interface Profile {
  id: string;
  nameEn: string;
  nameAr: string;
  email: string;
  phone: string;
  imageUrl: string;
  role: Roles;
  allowedSections: SectionPermissions[];
  bio: string;
  lastLogin: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}