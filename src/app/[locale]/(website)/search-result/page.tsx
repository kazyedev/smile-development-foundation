"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { mockNews } from "@/data/mockNews";
import { mockStories } from "@/data/mockStories";
import { mockProjects } from "@/data/mockProjects";
import { mockPhotos } from "@/data/mockPhotos";
import { mockVideos } from "@/data/mockVideos";
import { mockPublications } from "@/data/mockPublications";
import { mockReports } from "@/data/mockReports";
import { mockActivities } from "@/data/mockActivities";
import { 
  Search, Filter, Grid, List, Calendar, Eye, Clock, Tag,
  Newspaper, BookOpen, Target, Camera, Film, FileText,
  Activity as ActivityIcon, Sparkles, TrendingUp, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";



type IndexedItem = {
  type: string;
  title: string;
  href: string;
  image?: string;
  score: number;
};

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

const scoreMatch = (queryTokens: string[], text: string) => {
  const tokens = tokenize(text);
  let score = 0;
  for (const qt of queryTokens) {
    for (const t of tokens) {
      if (t === qt) score += 4; // exact token match
      else if (t.startsWith(qt)) score += 2; // prefix
      else if (t.includes(qt)) score += 1; // substring
    }
  }
  return score;
};

export default function SearchResultPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim();
  const [activeTypes, setActiveTypes] = useState<string[]>(["news","story","project","activity","image","video","publication","report"]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Reset types on query change to broaden results
    setActiveTypes(["news","story","project","activity","image","video","publication","report"]);
  }, [q]);

  const results = useMemo(() => {
    if (!q) return [] as IndexedItem[];
    const qt = tokenize(q);
    const items: IndexedItem[] = [];

    const push = (type: string, title: string, href: string, image?: string, textBlob?: string) => {
      const base = title + " " + (textBlob || "");
      const s = scoreMatch(qt, base);
      if (s > 0) items.push({ type, title, href, image, score: s });
    };

    // News
    for (const n of mockNews) {
      const title = isEn ? n.titleEn : n.titleAr;
      const content = isEn ? n.contentEn : n.contentAr;
      push("news", title, `/${locale}/news/${isEn ? n.slugEn : n.slugAr}`,(n.featuredImageUrl), content + " " + (isEn ? n.keywordsEn.join(" ") : n.keywordsAr.join(" ")));
    }
    // Stories
    for (const s of mockStories) {
      const title = isEn ? s.titleEn : s.titleAr;
      const content = isEn ? s.contentEn : s.contentAr;
      push("story", title, `/${locale}/media/success-stories/${isEn ? s.slugEn : s.slugAr}`,(s.featuredImageUrl), content + " " + (isEn ? s.keywordsEn.join(" ") : s.keywordsAr.join(" ")));
    }
    // Projects
    for (const p of mockProjects) {
      const title = isEn ? p.titleEn : p.titleAr;
      push("project", title, `/${locale}/projects/${isEn ? p.slugEn : p.slugAr}`,(p.featuredImageUrl), (isEn ? p.descriptionEn : p.descriptionAr) + " " + (isEn ? p.keywordsEn.join(" ") : p.keywordsAr.join(" ")));
    }
    // Activities
    for (const a of mockActivities) {
      const title = isEn ? a.titleEn : a.titleAr;
      const content = isEn ? a.contentEn : a.contentAr;
      push("activity", title, `/${locale}/activities/${isEn ? a.slugEn : a.slugAr}`,(a.featuredImageUrl), content + " " + (isEn ? a.keywordsEn.join(" ") : a.keywordsAr.join(" ")));
    }
    // Images
    for (const i of mockPhotos) {
      const title = isEn ? i.titleEn : i.titleAr;
      push("image", title, `/${locale}/media/images/${isEn ? i.slugEn : i.slugAr}`,(i.url), (isEn ? (i.descriptionEn || "") : (i.descriptionAr || "")) + " " + (isEn ? i.keywordsEn.join(" ") : i.keywordsAr.join(" ")));
    }
    // Videos
    for (const v of mockVideos) {
      const title = isEn ? v.titleEn : v.titleAr;
      push("video", title, `/${locale}/media/videos/${isEn ? v.slugEn : v.slugAr}`,(undefined), (isEn ? v.descriptionEn : v.descriptionAr) + " " + (isEn ? v.keywordsEn.join(" ") : v.keywordsAr.join(" ")));
    }
    // Publications
    for (const p of mockPublications) {
      const title = isEn ? p.titleEn : p.titleAr;
      push("publication", title, `/${locale}/media/publications/${isEn ? p.slugEn : p.slugAr}`,(p.featuredImageUrl), (isEn ? (p.descriptionEn || "") : (p.descriptionAr || "")) + " " + (isEn ? p.keywordsEn.join(" ") : p.keywordsAr.join(" ")));
    }
    // Reports
    for (const r of mockReports) {
      const title = isEn ? r.titleEn : r.titleAr;
      push("report", title, `/${locale}/media/reports/${isEn ? r.slugEn : r.slugAr}`,(r.featuredImageUrl), (isEn ? (r.descriptionEn || "") : (r.descriptionAr || "")) + " " + (isEn ? r.keywordsEn.join(" ") : r.keywordsAr.join(" ")));
    }

    return items
      .filter(it => activeTypes.includes(it.type))
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
  }, [q, locale, isEn, activeTypes]);

  // Get type statistics
  const typeStats = useMemo(() => {
    const stats: Record<string, number> = {};
    results.forEach(r => {
      stats[r.type] = (stats[r.type] || 0) + 1;
    });
    return stats;
  }, [results]);

  // Get type icon
  const getTypeIcon = (type: string) => {
    const iconMap = {
      news: Newspaper,
      story: BookOpen, 
      project: Target,
      activity: ActivityIcon,
      image: Camera,
      video: Film,
      publication: FileText,
      report: FileText
    };
    return iconMap[type as keyof typeof iconMap] || FileText;
  };

  // Get type color
  const getTypeColor = (type: string) => {
    const colorMap = {
      news: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      story: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      project: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      activity: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      image: 'text-pink-600 bg-pink-100 dark:bg-pink-900/20',
      video: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      publication: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20',
      report: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20'
    };
    return colorMap[type as keyof typeof colorMap] || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-primary)]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `conic-gradient(from 0deg at 50% 50%, var(--brand-primary), transparent, var(--brand-secondary), transparent, var(--brand-primary))`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/5 w-96 h-96 bg-[var(--brand-primary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--brand-secondary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 rounded-full px-6 py-2 mb-6">
                <Search className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="text-sm font-semibold text-[var(--brand-primary)]">
                  {isEn ? 'Foundation Search' : 'البحث في المؤسسة'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-[var(--foreground)]">
                  {isEn ? 'Search' : 'نتائج'}
                </span>{' '}
                <span className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-primary)] bg-clip-text text-transparent">
                  {isEn ? 'Results' : 'البحث'}
                </span>
              </h1>

              {q && (
                <div className="flex items-center justify-center gap-2 text-xl text-[var(--muted-foreground)] mb-8">
                  <span>{isEn ? 'Searching for:' : 'البحث عن:'}</span>
                  <span className="font-semibold text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full">
                    "{q}"
                  </span>
                </div>
              )}

              {/* Statistics */}
              {q && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl mb-4">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{results.length}</div>
                    <div className="text-[var(--muted-foreground)]">{isEn ? 'Results Found' : 'نتيجة'}</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl mb-4">
                      <Filter className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{Object.keys(typeStats).length}</div>
                    <div className="text-[var(--muted-foreground)]">{isEn ? 'Content Types' : 'أنواع المحتوى'}</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{Math.max(...results.map(r => r.score))}</div>
                    <div className="text-[var(--muted-foreground)]">{isEn ? 'Best Match Score' : 'أفضل تطابق'}</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Search Interface */}
        {!q ? (
          <section className="pb-20 px-8">
            <div className="container mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <Sparkles className="w-20 h-20 text-[var(--muted-foreground)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  {isEn ? 'Start Your Search' : 'ابدأ البحث'}
                </h3>
                <p className="text-[var(--muted-foreground)] mb-8">
                  {isEn 
                    ? 'Use the search bar in the header to find projects, news, media, activities, and more across our foundation.'
                    : 'استخدم شريط البحث في الرأس للعثور على المشاريع والأخبار والوسائط والأنشطة والمزيد في مؤسستنا.'
                  }
                </p>
                
                {/* Quick Search Suggestions */}
                <div className="text-left">
                  <h4 className="font-semibold text-[var(--foreground)] mb-4">
                    {isEn ? 'Popular Searches:' : 'البحث الشائع:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { en: 'Education Projects', ar: 'مشاريع التعليم' },
                      { en: 'Health Initiatives', ar: 'مبادرات الصحة' },
                      { en: 'Environmental Activities', ar: 'الأنشطة البيئية' },
                      { en: 'Women Empowerment', ar: 'تمكين المرأة' },
                      { en: 'Youth Programs', ar: 'برامج الشباب' },
                      { en: 'Annual Reports', ar: 'التقارير السنوية' }
                    ].map((suggestion, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="px-3 py-2 bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-full text-sm text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/30 transition-colors cursor-pointer"
                      >
                        {isEn ? suggestion.en : suggestion.ar}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ) : results.length === 0 ? (
          <section className="pb-20 px-8">
            <div className="container mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <Search className="w-20 h-20 text-[var(--muted-foreground)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  {isEn ? 'No Results Found' : 'لم يتم العثور على نتائج'}
                </h3>
                <p className="text-[var(--muted-foreground)] mb-8">
                  {isEn 
                    ? `Sorry, we couldn't find anything matching "${q}". Try different keywords or check your spelling.`
                    : `عذرًا، لم نتمكن من العثور على أي شيء يطابق "${q}". جرب كلمات مفتاحية مختلفة أو تحقق من الإملاء.`
                  }
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-[var(--foreground)]">
                    {isEn ? 'Search Tips:' : 'نصائح البحث:'}
                  </h4>
                  <ul className="text-left text-[var(--muted-foreground)] space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                      {isEn ? 'Try using more general terms' : 'جرب استخدام مصطلحات أعم'}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                      {isEn ? 'Check for spelling mistakes' : 'تحقق من الأخطاء الإملائية'}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full"></div>
                      {isEn ? 'Use synonyms or related terms' : 'استخدم المرادفات أو المصطلحات ذات الصلة'}
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        ) : (
          <section className="pb-20 px-8">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Enhanced Sidebar */}
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-1"
                >
                  <Card className="bg-[var(--card)]/80 backdrop-blur-sm border-[var(--border)]/50 shadow-xl sticky top-8">
                    <div className="p-6">
                      {/* View Mode Toggle */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-[var(--foreground)]">
                          {isEn ? 'View Options' : 'خيارات العرض'}
                        </h3>
                        <div className="flex items-center gap-2 bg-[var(--background)]/50 border border-[var(--border)] rounded-xl p-1">
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${
                              viewMode === 'grid'
                                ? 'bg-[var(--brand-primary)] text-white'
                                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                            }`}
                          >
                            <Grid className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${
                              viewMode === 'list'
                                ? 'bg-[var(--brand-primary)] text-white'
                                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                            }`}
                          >
                            <List className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content Type Filters */}
                      <div>
                        <h4 className="font-semibold text-[var(--foreground)] mb-4">
                          {isEn ? 'Content Types' : 'أنواع المحتوى'}
                        </h4>
                        <div className="space-y-3">
                          {[
                            { key: 'news', labelEn: 'News', labelAr: 'الأخبار' },
                            { key: 'story', labelEn: 'Success Stories', labelAr: 'قصص النجاح' },
                            { key: 'project', labelEn: 'Projects', labelAr: 'المشاريع' },
                            { key: 'activity', labelEn: 'Activities', labelAr: 'الأنشطة' },
                            { key: 'image', labelEn: 'Images', labelAr: 'الصور' },
                            { key: 'video', labelEn: 'Videos', labelAr: 'الفيديوهات' },
                            { key: 'publication', labelEn: 'Publications', labelAr: 'النشرات' },
                            { key: 'report', labelEn: 'Reports', labelAr: 'التقارير' },
                          ].map(({ key, labelEn, labelAr }) => {
                            const Icon = getTypeIcon(key);
                            const count = typeStats[key] || 0;
                            return (
                              <motion.label
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)]/30 hover:border-[var(--brand-primary)]/30 cursor-pointer transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={activeTypes.includes(key)}
                                    onChange={(e) => {
                                      setActiveTypes(prev => e.target.checked ? Array.from(new Set([...prev, key])) : prev.filter(t => t !== key));
                                    }}
                                    className="rounded border-[var(--border)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                                  />
                                  <Icon className="w-4 h-4 text-[var(--brand-primary)]" />
                                  <span className="text-sm group-hover:text-[var(--brand-primary)] transition-colors">
                                    {isEn ? labelEn : labelAr}
                                  </span>
                                </div>
                                {count > 0 && (
                                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(key)}`}>
                                    {count}
                                  </span>
                                )}
                              </motion.label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.aside>

                {/* Enhanced Results */}
                <motion.main
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-3"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={viewMode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={viewMode === 'grid' 
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                      }
                    >
                      {results.map((result, index) => {
                        const Icon = getTypeIcon(result.type);
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                          >
                            <Link href={result.href}>
                              <Card className="group hover:shadow-2xl transition-all duration-300 border-[var(--border)]/50 overflow-hidden bg-[var(--card)]/80 backdrop-blur-sm h-full">
                                {result.image && viewMode === 'grid' && (
                                  <div className="relative overflow-hidden">
                                    <Image
                                      src={result.image}
                                      alt={result.title}
                                      width={400}
                                      height={200}
                                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                                        <Icon className="w-3 h-3 inline mr-1" />
                                        {result.type}
                                      </span>
                                    </div>
                                  </div>
                                )}
                                
                                <div className={viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center gap-4'}>
                                  {result.image && viewMode === 'list' && (
                                    <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded-xl">
                                      <Image
                                        src={result.image}
                                        alt={result.title}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                    </div>
                                  )}
                                  
                                  <div className="flex-1">
                                    {viewMode === 'grid' && !result.image && (
                                      <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                                          <Icon className="w-3 h-3 inline mr-1" />
                                          {result.type}
                                        </span>
                                      </div>
                                    )}
                                    
                                    {viewMode === 'list' && (
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                                          <Icon className="w-3 h-3 inline mr-1" />
                                          {result.type}
                                        </span>
                                        <span className="text-xs text-[var(--muted-foreground)]">
                                          {isEn ? 'Match score:' : 'درجة التطابق:'} {result.score}
                                        </span>
                                      </div>
                                    )}
                                    
                                    <h3 className={`font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors ${
                                      viewMode === 'grid' ? 'text-lg mb-2 line-clamp-2' : 'text-base mb-1 line-clamp-1'
                                    }`}>
                                      {result.title}
                                    </h3>
                                    
                                    {viewMode === 'grid' && (
                                      <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                                        <span className="flex items-center gap-1">
                                          <TrendingUp className="w-3 h-3" />
                                          {isEn ? 'Score:' : 'النقاط:'} {result.score}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.main>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

