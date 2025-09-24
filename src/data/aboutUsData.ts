export interface AboutUsContent {
  hero: {
    title: { en: string; ar: string };
    subtitle: { en: string; ar: string };
    description: { en: string; ar: string };
  };
  story: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  overview: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  mission: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  vision: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  values: Array<{
    icon: any;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
  }>;
  goals: {
    title: { en: string; ar: string };
    shortTerm: {
      title: { en: string; ar: string };
      items: Array<{ en: string; ar: string }>;
    };
    longTerm: {
      title: { en: string; ar: string };
      items: Array<{ en: string; ar: string }>;
    };
  };
  principles: {
    title: { en: string; ar: string };
    items: Array<{
      icon: any;
      title: { en: string; ar: string };
      description: { en: string; ar: string };
    }>;
  };
  policies: {
    title: { en: string; ar: string };
    items: Array<{
      icon: any;
      title: { en: string; ar: string };
      description: { en: string; ar: string };
    }>;
  };
  partners: {
    title: { en: string; ar: string };
    items: Array<{
      name: string;
      logo: string;
      description: { en: string; ar: string };
      role: { en: string; ar: string };
    }>;
  };
  supporters: {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    categories: Array<{
      title: { en: string; ar: string };
      icon: any;
      supporters: Array<{ en: string; ar: string }>;
    }>;
  };
  contact: {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    info: {
      phone: {
        title: { en: string; ar: string };
        items: Array<{ label: { en: string; ar: string }; value: string }>;
      };
      email: {
        title: { en: string; ar: string };
        items: Array<{ label: { en: string; ar: string }; value: string }>;
      };
      social: {
        title: { en: string; ar: string };
        items: Array<{
          platform: string;
          icon: any;
          url: string;
          handle: string;
        }>;
      };
      address: {
        title: { en: string; ar: string };
        street: { en: string; ar: string };
        city: { en: string; ar: string };
        coordinates: { lat: number; lng: number };
      };
    };
  };
  leadership: Array<{
    name: { en: string; ar: string };
    position: { en: string; ar: string };
    image: string;
    bio: { en: string; ar: string };
  }>;
  timeline: Array<{
    year: number;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
  }>;
  ctaContact: {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
  };
}

