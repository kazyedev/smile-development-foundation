"use client";

import { Video } from "@/types/video";
import VideoCard from "../VideoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mockVideos } from "@/data/mockVideos";

// mockVideos imported from shared data

export default function VideosSection({ locale }: { locale: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isEnglish = locale === "en";

  const isExpanded = activeIndex !== null;
  const containerClass = `mt-6 w-full max-w-7xl mx-auto gap-4 ${
    isExpanded
      ? 'grid grid-cols-1 md:flex'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }`;

  const handlePlay = (index: number) => () => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <h1 className="text-2xl font-bold text-center">
        {isEnglish ? "Video Gallery" : "معرض الفيديو"}
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        {isEnglish 
          ? "Watch inspiring stories and behind-the-scenes moments from our projects and community initiatives that showcase the real impact of our work."
          : "شاهد القصص الملهمة واللحظات من وراء الكواليس لمشاريعنا ومبادراتنا المجتمعية التي تُظهر التأثير الحقيقي لعملنا."
        }
      </p>
      <div className={containerClass}>
        {mockVideos.slice(0, 3).map((video, idx) => {
          const isActive = activeIndex === idx;
          return (
            <motion.div
              key={video.slugEn}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative md:min-w-0 ${!isExpanded && isActive ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''}`}
              style={isExpanded ? { flexBasis: isActive ? '60%' : '20%' } : undefined}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.button
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute -top-2 -right-2 z-10 bg-[var(--background)] border border-[var(--border)] rounded-full w-8 h-8 flex items-center justify-center shadow"
                    aria-label={isEnglish ? 'Close player' : 'إغلاق المشغل'}
                  >
                    <span className="text-lg">×</span>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.div layout className="h-full">
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="player"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full aspect-video rounded-xl overflow-hidden bg-black border shadow-sm"
                    >
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.url.split('=')[1]}?autoplay=1`}
                        title={isEnglish ? video.titleEn : video.titleAr}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <VideoCard video={video} locale={locale} onPlay={handlePlay(idx)} condensed={isExpanded && !isActive} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href={`/${locale}/media/videos`}>
          <Button variant="outline" size="lg">
            {isEnglish ? "View All Videos" : "عرض جميع الفيديوهات"}
          </Button>
        </Link>
      </div>
    </div>
  );
}