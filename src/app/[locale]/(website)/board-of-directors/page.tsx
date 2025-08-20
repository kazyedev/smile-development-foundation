'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Shield, 
  Scale, 
  FileText, 
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Award,
  BookOpen,
  Target,
  Clock,
  Building,
  Gavel,
  Eye
} from 'lucide-react';
import { use } from 'react';

interface BoardOfDirectorsPageProps {
  params: Promise<{ locale: string }>;
}

export default function BoardOfDirectorsPage({ params }: BoardOfDirectorsPageProps) {
  const { locale } = use(params);
  
  const isLocaleEnglish = locale === 'en';

  const content = {
    hero: {
      title: {
        en: "Board of Directors",
        ar: "مجلس الإدارة"
      },
      subtitle: {
        en: "Leadership, Governance, and Strategic Direction",
        ar: "القيادة والحوكمة والتوجه الاستراتيجي"
      },
      description: {
        en: "Meet the dedicated leaders who provide strategic oversight, governance, and direction to ensure our foundation's mission is fulfilled with integrity and excellence.",
        ar: "تعرف على القادة المتفانين الذين يوفرون الإشراف الاستراتيجي والحوكمة والتوجيه لضمان تحقيق مهمة مؤسستنا بنزاهة وتميز."
      }
    },
    governance: {
      title: { en: "Governance Structure", ar: "هيكل الحوكمة" },
      description: {
        en: "Our board operates under a robust governance framework that ensures transparency, accountability, and effective decision-making in all our activities.",
        ar: "يعمل مجلس إدارتنا في إطار حوكمة قوي يضمن الشفافية والمساءلة واتخاذ القرارات الفعالة في جميع أنشطتنا."
      },
      structure: [
        {
          icon: Users,
          title: { en: "Board Composition", ar: "تكوين المجلس" },
          description: {
            en: "7 distinguished members representing diverse expertise in healthcare, education, finance, and community development.",
            ar: "7 أعضاء متميزين يمثلون خبرات متنوعة في الرعاية الصحية والتعليم والمالية والتنمية المجتمعية."
          }
        },
        {
          icon: Calendar,
          title: { en: "Meeting Schedule", ar: "جدولة الاجتماعات" },
          description: {
            en: "Quarterly board meetings with additional special sessions as needed to address urgent matters and strategic planning.",
            ar: "اجتماعات فصلية للمجلس مع جلسات خاصة إضافية حسب الحاجة لمعالجة الأمور العاجلة والتخطيط الاستراتيجي."
          }
        },
        {
          icon: FileText,
          title: { en: "Committees", ar: "اللجان" },
          description: {
            en: "Specialized committees for Finance & Audit, Programs & Impact, and Governance & Ethics ensure focused oversight.",
            ar: "لجان متخصصة للمالية والتدقيق والبرامج والتأثير والحوكمة والأخلاق تضمن إشرافاً مركزاً."
          }
        },
        {
          icon: Scale,
          title: { en: "Accountability", ar: "المساءلة" },
          description: {
            en: "Regular reporting, annual evaluations, and transparent communication with stakeholders maintain highest standards.",
            ar: "التقارير المنتظمة والتقييمات السنوية والتواصل الشفاف مع أصحاب المصلحة يحافظ على أعلى المعايير."
          }
        }
      ]
    },
    boardMembers: [
      {
        id: 1,
        name: { en: "Dr. Ahmed Al-Rashid", ar: "د. أحمد الراشد" },
        position: { en: "Chairman of the Board", ar: "رئيس مجلس الإدارة" },
        expertise: { en: "Healthcare Leadership", ar: "قيادة الرعاية الصحية" },
        experience: { en: "25+ years", ar: "25+ سنة" },
        education: {
          en: "MD from Mareb University, MBA from American University",
          ar: "دكتوراه في الطب من جامعة مأرب، ماجستير إدارة الأعمال من الجامعة الأمريكية"
        },
        bio: {
          en: "Dr. Al-Rashid brings over 25 years of healthcare leadership experience, having served as Chief Medical Officer at several regional hospitals. His vision for accessible healthcare drives our medical programs forward.",
          ar: "يجلب د. الراشد أكثر من 25 عامًا من الخبرة في قيادة الرعاية الصحية، بعد أن شغل منصب كبير المسؤولين الطبيين في عدة مستشفيات إقليمية. رؤيته للرعاية الصحية المتاحة تقود برامجنا الطبية إلى الأمام."
        },
        committees: [
          { en: "Executive Committee", ar: "اللجنة التنفيذية" },
          { en: "Programs & Impact Committee", ar: "لجنة البرامج والتأثير" }
        ],
        linkedin: "https://linkedin.com/in/ahmed-alrashid",
        joinedDate: "2020-01-15"
      },
      {
        id: 2,
        name: { en: "Prof. Fatima Al-Zahra", ar: "أ.د. فاطمة الزهراء" },
        position: { en: "Vice Chairman", ar: "نائب رئيس المجلس" },
        expertise: { en: "Education & Development", ar: "التعليم والتنمية" },
        experience: { en: "20+ years", ar: "20+ سنة" },
        education: {
          en: "PhD in Education from Oxford University, MA in International Development",
          ar: "دكتوراه في التربية من جامعة أكسفورد، ماجستير في التنمية الدولية"
        },
        bio: {
          en: "Professor Al-Zahra is a renowned education specialist with extensive experience in curriculum development and educational policy. She champions our educational initiatives with passion and expertise.",
          ar: "الأستاذة الزهراء متخصصة مشهورة في التعليم مع خبرة واسعة في تطوير المناهج والسياسة التعليمية. تدافع عن مبادراتنا التعليمية بشغف وخبرة."
        },
        committees: [
          { en: "Programs & Impact Committee", ar: "لجنة البرامج والتأثير" },
          { en: "Governance & Ethics Committee", ar: "لجنة الحوكمة والأخلاق" }
        ],
        linkedin: "https://linkedin.com/in/fatima-alzahra",
        joinedDate: "2020-03-20"
      },
      {
        id: 3,
        name: { en: "Mr. Omar Saleh", ar: "الأستاذ عمر صالح" },
        position: { en: "Treasurer", ar: "أمين الصندوق" },
        expertise: { en: "Financial Management", ar: "الإدارة المالية" },
        experience: { en: "18+ years", ar: "18+ سنة" },
        education: {
          en: "CPA, Master's in Finance from London School of Economics",
          ar: "محاسب قانوني معتمد، ماجستير في المالية من كلية لندن للاقتصاد"
        },
        bio: {
          en: "Mr. Saleh oversees our financial operations with meticulous attention to detail and unwavering commitment to fiscal responsibility. His expertise ensures optimal resource allocation for maximum impact.",
          ar: "الأستاذ صالح يشرف على عملياتنا المالية بعناية دقيقة والتزام ثابت بالمسؤولية المالية. خبرته تضمن التخصيص الأمثل للموارد لتحقيق أقصى تأثير."
        },
        committees: [
          { en: "Finance & Audit Committee", ar: "لجنة المالية والتدقيق" },
          { en: "Executive Committee", ar: "اللجنة التنفيذية" }
        ],
        linkedin: "https://linkedin.com/in/omar-saleh",
        joinedDate: "2020-06-10"
      },
      {
        id: 4,
        name: { en: "Dr. Maryam Hassan", ar: "د. مريم حسن" },
        position: { en: "Secretary", ar: "الأمين العام" },
        expertise: { en: "Public Health", ar: "الصحة العامة" },
        experience: { en: "15+ years", ar: "15+ سنة" },
        education: {
          en: "DrPH from Johns Hopkins, MPH in Epidemiology",
          ar: "دكتوراه في الصحة العامة من جونز هوبكنز، ماجستير في علم الأوبئة"
        },
        bio: {
          en: "Dr. Hassan specializes in public health with focus on community health programs and disease prevention. Her research-driven approach strengthens our health initiatives' effectiveness.",
          ar: "د. حسن متخصصة في الصحة العامة مع التركيز على برامج الصحة المجتمعية والوقاية من الأمراض. نهجها القائم على البحث يعزز فعالية مبادراتنا الصحية."
        },
        committees: [
          { en: "Programs & Impact Committee", ar: "لجنة البرامج والتأثير" },
          { en: "Governance & Ethics Committee", ar: "لجنة الحوكمة والأخلاق" }
        ],
        linkedin: "https://linkedin.com/in/maryam-hassan",
        joinedDate: "2021-01-05"
      }
    ],
    committees: {
      title: { en: "Board Committees", ar: "لجان المجلس" },
      description: {
        en: "Our specialized committees ensure focused attention on key areas of governance and operations.",
        ar: "لجاننا المتخصصة تضمن التركيز على المجالات الرئيسية للحوكمة والعمليات."
      },
      list: [
        {
          name: { en: "Executive Committee", ar: "اللجنة التنفيذية" },
          chair: { en: "Dr. Ahmed Al-Rashid", ar: "د. أحمد الراشد" },
          purpose: {
            en: "Handles urgent decisions between board meetings and oversees day-to-day strategic direction.",
            ar: "تتعامل مع القرارات العاجلة بين اجتماعات المجلس وتشرف على التوجه الاستراتيجي اليومي."
          },
          members: 3
        },
        {
          name: { en: "Finance & Audit Committee", ar: "لجنة المالية والتدقيق" },
          chair: { en: "Mr. Omar Saleh", ar: "الأستاذ عمر صالح" },
          purpose: {
            en: "Oversees financial management, budgeting, audit processes, and ensures fiscal responsibility.",
            ar: "تشرف على الإدارة المالية والميزانية وعمليات التدقيق وتضمن المسؤولية المالية."
          },
          members: 3
        },
        {
          name: { en: "Programs & Impact Committee", ar: "لجنة البرامج والتأثير" },
          chair: { en: "Prof. Fatima Al-Zahra", ar: "أ.د. فاطمة الزهراء" },
          purpose: {
            en: "Reviews program effectiveness, monitors impact metrics, and guides program development.",
            ar: "تراجع فعالية البرامج وتراقب مقاييس التأثير وتوجه تطوير البرامج."
          },
          members: 4
        },
        {
          name: { en: "Governance & Ethics Committee", ar: "لجنة الحوكمة والأخلاق" },
          chair: { en: "Dr. Maryam Hassan", ar: "د. مريم حسن" },
          purpose: {
            en: "Ensures compliance with governance standards, ethical guidelines, and board effectiveness.",
            ar: "تضمن الامتثال لمعايير الحوكمة والمبادئ التوجيهية الأخلاقية وفعالية المجلس."
          },
          members: 3
        }
      ]
    },
    responsibilities: {
      title: { en: "Board Responsibilities", ar: "مسؤوليات المجلس" },
      items: [
        {
          icon: Target,
          title: { en: "Strategic Direction", ar: "التوجه الاستراتيجي" },
          description: {
            en: "Setting organizational vision, mission, and long-term strategic goals to guide the foundation's growth.",
            ar: "وضع رؤية ومهمة المنظمة والأهداف الاستراتيجية طويلة المدى لتوجيه نمو المؤسسة."
          }
        },
        {
          icon: Shield,
          title: { en: "Risk Management", ar: "إدارة المخاطر" },
          description: {
            en: "Identifying, assessing, and mitigating organizational risks to ensure sustainable operations.",
            ar: "تحديد وتقييم وتخفيف المخاطر التنظيمية لضمان العمليات المستدامة."
          }
        },
        {
          icon: Scale,
          title: { en: "Financial Oversight", ar: "الإشراف المالي" },
          description: {
            en: "Ensuring proper financial management, budget approval, and accountability for all resources.",
            ar: "ضمان الإدارة المالية السليمة واعتماد الميزانية والمساءلة عن جميع الموارد."
          }
        },
        {
          icon: Eye,
          title: { en: "Performance Monitoring", ar: "مراقبة الأداء" },
          description: {
            en: "Regularly reviewing organizational performance against established goals and impact metrics.",
            ar: "مراجعة منتظمة لأداء المنظمة مقابل الأهداف المحددة ومقاييس التأثير."
          }
        }
      ]
    },
    contact: {
      title: { en: "Board Contact", ar: "التواصل مع المجلس" },
      description: {
        en: "For board-related inquiries, governance matters, or partnership opportunities, please contact our board secretariat.",
        ar: "للاستفسارات المتعلقة بالمجلس أو مسائل الحوكمة أو فرص الشراكة، يرجى الاتصال بأمانة مجلس الإدارة."
      },
      email: "board@Ibtisamadev.org",
      secretary: {
        name: { en: "Ms. Layla Ahmad", ar: "الآنسة ليلى أحمد" },
        title: { en: "Board Secretary", ar: "أمين سر المجلس" },
        phone: "+967 1 234 5690",
        email: "secretary@Ibtisamadev.org"
      }
    }
  };

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? content.hero.title.en : content.hero.title.ar}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 opacity-90"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? content.hero.subtitle.en : content.hero.subtitle.ar}
            </motion.p>
            <motion.p 
              className="text-lg leading-relaxed opacity-80"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? content.hero.description.en : content.hero.description.ar}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Governance Structure Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Building className="w-10 h-10" />
              {isLocaleEnglish ? content.governance.title.en : content.governance.title.ar}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish ? content.governance.description.en : content.governance.description.ar}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.governance.structure.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">
                        {isLocaleEnglish ? item.title.en : item.title.ar}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {isLocaleEnglish ? item.description.en : item.description.ar}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Users className="w-10 h-10" />
              {isLocaleEnglish ? "Board Members" : "أعضاء مجلس الإدارة"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish 
                ? "Distinguished leaders bringing diverse expertise and unwavering commitment to our mission."
                : "قادة متميزون يجلبون خبرات متنوعة والتزامًا راسخًا بمهمتنا."
              }
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.boardMembers.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-primary to-secondary">
                      <div className="w-full h-full bg-muted-foreground/20 flex items-center justify-center">
                        <Users className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      {isLocaleEnglish ? member.name.en : member.name.ar}
                    </CardTitle>
                    <p className="text-primary font-medium">
                      {isLocaleEnglish ? member.position.en : member.position.ar}
                    </p>
                    <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {isLocaleEnglish ? member.expertise.en : member.expertise.ar}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {isLocaleEnglish ? member.experience.en : member.experience.ar}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {isLocaleEnglish ? "Education" : "التعليم"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {isLocaleEnglish ? member.education.en : member.education.ar}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        {isLocaleEnglish ? "Biography" : "السيرة الذاتية"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {isLocaleEnglish ? member.bio.en : member.bio.ar}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        {isLocaleEnglish ? "Committees" : "اللجان"}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {member.committees.map((committee, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                            {isLocaleEnglish ? committee.en : committee.ar}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-xs text-muted-foreground">
                        {isLocaleEnglish ? "Joined" : "انضم في"}: {new Date(member.joinedDate).getFullYear()}
                      </span>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Board Committees Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileText className="w-10 h-10" />
              {isLocaleEnglish ? content.committees.title.en : content.committees.title.ar}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish ? content.committees.description.en : content.committees.description.ar}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.committees.list.map((committee, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {isLocaleEnglish ? committee.name.en : committee.name.ar}
                      </CardTitle>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {committee.members} {isLocaleEnglish ? "members" : "أعضاء"}
                      </span>
                    </div>
                    <p className="text-primary font-medium text-sm">
                      {isLocaleEnglish ? "Chair" : "الرئيس"}: {isLocaleEnglish ? committee.chair.en : committee.chair.ar}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {isLocaleEnglish ? committee.purpose.en : committee.purpose.ar}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Board Responsibilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Gavel className="w-10 h-10" />
              {isLocaleEnglish ? content.responsibilities.title.en : content.responsibilities.title.ar}
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.responsibilities.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">
                          {isLocaleEnglish ? item.title.en : item.title.ar}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {isLocaleEnglish ? item.description.en : item.description.ar}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Board Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Mail className="w-10 h-10" />
              {isLocaleEnglish ? content.contact.title.en : content.contact.title.ar}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish ? content.contact.description.en : content.contact.description.ar}
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {isLocaleEnglish ? content.contact.secretary.name.en : content.contact.secretary.name.ar}
                </CardTitle>
                <p className="text-primary font-medium">
                  {isLocaleEnglish ? content.contact.secretary.title.en : content.contact.secretary.title.ar}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-8">
                  <a 
                    href={`tel:${content.contact.secretary.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    <Phone className="w-5 h-5" />
                    {content.contact.secretary.phone}
                  </a>
                  <a 
                    href={`mailto:${content.contact.secretary.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    <Mail className="w-5 h-5" />
                    {content.contact.secretary.email}
                  </a>
                </div>
                
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    {isLocaleEnglish ? "General Board Email" : "البريد العام للمجلس"}
                  </p>
                  <a 
                    href={`mailto:${content.contact.email}`}
                    className="text-primary font-medium hover:text-primary/80"
                  >
                    {content.contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? "Join Our Mission" : "انضم إلى مهمتنا"}
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              {isLocaleEnglish 
                ? "Interested in contributing to our board or learning more about our governance? We welcome inquiries from qualified individuals."
                : "مهتم بالمساهمة في مجلسنا أو معرفة المزيد عن حوكمتنا؟ نرحب بالاستفسارات من الأفراد المؤهلين."
              }
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link href={`/${locale}/contact-us`}>
                <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  {isLocaleEnglish ? "Contact Us" : "اتصل بنا"}
                </Button>
              </Link>
              <Link href={`/${locale}/about-us`}>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                  {isLocaleEnglish ? "Learn More" : "اعرف المزيد"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}