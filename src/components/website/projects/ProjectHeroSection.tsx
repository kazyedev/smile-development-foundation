"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Eye, Users, ArrowLeft, ArrowRight, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";

interface ProjectHeroSectionProps {
  project: Project;
  locale: string;
  isEn: boolean;
}

export default function ProjectHeroSection({ project, locale, isEn }: ProjectHeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prepare images array: featured image + banner images
  const images = [
    { url: project?.featuredImageUrl || '', title: isEn ? project?.titleEn : project?.titleAr },
    ...(project?.banners?.map(banner => ({
      url: banner.imageUrl,
      title: isEn ? banner.titleEn : banner.titleAr
    })) || [])
  ].filter(img => img.url); // Filter out empty URLs

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

              {/* <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                {isEn ? project.descriptionEn : project.descriptionAr}
              </p> */}

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
  );
}
