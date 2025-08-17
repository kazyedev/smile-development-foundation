"use client";

import { mockPhotos } from "@/data/mockPhotos";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Camera, Search, Filter, Grid, List, Eye, Calendar, Tag, Aperture, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MediaImagesPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");

  // Filter photos based on search and category
  const filteredPhotos = mockPhotos.filter(photo => {
    const matchesSearch = searchTerm === "" || 
      (isEn ? photo.titleEn : photo.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isEn ? photo.descriptionEn : photo.descriptionAr)?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      (isEn ? photo.tagsEn : photo.tagsAr)?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const allCategories = Array.from(new Set(
    mockPhotos.flatMap(photo => isEn ? photo.tagsEn || [] : photo.tagsAr || [])
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50/20 dark:to-blue-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/5">
        {/* Photography Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-20 w-12 h-12 border-2 border-blue-400 rounded-full"></div>
          <div className="absolute top-1/4 right-32 w-8 h-8 bg-indigo-400/30 rounded-lg rotate-45"></div>
          <div className="absolute bottom-24 left-1/3 w-16 h-16 border-2 border-purple-400 rounded-lg rotate-12"></div>
          <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-blue-300/40 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              <Camera className="w-4 h-4" />
              {isEn ? "Visual Stories" : "قصص بصرية"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {isEn ? "Photo Gallery" : "معرض الصور"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Explore our visual journey through impactful moments captured across our projects, programs, and community initiatives. Every image tells a story of transformation and hope."
                : "استكشف رحلتنا البصرية من خلال اللحظات المؤثرة التي تم التقاطها عبر مشاريعنا وبرامجنا ومبادراتنا المجتمعية. كل صورة تحكي قصة تحول وأمل."
              }
            </p>

            {/* Gallery Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{mockPhotos.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Photos" : "صورة"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-500 mb-1">{allCategories.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Categories" : "فئة"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Views" : "مشاهدة"}</div>
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
                placeholder={isEn ? "Search photos..." : "البحث في الصور..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
              >
                <option value="all">{isEn ? "All Categories" : "جميع الفئات"}</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("masonry")}
                className="h-10"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-10"
              >
                <Grid className="w-4 h-4" />
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
              <Aperture className="w-4 h-4" />
              <span>
                {isEn 
                  ? `Showing ${filteredPhotos.length} of ${mockPhotos.length} photos`
                  : `عرض ${filteredPhotos.length} من ${mockPhotos.length} صورة`
                }
              </span>
            </div>
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2">
                <span>{isEn ? "Category:" : "الفئة:"}</span>
                <span className="px-2 py-1 bg-blue-600/10 text-blue-600 rounded-full text-xs">
                  {selectedCategory}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredPhotos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No photos found" : "لم يتم العثور على صور"}
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
              viewMode === "masonry" 
                ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            }>
              {filteredPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.slugEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className={viewMode === "masonry" ? "break-inside-avoid mb-6" : ""}
                >
                  <Link href={`/${locale}/media/images/${isEn ? photo.slugEn : photo.slugAr}`}>
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 hover:shadow-xl transition-all duration-500">
                      <div className={`relative ${viewMode === "grid" ? "aspect-square" : ""} overflow-hidden`}>
                        <Image 
                          src={photo.url} 
                          alt={photo.alt || (isEn ? photo.titleEn : photo.titleAr)} 
                          width={400}
                          height={viewMode === "grid" ? 400 : 100}
                          className={`${viewMode === "grid" ? "w-full h-full object-cover" : "w-full"} group-hover:scale-105 transition-transform duration-500`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Overlay Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-lg mb-1 line-clamp-1">
                            {isEn ? photo.titleEn : photo.titleAr}
                          </h3>
                          {photo.descriptionEn && (
                            <p className="text-sm text-white/90 line-clamp-2 mb-2">
                              {isEn ? photo.descriptionEn : photo.descriptionAr}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-white/80">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{Math.floor(Math.random() * 500) + 100}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Corner Badge */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Camera className="w-3 h-3 inline mr-1" />
                          {isEn ? 'View' : 'عرض'}
                        </div>
                      </div>
                      
                      {/* Caption for Masonry */}
                      {viewMode === "masonry" && (
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                            {isEn ? photo.titleEn : photo.titleAr}
                          </h3>
                          {photo.descriptionEn && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {isEn ? photo.descriptionEn : photo.descriptionAr}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{Math.floor(Math.random() * 500) + 100}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
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
          <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-3xl p-8 lg:p-12 border border-blue-200/50 dark:border-blue-800/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Camera className="w-6 h-6 text-blue-600" />
              <Aperture className="w-6 h-6 text-indigo-500" />
              <ImageIcon className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              {isEn ? "Capture Moments, Create Impact" : "التقط اللحظات، اصنع الأثر"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Be part of our visual story. Join our events, programs, and initiatives to create moments worth capturing and sharing."
                : "كن جزءًا من قصتنا البصرية. انضم إلى فعالياتنا وبرامجنا ومبادراتنا لخلق لحظات تستحق التوثيق والمشاركة."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                <Link href={`/${locale}/events`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {isEn ? "Join Our Events" : "انضم لفعالياتنا"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                <Link href={`/${locale}/contact`}>
                  <Camera className="w-4 h-4 mr-2" />
                  {isEn ? "Share Your Photos" : "شارك صورك"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}