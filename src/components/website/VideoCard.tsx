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
import { Play, Eye, MapPin, Clock, ArrowRight } from "lucide-react";
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
    <Card className="group w-full h-full overflow-hidden relative hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
      {/* Enhanced header with better image handling */}
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative w-full h-48 bg-black">
          <Image
            src={getThumbnailUrl(video.url)}
            alt={isLocaleEnglish ? video.titleEn : video.titleAr}
            width={600}
            height={340}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Enhanced play button overlay */}
          {onPlay ? (
            <button
              type="button"
              onClick={onPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all duration-500 cursor-pointer group/play"
              aria-label={isLocaleEnglish ? "Play video" : "تشغيل الفيديو"}
            >
              <div className="w-20 h-20 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-all duration-300 group-hover/play:shadow-white/50">
                <Play className="w-10 h-10 text-black ml-1" fill="black" />
              </div>
            </button>
          ) : (
            <Link
              href={`/${locale}/media/videos/${isLocaleEnglish ? video.slugEn : video.slugAr}`}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all duration-500 cursor-pointer group/play"
              aria-label={isLocaleEnglish ? "Play video" : "تشغيل الفيديو"}
            >
              <div className="w-20 h-20 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-all duration-300 group-hover/play:shadow-white/50">
                <Play className="w-10 h-10 text-black ml-1" fill="black" />
              </div>
            </Link>
          )}
          
          {/* Enhanced duration badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{formatDuration(video.width, video.height)}</span>
            </div>
          </div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </CardHeader>
      
      {/* Enhanced content with better spacing and typography */}
      <CardContent className="space-y-4 p-6 relative z-20">
        <div className="space-y-3">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
            {isLocaleEnglish ? video.titleEn : video.titleAr}
          </CardTitle>
          
          {/* Enhanced location display */}
          {(video.locationEn || video.locationAr) && (
            <div className={`flex items-center gap-2 text-sm text-muted-foreground ${hideMetaClass} group-hover:text-foreground transition-colors duration-300`}>
              <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300">
                <MapPin className="w-4 h-4 text-brand-primary" />
              </div>
              <span className="font-medium">{isLocaleEnglish ? video.locationEn : video.locationAr}</span>
            </div>
          )}
          
          <CardDescription className={`text-sm text-muted-foreground leading-relaxed line-clamp-3 ${hideMetaClass} group-hover:text-foreground/80 transition-colors duration-300`}>
            {isLocaleEnglish ? video.descriptionEn : video.descriptionAr}
          </CardDescription>
        </div>
        
        {/* Enhanced stats display */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg group-hover:bg-muted/80 transition-colors duration-300">
            <Eye className="w-4 h-4 text-brand-primary" />
            <span className="font-medium text-foreground">
              {formatLargeNumber(video.views, "view", isLocaleEnglish ? "en" : "ar")}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Enhanced footer with better button styling */}
      <CardFooter className="p-6 pt-0 flex justify-between items-center relative z-20">
        {/* Enhanced tags with brand colors */}
        <div className={`flex gap-2 text-xs ${hideMetaClass}`}>
          {(isLocaleEnglish ? video.tagsEn : video.tagsAr).slice(0, 2).map((tag, index) => (
            <span 
              key={tag} 
              className="bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full text-xs font-medium border border-brand-primary/20 hover:bg-brand-primary/20 transition-colors duration-300"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Enhanced button with icon */}
        {onPlay ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPlay}
            className="group/btn border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            <span className="mr-2">
              {isLocaleEnglish ? "Watch Video" : "مشاهدة الفيديو"}
            </span>
            <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
          </Button>
        ) : (
          <Link href={`/${locale}/media/videos/${isLocaleEnglish ? video.slugEn : video.slugAr}`} className="block">
            <Button 
              variant="outline" 
              size="sm"
              className="group/btn border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:shadow-lg"
            >
              <span className="mr-2">
                {isLocaleEnglish ? "Watch Video" : "مشاهدة الفيديو"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        )}
      </CardFooter>

      {/* Enhanced hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      
      {/* Subtle border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-brand-primary/20 rounded-lg transition-colors duration-500 pointer-events-none" />
    </Card>
  );
}