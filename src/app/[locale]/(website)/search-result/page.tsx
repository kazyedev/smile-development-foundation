"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockNews } from "@/data/mockNews";
import { mockStories } from "@/data/mockStories";
import { mockProjects } from "@/data/mockProjects";
import { mockPhotos } from "@/data/mockPhotos";
import { mockVideos } from "@/data/mockVideos";
import { mockPublications } from "@/data/mockPublications";
import { mockReports } from "@/data/mockReports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ibtisama Foundation',
  description: 'Official website',
};

type IndexedItem = {
  type: string;
  title: string;
  href: string;
  image?: string;
  score: number;
};

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

const scoreMatch = (queryTokens: string[], text: string) => {
  const tokens = tokenize(text);
  let score = 0;
  for (const qt of queryTokens) {
    for (const t of tokens) {
      if (t === qt) score += 4; // exact token match
      else if (t.startsWith(qt)) score += 2; // prefix
      else if (t.includes(qt)) score += 1; // substring
    }
  }
  return score;
};

export default function SearchResultPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim();
  const [activeTypes, setActiveTypes] = useState<string[]>(["news","story","project","image","video","publication","report"]);

  useEffect(() => {
    // Reset types on query change to broaden results
    setActiveTypes(["news","story","project","image","video","publication","report"]);
  }, [q]);

  const results = useMemo(() => {
    if (!q) return [] as IndexedItem[];
    const qt = tokenize(q);
    const items: IndexedItem[] = [];

    const push = (type: string, title: string, href: string, image?: string, textBlob?: string) => {
      const base = title + " " + (textBlob || "");
      const s = scoreMatch(qt, base);
      if (s > 0) items.push({ type, title, href, image, score: s });
    };

    // News
    for (const n of mockNews) {
      const title = isEn ? n.titleEn : n.titleAr;
      const content = isEn ? n.contentEn : n.contentAr;
      push("news", title, `/${locale}/news/${isEn ? n.slugEn : n.slugAr}`,(n.featuredImageUrl), content + " " + (isEn ? n.keywordsEn.join(" ") : n.keywordsAr.join(" ")));
    }
    // Stories
    for (const s of mockStories) {
      const title = isEn ? s.titleEn : s.titleAr;
      const content = isEn ? s.contentEn : s.contentAr;
      push("story", title, `/${locale}/media/success-stories/${isEn ? s.slugEn : s.slugAr}`,(s.featuredImageUrl), content + " " + (isEn ? s.keywordsEn.join(" ") : s.keywordsAr.join(" ")));
    }
    // Projects
    for (const p of mockProjects) {
      const title = isEn ? p.titleEn : p.titleAr;
      push("project", title, `/${locale}/projects/${isEn ? p.slugEn : p.slugAr}`,(p.featuredImageUrl), (isEn ? p.descriptionEn : p.descriptionAr) + " " + (isEn ? p.keywordsEn.join(" ") : p.keywordsAr.join(" ")));
    }
    // Images
    for (const i of mockPhotos) {
      const title = isEn ? i.titleEn : i.titleAr;
      push("image", title, `/${locale}/media/images/${isEn ? i.slugEn : i.slugAr}`,(i.url), (isEn ? (i.descriptionEn || "") : (i.descriptionAr || "")) + " " + (isEn ? i.keywordsEn.join(" ") : i.keywordsAr.join(" ")));
    }
    // Videos
    for (const v of mockVideos) {
      const title = isEn ? v.titleEn : v.titleAr;
      push("video", title, `/${locale}/media/videos/${isEn ? v.slugEn : v.slugAr}`,(undefined), (isEn ? v.descriptionEn : v.descriptionAr) + " " + (isEn ? v.keywordsEn.join(" ") : v.keywordsAr.join(" ")));
    }
    // Publications
    for (const p of mockPublications) {
      const title = isEn ? p.titleEn : p.titleAr;
      push("publication", title, `/${locale}/media/publications/${isEn ? p.slugEn : p.slugAr}`,(p.featuredImageUrl), (isEn ? (p.descriptionEn || "") : (p.descriptionAr || "")) + " " + (isEn ? p.keywordsEn.join(" ") : p.keywordsAr.join(" ")));
    }
    // Reports
    for (const r of mockReports) {
      const title = isEn ? r.titleEn : r.titleAr;
      push("report", title, `/${locale}/media/reports/${isEn ? r.slugEn : r.slugAr}`,(r.featuredImageUrl), (isEn ? (r.descriptionEn || "") : (r.descriptionAr || "")) + " " + (isEn ? r.keywordsEn.join(" ") : r.keywordsAr.join(" ")));
    }

    return items
      .filter(it => activeTypes.includes(it.type))
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
  }, [q, locale, isEn, activeTypes]);

  return (
    <div className="flex flex-col gap-4 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <h1 className="text-2xl font-bold text-center">{isEn ? 'Search Results' : 'نتائج البحث'}</h1>
      {!q ? (
        <p className="text-center text-muted-foreground">{isEn ? 'Enter a search query.' : 'أدخل عبارة للبحث.'}</p>
      ) : results.length === 0 ? (
        <p className="text-center text-muted-foreground">{isEn ? 'No results found.' : 'لا توجد نتائج.'}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          <aside className="lg:col-span-1">
            <div className="rounded-xl border p-4 sticky top-24">
              <p className="font-semibold mb-2">{isEn ? 'Filter by type' : 'تصفية حسب النوع'}</p>
              <div className="space-y-2 text-sm">
                {[
                  { key: 'news', labelEn: 'News', labelAr: 'الأخبار' },
                  { key: 'story', labelEn: 'Success Stories', labelAr: 'قصص النجاح' },
                  { key: 'project', labelEn: 'Projects', labelAr: 'المشاريع' },
                  { key: 'image', labelEn: 'Images', labelAr: 'الصور' },
                  { key: 'video', labelEn: 'Videos', labelAr: 'الفيديوهات' },
                  { key: 'publication', labelEn: 'Publications', labelAr: 'النشرات' },
                  { key: 'report', labelEn: 'Reports', labelAr: 'التقارير' },
                ].map(({ key, labelEn, labelAr }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeTypes.includes(key)}
                      onChange={(e) => {
                        setActiveTypes(prev => e.target.checked ? Array.from(new Set([...prev, key])) : prev.filter(t => t !== key));
                      }}
                    />
                    <span>{isEn ? labelEn : labelAr}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
          <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((r, idx) => (
              <Link key={idx} href={r.href} className="rounded-xl border overflow-hidden hover:shadow group">
                {r.image ? (
                  <div className="relative w-full h-40 bg-black">
                    <Image src={r.image} alt={r.title} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{r.type}</p>
                  <p className="font-semibold line-clamp-2">{r.title}</p>
                </div>
              </Link>
            ))}
          </main>
        </div>
      )}
    </div>
  );
}

