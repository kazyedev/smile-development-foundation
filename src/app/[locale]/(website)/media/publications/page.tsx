"use client";

import { mockPublications } from "@/data/mockPublications";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function MediaPublicationsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-2xl font-bold text-center">
        {isEn ? 'Publications' : 'المنشورات'}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.25 }} className="text-center text-muted-foreground max-w-2xl mx-auto">
        {isEn ? 'Browse reports, guides, and documents.' : 'تصفح التقارير والأدلة والمستندات.'}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockPublications.map((pub, idx) => (
          <motion.div key={pub.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <Link href={`/${locale}/media/publications/${isEn ? pub.slugEn : pub.slugAr}`} className="block group rounded-xl border overflow-hidden hover:shadow">
              <div className="relative w-full h-40">
                {pub.featuredImageUrl ? (
                  <Image src={pub.featuredImageUrl} alt={isEn ? pub.titleEn : pub.titleAr} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-2 left-3 right-3 text-white font-semibold">{isEn ? pub.titleEn : pub.titleAr}</p>
              </div>
              <div className="p-4">
                {pub.descriptionEn && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{isEn ? pub.descriptionEn : pub.descriptionAr}</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}