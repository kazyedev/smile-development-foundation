import { News } from "@/types/news";
import NewsCard from "../NewsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockNews: News[] = [
  {
    id: 1,
    isEnglish: true,
    isArabic: true,
    titleEn: "Foundation Launches New Clean Water Initiative in Rural Egypt",
    titleAr: "المؤسسة تطلق مبادرة جديدة للمياه النظيفة في ريف مصر",
    featuredImageUrl: "/assets/hero-1.jpg",
    otherImagesUrl: ["/assets/hero-2.jpg"],
    contentEn: "We are proud to announce the launch of our latest clean water initiative that will bring safe drinking water to over 10,000 residents in rural communities across Upper Egypt. This comprehensive program includes the installation of new water treatment facilities, community education workshops, and sustainable maintenance training for local residents.",
    contentAr: "نحن فخورون بالإعلان عن إطلاق مبادرتنا الأحدث للمياه النظيفة التي ستجلب مياه الشرب الآمنة لأكثر من 10,000 نسمة في المجتمعات الريفية عبر صعيد مصر. يشمل هذا البرنامج الشامل تركيب مرافق معالجة المياه الجديدة وورش التوعية المجتمعية وتدريب الصيانة المستدامة للسكان المحليين.",
    categoryId: 1,
    slugEn: "foundation-launches-clean-water-initiative-rural-egypt",
    slugAr: "المؤسسة-تطلق-مبادرة-المياه-النظيفة-ريف-مصر",
    keywordsEn: ["clean water", "rural development", "community health", "Upper Egypt"],
    keywordsAr: ["مياه نظيفة", "تنمية ريفية", "صحة مجتمعية", "صعيد مصر"],
    tagsEn: ["Water", "Health"],
    tagsAr: ["مياه", "صحة"],
    readTime: 8,
    pageViews: 2450,
    authorId: 1,
    isPublished: true,
    publishedAt: new Date("2024-06-25"),
    createdAt: new Date("2024-06-20"),
    updatedAt: new Date("2024-06-24"),
  },
  {
    id: 2,
    isEnglish: true,
    isArabic: true,
    titleEn: "Youth Leadership Program Graduates 150 Future Leaders",
    titleAr: "برنامج القيادة الشبابية يخرج 150 قائدًا مستقبليًا",
    featuredImageUrl: "/assets/hero-2.jpg",
    otherImagesUrl: ["/assets/hero-3.jpg", "/assets/hero-1.jpg"],
    contentEn: "Our annual Youth Leadership Program has successfully graduated 150 young individuals who are now equipped with the skills and knowledge to lead positive change in their communities. The program included leadership training, project management workshops, and community service initiatives that have already begun making an impact.",
    contentAr: "نجح برنامج القيادة الشبابية السنوي في تخريج 150 شابًا مزودين الآن بالمهارات والمعرفة لقيادة التغيير الإيجابي في مجتمعاتهم. شمل البرنامج تدريب القيادة وورش إدارة المشاريع ومبادرات الخدمة المجتمعية التي بدأت بالفعل في إحداث تأثير.",
    categoryId: 2,
    slugEn: "youth-leadership-program-graduates-150-future-leaders",
    slugAr: "برنامج-القيادة-الشبابية-يخرج-150-قائد-مستقبلي",
    keywordsEn: ["youth", "leadership", "graduation", "community impact"],
    keywordsAr: ["شباب", "قيادة", "تخرج", "تأثير مجتمعي"],
    tagsEn: ["Youth", "Leadership"],
    tagsAr: ["شباب", "قيادة"],
    readTime: 6,
    pageViews: 1875,
    authorId: 2,
    isPublished: true,
    publishedAt: new Date("2024-07-15"),
    createdAt: new Date("2024-07-10"),
    updatedAt: new Date("2024-07-14"),
  },
  {
    id: 3,
    isEnglish: true,
    isArabic: true,
    titleEn: "Medical Mission Provides Free Healthcare to 3,000 Patients",
    titleAr: "البعثة الطبية تقدم رعاية صحية مجانية لـ 3,000 مريض",
    featuredImageUrl: "/assets/hero-3.jpg",
    otherImagesUrl: [],
    contentEn: "Our recent medical mission to remote areas in Sinai Peninsula has provided free healthcare services to over 3,000 patients. The mission included general medical checkups, dental care, eye examinations, and distribution of essential medications. Local doctors and international volunteers worked together to ensure comprehensive care for underserved communities.",
    contentAr: "قدمت بعثتنا الطبية الأخيرة إلى المناطق النائية في شبه جزيرة سيناء خدمات رعاية صحية مجانية لأكثر من 3,000 مريض. شملت البعثة الفحوصات الطبية العامة ورعاية الأسنان وفحوصات العيون وتوزيع الأدوية الأساسية. عمل الأطباء المحليون والمتطوعون الدوليون معًا لضمان الرعاية الشاملة للمجتمعات المحرومة.",
    categoryId: 3,
    slugEn: "medical-mission-provides-free-healthcare-3000-patients",
    slugAr: "البعثة-الطبية-تقدم-رعاية-صحية-مجانية-3000-مريض",
    keywordsEn: ["medical mission", "free healthcare", "Sinai", "community service"],
    keywordsAr: ["بعثة طبية", "رعاية صحية مجانية", "سيناء", "خدمة مجتمعية"],
    tagsEn: ["Healthcare", "Mission"],
    tagsAr: ["رعاية صحية", "بعثة"],
    readTime: 7,
    pageViews: 3120,
    authorId: 1,
    isPublished: true,
    publishedAt: new Date("2024-08-05"),
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-04"),
  },
];

export default function NewsSection({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <h1 className="text-2xl font-bold text-center">
        {locale === "en" ? "Latest News" : "آخر الأخبار"}
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        {locale === "en" 
          ? "Stay updated with our latest initiatives, success stories, and community impact news that showcase the ongoing work of our foundation."
          : "ابق على اطلاع بأحدث مبادراتنا وقصص النجاح وأخبار التأثير المجتمعي التي تُظهر العمل المستمر لمؤسستنا."
        }
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4 justify-center items-center mt-6">
        {mockNews.slice(0, 3).map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} locale={locale} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href={`/${locale}/news`}>
          <Button variant="outline" size="lg">
            {locale === "en" ? "View All News" : "عرض جميع الأخبار"}
          </Button>
        </Link>
      </div>
    </div>
  );
}