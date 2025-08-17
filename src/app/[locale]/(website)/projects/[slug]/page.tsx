"use client";

import { mockProjects } from "@/data/mockProjects";
import Image from "next/image";
import { Target, Users, Calendar, Eye, ArrowLeft, Share2, Bookmark, Download, CheckCircle, DollarSign, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decoded = decodeURIComponent(slug);
  const isEn = locale === 'en';
  const project = mockProjects.find(p => p.slugEn === decoded || p.slugAr === decoded);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{isEn ? 'Project not found' : 'المشروع غير موجود'}</h2>
          <p className="text-muted-foreground mb-6">{isEn ? 'The project you are looking for does not exist.' : 'المشروع الذي تبحث عنه غير موجود.'}</p>
          <Button asChild>
            <Link href={`/${locale}/projects`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isEn ? 'Back to Projects' : 'العودة للمشاريع'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[60vh] lg:h-[70vh]">
          <Image 
            src={project.featuredImageUrl} 
            alt={isEn ? project.titleEn : project.titleAr} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 z-10">
            <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Link href={`/${locale}/projects`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEn ? 'Back to Projects' : 'العودة للمشاريع'}
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Bookmark className="w-4 h-4" />
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
                <div className="flex items-center gap-4 mb-6">
                  {(isEn ? project.tagsEn : project.tagsAr).slice(0, 2).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {isEn ? project.titleEn : project.titleAr}
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                  {isEn ? project.descriptionEn : project.descriptionAr}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{project.pageViews.toLocaleString(isEn ? 'en-US' : 'ar-EG')} {isEn ? 'views' : 'مشاهدة'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{isEn ? 'Active Project' : 'مشروع نشط'}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Project Goals */}
        {project.goalsEn?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                {isEn ? 'Project Goals' : 'أهداف المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'What We Aim to Achieve' : 'ما نهدف إلى تحقيقه'}
              </h2>
            </div>
            
            <div className="grid gap-6">
              {(isEn ? project.goalsEn : project.goalsAr).map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-background border border-border rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{isEn ? `Goal ${index + 1}` : `الهدف ${index + 1}`}</h3>
                    <p className="text-muted-foreground leading-relaxed">{goal}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {/* Impact Statistics */}
        {project.statics?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                {isEn ? 'Project Impact' : 'تأثير المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'Real Results, Real Impact' : 'نتائج حقيقية، تأثير حقيقي'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.statics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-background to-muted/30 border border-border rounded-2xl hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl font-bold text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                    {stat.value.toLocaleString(isEn ? 'en-US' : 'ar-EG')}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    {isEn ? stat.titleEn : stat.titleAr}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isEn ? stat.unitEn : stat.unitAr}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {/* Financial Contributions */}
        {project.financialContributions?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                <DollarSign className="w-4 h-4" />
                {isEn ? 'Funding Partners' : 'شركاء التمويل'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'Financial Support' : 'الدعم المالي'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.financialContributions.map((contribution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-background border border-border rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{isEn ? contribution.nameEn : contribution.nameAr}</h3>
                    <div className="text-2xl font-bold text-green-600">{contribution.percentage}%</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${contribution.percentage}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {/* Deliverables */}
        {project.deliverables?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                <Gift className="w-4 h-4" />
                {isEn ? 'Project Deliverables' : 'مخرجات المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'What We Deliver' : 'ما نقدمه'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.deliverables.map((deliverable, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-background border border-border rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-lg mb-3">{isEn ? deliverable.titleEn : deliverable.titleAr}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">{deliverable.value}</span>
                    <span className="text-muted-foreground">{isEn ? deliverable.unitEn : deliverable.unitAr}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {/* Resources */}
        {project.resources?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                <Download className="w-4 h-4" />
                {isEn ? 'Project Resources' : 'موارد المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'Available Resources' : 'الموارد المتاحة'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-background border border-border rounded-2xl hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      {resource.iconImageUrl ? (
                        <Image src={resource.iconImageUrl} alt={isEn ? resource.titleEn : resource.titleAr} width={24} height={24} />
                      ) : (
                        <span className="text-lg">{resource.icon}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{isEn ? resource.titleEn : resource.titleAr}</h3>
                      <p className="text-muted-foreground text-sm">{isEn ? 'Download Resource' : 'تحميل المورد'}</p>
                    </div>
                    <Download className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {/* Keywords and Tags */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold mb-6">
            {isEn ? 'Project Keywords & Tags' : 'الكلمات المفتاحية والوسوم'}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(isEn ? project.keywordsEn : project.keywordsAr).map((keyword) => (
              <span key={keyword} className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-brand-primary/10 hover:text-brand-primary transition-colors cursor-pointer">
                {keyword}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {(isEn ? project.tagsEn : project.tagsAr).map((tag) => (
              <span key={tag} className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium hover:bg-brand-primary/20 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}