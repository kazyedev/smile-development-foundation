'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Target, Lightbulb, Heart, CheckCircle, Sparkles } from 'lucide-react';

interface SupportersSectionProps {
  supporters: {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    categories: Array<{
      title: { en: string; ar: string };
      icon: string;
      supporters: Array<{ en: string; ar: string }>;
    }>;
  };
  isLocaleEnglish: boolean;
}

const iconMap = {
  Target,
  Lightbulb,
  Heart
};

export default function SupportersSection({ supporters, isLocaleEnglish }: SupportersSectionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-secondary/10 rounded-full mb-6">
            <Star className="w-10 h-10 text-brand-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent">
            {isLocaleEnglish ? supporters.title.en : supporters.title.ar}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {isLocaleEnglish ? supporters.description.en : supporters.description.ar}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-secondary to-brand-primary mx-auto rounded-full" />
        </motion.div>
        
        {/* Supporters Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {supporters.categories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const colorVariants = [
              'from-brand-primary/20 to-brand-primary/10',
              'from-brand-secondary/20 to-brand-secondary/10',
              'from-accent/20 to-accent/10'
            ];
            
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${colorVariants[index % colorVariants.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-brand-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors">
                      {isLocaleEnglish ? category.title.en : category.title.ar}
                    </CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-2 rounded-full" />
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-3">
                      {category.supporters.map((supporter, supporterIndex) => (
                        <motion.li 
                          key={supporterIndex} 
                          className="flex items-center gap-3 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: supporterIndex * 0.1 }}
                        >
                          <div className="w-5 h-5 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                            <CheckCircle className="w-3 h-3 text-brand-primary" />
                          </div>
                          <span className="text-muted-foreground text-sm group-hover/item:text-foreground transition-colors">
                            {isLocaleEnglish ? supporter.en : supporter.ar}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-brand-primary rounded-full" />
            <div className="w-4 h-4 bg-brand-primary rounded-full" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-brand-secondary rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
