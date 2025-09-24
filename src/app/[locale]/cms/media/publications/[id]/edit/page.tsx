"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PublicationBasicFields } from "@/components/cms/media/publications/PublicationBasicFields";
import { PublicationTagsFields } from "@/components/cms/media/publications/PublicationTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

// Publication validation schema
const publicationSchema = z.object({
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  url: z.string().url("Must be a valid URL"),
  programId: z.number().int().positive().optional().nullable(),
  projectId: z.number().int().positive().optional().nullable(),
  activityId: z.number().int().positive().optional().nullable(),
  categoryId: z.number().int().positive().optional().nullable(),
  featuredImageUrl: z.string().url("Must be a valid URL").optional(),
  coverImageUrl: z.string().url("Must be a valid URL").optional(),
  attachmentUrl: z.string().url("Must be a valid URL").optional(),
  contentEn: z.string().optional(),
  contentAr: z.string().optional(),
  authorEn: z.string().max(255).optional(),
  authorAr: z.string().max(255).optional(),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  pageViews: z.number().default(0),
  downloads: z.number().default(0),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type PublicationFormData = z.infer<typeof publicationSchema>;

interface EditPublicationPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPublicationPage({ params }: EditPublicationPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [publicationId, setPublicationId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit Publication",
      description: "Update publication information and settings",
      updating: "Updating...",
      update: "Update Publication",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "Publication updated successfully",
      updateError: "Failed to update publication",
      fetchError: "Failed to load publication"
    },
    ar: {
      title: "تعديل المنشور",
      description: "تحديث معلومات وإعدادات المنشور",
      updating: "جاري التحديث...",
      update: "تحديث المنشور",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث المنشور بنجاح",
      updateError: "فشل في تحديث المنشور",
      fetchError: "فشل في تحميل المنشور"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      isEnglish: false,
      isArabic: false,
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      url: "",
      programId: null,
      projectId: null,
      activityId: null,
      categoryId: null,
      featuredImageUrl: "",
      coverImageUrl: "",
      attachmentUrl: "",
      contentEn: "",
      contentAr: "",
      authorEn: "",
      authorAr: "",
      slugEn: "",
      slugAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      pageViews: 0,
      downloads: 0,
      isPublished: false,
      publishedAt: null,
    },
  });

  // Fetch publication data
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const resolvedParams = await params;
        setPublicationId(resolvedParams.id);
        
        const response = await fetch(`/api/cms/publications/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch publication");
        }

        const result = await response.json();
        const pub = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          isEnglish: pub.is_english || false,
          isArabic: pub.is_arabic || false,
          titleEn: pub.title_en || "",
          titleAr: pub.title_ar || "",
          descriptionEn: pub.description_en || "",
          descriptionAr: pub.description_ar || "",
          url: pub.url || "",
          programId: pub.program_id || null,
          projectId: pub.project_id || null,
          activityId: pub.activity_id || null,
          categoryId: pub.category_id || null,
          featuredImageUrl: pub.featured_image_url || "",
          coverImageUrl: pub.cover_image_url || "",
          attachmentUrl: pub.attachment_url || "",
          contentEn: pub.content_en || "",
          contentAr: pub.content_ar || "",
          authorEn: pub.author_en || "",
          authorAr: pub.author_ar || "",
          slugEn: pub.slug_en || "",
          slugAr: pub.slug_ar || "",
          keywordsEn: pub.keywords_en || [],
          keywordsAr: pub.keywords_ar || [],
          tagsEn: pub.tags_en || [],
          tagsAr: pub.tags_ar || [],
          pageViews: pub.page_views || 0,
          downloads: pub.downloads || 0,
          isPublished: pub.is_published || false,
          publishedAt: pub.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching publication:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/media/publications`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublication();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: PublicationFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/publications/${publicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update publication");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/media/publications`);
    } catch (error) {
      console.error("Error updating publication:", error);
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
              onClick={() => router.push(`/${locale}/cms/media/publications`)}
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
          <PublicationBasicFields form={form} />

          {/* Tags and Keywords */}
          <PublicationTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/media/publications`)}
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
