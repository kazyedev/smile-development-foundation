"use client";

import { Program } from "@/types/program";
import { Project } from "@/types";
import { Story } from "@/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Eye,
  Tag,
  FileText,
  Palette,
  Handshake,
  Gift
} from "lucide-react";

// Import all section components
import {
  ProgramHero,
  ProgramAbout,
  ProgramGoals,
  ProgramStatistics,
  ProgramStakeholders,
  ProgramSlides,
  ProgramKeywordsTags,
  ProgramRelatedProjects,
  ProgramRelatedStories
} from './sections';

interface ProgramDetailClientProps {
  program: Program;
  relatedProjects: Project[];
  relatedStories: Story[];
  locale: string;
}

export default function ProgramDetailClient({ program, relatedProjects, relatedStories, locale }: ProgramDetailClientProps) {
  const isEn = locale === "en";

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(isEn ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleBecomePartner = () => {
    window.location.href = '/contact-us';
  };

  const handleDonate = () => {
    window.location.href = '/donate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <ProgramHero program={program} locale={locale} />

      {/* About Section */}
      <ProgramAbout program={program} locale={locale} />

      {/* Stakeholders Section (Funding Providers, Donors, Partners) */}
      <ProgramStakeholders program={program} locale={locale} />

      {/* Goals Section */}
      <ProgramGoals program={program} locale={locale} />

      {/* Statistics Section */}
      <ProgramStatistics program={program} locale={locale} />

      {/* Slides Section */}
      {/* <ProgramSlides program={program} locale={locale} /> */}

      {/* Keywords and Tags Section */}
      <ProgramKeywordsTags program={program} locale={locale} />

      {/* Related Projects Section */}
      <ProgramRelatedProjects relatedProjects={relatedProjects} locale={locale} />

      {/* Related Stories Section */}
      <ProgramRelatedStories relatedStories={relatedStories} locale={locale} />

             {/* Program Details */}
       <section className="py-16">
         <div className="container mx-auto px-4">
           <motion.div
             className="max-w-4xl mx-auto"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             {/* Tags and Keywords Row */}
             <div className="flex flex-col lg:flex-row gap-8 mb-12">
               {program.tagsEn && program.tagsEn.length > 0 && (
                 <Card className="flex-1">
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <Tag className="w-5 h-5" style={{ color: program.color }} />
                       {isEn ? "Tags" : "العلامات"}
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="flex flex-wrap gap-2">
                       {(isEn ? program.tagsEn : program.tagsAr).map((tag, index) => (
                         <Badge key={index} variant="secondary">
                           {tag}
                         </Badge>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               )}

               {program.keywordsEn && program.keywordsEn.length > 0 && (
                 <Card className="flex-1">
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <FileText className="w-5 h-5" style={{ color: program.color }} />
                       {isEn ? "Keywords" : "الكلمات المفتاحية"}
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="flex flex-wrap gap-2">
                       {(isEn ? program.keywordsEn : program.keywordsAr).map((keyword, index) => (
                         <Badge key={index} variant="outline">
                           {keyword}
                         </Badge>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               )}
             </div>

             {/* Support This Project Section */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-800/30">
                 <h3 className="text-2xl font-bold mb-4 text-center">
                   {isEn ? "Support This Project" : "ادعم هذا المشروع"}
                 </h3>
                 <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-center">
                   {isEn
                     ? "Your support can make a real difference in our community. Whether through partnership opportunities or direct donations, every contribution helps us create lasting positive impact."
                     : "دعمك يمكن أن يحدث فرقاً حقيقياً في مجتمعنا. سواء من خلال فرص الشراكة أو التبرعات المباشرة، كل مساهمة تساعدنا في خلق تأثير إيجابي دائم."
                   }
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button
                     className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                     onClick={handleBecomePartner}
                   >
                     {isEn ? "Become a Partner" : "كن شريكاً"}
                     <Handshake className="w-4 h-4 ml-2" />
                   </Button>
                   <Button
                     variant="outline"
                     className="border-blue-200 hover:bg-blue-50"
                     onClick={handleDonate}
                   >
                     {isEn ? "Make a Donation" : "تبرع الآن"}
                     <Gift className="w-4 h-4 ml-2" />
                   </Button>
                 </div>
               </div>
             </motion.div>
           </motion.div>
         </div>
       </section>
    </div>
  );
}
