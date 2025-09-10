'use client';

import { mockNewsCategories } from "@/data/mockNewsCategories";
import { mockNews } from "@/data/mockNews";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use, useState } from "react";
import { ArrowLeft, Search, Grid, List, Clock, Eye, Calendar, Newspaper, TrendingUp, Filter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsCategoryDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale, slug } = use(params);
	const isEn = (locale || 'en') === 'en';
	const decoded = decodeURIComponent(slug || '');
  
  const category = mockNewsCategories.find(c => c.slugEn === decoded || c.slugAr === decoded);
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isEn ? 'Category not found' : 'الفئة غير موجودة'}</h1>
          <Button asChild>
            <Link href={`/${locale}/news/categories`}>
              {isEn ? 'Back to Categories' : 'العودة للفئات'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter news for this category
  const categoryNews = mockNews.filter(n => n.categoryId === category.id);
  const filteredNews = categoryNews.filter(news => 
    searchTerm === "" || 
    (isEn ? news.titleEn : news.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isEn ? news.contentEn : news.contentAr).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get featured article (first one)
  const featuredArticle = filteredNews[0];
  const regularArticles = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/20 dark:to-orange-950/10">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[50vh] lg:h-[60vh]">
          <Image 
            src={category.featuredImageUrl} 
            alt={isEn ? category.titleEn : category.titleAr} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 z-10">
            <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Link href={`/${locale}/news/categories`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEn ? 'Back to Categories' : 'العودة للفئات'}
              </Link>
            </Button>
          </div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
                viewport={{once:true}}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/90 backdrop-blur-sm text-white rounded-full text-sm border border-white/30 mb-6">
                  <Newspaper className="w-4 h-4" />
                  {isEn ? "Category" : "فئة"}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isEn ? category.titleEn : category.titleAr}
                </h1>
                
                <p className="text-xl text-white/90 max-w-2xl mb-6">
                  {isEn ? "Explore the latest articles in this category" : "استكشف آخر المقالات في هذه الفئة"}
                </p>

                {/* Category Stats */}
                <div className="flex flex-wrap items-center gap-6 text-white/80 text-lg">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5" />
                    <span>{categoryNews.length} {isEn ? 'articles' : 'مقال'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>{isEn ? 'Updated daily' : 'يُحدث يوميًا'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 px-6 border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
              viewport={{once:true}}
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold">{isEn ? "Featured Article" : "المقال المميز"}</h2>
              </div>
              
              <Link href={`/${locale}/news/${isEn ? featuredArticle.slugEn : featuredArticle.slugAr}`}>
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/50 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/10 border border-border hover:shadow-xl transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                      <Image
                        src={featuredArticle.featuredImageUrl}
                        alt={isEn ? featuredArticle.titleEn : featuredArticle.titleAr}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-orange-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {isEn ? "Featured" : "مميز"}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                        {isEn ? featuredArticle.titleEn : featuredArticle.titleAr}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                        {(isEn ? featuredArticle.contentEn : featuredArticle.contentAr).substring(0, 200)}...
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredArticle.readTime} {isEn ? 'min read' : 'دقيقة'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredArticle.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 2000) + 500}</span>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white w-fit">
                        {isEn ? "Read Article" : "قراءة المقال"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="py-8 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            viewport={{once:true}}
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={isEn ? "Search articles..." : "البحث في المقالات..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
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
            viewport={{once:true}}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>
                {isEn 
                  ? `Showing ${filteredNews.length} of ${categoryNews.length} articles`
                  : `عرض ${filteredNews.length} من ${categoryNews.length} مقال`
                }
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {regularArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
              viewport={{once:true}}
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No articles found" : "لم يتم العثور على مقالات"}
              </h3>
              <p className="text-muted-foreground">
                {isEn 
                  ? "Try adjusting your search terms"
                  : "جرب تعديل مصطلحات البحث"
                }
              </p>
            </motion.div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            }>
              {regularArticles.map((news, idx) => (
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
                          <div className="absolute top-4 right-4 bg-orange-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {news.readTime} {isEn ? 'min' : 'د'}
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              {isEn ? "Explore More Topics" : "استكشف المزيد من المواضيع"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Discover other news categories and stay updated with all the latest developments across our organization and community."
                : "اكتشف فئات الأخبار الأخرى وابق على اطلاع بجميع التطورات الأخيرة عبر منظمتنا ومجتمعنا."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                <Link href={`/${locale}/news/categories`}>
                  <Filter className="w-4 h-4 mr-2" />
                  {isEn ? "Browse Categories" : "تصفح الفئات"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                <Link href={`/${locale}/news`}>
                  <Globe className="w-4 h-4 mr-2" />
                  {isEn ? "All News" : "جميع الأخبار"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}