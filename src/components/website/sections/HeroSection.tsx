'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { HeroSlider } from '@/types/heroSlide';

// Mock data - replace with actual data from your API/CMS
const mockSlides: HeroSlider[] = [
  {
    id: 1,
    titleEn: "Empowering Communities Through Education",
    titleAr: "تمكين المجتمعات من خلال التعليم",
    captionEn: "Join us in building a brighter future for children and families across the region",
    captionAr: "انضم إلينا في بناء مستقبل أكثر إشراقاً للأطفال والعائلات في جميع أنحاء المنطقة",
    featuredImageUrl: "/assets/hero-1.jpg",
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    titleEn: "Healthcare for Every Child",
    titleAr: "الرعاية الصحية لكل طفل",
    captionEn: "Providing essential medical care and support to underserved communities",
    captionAr: "توفير الرعاية الطبية والدعم الأساسي للمجتمعات المحرومة من الخدمات",
    featuredImageUrl: "/assets/hero-2.jpg",
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    titleEn: "Clean Water Initiative",
    titleAr: "مبادرة المياه النظيفة",
    captionEn: "Bringing safe, clean water to communities that need it most",
    captionAr: "جلب المياه الآمنة والنظيفة للمجتمعات التي تحتاجها أكثر",
    featuredImageUrl: "/assets/hero-3.jpg",
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface HeroSectionProps {
  locale?: string;
  slides?: HeroSlider[];
}

export default function HeroSection({
  locale = 'en',
  slides = mockSlides
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const publishedSlides = slides.filter(slide => slide.isPublished);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % publishedSlides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10);
  }, [publishedSlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + publishedSlides.length) % publishedSlides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10);
  }, [publishedSlides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || publishedSlides.length <= 1) return;

    const timer = setInterval(nextSlide, 8000); 
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, publishedSlides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPlaying]);

  if (publishedSlides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome</h1>
          <p className="text-xl md:text-2xl">No slides available</p>
        </div>
      </div>
    );
  }

  const current = publishedSlides[currentSlide];
  const title = locale === 'ar' ? current.titleAr : current.titleEn;
  const caption = locale === 'ar' ? current.captionAr : current.captionEn;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Slides Container */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={current.featuredImageUrl}
              alt={title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed"
                >
                  {caption}
                </motion.p>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                    Learn More
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                    Get Involved
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {publishedSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Play/Pause Button */}
      {publishedSlides.length > 1 && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-8 left-8 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Dots Indicator */}
      {publishedSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {publishedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {publishedSlides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-10 bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
          {currentSlide + 1} / {publishedSlides.length}
        </div>
      )}
    </div>
  );
}