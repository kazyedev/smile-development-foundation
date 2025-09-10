"use client";

import { mockReports } from "@/data/mockReports";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { BarChart3, Search, Filter, Grid, List, TrendingUp, Calendar, Users, Target, Download, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MediaReportsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock report categories
  const reportCategories = ["Impact", "Financial", "Research", "Annual", "Project", "Evaluation"];

  // Filter reports based on search and category
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = searchTerm === "" || 
      (isEn ? report.titleEn : report.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isEn ? report.descriptionEn : report.descriptionAr)?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      reportCategories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50/20 dark:to-slate-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-50/50 via-gray-50/30 to-zinc-50/20 dark:from-slate-950/20 dark:via-gray-950/10 dark:to-zinc-950/5">
        {/* Data/Analytics Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-20 left-20 w-16 h-4 bg-slate-400 rounded-full"></div>
          <div className="absolute top-24 left-20 w-12 h-4 bg-gray-400/50 rounded-full"></div>
          <div className="absolute top-28 left-20 w-8 h-4 bg-zinc-400/30 rounded-full"></div>
          <div className="absolute top-1/3 right-24 w-20 h-16 border-2 border-slate-400 rounded-lg"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-20 bg-gray-400/20 rounded-lg"></div>
          <div className="absolute top-1/4 left-1/2 w-12 h-12 border-2 border-zinc-400 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              {isEn ? "Data & Analytics" : "البيانات والتحليلات"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-600 via-gray-500 to-zinc-500 bg-clip-text text-transparent">
                {isEn ? "Reports & Analysis" : "التقارير والتحليلات"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Discover data-driven insights through comprehensive reports that measure our impact, track progress, and guide future strategies. Access detailed analysis and transparent reporting on all our initiatives."
                : "اكتشف الرؤى المدفوعة بالبيانات من خلال التقارير الشاملة التي تقيس تأثيرنا وتتبع التقدم وتوجه الاستراتيجيات المستقبلية. الوصول إلى التحليل المفصل والتقارير الشفافة لجميع مبادراتنا."
              }
            </p>

            {/* Reports Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600 mb-1">{mockReports.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Reports" : "تقرير"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-500 mb-1">98%</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Transparency" : "شفافية"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-500 mb-1">15K+</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Data Points" : "نقطة بيانات"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600 mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Access" : "وصول"}</div>
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
                placeholder={isEn ? "Search reports..." : "البحث في التقارير..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Target className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
              >
                <option value="all">{isEn ? "All Categories" : "جميع الفئات"}</option>
                {reportCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
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
              <TrendingUp className="w-4 h-4" />
              <span>
                {isEn 
                  ? `Showing ${filteredReports.length} of ${mockReports.length} reports`
                  : `عرض ${filteredReports.length} من ${mockReports.length} تقرير`
                }
              </span>
            </div>
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2">
                <span>{isEn ? "Category:" : "الفئة:"}</span>
                <span className="px-2 py-1 bg-slate-600/10 text-slate-600 rounded-full text-xs">
                  {selectedCategory}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Reports Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredReports.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No reports found" : "لم يتم العثور على تقارير"}
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
              {filteredReports.map((report, idx) => (
                <motion.div
                  key={report.slugEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  {viewMode === "grid" ? (
                    <Link href={`/${locale}/media/reports/${isEn ? report.slugEn : report.slugAr}`}>
                      <div className="group bg-gradient-to-br from-slate-50/50 to-gray-50/30 dark:from-slate-950/20 dark:to-gray-950/10 border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {report.featuredImageUrl ? (
                            <Image 
                              src={report.featuredImageUrl} 
                              alt={isEn ? report.titleEn : report.titleAr} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 flex items-center justify-center">
                              <BarChart3 className="w-16 h-16 text-slate-600/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Report Type Badge */}
                          <div className="absolute top-4 left-4 bg-slate-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {reportCategories[Math.floor(Math.random() * reportCategories.length)]}
                          </div>
                          
                          {/* Analytics Icon */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                              <TrendingUp className="w-4 h-4 text-gray-700" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-slate-600 transition-colors">
                            {isEn ? report.titleEn : report.titleAr}
                          </h3>
                          {report.descriptionEn && (
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                              {isEn ? report.descriptionEn : report.descriptionAr}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(report.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{Math.floor(Math.random() * 500) + 100} {isEn ? 'readers' : 'قارئ'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-gradient-to-r from-background to-slate-50/30 dark:to-slate-950/10 border border-border rounded-3xl p-6 hover:shadow-xl transition-all duration-500">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/4">
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                            {report.featuredImageUrl ? (
                              <Image
                                src={report.featuredImageUrl}
                                alt={isEn ? report.titleEn : report.titleAr}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 flex items-center justify-center">
                                <BarChart3 className="w-12 h-12 text-slate-600/50" />
                              </div>
                            )}
                            <div className="absolute top-2 left-2 bg-slate-600/90 text-white px-2 py-1 rounded text-xs">
                              {reportCategories[Math.floor(Math.random() * reportCategories.length)]}
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-3/4 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">
                              {isEn ? report.titleEn : report.titleAr}
                            </h3>
                            {report.descriptionEn && (
                              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                {isEn ? report.descriptionEn : report.descriptionAr}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(report.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 500) + 100} {isEn ? 'readers' : 'قارئ'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>{isEn ? 'Analytical' : 'تحليلي'}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/${locale}/media/reports/${isEn ? report.slugEn : report.slugAr}`}>
                                  {isEn ? "View Report" : "عرض التقرير"}
                                </Link>
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white">
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
          <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/30 dark:from-slate-950/20 dark:to-gray-950/10 rounded-3xl p-8 lg:p-12 border border-slate-200/50 dark:border-slate-800/30">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-slate-600" />
              <TrendingUp className="w-6 h-6 text-gray-500" />
              <Target className="w-6 h-6 text-zinc-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-600 to-zinc-500 bg-clip-text text-transparent">
              {isEn ? "Data-Driven Transparency" : "الشفافية المدفوعة بالبيانات"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Stay informed with regular updates and detailed reports. Subscribe to receive the latest findings and analysis from our ongoing work and research initiatives."
                : "ابق على اطلاع مع التحديثات المنتظمة والتقارير المفصلة. اشترك لتلقي أحدث النتائج والتحليلات من عملنا المستمر ومبادرات البحث."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white">
                <Link href={`/${locale}/newsletter`}>
                  <FileText className="w-4 h-4 mr-2" />
                  {isEn ? "Subscribe Updates" : "اشترك في التحديثات"}
                </Link>
              </Button>
              {/* <Button asChild variant="outline" size="lg" className="border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950/30">
                <Link href={`/${locale}/contact`}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {isEn ? "Request Data" : "طلب بيانات"}
                </Link>
              </Button> */}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}