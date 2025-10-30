"use client";

import React, { useEffect } from "react";
import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Handshake, 
  DollarSign, 
  Gift, 
  Award,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProgramStakeholdersProps {
  program: Program;
  locale: string;
}

export default function ProgramStakeholders({ program, locale }: ProgramStakeholdersProps) {
  const isEn = locale === "en";

  // Use actual program data
  const fundingProviders = program.fundingProviders || [];
  const donors = program.donors || [];
  const partners = program.partners || [];

  // Helper function to determine stakeholder type based on name or context
  const getStakeholderType = (name: string, category: 'funding' | 'donor' | 'partner') => {
    const lowerName = name.toLowerCase();
    
    if (category === 'funding') {
      if (lowerName.includes('bank') || lowerName.includes('fund') || lowerName.includes('aid')) {
        return 'financial';
      }
      return 'financial';
    }
    
    if (category === 'donor') {
      if (lowerName.includes('foundation') || lowerName.includes('alliance') || lowerName.includes('network')) {
        return 'ngo';
      }
      if (lowerName.includes('corp') || lowerName.includes('solutions') || lowerName.includes('group')) {
        return 'corporate';
      }
      return 'individual';
    }
    
    if (category === 'partner') {
      if (lowerName.includes('ministry') || lowerName.includes('government')) {
        return 'government';
      }
      if (lowerName.includes('council') || lowerName.includes('community')) {
        return 'community';
      }
      if (lowerName.includes('alliance') || lowerName.includes('federation')) {
        return 'ngo';
      }
      return 'government';
    }
    
    return 'ngo';
  };

  const getStakeholderIcon = (type: string, size: string = "w-5 h-5") => {
    switch (type) {
      case 'financial':
        return <DollarSign className={size} />;
      case 'individual':
        return <Users className={size} />;
      case 'corporate':
        return <Building2 className={size} />;
      case 'government':
        return <Award className={size} />;
      case 'community':
        return <Handshake className={size} />;
      case 'ngo':
        return <Gift className={size} />;
      default:
        return <Users className={size} />;
    }
  };

  const getStakeholderBadgeColor = (type: string) => {
    switch (type) {
      case 'financial':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'individual':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'corporate':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'government':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'community':
        return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
      case 'ngo':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950/50 dark:via-blue-950/20 dark:to-indigo-950/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" />
              {isEn ? "Program Stakeholders" : "أصحاب المصلحة في البرنامج"}
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {isEn ? "Our Partners & Supporters" : "شركاؤنا والداعمون"}
              </span>
            </h2>
            
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              {isEn 
                ? "This program is made possible through the collaboration of funding providers, generous donors, and strategic partners who share our vision for sustainable community development."
                : "هذا البرنامج ممكن من خلال التعاون مع مزودي التمويل، والمانحين الكرماء، والشركاء الاستراتيجيين الذين يشاركوننا رؤيتنا التنموية المجتمعية المستدامة."
              }
            </p>
          </div>

                     {/* Funding Providers Section */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="mb-16"
           >
             <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                 <DollarSign className="w-4 h-4" />
                 {isEn ? "Funding Providers" : "مزودو التمويل"}
               </div>
             </div>

                                                       <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                 {fundingProviders.map((provider, index) => {
                   const stakeholderType = getStakeholderType(isEn ? provider.nameEn : provider.nameAr, 'funding');
                   return (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                     >
                                               <div className="flex flex-col items-center text-center w-[160px] sm:w-[200px] h-[180px] sm:h-[220px] p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                            {provider.imageUrl ? (
                              <Image 
                                src={provider.imageUrl} 
                                alt={isEn ? provider.nameEn : provider.nameAr}
                                width={64}
                                height={64}
                                className="rounded-xl w-8 h-8 sm:w-12 sm:h-12"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${provider.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                              {getStakeholderIcon(stakeholderType, "w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400")}
                            </div>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base flex-1 flex items-center justify-center leading-tight">
                            {isEn ? provider.nameEn : provider.nameAr}
                          </h4>
                        </div>
                     </motion.div>
                   );
                 })}
               </div>
           </motion.div>

                     {/* Donors Section */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="mb-16"
           >
             <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                 <Gift className="w-4 h-4" />
                 {isEn ? "Generous Donors" : "المانحون الكرماء"}
               </div>
             </div>

                                                       <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                 {donors.map((donor, index) => {
                   const stakeholderType = getStakeholderType(isEn ? donor.nameEn : donor.nameAr, 'donor');
                   return (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                     >
                                               <div className="flex flex-col items-center text-center w-[160px] sm:w-[200px] h-[180px] sm:h-[220px] p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                            {donor.imageUrl ? (
                              <Image 
                                src={donor.imageUrl} 
                                alt={isEn ? donor.nameEn : donor.nameAr}
                                width={64}
                                height={64}
                                className="rounded-full w-8 h-8 sm:w-12 sm:h-12"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${donor.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                              {getStakeholderIcon(stakeholderType, "w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400")}
                            </div>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base flex-1 flex items-center justify-center leading-tight">
                            {isEn ? donor.nameEn : donor.nameAr}
                          </h4>
                        </div>
                     </motion.div>
                   );
                 })}
               </div>
           </motion.div>

                                {/* Partners Section */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="mb-16"
           >
             <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                 <Handshake className="w-4 h-4" />
                 {isEn ? "Strategic Partners" : "الشركاء الاستراتيجيون"}
               </div>
             </div>

                                                       <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                 {partners.map((partner, index) => {
                   const stakeholderType = getStakeholderType(isEn ? partner.nameEn : partner.nameAr, 'partner');
                   return (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: index * 0.1 }}
                     >
                                               <div className="flex flex-col items-center text-center w-[160px] sm:w-[200px] h-[180px] sm:h-[220px] p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                            {partner.imageUrl ? (
                              <Image 
                                src={partner.imageUrl} 
                                alt={isEn ? partner.nameEn : partner.nameAr}
                                width={64}
                                height={64}
                                className="rounded-xl w-8 h-8 sm:w-12 sm:h-12"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${partner.imageUrl ? 'hidden' : ''} flex items-center justify-center`}>
                              {getStakeholderIcon(stakeholderType, "w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400")}
                            </div>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base flex-1 flex items-center justify-center leading-tight">
                            {isEn ? partner.nameEn : partner.nameAr}
                          </h4>
                        </div>
                     </motion.div>
                   );
                 })}
               </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
