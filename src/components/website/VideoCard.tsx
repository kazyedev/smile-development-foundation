"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Video } from "@/types/video";
import Image from "next/image";
import Link from "next/link";
import { Play, Eye, MapPin } from "lucide-react";
import { formatLargeNumber } from "@/utils/formatLargeNumber";

export default function VideoCard({ video, locale, onPlay, condensed = false }: { video: Video, locale: string, onPlay?: () => void, condensed?: boolean }) {
  const isLocaleEnglish = locale === "en";
  const hideMetaClass = condensed ? 'md:hidden' : '';
  

  const formatDuration = (width: number, height: number) => {
    // This is a mock duration calculation based on video dimensions
    // In real implementation, you'd get this from video metadata
    const estimatedMinutes = Math.floor((width * height) / 500000) + 2;
    if (isLocaleEnglish) {
      return `${estimatedMinutes} min`;
    } else {
      return `${estimatedMinutes} دقيقة`;
    }
  };

  // Generate a placeholder thumbnail image
  const getThumbnailUrl = (videoUrl: string) => {
    // In real implementation, you'd use actual video thumbnails
    return `https://img.youtube.com/vi/${videoUrl.split('=')[1]}/0.jpg`;
  };

  return (
    <Card className="w-full h-full pt-0 overflow-hidden relative hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-48 bg-black">
          <Image
            src={getThumbnailUrl(video.url)}
            alt={isLocaleEnglish ? video.titleEn : video.titleAr}
            width={600}
            height={340}
            className="w-full h-48 object-cover"
          />
          {onPlay ? (
            <button
              type="button"
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300 cursor-pointer"
              aria-label={isLocaleEnglish ? "Play video" : "تشغيل الفيديو"}
            >
              <Play className="w-16 h-16 text-white drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="white" />
            </button>
          ) : (
            <Link
              href={`/${locale}/media/videos/${isLocaleEnglish ? video.slugEn : video.slugAr}`}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-300 cursor-pointer"
              aria-label={isLocaleEnglish ? "Play video" : "تشغيل الفيديو"}
            >
              <Play className="w-16 h-16 text-white drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="white" />
            </Link>
          )}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.width, video.height)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {isLocaleEnglish ? video.titleEn : video.titleAr}
        </CardTitle>
        
        {(video.locationEn || video.locationAr) && (
          <div className={`flex items-center gap-2 text-sm text-muted-foreground ${hideMetaClass}`}>
            <MapPin className="w-4 h-4" />
            <span>{isLocaleEnglish ? video.locationEn : video.locationAr}</span>
          </div>
        )}
        
        <CardDescription className={`text-sm text-muted-foreground line-clamp-3 ${hideMetaClass}`}>
          {isLocaleEnglish ? video.descriptionEn : video.descriptionAr}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{formatLargeNumber(video.views, "view", isLocaleEnglish ? "en" : "ar")}</span>
          </div>

        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <div className={`flex gap-2 text-xs ${hideMetaClass}`}>
          {isLocaleEnglish 
            ? video.tagsEn.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">
                  #{tag}
                </span>
              ))
            : video.tagsAr.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">
                  #{tag}
                </span>
              ))
          }
        </div>
        {onPlay ? (
          <Button variant="outline" size="sm" onClick={onPlay}>
            {isLocaleEnglish ? "Watch Video" : "مشاهدة الفيديو"}
          </Button>
        ) : (
          <Link href={`/${locale}/media/videos/${isLocaleEnglish ? video.slugEn : video.slugAr}`} className="block">
            <Button variant="outline" size="sm">
              {isLocaleEnglish ? "Watch Video" : "مشاهدة الفيديو"}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}