"use client";

import { Program } from "@/types/program";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Eye, 
  Tag, 
  FileText, 
  Palette 
} from "lucide-react";

// Import all section components
import {
  ProgramHero,
  ProgramAbout,
  ProgramGoals,
  ProgramStatistics,
  ProgramFundingProviders,
  ProgramDonors,
  ProgramPartners,
  ProgramSlides,
  ProgramKeywordsTags
} from './sections';

interface ProgramDetailClientProps {
  program: Program;
  locale: string;
}

export default function ProgramDetailClient({ program, locale }: ProgramDetailClientProps) {
  const isEn = locale === "en";

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(isEn ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <ProgramHero program={program} locale={locale} />

      {/* About Section */}
      <ProgramAbout program={program} locale={locale} />

      {/* Goals Section */}
      <ProgramGoals program={program} locale={locale} />

      {/* Statistics Section */}
      <ProgramStatistics program={program} locale={locale} />

      {/* Funding Providers Section */}
      <ProgramFundingProviders program={program} locale={locale} />

      {/* Donors Section */}
      <ProgramDonors program={program} locale={locale} />

      {/* Partners Section */}
      <ProgramPartners program={program} locale={locale} />

      {/* Slides Section */}
      <ProgramSlides program={program} locale={locale} />

      {/* Keywords and Tags Section */}
      <ProgramKeywordsTags program={program} locale={locale} />

      {/* Program Details */}
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
                {isEn ? "Program Details" : "تفاصيل البرنامج"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" style={{ color: program.color }} />
                      {isEn ? "Program Theme" : "سمة البرنامج"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: program.color }}
                      />
                      <span className="text-muted-foreground">{program.color}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" style={{ color: program.color }} />
                      {isEn ? "Page Views" : "مشاهدات الصفحة"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold" style={{ color: program.color }}>
                      {program.pageViews.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div> */}

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" style={{ color: program.color }} />
                      {isEn ? "Published Date" : "تاريخ النشر"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {formatDate(program.publishedAt)}
                    </p>
                  </CardContent>
                </Card>

                {program.tagsEn && program.tagsEn.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5" style={{ color: program.color }} />
                        {isEn ? "Tags" : "العلامات"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {(isEn ? program.tagsEn : program.tagsAr).map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {program.keywordsEn && program.keywordsEn.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" style={{ color: program.color }} />
                        {isEn ? "Keywords" : "الكلمات المفتاحية"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {(isEn ? program.keywordsEn : program.keywordsAr).map((keyword, index) => (
                          <Badge key={index} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-muted/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {isEn ? "Ready to Make a Difference?" : "مستعد لإحداث فرق؟"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Join our mission to create sustainable change in communities. Every contribution, whether through volunteering, partnerships, or support, makes a real impact."
                : "انضم إلى مهمتنا لخلق تغيير مستدام في المجتمعات. كل مساهمة، سواء من خلال التطوع أو الشراكات أو الدعم، تحدث تأثيراً حقيقياً."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-3" style={{ backgroundColor: program.color }}>
                {isEn ? "Get Involved Today" : "شارك معنا اليوم"}
              </Button>
              <Button variant="outline" className="px-8 py-3">
                {isEn ? "Contact Our Team" : "تواصل مع فريقنا"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


