"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { SuccessStoryBasicFields } from "@/components/cms/media/success-stories/SuccessStoryBasicFields";
import { SuccessStoryTagsFields } from "@/components/cms/media/success-stories/SuccessStoryTagsFields";
import { ArrowLeft, Save } from "lucide-react";

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

export default function NewSuccessStoryPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New Success Story",
      description: "Add a new inspiring success story to showcase achievements",
      creating: "Creating...",
      create: "Create Success Story",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "Success story created successfully",
      createError: "Failed to create success story"
    },
    ar: {
      title: "إنشاء قصة نجاح جديدة",
      description: "إضافة قصة نجاح ملهمة جديدة لعرض الإنجازات",
      creating: "جاري الإنشاء...",
      create: "إنشاء قصة نجاح",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء قصة النجاح بنجاح",
      createError: "فشل في إنشاء قصة النجاح"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<SuccessStoryFormData>({
    resolver: zodResolver(successStorySchema),
    defaultValues: {
      isEnglish: true,
      isArabic: true,
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
      readTime: 5,
      pageViews: 0,
      isPublished: false,
      publishedAt: null,
    },
  });

  const onSubmit = async (data: SuccessStoryFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/success-stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create success story");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/media/success-stories`);
    } catch (error) {
      console.error("Error creating success story:", error);
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
