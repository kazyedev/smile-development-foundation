'use client';

import { useState, useEffect } from 'react';
import { PrimaryCarouselCard } from '@/types/primaryCarouselCard';

interface UseHeroSlidesResult {
  slides: PrimaryCarouselCard[];
  loading: boolean;
  error: string | null;
}

export function useHeroSlides(locale: string = 'en', limit: number = 10): UseHeroSlidesResult {
  const [slides, setSlides] = useState<PrimaryCarouselCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/hero-slides?locale=${locale}&limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch hero slides');
        }

        const result = await response.json();
        
        if (result.success) {
          setSlides(result.data);
        } else {
          throw new Error(result.error || 'Unknown error occurred');
        }
      } catch (err) {
        console.error('Error fetching hero slides:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setSlides([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [locale, limit]);

  return { slides, loading, error };
}
