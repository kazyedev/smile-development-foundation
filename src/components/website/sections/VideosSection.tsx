import { Video } from "@/types/video";
import VideoCard from "../VideoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockVideos: Video[] = [
  {
    titleEn: "Building Hope: Water Wells Project Documentary",
    titleAr: "بناء الأمل: فيلم وثائقي عن مشروع آبار المياه",
    descriptionEn: "Follow our journey as we bring clean water to remote villages through our water wells initiative. Watch how communities transform when access to clean water becomes a reality.",
    descriptionAr: "تابع رحلتنا ونحن نوفر المياه النظيفة للقرى النائية من خلال مبادرة آبار المياه. شاهد كيف تتحول المجتمعات عندما يصبح الوصول إلى المياه النظيفة حقيقة.",
    mimeType: "video/mp4",
    size: 524288000, // 500MB
    width: 1920,
    height: 1080,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    locationEn: "Upper Egypt Villages",
    locationAr: "قرى صعيد مصر",
    isPublic: true,
    slugEn: "building-hope-water-wells-documentary",
    slugAr: "بناء-الأمل-فيلم-آبار-المياه",
    keywordsEn: ["documentary", "water wells", "community development", "rural areas"],
    keywordsAr: ["فيلم وثائقي", "آبار مياه", "تنمية مجتمعية", "مناطق ريفية"],
    tagsEn: ["Documentary", "Water"],
    tagsAr: ["وثائقي", "مياه"],
    views: 15420,
    isPublished: true,
    publishedAt: new Date("2024-04-15"),
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-04-10"),
  },
  {
    titleEn: "Youth Empowerment Workshop Highlights",
    titleAr: "أبرز لقطات ورشة تمكين الشباب",
    descriptionEn: "Experience the energy and enthusiasm of our youth empowerment workshop where young leaders learned valuable skills for personal and professional development.",
    descriptionAr: "اختبر الطاقة والحماس في ورشة تمكين الشباب حيث تعلم القادة الشباب مهارات قيمة للتطوير الشخصي والمهني.",
    mimeType: "video/mp4",
    size: 314572800, // 300MB
    width: 1920,
    height: 1080,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    locationEn: "Cairo Community Center",
    locationAr: "مركز المجتمع بالقاهرة",
    isPublic: true,
    slugEn: "youth-empowerment-workshop-highlights",
    slugAr: "أبرز-لقطات-ورشة-تمكين-الشباب",
    keywordsEn: ["youth", "empowerment", "workshop", "leadership"],
    keywordsAr: ["شباب", "تمكين", "ورشة", "قيادة"],
    tagsEn: ["Youth", "Education"],
    tagsAr: ["شباب", "تعليم"],
    views: 8930,
    isPublished: true,
    publishedAt: new Date("2024-05-22"),
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    titleEn: "Medical Mission: Serving Remote Communities",
    titleAr: "المهمة الطبية: خدمة المجتمعات النائية",
    descriptionEn: "Join our medical team as they provide essential healthcare services to underserved communities in remote areas, bringing hope and healing to those in need.",
    descriptionAr: "انضم إلى فريقنا الطبي وهو يقدم خدمات الرعاية الصحية الأساسية للمجتمعات المحرومة في المناطق النائية، جالباً الأمل والشفاء لمن يحتاجون.",
    mimeType: "video/mp4",
    size: 419430400, // 400MB
    width: 1920,
    height: 1080,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    locationEn: "Sinai Peninsula",
    locationAr: "شبه جزيرة سيناء",
    isPublic: true,
    slugEn: "medical-mission-serving-remote-communities",
    slugAr: "المهمة-الطبية-خدمة-المجتمعات-النائية",
    keywordsEn: ["medical mission", "healthcare", "remote areas", "community service"],
    keywordsAr: ["مهمة طبية", "رعاية صحية", "مناطق نائية", "خدمة مجتمعية"],
    tagsEn: ["Healthcare", "Mission"],
    tagsAr: ["رعاية صحية", "مهمة"],
    views: 12750,
    isPublished: true,
    publishedAt: new Date("2024-06-08"),
    createdAt: new Date("2024-05-28"),
    updatedAt: new Date("2024-06-05"),
  },
];

export default function VideosSection({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <h1 className="text-2xl font-bold text-center">
        {locale === "en" ? "Video Gallery" : "معرض الفيديو"}
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        {locale === "en" 
          ? "Watch inspiring stories and behind-the-scenes moments from our projects and community initiatives that showcase the real impact of our work."
          : "شاهد القصص الملهمة واللحظات من وراء الكواليس لمشاريعنا ومبادراتنا المجتمعية التي تُظهر التأثير الحقيقي لعملنا."
        }
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockVideos.slice(0, 3).map((video) => (
          <VideoCard key={video.slugEn} video={video} locale={locale} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href={`/${locale}/media/videos`}>
          <Button variant="outline" size="lg">
            {locale === "en" ? "View All Videos" : "عرض جميع الفيديوهات"}
          </Button>
        </Link>
      </div>
    </div>
  );
}