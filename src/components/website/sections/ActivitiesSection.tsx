import { Activity } from "@/types/activity";
import ActivityCard from "../ActivityCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity as ActivityIcon, Calendar, ChevronRight, Sparkles, Timer, TrendingUp } from "lucide-react";

const mockActivities: Activity[] = [
  {
    id: 1,
    isEnglish: true,
    isArabic: true,
    titleEn: "Community Health Workshop",
    titleAr: "ورشة الصحة المجتمعية",
    featuredImageUrl: "/assets/hero-1.jpg",
    date: new Date("2024-06-15"),
    contentEn: "A comprehensive health awareness workshop conducted in rural communities, focusing on preventive healthcare measures, nutrition education, and basic medical knowledge. Over 200 community members participated in this life-changing event.",
    contentAr: "ورشة شاملة للتوعية الصحية أجريت في المجتمعات الريفية، تركز على تدابير الرعاية الصحية الوقائية وتعليم التغذية والمعرفة الطبية الأساسية. شارك أكثر من 200 عضو من المجتمع في هذا الحدث المغير للحياة.",
    otherImagesUrl: ["/assets/hero-2.jpg"],
    programId: 1,
    projectId: 1,
    slugEn: "community-health-workshop-june-2024",
    slugAr: "ورشة-الصحة-المجتمعية-يونيو-2024",
    keywordsEn: ["health", "workshop", "community", "preventive care"],
    keywordsAr: ["صحة", "ورشة", "مجتمع", "رعاية وقائية"],
    tagsEn: ["Health", "Education"],
    tagsAr: ["صحة", "تعليم"],
    pageViews: 856,
    isPublished: true,
    publishedAt: new Date("2024-06-20"),
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2024-06-18"),
  },
  {
    id: 2,
    isEnglish: true,
    isArabic: true,
    titleEn: "Digital Skills Training Program",
    titleAr: "برنامج تدريب المهارات الرقمية",
    featuredImageUrl: "/assets/hero-2.jpg",
    date: new Date("2024-07-22"),
    contentEn: "An intensive 3-day training program designed to equip youth with essential digital skills including computer literacy, internet safety, and basic programming concepts. 50 young people successfully completed the program.",
    contentAr: "برنامج تدريبي مكثف لمدة 3 أيام مصمم لتزويد الشباب بالمهارات الرقمية الأساسية بما في ذلك محو الأمية الحاسوبية وأمان الإنترنت ومفاهيم البرمجة الأساسية. أكمل 50 شابًا البرنامج بنجاح.",
    otherImagesUrl: ["/assets/hero-3.jpg", "/assets/hero-1.jpg"],
    programId: 2,
    slugEn: "digital-skills-training-july-2024",
    slugAr: "تدريب-المهارات-الرقمية-يوليو-2024",
    keywordsEn: ["digital", "training", "youth", "technology"],
    keywordsAr: ["رقمي", "تدريب", "شباب", "تكنولوجيا"],
    tagsEn: ["Technology", "Youth"],
    tagsAr: ["تكنولوجيا", "شباب"],
    pageViews: 1240,
    isPublished: true,
    publishedAt: new Date("2024-07-25"),
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2024-07-23"),
  },
  {
    id: 3,
    isEnglish: true,
    isArabic: true,
    titleEn: "Environmental Clean-up Campaign",
    titleAr: "حملة تنظيف البيئة",
    featuredImageUrl: "/assets/hero-3.jpg",
    date: new Date("2024-08-10"),
    contentEn: "A community-driven environmental initiative where volunteers gathered to clean local waterways and plant trees. This activity resulted in cleaning 5 kilometers of riverbank and planting 100 native trees.",
    contentAr: "مبادرة بيئية مجتمعية حيث تجمع المتطوعون لتنظيف الممرات المائية المحلية وزراعة الأشجار. نتج عن هذا النشاط تنظيف 5 كيلومترات من ضفاف النهر وزراعة 100 شجرة محلية.",
    otherImagesUrl: [],
    programId: 3,
    projectId: 3,
    slugEn: "environmental-cleanup-august-2024",
    slugAr: "تنظيف-البيئة-أغسطس-2024",
    keywordsEn: ["environment", "cleanup", "trees", "volunteer"],
    keywordsAr: ["بيئة", "تنظيف", "أشجار", "متطوع"],
    tagsEn: ["Environment", "Community"],
    tagsAr: ["بيئة", "مجتمع"],
    pageViews: 692,
    isPublished: true,
    publishedAt: new Date("2024-08-15"),
    createdAt: new Date("2024-08-05"),
    updatedAt: new Date("2024-08-12"),
  },
];

