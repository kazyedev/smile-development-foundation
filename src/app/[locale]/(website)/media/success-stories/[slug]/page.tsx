import { mockStories } from "@/data/mockStories";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function MediaSuccessStoryDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decoded = decodeURIComponent(slug);
  const isEn = locale === 'en';
  const story = mockStories.find(s => s.slugEn === decoded || s.slugAr === decoded);
  if (!story) return notFound();

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)] w-full max-w-5xl mx-auto">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
        <Image src={story.featuredImageUrl} alt={isEn ? story.titleEn : story.titleAr} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{isEn ? story.titleEn : story.titleAr}</h1>
        <p className="text-muted-foreground mt-1">
          {isEn ? `${story.personNameEn}, ${story.personAge} - ${story.cityEn}` : `${story.personNameAr}، ${story.personAge} - ${story.cityAr}`}
        </p>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>{isEn ? story.contentEn : story.contentAr}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(isEn ? story.keywordsEn : story.keywordsAr).map(k => (
          <span key={k} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">{k}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {(isEn ? story.tagsEn : story.tagsAr).map(t => (
          <span key={t} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">#{t}</span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div><span className="font-semibold">{isEn ? 'Reads' : 'القراءات'}: </span>{story.pageViews.toLocaleString(isEn ? 'en-US' : 'ar-EG')}</div>
        <div><span className="font-semibold">{isEn ? 'Published' : 'تاريخ النشر'}: </span>{new Date(story.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</div>
        <div><span className="font-semibold">{isEn ? 'Updated' : 'آخر تحديث'}: </span>{new Date(story.updatedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</div>
      </div>
    </div>
  );
}