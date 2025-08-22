import { Program } from "@/types/program";

export const mockPrograms: Program[] = [
  {
    id: 1,
    titleEn: "Sustainable Community Development Initiative",
    titleAr: "مبادرة التنمية المجتمعية المستدامة",
    descriptionEn: "A comprehensive program focused on creating lasting positive change through education, healthcare, economic empowerment, and environmental sustainability.",
    descriptionAr: "برنامج شامل يركز على خلق تغيير إيجابي دائم من خلال التعليم والرعاية الصحية والتمكين الاقتصادي والاستدامة البيئية.",
    aboutEn: "Our Sustainable Community Development Initiative is a holistic approach to community transformation that addresses the interconnected challenges of poverty, education gaps, healthcare access, and environmental degradation. Through strategic partnerships, community engagement, and evidence-based interventions, we work to create self-sustaining communities that can thrive independently. The program integrates multiple sectors including education, healthcare, economic development, and environmental conservation to ensure comprehensive and lasting impact.",
    aboutAr: "مبادرة التنمية المجتمعية المستدامة هي نهج شامل لتحويل المجتمع يتعامل مع التحديات المترابطة للفقر والفجوات التعليمية والوصول إلى الرعاية الصحية وتدهور البيئة. من خلال الشراكات الاستراتيجية والمشاركة المجتمعية والتدخلات القائمة على الأدلة، نعمل على خلق مجتمعات مستدامة ذاتياً يمكنها الازدهار بشكل مستقل. يدمج البرنامج قطاعات متعددة تشمل التعليم والرعاية الصحية والتنمية الاقتصادية والحفاظ على البيئة لضمان تأثير شامل ودائم.",
    goalsEn: [
      "Establish 15 community learning centers serving over 5,000 students annually",
      "Provide comprehensive healthcare services to 10,000+ community members",
      "Create 500 sustainable employment opportunities through skill development",
      "Implement environmental conservation projects benefiting 20+ communities",
      "Build capacity for 200+ local leaders and community organizers"
    ],
    goalsAr: [
      "إنشاء 15 مركز تعليمي مجتمعي يخدم أكثر من 5000 طالب سنوياً",
      "توفير خدمات رعاية صحية شاملة لأكثر من 10000 عضو في المجتمع",
      "خلق 500 فرصة عمل مستدامة من خلال تطوير المهارات",
      "تنفيذ مشاريع الحفاظ على البيئة لصالح أكثر من 20 مجتمعاً",
      "بناء قدرات أكثر من 200 قائد محلي ومنظم مجتمعي"
    ],
    statics: [
      { titleEn: "Learning Centers Established", titleAr: "المراكز التعليمية المنشأة", value: 12 },
      { titleEn: "Students Enrolled", titleAr: "الطلاب المسجلون", value: 4200 },
      { titleEn: "Healthcare Beneficiaries", titleAr: "مستفيدو الرعاية الصحية", value: 8500 },
      { titleEn: "Jobs Created", titleAr: "الوظائف المنشأة", value: 320 },
      { titleEn: "Communities Served", titleAr: "المجتمعات المخدومة", value: 18 },
      { titleEn: "Environmental Projects", titleAr: "المشاريع البيئية", value: 15 }
    ],
    icon: "Globe",
    color: "#3B82F6",
    implementationLocationEn: "Multiple Governorates: Aden, Marib, Hadramout, and Taiz",
    implementationLocationAr: "محافظات متعددة: عدن ومأرب وحضرموت وتعز",
    fundingProviders: [
      { 
        nameEn: "United Nations Development Programme (UNDP)", 
        nameAr: "برنامج الأمم المتحدة الإنمائي", 
        imageUrl: "/assets/partners/undp-logo.png" 
      },
      { 
        nameEn: "World Bank Group", 
        nameAr: "مجموعة البنك الدولي", 
        imageUrl: "/assets/partners/world-bank-logo.png" 
      },
      { 
        nameEn: "European Union Humanitarian Aid", 
        nameAr: "المساعدات الإنسانية للاتحاد الأوروبي", 
        imageUrl: "/assets/partners/eu-aid-logo.png" 
      },
      { 
        nameEn: "USAID Development Programs", 
        nameAr: "برامج التنمية الأمريكية", 
        imageUrl: "/assets/partners/usaid-logo.png" 
      },
      { 
        nameEn: "Gulf Cooperation Council Fund", 
        nameAr: "صندوق مجلس التعاون الخليجي", 
        imageUrl: "/assets/partners/gcc-fund-logo.png" 
      }
    ],
    donors: [
      { 
        nameEn: "Global Community Foundation", 
        nameAr: "مؤسسة المجتمع العالمي", 
        imageUrl: "/assets/donors/gcf-logo.png" 
      },
      { 
        nameEn: "Humanitarian Aid Network", 
        nameAr: "شبكة المساعدات الإنسانية", 
        imageUrl: "/assets/donors/han-logo.png" 
      },
      { 
        nameEn: "Sustainable Future Fund", 
        nameAr: "صندوق المستقبل المستدام", 
        imageUrl: "/assets/donors/sff-logo.png" 
      },
      { 
        nameEn: "Community Builders Alliance", 
        nameAr: "تحالف بناة المجتمع", 
        imageUrl: "/assets/donors/cba-logo.png" 
      },
      { 
        nameEn: "Hope for Tomorrow Initiative", 
        nameAr: "مبادرة الأمل للغد", 
        imageUrl: "/assets/donors/hfti-logo.png" 
      }
    ],
    partners: [
      { 
        nameEn: "Ministry of Social Affairs and Labor", 
        nameAr: "وزارة الشؤون الاجتماعية والعمل", 
        imageUrl: "/assets/partners/msal-logo.png" 
      },
      { 
        nameEn: "Ministry of Education and Higher Education", 
        nameAr: "وزارة التربية والتعليم والتعليم العالي", 
        imageUrl: "/assets/partners/mehe-logo.png" 
      },
      { 
        nameEn: "Ministry of Public Health and Population", 
        nameAr: "وزارة الصحة العامة والسكان", 
        imageUrl: "/assets/partners/mphp-logo.png" 
      },
      { 
        nameEn: "Local Development Councils Network", 
        nameAr: "شبكة مجالس التنمية المحلية", 
        imageUrl: "/assets/partners/ldcn-logo.png" 
      },
      { 
        nameEn: "Community-Based Organizations Federation", 
        nameAr: "اتحاد المنظمات المجتمعية", 
        imageUrl: "/assets/partners/cbof-logo.png" 
      }
    ],
    featuredImageUrl: "/assets/mockimage.jpg",
    slides: [
      { 
        titleEn: "Building Brighter Futures Together", 
        titleAr: "بناء مستقبل أكثر إشراقاً معاً", 
        imageUrl: "/assets/mockimage.jpg" 
      },
      { 
        titleEn: "Empowering Communities Through Education", 
        titleAr: "تمكين المجتمعات من خلال التعليم", 
        imageUrl: "/assets/mockimage.jpg" 
      },
      { 
        titleEn: "Sustainable Healthcare for All", 
        titleAr: "رعاية صحية مستدامة للجميع", 
        imageUrl: "/assets/mockimage.jpg" 
      },
      { 
        titleEn: "Economic Empowerment & Job Creation", 
        titleAr: "التمكين الاقتصادي وخلق الوظائف", 
        imageUrl: "/assets/mockimage.jpg" 
      },
      { 
        titleEn: "Environmental Conservation & Sustainability", 
        titleAr: "الحفاظ على البيئة والاستدامة", 
        imageUrl: "/assets/mockimage.jpg" 
      }
    ],
    slugEn: "sustainable-community-development-initiative",
    slugAr: "مبادرة-التنمية-المجتمعية-المستدامة",
    keywordsEn: [
      "community development", "sustainability", "education", "healthcare", 
      "economic empowerment", "environmental conservation", "capacity building",
      "social impact", "sustainable development", "community engagement"
    ],
    keywordsAr: [
      "التنمية المجتمعية", "الاستدامة", "التعليم", "الرعاية الصحية",
      "التمكين الاقتصادي", "الحفاظ على البيئة", "بناء القدرات",
      "التأثير الاجتماعي", "التنمية المستدامة", "المشاركة المجتمعية"
    ],
    tagsEn: [
      "Community Development", "Sustainability", "Education", "Healthcare",
      "Economic Development", "Environmental Conservation", "Capacity Building"
    ],
    tagsAr: [
      "التنمية المجتمعية", "الاستدامة", "التعليم", "الرعاية الصحية",
      "التنمية الاقتصادية", "الحفاظ على البيئة", "بناء القدرات"
    ],
    includeInSitemapEn: true,
    includeInSitemapAr: true,
    pageViews: 2847,
    createdBy: "system",
    isPublished: true,
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2024-01-20"),
  }
];
