'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import { Activity } from '@/lib/db/schema/activities';
import { 
  ArrowLeft, ArrowRight, Share2, Bookmark, Calendar, Eye, Users, 
  Clock, Tag, MapPin, Award, Sparkles, TrendingUp, CheckCircle,
  Download, ExternalLink, Activity as ActivityIcon, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface ActivityDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { slug, locale } = use(params);
  const isEn = locale === 'en';
  const decodedSlug = decodeURIComponent(slug);
  
  const [activity, setActivity] = useState<Activity | null>(null);
  const [relatedActivities, setRelatedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        
        // Fetch the activity by slug
        const activityResponse = await fetch(`/api/activities/${decodedSlug}`);
        
        if (activityResponse.status === 404) {
          notFound();
          return;
        }
        
        if (!activityResponse.ok) {
          throw new Error('Failed to fetch activity');
        }
        
        const activityData = await activityResponse.json();
        
        if (!activityData.success || !activityData.item) {
          throw new Error(activityData.error || 'Activity not found');
        }
        
        setActivity(activityData.item);
        
        // Fetch related activities (same program/project)
        const relatedParams = new URLSearchParams({
          published: 'true',
          limit: '4'
        });
        
        if (activityData.item.programId) {
          relatedParams.append('programId', activityData.item.programId.toString());
        }
        
        const relatedResponse = await fetch(`/api/activities?${relatedParams.toString()}`);
        
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          if (relatedData.success && relatedData.items) {
            // Filter out the current activity and limit to 3
            const filtered = relatedData.items.filter((a: Activity) => 
              a.id !== activityData.item.id
            ).slice(0, 3);
            setRelatedActivities(filtered);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching activity:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (decodedSlug) {
      fetchActivity();
    }
  }, [decodedSlug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-primary)]/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[var(--brand-primary)] mx-auto mb-4 animate-spin" />
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            {isEn ? 'Loading activity...' : 'جاري تحميل النشاط...'}
          </h3>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-primary)]/5 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            {isEn ? 'Error loading activity' : 'خطأ في تحميل النشاط'}
          </h3>
          <p className="text-[var(--muted-foreground)] mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
          >
            {isEn ? 'Try Again' : 'حاول مرة أخرى'}
          </Button>
        </div>
      </div>
    );
  }
  
  if (!activity) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isEn) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  // relatedActivities is now set in the useEffect above

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-primary)]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, var(--brand-primary) 25%, transparent 25%), 
                           linear-gradient(-45deg, var(--brand-primary) 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, var(--brand-secondary) 75%), 
                           linear-gradient(-45deg, transparent 75%, var(--brand-secondary) 75%)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={activity.featuredImageUrl}
            alt={isEn ? activity.titleEn : activity.titleAr}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Navigation */}
        <div className={`absolute ${isEn ? 'top-12 left-6' : 'top-12 right-6'} z-10`}>
          <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
            <Link href={`/${locale}/activities`}>
              {isEn ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              {isEn ? 'Back to Activities' : 'العودة للأنشطة'}
            </Link>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className={`absolute ${isEn ? 'top-12 right-6' : 'top-12 left-6'} z-10 flex gap-2`}>
          <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
            <Share2 className="w-4 h-4" />
          </Button>
          {/* <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
            <Bookmark className="w-4 h-4" />
          </Button> */}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-4 py-2 rounded-full mb-6">
                <ActivityIcon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">
                  {activity.tags && activity.tags.length > 0 ? activity.tags[0] : (isEn ? 'Activity' : 'نشاط')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {isEn ? activity.titleEn : activity.titleAr}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
                {activity.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(activity.date)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{activity.pageViews.toLocaleString()} {isEn ? 'views' : 'مشاهدة'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{isEn ? 'Community Activity' : 'نشاط مجتمعي'}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activity.tags && activity.tags.length > 0 && activity.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 -mt-20">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Activity Overview */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[var(--card)]/95 backdrop-blur-sm border-[var(--border)]/50 shadow-xl">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl">
                        <ActivityIcon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-[var(--foreground)]">
                        {isEn ? 'Activity Overview' : 'نظرة عامة على النشاط'}
                      </h2>
                    </div>
                    
                    <div className="prose max-w-none text-[var(--foreground)]">
                      <p className="text-lg leading-relaxed">
                        {isEn ? activity.contentEn : activity.contentAr}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Activity Images */}
              {activity.otherImages && activity.otherImages.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="bg-[var(--card)]/95 backdrop-blur-sm border-[var(--border)]/50 shadow-xl">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--foreground)]">
                          {isEn ? 'Activity Gallery' : 'معرض النشاط'}
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activity.otherImages.map((imageUrl, index) => (
                          <div key={index} className="relative overflow-hidden rounded-xl group">
                            <Image
                              src={imageUrl}
                              alt={`${isEn ? activity.titleEn : activity.titleAr} - Image ${index + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.section>
              )}

              {/* Activity Impact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-[var(--card)]/95 backdrop-blur-sm border-[var(--border)]/50 shadow-xl">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-[var(--foreground)]">
                        {isEn ? 'Activity Impact' : 'تأثير النشاط'}
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { 
                          icon: Users, 
                          value: '200+', 
                          label: isEn ? 'Participants' : 'مشارك',
                          description: isEn ? 'Community members engaged' : 'أعضاء المجتمع المشاركين'
                        },
                        { 
                          icon: Award, 
                          value: '100%', 
                          label: isEn ? 'Success Rate' : 'معدل النجاح',
                          description: isEn ? 'Goal achievement' : 'تحقيق الهدف'
                        },
                        { 
                          icon: CheckCircle, 
                          value: '5', 
                          label: isEn ? 'Communities' : 'مجتمعات',
                          description: isEn ? 'Areas covered' : 'المناطق المغطاة'
                        }
                      ].map((impact, index) => (
                        <div key={index} className="text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl mb-3">
                            <impact.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-[var(--foreground)] mb-1">{impact.value}</div>
                          <div className="text-sm font-semibold text-[var(--brand-primary)] mb-1">{impact.label}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">{impact.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Activity Details */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[var(--card)]/95 backdrop-blur-sm border-[var(--border)]/50 shadow-xl sticky top-8">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
                      {isEn ? 'Activity Details' : 'تفاصيل النشاط'}
                    </h3>
                    
                    <div className="space-y-4">
                      {activity.date && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
                          <div>
                            <div className="text-sm text-[var(--muted-foreground)]">
                              {isEn ? 'Date' : 'التاريخ'}
                            </div>
                            <div className="font-medium">
                              {formatDate(activity.date)}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-[var(--brand-primary)]" />
                        <div>
                          <div className="text-sm text-[var(--muted-foreground)]">
                            {isEn ? 'Views' : 'المشاهدات'}
                          </div>
                          <div className="font-medium">
                            {activity.pageViews.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[var(--brand-primary)]" />
                        <div>
                          <div className="text-sm text-[var(--muted-foreground)]">
                            {isEn ? 'Published' : 'تاريخ النشر'}
                          </div>
                          <div className="font-medium">
                            {formatDate(activity.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {activity.keywords && activity.keywords.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-[var(--border)]">
                        <h4 className="font-semibold text-[var(--foreground)] mb-3">
                          {isEn ? 'Keywords' : 'الكلمات المفتاحية'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activity.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full border border-[var(--brand-primary)]/20"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 space-y-3">
                      <Button className="w-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
                        <Share2 className="w-4 h-4 mr-2" />
                        {isEn ? 'Share Activity' : 'مشاركة النشاط'}
                      </Button>
                      {/* <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        {isEn ? 'Download Report' : 'تحميل التقرير'}
                      </Button> */}
                    </div>
                  </div>
                </Card>
              </motion.section>
            </div>
          </div>

          {/* Related Activities */}
          {relatedActivities.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                  {isEn ? 'Related Activities' : 'أنشطة ذات صلة'}
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                  {isEn 
                    ? 'Explore more activities that share similar themes and impact areas.'
                    : 'استكشف المزيد من الأنشطة التي تشارك المواضيع ومجالات التأثير المماثلة.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedActivities.map((relatedActivity, index) => (
                  <motion.div
                    key={relatedActivity.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 border-[var(--border)]/50 overflow-hidden bg-[var(--card)]/80 backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <Image
                          src={relatedActivity.featuredImageUrl}
                          alt={isEn ? relatedActivity.titleEn : relatedActivity.titleAr}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                          {isEn ? relatedActivity.titleEn : relatedActivity.titleAr}
                        </h3>
                        
                        <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">
                          {isEn ? relatedActivity.contentEn : relatedActivity.contentAr}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {relatedActivity.date && formatDate(relatedActivity.date)}
                          </span>
                          
                          <Link href={`/${locale}/activities/${relatedActivity.slug}`}>
                            <Button variant="ghost" size="sm" className="group/btn">
                              {isEn ? 'Read More' : 'اقرأ المزيد'}
                              <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}