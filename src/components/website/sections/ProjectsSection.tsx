import { Project } from "@/types/project";
import ProjectCard from "../ProjectCard";
const mockProjects: Project[] = [
  {
    id: 1,
    isEnglish: true,
    isArabic: true,
    titleEn: "Clean Water Initiative",
    titleAr: "مبادرة المياه النظيفة",
    descriptionEn: "Providing access to clean water in rural communities.",
    descriptionAr: "توفير المياه النظيفة في المناطق الريفية.",
    featuredImageUrl: "/assets/hero-1.jpg",
    color: "#3B82F6",
    banners: [
      {
        titleEn: "Join the mission",
        titleAr: "انضم إلى المهمة",
        imageUrl: "https://via.placeholder.com/300x150.png?text=Banner",
      },
    ],
    goalsEn: ["Install 50 wells", "Educate locals on water safety"],
    goalsAr: ["تركيب 50 بئرًا", "توعية السكان حول سلامة المياه"],
    videoUrl: "https://example.com/video.mp4",
    statics: [
      {
        icon: "Droplet",
        titleEn: "Wells Installed",
        titleAr: "الآبار المنصوبة",
        value: 32,
        unitEn: "Wells",
        unitAr: "بئر",
      },
    ],
    financialContributions: [
      {
        nameEn: "UNICEF",
        nameAr: "اليونيسف",
        percentage: 40,
      },
    ],
    deliverables: [
      {
        titleEn: "Water Pumps",
        titleAr: "مضخات المياه",
        value: "25",
        unitEn: "units",
        unitAr: "وحدة",
      },
    ],
    resources: [
      {
        titleEn: "Pump Installation Manual",
        titleAr: "دليل تركيب المضخة",
        icon: "📘",
        iconImageUrl: "https://via.placeholder.com/50.png?text=Manual",
      },
    ],
    slugEn: "clean-water-initiative",
    slugAr: "مبادرة-المياه-النظيفة",
    keywordsEn: ["water", "health", "rural"],
    keywordsAr: ["ماء", "صحة", "ريف"],
    tagsEn: ["Clean Water", "NGO"],
    tagsAr: ["مياه نظيفة", "منظمة"],
    pageViews: 123,
    programId: 1,
    categoryId: 1,
    activityIds: [1, 2],
    isPublished: true,
    publishedAt: new Date("2024-05-20"),
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: 2,
    isEnglish: true,
    isArabic: true,
    titleEn: "Digital Learning Centers",
    titleAr: "مراكز التعلم الرقمي",
    descriptionEn: "Equipping youth with digital skills for the future.",
    descriptionAr: "تمكين الشباب من المهارات الرقمية للمستقبل.",
    featuredImageUrl: "/assets/hero-2.jpg",
    color: "#10B981",
    banners: [],
    goalsEn: ["Train 1,000 students", "Build 5 centers"],
    goalsAr: ["تدريب 1000 طالب", "بناء 5 مراكز"],
    videoUrl: "",
    statics: [],
    financialContributions: [],
    deliverables: [],
    resources: [],
    slugEn: "digital-learning-centers",
    slugAr: "مراكز-التعلم-الرقمي",
    keywordsEn: ["education", "digital", "youth"],
    keywordsAr: ["تعليم", "رقمي", "شباب"],
    tagsEn: ["Education", "Tech"],
    tagsAr: ["تعليم", "تكنولوجيا"],
    pageViews: 85,
    programId: 2,
    categoryId: 2,
    activityIds: [],
    isPublished: true,
    publishedAt: new Date("2024-06-10"),
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: 3,
    isEnglish: true,
    isArabic: false,
    titleEn: "Solar Power for Schools",
    titleAr: "",
    descriptionEn: "Implementing solar panels to power remote schools.",
    descriptionAr: "",
    featuredImageUrl: "/assets/hero-3.jpg",
    color: "#F59E0B",
    banners: [],
    goalsEn: ["Lower electricity costs", "Promote sustainability"],
    goalsAr: [],
    videoUrl: "",
    statics: [],
    financialContributions: [],
    deliverables: [],
    resources: [],
    slugEn: "solar-power-schools",
    slugAr: "",
    keywordsEn: ["solar", "schools", "energy"],
    keywordsAr: [],
    tagsEn: ["Solar", "Sustainability"],
    tagsAr: [],
    pageViews: 42,
    programId: 3,
    categoryId: 3,
    activityIds: [],
    isPublished: false,
    publishedAt: new Date("2024-07-01"),
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-07-01"),
  },
];


export default function ProjectsSection() {
  return (
    <div className="flex flex-col  gap-4 px-4  py-10 border-t border-b border-[var(--secondary)]">
      <h1 className="text-2xl font-bold text-center">Projects Section</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4  justify-center items-center">
        { mockProjects.slice(0, 3).map( ( project ) => (
          <ProjectCard key={ project.id } project={ project }  />
        ) ) }
      </div>
    </div>
  );
}