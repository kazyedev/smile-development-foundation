import { Activity } from "@/types/activity";
import ActivityCard from "../ActivityCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <h1 className="text-2xl font-bold text-center">
        {locale === "en" ? "Recent Activities" : "الأنشطة الحديثة"}
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        {locale === "en" 
          ? "Explore our latest community activities and events that bring positive change to the lives of those we serve."
          : "استكشف أحدث أنشطة وفعاليات المجتمع التي تجلب التغيير الإيجابي لحياة من نخدمهم."
        }
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockActivities.slice(0, 3).map((activity) => (
          <ActivityCard key={activity.slugEn} activity={activity} locale={locale} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href={`/${locale}/activities`}>
          <Button variant="outline" size="lg">
            {locale === "en" ? "View All Activities" : "عرض جميع الأنشطة"}
          </Button>
        </Link>
      </div>
    </div>
  );
}