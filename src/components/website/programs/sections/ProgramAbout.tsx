"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramAboutProps {
  program: Program;
  locale: string;
}

export default function ProgramAbout({ program, locale }: ProgramAboutProps) {
  const isEn = locale === "en";

  // Only render if about content exists
  if (!program.aboutEn || !program.aboutAr) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "About This Program" : "حول هذا البرنامج"}
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: program.color }} />
          </div>
          
          <Card className="p-8">
            <CardContent className="text-lg leading-relaxed text-muted-foreground">
              {isEn ? program.aboutEn : program.aboutAr}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
