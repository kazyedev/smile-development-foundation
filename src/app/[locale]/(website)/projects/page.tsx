"use client";

import { mockProjects } from "@/data/mockProjects";
import ProjectCard from "@/components/website/ProjectCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-2xl font-bold text-center">
        {isEn ? "Projects" : "المشاريع"}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.25 }} className="text-center text-muted-foreground max-w-2xl mx-auto">
        {isEn ? "Browse all our projects across programs and categories." : "تصفح جميع مشاريعنا عبر البرامج والفئات."}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-7xl mx-auto">
        {mockProjects.map((project, idx) => (
          <motion.div key={project.slugEn} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx, duration: 0.25 }}>
            <ProjectCard project={project} locale={locale} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}