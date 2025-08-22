"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProgramSlidesProps {
  program: Program;
  locale: string;
}

export default function ProgramSlides({ program, locale }: ProgramSlidesProps) {
  const isEn = locale === "en";

  // Only render if slides exist
  if (!program.slides || program.slides.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Program Gallery" : "معرض البرنامج"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Visual journey through our program activities and impact."
                : "رحلة بصرية عبر أنشطة برنامجنا وتأثيره."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      {slide.imageUrl ? (
                        <Image
                          src={slide.imageUrl}
                          alt={isEn ? slide.titleEn : slide.titleAr}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    {(slide.titleEn || slide.titleAr) && (
                      <div className="p-4">
                        <h3 className="font-semibold text-sm leading-tight">
                          {isEn ? slide.titleEn : slide.titleAr}
                        </h3>
                        {slide.descriptionEn && (
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {isEn ? slide.descriptionEn : slide.descriptionAr}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
