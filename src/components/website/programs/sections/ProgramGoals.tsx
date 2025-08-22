"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ProgramGoalsProps {
  program: Program;
  locale: string;
}

export default function ProgramGoals({ program, locale }: ProgramGoalsProps) {
  const isEn = locale === "en";

  // Only render if goals exist
  if (!program.goalsEn || program.goalsEn.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
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
              {isEn ? "Program Goals" : "أهداف البرنامج"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Our comprehensive objectives for creating lasting positive change in communities."
                : "أهدافنا الشاملة لخلق تغيير إيجابي دائم في المجتمعات."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(isEn ? program.goalsEn : program.goalsAr).map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: program.color }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: `${program.color}20` }}
                      >
                        <CheckCircle className="w-4 h-4" style={{ color: program.color }} />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{goal}</p>
                    </div>
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
