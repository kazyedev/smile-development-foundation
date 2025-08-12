import { mockVideos } from "@/data/mockVideos";
import type { Metadata } from "next";
import VideoDetailClient from "@/components/website/videos/VideoDetailClient";

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const { locale, slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const isEnglish = locale === "en";
  const video = mockVideos.find((v) => v.slugEn === decodedSlug || v.slugAr === decodedSlug);
  if (!video) {
    return {
      title: isEnglish ? "Video not found" : "الفيديو غير موجود",
    };
  }
  const title = isEnglish ? video.titleEn : video.titleAr;
  const description = isEnglish ? video.descriptionEn : video.descriptionAr;
  const urlBase = process.env.NEXT_PUBLIC_SITE_URL || "";
  const pathnameEn = `/en/media/videos/${video.slugEn}`;
  const pathnameAr = `/ar/media/videos/${video.slugAr}`;
  return {
    title,
    description,
    alternates: {
      canonical: `${urlBase}${isEnglish ? pathnameEn : pathnameAr}`,
      languages: {
        en: `${urlBase}${pathnameEn}`,
        ar: `${urlBase}${pathnameAr}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "video.other",
      url: `${urlBase}${isEnglish ? pathnameEn : pathnameAr}`,
    },
  };
}

export default function MediaVideoDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const isEnglish = locale === "en";
  const decodedSlug = decodeURIComponent(slug);
  const video = mockVideos.find((v) => v.slugEn === decodedSlug || v.slugAr === decodedSlug);
  if (!video) {
    return (
      <div className="px-4 py-10">
        <p className="text-center text-muted-foreground">{isEnglish ? "Video not found." : "الفيديو غير موجود."}</p>
      </div>
    );
  }
  const moreVideos = mockVideos.filter((v) => v !== video).slice(0, 6);
  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <VideoDetailClient video={video} moreVideos={moreVideos} locale={locale} />
    </div>
  );
}