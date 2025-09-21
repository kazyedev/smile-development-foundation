'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Target, Users, Lightbulb } from "lucide-react";
import { useHomepageData, type HomepageProject } from "@/hooks/useHomepageData";
import { ProjectsSkeletonSection } from "../skeletons/HomepageSectionSkeleton";

// Simple Project Card component
function SimpleProjectCard({ project, locale }: { project: HomepageProject; locale: string }) {
  const isEnglish = locale === "en";
  
  return (
    <div className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.featuredImageUrl}
            alt={isEnglish ? project.titleEn : project.titleAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div 
            className="absolute top-4 left-4 w-4 h-4 rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
            {isEnglish ? project.titleEn : project.titleAr}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {isEnglish ? project.descriptionEn : project.descriptionAr}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {project.pageViews.toLocaleString(isEnglish ? 'en-US' : 'ar-EG')} {isEnglish ? 'views' : 'مشاهدة'}
            </span>
            
            <Link href={`/${locale}/projects/${isEnglish ? project.slugEn : project.slugAr}`}>
              <Button size="sm" className="group/btn">
                {isEnglish ? "Learn More" : "اعرف أكثر"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockProjects: any[] = [
  {
    id: 1,
    isEnglish: true,
    isArabic: true,
    titleEn: "Clean Water Initiative",
    titleAr: "مبادرة المياه النظيفة",
    descriptionEn: "Providing access to clean water in rural communities.",
    descriptionAr: "توفير المياه النظيفة في المناطق الريفية.",
    featuredImageUrl: "/assets/hero-1.jpg",
    color: "#3B82F6",
    banners: [
      {
        titleEn: "Join the mission",
        titleAr: "انضم إلى المهمة",
        imageUrl: "https://via.placeholder.com/300x150.png?text=Banner",
      },
    ],
    goalsEn: ["Install 50 wells", "Educate locals on water safety"],
    goalsAr: ["تركيب 50 بئرًا", "توعية السكان حول سلامة المياه"],
    videoUrl: "https://example.com/video.mp4",
    statics: [
      {
        icon: "Droplet",
        titleEn: "Wells Installed",
        titleAr: "الآبار المنصوبة",
        value: 32,
        unitEn: "Wells",
        unitAr: "بئر",
      },
      {
        icon: "Droplet",
        titleEn: "Wells Installed",
        titleAr: "المياه النظيفة المتاحة",
        value: 32,
        unitEn: "Clean Water",
        unitAr: "بئر",
      },
    ],
    financialContributions: [
      {
        nameEn: "UNICEF",
        nameAr: "اليونيسف",
        percentage: 40,
      },
    ],
    deliverables: [
      {
        titleEn: "Water Pumps",
        titleAr: "مضخات المياه",
        value: "25",
        unitEn: "units",
        unitAr: "وحدة",
      },
    ],
    resources: [
      {
        titleEn: "Pump Installation Manual",
        titleAr: "دليل تركيب المضخة",
        icon: "📘",
        iconImageUrl: "https://via.placeholder.com/50.png?text=Manual",
      },
    ],
    slugEn: "clean-water-initiative",
    slugAr: "مبادرة-المياه-النظيفة",
    keywordsEn: ["water", "health", "rural"],
    keywordsAr: ["ماء", "صحة", "ريف"],
    tagsEn: ["Clean Water", "NGO"],
    tagsAr: ["مياه نظيفة", "منظمة"],
    pageViews: 123,
    programId: 1,
    categoryId: 1,
    activityIds: [1, 2],
    isPublished: true,
    publishedAt: new Date("2024-05-20"),
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 2,
    isEnglish: true,
    isArabic: true,
    titleEn: "Digital Learning Centers",
    titleAr: "مراكز التعلم الرقمي",
    descriptionEn: "Equipping youth with digital skills for the future.",
    descriptionAr: "تمكين الشباب من المهارات الرقمية للمستقبل.",
    featuredImageUrl: "/assets/hero-2.jpg",
    color: "#10B981",
    banners: [],
    goalsEn: ["Train 1,000 students", "Build 5 centers"],
    goalsAr: ["تدريب 1000 طالب", "بناء 5 مراكز"],
    videoUrl: "",
    statics: [
      {
        icon: "Book",
        titleEn: "Books Distributed",
        titleAr: "الكتب الموزعة",
        value: 1000,
        unitEn: "Books",
        unitAr: "كتاب",
      },
      {
        icon: "Laptop",
        titleEn: "Digital Labs",
        titleAr: "مختبرات رقمية",
        value: 1000,
        unitEn: "Books",
        unitAr: "كتاب",
      },
    ],
    financialContributions: [],
    deliverables: [],
    resources: [],
    slugEn: "digital-learning-centers",
    slugAr: "مراكز-التعلم-الرقمي",
    keywordsEn: ["education", "digital", "youth"],
    keywordsAr: ["تعليم", "رقمي", "شباب"],
    tagsEn: ["Education", "Tech"],
    tagsAr: ["تعليم", "تكنولوجيا"],
    pageViews: 85,
    programId: 2,
    categoryId: 2,
    activityIds: [],
    isPublished: true,
    publishedAt: new Date("2024-06-10"),
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: 3,
    isEnglish: true,
    isArabic: false,
    titleEn: "Solar Power for Schools",
    titleAr: "الطاقة الشمسية للمدارس",
    descriptionEn: "Implementing solar panels to power remote schools.",
    descriptionAr: "",
    featuredImageUrl: "/assets/hero-3.jpg",
    color: "#F59E0B",
    banners: [],
    goalsEn: ["Lower electricity costs", "Promote sustainability"],
    goalsAr: ["تخفيض تكلفة الكهرباء", "تعزيز التنمية المستدامة"],
    videoUrl: "",
    statics: [
      {
        icon: "Sun",
        titleEn: "Solar Panels Installed",
        titleAr: "الألواح الشمسية المنصوبة",
        value: 1000,
        unitEn: "Panels",
        unitAr: "لوح",
      },
      {
        icon: "BatteryFull",
        titleEn: "Battery Storage",
        titleAr: "تخزين البطاريات",
        value: 1000,
        unitEn: "Batteries",
        unitAr: "بطارية",
      },
    ],
    financialContributions: [],
    deliverables: [],
    resources: [],
    slugEn: "solar-power-schools",
    slugAr: "الطاقة الشمسية للمدارس",
    keywordsEn: ["solar", "schools", "energy"],
    keywordsAr: ["شمس", "مدارس", "طاقة"],
    tagsEn: ["Solar", "Sustainability"],
    tagsAr: ["شمس", "تنمية مستدامة"],
    pageViews: 42,
    programId: 3,
    categoryId: 3,
    activityIds: [],
    isPublished: false,
    publishedAt: new Date("2024-07-01"),
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-07-01"),
  },
];


export default function ProjectsSection({ locale }: { locale: string }) {
  const isEnglish = locale === "en";
  const { data, loading, error } = useHomepageData(locale);
  
  // Ensure hooks order is stable: do early returns AFTER all hooks
  if (loading) {
    return <ProjectsSkeletonSection />;
  }
  
  if (error || !data?.projects || data.projects.length === 0) {
    return null; // Don't render section if no data
  }
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/10 dark:from-background dark:via-brand-primary/10 dark:to-brand-secondary/5">
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
            {isEnglish ? "Impact Projects" : "مشاريع التأثير"}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-6">
            {isEnglish ? "Our Projects" : "مشاريعنا"}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isEnglish 
              ? "Discover our impactful projects that are making a real difference in communities across the region through sustainable development and innovative solutions."
              : "اكتشف مشاريعنا المؤثرة التي تحدث فرقًا حقيقيًا في المجتمعات عبر المنطقة من خلال التنمية المستدامة والحلول المبتكرة."
            }
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-brand-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">50+</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Active Projects" : "مشروع نشط"}
            </div>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-brand-secondary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Lives Impacted" : "حياة تأثرت"}
            </div>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="w-8 h-8 text-brand-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">15</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Communities Served" : "مجتمع خدم"}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {data.projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SimpleProjectCard project={project} locale={locale} />
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link href={`/${locale}/projects`}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {isEnglish ? "View All Projects" : "عرض جميع المشاريع"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" size="lg" className="group">
                {isEnglish ? "Start a Project" : "ابدأ مشروعًا"}
                <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}