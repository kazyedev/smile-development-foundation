"use client";

import { mockNewsCategories } from "@/data/mockNewsCategories";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function NewsCategoriesPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-2xl font-bold text-center">
        {isEn ? 'News Categories' : 'فئات الأخبار'}
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockNewsCategories.map((cat, idx) => (
          <motion.div key={cat.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <Link href={`/${locale}/news/categories/${isEn ? cat.slugEn : cat.slugAr}`} className="block group rounded-xl border overflow-hidden hover:shadow">
              <div className="relative w-full h-40">
                <Image src={cat.featuredImageUrl} alt={isEn ? cat.titleEn : cat.titleAr} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-2 left-3 right-3 text-white font-semibold">{isEn ? cat.titleEn : cat.titleAr}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}