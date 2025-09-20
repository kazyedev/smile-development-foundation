"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import { SuccessStory } from "@/lib/db/schema/successStories";
import { Heart, Users, MapPin, Calendar, Eye, ArrowLeft, Share2, Bookmark, Quote, Star, Award, Sparkles, Loader2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MediaSuccessStoryDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default function MediaSuccessStoryDetailPage({ params }: MediaSuccessStoryDetailPageProps) {
  const { slug, locale } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const isEn = locale === 'en';
  
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/success-stories/${decodedSlug}`);
        
        if (response.status === 404) {
          notFound();
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch success story');
        }
        
        const data = await response.json();
        
        if (!data.success || !data.item) {
          throw new Error(data.error || 'Success story not found');
        }
        
        setStory(data.item);
        setError(null);
      } catch (err) {
        console.error('Error fetching success story:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (decodedSlug) {
      fetchStory();
    }
  }, [decodedSlug]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isEn ? 'en-US' : 'ar-EG');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-amber-50/20 dark:to-amber-950/10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-2xl font-bold mb-2">
            {isEn ? 'Loading success story...' : 'جاري تحميل قصة النجاح...'}
          </h3>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-amber-50/20 dark:to-amber-950/10 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            {isEn ? 'Error loading success story' : 'خطأ في تحميل قصة النجاح'}
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white"
          >
            {isEn ? 'Try Again' : 'حاول مرة أخرى'}
          </Button>
        </div>
      </div>
    );
  }
  
  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-amber-50/20 dark:to-amber-950/10">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[60vh] lg:h-[70vh]">
          <Image 
            src={story.featuredImageUrl} 
            alt={isEn ? story.titleEn : story.titleAr} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Navigation */}
          <div className={`absolute top-12 ${isEn ? 'left-6' : 'right-6'} z-10`}>
            <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Link href={`/${locale}/media/success-stories`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEn ? 'Back to Stories' : 'العودة للقصص'}
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-12 ${isEn ? 'right-6' : 'left-6'} z-10 flex gap-2`}>
            <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Share2 className="w-4 h-4" />
            </Button>
            {/* <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Bookmark className="w-4 h-4" />
            </Button> */}
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30 mb-6">
                  <Heart className="w-4 h-4" fill="currentColor" />
                  {isEn ? "Success Story" : "قصة نجاح"}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isEn ? story.titleEn : story.titleAr}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{isEn ? story.personNameEn : story.personNameAr}, {story.personAge} {isEn ? 'years old' : 'سنة'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{isEn ? story.cityEn : story.cityAr}, {isEn ? story.personLocationEn : story.personLocationAr}</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                  {story.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(story.publishedAt)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{story.pageViews.toLocaleString(isEn ? 'en-US' : 'ar-EG')} {isEn ? 'reads' : 'قراءة'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span>{isEn ? 'Inspiring Story' : 'قصة ملهمة'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
            viewport={{once:true}}
          >
            {/* Quote Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <Quote className="w-8 h-8 text-amber-600" />
            </div>

            {/* Story Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <blockquote className="text-xl leading-relaxed text-center text-muted-foreground italic border-none pl-0 font-normal">
                "{isEn ? story.contentEn : story.contentAr}"
              </blockquote>
            </div>
          </motion.div>

          {/* Person Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            viewport={{once:true}}
          >
            <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10 rounded-3xl p-8 border border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-600/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">{isEn ? "About" : "عن"} {isEn ? story.personNameEn : story.personNameAr}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isEn ? "Age" : "العمر"}</span>
                  <span className="font-semibold">{story.personAge} {isEn ? 'years old' : 'سنة'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isEn ? "Location" : "الموقع"}</span>
                  <span className="font-semibold">{isEn ? story.cityEn : story.cityAr}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isEn ? "Region" : "المنطقة"}</span>
                  <span className="font-semibold">{isEn ? story.personLocationEn : story.personLocationAr}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 rounded-3xl p-8 border border-green-200/50 dark:border-green-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{isEn ? "Impact Metrics" : "مقاييس التأثير"}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isEn ? "Story Reads" : "قراءات القصة"}</span>
                  <span className="font-semibold">{story.pageViews.toLocaleString(isEn ? 'en-US' : 'ar-EG')}</span>
                </div>
                {story.publishedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{isEn ? "Published" : "تاريخ النشر"}</span>
                    <span className="font-semibold">{formatDate(story.publishedAt)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isEn ? "Last Updated" : "آخر تحديث"}</span>
                  <span className="font-semibold">{formatDate(story.updatedAt)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tags and Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
            viewport={{once:true}}
          >
            <h3 className="text-xl font-semibold mb-6">
              {isEn ? 'Story Themes & Keywords' : 'مواضيع ومفاتيح القصة'}
            </h3>
            
            {story.keywords && story.keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {story.keywords.map((keyword) => (
                  <span key={keyword} className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-amber-600/10 hover:text-amber-600 transition-colors cursor-pointer">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
            
            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {story.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-amber-600/10 text-amber-600 rounded-full text-sm font-medium hover:bg-amber-600/20 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
            viewport={{once:true}}
          >
            <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10 rounded-3xl p-8 lg:p-12 border border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-amber-600" fill="currentColor" />
                <Sparkles className="w-6 h-6 text-orange-500" />
                <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Inspired by This Story?" : "اكتب القصة التالية"}
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {isEn 
                  ? "Join our community and start your own journey of transformation. Every great story begins with a single step forward."
                  : "انضم إلى مجتمعنا وابدأ رحلتك الخاصة في التحول. كل قصة عظيمة تبدأ بخطوة واحدة إلى الأمام."
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  <Link href={`/${locale}/programs`}>
                    <Users className="w-4 h-4 mr-2" />
                    {isEn ? "Donate Now" : "تبرع الان"}
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30">
                  <Link href={`/${locale}/media/success-stories`}>
                    <Star className="w-4 h-4 mr-2" />
                    {isEn ? "Read More Stories" : "اقرأ المزيد من القصص"}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}