"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ImageBasicFields } from "@/components/cms/media/images/ImageBasicFields";
import { ImageTagsFields } from "@/components/cms/media/images/ImageTagsFields";
import { ArrowLeft, Save } from "lucide-react";

// Image validation schema
const imageSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  mimeType: z.string().regex(/^image\//, "MIME type must be an image type"),
  size: z.coerce.number().min(1, "Size must be greater than 0"),
  width: z.coerce.number().min(1, "Width must be greater than 0"),
  height: z.coerce.number().min(1, "Height must be greater than 0"),
  url: z.string().url("Must be a valid URL"),
  alt: z.string().optional(),
  locationEn: z.string().optional(),
  locationAr: z.string().optional(),
  takenAt: z.string().optional().nullable(),
  photographer: z.string().optional(),
  isPublic: z.boolean().default(true),
  programId: z.number().optional().nullable(),
  projectId: z.number().optional().nullable(),
  activityId: z.number().optional().nullable(),
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

type ImageFormData = z.infer<typeof imageSchema>;

export default function NewImagePage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New Image",
      description: "Add a new image to the media library",
      creating: "Creating...",
      create: "Create Image",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "Image created successfully",
      createError: "Failed to create image"
    },
    ar: {
      title: "إنشاء صورة جديدة",
      description: "إضافة صورة جديدة إلى مكتبة الوسائط",
      creating: "جاري الإنشاء...",
      create: "إنشاء صورة",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء الصورة بنجاح",
      createError: "فشل في إنشاء الصورة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      mimeType: "image/jpeg",
      size: 0,
      width: 0,
      height: 0,
      url: "",
      alt: "",
      locationEn: "",
      locationAr: "",
      takenAt: null,
      photographer: "",
      isPublic: true,
      programId: null,
      projectId: null,
      activityId: null,
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

  const onSubmit = async (data: ImageFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create image");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/media/images`);
    } catch (error) {
      console.error("Error creating image:", error);
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
              onClick={() => router.push(`/${locale}/cms/media/images`)}
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
          <ImageBasicFields form={form} />

          {/* Tags and Keywords */}
          <ImageTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/media/images`)}
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
