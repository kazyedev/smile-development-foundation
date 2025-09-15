"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectVideoSectionProps {
  project: Project;
  isEn: boolean;
}

export default function ProjectVideoSection({ project, isEn }: ProjectVideoSectionProps) {
  if (!project.videoUrl) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium mb-4">
          <Play className="w-4 h-4" />
          {isEn ? 'Project Video' : 'فيديو المشروع'}
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {isEn ? 'Watch Our Project in Action' : 'شاهد مشروعنا في العمل'}
        </h2>
      </div>

      <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={project.videoUrl.replace('watch?v=', 'embed/')}
          title={isEn ? project.titleEn : project.titleAr}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.section>
  );
}
