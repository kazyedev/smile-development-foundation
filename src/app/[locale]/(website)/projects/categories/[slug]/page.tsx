"use client";

import { mockProjectCategories } from "@/data/mockProjectCategories";
import { mockProjects } from "@/data/mockProjects";
import ProjectCard from "@/components/website/ProjectCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { use, useState } from "react";
import { FolderOpen, ArrowLeft, Target, Users, BarChart3, Grid, List, Filter, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ProjectCategoryDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default function ProjectCategoryDetailPage({ params }: ProjectCategoryDetailPageProps) {
  const { locale, slug } = use(params);
  const isEn = locale === 'en';
  const decoded = decodeURIComponent(slug);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = mockProjectCategories.find(c => c.slugEn === decoded || c.slugAr === decoded);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{isEn ? 'Category not found' : 'الفئة غير موجودة'}</h2>
          <p className="text-muted-foreground mb-6">{isEn ? 'The category you are looking for does not exist.' : 'الفئة التي تبحث عنها غير موجودة.'}</p>
          <Button asChild>
            <Link href={`/${locale}/projects/categories`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isEn ? 'Back to Categories' : 'العودة للفئات'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const allProjects = mockProjects.filter(p => p.categoryId === category.id);
  
  // Filter projects based on search
  const filteredProjects = allProjects.filter(project => {
    if (searchTerm === "") return true;
    return (isEn ? project.titleEn : project.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
           (isEn ? project.descriptionEn : project.descriptionAr).toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[50vh] lg:h-[60vh]">
          <Image 
            src={category.featuredImageUrl} 
            alt={isEn ? category.titleEn : category.titleAr} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 z-10">
            <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Link href={`/${locale}/projects/categories`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEn ? 'Back to Categories' : 'العودة للفئات'}
              </Link>
            </Button>
          </div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30 mb-6">
                  <FolderOpen className="w-4 h-4" />
                  {isEn ? "Project Category" : "فئة المشاريع"}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isEn ? category.titleEn : category.titleAr}
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                  {isEn ? category.descriptionEn : category.descriptionAr}
                </p>

                {/* Category Stats */}
                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{allProjects.length} {isEn ? 'Projects' : 'مشروع'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{isEn ? 'Active Category' : 'فئة نشطة'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>{isEn ? 'High Impact' : 'تأثير عالي'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-16 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-2xl">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-2">{allProjects.length}</h3>
              <p className="text-muted-foreground">{isEn ? 'Active Projects' : 'مشروع نشط'}</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-brand-secondary/5 to-brand-secondary/10 rounded-2xl">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary mb-2">15K+</h3>
              <p className="text-muted-foreground">{isEn ? 'People Impacted' : 'شخص تأثر'}</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-2xl">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">95%</h3>
              <p className="text-muted-foreground">{isEn ? 'Success Rate' : 'معدل النجاح'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Search & Filter */}
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
                placeholder={isEn ? "Search projects in this category..." : "البحث في مشاريع هذه الفئة..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
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
                  ? `Showing ${filteredProjects.length} of ${allProjects.length} projects`
                  : `عرض ${filteredProjects.length} من ${allProjects.length} مشروع`
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>{isEn ? "Category:" : "الفئة:"}</span>
              <span className="px-2 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-xs">
                {isEn ? category.titleEn : category.titleAr}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No projects found" : "لم يتم العثور على مشاريع"}
              </h3>
              <p className="text-muted-foreground">
                {isEn 
                  ? "Try adjusting your search terms"
                  : "جرب تعديل مصطلحات البحث"
                }
              </p>
            </motion.div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.slugEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  {viewMode === "grid" ? (
                    <ProjectCard project={project} locale={locale} />
                  ) : (
                    <div className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3">
                          <img
                            src={project.featuredImageUrl}
                            alt={isEn ? project.titleEn : project.titleAr}
                            className="w-full h-48 lg:h-32 object-cover rounded-xl"
                          />
                        </div>
                        <div className="lg:w-2/3 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              {isEn ? project.titleEn : project.titleAr}
                            </h3>
                            <p className="text-muted-foreground line-clamp-2">
                              {isEn ? project.descriptionEn : project.descriptionAr}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(isEn ? project.tagsEn : project.tagsAr).slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{project.pageViews.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                <span>{isEn ? "Active" : "نشط"}</span>
                              </div>
                            </div>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/${locale}/projects/${isEn ? project.slugEn : project.slugAr}`}>
                                {isEn ? "View Project" : "عرض المشروع"}
                              </Link>
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
    </div>
  );
}