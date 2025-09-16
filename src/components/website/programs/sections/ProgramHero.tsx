"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Globe, MapPin, ArrowRight } from "lucide-react";

interface ProgramHeroProps {
  program: Program;
  locale: string;
}

export default function ProgramHero({ program, locale }: ProgramHeroProps) {
  const isEn = locale === "en";

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  function hexToRgba(hex: string, alpha: number) {
    const match = hex.match(/\w\w/g);
    if (!match) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    const [r, g, b] = match.map(x => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with program color */}
      <div className={`absolute inset-0 opacity-10 bg-`} style={{ backgroundColor: hexToRgba(program.color, 0.2)}} />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: hexToRgba(program.color, 0.8) }} />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: hexToRgba(program.color, 0.8) }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="initial"
          animate="animate"
        >
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            variants={fadeInUp}
          >
            <Link href={`/${locale}/programs`} className="hover:text-foreground transition-colors">
              {isEn ? "Programs" : "البرامج"}
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground font-medium">
              {isEn ? program.titleEn : program.titleAr}
            </span>
          </motion.nav>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={fadeInUp}>
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${program.color}20` }}
                >
                  <Globe className="w-8 h-8" style={{ color: program.color }} />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                    {isEn ? program.titleEn : program.titleAr}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {isEn ? program.descriptionEn : program.descriptionAr}
              </p>

              {/* Quick Stats */}
              {program.statics && program.statics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {program.statics.slice(0, 3).map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-card/50 rounded-xl border border-border/30">
                      <div className="text-2xl font-bold" style={{ color: program.color }}>
                        {stat.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isEn ? stat.titleEn : stat.titleAr}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="w-5 h-5" />
                <span>{isEn ? program.implementationLocationEn : program.implementationLocationAr}</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button className="px-8 py-3" style={{ backgroundColor: program.color }}>
                  {isEn ? "Get Involved" : "شارك معنا"}
                </Button>
                <Button variant="outline" className="px-8 py-3">
                  {isEn ? "Learn More" : "اعرف المزيد"}
                </Button>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={program.featuredImageUrl}
                  alt={isEn ? program.titleEn : program.titleAr}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover "
                />
                {/* Overlay with program color */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: hexToRgba(program.color, 0.1) }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
