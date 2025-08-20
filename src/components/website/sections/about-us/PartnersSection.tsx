'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Globe, Sparkles } from 'lucide-react';

interface PartnersSectionProps {
  partners: {
    title: { en: string; ar: string };
    items: Array<{
      name: string;
      logo: string;
      description: { en: string; ar: string };
      role: { en: string; ar: string };
    }>;
  };
  isLocaleEnglish: boolean;
}

export default function PartnersSection({ partners, isLocaleEnglish }: PartnersSectionProps) {
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
            <Handshake className="w-10 h-10 text-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {isLocaleEnglish ? partners.title.en : partners.title.ar}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isLocaleEnglish 
              ? "Strategic collaborations that amplify our impact and reach"
              : "تعاون استراتيجي يضخم تأثيرنا ووصولنا"
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6 rounded-full" />
        </motion.div>
        
        {/* Partners Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {partners.items.map((partner, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-10 h-10 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-foreground group-hover:text-brand-primary transition-colors">
                        {partner.name}
                      </CardTitle>
                      <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-2" />
                      <p className="text-brand-primary font-medium text-sm mt-2">
                        {isLocaleEnglish ? partner.role.en : partner.role.ar}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {isLocaleEnglish ? partner.description.en : partner.description.ar}
                  </p>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </Card>
            </motion.div>
          ))}
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
