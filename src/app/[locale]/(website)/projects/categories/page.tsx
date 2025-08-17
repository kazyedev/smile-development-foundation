"use client";

import { mockProjectCategories } from "@/data/mockProjectCategories";
import { mockProjects } from "@/data/mockProjects";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FolderOpen, ArrowRight, Target, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectCategoriesPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'en';
  const isEn = locale === 'en';

  // Calculate projects count per category
  const categoriesWithCount = mockProjectCategories.map(category => ({
    ...category,
    projectCount: mockProjects.filter(project => project.categoryId === category.id).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-brand-secondary/5 via-background to-brand-primary/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, var(--brand-secondary) 1px, transparent 1px), radial-gradient(circle at 80% 20%, var(--brand-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 text-brand-secondary rounded-full text-sm font-medium mb-6">
              <FolderOpen className="w-4 h-4" />
              {isEn ? "Project Categories" : "فئات المشاريع"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent">
                {isEn ? "Categories" : "الفئات"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn 
                ? "Discover our diverse project categories, each focused on specific areas of impact and community development. Browse by category to find projects that align with your interests."
                : "اكتشف فئات مشاريعنا المتنوعة، كل فئة تركز على مجالات محددة من التأثير والتنمية المجتمعية. تصفح حسب الفئة للعثور على المشاريع التي تتماشى مع اهتماماتك."
              }
            </p>

            {/* Categories Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-secondary mb-1">{categoriesWithCount.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Categories" : "فئة"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary mb-1">{mockProjects.length}</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Total Projects" : "إجمالي المشاريع"}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-secondary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">{isEn ? "Focus Areas" : "مجال تركيز"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithCount.map((category, idx) => (
              <motion.div
                key={category.slugEn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group"
              >
                <Link href={`/${locale}/projects/categories/${isEn ? category.slugEn : category.slugAr}`}>
                  <div className="bg-background border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                    {/* Category Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image 
                        src={category.featuredImageUrl} 
                        alt={isEn ? category.titleEn : category.titleAr} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Project Count Badge */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                        {category.projectCount} {isEn ? 'Projects' : 'مشروع'}
                      </div>
                      
                      {/* Category Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-secondary transition-colors">
                          {isEn ? category.titleEn : category.titleAr}
                        </h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <Target className="w-4 h-4" />
                          <span>{isEn ? 'Explore Category' : 'استكشف الفئة'}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Content */}
                    <div className="p-6">
                      <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {isEn ? category.descriptionEn : category.descriptionAr}
                      </p>
                      
                      {/* Category Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            <span>{category.projectCount} {isEn ? 'Projects' : 'مشروع'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{isEn ? 'Active' : 'نشط'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Explore Button */}
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-all duration-300"
                      >
                        {isEn ? 'Explore Projects' : 'استكشف المشاريع'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
          <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-3xl p-8 lg:p-12 border border-brand-primary/20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {isEn ? "Can't find what you're looking for?" : "لا تجد ما تبحث عنه؟"}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Browse all our projects or contact us to learn about new initiatives and ways to get involved."
                : "تصفح جميع مشاريعنا أو تواصل معنا لتتعرف على المبادرات الجديدة وطرق المشاركة."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white">
                <Link href={`/${locale}/projects`}>
                  <Target className="w-4 h-4 mr-2" />
                  {isEn ? "View All Projects" : "عرض جميع المشاريع"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/contact`}>
                  <Users className="w-4 h-4 mr-2" />
                  {isEn ? "Contact Us" : "تواصل معنا"}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}