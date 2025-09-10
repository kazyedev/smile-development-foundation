"use client";

import { Story } from "@/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowRight,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import SuccessStoryCard from "@/components/website/SuccessStoryCard";

interface ProgramRelatedStoriesProps {
  relatedStories: Story[];
  locale: string;
}

export default function ProgramRelatedStories({ relatedStories, locale }: ProgramRelatedStoriesProps) {
  const isEn = locale === "en";

  if (relatedStories.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-background via-brand-secondary/5 to-brand-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 text-brand-secondary rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {isEn ? "Success Stories" : "قصص النجاح"}
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Program Impact Stories" : "قصص تأثير البرنامج"}
            </h2>
            
            <div className="bg-background border border-border rounded-2xl p-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No Success Stories Yet" : "لا توجد قصص نجاح بعد"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isEn 
                  ? "We're working on collecting inspiring stories from this program. Check back soon for real impact stories."
                  : "نحن نعمل على جمع القصص الملهمة من هذا البرنامج. تحقق قريباً للحصول على قصص التأثير الحقيقية."
                }
              </p>
              <Button asChild variant="outline">
                <Link href={`/${locale}/success-stories`}>
                  {isEn ? "View All Stories" : "عرض جميع القصص"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-brand-secondary/5 to-brand-primary/10">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 text-brand-secondary rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              {isEn ? "Success Stories" : "قصص النجاح"}
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Program Impact Stories" : "قصص تأثير البرنامج"}
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Discover the real stories of transformation and success from people whose lives have been changed by this program."
                : "اكتشف القصص الحقيقية للتحول والنجاح من الأشخاص الذين تغيرت حياتهم بفضل هذا البرنامج."
              }
            </p>
          </div>

                     {/* Stories Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {relatedStories.map((story, index) => (
               <motion.div
                 key={story.slugEn}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 <SuccessStoryCard story={story} locale={locale} />
               </motion.div>
             ))}
           </div>

          {/* View All Stories CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="px-8 py-3">
              <Link href={`/${locale}/success-stories`}>
                {isEn ? "View All Success Stories" : "عرض جميع قصص النجاح"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
