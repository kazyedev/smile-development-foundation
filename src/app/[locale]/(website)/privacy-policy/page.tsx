'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export default function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = use(params);
  const isLocaleEnglish = locale === 'en';

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-primary/5 to-brand-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-full mb-6"
              variants={fadeInUp}
            >
              <Shield className="w-10 h-10 text-brand-primary" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? "Privacy Policy" : "سياسة الخصوصية"}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              variants={fadeInUp}
            >
              {isLocaleEnglish 
                ? "We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data."
                : "نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتك."
              }
            </motion.p>
            
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-8 rounded-full"
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="prose prose-lg dark:prose-invert max-w-none"
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              {/* Information We Collect */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Information We Collect" : "المعلومات التي نجمعها"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "We collect information that you provide directly to us, such as when you make a donation, sign up for our newsletter, or contact us for support. This may include:"
                      : "نجمع المعلومات التي تقدمها لنا مباشرة، مثل عندما تتبرع أو تشترك في نشرتنا الإخبارية أو تتصل بنا للحصول على الدعم. قد يشمل ذلك:"
                    }
                  </p>
                  
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Personal identification information (name, email address, phone number)"
                          : "معلومات التعريف الشخصية (الاسم، عنوان البريد الإلكتروني، رقم الهاتف)"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Donation and payment information"
                          : "معلومات التبرع والدفع"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Communication preferences and history"
                          : "تفضيلات التواصل والتاريخ"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* How We Use Your Information */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "How We Use Your Information" : "كيف نستخدم معلوماتك"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "We use the information we collect to:"
                      : "نستخدم المعلومات التي نجمعها من أجل:"
                    }
                  </p>
                  
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Process and acknowledge your donations"
                          : "معالجة والاعتراف بتبرعاتك"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Send you updates about our programs and impact"
                          : "إرسال تحديثات حول برامجنا وتأثيرنا"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Respond to your inquiries and provide support"
                          : "الرد على استفساراتك وتقديم الدعم"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Improve our services and website functionality"
                          : "تحسين خدماتنا ووظائف موقعنا"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Data Protection */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Data Protection" : "حماية البيانات"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:"
                      : "نحن نطبق تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. تشمل هذه التدابير:"
                    }
                  </p>
                  
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Encryption of sensitive data during transmission"
                          : "تشفير البيانات الحساسة أثناء النقل"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Regular security assessments and updates"
                          : "التقييمات الأمنية والتحديثات المنتظمة"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Limited access to personal information on a need-to-know basis"
                          : "الوصول المحدود للمعلومات الشخصية على أساس الحاجة للمعرفة"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Contact Us" : "اتصل بنا"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "If you have any questions about this Privacy Policy or our data practices, please contact us:"
                      : "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالبيانات، يرجى الاتصال بنا:"
                    }
                  </p>
                  
                  <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {isLocaleEnglish ? "Email:" : "البريد الإلكتروني:"}
                      </span>
                      <span>privacy@Ibtisamadev.org</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {isLocaleEnglish ? "Phone:" : "الهاتف:"}
                      </span>
                      <span>+967 1 234 5678</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {isLocaleEnglish ? "Address:" : "العنوان:"}
                      </span>
                      <span>
                        {isLocaleEnglish 
                          ? "123 Development Street, Sana'a, Yemen"
                          : "شارع الأربعين 123، مأرب، اليمن"
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Last Updated */}
              <motion.div variants={fadeInUp} className="text-center pt-8 border-t border-muted">
                <p className="text-sm text-muted-foreground">
                  {isLocaleEnglish 
                    ? "Last updated: December 2024"
                    : "آخر تحديث: ديسمبر 2024"
                  }
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
