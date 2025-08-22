"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, Hash } from "lucide-react";

interface ProgramKeywordsTagsProps {
  program: Program;
  locale: string;
}

export default function ProgramKeywordsTags({ program, locale }: ProgramKeywordsTagsProps) {
  const isEn = locale === "en";

  // Only render if keywords or tags exist
  if ((!program.keywords || program.keywords.length === 0) && 
      (!program.tags || program.tags.length === 0)) {
    return null;
  }

  return (
    <section className="py-16">
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
              {isEn ? "Program Categories" : "فئات البرنامج"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn 
                ? "Key themes and classifications that define this program's focus and scope."
                : "المواضيع الرئيسية والتصنيفات التي تحدد تركيز ونطاق هذا البرنامج."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Keywords */}
            {program.keywords && program.keywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${program.color}20` }}
                      >
                        <Hash className="w-5 h-5" style={{ color: program.color }} />
                      </div>
                      <h3 className="text-lg font-semibold">
                        {isEn ? "Keywords" : "الكلمات المفتاحية"}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.keywords.map((keyword, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                        >
                          {isEn ? keyword.keywordEn : keyword.keywordAr}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Tags */}
            {program.tags && program.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${program.color}20` }}
                      >
                        <Tag className="w-5 h-5" style={{ color: program.color }} />
                      </div>
                      <h3 className="text-lg font-semibold">
                        {isEn ? "Tags" : "العلامات"}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                        >
                          {isEn ? tag.tagEn : tag.tagAr}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
