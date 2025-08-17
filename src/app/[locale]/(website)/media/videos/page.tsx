"use client";

import { mockVideos } from "@/data/mockVideos";
import VideoCard from "@/components/website/VideoCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Film, Search, Filter, Grid, List, Play, Clock, Eye, Calendar, MapPin, Clapperboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MediaVideosPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEnglish = locale === "en";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter videos based on search and location
  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = searchTerm === "" || 
      (isEnglish ? video.titleEn : video.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isEnglish ? video.descriptionEn : video.descriptionAr).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === "all" || 
      (isEnglish ? video.locationEn : video.locationAr).toLowerCase() === selectedLocation.toLowerCase();
    
    return matchesSearch && matchesLocation;
  });

  // Get unique locations
  const allLocations = Array.from(new Set(
    mockVideos.map(video => isEnglish ? video.locationEn : video.locationAr)
  ));

  // Helper functions
  const getThumbnailUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/placeholder-video.jpg';
  };

  const formatDuration = (width: number, height: number) => {
    const minutes = Math.floor(Math.random() * 20) + 5; // Mock duration
    return `${minutes}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-red-50/20 dark:to-red-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-red-50/50 via-pink-50/30 to-purple-50/20 dark:from-red-950/20 dark:via-pink-950/10 dark:to-purple-950/5">
        {/* Cinema Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-16 left-16 w-20 h-12 border-2 border-red-400 rounded-lg"></div>
          <div className="absolute top-1/3 right-24 w-12 h-12 bg-pink-400/30 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-10 border-2 border-purple-400 rounded-lg rotate-12"></div>
          <div className="absolute top-1/4 left-1/2 w-8 h-8 bg-red-300/40 rounded-lg rotate-45"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mb-6">
              <Film className="w-4 h-4" />
              {isEnglish ? "Video Library" : "مكتبة الفيديو"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                {isEnglish ? "Video Gallery" : "معرض الفيديو"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEnglish 
                ? "Immerse yourself in our video collection showcasing real stories, behind-the-scenes moments, and impactful initiatives that bring our mission to life through moving visuals."
                : "انغمس في مجموعة الفيديوهات الخاصة بنا التي تعرض قصصًا حقيقية ولحظات من وراء الكواليس ومبادرات مؤثرة تجلب مهمتنا إلى الحياة من خلال المرئيات المتحركة."
              }
            </p>

            {/* Video Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">{mockVideos.length}</div>
                <div className="text-sm text-muted-foreground">{isEnglish ? "Videos" : "فيديو"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500 mb-1">2.5M+</div>
                <div className="text-sm text-muted-foreground">{isEnglish ? "Total Views" : "إجمالي المشاهدات"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-1">48hr</div>
                <div className="text-sm text-muted-foreground">{isEnglish ? "Content" : "محتوى"}</div>
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
                placeholder={isEnglish ? "Search videos..." : "البحث في الفيديوهات..."}
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
                <option value="all">{isEnglish ? "All Locations" : "جميع المواقع"}</option>
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
              <Clapperboard className="w-4 h-4" />
              <span>
                {isEnglish 
                  ? `Showing ${filteredVideos.length} of ${mockVideos.length} videos`
                  : `عرض ${filteredVideos.length} من ${mockVideos.length} فيديو`
                }
              </span>
            </div>
            {selectedLocation !== "all" && (
              <div className="flex items-center gap-2">
                <span>{isEnglish ? "Location:" : "الموقع:"}</span>
                <span className="px-2 py-1 bg-red-600/10 text-red-600 rounded-full text-xs">
                  {selectedLocation}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredVideos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEnglish ? "No videos found" : "لم يتم العثور على فيديوهات"}
              </h3>
              <p className="text-muted-foreground">
                {isEnglish 
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
              {filteredVideos.map((video, idx) => (
                <motion.div
                  key={video.slugEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  {viewMode === "grid" ? (
                    <VideoCard video={video} locale={locale} />
                  ) : (
                    <div className="bg-gradient-to-r from-background to-red-50/30 dark:to-red-950/10 border border-border rounded-3xl p-6 hover:shadow-xl transition-all duration-500">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/2">
                          <div className="relative aspect-video rounded-xl overflow-hidden group">
                            <Image
                              src={getThumbnailUrl(video.url)}
                              alt={isEnglish ? video.titleEn : video.titleAr}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                              </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                              {formatDuration(video.width, video.height)}
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-1/2 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">
                              {isEnglish ? video.titleEn : video.titleAr}
                            </h3>
                            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                              {isEnglish ? video.descriptionEn : video.descriptionAr}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(isEnglish ? video.tagsEn : video.tagsAr).slice(0, 3).map(tag => (
                              <span key={tag} className="px-3 py-1 bg-red-600/10 text-red-600 rounded-full text-xs font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{video.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{isEnglish ? video.locationEn : video.locationAr}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{formatDuration(video.width, video.height)}</span>
                              </div>
                            </div>
                            <Button asChild variant="outline" className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50">
                              <a href={video.url} target="_blank" rel="noopener noreferrer">
                                <Play className="w-4 h-4 mr-2" />
                                {isEnglish ? "Watch Video" : "مشاهدة الفيديو"}
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
        >
          <div className="bg-gradient-to-r from-red-50/50 to-pink-50/30 dark:from-red-950/20 dark:to-pink-950/10 rounded-3xl p-8 lg:p-12 border border-red-200/50 dark:border-red-800/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Film className="w-6 h-6 text-red-600" />
              <Clapperboard className="w-6 h-6 text-pink-500" />
              <Play className="w-6 h-6 text-purple-500" fill="currentColor" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-purple-500 bg-clip-text text-transparent">
              {isEnglish ? "Stories in Motion" : "قصص متحركة"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEnglish 
                ? "Every video tells a story of transformation. Subscribe to our channel and never miss the latest updates from our impactful work."
                : "كل فيديو يحكي قصة تحول. اشترك في قناتنا ولا تفوت آخر التحديثات من عملنا المؤثر."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" fill="currentColor" />
                  {isEnglish ? "Subscribe Channel" : "اشترك في القناة"}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
                <a href={`/${locale}/contact`}>
                  <Film className="w-4 h-4 mr-2" />
                  {isEnglish ? "Submit Your Video" : "أرسل فيديوك"}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}