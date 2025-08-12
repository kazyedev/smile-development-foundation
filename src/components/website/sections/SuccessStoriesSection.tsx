import { Story } from "@/types/successStory";
import SuccessStoryCard from "../SuccessStoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockSuccessStories: Story[] = [
  {
    isEnglish: true,
    isArabic: true,
    titleEn: "From Struggle to Success: Ahmed's Journey",
    titleAr: "من الكفاح إلى النجاح: رحلة أحمد",
    featuredImageUrl: "/assets/hero-1.jpg",
    video: "https://example.com/video1.mp4",
    personNameEn: "Ahmed Hassan",
    personNameAr: "أحمد حسن",
    personAge: 28,
    personLocationEn: "Al-Minya Governorate",
    personLocationAr: "محافظة المنيا",
    cityEn: "Mallawi",
    cityAr: "ملوي",
    otherImagesUrl: ["/assets/hero-2.jpg", "/assets/hero-3.jpg"],
    contentEn: "Ahmed's transformation from a struggling farmer to a successful entrepreneur through our agricultural development program showcases the power of education and support. With access to modern farming techniques and microfinance, he now employs 15 people in his community.",
    contentAr: "تحول أحمد من مزارع يكافح إلى رائد أعمال ناجح من خلال برنامج التنمية الزراعية يُظهر قوة التعليم والدعم. مع الوصول إلى تقنيات الزراعة الحديثة والتمويل الأصغر، يوظف الآن 15 شخصًا في مجتمعه.",
    slugEn: "ahmed-hassan-farming-success",
    slugAr: "أحمد-حسن-نجاح-زراعي",
    keywordsEn: ["agriculture", "entrepreneurship", "microfinance", "rural development"],
    keywordsAr: ["زراعة", "ريادة أعمال", "تمويل أصغر", "تنمية ريفية"],
    tagsEn: ["Agriculture", "Success"],
    tagsAr: ["زراعة", "نجاح"],
    readTime: 5,
    pageViews: 1250,
    isPublished: true,
    publishedAt: new Date("2024-03-15"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    isEnglish: true,
    isArabic: true,
    titleEn: "Breaking Barriers: Fatima's Educational Victory",
    titleAr: "كسر الحواجز: انتصار فاطمة التعليمي",
    featuredImageUrl: "/assets/hero-2.jpg",
    video: "",
    personNameEn: "Fatima Al-Zahra",
    personNameAr: "فاطمة الزهراء",
    personAge: 22,
    personLocationEn: "Upper Egypt",
    personLocationAr: "صعيد مصر",
    cityEn: "Aswan",
    cityAr: "أسوان",
    otherImagesUrl: ["/assets/hero-1.jpg"],
    contentEn: "Despite facing numerous obstacles as a young woman in rural Egypt, Fatima persevered through our educational scholarship program to become the first university graduate in her family. She now works as a teacher, inspiring other girls in her community.",
    contentAr: "رغم مواجهة عقبات عديدة كامرأة شابة في ريف مصر، ثابرت فاطمة من خلال برنامج المنح التعليمية لتصبح أول خريجة جامعية في عائلتها. تعمل الآن كمعلمة، تلهم الفتيات الأخريات في مجتمعها.",
    slugEn: "fatima-educational-success",
    slugAr: "فاطمة-نجاح-تعليمي",
    keywordsEn: ["education", "women empowerment", "scholarship", "teaching"],
    keywordsAr: ["تعليم", "تمكين المرأة", "منحة", "تدريس"],
    tagsEn: ["Education", "Women"],
    tagsAr: ["تعليم", "نساء"],
    readTime: 4,
    pageViews: 980,
    isPublished: true,
    publishedAt: new Date("2024-04-20"),
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-04-18"),
  },
  {
    isEnglish: true,
    isArabic: true,
    titleEn: "Healing Hearts: Dr. Omar's Medical Mission",
    titleAr: "شفاء القلوب: مهمة الدكتور عمر الطبية",
    featuredImageUrl: "/assets/hero-3.jpg",
    video: "https://example.com/video3.mp4",
    personNameEn: "Dr. Omar Mahmoud",
    personNameAr: "الدكتور عمر محمود",
    personAge: 35,
    personLocationEn: "Sinai Peninsula",
    personLocationAr: "شبه جزيرة سيناء",
    cityEn: "Arish",
    cityAr: "العريش",
    otherImagesUrl: [],
    contentEn: "Through our healthcare initiative, Dr. Omar established a mobile clinic that serves remote communities in Sinai. His dedication has provided medical care to over 5,000 people who previously had no access to healthcare services.",
    contentAr: "من خلال مبادرة الرعاية الصحية، أسس الدكتور عمر عيادة متنقلة تخدم المجتمعات النائية في سيناء. إخلاصه وفر الرعاية الطبية لأكثر من 5000 شخص لم يكن لديهم سابقاً الوصول إلى الخدمات الصحية.",
    slugEn: "dr-omar-mobile-clinic",
    slugAr: "الدكتور-عمر-عيادة-متنقلة",
    keywordsEn: ["healthcare", "mobile clinic", "rural health", "medical mission"],
    keywordsAr: ["رعاية صحية", "عيادة متنقلة", "صحة ريفية", "مهمة طبية"],
    tagsEn: ["Healthcare", "Community"],
    tagsAr: ["رعاية صحية", "مجتمع"],
    readTime: 6,
    pageViews: 1850,
    isPublished: true,
    publishedAt: new Date("2024-05-10"),
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-05-08"),
  },
];

export default function SuccessStoriesSection({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)] bg-[var(--brand-secondary)]/10">
      <h1 className="text-2xl font-bold text-center">
        {locale === "en" ? "Success Stories" : "قصص النجاح"}
      </h1>
      
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        {locale === "en" ? "Discover inspiring stories of transformation and impact from our community members whose lives have been changed through our programs and initiatives." : "اكتشف قصص التحول والتأثير من أعضاء مجتمعنا الذين غيرت حياتهم من خلال برامجنا والمبادرات."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4 justify-center items-center mt-6">
        {mockSuccessStories.slice(0, 3).map((story) => (
          <SuccessStoryCard key={story.slugEn} story={story} locale={locale} />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href={`/${locale}/media/success-stories`}>
          <Button variant="outline" size="lg">
            {locale === "en" ? "View All Success Stories" : "عرض كل قصص النجاح"}
          </Button>
        </Link>
      </div>
    </div>
  );
}