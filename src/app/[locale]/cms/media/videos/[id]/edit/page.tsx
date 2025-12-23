"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { VideoBasicFields } from "@/components/cms/media/videos/VideoBasicFields";
import { VideoTagsFields } from "@/components/cms/media/videos/VideoTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

// Video validation schema
const videoSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  mimeType: z.string().regex(/^video\//, "MIME type must be a video type"),
  size: z.number().min(1, "Size must be greater than 0"),
  width: z.number().min(1, "Width must be greater than 0"),
  height: z.number().min(1, "Height must be greater than 0"),
  url: z.string().url("Must be a valid URL"),
  locationEn: z.string().optional(),
  locationAr: z.string().optional(),
  isPublic: z.boolean(),
  categoryId: z.number().optional().nullable(),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()),
  keywordsAr: z.array(z.string()),
  tagsEn: z.array(z.string()),
  tagsAr: z.array(z.string()),
  views: z.number(),
  isPublished: z.boolean(),
  publishedAt: z.string().nullable().optional(),
});

type VideoFormData = z.infer<typeof videoSchema>;

interface EditVideoPageProps {
  params: Promise<{ id: string }>;
}

export default function EditVideoPage({ params }: EditVideoPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoId, setVideoId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit Video",
      description: "Update video information and settings",
      updating: "Updating...",
      update: "Update Video",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "Video updated successfully",
      updateError: "Failed to update video",
      fetchError: "Failed to load video"
    },
    ar: {
      title: "تعديل الفيديو",
      description: "تحديث معلومات وإعدادات الفيديو",
      updating: "جاري التحديث...",
      update: "تحديث الفيديو",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث الفيديو بنجاح",
      updateError: "فشل في تحديث الفيديو",
      fetchError: "فشل في تحميل الفيديو"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      mimeType: "video/mp4",
      size: 0,
      width: 0,
      height: 0,
      url: "",
      locationEn: "",
      locationAr: "",
      isPublic: true,
      categoryId: null,
      slugEn: "",
      slugAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      views: 0,
      isPublished: false,
      publishedAt: null,
    },
  });

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const resolvedParams = await params;
        setVideoId(resolvedParams.id);

        const response = await fetch(`/api/cms/videos/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        const result = await response.json();
        const video = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          titleEn: video.title_en || "",
          titleAr: video.title_ar || "",
          descriptionEn: video.description_en || "",
          descriptionAr: video.description_ar || "",
          mimeType: video.mime_type || "video/mp4",
          size: video.size || 0,
          width: video.width || 0,
          height: video.height || 0,
          url: video.url || "",
          locationEn: video.location_en || "",
          locationAr: video.location_ar || "",
          isPublic: video.is_public ?? true,
          categoryId: video.category_id || null,
          slugEn: video.slug_en || "",
          slugAr: video.slug_ar || "",
          keywordsEn: video.keywords_en || [],
          keywordsAr: video.keywords_ar || [],
          tagsEn: video.tags_en || [],
          tagsAr: video.tags_ar || [],
          views: video.views || 0,
          isPublished: video.is_published || false,
          publishedAt: video.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching video:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/media/videos`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [params, form, router, locale, t, toast]);

  const onSubmit = async (data: VideoFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/cms/videos/${videoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update video");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/media/videos`);
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error(error instanceof Error ? error.message : text.updateError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 py-8 ${isArabic ? "text-right" : ""}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isArabic ? "text-right" : ""}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/${locale}/cms/media/videos`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {text.back}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{text.title}</CardTitle>
              <CardDescription>{text.description}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Fields */}
          <VideoBasicFields form={form} />

          {/* Tags and Keywords */}
          <VideoTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/media/videos`)}
                  disabled={isSubmitting}
                >
                  {text.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? text.updating : text.update}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
