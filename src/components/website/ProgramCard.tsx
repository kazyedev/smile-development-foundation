"use client";

import { Program } from "@/types/program";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Calendar, Users, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgramCard({ program, locale }: { program: Program; locale: string }) {
  const isEn = locale === "en";

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="group"
    >
      <Card className="w-full h-full overflow-hidden relative hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg">
        {/* Custom border with program color */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            boxShadow: `inset 0 0 0 2px ${program.color}40`,
            background: `linear-gradient(135deg, ${program.color}10, transparent)`
          }} 
        />
        
        {/* Header with Image */}
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative">
            <Image
              src={program.featuredImageUrl}
              alt={isEn ? program.titleEn : program.titleAr}
              width={600}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating icon */}
            <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
              <Sparkles className="w-5 h-5" style={{ color: program.color }} />
            </div>
            
            {/* Program color accent line */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
              style={{ backgroundColor: program.color }}
            />
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4 p-6">
          {/* Title */}
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
            {isEn ? program.titleEn : program.titleAr}
          </CardTitle>
          
          {/* Description */}
          <CardDescription className="line-clamp-3 text-muted-foreground leading-relaxed text-sm">
            {isEn ? program.descriptionEn : program.descriptionAr}
          </CardDescription>
          
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-brand-primary" />
            </div>
            <span className="font-medium">
              {isEn ? program.implementationLocationEn : program.implementationLocationAr}
            </span>
          </div>

          {/* Additional Info (if available) */}
          {program.goalsEn && program.goalsEn.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Target className="w-3 h-3 text-brand-secondary" />
                <span className="font-medium">
                  {isEn ? "Key Goals" : "الأهداف الرئيسية"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {program.goalsEn.slice(0, 2).map((goal, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-brand-primary/10 text-brand-primary rounded-full border border-brand-primary/20"
                  >
                    {isEn ? goal : (program.goalsAr?.[index] || goal)}
                  </span>
                ))}
                {program.goalsEn.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                    +{program.goalsEn.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          {/* View Program Button */}
          <Button 
            asChild
            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn"
          >
            <Link href={`/${locale}/programs/${isEn ? program.slugEn : program.slugAr}`}>
              <span className="flex items-center gap-2">
                {isEn ? "View Program" : "عرض البرنامج"}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </Button>

          {/* Quick Stats (if available) */}
          {program.statics && program.statics.length > 0 && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {program.statics.slice(0, 2).map((stat, index) => (
                <div key={index} className="flex items-center gap-1">
                  {index === 0 ? (
                    <Users className="w-3 h-3 text-brand-secondary" />
                  ) : (
                    <Calendar className="w-3 h-3 text-brand-primary" />
                  )}
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </CardFooter>

        {/* Hover effect overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        />
      </Card>
    </motion.div>
  );
}