import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";


const getLucideIcon = (iconName: string): LucideIcon => {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return IconComponent || LucideIcons.Circle; // fallback icon
};


export default function ProjectCard({ project, locale }: { project: Project, locale: string }) {
  const isLocaleEnglish = locale === "en";

  return (
    <Card className="w-full h-full pt-0 overflow-hidden relative hover:shadow-lg transition-shadow duration-200 group">
      <div className={`w-full h-48 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-t-lg absolute top-0 left-0 z-0`} style={{ backgroundColor: project.color }}></div>
      <CardHeader className="p-0 relative">
        <Image
          src={project.featuredImageUrl}
          alt={isLocaleEnglish ? project.titleEn : project.titleAr}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="space-y-2 ">
        <CardTitle className="text-lg font-semibold">
          {isLocaleEnglish ? project.titleEn : project.titleAr}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {isLocaleEnglish ? project.descriptionEn : project.descriptionAr}
        </CardDescription>

        {project.statics.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2">
            {project.statics.slice(0, 2).map((stat, idx) => {
              const Icon = getLucideIcon(stat.icon);
              return (
                <div key={idx} className="flex items-center gap-2 text-sm ">
                  <Icon className="w-5 h-5" />
                  <span>{`${stat.value} ${isLocaleEnglish ? stat.unitEn : stat.unitAr}`}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto flex justify-between ">
        <div className="flex justify-start items-center gap-2 text-sm text-muted-foreground">
          {isLocaleEnglish 
            ? project.tagsEn.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">#{tag}</span>
              ))
            : project.tagsAr.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">#{tag}</span>
              ))
          }
        </div>
        <Link href={`/projects/${isLocaleEnglish ? project.slugEn : project.slugAr}`} className="block">
          <Button variant="outline" size="sm">
            {isLocaleEnglish ? "View Project" : "عرض المشروع"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}