export const aboutUsContent: AboutUsContent = {
  hero: {
    title: {
      en: "About Ebtsama Development Foundation",
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
      en: "The Ebtsama Development Foundation was born from a vision to address the growing challenges facing Yemen's most vulnerable communities. Founded by a group of dedicated professionals and volunteers, we recognized the urgent need for sustainable solutions to health and education crises affecting thousands of families. Our journey began with a simple belief: every person deserves access to basic healthcare and quality education, regardless of their circumstances.",
      ar: "وُلدت مؤسسة الابتسامة للتنمية من رؤية لمعالجة التحديات المتزايدة التي تواجه أكثر المجتمعات اليمنية ضعفاً. تأسست من قبل مجموعة من المتخصصين والمتطوعين المتفانين، أدركنا الحاجة الملحة لحلول مستدامة لأزمات الصحة والتعليم التي تؤثر على آلاف العائلات. بدأت رحلتنا بإيمان بسيط: كل شخص يستحق الوصول إلى الرعاية الصحية الأساسية والتعليم الجيد، بغض النظر عن ظروفه."
    }
  },
  overview: {
    title: { en: "About the Organization", ar: "عن المؤسسة" },
    content: {
      en: "Ebtsama Development Foundation is a Yemeni non-profit charitable organization dedicated to creating sustainable positive change in communities across Yemen. We focus on delivering comprehensive health and education programs that address the most pressing needs of vulnerable populations.",
      ar: "مؤسسة ابتسامة التنموية هي منظمة إنسانية تعمل في اليمن لتقديم الدعم والمساعدة للفئات المحتاجة والهشة في المجتمع، بما في ذلك الأطفال، والأفراد ذوي الاحتياجات الخاصة. وتركز على تلبية الاحتياجات الأساسية : «الغذاء والصحة والتعليم » بهدف تحقيق حياة آمنة ومستقرة للفئات المستهدفة"
    }
  },
  mission: {
    title: { en: "Our Mission", ar: "رسالتنا" },
    content: {
      en: "To alleviate suffering and create sustainable positive change in Yemeni communities through innovative health and education programs, while empowering individuals and families to build better futures.",
      ar:"حشد الجهود وتوظيف الطاقات لصناعة البسمة على وجوه المحتاجين في اليمن من خلال مجموعة من البرامج التعليمية والصحية والاغاثية والتنموية"
    }
  },
  vision: {
    title: { en: "Our Vision", ar: "رؤيتنا" },
    content: {
      en: "To be the leading organization in social responsibility and sustainable community development, creating a Yemen where every individual has access to quality healthcare and education.",
      ar: "تحقيق التنمية الشاملة والعدالة الاجتماعية في اليمن من خلال تقديم الدعم الإنساني لتحسين حياة الأفراد والأسر"    }
  },
  values: [
    {
      icon: "Heart",
      title: { en: "Compassion", ar: "الرحمة" },
      description: { 
        en: "We approach every individual with empathy, understanding their unique challenges and circumstances.",
        ar: "نتعامل مع كل فرد بالتعاطف، ونفهم تحدياته وظروفه الفريدة."
      }
    },
    {
      icon: "Shield",
      title: { en: "Integrity", ar: "النزاهة" },
      description: { 
        en: "We maintain the highest standards of transparency and accountability in all our operations.",
        ar: "نحافظ على أعلى معايير الشفافية والمساءلة في جميع عملياتنا."
      }
    },
    {
      icon: "Lightbulb",
      title: { en: "Innovation", ar: "الابتكار" },
      description: { 
        en: "We continuously seek creative solutions to address complex social challenges.",
        ar: "نسعى باستمرار إلى حلول إبداعية لمعالجة التحديات الاجتماعية المعقدة."
      }
    },
    {
      icon: "Handshake",
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
        icon: "Scale",
        title: { en: "Human Dignity", ar: "الكرامة الإنسانية" },
        description: {
          en: "We uphold the inherent dignity and worth of every individual, regardless of their background or circumstances.",
          ar: "نحافظ على الكرامة والقيمة المتأصلة لكل فرد، بغض النظر عن خلفيته أو ظروفه."
        }
      },
      {
        icon: "Target",
        title: { en: "Community-Centered Approach", ar: "النهج المرتكز على المجتمع" },
        description: {
          en: "Our programs are designed with and for communities, ensuring local ownership and sustainable impact.",
          ar: "برامجنا مصممة مع المجتمعات وللمجتمعات، مما يضمن الملكية المحلية والتأثير المستدام."
        }
      },
      {
        icon: "CheckCircle",
        title: { en: "Evidence-Based Practice", ar: "الممارسة القائمة على الأدلة" },
        description: {
          en: "We base our interventions on proven methodologies and continuously evaluate our impact.",
          ar: "نبني تدخلاتنا على منهجيات مثبتة ونقيم تأثيرنا باستمرار."
        }
      },
      {
        icon: "Users",
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
        icon: "Shield",
        title: { en: "Transparency & Accountability", ar: "الشفافية والمساءلة" },
        description: {
          en: "Regular financial audits, public reporting, and stakeholder engagement ensure complete transparency in our operations.",
          ar: "التدقيق المالي المنتظم والتقارير العامة ومشاركة أصحاب المصلحة تضمن الشفافية الكاملة في عملياتنا."
        }
      },
      {
        icon: "FileText",
        title: { en: "Ethical Standards", ar: "المعايير الأخلاقية" },
        description: {
          en: "Strict adherence to international humanitarian standards and ethical guidelines in all our activities.",
          ar: "الالتزام الصارم بالمعايير الإنسانية الدولية والمبادئ التوجيهية الأخلاقية في جميع أنشطتنا."
        }
      },
      {
        icon: "Users",
        title: { en: "Non-Discrimination", ar: "عدم التمييز" },
        description: {
          en: "Equal treatment and opportunities for all beneficiaries, staff, and partners regardless of any personal characteristics.",
          ar: "المعاملة المتساوية والفرص لجميع المستفيدين والموظفين والشركاء بغض النظر عن أي خصائص شخصية."
        }
      },
      {
        icon: "Lightbulb",
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
        icon: "Target",
        supporters: [
          { en: "Anonymous Individual Donors", ar: "المتبرعون الأفراد المجهولون" },
          { en: "Local Business Community", ar: "مجتمع الأعمال المحلي" },
          { en: "International Foundations", ar: "المؤسسات الدولية" },
          { en: "Government Grants", ar: "المنح الحكومية" }
        ]
      },
      {
        title: { en: "Technical Support", ar: "الدعم التقني" },
        icon: "Lightbulb",
        supporters: [
          { en: "Medical Professionals Network", ar: "شبكة المتخصصين الطبيين" },
          { en: "Educational Consultants", ar: "المستشارون التعليميون" },
          { en: "Technology Partners", ar: "شركاء التكنولوجيا" },
          { en: "Research Institutions", ar: "مؤسسات البحث" }
        ]
      },
      {
        title: { en: "Community Volunteers", ar: "متطوعو المجتمع" },
        icon: "Heart",
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
          { label: { en: "General Inquiries", ar: "الاستفسارات العامة" }, value: "info@Ebtsamadev.org" },
          { label: { en: "Partnerships", ar: "الشراكات" }, value: "partnerships@Ebtsamadev.org" },
          { label: { en: "Volunteers", ar: "المتطوعون" }, value: "volunteers@Ebtsamadev.org" },
          { label: { en: "Press & Media", ar: "الصحافة والإعلام" }, value: "media@Ebtsamadev.org" }
        ]
      },
      social: {
        title: { en: "Social Media", ar: "وسائل التواصل الاجتماعي" },
        items: [
          { platform: "Facebook", icon: "Facebook", url: "https://facebook.com/Ebtsamadevfoundation", handle: "@EbtsamaDevFoundation" },
          { platform: "Twitter", icon: "Twitter", url: "https://twitter.com/Ebtsamadevfdn", handle: "@EbtsamaDevFdn" },
          { platform: "Instagram", icon: "Instagram", url: "https://instagram.com/Ebtsamadevfoundation", handle: "@EbtsamaDevFoundation" },
          { platform: "YouTube", icon: "Youtube", url: "https://youtube.com/@Ebtsamadevfoundation", handle: "@EbtsamaDevFoundation" }
        ]
      },
      address: {
        title: { en: "Physical Address", ar: "العنوان الفعلي" },
        street: { en: "123 Development Street", ar: "شارع الأربعين 123" },
        city: { en: "Sana'a, Yemen", ar: "مأرب، اليمن" },
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
        en: "Ebtsama Development Foundation officially launched with initial focus on emergency medical aid.",
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
