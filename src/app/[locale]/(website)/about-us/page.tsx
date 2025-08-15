'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Users, 
  Target, 
  Award, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Handshake,
  Shield,
  Lightbulb,
  CheckCircle,
  Eye,
  Compass,
  Building,
  FileText,
  Scale,
  Star,
  PlayCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { use } from 'react';

interface AboutUsPageProps {
  params: Promise<{ locale: string }>;
}

export default function AboutUsPage({ params }: AboutUsPageProps) {
  const { locale } = use(params);
  const isLocaleEnglish = locale === 'en';

  const content = {
    hero: {
      title: {
        en: "About Smile Development Foundation",
        ar: "عن مؤسسة الابتسامة للتنمية"
      },
      subtitle: {
        en: "Building Hope, Transforming Lives, Creating Sustainable Change",
        ar: "بناء الأمل، تحويل الحياة، خلق التغيير المستدام"
      },
      description: {
        en: "Since our establishment, we have been dedicated to alleviating suffering and creating positive change in Yemeni communities through innovative health and education programs.",
        ar: "منذ تأسيسنا، نحن مكرسون لتخفيف المعاناة وخلق تغيير إيجابي في المجتمعات اليمنية من خلال برامج صحية وتعليمية مبتكرة."
      }
    },
    story: {
      title: {
        en: "Our Story",
        ar: "قصتنا"
      },
      content: {
        en: "The Smile Development Foundation was born from a vision to address the growing challenges facing Yemen's most vulnerable communities. Founded by a group of dedicated professionals and volunteers, we recognized the urgent need for sustainable solutions to health and education crises affecting thousands of families. Our journey began with a simple belief: every person deserves access to basic healthcare and quality education, regardless of their circumstances.",
        ar: "وُلدت مؤسسة الابتسامة للتنمية من رؤية لمعالجة التحديات المتزايدة التي تواجه أكثر المجتمعات اليمنية ضعفاً. تأسست من قبل مجموعة من المتخصصين والمتطوعين المتفانين، أدركنا الحاجة الملحة لحلول مستدامة لأزمات الصحة والتعليم التي تؤثر على آلاف العائلات. بدأت رحلتنا بإيمان بسيط: كل شخص يستحق الوصول إلى الرعاية الصحية الأساسية والتعليم الجيد، بغض النظر عن ظروفه."
      }
    },
    overview: {
      title: { en: "About the Organization", ar: "عن المنظمة" },
      content: {
        en: "Smile Development Foundation is a Yemeni non-profit charitable organization dedicated to creating sustainable positive change in communities across Yemen. We focus on delivering comprehensive health and education programs that address the most pressing needs of vulnerable populations.",
        ar: "مؤسسة الابتسامة للتنمية هي منظمة خيرية يمنية غير ربحية مكرسة لخلق تغيير إيجابي مستدام في المجتمعات عبر اليمن. نركز على تقديم برامج صحية وتعليمية شاملة تلبي أهم احتياجات الفئات الضعيفة."
      }
    },
    mission: {
      title: { en: "Our Mission", ar: "رسالتنا" },
      content: {
        en: "To alleviate suffering and create sustainable positive change in Yemeni communities through innovative health and education programs, while empowering individuals and families to build better futures.",
        ar: "تخفيف المعاناة وخلق تغيير إيجابي مستدام في المجتمعات اليمنية من خلال برامج صحية وتعليمية مبتكرة، مع تمكين الأفراد والعائلات لبناء مستقبل أفضل."
      }
    },
    vision: {
      title: { en: "Our Vision", ar: "رؤيتنا" },
      content: {
        en: "To be the leading organization in social responsibility and sustainable community development, creating a Yemen where every individual has access to quality healthcare and education.",
        ar: "أن نكون المنظمة الرائدة في المسؤولية الاجتماعية والتنمية المجتمعية المستدامة، لخلق يمن يحصل فيه كل فرد على رعاية صحية وتعليم جيد."
      }
    },
    values: [
      {
        icon: Heart,
        title: { en: "Compassion", ar: "الرحمة" },
        description: { 
          en: "We approach every individual with empathy, understanding their unique challenges and circumstances.",
          ar: "نتعامل مع كل فرد بالتعاطف، ونفهم تحدياته وظروفه الفريدة."
        }
      },
      {
        icon: Shield,
        title: { en: "Integrity", ar: "النزاهة" },
        description: { 
          en: "We maintain the highest standards of transparency and accountability in all our operations.",
          ar: "نحافظ على أعلى معايير الشفافية والمساءلة في جميع عملياتنا."
        }
      },
      {
        icon: Lightbulb,
        title: { en: "Innovation", ar: "الابتكار" },
        description: { 
          en: "We continuously seek creative solutions to address complex social challenges.",
          ar: "نسعى باستمرار إلى حلول إبداعية لمعالجة التحديات الاجتماعية المعقدة."
        }
      },
      {
        icon: Handshake,
        title: { en: "Partnership", ar: "الشراكة" },
        description: { 
          en: "We believe in collaborative approaches that leverage community strengths and resources.",
          ar: "نؤمن بالنهج التعاوني الذي يستفيد من نقاط القوة والموارد المجتمعية."
        }
      }
    ],
    goals: {
      title: { en: "Organizational Goals", ar: "الأهداف التنظيمية" },
      shortTerm: {
        title: { en: "Short-term Goals (2024-2025)", ar: "الأهداف قصيرة المدى (2024-2025)" },
        items: [
          {
            en: "Expand medical services to reach 50,000 additional beneficiaries",
            ar: "توسيع الخدمات الطبية للوصول إلى 50,000 مستفيد إضافي"
          },
          {
            en: "Establish 10 new educational centers in underserved areas",
            ar: "إنشاء 10 مراكز تعليمية جديدة في المناطق المحرومة"
          },
          {
            en: "Launch digital health platform for remote consultations",
            ar: "إطلاق منصة صحية رقمية للاستشارات عن بُعد"
          },
          {
            en: "Train 500 local healthcare workers and teachers",
            ar: "تدريب 500 عامل صحي ومعلم محلي"
          }
        ]
      },
      longTerm: {
        title: { en: "Long-term Goals (2025-2030)", ar: "الأهداف طويلة المدى (2025-2030)" },
        items: [
          {
            en: "Achieve sustainable healthcare access for 100,000+ individuals",
            ar: "تحقيق الوصول المستدام للرعاية الصحية لأكثر من 100,000 فرد"
          },
          {
            en: "Establish a network of 50 community-based health and education centers",
            ar: "إنشاء شبكة من 50 مركزًا للصحة والتعليم المجتمعي"
          },
          {
            en: "Develop local capacity for self-sustaining community programs",
            ar: "تطوير القدرات المحلية للبرامج المجتمعية المستدامة ذاتياً"
          },
          {
            en: "Become a regional leader in innovative humanitarian solutions",
            ar: "أن نصبح رائدين إقليمياً في الحلول الإنسانية المبتكرة"
          }
        ]
      }
    },
    principles: {
      title: { en: "Core Principles", ar: "المبادئ الأساسية" },
      items: [
        {
          icon: Scale,
          title: { en: "Human Dignity", ar: "الكرامة الإنسانية" },
          description: {
            en: "We uphold the inherent dignity and worth of every individual, regardless of their background or circumstances.",
            ar: "نحافظ على الكرامة والقيمة المتأصلة لكل فرد، بغض النظر عن خلفيته أو ظروفه."
          }
        },
        {
          icon: Target,
          title: { en: "Community-Centered Approach", ar: "النهج المرتكز على المجتمع" },
          description: {
            en: "Our programs are designed with and for communities, ensuring local ownership and sustainable impact.",
            ar: "برامجنا مصممة مع المجتمعات وللمجتمعات، مما يضمن الملكية المحلية والتأثير المستدام."
          }
        },
        {
          icon: CheckCircle,
          title: { en: "Evidence-Based Practice", ar: "الممارسة القائمة على الأدلة" },
          description: {
            en: "We base our interventions on proven methodologies and continuously evaluate our impact.",
            ar: "نبني تدخلاتنا على منهجيات مثبتة ونقيم تأثيرنا باستمرار."
          }
        },
        {
          icon: Users,
          title: { en: "Inclusivity", ar: "الشمولية" },
          description: {
            en: "We ensure equal access to our services regardless of gender, ethnicity, religion, or social status.",
            ar: "نضمن المساواة في الوصول إلى خدماتنا بغض النظر عن الجنس أو العرق أو الدين أو الوضع الاجتماعي."
          }
        }
      ]
    },
    policies: {
      title: { en: "General Policies", ar: "السياسات العامة" },
      items: [
        {
          icon: Shield,
          title: { en: "Transparency & Accountability", ar: "الشفافية والمساءلة" },
          description: {
            en: "Regular financial audits, public reporting, and stakeholder engagement ensure complete transparency in our operations.",
            ar: "التدقيق المالي المنتظم والتقارير العامة ومشاركة أصحاب المصلحة تضمن الشفافية الكاملة في عملياتنا."
          }
        },
        {
          icon: FileText,
          title: { en: "Ethical Standards", ar: "المعايير الأخلاقية" },
          description: {
            en: "Strict adherence to international humanitarian standards and ethical guidelines in all our activities.",
            ar: "الالتزام الصارم بالمعايير الإنسانية الدولية والمبادئ التوجيهية الأخلاقية في جميع أنشطتنا."
          }
        },
        {
          icon: Users,
          title: { en: "Non-Discrimination", ar: "عدم التمييز" },
          description: {
            en: "Equal treatment and opportunities for all beneficiaries, staff, and partners regardless of any personal characteristics.",
            ar: "المعاملة المتساوية والفرص لجميع المستفيدين والموظفين والشركاء بغض النظر عن أي خصائص شخصية."
          }
        },
        {
          icon: Lightbulb,
          title: { en: "Continuous Improvement", ar: "التحسين المستمر" },
          description: {
            en: "Regular evaluation, learning, and adaptation to ensure maximum effectiveness and impact.",
            ar: "التقييم والتعلم والتكيف المنتظم لضمان أقصى فعالية وتأثير."
          }
        }
      ]
    },
    partners: {
      title: { en: "Our Partners", ar: "شركاؤنا" },
      items: [
        {
          name: "UNICEF",
          logo: "/partners/unicef.png",
          description: {
            en: "Strategic partner in child health and education initiatives, providing technical expertise and funding support.",
            ar: "شريك استراتيجي في مبادرات صحة وتعليم الأطفال، يقدم الخبرة التقنية والدعم المالي."
          },
          role: { en: "Health & Education Programs", ar: "برامج الصحة والتعليم" }
        },
        {
          name: "World Health Organization",
          logo: "/partners/who.png",
          description: {
            en: "Collaboration in healthcare delivery, medical training, and public health policy development.",
            ar: "التعاون في تقديم الرعاية الصحية والتدريب الطبي وتطوير سياسات الصحة العامة."
          },
          role: { en: "Healthcare Excellence", ar: "التميز في الرعاية الصحية" }
        },
        {
          name: "International Red Cross",
          logo: "/partners/redcross.png",
          description: {
            en: "Joint humanitarian efforts and emergency response coordination in crisis situations.",
            ar: "الجهود الإنسانية المشتركة وتنسيق الاستجابة للطوارئ في حالات الأزمات."
          },
          role: { en: "Emergency Response", ar: "الاستجابة للطوارئ" }
        },
        {
          name: "UNESCO",
          logo: "/partners/unesco.png",
          description: {
            en: "Educational development programs and capacity building initiatives for sustainable learning.",
            ar: "برامج التطوير التعليمي ومبادرات بناء القدرات للتعلم المستدام."
          },
          role: { en: "Education Development", ar: "تطوير التعليم" }
        }
      ]
    },
    supporters: {
      title: { en: "Our Supporters", ar: "داعمونا" },
      description: {
        en: "We are grateful to all individuals and organizations who support our mission through various contributions.",
        ar: "نحن ممتنون لجميع الأفراد والمنظمات الذين يدعمون مهمتنا من خلال مساهمات متنوعة."
      },
      categories: [
        {
          title: { en: "Financial Supporters", ar: "الداعمون الماليون" },
          icon: Target,
          supporters: [
            { en: "Anonymous Individual Donors", ar: "المتبرعون الأفراد المجهولون" },
            { en: "Local Business Community", ar: "مجتمع الأعمال المحلي" },
            { en: "International Foundations", ar: "المؤسسات الدولية" },
            { en: "Government Grants", ar: "المنح الحكومية" }
          ]
        },
        {
          title: { en: "Technical Support", ar: "الدعم التقني" },
          icon: Lightbulb,
          supporters: [
            { en: "Medical Professionals Network", ar: "شبكة المتخصصين الطبيين" },
            { en: "Educational Consultants", ar: "المستشارون التعليميون" },
            { en: "Technology Partners", ar: "شركاء التكنولوجيا" },
            { en: "Research Institutions", ar: "مؤسسات البحث" }
          ]
        },
        {
          title: { en: "Community Volunteers", ar: "متطوعو المجتمع" },
          icon: Heart,
          supporters: [
            { en: "Local Community Leaders", ar: "قادة المجتمع المحلي" },
            { en: "Student Volunteer Groups", ar: "مجموعات المتطوعين الطلاب" },
            { en: "Professional Volunteers", ar: "المتطوعون المتخصصون" },
            { en: "Diaspora Communities", ar: "مجتمعات الشتات" }
          ]
        }
      ]
    },
    contact: {
      title: { en: "Contact Information", ar: "معلومات الاتصال" },
      description: {
        en: "Get in touch with us through any of the following channels. We're here to answer your questions and support your involvement.",
        ar: "تواصل معنا من خلال أي من القنوات التالية. نحن هنا للإجابة على أسئلتك ودعم مشاركتك."
      },
      info: {
        phone: {
          title: { en: "Phone Numbers", ar: "أرقام الهاتف" },
          items: [
            { label: { en: "Main Office", ar: "المكتب الرئيسي" }, value: "+967 1 234 5678" },
            { label: { en: "Emergency Hotline", ar: "خط الطوارئ" }, value: "+967 1 234 5679" },
            { label: { en: "WhatsApp", ar: "واتساب" }, value: "+967 77 123 4567" }
          ]
        },
        email: {
          title: { en: "Email Addresses", ar: "عناوين البريد الإلكتروني" },
          items: [
            { label: { en: "General Inquiries", ar: "الاستفسارات العامة" }, value: "info@smiledev.org" },
            { label: { en: "Partnerships", ar: "الشراكات" }, value: "partnerships@smiledev.org" },
            { label: { en: "Volunteers", ar: "المتطوعون" }, value: "volunteers@smiledev.org" },
            { label: { en: "Press & Media", ar: "الصحافة والإعلام" }, value: "media@smiledev.org" }
          ]
        },
        social: {
          title: { en: "Social Media", ar: "وسائل التواصل الاجتماعي" },
          items: [
            { platform: "Facebook", icon: Facebook, url: "https://facebook.com/smiledevfoundation", handle: "@SmileDevFoundation" },
            { platform: "Twitter", icon: Twitter, url: "https://twitter.com/smiledevfdn", handle: "@SmileDevFdn" },
            { platform: "Instagram", icon: Instagram, url: "https://instagram.com/smiledevfoundation", handle: "@SmileDevFoundation" },
            { platform: "YouTube", icon: Youtube, url: "https://youtube.com/@smiledevfoundation", handle: "@SmileDevFoundation" }
          ]
        },
        address: {
          title: { en: "Physical Address", ar: "العنوان الفعلي" },
          street: { en: "123 Development Street", ar: "شارع التنمية 123" },
          city: { en: "Sana'a, Yemen", ar: "صنعاء، اليمن" },
          coordinates: { lat: 15.369445, lng: 44.191007 }
        }
      }
    },
    leadership: [
      {
        name: { en: "Ahmed Al-Yamani", ar: "أحمد اليماني" },
        position: { en: "Founder & CEO", ar: "المؤسس والرئيس التنفيذي" },
        image: "/assets/team/ahmed.jpg",
        bio: {
          en: "With over 15 years of experience in humanitarian work, Ahmed founded the organization with a vision to create sustainable change in Yemen.",
          ar: "مع أكثر من 15 عامًا من الخبرة في العمل الإنساني، أسس أحمد المنظمة برؤية لخلق تغيير مستدام في اليمن."
        }
      },
      {
        name: { en: "Dr. Fatima Hassan", ar: "د. فاطمة حسن" },
        position: { en: "Medical Director", ar: "المدير الطبي" },
        image: "/assets/team/fatima.jpg",
        bio: {
          en: "Dr. Hassan leads our healthcare initiatives with expertise in public health and community medicine.",
          ar: "تقود الدكتورة حسن مبادراتنا الصحية بخبرة في الصحة العامة وطب المجتمع."
        }
      },
      {
        name: { en: "Omar Saleh", ar: "عمر صالح" },
        position: { en: "Education Program Director", ar: "مدير البرامج التعليمية" },
        image: "/assets/team/omar.jpg",
        bio: {
          en: "Omar oversees our educational programs, bringing innovative teaching methods to underserved communities.",
          ar: "يشرف عمر على برامجنا التعليمية، جالباً طرق تدريس مبتكرة للمجتمعات المحرومة."
        }
      }
    ],
    timeline: [
      {
        year: 2020,
        title: { en: "Foundation Established", ar: "تأسيس المؤسسة" },
        description: { 
          en: "Smile Development Foundation officially launched with initial focus on emergency medical aid.",
          ar: "انطلقت مؤسسة الابتسامة للتنمية رسمياً مع التركيز الأولي على المساعدات الطبية الطارئة."
        }
      },
      {
        year: 2021,
        title: { en: "First Medical Mission", ar: "أول بعثة طبية" },
        description: { 
          en: "Successfully conducted our first large-scale medical mission, serving over 2,000 patients.",
          ar: "نجحنا في تنفيذ بعثتنا الطبية الأولى واسعة النطاق، خدمنا أكثر من 2000 مريض."
        }
      },
      {
        year: 2022,
        title: { en: "Education Program Launch", ar: "إطلاق البرنامج التعليمي" },
        description: { 
          en: "Launched comprehensive education programs, establishing our first learning centers.",
          ar: "أطلقنا برامج تعليمية شاملة، وأسسنا مراكز التعلم الأولى."
        }
      },
      {
        year: 2023,
        title: { en: "Digital Innovation", ar: "الابتكار الرقمي" },
        description: { 
          en: "Introduced digital learning platforms and telemedicine services to reach remote areas.",
          ar: "قدمنا منصات التعلم الرقمي وخدمات الطب عن بُعد للوصول إلى المناطق النائية."
        }
      },
      {
        year: 2024,
        title: { en: "Expansion & Growth", ar: "التوسع والنمو" },
        description: { 
          en: "Expanded operations to serve 25,000+ beneficiaries across 85+ communities.",
          ar: "وسعنا عملياتنا لخدمة أكثر من 25,000 مستفيد عبر أكثر من 85 مجتمعاً."
        }
      }
    ],
    ctaContact: {
      title: { en: "Get in Touch", ar: "تواصل معنا" },
      description: {
        en: "Ready to join our mission? Contact us to learn more about volunteer opportunities, partnerships, or how you can make a difference.",
        ar: "مستعد للانضمام إلى مهمتنا؟ اتصل بنا لمعرفة المزيد عن فرص التطوع أو الشراكات أو كيف يمكنك إحداث فرق."
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

      {/* About the Organization Section */}
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
              {isLocaleEnglish ? content.overview.title.en : content.overview.title.ar}
            </h2>
          </motion.div>

          {/* Overview */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-6">
                {isLocaleEnglish ? "Overview" : "نظرة عامة"}
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                {isLocaleEnglish ? content.overview.content.en : content.overview.content.ar}
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={`/${locale}/media/videos`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {isLocaleEnglish ? "Watch Our Story" : "شاهد قصتنا"}
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <Image
                src="/assets/hero-1.jpg"
                alt="Foundation overview"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>

          {/* Mission, Vision, Values Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Mission */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-center">
                    {isLocaleEnglish ? content.mission.title.en : content.mission.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {isLocaleEnglish ? content.mission.content.en : content.mission.content.ar}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl text-center">
                    {isLocaleEnglish ? content.vision.title.en : content.vision.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {isLocaleEnglish ? content.vision.content.en : content.vision.content.ar}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Story */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-center">
                    {isLocaleEnglish ? content.story.title.en : content.story.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    {isLocaleEnglish ? content.story.content.en.substring(0, 150) + "..." : content.story.content.ar.substring(0, 150) + "..."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">
                        {isLocaleEnglish ? value.title.en : value.title.ar}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {isLocaleEnglish ? value.description.en : value.description.ar}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Organizational Goals Section */}
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
              <Target className="w-10 h-10" />
              {isLocaleEnglish ? content.goals.title.en : content.goals.title.ar}
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Short-term Goals */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    {isLocaleEnglish ? content.goals.shortTerm.title.en : content.goals.shortTerm.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.goals.shortTerm.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {isLocaleEnglish ? item.en : item.ar}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Long-term Goals */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    {isLocaleEnglish ? content.goals.longTerm.title.en : content.goals.longTerm.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.goals.longTerm.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {isLocaleEnglish ? item.en : item.ar}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Principles Section */}
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
              <Scale className="w-10 h-10" />
              {isLocaleEnglish ? content.principles.title.en : content.principles.title.ar}
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.principles.items.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">
                          {isLocaleEnglish ? principle.title.en : principle.title.ar}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {isLocaleEnglish ? principle.description.en : principle.description.ar}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* General Policies Section */}
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
              <FileText className="w-10 h-10" />
              {isLocaleEnglish ? content.policies.title.en : content.policies.title.ar}
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.policies.items.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <CardTitle className="text-xl">
                          {isLocaleEnglish ? policy.title.en : policy.title.ar}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {isLocaleEnglish ? policy.description.en : policy.description.ar}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Partners Section */}
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
              <Handshake className="w-10 h-10" />
              {isLocaleEnglish ? content.partners.title.en : content.partners.title.ar}
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.partners.items.map((partner, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{partner.name}</CardTitle>
                        <p className="text-primary font-medium text-sm">
                          {isLocaleEnglish ? partner.role.en : partner.role.ar}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {isLocaleEnglish ? partner.description.en : partner.description.ar}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Supporters Section */}
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
              <Star className="w-10 h-10" />
              {isLocaleEnglish ? content.supporters.title.en : content.supporters.title.ar}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish ? content.supporters.description.en : content.supporters.description.ar}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.supporters.categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-center">
                        {isLocaleEnglish ? category.title.en : category.title.ar}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.supporters.map((supporter, supporterIndex) => (
                          <li key={supporterIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            {isLocaleEnglish ? supporter.en : supporter.ar}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isLocaleEnglish ? "Our Leadership" : "قيادتنا"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish 
                ? "Meet the dedicated leaders driving our mission forward with passion and expertise."
                : "تعرف على القادة المتفانين الذين يقودون مهمتنا إلى الأمام بشغف وخبرة."
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
            {content.leadership.map((leader, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-primary to-secondary">
                      <div className="w-full h-full bg-muted-foreground/20 flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      {isLocaleEnglish ? leader.name.en : leader.name.ar}
                    </CardTitle>
                    <p className="text-primary font-medium">
                      {isLocaleEnglish ? leader.position.en : leader.position.ar}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {isLocaleEnglish ? leader.bio.en : leader.bio.ar}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className=" text-3xl md:text-4xl font-bold mb-4">
              {isLocaleEnglish ? "Our Journey" : "رحلتنا"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish 
                ? "Key milestones that mark our growth and impact over the years."
                : "المعالم الرئيسية التي تمثل نمونا وتأثيرنا على مر السنين."
              }
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {content.timeline.map((milestone, index) => (
              <motion.div 
                key={index}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-12`}
                variants={fadeInUp}
              >
                <div className="flex-1 pr-8">
                  {index % 2 === 0 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold">
                          {isLocaleEnglish ? milestone.title.en : milestone.title.ar}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {isLocaleEnglish ? milestone.description.en : milestone.description.ar}
                      </p>
                    </Card>
                  )}
                </div>
                
                <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                
                <div className="flex-1 pl-8">
                  {index % 2 === 1 && (
                    <Card className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-brand-secondary text-primary rounded-full flex items-center justify-center font-bold">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold">
                          {isLocaleEnglish ? milestone.title.en : milestone.title.ar}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {isLocaleEnglish ? milestone.description.en : milestone.description.ar}
                      </p>
                    </Card>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
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
              <Phone className="w-10 h-10" />
              {isLocaleEnglish ? content.contact.title.en : content.contact.title.ar}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLocaleEnglish ? content.contact.description.en : content.contact.description.ar}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Contact Details */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Phone Numbers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="w-6 h-6" />
                    {isLocaleEnglish ? content.contact.info.phone.title.en : content.contact.info.phone.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.contact.info.phone.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        {isLocaleEnglish ? item.label.en : item.label.ar}
                      </span>
                      <a href={`tel:${item.value}`} className="font-medium hover:text-primary">
                        {item.value}
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Email Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-6 h-6" />
                    {isLocaleEnglish ? content.contact.info.email.title.en : content.contact.info.email.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.contact.info.email.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        {isLocaleEnglish ? item.label.en : item.label.ar}
                      </span>
                      <a href={`mailto:${item.value}`} className="font-medium hover:text-primary">
                        {item.value}
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Globe className="w-6 h-6" />
                    {isLocaleEnglish ? content.contact.info.social.title.en : content.contact.info.social.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.contact.info.social.items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="text-muted-foreground">{item.platform}</span>
                        </div>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary flex items-center gap-1"
                        >
                          {item.handle}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Address & Map */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    {isLocaleEnglish ? content.contact.info.address.title.en : content.contact.info.address.title.ar}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="font-medium">
                      {isLocaleEnglish ? content.contact.info.address.street.en : content.contact.info.address.street.ar}
                    </p>
                    <p className="text-muted-foreground">
                      {isLocaleEnglish ? content.contact.info.address.city.en : content.contact.info.address.city.ar}
                    </p>
                  </div>
                  
                  {/* Map Placeholder */}
                  <div className="h-64 bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {isLocaleEnglish ? "Interactive Map" : "خريطة تفاعلية"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isLocaleEnglish 
                          ? `Lat: ${content.contact.info.address.coordinates.lat}, Lng: ${content.contact.info.address.coordinates.lng}`
                          : `خط العرض: ${content.contact.info.address.coordinates.lat}، خط الطول: ${content.contact.info.address.coordinates.lng}`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
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
              {isLocaleEnglish ? content.ctaContact.title.en : content.ctaContact.title.ar}
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              {isLocaleEnglish ? content.ctaContact.description.en : content.ctaContact.description.ar}
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
              <Link href={`/${locale}/become-a-volunteer`}>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                  {isLocaleEnglish ? "Become a Volunteer" : "كن متطوعاً"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}