'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Users, Lightbulb, Sparkles } from 'lucide-react';

interface PoliciesSectionProps {
  policies: {
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
  Shield,
  FileText,
  Users,
  Lightbulb
};

export default function PoliciesSection({ policies, isLocaleEnglish }: PoliciesSectionProps) {
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
            <FileText className="w-10 h-10 text-brand-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-secondary to-brand-primary bg-clip-text text-transparent">
            {isLocaleEnglish ? policies.title.en : policies.title.ar}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isLocaleEnglish 
              ? "The guidelines and standards that ensure our operations remain ethical and effective"
              : "المبادئ التوجيهية والمعايير التي تضمن بقاء عملياتنا أخلاقية وفعالة"
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-secondary to-brand-primary mx-auto mt-6 rounded-full" />
        </motion.div>
        
        {/* Policies Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {policies.items.map((policy, index) => {
            const Icon = iconMap[policy.icon as keyof typeof iconMap];
            const colorVariants = [
              'from-brand-secondary/20 to-brand-secondary/10',
              'from-brand-primary/20 to-brand-primary/10',
              'from-accent/20 to-accent/10',
              'from-primary/20 to-primary/10'
            ];
            
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorVariants[index % colorVariants.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-brand-secondary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-secondary transition-colors">
                        {isLocaleEnglish ? policy.title.en : policy.title.ar}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {isLocaleEnglish ? policy.description.en : policy.description.ar}
                    </p>
                  </CardContent>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
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
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-brand-secondary rounded-full" />
            <div className="w-4 h-4 bg-brand-secondary rounded-full" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-brand-primary rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
