interface WhoWeAreSectionProps {
    bioEn: string;
    bioAr: string;
    image: string;
    videoUrlEn: string;
    videoUrlAr: string;
    visionEn: string;
    visionAr: string;
    messageEn: string;
    messageAr: string;
    valuesEn: string;
    valuesAr: string;
    goalsEn: string[];
    goalsAr: string[];
    policesEn: string[];
    policesAr: string[];
    rulesEn: string[];
    rulesAr: string[];
    seoAnnouncementEn: string;
    seoAnnouncementAr: string;
    locale: string;
    cards: {
        titleEn: string;
        titleAr: string;
        lucideIconName: string;
        linkEn: string;
        linkAr: string;
    }[];
}

export const mockWhoWeAreSection: WhoWeAreSectionProps = {
    bioEn:
      "We are a non-profit organization dedicated to creating sustainable solutions for communities in need. Our work spans education, healthcare, environment, and economic empowerment.",
    bioAr:
      "نحن منظمة غير ربحية مكرسة لإنشاء حلول مستدامة للمجتمعات المحتاجة. يمتد عملنا ليشمل التعليم والرعاية الصحية والبيئة والتمكين الاقتصادي.",
    image: "/assets/mockimage.jpg",
    videoUrlEn: "https://www.youtube.com/embed/g7hncMpviRY?si=o8DvaHRp3lhIxsVf",
    videoUrlAr: "https://www.youtube.com/embed/g7hncMpviRY?si=o8DvaHRp3lhIxsVf",
    visionEn:
      "A world where every individual has access to basic needs, equal opportunities, and the ability to shape their future.",
    visionAr:
      "عالم يتمتع فيه كل فرد بالاحتياجات الأساسية والفرص المتساوية والقدرة على تشكيل مستقبله.",
    messageEn:
      "Our message is one of hope, collaboration, and lasting change. Together, we can build resilient communities.",
    messageAr:
      "رسالتنا هي الأمل والتعاون والتغيير المستدام. معًا يمكننا بناء مجتمعات قادرة على الصمود.",
    valuesEn:
      "Integrity, Transparency, Innovation, Sustainability, and Respect for Diversity.",
    valuesAr:
      "النزاهة، الشفافية، الابتكار، الاستدامة، واحترام التنوع.",
    goalsEn: [
      "Expand education programs to reach 10,000 students",
      "Provide clean water to 50 rural communities",
      "Increase healthcare access in underserved areas",
      "Promote environmental conservation initiatives",
    ],
    goalsAr: [
      "توسيع برامج التعليم لتصل إلى 10,000 طالب",
      "توفير المياه النظيفة لـ 50 مجتمعًا ريفيًا",
      "زيادة الوصول إلى الرعاية الصحية في المناطق المحرومة",
      "تعزيز المبادرات الخاصة بالحفاظ على البيئة",
    ],
    policesEn: [
      "Child protection policy",
      "Anti-corruption policy",
      "Environmental responsibility policy",
    ],
    policesAr: [
      "سياسة حماية الطفل",
      "سياسة مكافحة الفساد",
      "سياسة المسؤولية البيئية",
    ],
    rulesEn: [
      "All members must comply with our code of ethics.",
      "Transparency in reporting is mandatory.",
      "Respect cultural and community values.",
    ],
    rulesAr: [
      "يجب على جميع الأعضاء الالتزام بمدونة الأخلاق الخاصة بنا.",
      "الشفافية في التقارير إلزامية.",
      "احترام القيم الثقافية والمجتمعية.",
    ],
    seoAnnouncementEn:
      "Empowering communities through education, healthcare, and sustainability initiatives.",
    seoAnnouncementAr:
      "تمكين المجتمعات من خلال التعليم والرعاية الصحية ومبادرات الاستدامة.",
    locale: "en", // or "ar" depending on testing needs
    cards: [
      {
        titleEn: "Our Programs",
        titleAr: "برامجنا",
        lucideIconName: "Layers",
        linkEn: "/en/programs",
        linkAr: "/ar/programs",
      },
      {
        titleEn: "Get Involved",
        titleAr: "انضم إلينا",
        lucideIconName: "Handshake",
        linkEn: "/en/donate",
        linkAr: "/ar/donate",
      },
      {
        titleEn: "Our Impact",
        titleAr: "تأثيرنا",
        lucideIconName: "TrendingUp",
        linkEn: "/en/projects",
        linkAr: "/ar/projects",
      },
      {
        titleEn: "Contact Us",
        titleAr: "اتصل بنا",
        lucideIconName: "Mail",
        linkEn: "/en/contact-us",
        linkAr: "/ar/contact-us",
      },
    ],
  };
  