"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";

interface ProjectKeywordsSectionProps {
  project: Project;
  isEn: boolean;
}

export default function ProjectKeywordsSection({ project, isEn }: ProjectKeywordsSectionProps) {
  // Don't render if there are no keywords or tags
  const hasKeywords = (isEn ? project.keywordsEn : project.keywordsAr)?.length > 0;
  const hasTags = (isEn ? project.tagsEn : project.tagsAr)?.length > 0;
  
  if (!hasKeywords && !hasTags) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h3 className="text-xl font-semibold mb-6">
        {isEn ? 'Project Keywords & Tags' : 'الكلمات المفتاحية والوسوم'}
      </h3>

      {hasKeywords && (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(isEn ? project.keywordsEn : project.keywordsAr).map((keyword) => (
            <span 
              key={keyword} 
              className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-brand-primary/10 hover:text-brand-primary transition-colors cursor-pointer"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      {hasTags && (
        <div className="flex flex-wrap justify-center gap-3">
          {(isEn ? project.tagsEn : project.tagsAr).map((tag) => (
            <span 
              key={tag} 
              className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium hover:bg-brand-primary/20 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.section>
  );
}
