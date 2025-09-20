"use client";

import SuccessStoryCard from "@/components/website/SuccessStoryCard";
import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import { SuccessStory } from "@/lib/db/schema/successStories";
import { Heart, Users, MapPin, Search, Filter, Grid, List, Star, Award, Sparkles, Loader2, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MediaSuccessStoriesPageProps {
  params: Promise<{ locale: string }>;
}

export default function MediaSuccessStoriesPage({ params }: MediaSuccessStoriesPageProps) {
  const { locale } = use(params);
  const isEn = locale === "en";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams({
          published: 'true',
          limit: '100',
          orderBy: 'publishedAt',
          order: 'desc'
        });
        
        if (searchTerm.trim()) {
          params.append('search', searchTerm.trim());
        }
        
        const response = await fetch(`/api/success-stories?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch success stories');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setStories(data.items || []);
          
          // Get unique locations
          const uniqueLocations = Array.from(new Set(
            data.items.map((story: SuccessStory) => isEn ? story.cityEn : story.cityAr)
          ));
          setAllLocations(uniqueLocations);
          
          setError(null);
        } else {
          throw new Error(data.error || 'Failed to fetch success stories');
        }
      } catch (err) {
        console.error('Error fetching success stories:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStories();
  }, [searchTerm, isEn]);

  // Filter stories locally based on location
  useEffect(() => {
    if (selectedLocation === 'all') {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter(story => 
        (isEn ? story.cityEn : story.cityAr).toLowerCase() === selectedLocation.toLowerCase()
      );
      setFilteredStories(filtered);
    }
  }, [stories, selectedLocation, isEn]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-amber-50/20 dark:to-amber-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-red-950/5">
        {/* Inspirational Background Elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-10 left-10 w-16 h-16 bg-amber-400/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/4 right-20 w-8 h-8 bg-orange-400/40 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-amber-300/50 rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              {isEn ? "Inspiring Stories" : "قصص ملهمة"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Success Stories" : "قصص النجاح"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Discover the transformative power of community support through the personal journeys of those whose lives have been forever changed by our programs and initiatives."
                : "اكتشف القوة التحويلية للدعم المجتمعي من خلال الرحلات الشخصية لأولئك الذين تغيرت حياتهم إلى الأبد من خلال برامجنا ومبادراتنا."
              }
            </p>

            {/* Stories Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">{loading ? '...' : stories.length}</div>
              <div className="text-sm text-muted-foreground">{isEn ? "Stories Shared" : "قصة مشتركة"}</div>
            </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Lives Inspired" : "حياة ألهمت"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1">95%</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Success Rate" : "معدل النجاح"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
                placeholder={isEn ? "Search stories..." : "البحث في القصص..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
              >
                <option value="all">{isEn ? "All Locations" : "جميع المواقع"}</option>
                {allLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
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
              <Star className="w-4 h-4" />
              <span>
                {isEn 
                  ? `Showing ${filteredStories.length} of ${stories.length} stories`
                  : `عرض ${filteredStories.length} من ${stories.length} قصة`
                }
              </span>
            </div>
            {selectedLocation !== "all" && (
              <div className="flex items-center gap-2">
                <span>{isEn ? "Location:" : "الموقع:"}</span>
                <span className="px-2 py-1 bg-amber-600/10 text-amber-600 rounded-full text-xs">
                  {selectedLocation}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stories Grid/List */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Loader2 className="w-16 h-16 text-amber-600 mx-auto mb-6 animate-spin" />
              <h3 className="text-2xl font-bold mb-4">
                {isEn ? 'Loading success stories...' : 'جاري تحميل قصص النجاح...'}
              </h3>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                {isEn ? 'Error loading success stories' : 'خطأ في تحميل قصص النجاح'}
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white"
              >
                {isEn ? 'Try Again' : 'حاول مرة أخرى'}
              </Button>
            </motion.div>
          ) : filteredStories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No stories found" : "لم يتم العثور على قصص"}
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
              {filteredStories.map((story, idx) => (
                <motion.div
                  key={story.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  {viewMode === "grid" ? (
                    <SuccessStoryCard story={story} locale={locale} />
                  ) : (
                    <div className="bg-gradient-to-r from-background to-amber-50/30 dark:to-amber-950/10 border border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-500">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <img
                              src={story.featuredImageUrl}
                              alt={isEn ? story.titleEn : story.titleAr}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center gap-2 text-white text-sm">
                                <Users className="w-4 h-4" />
                                <span>{isEn ? story.personNameEn : story.personNameAr}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-2/3 space-y-6">
                          <div>
                            <h3 className="text-2xl font-bold mb-3 text-foreground">
                              {isEn ? story.titleEn : story.titleAr}
                            </h3>
                            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{isEn ? story.personNameEn : story.personNameAr}, {story.personAge} {isEn ? 'years old' : 'سنة'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{isEn ? story.cityEn : story.cityAr}</span>
                              </div>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                              {(isEn ? story.contentEn : story.contentAr).substring(0, 200)}...
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {story.tags && story.tags.slice(0, 4).map(tag => (
                              <span key={tag} className="px-3 py-1 bg-amber-600/10 text-amber-600 rounded-full text-xs font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                <span>{story.pageViews.toLocaleString()} {isEn ? 'reads' : 'قراءة'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Sparkles className="w-4 h-4" />
                                <span>{isEn ? 'Inspiring' : 'ملهم'}</span>
                              </div>
                            </div>
                            <Button asChild variant="outline" className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50">
                              <a href={`/${locale}/media/success-stories/${story.slug}`}>
                                {isEn ? "Read Story" : "قراءة القصة"}
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
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
          <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10 rounded-3xl p-8 lg:p-12 border border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-amber-600" fill="currentColor" />
              <Sparkles className="w-6 h-6 text-orange-500" />
              <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-red-500 bg-clip-text text-transparent">
              {isEn ? "Your Story Could Be Next" : " قد تكون سبباً في القصة التالية"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Join our programs and become part of a community that transforms lives. Every success story starts with a single step."
                : "انضم إلى برامجنا واصبح جزءًا من مجتمع يغير الحياة. كل قصة نجاح تبدأ بخطوة واحدة."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                <a href={`/${locale}/donate`}>
                  <Users className="w-4 h-4 mr-2" />
                  {isEn ? "Donate Now" : "التبرع الان"}
                </a>
              </Button>
              {/* <Button asChild variant="outline" size="lg" className="border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30">
                <a href={`/${locale}/contact`}>
                  <Heart className="w-4 h-4 mr-2" />
                  {isEn ? "Donate Now" : " التبرع"}
                </a>
              </Button> */}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}