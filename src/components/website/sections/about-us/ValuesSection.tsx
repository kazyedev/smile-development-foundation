'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Lightbulb, Handshake, Sparkles } from 'lucide-react';

interface ValuesSectionProps {
  values: Array<{
    icon: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
  }>;
  isLocaleEnglish: boolean;
}

const iconMap = {
  Heart,
  Shield,
  Lightbulb,
  Handshake
};

export default function ValuesSection({ values, isLocaleEnglish }: ValuesSectionProps) {
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
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
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
            <Sparkles className="w-10 h-10 text-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {isLocaleEnglish ? "Our Core Values" : "قيمنا الأساسية"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isLocaleEnglish 
              ? "The principles that guide our every action and decision"
              : "المبادئ التي توجه كل عمل وقرار نتخذه"
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {values.map((value, index) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap];
            const colorVariants = [
              'from-brand-primary/20 to-brand-primary/10',
              'from-brand-secondary/20 to-brand-secondary/10',
              'from-accent/20 to-accent/10',
              'from-primary/20 to-primary/10'
            ];
            
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${colorVariants[index % colorVariants.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-10 h-10 ${index === 0 ? 'text-red-500' : index === 1 ? 'text-blue-500' : index === 2 ? 'text-yellow-500' : 'text-green-500'}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors">
                      {isLocaleEnglish ? value.title.en : value.title.ar}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {isLocaleEnglish ? value.description.en : value.description.ar}
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
