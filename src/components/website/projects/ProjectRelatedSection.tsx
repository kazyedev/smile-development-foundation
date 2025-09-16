"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/website/ProjectCard";
import { useMemo } from "react";

interface ProjectRelatedSectionProps {
  project: Project;
  locale: string;
  isEn: boolean;
  allProjects?: Project[];
}

export default function ProjectRelatedSection({ project, locale, isEn, allProjects = [] }: ProjectRelatedSectionProps) {
  const relatedProjects = useMemo(() => {
    if (!allProjects.length) return [];
    
    // Filter out current project and get related projects
    let related = allProjects.filter(p => p.id !== project.id);
    
    // Try to find projects with similar tags first
    const currentTags = isEn ? project.tagsEn : project.tagsAr;
    if (currentTags.length > 0) {
      const similarProjects = related.filter(p => {
        const projectTags = isEn ? p.tagsEn : p.tagsAr;
        return projectTags.some(tag => currentTags.includes(tag));
      });
      
      if (similarProjects.length >= 3) {
        return similarProjects.slice(0, 3);
      } else {
        // If not enough similar projects, add random ones
        const remainingProjects = related.filter(p => !similarProjects.includes(p));
        return [...similarProjects, ...remainingProjects].slice(0, 3);
      }
    }
    
    // If no tags or no similar projects, return first 3
    return related.slice(0, 3);
  }, [allProjects, project, isEn]);

  // Don't render the section if there are no related projects
  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/10 dark:from-background dark:via-brand-primary/10 dark:to-brand-secondary/5"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            {isEn ? "More Projects" : "مشاريع أخرى"}
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? "Discover more impactful projects that are making a real difference in communities across the region."
              : "اكتشف المزيد من المشاريع المؤثرة التي تحدث فرقًا حقيقيًا في المجتمعات عبر المنطقة."
            }
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {relatedProjects.map((otherProject, index) => (
            <div
              key={otherProject.id}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={otherProject} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
