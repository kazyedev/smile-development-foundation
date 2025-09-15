import { Project } from "@/types";

export const mockProjects: Project[] = [
        {
          id: 7,
          isEnglish: true,
          isArabic: true,
          titleEn: "Clean Water for All",
          titleAr: "مياه نظيفة للجميع",
          descriptionEn:
            "A community-led initiative providing safe drinking water to rural villages through solar-powered purification systems.",
          descriptionAr:
            "مبادرة يقودها المجتمع لتوفير مياه شرب آمنة للقرى الريفية عبر أنظمة تنقية تعمل بالطاقة الشمسية.",
          
            featuredImageUrl: "/assets/mockimage.jpg",
          color: "#2A9D8F",
          banners: [
            {
              titleEn: "Water Access Point",
              titleAr: "نقطة وصول المياه",
              imageUrl: "/assets/mockimage.jpg",
            },
            {
              titleEn: "Community Training",
              titleAr: "تدريب المجتمع",
                imageUrl: "/assets/mockimage.jpg",
            },
          ],
          goalsEn: [
            "Provide clean drinking water to 5,000 residents",
            "Reduce waterborne diseases by 70% within two years",
            "Train locals to maintain purification systems",
          ],
          goalsAr: [
            "توفير مياه شرب نظيفة لـ 5000 مقيم",
            "تقليل الأمراض المنقولة بالمياه بنسبة 70٪ خلال عامين",
            "تدريب السكان المحليين على صيانة أنظمة التنقية",
          ],
          videoUrl: "https://www.youtube.com/watch?v=haFo_EWNrcU",
          statics: [
            {
              icon: "tint",
              titleEn: "Water Delivered",
              titleAr: "المياه الموزعة",
              value: 120000,
              unitEn: "Liters",
              unitAr: "لتر",
            },
            {
              icon: "users",
              titleEn: "Beneficiaries",
              titleAr: "المستفيدون",
              value: 5000,
              unitEn: "People",
              unitAr: "شخص",
            },
          ],
          fundingProviders: [
            { 
              nameEn: "United Nations Development Programme (UNDP)", 
              nameAr: "برنامج الأمم المتحدة الإنمائي", 
              imageUrl: "/assets/mocklogo.png" 
            },
            { 
              nameEn: "World Bank Group", 
              nameAr: "مجموعة البنك الدولي", 
              imageUrl: "/assets/mocklogo.png" 
            },
            { 
              nameEn: "European Union Humanitarian Aid", 
              nameAr: "المساعدات الإنسانية للاتحاد الأوروبي", 
              imageUrl: "/assets/mocklogo.png" 
            },
            { 
              nameEn: "USAID Development Programs", 
              nameAr: "برامج التنمية الأمريكية", 
              imageUrl: "/assets/mocklogo.png" 
            },
            { 
              nameEn: "Gulf Cooperation Council Fund", 
              nameAr: "صندوق مجلس التعاون الخليجي", 
              imageUrl: "/assets/mocklogo.png" 
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
          deliverables: [
            {
              titleEn: "Purification Units Installed",
              titleAr: "وحدات التنقية المثبتة",
              value: "15",
              unitEn: "Units",
              unitAr: "وحدة",
            },
            {
              titleEn: "Water Access Points",
              titleAr: "نقاط وصول المياه",
              value: "8",
              unitEn: "Points",
              unitAr: "نقطة",
            },
          ],
          resources: [
            {
              titleEn: "Solar Purification Kit",
              titleAr: "عدة تنقية بالطاقة الشمسية",
              image: "/assets/mockicon.png",
            },
            {
              titleEn: "Water Testing Kit",
              titleAr: "عدة اختبار المياه",
              image: "/assets/mockicon.png",
            },
          ],
          slugEn: "clean-water-for-all",
          slugAr: "مياه-نظيفة-للجميع",
          keywordsEn: ["clean water", "sustainability", "health", "community"],
          keywordsAr: ["مياه نظيفة", "استدامة", "صحة", "مجتمع"],
          tagsEn: ["Water", "Health", "Environment"],
          tagsAr: ["المياه", "الصحة", "البيئة"],
          pageViews: 1240,
          programId: 1,
          categoryId: 1,
          activityIds: [12, 15],
          isPublished: true,
          publishedAt: new Date("2025-05-10T09:00:00Z"),
          createdAt: new Date("2025-04-25T14:30:00Z"),
          updatedAt: new Date("2025-08-01T11:45:00Z"),
          cost: [
            {
              costTitleEn: "Cost Title",
              costTitleAr: "التكلفة الشهرية",
              costAmount: 10000,
              costCurrencyEn: "USD",
              costCurrencyAr: "دولار",
              costPeriodEn: "monthly",
              costPeriodAr: "شهريا",
            },
            {
              costTitleEn: "Cost Title",
              costTitleAr: " التكلفة السنوية",
              costAmount: 120000,
              costCurrencyEn: "USD",
              costCurrencyAr: "دولار",
              costPeriodEn: "annually",
              costPeriodAr: "سنويا",
            },
          ],
          beneficiaries: [
            {
              beneficiaryAmount: 1000,
              beneficiaryTargetEn: "Families",
              beneficiaryTargetAr: "عائلة",
            },
          ],
        }
    
];


