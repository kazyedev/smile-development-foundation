"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ActivityBasicFields } from "@/components/cms/media/activities/ActivityBasicFields";
import { ActivityTagsFields } from "@/components/cms/media/activities/ActivityTagsFields";
import { ArrowLeft, Save } from "lucide-react";

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

export default function NewActivityPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New Activity",
      description: "Add a new activity to your foundation",
      creating: "Creating...",
      create: "Create Activity",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "Activity created successfully",
      createError: "Failed to create activity"
    },
    ar: {
      title: "إنشاء نشاط جديد",
      description: "إضافة نشاط جديد للمؤسسة",
      creating: "جاري الإنشاء...",
      create: "إنشاء نشاط",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء النشاط بنجاح",
      createError: "فشل في إنشاء النشاط"
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

  const onSubmit = async (data: ActivityFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create activity");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/media/activities`);
    } catch (error) {
      console.error("Error creating activity:", error);
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
