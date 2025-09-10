"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  ArrowRight,
  FolderOpen
} from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/website/ProjectCard";

interface ProgramRelatedProjectsProps {
  relatedProjects: Project[];
  locale: string;
}

export default function ProgramRelatedProjects({ relatedProjects, locale }: ProgramRelatedProjectsProps) {
  const isEn = locale === "en";

  if (relatedProjects.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium mb-6">
              <FolderOpen className="w-4 h-4" />
              {isEn ? "Related Projects" : "المشاريع ذات الصلة"}
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Program Projects" : "مشاريع البرنامج"}
            </h2>
            
            <div className="bg-background border border-border rounded-2xl p-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No Related Projects" : "لا توجد مشاريع ذات صلة"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isEn 
                  ? "There are currently no projects associated with this program. Check back later for updates."
                  : "لا توجد حالياً مشاريع مرتبطة بهذا البرنامج. تحقق لاحقاً للحصول على التحديثات."
                }
              </p>
              <Button asChild variant="outline">
                <Link href={`/${locale}/projects`}>
                  {isEn ? "View All Projects" : "عرض جميع المشاريع"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              {isEn ? "Related Projects" : "المشاريع ذات الصلة"}
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Program Projects" : "مشاريع البرنامج"}
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Explore the specific projects and initiatives that are part of this comprehensive program."
                : "استكشف المشاريع والمبادرات المحددة التي تشكل جزءاً من هذا البرنامج الشامل."
              }
            </p>
          </div>

                     {/* Projects Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {relatedProjects.map((project, index) => (
               <motion.div
                 key={project.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 <ProjectCard project={project} locale={locale} />
               </motion.div>
             ))}
           </div>

          {/* View All Projects CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="px-8 py-3">
              <Link href={`/${locale}/projects`}>
                {isEn ? "View All Projects" : "عرض جميع المشاريع"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
