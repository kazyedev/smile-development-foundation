import { Users, Heart, MapPin, Award, Droplet, GraduationCap, Stethoscope, TreePine } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { formatLargeNumber } from "@/utils/formatLargeNumber";

interface Statistic {
  icon: string;
  titleEn: string;
  titleAr: string;
  value: number;
  unitEn: string;
  unitAr: string;
}

const getLucideIcon = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Users,
    Heart,
    MapPin,
    Award,
    Droplet,
    GraduationCap,
    Stethoscope,
    TreePine,
  };
  return iconMap[iconName] || Users;
};

const mockStatistics: Statistic[] = [
  {
    icon: "Users",
    titleEn: "People Served",
    titleAr: "الأشخاص المخدومون",
    value: 25000,
    unitEn: "Beneficiaries",
    unitAr: "مستفيد",
  },
  {
    icon: "MapPin",
    titleEn: "Communities Reached",
    titleAr: "المجتمعات المخدومة",
    value: 85,
    unitEn: "Villages",
    unitAr: "قرية",
  },
  {
    icon: "Droplet",
    titleEn: "Clean Water Access",
    titleAr: "الوصول للمياه النظيفة",
    value: 120,
    unitEn: "Wells Built",
    unitAr: "بئر منشأ",
  },
  {
    icon: "GraduationCap",
    titleEn: "Educational Programs",
    titleAr: "البرامج التعليمية",
    value: 15,
    unitEn: "Programs",
    unitAr: "برنامج",
  },
  {
    icon: "Stethoscope",
    titleEn: "Medical Missions",
    titleAr: "البعثات الطبية",
    value: 42,
    unitEn: "Missions",
    unitAr: "بعثة",
  },
  {
    icon: "TreePine",
    titleEn: "Trees Planted",
    titleAr: "الأشجار المزروعة",
    value: 8500,
    unitEn: "Trees",
    unitAr: "شجرة",
  },
];

export default function StaticSection({ locale }: { locale: string }) {
  const isLocaleEnglish = locale === "en";

  return (
    <div className="flex flex-col gap-8 px-4 py-16 bg-muted/30">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          {isLocaleEnglish ? "Our Impact in Numbers" : "تأثيرنا بالأرقام"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isLocaleEnglish 
            ? "These numbers represent the real lives touched and communities transformed through our dedicated work and your generous support."
            : "هذه الأرقام تمثل الحياة الحقيقية التي تم لمسها والمجتمعات التي تم تحويلها من خلال عملنا المتفاني ودعمكم السخي."
          }
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {mockStatistics.map((stat, index) => {
          const Icon = getLucideIcon(stat.icon);
          return (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {isLocaleEnglish ? stat.titleEn : stat.titleAr}
              </div>
              <div className="text-xs text-muted-foreground">
                {isLocaleEnglish ? stat.unitEn : stat.unitAr}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}