"use client";

import { Video } from "@/types/video";
import VideoCard from "../VideoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const mockVideos: Video[] = [
  {
    titleEn: "Building Hope: Water Wells Project Documentary",
    titleAr: "بناء الأمل: فيلم وثائقي عن مشروع آبار المياه",
    descriptionEn: "Follow our journey as we bring clean water to remote villages through our water wells initiative. Watch how communities transform when access to clean water becomes a reality.",
    descriptionAr: "تابع رحلتنا ونحن نوفر المياه النظيفة للقرى النائية من خلال مبادرة آبار المياه. شاهد كيف تتحول المجتمعات عندما يصبح الوصول إلى المياه النظيفة حقيقة.",
    mimeType: "video/mp4",
    size: 524288000, // 500MB
    width: 1920,
    height: 1080,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    locationEn: "Upper Egypt Villages",
    locationAr: "قرى صعيد مصر",
    isPublic: true,
    slugEn: "building-hope-water-wells-documentary",
    slugAr: "بناء-الأمل-فيلم-آبار-المياه",
    keywordsEn: ["documentary", "water wells", "community development", "rural areas"],
    keywordsAr: ["فيلم وثائقي", "آبار مياه", "تنمية مجتمعية", "مناطق ريفية"],
    tagsEn: ["Documentary", "Water"],
    tagsAr: ["وثائقي", "مياه"],
    views: 15420,
    isPublished: true,
    publishedAt: new Date("2024-04-15"),
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-04-10"),
  },
  {
    titleEn: "Youth Empowerment Workshop Highlights",
    titleAr: "أبرز لقطات ورشة تمكين الشباب",
    descriptionEn: "Experience the energy and enthusiasm of our youth empowerment workshop where young leaders learned valuable skills for personal and professional development.",
    descriptionAr: "اختبر الطاقة والحماس في ورشة تمكين الشباب حيث تعلم القادة الشباب مهارات قيمة للتطوير الشخصي والمهني.",
    mimeType: "video/mp4",
    size: 314572800, // 300MB
    width: 1920,
    height: 1080,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    locationEn: "Cairo Community Center",
    locationAr: "مركز المجتمع بالقاهرة",
    isPublic: true,
    slugEn: "youth-empowerment-workshop-highlights",
    slugAr: "أبرز-لقطات-ورشة-تمكين-الشباب",
    keywordsEn: ["youth", "empowerment", "workshop", "leadership"],
    keywordsAr: ["شباب", "تمكين", "ورشة", "قيادة"],
    tagsEn: ["Youth", "Education"],
    tagsAr: ["شباب", "تعليم"],
    views: 8930,
    isPublished: true,
    publishedAt: new Date("2024-05-22"),
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    titleEn: "Medical Mission: Serving Remote Communities",
    titleAr: "المهمة الطبية: خدمة المجتمعات النائية",
    descriptionEn: "Join our medical team as they provide essential healthcare services to underserved communities in remote areas, bringing hope and healing to those in need.",
    descriptionAr: "انضم إلى فريقنا الطبي وهو يقدم خدمات الرعاية الصحية الأساسية للمجتمعات المحرومة في المناطق النائية، جالباً الأمل والشفاء لمن يحتاجون.",
    mimeType: "video/mp4",
    size: 419430400, // 400MB
    width: 1920,
    height: 1080,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    locationEn: "Sinai Peninsula",
    locationAr: "شبه جزيرة سيناء",
    isPublic: true,
    slugEn: "medical-mission-serving-remote-communities",
    slugAr: "المهمة-الطبية-خدمة-المجتمعات-النائية",
    keywordsEn: ["medical mission", "healthcare", "remote areas", "community service"],
    keywordsAr: ["مهمة طبية", "رعاية صحية", "مناطق نائية", "خدمة مجتمعية"],
    tagsEn: ["Healthcare", "Mission"],
    tagsAr: ["رعاية صحية", "مهمة"],
    views: 12750,
    isPublished: true,
    publishedAt: new Date("2024-06-08"),
    createdAt: new Date("2024-05-28"),
    updatedAt: new Date("2024-06-05"),
  },
];

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