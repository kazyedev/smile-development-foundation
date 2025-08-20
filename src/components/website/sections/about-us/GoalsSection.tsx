'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle, TrendingUp, Calendar, Sparkles } from 'lucide-react';

interface GoalsSectionProps {
  goals: {
    title: { en: string; ar: string };
    shortTerm: {
      title: { en: string; ar: string };
      items: Array<{ en: string; ar: string }>;
    };
    longTerm: {
      title: { en: string; ar: string };
      items: Array<{ en: string; ar: string }>;
    };
  };
  isLocaleEnglish: boolean;
}

export default function GoalsSection({ goals, isLocaleEnglish }: GoalsSectionProps) {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-full mb-6">
            <Target className="w-10 h-10 text-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {isLocaleEnglish ? goals.title.en : goals.title.ar}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isLocaleEnglish 
              ? "Our roadmap to creating lasting positive change"
              : "خارطة طريقنا لخلق تغيير إيجابي دائم"
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6 rounded-full" />
        </motion.div>
        
        {/* Goals Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Short-term Goals */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-brand-primary/5 border-brand-primary/20 hover:border-brand-primary/40">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-brand-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {isLocaleEnglish ? goals.shortTerm.title.en : goals.shortTerm.title.ar}
                </CardTitle>
                <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-4">
                  {goals.shortTerm.items.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-4 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-brand-primary" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                        {isLocaleEnglish ? item.en : item.ar}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Long-term Goals */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-brand-secondary/5 border-brand-secondary/20 hover:border-brand-secondary/40">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-brand-secondary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {isLocaleEnglish ? goals.longTerm.title.en : goals.longTerm.title.ar}
                </CardTitle>
                <div className="w-16 h-1 bg-brand-secondary mx-auto rounded-full" />
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-4">
                  {goals.longTerm.items.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-4 group/item"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-brand-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-brand-secondary" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                        {isLocaleEnglish ? item.en : item.ar}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
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
