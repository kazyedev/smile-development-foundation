"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BookOpen, Search, Filter, Grid, List, Download, Calendar, FileText, Award, GraduationCap, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Enhanced publication interface
interface Publication {
  id: number;
  titleEn: string | null;
  titleAr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  contentEn: string | null;
  contentAr: string | null;
  slugEn: string | null;
  slugAr: string | null;
  coverImageUrl: string | null;
  attachmentUrl: string | null;
  authorEn: string | null;
  authorAr: string | null;
  keywordsEn: string[] | null;
  keywordsAr: string[] | null;
  tagsEn: string[] | null;
  tagsAr: string[] | null;
  categoryId: number | null;
  programId: number | null;
  projectId: number | null;
  activityId: number | null;
  publishedAt: Date | null;
  pageViews: number | null;
  downloads: number | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  slug: string;
  tags: string[];
  keywords: string[];
}

interface PublicationsResponse {
  publications: Publication[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
  };
  success: boolean;
}

export default function MediaPublicationsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    limit: 12,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Publication types for filtering
  const publicationTypes = ["Research", "Guide", "Report", "Manual", "Policy"];

  // Fetch publications from API
  const fetchPublications = async (search?: string, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        ...(search && { search }),
      });
      
      const response = await fetch(`/api/publications?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch publications');
      }
      
      const data: PublicationsResponse = await response.json();
      
      if (data.success) {
        setPublications(data.publications);
        setPagination(data.pagination);
      } else {
        throw new Error('Failed to fetch publications');
      }
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  // Load publications on mount
  useEffect(() => {
    fetchPublications();
  }, []);

  // Handle search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        fetchPublications(searchTerm, 1);
      } else {
        fetchPublications(undefined, 1);
      }
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle download tracking
  const handleDownload = async (publication: Publication) => {
    try {
      // Track download
      await fetch(`/api/publications/${publication.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'download' }),
      });
      
      // Open/download the file if URL exists
      if (publication.attachmentUrl) {
        window.open(publication.attachmentUrl, '_blank');
      }
    } catch (error) {
      console.error('Error tracking download:', error);
      // Still allow download even if tracking fails
      if (publication.attachmentUrl) {
        window.open(publication.attachmentUrl, '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-green-50/20 dark:to-green-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/20 dark:from-green-950/20 dark:via-emerald-950/10 dark:to-teal-950/5">
        {/* Academic Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-20 w-16 h-20 border-2 border-green-400 rounded-lg"></div>
          <div className="absolute top-1/3 right-24 w-12 h-16 bg-emerald-400/30 rounded-lg rotate-12"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-12 border-2 border-teal-400 rounded-lg -rotate-6"></div>
          <div className="absolute top-1/4 left-1/2 w-8 h-10 bg-green-300/40 rounded-lg rotate-45"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {isEn ? "Knowledge Hub" : "مركز المعرفة"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {isEn ? "Publications" : "النشرات"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Access our comprehensive library of research, reports, guides, and educational materials. Download valuable resources that support evidence-based decision making and community development."
                : "الوصول إلى مكتبتنا الشاملة من الأبحاث والتقارير والأدلة والمواد التعليمية. تحميل الموارد القيمة التي تدعم صنع القرار القائم على الأدلة والتنمية المجتمعية."
              }
            </p>

            {/* Publications Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {loading ? 
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : 
                    pagination.totalCount
                  }
                </div>
                <div className="text-sm text-muted-foreground">{isEn ? "Publications" : "منشور"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-1">
                  {loading ? 
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : 
                    `${publications.reduce((total, pub) => total + (pub.downloads || 0), 0).toLocaleString()}+`
                  }
                </div>
                <div className="text-sm text-muted-foreground">{isEn ? "Downloads" : "تحميل"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-500 mb-1">
                  {loading ? 
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : 
                    new Set(publications.flatMap(pub => pub.tags)).size
                  }
                </div>
                <div className="text-sm text-muted-foreground">{isEn ? "Topics" : "مواضيع"}</div>
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
                placeholder={isEn ? "Search publications..." : "البحث في المنشورات..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
              >
                <option value="all">{isEn ? "All Types" : "جميع الأنواع"}</option>
                {publicationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
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
              <GraduationCap className="w-4 h-4" />
              <span>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isEn ? "Loading publications..." : "جاري تحميل المنشورات..."}
                  </span>
                ) : (
                  isEn 
                    ? `Showing ${publications.length} of ${pagination.totalCount} publications`
                    : `عرض ${publications.length} من ${pagination.totalCount} منشور`
                )}
              </span>
            </div>
            {searchTerm && (
              <div className="flex items-center gap-2">
                <span>{isEn ? "Search:" : "بحث:"}</span>
                <span className="px-2 py-1 bg-green-600/10 text-green-600 rounded-full text-xs">
                  {searchTerm}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Publications Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "Loading publications..." : "جاري تحميل المنشورات..."}
              </h3>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">
                {isEn ? "Error loading publications" : "خطأ في تحميل المنشورات"}
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => fetchPublications()}
                className="bg-green-600 hover:bg-green-700"
              >
                {isEn ? "Try Again" : "حاول مرة أخرى"}
              </Button>
            </motion.div>
          ) : publications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No publications found" : "لم يتم العثور على منشورات"}
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
              {publications.map((publication, idx) => (
                <motion.div
                  key={publication.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  {viewMode === "grid" ? (
                    <Link href={`/${locale}/media/publications/${publication.slug}`}>
                      <div className="group bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          {publication.coverImageUrl ? (
                            <Image 
                              src={publication.coverImageUrl} 
                              alt={isEn ? publication.titleEn || "Publication" : publication.titleAr || "منشور"} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-green-600/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Publication Type Badge */}
                          <div className="absolute top-4 left-4 bg-green-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {publication.tags.length > 0 ? publication.tags[0] : (isEn ? "Publication" : "منشور")}
                          </div>
                          
                          {/* Download Button */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownload(publication);
                              }}
                              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white border-2 hover:border-[--brand-primary] transition-colors cursor-pointer"
                            >
                              <Download className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {isEn ? publication.titleEn : publication.titleAr}
                          </h3>
                          {(isEn ? publication.descriptionEn : publication.descriptionAr) && (
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                              {isEn ? publication.descriptionEn : publication.descriptionAr}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {publication.publishedAt && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(publication.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              <span>{publication.downloads || 0}</span>
                            </div>
                            {publication.pageViews && (
                              <div className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                <span>{publication.pageViews} {isEn ? 'views' : 'عرض'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-gradient-to-r from-background to-green-50/30 dark:to-green-950/10 border border-border rounded-3xl p-6 hover:shadow-xl transition-all duration-500">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/4">
                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                            {publication.coverImageUrl ? (
                              <Image
                                src={publication.coverImageUrl}
                                alt={isEn ? publication.titleEn || "Publication" : publication.titleAr || "منشور"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-green-600/50" />
                              </div>
                            )}
                            <div className="absolute top-2 left-2 bg-green-600/90 text-white px-2 py-1 rounded text-xs">
                              {publication.tags.length > 0 ? publication.tags[0] : (isEn ? "Publication" : "منشور")}
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-3/4 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">
                              {isEn ? publication.titleEn : publication.titleAr}
                            </h3>
                            {(isEn ? publication.descriptionEn : publication.descriptionAr) && (
                              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                {isEn ? publication.descriptionEn : publication.descriptionAr}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {publication.publishedAt && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(publication.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span>{publication.downloads || 0} {isEn ? 'downloads' : 'تحميل'}</span>
                              </div>
                              {publication.pageViews && (
                                <div className="flex items-center gap-1">
                                  <Award className="w-4 h-4" />
                                  <span>{publication.pageViews} {isEn ? 'views' : 'عرض'}</span>
                                </div>
                              )}
                              {publication.authorEn && (
                                <div className="flex items-center gap-1">
                                  <GraduationCap className="w-4 h-4" />
                                  <span>{isEn ? publication.authorEn : publication.authorAr}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/${locale}/media/publications/${publication.slug}`}>
                                  {isEn ? "Read More" : "قراءة المزيد"}
                                </Link>
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                                onClick={() => handleDownload(publication)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                {isEn ? "Download" : "تحميل"}
                              </Button>
                            </div>
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
          <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 rounded-3xl p-8 lg:p-12 border border-green-200/50 dark:border-green-800/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-green-600" />
              <GraduationCap className="w-6 h-6 text-emerald-500" />
              <Award className="w-6 h-6 text-teal-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
              {isEn ? "Knowledge for Impact" : "المعرفة للتأثير"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Access research-backed insights and practical guides to support your own initiatives. Subscribe to receive new publications and updates directly."
                : "الوصول إلى الرؤى المدعومة بالأبحاث والأدلة العملية لدعم مبادراتك الخاصة. اشترك لتلقي المنشورات الجديدة والتحديثات مباشرة."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                <Link href={`/${locale}/newsletter`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {isEn ? "Subscribe Newsletter" : "اشترك في النشرة"}
                </Link>
              </Button>
              {/* <Button asChild variant="outline" size="lg" className="border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/30">
                <Link href={`/${locale}/research`}>
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {isEn ? "Request Research" : "طلب بحث"}
                </Link>
              </Button> */}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}