"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ImageBasicFields } from "@/components/cms/media/images/ImageBasicFields";
import { ImageTagsFields } from "@/components/cms/media/images/ImageTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

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

interface EditImagePageProps {
  params: Promise<{ id: string }>;
}

export default function EditImagePage({ params }: EditImagePageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageId, setImageId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit Image",
      description: "Update image information and settings",
      updating: "Updating...",
      update: "Update Image",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "Image updated successfully",
      updateError: "Failed to update image",
      fetchError: "Failed to load image"
    },
    ar: {
      title: "تعديل الصورة",
      description: "تحديث معلومات وإعدادات الصورة",
      updating: "جاري التحديث...",
      update: "تحديث الصورة",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث الصورة بنجاح",
      updateError: "فشل في تحديث الصورة",
      fetchError: "فشل في تحميل الصورة"
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

  // Fetch image data
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const resolvedParams = await params;
        setImageId(resolvedParams.id);
        
        const response = await fetch(`/api/cms/images/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const result = await response.json();
        const image = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          titleEn: image.title_en || "",
          titleAr: image.title_ar || "",
          descriptionEn: image.description_en || "",
          descriptionAr: image.description_ar || "",
          mimeType: image.mime_type || "image/jpeg",
          size: image.size || 0,
          width: image.width || 0,
          height: image.height || 0,
          url: image.url || "",
          alt: image.alt || "",
          locationEn: image.location_en || "",
          locationAr: image.location_ar || "",
          takenAt: image.taken_at || null,
          photographer: image.photographer || "",
          isPublic: image.is_public ?? true,
          programId: image.program_id || null,
          projectId: image.project_id || null,
          activityId: image.activity_id || null,
          categoryId: image.category_id || null,
          slugEn: image.slug_en || "",
          slugAr: image.slug_ar || "",
          keywordsEn: image.keywords_en || [],
          keywordsAr: image.keywords_ar || [],
          tagsEn: image.tags_en || [],
          tagsAr: image.tags_ar || [],
          views: image.views || 0,
          isPublished: image.is_published || false,
          publishedAt: image.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching image:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/media/images`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: ImageFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/images/${imageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update image");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/media/images`);
    } catch (error) {
      console.error("Error updating image:", error);
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
