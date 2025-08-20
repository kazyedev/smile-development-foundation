"use client";

import { mockProjects } from "@/data/mockProjects";
import ProjectCard from "@/components/website/ProjectCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Target, Users, MapPin, Filter, Search, Grid, List, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter projects based on search and category
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = searchTerm === "" || 
      (isEn ? project.titleEn : project.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isEn ? project.descriptionEn : project.descriptionAr).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      (isEn ? project.tagsEn : project.tagsAr).some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const allCategories = Array.from(new Set(
    mockProjects.flatMap(project => isEn ? project.tagsEn : project.tagsAr)
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-brand-primary/5 via-background to-brand-secondary/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, var(--brand-primary) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--brand-secondary) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              {isEn ? "Our Projects Portfolio" : "محفظة مشاريعنا"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
        {isEn ? "Projects" : "المشاريع"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Explore our comprehensive collection of impactful projects that are creating positive change in communities across the region through innovative solutions and sustainable development."
                : "استكشف مجموعتنا الشاملة من المشاريع المؤثرة التي تحدث تغييراً إيجابياً في المجتمعات عبر المنطقة من خلال الحلول المبتكرة والتنمية المستدامة."
              }
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary mb-1">{mockProjects.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Active Projects" : "مشروع نشط"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-secondary mb-1">25K+</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Lives Impacted" : "حياة تأثرت"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary mb-1">15</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Communities" : "مجتمع"}</div>
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
                placeholder={isEn ? "Search projects..." : "البحث في المشاريع..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
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
                  ? `Showing ${filteredProjects.length} of ${mockProjects.length} projects`
                  : `عرض ${filteredProjects.length} من ${mockProjects.length} مشروع`
                }
              </span>
            </div>
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2">
                <span>{isEn ? "Filtered by:" : "مرشح بواسطة:"}</span>
                <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs">
                  {selectedCategory}
                </span>
              </div>
            )}
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
                  ? "Try adjusting your search terms or filters"
                  : "جرب تعديل مصطلحات البحث أو المرشحات"
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
                                <MapPin className="w-4 h-4" />
                                <span>{isEn ? "Multiple Locations" : "مواقع متعددة"}</span>
                              </div>
                            </div>
                            <Button asChild variant="outline" size="sm">
                              <a href={`/${locale}/projects/${isEn ? project.slugEn : project.slugAr}`}>
                                {isEn ? "View Project" : "عرض المشروع"}
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
    </div>
  );
}