"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ProgramDonorsProps {
  program: Program;
  locale: string;
}

export default function ProgramDonors({ program, locale }: ProgramDonorsProps) {
  const isEn = locale === "en";

  // Only render if donors exist
  if (!program.donors || program.donors.length === 0) {
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
              {isEn ? "Our Donors" : "متبرعونا"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Generous individuals and organizations who support our mission through donations."
                : "أفراد ومنظمات كريمة تدعم مهمتنا من خلال التبرعات."
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {program.donors.map((donor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight mb-2">
                      {isEn ? donor.nameEn : donor.nameAr}
                    </h3>
                    {donor.amount && (
                      <p className="text-xs text-muted-foreground">
                        {isEn ? "Donated" : "تبرع بـ"}: ${donor.amount.toLocaleString()}
                      </p>
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
