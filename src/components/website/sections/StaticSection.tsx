"use client";

import { Users, Heart, MapPin, Award, Droplet, GraduationCap, Stethoscope, TreePine, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { LucideIcon } from "lucide-react";
// import { formatLargeNumber } from "@/utils/formatLargeNumber";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Statistic {
  icon: string;
  titleEn: string;
  titleAr: string;
  value: number;
  unitEn: string;
  unitAr: string;
}

const getLucideIcon = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Users,
    Heart,
    MapPin,
    Award,
    Droplet,
    GraduationCap,
    Stethoscope,
    TreePine,
  };
  return iconMap[iconName] || Users;
};

const mockStatistics: Statistic[] = [
  {
    icon: "Users",
    titleEn: "People Served",
    titleAr: "الأشخاص المخدومون",
    value: 25000,
    unitEn: "Beneficiaries",
    unitAr: "مستفيد",
  },
  {
    icon: "MapPin",
    titleEn: "Communities Reached",
    titleAr: "المجتمعات المخدومة",
    value: 85,
    unitEn: "Villages",
    unitAr: "قرية",
  },
  {
    icon: "Droplet",
    titleEn: "Clean Water Access",
    titleAr: "الوصول للمياه النظيفة",
    value: 120,
    unitEn: "Wells Built",
    unitAr: "بئر منشأ",
  },
  {
    icon: "GraduationCap",
    titleEn: "Educational Programs",
    titleAr: "البرامج التعليمية",
    value: 15,
    unitEn: "Programs",
    unitAr: "برنامج",
  },
  {
    icon: "Stethoscope",
    titleEn: "Medical Missions",
    titleAr: "البعثات الطبية",
    value: 42,
    unitEn: "Missions",
    unitAr: "بعثة",
  },
  {
    icon: "TreePine",
    titleEn: "Trees Planted",
    titleAr: "الأشجار المزروعة",
    value: 8500,
    unitEn: "Trees",
    unitAr: "شجرة",
  },
];

// Counter animation hook
function useCountAnimation(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [end, duration, isVisible]);

  return { count, setIsVisible };
}

export default function StaticSection({ locale }: { locale: string }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isEnglish = locale === "en";

  // Set animation flag when component comes into view
  if (isInView && !hasAnimated) {
    setHasAnimated(true);
  }

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-br from-background via-brand-primary/3 to-brand-secondary/5 dark:from-background dark:via-brand-primary/5 dark:to-brand-secondary/8 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--brand-primary) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-brand-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-secondary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 text-brand-primary rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            {isEnglish ? "Impact Dashboard" : "لوحة التأثير"}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
              {isEnglish ? "Our Impact in Numbers" : "تأثيرنا بالأرقام"}
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {isEnglish 
              ? "These numbers represent the real lives touched and communities transformed through our dedicated work and your generous support."
              : "هذه الأرقام تمثل الحياة الحقيقية التي تم لمسها والمجتمعات التي تم تحويلها من خلال عملنا المتفاني ودعمكم السخي."
            }
          </p>
        </motion.div>

        {/* Main Statistics Dashboard */}
        <div className="max-w-7xl mx-auto">
          {/* Featured Stats - Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {mockStatistics.slice(0, 3).map((stat, index) => {
              const Icon = getLucideIcon(stat.icon);
              const { count, setIsVisible } = useCountAnimation(stat.value);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  onViewportEnter={() => hasAnimated && setIsVisible(true)}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group"
                >
                  <div className="relative p-8 bg-background/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-brand-primary/10 dark:border-brand-primary/20 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon */}
                    <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-brand-primary" />
                    </div>
                    
                    {/* Counter */}
                    <div className="relative text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                      {count}
                    </div>
                    
                    {/* Title */}
                    <div className="relative text-lg font-semibold text-foreground mb-2">
                      {isEnglish ? stat.titleEn : stat.titleAr}
                    </div>
                    
                    {/* Unit */}
                    <div className="relative text-sm text-muted-foreground">
                      {isEnglish ? stat.unitEn : stat.unitAr}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative mt-4 h-2 bg-brand-primary/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={hasAnimated ? { width: `${Math.min((stat.value / Math.max(...mockStatistics.map(s => s.value))) * 100, 100)}%` } : { width: 0 }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Secondary Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {mockStatistics.slice(3).map((stat, index) => {
              const Icon = getLucideIcon(stat.icon);
              const { count, setIsVisible } = useCountAnimation(stat.value);
              
              return (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  onViewportEnter={() => hasAnimated && setIsVisible(true)}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group"
                >
                  <div className="relative p-6 bg-background/60 backdrop-blur-sm rounded-2xl border border-brand-secondary/10 dark:border-brand-secondary/20 hover:border-brand-secondary/30 dark:hover:border-brand-secondary/40 transition-all duration-300 overflow-hidden">
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-14 h-14 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-brand-secondary" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="text-2xl font-bold text-brand-secondary mb-1">
                          {count.toLocaleString()}
                        </div>
                        <div className="text-sm font-medium text-foreground mb-1 truncate">
                          {isEnglish ? stat.titleEn : stat.titleAr}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isEnglish ? stat.unitEn : stat.unitAr}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/10 dark:from-brand-primary/20 dark:via-brand-secondary/20 dark:to-brand-primary/20 rounded-2xl">
            <TrendingUp className="w-6 h-6 text-brand-primary" />
            <div className="text-lg font-semibold text-foreground">
              {isEnglish 
                ? "Growing impact every day through community partnership" 
                : "تأثير متزايد كل يوم من خلال الشراكة المجتمعية"
              }
            </div>
            <PieChart className="w-6 h-6 text-brand-secondary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}