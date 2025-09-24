"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { VideoBasicFields } from "@/components/cms/media/videos/VideoBasicFields";
import { VideoTagsFields } from "@/components/cms/media/videos/VideoTagsFields";
import { ArrowLeft, Save } from "lucide-react";

// Video validation schema
const videoSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  mimeType: z.string().regex(/^video\//, "MIME type must be a video type"),
  size: z.coerce.number().min(1, "Size must be greater than 0"),
  width: z.coerce.number().min(1, "Width must be greater than 0"),
  height: z.coerce.number().min(1, "Height must be greater than 0"),
  url: z.string().url("Must be a valid URL"),
  locationEn: z.string().optional(),
  locationAr: z.string().optional(),
  isPublic: z.boolean().default(true),
  categoryId: z.number().optional().nullable(),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  views: z.number().default(0),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type VideoFormData = z.infer<typeof videoSchema>;

export default function NewVideoPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New Video",
      description: "Add a new video to the media library",
      creating: "Creating...",
      create: "Create Video",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "Video created successfully",
      createError: "Failed to create video"
    },
    ar: {
      title: "إنشاء فيديو جديد",
      description: "إضافة فيديو جديد إلى مكتبة الوسائط",
      creating: "جاري الإنشاء...",
      create: "إنشاء فيديو",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء الفيديو بنجاح",
      createError: "فشل في إنشاء الفيديو"
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

  const onSubmit = async (data: VideoFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create video");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/media/videos`);
    } catch (error) {
      console.error("Error creating video:", error);
      toast.error(error instanceof Error ? error.message : text.createError);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  {isSubmitting ? text.creating : text.create}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
