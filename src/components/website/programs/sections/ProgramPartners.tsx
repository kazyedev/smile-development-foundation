"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";

interface ProgramPartnersProps {
  program: Program;
  locale: string;
}

export default function ProgramPartners({ program, locale }: ProgramPartnersProps) {
  const isEn = locale === "en";

  // Only render if partners exist
  if (!program.partners || program.partners.length === 0) {
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
              {isEn ? "Program Partners" : "شركاء البرنامج"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Collaborative organizations working together to achieve program objectives."
                : "منظمات تعاونية تعمل معًا لتحقيق أهداف البرنامج."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: program.color }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${program.color}20` }}
                      >
                        <Handshake className="w-6 h-6" style={{ color: program.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">
                          {isEn ? partner.nameEn : partner.nameAr}
                        </h3>
                        {partner.roleEn && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {isEn ? partner.roleEn : partner.roleAr}
                          </p>
                        )}
                      </div>
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
