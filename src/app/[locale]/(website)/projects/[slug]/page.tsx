"use client";

import { mockProjects } from "@/data/mockProjects";
import Image from "next/image";
import { Target, Users, Calendar, Eye, ArrowLeft, Share2, Bookmark, Download, CheckCircle, DollarSign, Gift, ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/website/ProjectCard";

export default function ProjectDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decoded = decodeURIComponent(slug);
  const isEn = locale === 'en';
  const project = mockProjects.find(p => p.slugEn === decoded || p.slugAr === decoded);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prepare images array: featured image + banner images
  const images = [
    { url: project?.featuredImageUrl || '', title: isEn ? project?.titleEn : project?.titleAr },
    ...(project?.banners?.map(banner => ({
      url: banner.imageUrl,
      title: isEn ? banner.titleEn : banner.titleAr
    })) || [])
  ].filter(img => img.url); // Filter out empty URLs

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

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
          {/* Image Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]?.url || project.featuredImageUrl}
                alt={images[currentImageIndex]?.title || (isEn ? project.titleEn : project.titleAr)}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Carousel Navigation */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all duration-300 border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all duration-300 border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                      }`}
                  />
                ))}
              </div>

              {/* Image Counter
              <div className="absolute top-15 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full text-sm border border-white/20">
                {currentImageIndex + 1} / {images.length}
              </div> */}
            </>
          )}

          {/* Navigation */}
          <div className={`absolute ${isEn ? 'top-15 left-6' : 'top-15 right-6'} z-10`}>
            <Button asChild variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Link href={`/${locale}/projects`}>
                {isEn ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                {isEn ? 'Back to Projects' : 'العودة للمشاريع'}
              </Link>
            </Button>
          </div>

          {/* Action Buttons */}
          <div className={`absolute ${isEn ? 'top-15 right-6' : 'top-15 left-6'} z-10 flex gap-2`}>
            <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Share2 className="w-4 h-4" />
            </Button>
            {/* <Button variant="secondary" size="sm" className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30">
              <Bookmark className="w-4 h-4" />
            </Button> */}
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
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
        {/* Video Section */}
        {project.videoUrl && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mb-4">
                <Play className="w-4 h-4" />
                {isEn ? 'Project Video' : 'فيديو المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'Watch Our Project in Action' : 'شاهد مشروعنا في العمل'}
              </h2>
            </div>

            <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={project.videoUrl.replace('watch?v=', 'embed/')}
                title={isEn ? project.titleEn : project.titleAr}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.section>
        )}

        {/* Project Goals and Impact Combined Section */}
        {(project.goalsEn?.length || project.statics?.length) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                {isEn ? 'Goals & Impact' : 'الأهداف والتأثير'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'What We Aim to Achieve & Our Impact' : 'ما نهدف إلى تحقيقه وتأثيرنا'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Goals */}
              {project.goalsEn?.length && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center ">
                    {isEn ? 'Project Goals' : 'أهداف المشروع'}
                  </h3>
                  <div className="space-y-4">
                    {(isEn ? project.goalsEn : project.goalsAr).map((goal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-background border border-border rounded-xl hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base mb-1">{isEn ? `Goal ${index + 1}` : `الهدف ${index + 1}`}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{goal}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Impact */}
              {project.statics?.length && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-center ">
                    {isEn ? 'Project Impact' : 'احصائيات المشروع'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.statics.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center p-4 bg-gradient-to-br from-background to-muted/30 border border-border rounded-xl hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="text-sm font-medium text-foreground mb-1">
                          {isEn ? stat.titleEn : stat.titleAr}
                        </div>
                        <div className="text-3xl font-bold text-brand-primary mb-1 group-hover:scale-110 transition-transform">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isEn ? stat.unitEn : stat.unitAr}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}



        {/* Stakeholders Section (Funding Providers, Donors, Partners) */}
        {(project.fundingProviders?.length || project.donors?.length || project.partners?.length) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                {isEn ? 'Project Stakeholders' : 'أصحاب المصلحة في المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'Our Partners & Supporters' : 'شركاؤنا والداعمون'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Funding Providers */}
              {project.fundingProviders?.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 rounded-3xl border border-green-200/50 dark:border-green-800/30 p-6"
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/50 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/30 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
                  </div>

                  <div className="relative">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium mb-3">
                        <DollarSign className="w-3 h-3" />
                        {isEn ? 'Funding Providers' : 'مزودي التمويل'}
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground">
                        {isEn ? 'Financial Support' : 'الدعم المالي'}
                      </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      {project.fundingProviders.map((provider, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-200/50 dark:border-green-800/30 rounded-xl hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-900/20 transition-all duration-300 w-[120px] sm:w-[140px]"
                        >
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
                            {provider.imageUrl ? (
                              <Image
                                src={provider.imageUrl}
                                alt={isEn ? provider.nameEn : provider.nameAr}
                                width={32}
                                height={32}
                                className="rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${provider.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                          <h4 className="font-medium text-xs text-foreground leading-tight">
                            {isEn ? provider.nameEn : provider.nameAr}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Donors */}
              {project.donors?.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-3xl border border-blue-200/50 dark:border-blue-800/30 p-6"
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-300/30 rounded-full blur-2xl transform translate-x-24 translate-y-24"></div>
                  </div>

                  <div className="relative">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                        <Gift className="w-3 h-3" />
                        {isEn ? 'Donors' : 'المتبرعون'}
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground">
                        {isEn ? 'Generous Contributors' : 'المساهمون الكرماء'}
                      </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      {project.donors.map((donor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/30 rounded-xl hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 transition-all duration-300 w-[120px] sm:w-[140px]"
                        >
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                            {donor.imageUrl ? (
                              <Image
                                src={donor.imageUrl}
                                alt={isEn ? donor.nameEn : donor.nameAr}
                                width={32}
                                height={32}
                                className="rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${donor.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                              <Gift className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <h4 className="font-medium text-xs text-foreground leading-tight">
                            {isEn ? donor.nameEn : donor.nameAr}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Partners */}
              {project.partners?.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden bg-gradient-to-br from-purple-50/50 to-violet-50/30 dark:from-purple-950/20 dark:to-violet-950/10 rounded-3xl border border-purple-200/50 dark:border-purple-800/30 p-6"
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-300/30 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
                  </div>

                  <div className="relative">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium mb-3">
                        <Users className="w-3 h-3" />
                        {isEn ? 'Partners' : 'الشركاء'}
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground">
                        {isEn ? 'Implementation Partners' : 'شركاء التنفيذ'}
                      </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      {project.partners.map((partner, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/30 rounded-xl hover:shadow-lg hover:shadow-purple-100/50 dark:hover:shadow-purple-900/20 transition-all duration-300 w-[120px] sm:w-[140px]"
                        >
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
                            {partner.imageUrl ? (
                              <Image
                                src={partner.imageUrl}
                                alt={isEn ? partner.nameEn : partner.nameAr}
                                width={32}
                                height={32}
                                className="rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${partner.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                          </div>
                          <h4 className="font-medium text-xs text-foreground leading-tight">
                            {isEn ? partner.nameEn : partner.nameAr}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Deliverables and Resources Combined */}
        {(project.deliverables?.length || project.resources?.length) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                <Gift className="w-4 h-4" />
                {isEn ? 'Project Outputs & Resources' : 'مخرجات وموارد المشروع'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {isEn ? 'What We Deliver & Include' : 'موارد ومخرجات المشروع'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                {isEn 
                  ? 'Explore our deliverables and the resources provided as part of this project.'
                  : 'استكشف مخرجاتنا والموارد المقدمة كجزء من هذا المشروع.'
                }
              </p>
            </div>

            <div className="relative">
              {/* Vertical Divider - Only visible on desktop */}
              {project.deliverables?.length && project.resources?.length && (
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 z-10">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Deliverables Section */}
                {project.deliverables?.length && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                        <Gift className="w-3 h-3" />
                        {isEn ? 'Deliverables' : 'المخرجات'}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {isEn ? 'What We Deliver' : 'ما قمنا بتقديمه'}
                      </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                      {project.deliverables.map((deliverable, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-6 bg-background border border-border rounded-2xl text-center hover:shadow-lg transition-shadow duration-300 min-w-[200px] max-w-[280px] flex-1"
                        >
                          <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-3">
                            {deliverable.value}
                          </div>
                          <h4 className="font-semibold text-lg mb-2 text-foreground">
                            {isEn ? deliverable.titleEn : deliverable.titleAr}
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            {isEn ? deliverable.unitEn : deliverable.unitAr}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources Section */}
                {project.resources?.length && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium mb-3">
                        <Download className="w-3 h-3" />
                        {isEn ? 'Resources' : 'الموارد'}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {isEn ? 'What This Project Includes' : 'معدات المشروع'}
                      </h3>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                      {project.resources.map((resource, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-6 bg-background border border-border rounded-2xl min-w-[200px] max-w-[280px] flex-1"
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                              {resource.image ? (
                                <Image 
                                  src={resource.image} 
                                  alt={isEn ? resource.titleEn : resource.titleAr} 
                                  width={32} 
                                  height={32}
                                  className="rounded-lg"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <div className={`${resource.image ? 'hidden' : ''} flex items-center justify-center`}>
                                <Download className="w-8 h-8 text-muted-foreground" />
                              </div>
                            </div>
                            <h4 className="font-semibold text-lg">
                              {isEn ? resource.titleEn : resource.titleAr}
                            </h4>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Keywords and Tags */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        {/* Other Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/10 dark:from-background dark:via-brand-primary/10 dark:to-brand-secondary/5"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
          </div>

          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                {isEn ? "More Projects" : "مشاريع أخرى"}
              </div>

              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {isEn
                  ? "Discover more impactful projects that are making a real difference in communities across the region."
                  : "اكتشف المزيد من المشاريع المؤثرة التي تحدث فرقًا حقيقيًا في المجتمعات عبر المنطقة."
                }
              </p>
            </div>



            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {mockProjects
                .filter(p => p.id !== project.id) // Exclude current project
                .slice(0, 3) // Show only 3 other projects
                .map((otherProject, index) => (
                  <div
                    key={otherProject.id}
                    className="group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard project={otherProject} locale={locale} />
                  </div>
                ))}
            </div>


          </div>
        </motion.section>
      </div>
    </div>
  );
}