"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramStatisticsProps {
  program: Program;
  locale: string;
}

export default function ProgramStatistics({ program, locale }: ProgramStatisticsProps) {
  const isEn = locale === "en";

  // Only render if statistics exist
  if (!program.statics || program.statics.length === 0) {
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
              {isEn ? "Impact Statistics" : "إحصائيات التأثير"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Measurable outcomes and progress indicators of our program."
                : "النتائج القابلة للقياس ومؤشرات التقدم في برنامجنا."
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {program.statics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <div className="text-3xl font-bold mb-2" style={{ color: program.color }}>
                      {stat.value.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground leading-tight">
                      {isEn ? stat.titleEn : stat.titleAr}
                    </p>
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
