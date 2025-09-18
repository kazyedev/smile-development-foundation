"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Video } from "@/types/video";
import VideoDetailClient from "@/components/website/videos/VideoDetailClient";
import { Loader2, Film, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MediaVideoDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const isEnglish = locale === "en";
  const decodedSlug = decodeURIComponent(slug);
  const [video, setVideo] = useState<Video | null>(null);
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both the specific video and all videos in parallel
        const [videoResponse, allVideosResponse] = await Promise.all([
          fetch(`/api/videos/${decodedSlug}`),
          fetch('/api/videos?published=true&isPublic=true')
        ]);
        
        if (!videoResponse.ok) {
          if (videoResponse.status === 404) {
            throw new Error('Video not found');
          }
          throw new Error('Failed to fetch video');
        }
        
        if (!allVideosResponse.ok) {
          throw new Error('Failed to fetch all videos');
        }
        
        const [videoData, allVideosData] = await Promise.all([
          videoResponse.json(),
          allVideosResponse.json()
        ]);
        
        setVideo(videoData);
        setAllVideos(allVideosData.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold mb-2">
            {isEnglish ? 'Loading video...' : 'جاري تحميل الفيديو...'}
          </h2>
          <p className="text-muted-foreground">
            {isEnglish ? 'Please wait while we fetch the video details' : 'يرجى الانتظار بينما نقوم بتحميل تفاصيل الفيديو'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Film className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{isEnglish ? 'Video not found' : 'الفيديو غير موجود'}</h2>
          <p className="text-muted-foreground mb-6">
            {error || (isEnglish ? 'The video you are looking for does not exist.' : 'الفيديو الذي تبحث عنه غير موجود.')}
          </p>
          <Button asChild>
            <Link href={`/${locale}/media/videos`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isEnglish ? 'Back to Videos' : 'العودة للفيديوهات'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const moreVideos = allVideos.filter((v) => v.id !== video.id).slice(0, 6);
  
  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <VideoDetailClient video={video} moreVideos={moreVideos} locale={locale} />
    </div>
  );
}
