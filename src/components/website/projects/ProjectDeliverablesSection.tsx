"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gift, Download } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectDeliverablesSectionProps {
  project: Project;
  isEn: boolean;
}

export default function ProjectDeliverablesSection({ project, isEn }: ProjectDeliverablesSectionProps) {
  if (!project.deliverables?.length && !project.resources?.length) return null;

  // Count sections with data for dynamic layout
  const sectionsWithData = [
    project.deliverables?.length > 0,
    project.resources?.length > 0
  ].filter(Boolean).length;

  const getGridClass = () => {
    return sectionsWithData === 1 ? "grid grid-cols-1 gap-12" : "grid grid-cols-1 lg:grid-cols-2 gap-12";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
          <Gift className="w-4 h-4" />
          {isEn ? 'Project Outputs & Resources' : 'مخرجات وموارد المشروع'}
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {isEn ? 'What We Deliver & Include' : 'موارد ومخرجات المشروع'}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
          {isEn 
            ? 'Explore our deliverables and the resources provided as part of this project.'
            : 'استكشف مخرجاتنا والموارد المقدمة كجزء من هذا المشروع.'
          }
        </p>
      </div>

      <div className="relative">
        {/* Vertical Divider - Only visible on desktop */}
        {project.deliverables?.length && project.resources?.length && (
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 z-10">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            </div>
          </div>
        )}

        <div className={getGridClass()}>
          {/* Deliverables Section */}
          {project.deliverables?.length && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                  <Gift className="w-3 h-3" />
                  {isEn ? 'Deliverables' : 'المخرجات'}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {isEn ? 'What We Deliver' : 'ما قمنا بتقديمه'}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {project.deliverables.map((deliverable, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-background border border-border rounded-2xl text-center hover:shadow-lg transition-shadow duration-300 min-w-[200px] max-w-[280px] flex-1"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-3">
                      {deliverable.value}
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">
                      {isEn ? deliverable.titleEn : deliverable.titleAr}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {isEn ? deliverable.unitEn : deliverable.unitAr}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Section */}
          {project.resources?.length && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium mb-3">
                  <Download className="w-3 h-3" />
                  {isEn ? 'Resources' : 'الموارد'}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {isEn ? 'What This Project Includes' : 'معدات المشروع'}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {project.resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-background border border-border rounded-2xl min-w-[200px] max-w-[280px] flex-1"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                        {resource.image ? (
                          <Image 
                            src={resource.image} 
                            alt={isEn ? resource.titleEn : resource.titleAr} 
                            width={32} 
                            height={32}
                            className="rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`${resource.image ? 'hidden' : ''} flex items-center justify-center`}>
                          <Download className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg">
                        {isEn ? resource.titleEn : resource.titleAr}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
