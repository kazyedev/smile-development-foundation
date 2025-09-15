"use client";

import { motion } from "framer-motion";
import { Target, CheckCircle } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectGoalsAndImpactSectionProps {
  project: Project;
  isEn: boolean;
}

export default function ProjectGoalsAndImpactSection({ project, isEn }: ProjectGoalsAndImpactSectionProps) {
  if (!project.goalsEn?.length && !project.statics?.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium mb-4">
          <Target className="w-4 h-4" />
          {isEn ? 'Goals & Impact' : 'الأهداف والتأثير'}
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {isEn ? 'What We Aim to Achieve & Our Impact' : 'ما نهدف إلى تحقيقه وتأثيرنا'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Goals */}
        {project.goalsEn?.length && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center">
              {isEn ? 'Project Goals' : 'أهداف المشروع'}
            </h3>
            <div className="space-y-4">
              {(isEn ? project.goalsEn : project.goalsAr).map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-background border border-border rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">
                      {isEn ? `Goal ${index + 1}` : `الهدف ${index + 1}`}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{goal}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Project Impact */}
        {project.statics?.length && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center">
              {isEn ? 'Project Impact' : 'احصائيات المشروع'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.statics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 bg-gradient-to-br from-background to-muted/30 border border-border rounded-xl hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-sm font-medium text-foreground mb-1">
                    {isEn ? stat.titleEn : stat.titleAr}
                  </div>
                  <div className="text-3xl font-bold text-brand-primary mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isEn ? stat.unitEn : stat.unitAr}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
