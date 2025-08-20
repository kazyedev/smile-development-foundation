'use client';

import { motion } from 'framer-motion';
import { 
  Home, Search, ArrowLeft, HelpCircle, Mail, Phone,
  AlertTriangle, Compass, MapPin, Sparkles, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function NotFound() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const isEn = locale === 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-primary)]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, var(--brand-primary) 2px, transparent 2px),
                           radial-gradient(circle at 80% 70%, var(--brand-secondary) 1px, transparent 1px),
                           radial-gradient(circle at 60% 20%, var(--brand-primary) 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 80px 80px, 60px 60px'
        }}></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/6 left-1/6 w-80 h-80 bg-[var(--brand-primary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/6 right-1/6 w-60 h-60 bg-[var(--brand-secondary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.5, 1, 1.5],
            opacity: [0.8, 0.3, 0.8],
            rotate: [360, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Main 404 Section */}
        <section className="pt-32 pb-20 px-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* 404 Number Display */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none">
                    <span className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-primary)] bg-clip-text text-transparent">
                      404
                    </span>
                  </h1>
                  
                  {/* Floating Icons */}
                  <motion.div
                    className="absolute -top-8 -left-8"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <AlertTriangle className="w-16 h-16 text-[var(--brand-secondary)]/60" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -top-4 -right-12"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <Compass className="w-12 h-12 text-[var(--brand-primary)]/60" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <MapPin className="w-10 h-10 text-[var(--brand-secondary)]/60" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6">
                  {isEn ? 'Page Not Found' : 'الصفحة غير موجودة'}
                </h2>
                
                <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
                  {isEn
                    ? 'Oops! The page you\'re looking for seems to have wandered off. But don\'t worry, we\'ll help you find your way back to making a difference.'
                    : 'عذراً! يبدو أن الصفحة التي تبحث عنها قد تاهت. لكن لا تقلق، سنساعدك في العثور على طريقك للعودة إلى إحداث التغيير.'
                  }
                </p>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white hover:shadow-xl transition-all transform hover:scale-105"
                  size="lg"
                >
                  <Link href={`/${locale}`}>
                    <Home className="w-5 h-5 mr-2" />
                    {isEn ? 'Go Home' : 'العودة للرئيسية'}
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => router.back()}
                  className="border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/10"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {isEn ? 'Go Back' : 'العودة'}
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-[var(--brand-secondary)]/30 hover:bg-[var(--brand-secondary)]/10"
                >
                  <Link href={`/${locale}/search-result`}>
                    <Search className="w-5 h-5 mr-2" />
                    {isEn ? 'Search' : 'البحث'}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Helpful Links Section */}
        <section className="pb-20 px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
                {isEn ? 'Popular Destinations' : 'الوجهات الشائعة'}
              </h3>
              <p className="text-[var(--muted-foreground)]">
                {isEn 
                  ? 'Here are some popular pages that might interest you'
                  : 'إليك بعض الصفحات الشائعة التي قد تهمك'
                }
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Home,
                  titleEn: 'About Us',
                  titleAr: 'عن المؤسسة',
                  descEn: 'Learn about our mission and values',
                  descAr: 'تعرف على رسالتنا وقيمنا',
                  href: `/${locale}/about-us`,
                  color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
                },
                {
                  icon: MapPin,
                  titleEn: 'Our Projects',
                  titleAr: 'مشاريعنا',
                  descEn: 'Discover our impact projects worldwide',
                  descAr: 'اكتشف مشاريع تأثيرنا حول العالم',
                  href: `/${locale}/projects`,
                  color: 'text-green-600 bg-green-100 dark:bg-green-900/20'
                },
                {
                  icon: Sparkles,
                  titleEn: 'Activities',
                  titleAr: 'الأنشطة',
                  descEn: 'See our latest community activities',
                  descAr: 'شاهد أحدث أنشطتنا المجتمعية',
                  href: `/${locale}/activities`,
                  color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
                },
                {
                  icon: HelpCircle,
                  titleEn: 'Support & FAQs',
                  titleAr: 'الدعم والأسئلة الشائعة',
                  descEn: 'Get answers to common questions',
                  descAr: 'احصل على إجابات للأسئلة الشائعة',
                  href: `/${locale}/faqs`,
                  color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
                },
                {
                  icon: Mail,
                  titleEn: 'Contact Us',
                  titleAr: 'تواصل معنا',
                  descEn: 'Get in touch with our team',
                  descAr: 'تواصل مع فريقنا',
                  href: `/${locale}/contact-us`,
                  color: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20'
                },
                {
                  icon: RotateCcw,
                  titleEn: 'Latest News',
                  titleAr: 'آخر الأخبار',
                  descEn: 'Stay updated with our latest news',
                  descAr: 'ابق مطلعاً على آخر أخبارنا',
                  href: `/${locale}/news`,
                  color: 'text-red-600 bg-red-100 dark:bg-red-900/20'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Link href={item.href}>
                    <Card className="group p-6 h-full hover:shadow-2xl transition-all duration-300 border-[var(--border)]/50 bg-[var(--card)]/80 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors mb-2">
                            {isEn ? item.titleEn : item.titleAr}
                          </h4>
                          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {isEn ? item.descEn : item.descAr}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="pb-20 px-8">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card className="bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border-[var(--brand-primary)]/20 backdrop-blur-sm">
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl mb-6">
                    <HelpCircle className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                    {isEn ? 'Still Need Help?' : 'لا تزال بحاجة للمساعدة؟'}
                  </h3>
                  
                  <p className="text-[var(--muted-foreground)] mb-8">
                    {isEn 
                      ? 'If you believe this page should exist or if you\'re experiencing technical difficulties, please don\'t hesitate to contact our support team.'
                      : 'إذا كنت تعتقد أن هذه الصفحة يجب أن تكون موجودة أو إذا كنت تواجه صعوبات تقنية، فلا تتردد في الاتصال بفريق الدعم لدينا.'
                    }
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                    >
                      <Link href={`/${locale}/contact-us`}>
                        <Mail className="w-4 h-4 mr-2" />
                        {isEn ? 'Contact Support' : 'اتصل بالدعم'}
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild
                      variant="outline" 
                      className="border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/10"
                    >
                      <Link href={`/${locale}/faqs`}>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        {isEn ? 'View FAQs' : 'عرض الأسئلة الشائعة'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
