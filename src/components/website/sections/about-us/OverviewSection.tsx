'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building, PlayCircle, ArrowRight, Sparkles } from 'lucide-react';

interface OverviewSectionProps {
  overview: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  story: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  mission: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  vision: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
  };
  locale: string;
  isLocaleEnglish: boolean;
}

export default function OverviewSection({
  overview,
  story,
  mission,
  vision,
  locale,
  isLocaleEnglish
}: OverviewSectionProps) {
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
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
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
            <Building className="w-10 h-10 text-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {isLocaleEnglish ? overview.title.en : overview.title.ar}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Left Content */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {isLocaleEnglish ? "Overview" : "نظرة عامة"}
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                {isLocaleEnglish ? overview.content.en : overview.content.ar}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white group">
                <Link href={`/${locale}/media/videos`}>
                  <PlayCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {isLocaleEnglish ? "Watch Our Story" : "شاهد قصتنا"}
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                <Link href={`/${locale}/about-us`}>
                  {isLocaleEnglish ? "Learn More" : "اعرف المزيد"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            variants={fadeInUp}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://drive.google.com/thumbnail?id=1QIZMDrbY_05TYfTsyovLjEM8yFGAGL5-&sz=w1000"
                alt="Foundation overview"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              {/* Overlay with brand colors */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />

              {/* Floating icon */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-brand-primary" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission, Vision, Story Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Mission Card */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full group hover:shadow-xl transition-all duration-300 border-brand-primary/20 hover:border-brand-primary/40 bg-gradient-to-br from-background to-brand-primary/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {isLocaleEnglish ? mission.title.en : mission.title.ar}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {isLocaleEnglish ? mission.content.en : mission.content.ar}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full group hover:shadow-xl transition-all duration-300 border-brand-secondary/20 hover:border-brand-secondary/40 bg-gradient-to-br from-background to-brand-secondary/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {isLocaleEnglish ? vision.title.en : vision.title.ar}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {isLocaleEnglish ? vision.content.en : vision.content.ar}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Story Card */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full group hover:shadow-xl transition-all duration-300 border-accent/20 hover:border-accent/40 bg-gradient-to-br from-background to-accent/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {isLocaleEnglish ? story.title.en : story.title.ar}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {isLocaleEnglish
                    ? story.content.en.substring(0, 120) + "..."
                    : story.content.ar.substring(0, 120) + "..."
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
