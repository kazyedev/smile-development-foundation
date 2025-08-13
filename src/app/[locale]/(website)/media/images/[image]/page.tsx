import { mockPhotos } from "@/data/mockPhotos";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function MediaImageDetailPage({ params: { image, locale } }: { params: { image: string; locale: string } }) {
  const decoded = decodeURIComponent(image);
  const isEn = locale === 'en';
  const photo = mockPhotos.find(p => p.slugEn === decoded || p.slugAr === decoded);
  if (!photo) return notFound();

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)] w-full max-w-5xl mx-auto">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black">
        <Image src={photo.url} alt={photo.alt || (isEn ? photo.titleEn : photo.titleAr)} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{isEn ? photo.titleEn : photo.titleAr}</h1>
        {photo.descriptionEn && (
          <p className="text-muted-foreground mt-2">{isEn ? photo.descriptionEn : photo.descriptionAr}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">{isEn ? 'Dimensions' : 'الأبعاد'}: </span>{photo.width}×{photo.height}</div>
        <div><span className="font-semibold">MIME: </span>{photo.mimeType}</div>
        <div><span className="font-semibold">{isEn ? 'Size' : 'الحجم'}: </span>{(photo.size / 1024).toFixed(0)} KB</div>
        {photo.locationEn && <div><span className="font-semibold">{isEn ? 'Location' : 'الموقع'}: </span>{isEn ? photo.locationEn : photo.locationAr}</div>}
        {photo.takenAt && <div><span className="font-semibold">{isEn ? 'Taken at' : 'تاريخ الالتقاط'}: </span>{new Date(photo.takenAt).toLocaleString(isEn ? 'en-US' : 'ar-EG')}</div>}
        {photo.photographer && <div><span className="font-semibold">{isEn ? 'Photographer' : 'المصور'}: </span>{photo.photographer}</div>}
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {(isEn ? photo.keywordsEn : photo.keywordsAr).map(k => (
            <span key={k} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">{k}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(isEn ? photo.tagsEn : photo.tagsAr).map(t => (
            <span key={t} className="px-2 py-1 rounded-md bg-muted-foreground/10 text-sm">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}