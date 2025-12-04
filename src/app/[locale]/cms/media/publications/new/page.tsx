"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PublicationBasicFields } from "@/components/cms/media/publications/PublicationBasicFields";
import { PublicationTagsFields } from "@/components/cms/media/publications/PublicationTagsFields";
import { ArrowLeft, Save } from "lucide-react";

// Publication validation schema
const publicationSchema = z.object({
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  url: z.string().url("Must be a valid URL"),
  programId: z.number().int().positive().optional(),
  projectId: z.number().int().positive().optional(),
  activityId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
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
  pageViews: z.number().default(0).optional(),
  downloads: z.number().default(0).optional(),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type PublicationFormData = z.infer<typeof publicationSchema>;

export default function NewPublicationPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New Publication",
      description: "Add a new publication to your foundation",
      creating: "Creating...",
      create: "Create Publication",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "Publication created successfully",
      createError: "Failed to create publication"
    },
    ar: {
      title: "إنشاء منشور جديد",
      description: "إضافة منشور جديد للمؤسسة",
      creating: "جاري الإنشاء...",
      create: "إنشاء منشور",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء المنشور بنجاح",
      createError: "فشل في إنشاء المنشور"
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
      programId: undefined,
      projectId: undefined,
      activityId: undefined,
      categoryId: undefined,
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

  const onSubmit = async (data: PublicationFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cms/publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create publication");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/media/publications`);
    } catch (error) {
      console.error("Error creating publication:", error);
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
