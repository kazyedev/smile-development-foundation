'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/lib/db/schema/activities';
import { Activity as ActivityIcon, Calendar, Eye, Users, Search, Filter, Grid, List, ArrowRight, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface ActivitiesPageProps {
  params: Promise<{ locale: string }>;
}

export default function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { locale } = use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isEn = locale === 'en';
  
  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams({
          published: 'true',
          limit: '100',
          orderBy: 'publishedAt',
          order: 'desc'
        });
        
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }
        
        const response = await fetch(`/api/activities?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setActivities(data.items || []);
          setError(null);
        } else {
          throw new Error(data.error || 'Failed to fetch activities');
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, [searchQuery]);
  
  // Filter activities locally based on category (using tags)
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredActivities(activities);
    } else {
      // Filter based on tags array
      const filtered = activities.filter(activity => 
        activity.tags && activity.tags.some(tag => 
          tag.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
      setFilteredActivities(filtered);
    }
  }, [activities, selectedCategory]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-primary)]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--brand-primary) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[var(--brand-secondary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 rounded-full px-6 py-2 mb-6">
                <ActivityIcon className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="text-sm font-semibold text-[var(--brand-primary)]">
                  {isEn ? 'Foundation Activities' : 'أنشطة المؤسسة'}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-primary)] bg-clip-text text-transparent">
                  {isEn ? 'Our' : 'أنشطتنا'}
                </span>{' '}
                <span className="text-[var(--foreground)]">
                  {isEn ? 'Activities' : 'المتنوعة'}
                </span>
              </h1>

              <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                {isEn
                  ? 'Discover our diverse range of community activities, workshops, and initiatives that create lasting positive impact in communities worldwide.'
                  : 'اكتشف مجموعتنا المتنوعة من الأنشطة المجتمعية وورش العمل والمبادرات التي تخلق تأثيرًا إيجابيًا دائمًا في المجتمعات حول العالم.'
                }
              </p>

              {/* Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              >
              {[
                { icon: ActivityIcon, value: loading ? '...' : `${activities.length}+`, label: isEn ? 'Activities Completed' : 'نشاط مكتمل' },
                { icon: Users, value: '2,500+', label: isEn ? 'Participants Reached' : 'مشارك تم الوصول إليه' },
                { icon: TrendingUp, value: '15', label: isEn ? 'Communities Served' : 'مجتمع تم خدمته' }
              ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{stat.value}</div>
                    <div className="text-[var(--muted-foreground)]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Search Section */}
        <section className="pb-12 px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)]/50 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isEn ? 'Search activities...' : 'البحث في الأنشطة...'}
                      className="w-full pl-12 pr-4 py-3 bg-[var(--background)]/50 border border-[var(--border)] rounded-xl focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-[var(--muted-foreground)]" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-[var(--background)]/50 border border-[var(--border)] rounded-xl focus:border-[var(--brand-primary)] outline-none"
                  >
                    <option value="all">{isEn ? 'All Categories' : 'جميع الفئات'}</option>
                    <option value="community">{isEn ? 'Community' : 'مجتمعي'}</option>
                    <option value="education">{isEn ? 'Education' : 'تعليم'}</option>
                    <option value="health">{isEn ? 'Health' : 'صحة'}</option>
                    <option value="environment">{isEn ? 'Environment' : 'بيئة'}</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-[var(--background)]/50 border border-[var(--border)] rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-[var(--brand-primary)] text-white'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list'
                        ? 'bg-[var(--brand-primary)] text-white'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Results Summary */}
              <div className="mt-6 pt-6 border-t border-[var(--border)]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted-foreground)]">
                    {isEn 
                      ? `Showing ${filteredActivities.length} of ${activities.length} activities`
                      : `عرض ${filteredActivities.length} من ${activities.length} نشاط`
                    }
                  </span>
                  {(searchQuery || selectedCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="text-sm text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] transition-colors"
                    >
                      {isEn ? 'Clear Filters' : 'مسح المرشحات'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activities Grid/List */}
        <section className="pb-20 px-8">
          <div className="container mx-auto max-w-6xl">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <Loader2 className="w-16 h-16 text-[var(--brand-primary)] mx-auto mb-6 animate-spin" />
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                    {isEn ? 'Loading activities...' : 'جاري تحميل الأنشطة...'}
                  </h3>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-red-600 mb-4">
                    {isEn ? 'Error loading activities' : 'خطأ في تحميل الأنشطة'}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                  >
                    {isEn ? 'Try Again' : 'حاول مرة أخرى'}
                  </Button>
                </motion.div>
              ) : filteredActivities.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <Sparkles className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                    {isEn ? 'No activities found' : 'لم يتم العثور على أنشطة'}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    {isEn 
                      ? 'Try adjusting your search or filter criteria'
                      : 'حاول تعديل معايير البحث أو التصفية'
                    }
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                  >
                    {isEn ? 'View All Activities' : 'عرض جميع الأنشطة'}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                  }
                >
                  {filteredActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-2xl transition-all duration-300 border-[var(--border)]/50 overflow-hidden bg-[var(--card)]/80 backdrop-blur-sm">
                        <div className="relative overflow-hidden">
                          <Image
                            src={activity.featuredImageUrl}
                            alt={isEn ? activity.titleEn : activity.titleAr}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-white text-sm font-medium flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {activity.date && formatDate(activity.date)}
                              </span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                            {isEn ? activity.titleEn : activity.titleAr}
                          </h3>
                          
                          <p className="text-[var(--muted-foreground)] mb-4 line-clamp-3">
                            {isEn ? activity.contentEn : activity.contentAr}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {activity.tags && activity.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 text-xs bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full border border-[var(--brand-primary)]/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {activity.pageViews.toLocaleString()}
                              </span>
                            </div>
                            
                            <Link href={`/${locale}/activities/${activity.slug}`}>
                              <Button variant="ghost" size="sm" className="group/btn">
                                {isEn ? 'Learn More' : 'اقرأ المزيد'}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
