'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, Users, Target } from 'lucide-react';

interface HeroSectionProps {
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  isLocaleEnglish: boolean;
}

export default function HeroSection({ title, subtitle, description, isLocaleEnglish }: HeroSectionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-secondary/80" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-white/20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Heart className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 text-white/20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Users className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/3 text-white/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <Target className="w-8 h-8" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Sparkles icon */}
          <motion.div 
            className="flex justify-center mb-6"
            variants={fadeInUp}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
            variants={fadeInUp}
          >
            {isLocaleEnglish ? title.en : title.ar}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 font-medium leading-relaxed"
            variants={fadeInUp}
          >
            {isLocaleEnglish ? subtitle.en : subtitle.ar}
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {isLocaleEnglish ? description.en : description.ar}
          </motion.p>

          {/* Decorative line */}
          <motion.div 
            className="w-24 h-1 bg-white/30 mx-auto mt-8 rounded-full"
            variants={fadeInUp}
          />
        </motion.div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
