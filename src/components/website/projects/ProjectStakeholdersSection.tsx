"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, DollarSign, Gift } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectStakeholdersSectionProps {
  project: Project;
  isEn: boolean;
}

export default function ProjectStakeholdersSection({ project, isEn }: ProjectStakeholdersSectionProps) {
  if (!project.fundingProviders?.length && !project.donors?.length && !project.partners?.length) return null;

  // Count how many sections have data to determine grid layout
  const sectionsWithData = [
    project.fundingProviders?.length > 0,
    project.donors?.length > 0,
    project.partners?.length > 0
  ].filter(Boolean).length;

  // Determine grid class based on number of sections with data
  const getGridClass = () => {
    switch (sectionsWithData) {
      case 1: return "grid grid-cols-1 gap-8";
      case 2: return "grid grid-cols-1 lg:grid-cols-2 gap-8";
      case 3: return "grid grid-cols-1 lg:grid-cols-3 gap-8";
      default: return "grid grid-cols-1 gap-8";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
          <Users className="w-4 h-4" />
          {isEn ? 'Project Stakeholders' : 'أصحاب المصلحة في المشروع'}
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          {isEn ? 'Our Partners & Supporters' : 'شركاؤنا والداعمون'}
        </h2>
      </div>

      <div className={getGridClass()}>
        {/* Funding Providers */}
        {project.fundingProviders?.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 rounded-3xl border border-green-200/50 dark:border-green-800/30 p-6"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/50 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/30 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
            </div>

            <div className="relative">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium mb-3">
                  <DollarSign className="w-3 h-3" />
                  {isEn ? 'Funding Providers' : 'مزودي التمويل'}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground">
                  {isEn ? 'Financial Support' : 'الدعم المالي'}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {project.fundingProviders.map((provider, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-200/50 dark:border-green-800/30 rounded-xl hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-900/20 transition-all duration-300 w-[120px] sm:w-[140px]"
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
                      {provider.imageUrl ? (
                        <Image
                          src={provider.imageUrl}
                          alt={isEn ? provider.nameEn : provider.nameAr}
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
                      <div className={`${provider.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <h4 className="font-medium text-xs text-foreground leading-tight">
                      {isEn ? provider.nameEn : provider.nameAr}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Donors */}
        {project.donors?.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-3xl border border-blue-200/50 dark:border-blue-800/30 p-6"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-300/30 rounded-full blur-2xl transform translate-x-24 translate-y-24"></div>
            </div>

            <div className="relative">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                  <Gift className="w-3 h-3" />
                  {isEn ? 'Donors' : 'المتبرعون'}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground">
                  {isEn ? 'Generous Contributors' : 'المساهمون الكرماء'}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {project.donors.map((donor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/30 rounded-xl hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 transition-all duration-300 w-[120px] sm:w-[140px]"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                      {donor.imageUrl ? (
                        <Image
                          src={donor.imageUrl}
                          alt={isEn ? donor.nameEn : donor.nameAr}
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
                      <div className={`${donor.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                        <Gift className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h4 className="font-medium text-xs text-foreground leading-tight">
                      {isEn ? donor.nameEn : donor.nameAr}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Partners */}
        {project.partners?.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-purple-50/50 to-violet-50/30 dark:from-purple-950/20 dark:to-violet-950/10 rounded-3xl border border-purple-200/50 dark:border-purple-800/30 p-6"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-300/30 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
            </div>

            <div className="relative">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium mb-3">
                  <Users className="w-3 h-3" />
                  {isEn ? 'Partners' : 'الشركاء'}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground">
                  {isEn ? 'Implementation Partners' : 'شركاء التنفيذ'}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {project.partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/30 rounded-xl hover:shadow-lg hover:shadow-purple-100/50 dark:hover:shadow-purple-900/20 transition-all duration-300 w-[120px] sm:w-[140px]"
                  >
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
                      {partner.imageUrl ? (
                        <Image
                          src={partner.imageUrl}
                          alt={isEn ? partner.nameEn : partner.nameAr}
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
                      <div className={`${partner.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                        <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <h4 className="font-medium text-xs text-foreground leading-tight">
                      {isEn ? partner.nameEn : partner.nameAr}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
