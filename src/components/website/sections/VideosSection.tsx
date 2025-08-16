"use client";

import { Video } from "@/types/video";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockVideos } from "@/data/mockVideos";
import { Play, Film, Camera, Eye } from "lucide-react";
import Image from "next/image";

// mockVideos imported from shared data

export default function VideosSection({ locale }: { locale: string }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isEnglish = locale === "en";

  const handleVideoSelect = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return isEnglish ? `${(views / 1000000).toFixed(1)}M views` : `${(views / 1000000).toFixed(1)} مليون مشاهدة`;
    } else if (views >= 1000) {
      return isEnglish ? `${(views / 1000).toFixed(1)}K views` : `${(views / 1000).toFixed(1)} ألف مشاهدة`;
    }
    return isEnglish ? `${views} views` : `${views} مشاهدة`;
  };

  const formatDuration = (width: number, height: number) => {
    const estimatedMinutes = Math.floor((width * height) / 500000) + 2;
    return isEnglish ? `${estimatedMinutes} min` : `${estimatedMinutes} دقيقة`;
  };

  const getThumbnailUrl = (url: string) => {
    const videoId = url.split('=')[1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const selectedVideo = activeVideo || mockVideos[0];

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-black/5 dark:to-black/20 overflow-hidden">
      {/* Cinema Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(var(--brand-primary-rgb),0.1),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(var(--brand-primary-rgb),0.15),transparent)]"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 text-brand-primary rounded-full text-sm font-medium mb-6">
            <Film className="w-4 h-4" />
            {isEnglish ? "Video Theater" : "مسرح الفيديو"}
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {isEnglish ? "Video Gallery" : "معرض الفيديو"}
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isEnglish 
              ? "Watch inspiring stories and behind-the-scenes moments from our projects and community initiatives that showcase the real impact of our work."
              : "شاهد القصص الملهمة واللحظات من وراء الكواليس لمشاريعنا ومبادراتنا المجتمعية التي تُظهر التأثير الحقيقي لعملنا."
            }
          </p>
        </div>

        {/* Main Cinema Screen */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Screen Frame */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black p-8 rounded-3xl shadow-2xl">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group">
                {isPlaying ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.url.split('=')[1]}?autoplay=1`}
                    title={isEnglish ? selectedVideo.titleEn : selectedVideo.titleAr}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image 
                      src={getThumbnailUrl(selectedVideo.url)}
                      alt={isEnglish ? selectedVideo.titleEn : selectedVideo.titleAr}
                      className="w-full h-full object-cover"
                      width={selectedVideo.width}
                      height={selectedVideo.height}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <button
                        onClick={handlePlay}
                        className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                      >
                        <Play className="w-8 h-8 text-black ml-1" fill="black" />
                      </button>
                    </div>
                  </>
                )}
                
                {/* Video Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                  {formatDuration(selectedVideo.width, selectedVideo.height)}
                </div>
              </div>
              
              {/* Screen Details */}
              <div className="mt-6 text-white">
                <h3 className="text-xl lg:text-2xl font-bold mb-3">
                  {isEnglish ? selectedVideo.titleEn : selectedVideo.titleAr}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {isEnglish ? selectedVideo.descriptionEn : selectedVideo.descriptionAr}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {formatViews(selectedVideo.views)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    {isEnglish ? selectedVideo.locationEn : selectedVideo.locationAr}
                  </div>
                  <div className="flex gap-2">
                    {(isEnglish ? selectedVideo.tagsEn : selectedVideo.tagsAr).slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cinema Lights Effect */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-xl font-semibold mb-8 text-center">
            {isEnglish ? "Video Playlist" : "قائمة الفيديوهات"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockVideos.map((video, index) => (
              <motion.div
                key={video.slugEn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group cursor-pointer ${selectedVideo.slugEn === video.slugEn ? 'ring-2 ring-brand-primary' : ''}`}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <Image 
                    src={getThumbnailUrl(video.url)}
                    alt={isEnglish ? video.titleEn : video.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={video.width}
                    height={video.height}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-10 h-10 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.width, video.height)}
                  </div>
                </div>
                
                <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                  {isEnglish ? video.titleEn : video.titleAr}
                </h4>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatViews(video.views)}
                  </div>
                  <span>{isEnglish ? video.locationEn : video.locationAr}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Stats
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary/10 to-brand-primary/20 dark:from-brand-primary/20 dark:to-brand-primary/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Monitor className="w-8 h-8 text-brand-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">25+</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Video Stories" : "قصة فيديو"}
            </div>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/20 dark:from-brand-secondary/20 dark:to-brand-secondary/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-brand-secondary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Total Views" : "إجمالي المشاهدات"}
            </div>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-8 h-8 text-brand-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">120</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Hours of Content" : "ساعة من المحتوى"}
            </div>
          </div>
        </div>
         */}
        {/* Call to Action */}
        <div className="text-center">
          <Link href={`/${locale}/media/videos`}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Film className="w-4 h-4 mr-2" />
              {isEnglish ? "View All Videos" : "عرض جميع الفيديوهات"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}