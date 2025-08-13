import { mockNews } from "@/data/mockNews";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const decoded = decodeURIComponent(slug || '');
  const isEn = (locale || 'en') === 'en';
  const n = mockNews.find(x => x.slugEn === decoded || x.slugAr === decoded);
  if (!n) return notFound();

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)] w-full max-w-4xl mx-auto">
      <div className="relative w-full h-60 rounded-xl overflow-hidden">
        <Image src={n.featuredImageUrl} alt={isEn ? n.titleEn : n.titleAr} fill className="object-cover" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">{isEn ? n.titleEn : n.titleAr}</h1>
      <p className="text-sm text-muted-foreground">{n.readTime} {isEn ? 'min read' : 'دقيقة قراءة'}</p>
      <div className="prose dark:prose-invert max-w-none">
        <p>{isEn ? n.contentEn : n.contentAr}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(isEn ? n.keywordsEn : n.keywordsAr).map(k => (
          <span key={k} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">{k}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {(isEn ? n.tagsEn : n.tagsAr).map(t => (
          <span key={t} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">#{t}</span>
        ))}
      </div>
    </div>
  );
}