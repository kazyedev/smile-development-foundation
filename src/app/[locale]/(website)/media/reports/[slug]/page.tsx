import { mockReports } from "@/data/mockReports";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function MediaReportDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decoded = decodeURIComponent(slug);
  const isEn = locale === 'en';
  const r = mockReports.find(x => x.slugEn === decoded || x.slugAr === decoded);
  if (!r) return notFound();

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)] w-full max-w-4xl mx-auto">
      <div className="rounded-xl border overflow-hidden">
        <div className="relative w-full h-56">
          {r.featuredImageUrl ? (
            <Image src={r.featuredImageUrl} alt={isEn ? r.titleEn : r.titleAr} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
        <div className="p-5">
          <h1 className="text-2xl md:text-3xl font-bold">{isEn ? r.titleEn : r.titleAr}</h1>
          {r.descriptionEn && (
            <p className="text-muted-foreground mt-2">{isEn ? r.descriptionEn : r.descriptionAr}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {(isEn ? r.keywordsEn : r.keywordsAr).map(k => (
              <span key={k} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">{k}</span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(isEn ? r.tagsEn : r.tagsAr).map(t => (
              <span key={t} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">#{t}</span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div><span className="font-semibold">{isEn ? 'Downloads' : 'التنزيلات'}: </span>{r.downloads.toLocaleString(isEn ? 'en-US' : 'ar-EG')}</div>
            <div><span className="font-semibold">{isEn ? 'Published' : 'تاريخ النشر'}: </span>{new Date(r.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</div>
          </div>
          <div className="mt-5">
            <Link href={r.url} target="_blank" className="inline-block px-5 py-2 rounded-md bg-[var(--brand-primary)] text-white">
              {isEn ? 'Open PDF' : 'فتح الملف'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}