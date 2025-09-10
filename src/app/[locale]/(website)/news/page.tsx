"use client";

import { mockNews } from "@/data/mockNews";
import { mockNewsCategories } from "@/data/mockNewsCategories";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Newspaper, Search, Filter, Grid, List, Clock, Eye, Calendar, TrendingUp, Zap, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter news based on search and category
  const filteredNews = mockNews.filter(news => {
    const matchesSearch = searchTerm === "" || 
      (isEn ? news.titleEn : news.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isEn ? news.contentEn : news.contentAr).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      news.categoryId === parseInt(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Get featured news (first 3)
  const featuredNews = filteredNews.slice(0, 3);
  const regularNews = filteredNews.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/20 dark:to-orange-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-red-50/20 dark:from-orange-950/20 dark:via-yellow-950/10 dark:to-red-950/5">
        {/* News Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-20 w-20 h-16 border-2 border-orange-400 rounded-lg rotate-12"></div>
          <div className="absolute top-1/3 right-24 w-16 h-12 bg-yellow-400/30 rounded-lg -rotate-6"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-16 border-2 border-red-400 rounded-lg rotate-45"></div>
          <div className="absolute top-1/4 left-1/2 w-8 h-10 bg-orange-300/40 rounded-lg -rotate-12"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4" />
              {isEn ? "Breaking News" : "أخبار عاجلة"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Latest News" : "آخر الأخبار"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Stay informed with the latest updates, developments, and stories from our organization and the communities we serve. Real-time coverage of our impact and initiatives."
                : "ابق على اطلاع بآخر التحديثات والتطورات والقصص من منظمتنا والمجتمعات التي نخدمها. تغطية فورية لتأثيرنا ومبادراتنا."
              }
            </p>

            {/* News Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">{mockNews.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Articles" : "مقال"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Coverage" : "تغطية"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Readers" : "قارئ"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <section className="py-12 px-6 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold">{isEn ? "Featured Stories" : "القصص المميزة"}</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Featured Article */}
                <div className="lg:col-span-2">
                  <Link href={`/${locale}/news/${isEn ? featuredNews[0].slugEn : featuredNews[0].slugAr}`}>
                    <div className="group relative overflow-hidden rounded-3xl">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={featuredNews[0].featuredImageUrl}
                          alt={isEn ? featuredNews[0].titleEn : featuredNews[0].titleAr}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {isEn ? "Featured" : "مميز"}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                            {isEn ? featuredNews[0].titleEn : featuredNews[0].titleAr}
                          </h3>
                          <p className="text-white/90 line-clamp-2 mb-3">
                            {(isEn ? featuredNews[0].contentEn : featuredNews[0].contentAr).substring(0, 150)}...
                          </p>
                          <div className="flex items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{featuredNews[0].readTime} {isEn ? 'min read' : 'دقيقة'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(featuredNews[0].publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                
                {/* Secondary Featured Articles */}
                <div className="space-y-6">
                  {featuredNews.slice(1, 3).map((news, idx) => (
                    <Link key={news.slugEn} href={`/${locale}/news/${isEn ? news.slugEn : news.slugAr}`}>
                      <div className="group bg-gradient-to-r from-background to-orange-50/30 dark:to-orange-950/10 border border-border rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={news.featuredImageUrl}
                              alt={isEn ? news.titleEn : news.titleAr}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                              {isEn ? news.titleEn : news.titleAr}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{news.readTime} {isEn ? 'min' : 'د'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{Math.floor(Math.random() * 1000) + 100}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="py-8 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={isEn ? "Search news..." : "البحث في الأخبار..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
              >
                <option value="all">{isEn ? "All Categories" : "جميع الفئات"}</option>
                {mockNewsCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {isEn ? category.titleEn : category.titleAr}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-10"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-10"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex items-center justify-between text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>
                {isEn 
                  ? `Showing ${filteredNews.length} of ${mockNews.length} articles`
                  : `عرض ${filteredNews.length} من ${mockNews.length} مقال`
                }
              </span>
            </div>
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2">
                <span>{isEn ? "Category:" : "الفئة:"}</span>
                <span className="px-2 py-1 bg-orange-600/10 text-orange-600 rounded-full text-xs">
                  {mockNewsCategories.find(c => c.id === parseInt(selectedCategory))
                    ? isEn 
                      ? mockNewsCategories.find(c => c.id === parseInt(selectedCategory))!.titleEn
                      : mockNewsCategories.find(c => c.id === parseInt(selectedCategory))!.titleAr
                    : selectedCategory
                  }
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {regularNews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No articles found" : "لم يتم العثور على مقالات"}
              </h3>
              <p className="text-muted-foreground">
                {isEn 
                  ? "Try adjusting your search terms or filters"
                  : "جرب تعديل مصطلحات البحث أو المرشحات"
                }
              </p>
            </motion.div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            }>
              {regularNews.map((news, idx) => (
                <motion.div
                  key={news.slugEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={viewMode === "list" ? "w-full" : ""}
                  viewport={{once:true}}
                >
                  {viewMode === "grid" ? (
                    <Link href={`/${locale}/news/${isEn ? news.slugEn : news.slugAr}`}>
                      <article className="group bg-gradient-to-br from-orange-50/50 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/10 border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image 
                            src={news.featuredImageUrl} 
                            alt={isEn ? news.titleEn : news.titleAr} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Read Time Badge */}
                          <div className="absolute top-4 right-4 bg-orange-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {news.readTime} {isEn ? 'min' : 'د'}
                          </div>
                          
                          {/* Category Badge */}
                          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                              {mockNewsCategories.find(c => c.id === news.categoryId)
                                ? isEn 
                                  ? mockNewsCategories.find(c => c.id === news.categoryId)!.titleEn
                                  : mockNewsCategories.find(c => c.id === news.categoryId)!.titleAr
                                : 'News'
                              }
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {isEn ? news.titleEn : news.titleAr}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                            {(isEn ? news.contentEn : news.contentAr).substring(0, 120)}...
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(news.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{Math.floor(Math.random() * 1000) + 100}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ) : (
                    <article className="bg-gradient-to-r from-background to-orange-50/30 dark:to-orange-950/10 border border-border rounded-3xl p-6 hover:shadow-xl transition-all duration-500">
                      <Link href={`/${locale}/news/${isEn ? news.slugEn : news.slugAr}`}>
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-1/3">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                              <Image
                                src={news.featuredImageUrl}
                                alt={isEn ? news.titleEn : news.titleAr}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3 bg-orange-600/90 text-white px-2 py-1 rounded-full text-xs">
                                {news.readTime} {isEn ? 'min' : 'د'}
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-2/3 space-y-4">
                            <div>
                              <h3 className="text-xl font-bold mb-2 text-foreground hover:text-orange-600 transition-colors">
                                {isEn ? news.titleEn : news.titleAr}
                              </h3>
                              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                {(isEn ? news.contentEn : news.contentAr).substring(0, 200)}...
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(isEn ? news.tagsEn : news.tagsAr).slice(0, 3).map(tag => (
                                <span key={tag} className="px-3 py-1 bg-orange-600/10 text-orange-600 rounded-full text-xs font-medium">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(news.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{Math.floor(Math.random() * 1000) + 100} {isEn ? 'views' : 'مشاهدة'}</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50">
                                {isEn ? "Read Article" : "قراءة المقال"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
          viewport={{once:true}}
        >
          <div className="bg-gradient-to-r from-orange-50/50 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/10 rounded-3xl p-8 lg:p-12 border border-orange-200/50 dark:border-orange-800/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Newspaper className="w-6 h-6 text-orange-600" />
              <Globe className="w-6 h-6 text-yellow-500" />
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              {isEn ? "Stay Informed, Stay Connected" : "ابق على اطلاع، ابق متصلاً"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Never miss an update from our community. Subscribe to our newsletter for the latest news, insights, and stories delivered directly to your inbox."
                : "لا تفوت أي تحديث من مجتمعنا. اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والرؤى والقصص مباشرة في صندوق الوارد الخاص بك."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                <Link href={`/${locale}/newsletter`}>
                  <Newspaper className="w-4 h-4 mr-2" />
                  {isEn ? "Subscribe Newsletter" : "اشترك في النشرة"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                <Link href={`/${locale}/news/categories`}>
                  <Filter className="w-4 h-4 mr-2" />
                  {isEn ? "Browse Categories" : "تصفح الفئات"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}