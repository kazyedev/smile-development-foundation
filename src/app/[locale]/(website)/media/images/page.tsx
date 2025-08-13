"use client";

import { mockPhotos } from "@/data/mockPhotos";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function MediaImagesPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-2xl font-bold text-center">
        {isEn ? 'Photo Gallery' : 'معرض الصور'}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.25 }} className="text-center text-muted-foreground max-w-2xl mx-auto">
        {isEn ? 'Browse photos from our projects and programs.' : 'تصفح الصور من مشاريعنا وبرامجنا.'}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockPhotos.map((photo, idx) => (
          <motion.div key={photo.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <Link href={`/${locale}/media/images/${isEn ? photo.slugEn : photo.slugAr}`} className="block group rounded-xl border overflow-hidden hover:shadow">
              <div className="relative w-full h-48 bg-black">
                <Image src={photo.url} alt={photo.alt || (isEn ? photo.titleEn : photo.titleAr)} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="font-semibold line-clamp-1">{isEn ? photo.titleEn : photo.titleAr}</p>
                {photo.descriptionEn && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{isEn ? photo.descriptionEn : photo.descriptionAr}</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}