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
import { LucideIcon, ArrowRight, ExternalLink } from "lucide-react";

const getLucideIcon = (iconName: string): LucideIcon => {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return IconComponent || LucideIcons.Circle; // fallback icon
};

export default function ProjectCard({ project, locale }: { project: Project, locale: string }) {
  const isLocaleEnglish = locale === "en";

  const handleViewProject = () => {
    window.location.href = `/${locale}/projects/${isLocaleEnglish ? project.slugEn : project.slugAr}`;
  };

  return (
    <Card className="group w-full h-full overflow-hidden relative hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
      {/* Color overlay with enhanced hover effect */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-500 z-10 rounded-t-lg`}
        style={{ backgroundColor: project.color }}
      />

      {/* Image container with enhanced styling */}
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative">
          <Image
            src={project.featuredImageUrl}
            alt={isLocaleEnglish ? project.titleEn : project.titleAr}
            width={600}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating color indicator */}
          <div
            className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </CardHeader>

      {/* Content with improved spacing and typography */}
      <CardContent className="p-6 space-y-4 relative z-20">
        <div className="space-y-3">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
            {isLocaleEnglish ? project.titleEn : project.titleAr}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {isLocaleEnglish ? project.descriptionEn : project.descriptionAr}
          </CardDescription>
        </div>

        {/* Enhanced stats display */}
        {project.statics.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.statics.slice(0, 2).map((stat, idx) => {
              const Icon = getLucideIcon(stat.icon);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-2 rounded-lg group-hover:bg-muted/80 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 text-brand-primary" />
                  <span className="font-medium text-foreground">
                    {`${stat.value} ${isLocaleEnglish ? stat.unitEn : stat.unitAr}`}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Enhanced footer with better button styling */}
      <CardFooter className="p-6 pt-0 flex justify-between items-center relative z-20">
        {/* Tags with improved styling */}
        <div className="flex flex-wrap gap-2">
          {(isLocaleEnglish ? project.tagsEn : project.tagsAr).slice(0, 2).map((tag, index) => (
            <span
              key={tag}
              className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-medium border border-brand-primary/20 hover:bg-brand-primary/20 transition-colors duration-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Enhanced button with icon */}
        <Button
          variant="outline"
          size="sm"
          className="group/btn border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:shadow-lg"
          onClick={handleViewProject}
        >
          <span className="mr-2">
            {isLocaleEnglish ? "View Project" : "عرض المشروع"}
          </span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>

      {/* Enhanced hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />

      {/* Subtle border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-brand-primary/20 rounded-lg transition-colors duration-500 pointer-events-none" />
    </Card>
  );
}
