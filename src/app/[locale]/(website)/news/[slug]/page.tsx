"use client";

import { News } from "@/types/news";
import { NewsCategory } from "@/lib/db/schema/newsCategories";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Bookmark, Clock, Eye, Calendar, User, Tag, MessageCircle, TrendingUp, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const decoded = decodeURIComponent(slug || '');
  const isEn = (locale || 'en') === 'en';
  
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [newsCategories, setNewsCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        // Fetch the news article by slug
        const newsResponse = await fetch(`/api/news/${decoded}`);
        
        if (newsResponse.status === 404) {
          notFound();
          return;
        }
        
        if (!newsResponse.ok) {
          throw new Error('Failed to fetch news article');
        }
        
        const newsData = await newsResponse.json();
        
        if (!newsData.success || !newsData.item) {
          throw new Error(newsData.error || 'News article not found');
        }
        
        setNews(newsData.item);
        
        // Fetch related news and categories
        const [relatedResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/news?published=true&categoryId=${newsData.item.categoryId}&limit=4`),
          fetch('/api/news-categories?published=true')
        ]);
        
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          if (relatedData.success && relatedData.items) {
            // Filter out the current article and limit to 3
            const filtered = relatedData.items.filter((n: News) => 
              n.id !== newsData.item.id
            ).slice(0, 3);
            setRelatedNews(filtered);
          }
        }
        
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success) {
            setNewsCategories(categoriesData.items || []);
          }
        }
        
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (decoded) {
      fetchNews();
    }
  }, [decoded]);
  
  const category = news && newsCategories.find(c => c.id === news.categoryId);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/20 dark:to-orange-950/10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {isEn ? "Loading article..." : "جاري تحميل المقال..."}
          </h3>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/20 dark:to-orange-950/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-red-600">
            {isEn ? "Error loading article" : "خطأ في تحميل المقال"}
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            {isEn ? "Try Again" : "حاول مرة أخرى"}
          </Button>
        </div>
      </div>
    );
  }
  
  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/20 dark:to-orange-950/10">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[60vh] lg:h-[70vh]">
          <Image 
            src={news.featuredImageUrl} 
            alt={isEn ? news.titleEn : news.titleAr} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 z-10">
            <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Link href={`/${locale}/news`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEn ? 'Back to News' : 'العودة للأخبار'}
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Bookmark className="w-4 h-4" />
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
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/90 backdrop-blur-sm text-white rounded-full text-sm border border-white/30 mb-6">
                  <Globe className="w-4 h-4" />
                  {category ? (isEn ? category.nameEn : category.nameAr) : (isEn ? "News" : "أخبار")}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isEn ? news.titleEn : news.titleAr}
                </h1>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{news.readTime} {isEn ? 'min read' : 'دقيقة قراءة'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(news.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{news.pageViews || 0} {isEn ? 'views' : 'مشاهدة'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
            viewport={{once:true}}
          >
            {/* Article Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl leading-relaxed text-muted-foreground font-medium mb-8">
                {(isEn ? news.contentEn : news.contentAr).substring(0, 200)}...
              </p>
              <p className="leading-relaxed">
                {isEn ? news.contentEn : news.contentAr}
              </p>
            </div>

            {/* Keywords and Tags */}
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-600" />
                  {isEn ? 'Keywords' : 'الكلمات المفتاحية'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(isEn ? news.keywordsEn : news.keywordsAr).map((keyword) => (
                    <span key={keyword} className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-orange-600/10 hover:text-orange-600 transition-colors cursor-pointer">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  {isEn ? 'Tags' : 'العلامات'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(isEn ? news.tagsEn : news.tagsAr).map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-orange-600/10 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-600/20 transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Article Stats */}
            <div className="bg-gradient-to-r from-orange-50/50 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/10 rounded-3xl p-8 border border-orange-200/50 dark:border-orange-800/30 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">{news.pageViews || 0}</div>
                  <div className="text-sm text-muted-foreground">{isEn ? "Views" : "مشاهدة"}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">-</div>
                  <div className="text-sm text-muted-foreground">{isEn ? "Shares" : "مشاركة"}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-500 mb-2">-</div>
                  <div className="text-sm text-muted-foreground">{isEn ? "Comments" : "تعليق"}</div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="text-center mb-12">
              <h3 className="text-xl font-semibold mb-6">
                {isEn ? 'Share this article' : 'شارك هذا المقال'}
              </h3>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg" className="bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600">
                  <Share2 className="w-4 h-4 mr-2" />
                  {isEn ? "Share" : "مشاركة"}
                </Button>
                {/* <Button variant="outline" size="lg" className="bg-green-50 border-green-200 hover:bg-green-100 text-green-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isEn ? "Comment" : "تعليق"}
                </Button>
                <Button variant="outline" size="lg" className="bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-600">
                  <Bookmark className="w-4 h-4 mr-2" />
                  {isEn ? "Save" : "حفظ"}
                </Button> */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-16 px-6 bg-gradient-to-r from-orange-50/30 to-yellow-50/20 dark:from-orange-950/10 dark:to-yellow-950/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{once:true}}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {isEn ? "Related News" : "أخبار ذات صلة"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedNews.map((relatedItem, idx) => (
                  <motion.div
                    key={relatedItem.slugEn}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Link href={`/${locale}/news/${isEn ? relatedItem.slugEn : relatedItem.slugAr}`}>
                      <article className="group bg-background border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={relatedItem.featuredImageUrl}
                            alt={isEn ? relatedItem.titleEn : relatedItem.titleAr}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 bg-orange-600/90 text-white px-2 py-1 rounded-full text-xs">
                            {relatedItem.readTime} {isEn ? 'min' : 'د'}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {isEn ? relatedItem.titleEn : relatedItem.titleAr}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {(isEn ? relatedItem.contentEn : relatedItem.contentAr).substring(0, 100)}...
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(relatedItem.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{relatedItem.pageViews || 0}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              {isEn ? "Stay Updated" : "ابق على اطلاع"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Don't miss our latest news and updates. Subscribe to our newsletter for regular insights and stories from our community."
                : "لا تفوت آخر أخبارنا وتحديثاتنا. اشترك في نشرتنا الإخبارية للحصول على رؤى وقصص منتظمة من مجتمعنا."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                <Link href={`/${locale}/newsletter`}>
                  <Globe className="w-4 h-4 mr-2" />
                  {isEn ? "Subscribe Newsletter" : "اشترك في النشرة"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                <Link href={`/${locale}/news`}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {isEn ? "Read More News" : "اقرأ المزيد من الأخبار"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}