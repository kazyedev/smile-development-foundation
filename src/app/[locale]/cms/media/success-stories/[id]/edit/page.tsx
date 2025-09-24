"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { SuccessStoryBasicFields } from "@/components/cms/media/success-stories/SuccessStoryBasicFields";
import { SuccessStoryTagsFields } from "@/components/cms/media/success-stories/SuccessStoryTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

// Success story validation schema
const successStorySchema = z.object({
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  featuredImageUrl: z.string().url("Must be a valid URL"),
  video: z.string().url("Must be a valid URL"),
  programId: z.number().optional().nullable(),
  personNameEn: z.string().min(1, "Person name in English is required"),
  personNameAr: z.string().min(1, "Person name in Arabic is required"),
  personAge: z.coerce.number().min(1, "Age must be greater than 0"),
  personLocationEn: z.string().min(1, "Location in English is required"),
  personLocationAr: z.string().min(1, "Location in Arabic is required"),
  cityEn: z.string().min(1, "City in English is required"),
  cityAr: z.string().min(1, "City in Arabic is required"),
  otherImagesUrl: z.array(z.string()).default([]),
  contentEn: z.string().min(1, "English content is required"),
  contentAr: z.string().min(1, "Arabic content is required"),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  readTime: z.coerce.number().min(0).optional(),
  pageViews: z.number().default(0),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type SuccessStoryFormData = z.infer<typeof successStorySchema>;

interface EditSuccessStoryPageProps {
  params: Promise<{ id: string }>;
}

export default function EditSuccessStoryPage({ params }: EditSuccessStoryPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storyId, setStoryId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit Success Story",
      description: "Update success story information and settings",
      updating: "Updating...",
      update: "Update Success Story",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "Success story updated successfully",
      updateError: "Failed to update success story",
      fetchError: "Failed to load success story"
    },
    ar: {
      title: "تعديل قصة النجاح",
      description: "تحديث معلومات وإعدادات قصة النجاح",
      updating: "جاري التحديث...",
      update: "تحديث قصة النجاح",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث قصة النجاح بنجاح",
      updateError: "فشل في تحديث قصة النجاح",
      fetchError: "فشل في تحميل قصة النجاح"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<SuccessStoryFormData>({
    resolver: zodResolver(successStorySchema),
    defaultValues: {
      isEnglish: false,
      isArabic: false,
      titleEn: "",
      titleAr: "",
      featuredImageUrl: "",
      video: "",
      programId: null,
      personNameEn: "",
      personNameAr: "",
      personAge: 0,
      personLocationEn: "",
      personLocationAr: "",
      cityEn: "",
      cityAr: "",
      otherImagesUrl: [],
      contentEn: "",
      contentAr: "",
      slugEn: "",
      slugAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      readTime: 0,
      pageViews: 0,
      isPublished: false,
      publishedAt: null,
    },
  });

  // Fetch success story data
  useEffect(() => {
    const fetchSuccessStory = async () => {
      try {
        const resolvedParams = await params;
        setStoryId(resolvedParams.id);
        
        const response = await fetch(`/api/cms/success-stories/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch success story");
        }

        const result = await response.json();
        const story = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          isEnglish: story.is_english || false,
          isArabic: story.is_arabic || false,
          titleEn: story.title_en || "",
          titleAr: story.title_ar || "",
          featuredImageUrl: story.featured_image_url || "",
          video: story.video || "",
          programId: story.program_id || null,
          personNameEn: story.person_name_en || "",
          personNameAr: story.person_name_ar || "",
          personAge: story.person_age || 0,
          personLocationEn: story.person_location_en || "",
          personLocationAr: story.person_location_ar || "",
          cityEn: story.city_en || "",
          cityAr: story.city_ar || "",
          otherImagesUrl: story.other_images_url || [],
          contentEn: story.content_en || "",
          contentAr: story.content_ar || "",
          slugEn: story.slug_en || "",
          slugAr: story.slug_ar || "",
          keywordsEn: story.keywords_en || [],
          keywordsAr: story.keywords_ar || [],
          tagsEn: story.tags_en || [],
          tagsAr: story.tags_ar || [],
          readTime: story.read_time || 0,
          pageViews: story.page_views || 0,
          isPublished: story.is_published || false,
          publishedAt: story.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching success story:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/media/success-stories`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuccessStory();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: SuccessStoryFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/success-stories/${storyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update success story");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/media/success-stories`);
    } catch (error) {
      console.error("Error updating success story:", error);
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
              onClick={() => router.push(`/${locale}/cms/media/success-stories`)}
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
          <SuccessStoryBasicFields form={form} />

          {/* Tags and Keywords */}
          <SuccessStoryTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/media/success-stories`)}
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
