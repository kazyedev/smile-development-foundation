"use client";

import { NewsCategory } from "@/lib/db/schema/newsCategories";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FolderOpen, Newspaper, ArrowRight, Hash, TrendingUp, Calendar, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsCategoriesPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';
  
  const [newsCategories, setNewsCategories] = useState<NewsCategory[]>([]);
  const [newsCounts, setNewsCounts] = useState<Record<number, number>>({});
  const [totalNews, setTotalNews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories and total news count in parallel
        const [categoriesResponse, newsResponse] = await Promise.all([
          fetch('/api/news-categories?published=true&orderBy=nameEn&order=asc'),
          fetch('/api/news?published=true&limit=1')
        ]);
        
        if (!categoriesResponse.ok || !newsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const categoriesData = await categoriesResponse.json();
        const newsData = await newsResponse.json();
        
        if (!categoriesData.success) {
          throw new Error(categoriesData.error || 'Failed to fetch categories');
        }
        
        if (!newsData.success) {
          throw new Error(newsData.error || 'Failed to fetch news');
        }
        
        setNewsCategories(categoriesData.items || []);
        setTotalNews(newsData.total || 0);
        
        // Fetch news count for each category
        const counts: Record<number, number> = {};
        for (const category of categoriesData.items || []) {
          try {
            const categoryNewsResponse = await fetch(`/api/news?published=true&categoryId=${category.id}&limit=1`);
            if (categoryNewsResponse.ok) {
              const categoryNewsData = await categoryNewsResponse.json();
              if (categoryNewsData.success) {
                counts[category.id] = categoryNewsData.total || 0;
              }
            }
          } catch (err) {
            console.warn(`Failed to fetch count for category ${category.id}:`, err);
            counts[category.id] = 0;
          }
        }
        setNewsCounts(counts);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Get article count for each category
  const getCategoryCount = (categoryId: number) => {
    return newsCounts[categoryId] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/20 dark:to-orange-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-red-50/20 dark:from-orange-950/20 dark:via-yellow-950/10 dark:to-red-950/5">
        {/* Category Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-20 w-16 h-16 border-2 border-orange-400 rounded-full"></div>
          <div className="absolute top-1/3 right-24 w-20 h-12 bg-yellow-400/30 rounded-lg rotate-12"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-20 border-2 border-red-400 rounded-lg -rotate-6"></div>
          <div className="absolute top-1/4 left-1/2 w-14 h-14 bg-orange-300/40 rounded-lg rotate-45"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-6">
              <FolderOpen className="w-4 h-4" />
              {isEn ? "News Categories" : "فئات الأخبار"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Explore by Topic" : "استكشف حسب الموضوع"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Navigate through our organized news categories to find the stories that matter most to you. From community updates to global initiatives, discover content tailored to your interests."
                : "تصفح فئات الأخبار المنظمة الخاصة بنا للعثور على القصص التي تهمك أكثر. من تحديثات المجتمع إلى المبادرات العالمية، اكتشف المحتوى المصمم خصيصًا لاهتماماتك."
              }
            </p>

            {/* Categories Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">{loading ? '...' : newsCategories.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Categories" : "فئة"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{loading ? '...' : totalNews}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Total Articles" : "إجمالي المقالات"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Updates" : "تحديثات"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "Loading categories..." : "جارٍ تحميل الفئات..."}
              </h3>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">
                {isEn ? "Error loading categories" : "خطأ في تحميل الفئات"}
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                {isEn ? "Try Again" : "حاول مرة أخرى"}
              </Button>
            </div>
          ) : newsCategories.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No categories found" : "لا توجد فئات"}
              </h3>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link href={`/${locale}/news/categories/${isEn ? category.slugEn : category.slugAr}`}>
                  <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/50 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/10 border border-border hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      
                      {/* Article Count Badge */}
                      <div className="absolute top-4 right-4 bg-orange-600/90 text-white px-3 py-2 rounded-full text-sm font-medium">
                        {getCategoryCount(category.id)} {isEn ? 'articles' : 'مقال'}
                      </div>
                      
                      {/* Category Icon */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Newspaper className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Category Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {isEn ? category.nameEn : category.nameAr}
                        </h3>
                        <p className="text-white/90 text-sm line-clamp-2 mb-4">
                          {category.descriptionEn || category.descriptionAr ? 
                            (isEn ? category.descriptionEn : category.descriptionAr) :
                            (isEn ? "Explore the latest articles in this category" : "استكشف آخر المقالات في هذه الفئة")
                          }
                        </p>
                        
                        {/* View Category Button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-white/80 text-xs">
                            <div className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              <span>{isEn ? 'Category' : 'فئة'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>{isEn ? 'Popular' : 'شائع'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-sm font-medium">{isEn ? 'View' : 'عرض'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Featured Category Highlight */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-50/30 to-yellow-50/20 dark:from-orange-950/10 dark:to-yellow-950/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-background to-orange-50/50 dark:to-orange-950/20 rounded-3xl p-8 lg:p-12 border border-orange-200/50 dark:border-orange-800/30">
              <div className="flex items-center justify-center gap-2 mb-6">
                <FolderOpen className="w-6 h-6 text-orange-600" />
                <TrendingUp className="w-6 h-6 text-yellow-500" />
                <Newspaper className="w-6 h-6 text-red-500" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Stay Organized, Stay Informed" : "ابق منظمًا، ابق مطلعًا"}
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {isEn 
                  ? "Browse through our carefully curated news categories to find exactly what you're looking for. Each category is updated regularly with fresh, relevant content."
                  : "تصفح فئات الأخبار المنسقة بعناية للعثور على ما تبحث عنه بالضبط. يتم تحديث كل فئة بانتظام بمحتوى جديد وذي صلة."
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                  <Link href={`/${locale}/news`}>
                    <Newspaper className="w-4 h-4 mr-2" />
                    {isEn ? "View All News" : "عرض جميع الأخبار"}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                  <Link href={`/${locale}/newsletter`}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {isEn ? "Subscribe Newsletter" : "اشترك في النشرة"}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Most Popular Categories" : "الفئات الأكثر شعبية"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Discover the categories that our readers engage with most"
                : "اكتشف الفئات التي يتفاعل معها قراؤنا أكثر"
              }
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsCategories.slice(0, 3).map((category, idx) => (
              <motion.div
                key={`popular-${category.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Link href={`/${locale}/news/categories/${isEn ? category.slugEn : category.slugAr}`}>
                  <div className="group bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-orange-600/10 rounded-full flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                        <Newspaper className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-orange-600 transition-colors">
                          {isEn ? category.nameEn : category.nameAr}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getCategoryCount(category.id)} {isEn ? 'articles' : 'مقال'}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}