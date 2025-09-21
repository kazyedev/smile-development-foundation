'use client';

import { useState, useEffect } from 'react';

export interface HomepageProject {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuredImageUrl: string;
  color: string;
  slugEn: string;
  slugAr: string;
  pageViews: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageActivity {
  id: number;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  featuredImageUrl: string;
  date: string | null;
  slugEn: string;
  slugAr: string;
  pageViews: number;
  tagsEn: string[];
  tagsAr: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageSuccessStory {
  id: number;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  featuredImageUrl: string;
  video: string;
  personNameEn: string;
  personNameAr: string;
  personAge: number;
  personLocationEn: string;
  personLocationAr: string;
  cityEn: string;
  cityAr: string;
  slugEn: string;
  slugAr: string;
  pageViews: number;
  tagsEn: string[];
  tagsAr: string[];
  readTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageVideo {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string | null;
  descriptionAr: string | null;
  url: string;
  width: number;
  height: number;
  locationEn: string | null;
  locationAr: string | null;
  slugEn: string;
  slugAr: string;
  views: number;
  tagsEn: string[];
  tagsAr: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageNews {
  id: number;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  featuredImageUrl: string;
  slugEn: string;
  slugAr: string;
  pageViews: number;
  readTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageData {
  projects: HomepageProject[];
  activities: HomepageActivity[];
  successStories: HomepageSuccessStory[];
  videos: HomepageVideo[];
  news: HomepageNews[];
}

interface UseHomepageDataResult {
  data: HomepageData | null;
  loading: boolean;
  error: string | null;
}

export function useHomepageData(locale: string = 'en'): UseHomepageDataResult {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/homepage-data?locale=${locale}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch homepage data');
        }

        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'Unknown error occurred');
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  return { data, loading, error };
}
