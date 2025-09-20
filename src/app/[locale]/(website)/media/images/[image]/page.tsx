"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Image as ImageType } from "@/types/photo";
import { Loader2, Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MediaImageDetailPage({ params }: { params: Promise<{ image: string; locale: string }> }) {
  const [isEnglish, setIsEnglish] = useState(true);
  const [decodedSlug, setDecodedSlug] = useState('');
  const [photo, setPhoto] = useState<ImageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAndFetchImage = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Await params to get locale and image slug
        const { image, locale } = await params;
        const currentDecodedSlug = decodeURIComponent(image);
        const currentIsEnglish = locale === 'en';
        
        // Set state
        setDecodedSlug(currentDecodedSlug);
        setIsEnglish(currentIsEnglish);
        
        // Fetch image data
        const response = await fetch(`/api/images/${currentDecodedSlug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Image not found');
          }
          throw new Error('Failed to fetch image');
        }
        
        const imageData = await response.json();
        setPhoto(imageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching image:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAndFetchImage();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold mb-2">
            {isEnglish ? 'Loading image...' : 'جاري تحميل الصورة...'}
          </h2>
          <p className="text-muted-foreground">
            {isEnglish ? 'Please wait while we fetch the image details' : 'يرجى الانتظار بينما نقوم بتحميل تفاصيل الصورة'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{isEnglish ? 'Image not found' : 'الصورة غير موجودة'}</h2>
          <p className="text-muted-foreground mb-6">
            {error || (isEnglish ? 'The image you are looking for does not exist.' : 'الصورة التي تبحث عنها غير موجودة.')}
          </p>
          <Button asChild>
            <Link href={`/${isEnglish ? 'en' : 'ar'}/media/images`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isEnglish ? 'Back to Photos' : 'العودة للصور'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-10 border-t border-b border-[var(--secondary)] w-full max-w-5xl mx-auto">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black">
        <Image src={photo.url} alt={photo.alt || (isEnglish ? photo.titleEn : photo.titleAr)} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{isEnglish ? photo.titleEn : photo.titleAr}</h1>
        {photo.descriptionEn && (
          <p className="text-muted-foreground mt-2">{isEnglish ? photo.descriptionEn : photo.descriptionAr}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">{isEnglish ? 'Dimensions' : 'الأبعاد'}: </span>{photo.width}×{photo.height}</div>
        <div><span className="font-semibold">MIME: </span>{photo.mimeType}</div>
        <div><span className="font-semibold">{isEnglish ? 'Size' : 'الحجم'}: </span>{(photo.size / 1024).toFixed(0)} KB</div>
        <div><span className="font-semibold">{isEnglish ? 'Views' : 'المشاهدات'}: </span>{(photo.views || 0).toLocaleString()}</div>
        {(photo.locationEn || photo.locationAr) && <div><span className="font-semibold">{isEnglish ? 'Location' : 'الموقع'}: </span>{isEnglish ? photo.locationEn : photo.locationAr}</div>}
        {photo.takenAt && <div><span className="font-semibold">{isEnglish ? 'Taken at' : 'تاريخ الالتقاط'}: </span>{new Date(photo.takenAt).toLocaleString(isEnglish ? 'en-US' : 'ar-EG')}</div>}
        {photo.photographer && <div><span className="font-semibold">{isEnglish ? 'Photographer' : 'المصور'}: </span>{photo.photographer}</div>}
        {photo.publishedAt && <div><span className="font-semibold">{isEnglish ? 'Published' : 'نُشر في'}: </span>{new Date(photo.publishedAt).toLocaleString(isEnglish ? 'en-US' : 'ar-EG')}</div>}
      </div>
      <div>
        {photo.keywordsEn && photo.keywordsEn.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold mb-2 text-sm">{isEnglish ? 'Keywords' : 'الكلمات المفتاحية'}</h3>
            <div className="flex flex-wrap gap-2">
              {(isEnglish ? photo.keywordsEn : photo.keywordsAr || []).map(k => (
                <span key={k} className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">{k}</span>
              ))}
            </div>
          </div>
        )}
        {photo.tagsEn && photo.tagsEn.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2 text-sm">{isEnglish ? 'Tags' : 'العلامات'}</h3>
            <div className="flex flex-wrap gap-2">
              {(isEnglish ? photo.tagsEn : photo.tagsAr || []).map(t => (
                <span key={t} className="px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm">#{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}