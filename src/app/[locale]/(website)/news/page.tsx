"use client";

import { mockNews } from "@/data/mockNews";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function NewsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-2xl font-bold text-center">
        {isEn ? 'News' : 'الأخبار'}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockNews.map((n, idx) => (
          <motion.div key={n.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <Link href={`/${locale}/news/${isEn ? n.slugEn : n.slugAr}`} className="block group rounded-xl border overflow-hidden hover:shadow">
              <div className="relative w-full h-48">
                <Image src={n.featuredImageUrl} alt={isEn ? n.titleEn : n.titleAr} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold line-clamp-2">{isEn ? n.titleEn : n.titleAr}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.readTime} {isEn ? 'min read' : 'دقيقة قراءة'}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}