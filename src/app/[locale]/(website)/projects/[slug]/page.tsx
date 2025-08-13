import { mockProjects } from "@/data/mockProjects";
import Image from "next/image";
import { MapPin, Target, ListChecks, Layers3, Boxes, Users, Video, BookOpen, Tags } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decoded = decodeURIComponent(slug);
  const isEn = locale === 'en';
  const project = mockProjects.find(p => p.slugEn === decoded || p.slugAr === decoded);
  if (!project) {
    return <div className="px-4 py-10"><p className="text-center text-muted-foreground">{isEn ? 'Project not found.' : 'المشروع غير موجود.'}</p></div>;
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px]">
        <Image src={project.featuredImageUrl} alt={isEn ? project.titleEn : project.titleAr} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">{isEn ? project.titleEn : project.titleAr}</h1>
            <p className="mt-3 text-white/90 text-lg md:text-xl max-w-3xl">{isEn ? project.descriptionEn : project.descriptionAr}</p>
          </div>
        </div>
      </section>

      {/* Goals */}
      {project.goalsEn?.length ? (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? 'Project Goals' : 'أهداف المشروع'}</h2>
          <ol className="space-y-3 md:space-y-4 list-none max-w-3xl mx-auto">
            {(isEn ? project.goalsEn : project.goalsAr).map((g, i) => (
              <li key={i} className="flex items-start gap-3"><Target className="w-5 h-5 mt-0.5 text-[var(--brand-primary)]" /><span className="text-lg">{g}</span></li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* Statics */}
      {project.statics?.length ? (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? 'Impact' : 'الأثر'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.statics.map((s, idx) => (
              <div key={idx} className="rounded-xl border p-6 text-center">
                <p className="text-3xl font-bold">{s.value.toLocaleString(isEn ? 'en-US' : 'ar-EG')}</p>
                <p className="text-sm md:text-base text-muted-foreground mt-2">{isEn ? s.titleEn : s.titleAr} {isEn ? s.unitEn : s.unitAr}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Financial Contributions */}
      {project.financialContributions?.length ? (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? 'Financial Contributions' : 'المساهمات المالية'}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {project.financialContributions.map((f, i) => (
              <div key={i} className="rounded-xl border p-4 min-w-[220px]">
                <p className="font-semibold">{isEn ? f.nameEn : f.nameAr}</p>
                <p className="text-muted-foreground text-sm">{f.percentage}%</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Deliverables */}
      {project.deliverables?.length ? (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? 'Deliverables' : 'المخرجات'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.deliverables.map((d, i) => (
              <div key={i} className="rounded-xl border p-4">
                <p className="font-semibold">{isEn ? d.titleEn : d.titleAr}</p>
                <p className="text-muted-foreground text-sm">{d.value} {isEn ? d.unitEn : d.unitAr}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Resources */}
      {project.resources?.length ? (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? 'Resources' : 'الموارد'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.resources.map((r, i) => (
              <div key={i} className="rounded-xl border p-4 flex items-center gap-3">
                {r.iconImageUrl ? (
                  <Image src={r.iconImageUrl} alt={isEn ? r.titleEn : r.titleAr} width={40} height={40} />
                ) : null}
                <div>
                  <p className="font-semibold">{isEn ? r.titleEn : r.titleAr}</p>
                  <p className="text-muted-foreground text-sm">{r.icon}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Keywords and Tags */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{isEn ? 'Keywords & Tags' : 'الكلمات المفتاحية والوسوم'}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {(isEn ? project.keywordsEn : project.keywordsAr).map((k) => (
            <span key={k} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">{k}</span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {(isEn ? project.tagsEn : project.tagsAr).map((t) => (
            <span key={t} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">#{t}</span>
          ))}
        </div>
      </section>

      {/* Meta */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div><span className="font-semibold">{isEn ? 'Page Views' : 'المشاهدات'}: </span>{project.pageViews.toLocaleString(isEn ? 'en-US' : 'ar-EG')}</div>
          <div><span className="font-semibold">{isEn ? 'Published' : 'تاريخ النشر'}: </span>{new Date(project.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</div>
          <div><span className="font-semibold">{isEn ? 'Updated' : 'آخر تحديث'}: </span>{new Date(project.updatedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</div>
        </div>
      </section>
    </div>
  );
}