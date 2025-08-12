"use client";

import { motion } from "framer-motion";
import { MapPin, Tags } from "lucide-react";
import Link from "next/link";
import VideoCard from "@/components/website/VideoCard";
import { Video } from "@/types/video";

type Props = {
  video: Video;
  moreVideos: Video[];
  locale: string;
};

export default function VideoDetailClient({ video, moreVideos, locale }: Props) {
  const isEnglish = locale === "en";
  const youTubeId = video.url.split('=')[1];

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-2xl font-bold"
      >
        {isEnglish ? video.titleEn : video.titleAr}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full aspect-video rounded-xl overflow-hidden bg-black border shadow-sm"
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youTubeId}`}
          title={isEnglish ? video.titleEn : video.titleAr}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.25 }}
        className="text-muted-foreground"
      >
        {isEnglish ? video.descriptionEn : video.descriptionAr}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="flex flex-wrap items-center gap-3 text-sm"
      >
        {(video.locationEn || video.locationAr) && (
          <span className="inline-flex items-center gap-2 bg-muted-foreground/10 px-3 py-1.5 rounded-md text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {isEnglish ? video.locationEn : video.locationAr}
          </span>
        )}
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Tags className="w-4 h-4" />
          {(isEnglish ? video.keywordsEn : video.keywordsAr).slice(0, 6).map((kw) => (
            <span key={kw} className="bg-muted-foreground/10 px-2 py-1 rounded-md">{kw}</span>
          ))}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="text-xl font-semibold mt-4"
      >
        {isEnglish ? "More Videos" : "فيديوهات أخرى"}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {moreVideos.map((v, idx) => (
          <motion.div
            key={v.slugEn}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.25 }}
          >
            <VideoCard video={v} locale={locale} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


