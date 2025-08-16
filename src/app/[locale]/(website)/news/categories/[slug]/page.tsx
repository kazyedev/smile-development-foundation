'use client';

import { mockNewsCategories } from "@/data/mockNewsCategories";
import { mockNews } from "@/data/mockNews";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";

export default function NewsCategoryDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = use(params);
	const isEn = (locale || 'en') === 'en';
	const decoded = decodeURIComponent(slug || '');
  const cat = mockNewsCategories.find(c => c.slugEn === decoded || c.slugAr === decoded);
  if (!cat) {
    return <div className="px-4 py-10"><p className="text-center text-muted-foreground">{isEn ? 'Category not found.' : 'الفئة غير موجودة.'}</p></div>;
  }
  const news = mockNews.filter(n => n.categoryId === cat.id);

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image src={cat.featuredImageUrl} alt={isEn ? cat.titleEn : cat.titleAr} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h1 className="absolute bottom-3 left-4 right-4 text-2xl md:text-3xl font-bold text-white">{isEn ? cat.titleEn : cat.titleAr}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
        {news.map((n, idx) => (
          <motion.div key={n.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <Link href={`/${locale}/news/${isEn ? n.slugEn : n.slugAr}`} className="block group rounded-xl border overflow-hidden hover:shadow">
              <div className="relative w-full h-44">
                <Image src={n.featuredImageUrl} alt={isEn ? n.titleEn : n.titleAr} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold line-clamp-2">{isEn ? n.titleEn : n.titleAr}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}