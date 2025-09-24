"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ActivityBasicFields } from "@/components/cms/media/activities/ActivityBasicFields";
import { ActivityTagsFields } from "@/components/cms/media/activities/ActivityTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

// Activity validation schema
const activitySchema = z.object({
  isArabic: z.boolean().default(false),
  isEnglish: z.boolean().default(false),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  featuredImageUrl: z.string().url("Must be a valid URL"),
  date: z.string().optional().nullable(),
  contentEn: z.string().min(1, "English content is required"),
  contentAr: z.string().min(1, "Arabic content is required"),
  otherImagesUrl: z.array(z.string()).default([]),
  programId: z.number().int().positive("Program is required"),
  projectId: z.number().int().positive().optional().nullable(),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  pageViews: z.number().default(0),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type ActivityFormData = z.infer<typeof activitySchema>;

interface EditActivityPageProps {
  params: Promise<{ id: string }>;
}

export default function EditActivityPage({ params }: EditActivityPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activityId, setActivityId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit Activity",
      description: "Update activity information and settings",
      updating: "Updating...",
      update: "Update Activity",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "Activity updated successfully",
      updateError: "Failed to update activity",
      fetchError: "Failed to load activity"
    },
    ar: {
      title: "تعديل النشاط",
      description: "تحديث معلومات وإعدادات النشاط",
      updating: "جاري التحديث...",
      update: "تحديث النشاط",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث النشاط بنجاح",
      updateError: "فشل في تحديث النشاط",
      fetchError: "فشل في تحميل النشاط"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      isArabic: false,
      isEnglish: false,
      titleEn: "",
      titleAr: "",
      featuredImageUrl: "",
      date: null,
      contentEn: "",
      contentAr: "",
      otherImagesUrl: [],
      programId: 0,
      projectId: null,
      slugEn: "",
      slugAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      pageViews: 0,
      isPublished: false,
      publishedAt: null,
    },
  });

  // Fetch activity data
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const resolvedParams = await params;
        setActivityId(resolvedParams.id);
        
        const response = await fetch(`/api/cms/activities/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch activity");
        }

        const result = await response.json();
        const activity = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          isArabic: activity.is_arabic || false,
          isEnglish: activity.is_english || false,
          titleEn: activity.title_en || "",
          titleAr: activity.title_ar || "",
          featuredImageUrl: activity.featured_image_url || "",
          date: activity.date || null,
          contentEn: activity.content_en || "",
          contentAr: activity.content_ar || "",
          otherImagesUrl: activity.other_images_url || [],
          programId: activity.program_id || 0,
          projectId: activity.project_id || null,
          slugEn: activity.slug_en || "",
          slugAr: activity.slug_ar || "",
          keywordsEn: activity.keywords_en || [],
          keywordsAr: activity.keywords_ar || [],
          tagsEn: activity.tags_en || [],
          tagsAr: activity.tags_ar || [],
          pageViews: activity.page_views || 0,
          isPublished: activity.is_published || false,
          publishedAt: activity.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching activity:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/media/activities`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: ActivityFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update activity");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/media/activities`);
    } catch (error) {
      console.error("Error updating activity:", error);
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
              onClick={() => router.push(`/${locale}/cms/media/activities`)}
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
          <ActivityBasicFields form={form} />

          {/* Tags and Keywords */}
          <ActivityTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/media/activities`)}
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
