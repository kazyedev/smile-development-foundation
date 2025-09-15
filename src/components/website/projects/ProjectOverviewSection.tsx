"use client";

import { motion } from "framer-motion";
import { DollarSign, Users, FileText } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectOverviewSectionProps {
  project: Project;
  isEn: boolean;
}

export default function ProjectOverviewSection({ project, isEn }: ProjectOverviewSectionProps) {
  // Check if we have cost or beneficiaries data
  const hasCost = project.cost?.length > 0;
  const hasBeneficiaries = project.beneficiaries?.length > 0;
  const hasSidebarContent = hasCost || hasBeneficiaries;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className={`grid gap-8 ${hasSidebarContent ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {/* Description - 2/3 width on desktop if sidebar content exists, full width otherwise */}
        <div className={hasSidebarContent ? "lg:col-span-2" : "lg:col-span-1"}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="p-6 bg-background border border-border rounded-2xl h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {isEn ? 'Project Overview' : 'نظرة عامة على المشروع'}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn ? project.descriptionEn : project.descriptionAr}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cost and Beneficiaries - 1/3 width on desktop */}
        {hasSidebarContent && (
          <div className="lg:col-span-1 space-y-6">
          {/* Cost Section */}
          {project.cost?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="p-6 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 border border-green-200/50 dark:border-green-800/30 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {isEn ? 'Project Cost' : 'تكلفة المشروع'}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {project.cost.map((costItem, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-foreground">
                        {isEn ? costItem.costTitleEn : costItem.costTitleAr}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {costItem.costAmount.toLocaleString(isEn ? 'en-US' : 'ar-EG')}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {isEn ? costItem.costCurrencyEn : costItem.costCurrencyAr}
                        </span>
                        {(costItem.costPeriodEn || costItem.costPeriodAr) && (
                          <span className="text-xs text-muted-foreground">
                            / {isEn ? costItem.costPeriodEn : costItem.costPeriodAr}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Beneficiaries Section */}
          {project.beneficiaries?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {isEn ? 'Beneficiaries' : 'المستفيدون'}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {project.beneficiaries.map((beneficiary, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {beneficiary.beneficiaryAmount.toLocaleString(isEn ? 'en-US' : 'ar-EG')}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {isEn ? beneficiary.beneficiaryTargetEn : beneficiary.beneficiaryTargetAr}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
