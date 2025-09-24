"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper, Clock, Eye, Calendar, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useHomepageData, type HomepageNews } from "@/hooks/useHomepageData";
import { NewsSkeletonSection } from "../skeletons/HomepageSectionSkeleton";


export default function NewsSection({ locale }: { locale: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isEnglish = locale === "en";
  const { data, loading, error } = useHomepageData(locale);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Debug logging
  console.log('NewsSection Debug:', { loading, error, data: data?.news, dataLength: data?.news?.length });

  // Ensure hooks order is stable: do early returns AFTER all hooks
  if (loading) {
    return <NewsSkeletonSection />;
  }
  
  if (error || !data?.news || data.news.length === 0) {
    console.log('NewsSection early return:', { error, hasData: !!data, hasNews: !!data?.news, newsLength: data?.news?.length });
    return null; // Don't render section if no data
  }

  // Set animation flag when component comes into view
  if (isInView && !hasAnimated) {
    setHasAnimated(true);
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isEnglish ? 'en-US' : 'ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: !isEnglish 
    });
  };

  const formatDate = (dateInput: Date | string) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'ar-EG', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatNewsDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return isEnglish ? 'Yesterday' : 'أمس';
    } else if (diffDays <= 7) {
      return isEnglish ? `${diffDays} days ago` : `منذ ${diffDays} أيام`;
    } else {
      return date.toLocaleDateString(isEnglish ? 'en-US' : 'ar-EG', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const featuredNews = data.news[0];
  const sideNews = data.news.slice(1);



  return (
    <>

    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-background to-muted/20 dark:to-muted/10">
      {/* Newspaper Pattern Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative">


        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 text-brand-primary rounded-full text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            {isEnglish ? "Press Room" : "غرفة الصحافة"}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground via-brand-primary to-foreground bg-clip-text text-transparent">
              {isEnglish ? "Latest News" : "آخر الأخبار"}
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(currentTime)}
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {isEnglish ? "Live Updates" : "تحديثات مباشرة"}
            </div>
          </div>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {isEnglish 
              ? "Stay updated with our latest initiatives, success stories, and community impact news that showcase the ongoing work of our foundation."
              : "ابق على اطلاع بأحدث مبادراتنا وقصص النجاح وأخبار التأثير المجتمعي التي تُظهر العمل المستمر لمؤسستنا."
            }
          </p>
        </motion.div>

        {/* Main News Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="group relative overflow-hidden rounded-2xl bg-background shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={featuredNews.featuredImageUrl}
                    alt={isEnglish ? featuredNews.titleEn : featuredNews.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {isEnglish ? "Featured" : "مميز"}
                  </div>
                  
                  {/* Article Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-4 text-sm mb-3 opacity-90">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredNews.publishedAt && formatNewsDate(featuredNews.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredNews.readTime} {isEnglish ? 'min read' : 'دقيقة قراءة'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredNews.pageViews.toLocaleString(isEnglish ? 'en-US' : 'ar-EG')}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                      {isEnglish ? featuredNews.titleEn : featuredNews.titleAr}
                    </h3>
                    
                    <p className="text-gray-200 text-lg leading-relaxed line-clamp-2 mb-4">
                      {isEnglish ? featuredNews.contentEn : featuredNews.contentAr}
                    </p>
                    
                    <Link href={`/${locale}/news/${isEnglish ? featuredNews.slugEn : featuredNews.slugAr}`}>
                      <Button className="group/btn bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                        {isEnglish ? "Read Full Article" : "قراءة المقال كاملاً"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Side News */}
            <div className="space-y-6">
              {sideNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                  className="group"
                >
                  <Link href={`/${locale}/news/${isEnglish ? news.slugEn : news.slugAr}`}>
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-brand-primary/10 hover:border-brand-primary/30">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <img 
                            src={news.featuredImageUrl}
                            alt={isEnglish ? news.titleEn : news.titleAr}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="w-3 h-3" />
                            {news.publishedAt && formatNewsDate(news.publishedAt)}
                          </div>
                          
                          <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-brand-primary transition-colors">
                            {isEnglish ? news.titleEn : news.titleAr}
                          </h4>
                          
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {news.readTime} {isEnglish ? 'min' : 'دقيقة'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {(news.pageViews / 1000).toFixed(1)}K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Link href={`/${locale}/news`}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Newspaper className="w-4 h-4 mr-2" />
              {isEnglish ? "View All News" : "عرض جميع الأخبار"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}