export default function ActivitiesSection({ locale }: { locale: string }) {
  const isEnglish = locale === "en";
  
  return (
    <section className="relative py-20 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,var(--brand-secondary)_0.1px,transparent_0.1px),radial-gradient(circle_at_70%_90%,var(--brand-primary)_0.1px,transparent_0.1px)] opacity-[0.15] dark:opacity-[0.1]"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 dark:bg-brand-secondary/20 text-brand-secondary rounded-full text-sm font-medium mb-6">
            <ActivityIcon className="w-4 h-4" />
            {isEnglish ? "Latest Activities" : "آخر الأنشطة"}
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {isEnglish ? "Recent Activities" : "الأنشطة الحديثة"}
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isEnglish 
              ? "Explore our latest community activities and events that bring positive change to the lives of those we serve."
              : "استكشف أحدث أنشطة وفعاليات المجتمع التي تجلب التغيير الإيجابي لحياة من نخدمهم."
            }
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-primary/20 via-brand-secondary/30 to-brand-primary/20 dark:from-brand-primary/30 dark:via-brand-secondary/40 dark:to-brand-primary/30"></div>
          
          {/* Activities */}
          <div className="space-y-16">
            {mockActivities.slice(0, 3).map((activity, index) => {
              const isEven = index % 2 === 0;
              const formatDate = (date: Date) => {
                if (isEnglish) {
                  return date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  });
                } else {
                  return date.toLocaleDateString('ar-EG', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  });
                }
              };
              
              return (
                <div
                  key={activity.id}
                  className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16 gap-8`}
                >
                  {/* Content Side */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <div className="group">
                      {/* Date Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary rounded-full text-sm font-medium mb-4`}>
                        <Calendar className="w-3 h-3" />
                        {activity.date && formatDate(activity.date)}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-brand-primary transition-colors">
                        {isEnglish ? activity.titleEn : activity.titleAr}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {isEnglish ? activity.contentEn : activity.contentAr}
                      </p>
                      
                      {/* Tags */}
                      <div className={`flex gap-2 mb-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                        {(isEnglish ? activity.tagsEn : activity.tagsAr).slice(0, 2).map((tag) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-brand-secondary/10 dark:bg-brand-secondary/20 text-brand-secondary text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <Link href={`/${locale}/activities/${isEnglish ? activity.slugEn : activity.slugAr}`}>
                        <Button variant="outline" size="sm" className="group/btn">
                          {isEnglish ? "Read More" : "اقرأ المزيد"}
                          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg">
                      <ActivityIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Image Side */}
                  <div className="flex-1">
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <img 
                        src={activity.featuredImageUrl}
                        alt={isEnglish ? activity.titleEn : activity.titleAr}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-12">
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Timer className="w-6 h-6 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Community Support" : "دعم المجتمع"}
            </div>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-brand-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">100+</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "Activities This Year" : "نشاط هذا العام"}
            </div>
          </div>
          
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">5K+</div>
            <div className="text-sm text-muted-foreground">
              {isEnglish ? "People Reached" : "شخص وصلنا إليه"}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <Link href={`/${locale}/activities`}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-secondary to-brand-secondary/90 hover:from-brand-secondary/90 hover:to-brand-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isEnglish ? "View All Activities" : "عرض جميع الأنشطة"}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}