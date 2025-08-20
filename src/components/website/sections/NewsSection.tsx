"use client";

import { News } from "@/types/News";
import NewsCard from "../NewsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper, Clock, Eye, Calendar, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const mockNews: News[] = [
  {
    id: 1,
    isEnglish: true,
    isArabic: true,
    includeInSitemapEn: true,
    includeInSitemapAr: true,
    titleEn: "Foundation Launches New Clean Water Initiative in Rural Yemen",
    titleAr: "المؤسسة تطلق مبادرة جديدة للمياه النظيفة في ريف اليمن",
    featuredImageUrl: "/assets/hero-1.jpg",
    otherImagesUrl: ["/assets/hero-2.jpg"],
    contentEn: "We are proud to announce the launch of our latest clean water initiative that will bring safe drinking water to over 10,000 residents in rural communities across Upper Yemen. This comprehensive program includes the installation of new water treatment facilities, community education workshops, and sustainable maintenance training for local residents.",
    contentAr: "نحن فخورون بالإعلان عن إطلاق مبادرتنا الأحدث للمياه النظيفة التي ستجلب مياه الشرب الآمنة لأكثر من 10,000 نسمة في المجتمعات الريفية عبر مجمع اليمن. يشمل هذا البرنامج الشامل تركيب مرافق معالجة المياه الجديدة وورش التوعية المجتمعية وتدريب الصيانة المستدامة للسكان المحليين.",
    categoryId: 1,
    slugEn: "foundation-launches-clean-water-initiative-rural-Yemen",
    slugAr: "المؤسسة-تطلق-مبادرة-المياه-النظيفة-ريف-اليمن",
    keywordsEn: ["clean water", "rural development", "community health", "Upper Yemen"],
    keywordsAr: ["مياه نظيفة", "تنمية ريفية", "صحة مجتمعية", "مجمع اليمن"],
    tagsEn: ["Water", "Health"],
    tagsAr: ["مياه", "صحة"],
    readTime: 8,
    pageViews: 2450,
    authorId: 1,
    isPublished: true,
    publishedAt: new Date("2024-06-25"),
    createdAt: new Date("2024-06-20"),
    updatedAt: new Date("2024-06-24"),
  },
  {
    id: 2,
    isEnglish: true,
    isArabic: true,
    includeInSitemapEn: true,
    includeInSitemapAr: true,
    titleEn: "Youth Leadership Program Graduates 150 Future Leaders",
    titleAr: "برنامج القيادة الشبابية يخرج 150 قائدًا مستقبليًا",
    featuredImageUrl: "/assets/hero-2.jpg",
    otherImagesUrl: ["/assets/hero-3.jpg", "/assets/hero-1.jpg"],
    contentEn: "Our annual Youth Leadership Program has successfully graduated 150 young individuals who are now equipped with the skills and knowledge to lead positive change in their communities. The program included leadership training, project management workshops, and community service initiatives that have already begun making an impact.",
    contentAr: "نجح برنامج القيادة الشبابية السنوي في تخريج 150 شابًا مزودين الآن بالمهارات والمعرفة لقيادة التغيير الإيجابي في مجتمعاتهم. شمل البرنامج تدريب القيادة وورش إدارة المشاريع ومبادرات الخدمة المجتمعية التي بدأت بالفعل في إحداث تأثير.",
    categoryId: 2,
    slugEn: "youth-leadership-program-graduates-150-future-leaders",
    slugAr: "برنامج-القيادة-الشبابية-يخرج-150-قائد-مستقبلي",
    keywordsEn: ["youth", "leadership", "graduation", "community impact"],
    keywordsAr: ["شباب", "قيادة", "تخرج", "تأثير مجتمعي"],
    tagsEn: ["Youth", "Leadership"],
    tagsAr: ["شباب", "قيادة"],
    readTime: 6,
    pageViews: 1875,
    authorId: 2,
    isPublished: true,
    publishedAt: new Date("2024-07-15"),
    createdAt: new Date("2024-07-10"),
    updatedAt: new Date("2024-07-14"),
  },
  {
    id: 3,
    isEnglish: true,
    isArabic: true,
    includeInSitemapEn: true,
    includeInSitemapAr: true,
    titleEn: "Medical Mission Provides Free Healthcare to 3,000 Patients",
    titleAr: "البعثة الطبية تقدم رعاية صحية مجانية لـ 3,000 مريض",
    featuredImageUrl: "/assets/hero-3.jpg",
    otherImagesUrl: [],
    contentEn: "Our recent medical mission to remote areas in Sinai Peninsula has provided free healthcare services to over 3,000 patients. The mission included general medical checkups, dental care, eye examinations, and distribution of essential medications. Local doctors and international volunteers worked together to ensure comprehensive care for underserved communities.",
    contentAr: "قدمت بعثتنا الطبية الأخيرة إلى المناطق النائية في شبوة خدمات رعاية صحية مجانية لأكثر من 3,000 مريض. شملت البعثة الفحوصات الطبية العامة ورعاية الأسنان وفحوصات العيون وتوزيع الأدوية الأساسية. عمل الأطباء المحليون والمتطوعون الدوليون معًا لضمان الرعاية الشاملة للمجتمعات المحرومة.",
    categoryId: 3,
    slugEn: "medical-mission-provides-free-healthcare-3000-patients",
    slugAr: "البعثة-الطبية-تقدم-رعاية-صحية-مجانية-3000-مريض",
    keywordsEn: ["medical mission", "free healthcare", "Sinai", "community service"],
    keywordsAr: ["بعثة طبية", "رعاية صحية مجانية", "شبوة", "خدمة مجتمعية"],
    tagsEn: ["Healthcare", "Mission"],
    tagsAr: ["رعاية صحية", "بعثة"],
    readTime: 7,
    pageViews: 3120,
    authorId: 1,
    isPublished: true,
    publishedAt: new Date("2024-08-05"),
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-04"),
  },
];

export default function NewsSection({ locale }: { locale: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isEnglish = locale === "en";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'ar-EG', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatNewsDate = (date: Date) => {
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

  const featuredNews = mockNews[0];
  const sideNews = mockNews.slice(1);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-background to-muted/20 dark:to-muted/10">
      {/* Newspaper Pattern Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Breaking News Ticker */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Zap className="w-4 h-4 animate-pulse" />
                {isEnglish ? "BREAKING" : "عاجل"}
              </div>
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap text-sm"
                >
                  {isEnglish 
                    ? "Foundation launches new clean water initiative in rural Yemen • Youth Leadership Program graduates 150 future leaders • Medical mission provides free healthcare to 3,000 patients"
                    : "المؤسسة تطلق مبادرة جديدة للمياه النظيفة في ريف اليمن • برنامج القيادة الشبابية يخرج 150 قائدًا مستقبليًا • البعثة الطبية تقدم رعاية صحية مجانية لـ 3,000 مريض"
                  }
                </motion.div>
              </div>
              <div className="text-xs opacity-90">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
                        {formatNewsDate(featuredNews.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredNews.readTime} {isEnglish ? 'min read' : 'دقيقة قراءة'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredNews.pageViews.toLocaleString()}
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
                  animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
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
                            {formatNewsDate(news.publishedAt)}
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
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
  );
}