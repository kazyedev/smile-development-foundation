'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Target, CheckCircle, Users, Sparkles } from 'lucide-react';

interface PrinciplesSectionProps {
  principles: {
    title: { en: string; ar: string };
    items: Array<{
      icon: string;
      title: { en: string; ar: string };
      description: { en: string; ar: string };
    }>;
  };
  isLocaleEnglish: boolean;
}

const iconMap = {
  Scale,
  Target,
  CheckCircle,
  Users
};

export default function PrinciplesSection({ principles, isLocaleEnglish }: PrinciplesSectionProps) {
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
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-full mb-6">
            <Scale className="w-10 h-10 text-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {isLocaleEnglish ? principles.title.en : principles.title.ar}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isLocaleEnglish 
              ? "The fundamental beliefs that shape our approach to community development"
              : "المعتقدات الأساسية التي تشكل نهجنا في التنمية المجتمعية"
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6 rounded-full" />
        </motion.div>
        
        {/* Principles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {principles.items.map((principle, index) => {
            const Icon = iconMap[principle.icon as keyof typeof iconMap];
            const colorVariants = [
              'from-brand-primary/20 to-brand-primary/10',
              'from-brand-secondary/20 to-brand-secondary/10',
              'from-accent/20 to-accent/10',
              'from-primary/20 to-primary/10'
            ];
            
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorVariants[index % colorVariants.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-brand-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors">
                        {isLocaleEnglish ? principle.title.en : principle.title.ar}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {isLocaleEnglish ? principle.description.en : principle.description.ar}
                    </p>
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
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
