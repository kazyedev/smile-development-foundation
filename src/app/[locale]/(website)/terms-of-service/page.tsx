'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, CheckCircle, AlertTriangle, Users, Shield } from 'lucide-react';

interface TermsOfServicePageProps {
  params: Promise<{ locale: string }>;
}

export default function TermsOfServicePage({ params }: TermsOfServicePageProps) {
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
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 via-brand-secondary/5 to-brand-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-brand-secondary/10 rounded-full mb-6"
              variants={fadeInUp}
            >
              <Scale className="w-10 h-10 text-brand-secondary" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? "Terms of Service" : "شروط الخدمة"}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              variants={fadeInUp}
            >
              {isLocaleEnglish 
                ? "These terms govern your use of our website and services. By using our platform, you agree to these terms and conditions."
                : "تحكم هذه الشروط استخدامك لموقعنا وخدماتنا. باستخدام منصتنا، فإنك توافق على هذه الشروط والأحكام."
              }
            </motion.p>
            
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-brand-secondary to-brand-primary mx-auto mt-8 rounded-full"
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
              {/* Acceptance of Terms */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Acceptance of Terms" : "قبول الشروط"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
                      : "من خلال الوصول إلى هذا الموقع واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة."
                    }
                  </p>
                  
                  <div className="bg-brand-secondary/5 border border-brand-secondary/20 rounded-lg p-6">
                    <p className="text-foreground font-medium">
                      {isLocaleEnglish 
                        ? "Your continued use of our services constitutes acceptance of any changes to these terms."
                        : "استخدامك المستمر لخدماتنا يشكل قبولاً لأي تغييرات على هذه الشروط."
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Use License */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Use License" : "ترخيص الاستخدام"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"
                      : "يُمنح الإذن لتنزيل نسخة مؤقتة واحدة من المواد (المعلومات أو البرامج) على موقعنا للعرض الشخصي غير التجاري المؤقت فقط. هذا منح ترخيص وليس نقل ملكية، وتحت هذا الترخيص لا يجوز لك:"
                    }
                  </p>
                  
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Modify or copy the materials"
                          : "تعديل أو نسخ المواد"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Use the materials for any commercial purpose"
                          : "استخدام المواد لأي غرض تجاري"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Remove any copyright or other proprietary notations"
                          : "إزالة أي حقوق نشر أو تسميات ملكية أخرى"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* User Conduct */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "User Conduct" : "سلوك المستخدم"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "When using our services, you agree to:"
                      : "عند استخدام خدماتنا، فإنك توافق على:"
                    }
                  </p>
                  
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Provide accurate and truthful information"
                          : "تقديم معلومات دقيقة وصادقة"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Respect the rights of other users"
                          : "احترام حقوق المستخدمين الآخرين"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Use the services for lawful purposes only"
                          : "استخدام الخدمات للأغراض القانونية فقط"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Maintain the security of your account"
                          : "الحفاظ على أمان حسابك"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Donations and Payments */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Donations and Payments" : "التبرعات والمدفوعات"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "When making donations through our platform:"
                      : "عند التبرع من خلال منصتنا:"
                    }
                  </p>
                  
                  <ul className="space-y-2 pl-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "All donations are voluntary and non-refundable"
                          : "جميع التبرعات طوعية وغير قابلة للاسترداد"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "We use secure payment processors to protect your information"
                          : "نستخدم معالجات دفع آمنة لحماية معلوماتك"
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {isLocaleEnglish 
                          ? "Donations will be used for our charitable programs and initiatives"
                          : "سيتم استخدام التبرعات لبرامجنا ومبادراتنا الخيرية"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Limitation of Liability" : "تقييد المسؤولية"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "In no event shall our foundation, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise."
                      : "في أي حال من الأحوال، لا تكون مؤسستنا، ولا أي من مسؤوليها أو مديريها أو موظفيها، مسؤولة أمامك عن أي شيء ينشأ عن أو بأي شكل من الأشكال متصل باستخدامك لهذا الموقع، سواء كانت هذه المسؤولية بموجب عقد أو خطأ أو غير ذلك."
                    }
                  </p>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {isLocaleEnglish 
                        ? "Our total liability to you for all claims arising from the use of this website shall not exceed the amount you paid, if any, for accessing this website."
                        : "إجمالي مسؤوليتنا أمامك لجميع المطالبات الناشئة عن استخدام هذا الموقع لا تتجاوز المبلغ الذي دفعته، إن وجد، للوصول إلى هذا الموقع."
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Governing Law */}
              <motion.div variants={fadeInUp} className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {isLocaleEnglish ? "Governing Law" : "القانون الحاكم"}
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isLocaleEnglish 
                      ? "These terms and conditions are governed by and construed in accordance with the laws of Yemen. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Yemen."
                      : "هذه الشروط والأحكام محكومة ومفسرة وفقاً لقوانين اليمن. أي نزاعات تتعلق بهذه الشروط والأحكام ستخضع للولاية القضائية الحصرية لمحاكم اليمن."
                    }
                  </p>
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
                      ? "If you have any questions about these Terms of Service, please contact us:"
                      : "إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا:"
                    }
                  </p>
                  
                  <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {isLocaleEnglish ? "Email:" : "البريد الإلكتروني:"}
                      </span>
                      <span>legal@Ibtisamadev.org</span>
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
