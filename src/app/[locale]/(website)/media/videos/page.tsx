"use client";

import { mockVideos } from "@/data/mockVideos";
import VideoCard from "@/components/website/VideoCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function MediaVideosPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEnglish = locale === "en";

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-2xl font-bold text-center"
      >
        {isEnglish ? "All Videos" : "جميع الفيديوهات"}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="text-center text-muted-foreground max-w-2xl mx-auto"
      >
        {isEnglish
          ? "Browse our full video library across projects and initiatives."
          : "تصفح مكتبة الفيديو الكاملة الخاصة بنا عبر المشاريع والمبادرات."}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockVideos.map((video, idx) => (
          <motion.div
            key={video.slugEn}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.25 }}
          >
            <VideoCard video={video} locale={locale} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}