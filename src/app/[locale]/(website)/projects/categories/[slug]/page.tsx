"use client";

import { mockProjectCategories } from "@/data/mockProjectCategories";
import { mockProjects } from "@/data/mockProjects";
import ProjectCard from "@/components/website/ProjectCard";
import Image from "next/image";
// import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";

interface ProjectCategoryDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default function ProjectCategoryDetailPage({ params }: ProjectCategoryDetailPageProps) {
  const { locale, slug } = use(params);
  const isEn = locale === 'en';
  const decoded = decodeURIComponent(slug);

  const category = mockProjectCategories.find(c => c.slugEn === decoded || c.slugAr === decoded);
  if (!category) {
    return <div className="px-4 py-10"><p className="text-center text-muted-foreground">{isEn ? 'Category not found.' : 'الفئة غير موجودة.'}</p></div>;
  }

  const projects = mockProjects.filter(p => p.categoryId === category.id);

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image src={category.featuredImageUrl} alt={isEn ? category.titleEn : category.titleAr} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{isEn ? category.titleEn : category.titleAr}</h1>
          {category.descriptionEn && (
            <p className="text-white/90 text-sm md:text-base max-w-3xl">{isEn ? category.descriptionEn : category.descriptionAr}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 w-full max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div key={project.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <ProjectCard project={project} locale={locale} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}