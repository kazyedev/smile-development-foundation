"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Users, HandCoins, Building2 } from "lucide-react";
import CountUp from "@/components/website/programs/CountUp";
import AutoCarousel from "@/components/website/programs/AutoCarousel";
import AutoCarouselV2 from "@/components/website/programs/AutoCarouselV2";
import ProjectCard from "@/components/website/ProjectCard";
import SuccessStoryCard from "@/components/website/SuccessStoryCard";
import { Program } from "@/types/program";
import { Project } from "@/types/project";
import { Story } from "@/types/successStory";

export default function ProgramDetailClient({ program, relatedProjects, relatedStories, locale }: { program: Program; relatedProjects: Project[]; relatedStories: Story[]; locale: string; }) {
  const isEn = locale === "en";

  return (
    <div className="flex flex-col gap-16">
      <section className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
        <Image src={program.featuredImageUrl} alt={isEn ? program.titleEn : program.titleAr} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/15" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="absolute inset-0">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="container mx-auto px-4 h-full flex items-end">
            <div className="max-w-4xl pb-8">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">{isEn ? program.titleEn : program.titleAr}</h1>
              <p className="mt-3 text-white/90 text-lg md:text-xl">{isEn ? program.descriptionEn : program.descriptionAr}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span className="text-sm md:text-base">{isEn ? program.implementationLocationEn : program.implementationLocationAr}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1 }} className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl" style={{ background: program.color }} />
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? "About the Program" : "عن البرنامج"}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-muted-foreground text-lg leading-relaxed">{isEn ? program.aboutEn : program.aboutAr}</p>
          </div>
          <div className="flex flex-col gap-4">
            {program.donors.length > 0 && (
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-2 mb-3"><HandCoins className="w-4 h-4" /><span className="font-semibold">{isEn ? "Donors" : "الجهات المانحة"}</span></div>
                <div className="flex flex-wrap gap-3 items-center">
                  {program.donors.map((d) => (
                    <div key={d.nameEn} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted overflow-hidden">
                        <Image src={d.imageUrl} alt={d.nameEn} width={32} height={32} className="w-8 h-8 object-cover" />
                      </div>
                      <span className="text-sm">{isEn ? d.nameEn : d.nameAr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {program.partners.length > 0 && (
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4" /><span className="font-semibold">{isEn ? "Partners" : "الشركاء"}</span></div>
                <div className="flex flex-wrap gap-3 items-center">
                  {program.partners.map((d) => (
                    <div key={d.nameEn} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted overflow-hidden">
                        <Image src={d.imageUrl} alt={d.nameEn} width={32} height={32} className="w-8 h-8 object-cover" />
                      </div>
                      <span className="text-sm">{isEn ? d.nameEn : d.nameAr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {program.fundingProviders.length > 0 && (
              <div className="rounded-xl border p-4">
                <div className="flex items-center gap-2 mb-3"><Building2 className="w-4 h-4" /><span className="font-semibold">{isEn ? "Funding Providers" : "جهات التمويل"}</span></div>
                <div className="flex flex-wrap gap-3 items-center">
                  {program.fundingProviders.map((d) => (
                    <div key={d.nameEn} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted overflow-hidden">
                        <Image src={d.imageUrl} alt={d.nameEn} width={32} height={32} className="w-8 h-8 object-cover" />
                      </div>
                      <span className="text-sm">{isEn ? d.nameEn : d.nameAr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? "Program Goals" : "أهداف البرنامج"}</h2>
        <ol className="space-y-3 md:space-y-4 list-none">
          {(isEn ? program.goalsEn : program.goalsAr).map((g, idx) => (
            <li key={idx} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-0.5 text-[var(--brand-primary)]" /> <span className="text-lg">{g}</span></li>
          ))}
        </ol>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? "Impact in Numbers" : "الأثر بالأرقام"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {program.statics.map((s, idx) => (
            <div key={idx} className="rounded-xl border p-6 text-center relative overflow-hidden">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }} viewport={{ once: true }} className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl" style={{ background: program.color }} />
              <CountUp target={s.value} locale={isEn ? 'en' : 'ar'} />
              <p className="text-sm md:text-base text-muted-foreground mt-2">{isEn ? s.titleEn : s.titleAr}</p>
            </div>
          ))}
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? "Program's Projects" : "مشاريع البرنامج"}</h2>
          <AutoCarousel>
            {relatedProjects.map((p) => (
              <div key={p.slugEn} className="w-[300px] shrink-0">
                <ProjectCard project={p} locale={locale} />
              </div>
            ))}
          </AutoCarousel>
        </section>
      )}

      {relatedStories.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? "Program's Success Stories" : "قصص نجاح البرنامج"}</h2>
          <AutoCarouselV2
            locale={locale as 'en' | 'ar'}
            items={relatedStories.map((s) => ({
              image: s.featuredImageUrl,
              titleEn: s.titleEn,
              titleAr: s.titleAr,
              descriptionEn: s.contentEn,
              descriptionAr: s.contentAr,
              buttonTextEn: "Read Story",
              buttonTextAr: "قراءة القصة",
              buttonHrefEn: `/en/media/success-stories/${s.slugEn}`,
              buttonHrefAr: `/ar/media/success-stories/${s.slugAr}`,
            }))}
          />
        </section>
      )}

      <section className="container mx-auto px-4">
        <div className="rounded-2xl border p-8 md:p-10 bg-[var(--brand-primary)]/10 relative overflow-hidden">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.15 }} viewport={{ once: true }} className="absolute -top-16 -left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: program.color }} />
          <h3 className="text-xl md:text-2xl font-bold text-center">{isEn ? "Fund this program" : "موّل هذا البرنامج"}</h3>
          <p className="text-muted-foreground mt-2 text-center max-w-2xl mx-auto">{isEn ? "Your contribution helps us expand impact and reach more communities." : "مساهمتك تساعدنا على توسيع التأثير والوصول إلى المزيد من المجتمعات."}</p>
          <div className="flex justify-center mt-4">
            <Link href={`/${locale}/donate`} className="inline-block px-6 py-3 rounded-md bg-[var(--brand-primary)] text-white">{isEn ? "Donate" : "تبرع"}</Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2">
          {(isEn ? program.keywordsEn : program.keywordsAr).map((kw) => (
            <span key={kw} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">{kw}</span>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? "Other Programs" : "برامج أخرى"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/** In a real app we'd avoid duplicating current program */}
          {/* This section expects a list of other programs passed in if needed */}
        </div>
      </section>
    </div>
  );
}


