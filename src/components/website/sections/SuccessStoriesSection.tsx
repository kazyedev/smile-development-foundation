"use client";

import { Story } from "@/types/successStory";
import SuccessStoryCard from "../SuccessStoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Star, Quote, MapPin, User, Play, ArrowRight, Sparkles, Award, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    personLocationEn: "Upper Yemen",
    personLocationAr: "مجمع اليمن",
    cityEn: "Aswan",
    cityAr: "أسوان",
    otherImagesUrl: ["/assets/hero-1.jpg"],
    contentEn: "Despite facing numerous obstacles as a young woman in rural Yemen, Fatima persevered through our educational scholarship program to become the first university graduate in her family. She now works as a teacher, inspiring other girls in her community.",
    contentAr: "رغم مواجهة عقبات عديدة كامرأة شابة في ريف اليمن، ثابرت فاطمة من خلال برنامج المنح التعليمية لتصبح أول خريجة جامعية في عائلتها. تعمل الآن كمعلمة، تلهم الفتيات الأخريات في مجتمعها.",
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
  const [activeStory, setActiveStory] = useState(0);
  const isEnglish = locale === "en";

  const handleStoryClick = (index: number) => {
    setActiveStory(index);
  };

  const currentStory = mockSuccessStories[activeStory];

  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-red-950/5 overflow-hidden">
      {/* Inspirational Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        {/* Floating Hearts */}
        <div className="absolute top-20 left-10 w-6 h-6 text-brand-secondary opacity-40">
          <Heart className="w-full h-full animate-pulse" fill="currentColor" />
        </div>
        <div className="absolute top-40 right-20 w-8 h-8 text-brand-primary opacity-30">
          <Star className="w-full h-full animate-pulse" fill="currentColor" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 text-brand-secondary opacity-50">
          <Sparkles className="w-full h-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 text-brand-primary opacity-25">
          <Award className="w-full h-full animate-pulse" fill="currentColor" style={{ animationDelay: '3s' }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" fill="currentColor" />
            {isEnglish ? "Inspiring Stories" : "قصص ملهمة"}
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {isEnglish ? "Success Stories" : "قصص النجاح"}
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {isEnglish 
              ? "Discover inspiring stories of transformation and impact from our community members whose lives have been changed through our programs and initiatives."
              : "اكتشف قصص التحول والتأثير من أعضاء مجتمعنا الذين غيرت حياتهم من خلال برامجنا والمبادرات."
            }
          </p>
        </div>

        {/* Main Story Display */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Story Image & Video */}
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <Image 
                  src={currentStory.featuredImageUrl}
                  alt={isEnglish ? currentStory.titleEn : currentStory.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  width={100}
                  height={100}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Video Play Button */}
                {currentStory.video && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group/play">
                      <Play className="w-8 h-8 text-gray-700 ml-1" fill="currentColor" />
                    </button>
                  </div>
                )}
                
                {/* Story Badge */}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {isEnglish ? "Success Story" : "قصة نجاح"}
                </div>
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div
              key={activeStory + 'content'}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                <Quote className="w-8 h-8 text-brand-primary" />
              </div>
              
              {/* Story Title */}
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-foreground">
                {isEnglish ? currentStory.titleEn : currentStory.titleAr}
              </h3>
              
              {/* Person Info */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="w-5 h-5 text-brand-primary" />
                  <span className="font-semibold text-foreground">
                    {isEnglish ? currentStory.personNameEn : currentStory.personNameAr}
                  </span>
                  <span className="text-sm">
                    • {currentStory.personAge} {isEnglish ? 'years old' : 'سنة'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-brand-secondary" />
                  <span>
                    {isEnglish ? currentStory.cityEn : currentStory.cityAr}, {isEnglish ? currentStory.personLocationEn : currentStory.personLocationAr}
                  </span>
                </div>
              </div>
              
              {/* Story Content */}
              <blockquote className="text-lg leading-relaxed text-muted-foreground mb-8 italic border-l-4 border-brand-primary pl-6">
                &quot;{isEnglish ? currentStory.contentEn : currentStory.contentAr}&quot;
              </blockquote>
              
              {/* Tags */}
              <div className="flex gap-2 mb-8">
                {(isEnglish ? currentStory.tagsEn : currentStory.tagsAr).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              {/* Read More Button */}
              <Link href={`/${locale}/media/success-stories/${isEnglish ? currentStory.slugEn : currentStory.slugAr}`}>
                <Button className="group bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white">
                  {isEnglish ? "Read Full Story" : "قراءة القصة كاملة"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Story Navigation */}
          <div className="flex justify-center gap-4 mb-16">
            {mockSuccessStories.map((story, index) => (
              <motion.button
                key={index}
                onClick={() => handleStoryClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative ${activeStory === index ? 'ring-2 ring-brand-primary rounded-lg' : ''}`}
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
                  <Image 
                    src={story.featuredImageUrl}
                    alt={isEnglish ? story.personNameEn : story.personNameAr}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    width={100}
                    height={100}
                  />
                  {activeStory === index && (
                    <div className="absolute inset-0 bg-brand-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="text-xs mt-2 text-center font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {isEnglish ? story.personNameEn.split(' ')[0] : story.personNameAr.split(' ')[0]}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Impact Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-sm text-muted-foreground">
                {isEnglish ? "Lives Transformed" : "حياة تغيرت"}
              </div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">95%</div>
              <div className="text-sm text-muted-foreground">
                {isEnglish ? "Success Rate" : "معدل النجاح"}
              </div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-red-500 dark:text-red-400" fill="currentColor" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">25</div>
              <div className="text-sm text-muted-foreground">
                {isEnglish ? "Communities Reached" : "مجتمع وصلنا إليه"}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Link href={`/${locale}/media/success-stories`}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Heart className="w-4 h-4 mr-2" fill="currentColor" />
              {isEnglish ? "View All Success Stories" : "عرض كل قصص النجاح"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}