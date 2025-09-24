"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ReportBasicFields } from "@/components/cms/media/reports/ReportBasicFields";
import { ReportTagsFields } from "@/components/cms/media/reports/ReportTagsFields";
import { ArrowLeft, Save } from "lucide-react";

// Report validation schema
const reportSchema = z.object({
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  url: z.string().url("Must be a valid URL"),
  categoryId: z.number().int().positive().optional().nullable(),
  featuredImageUrl: z.string().url("Must be a valid URL").optional(),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  downloads: z.number().default(0),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

export default function NewReportPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New Report",
      description: "Add a new report to your foundation",
      creating: "Creating...",
      create: "Create Report",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "Report created successfully",
      createError: "Failed to create report"
    },
    ar: {
      title: "إنشاء تقرير جديد",
      description: "إضافة تقرير جديد للمؤسسة",
      creating: "جاري الإنشاء...",
      create: "إنشاء تقرير",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء التقرير بنجاح",
      createError: "فشل في إنشاء التقرير"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      isEnglish: false,
      isArabic: false,
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      url: "",
      categoryId: null,
      featuredImageUrl: "",
      slugEn: "",
      slugAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      downloads: 0,
      isPublished: false,
      publishedAt: null,
    },
  });

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create report");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/media/reports`);
    } catch (error) {
      console.error("Error creating report:", error);
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
              onClick={() => router.push(`/${locale}/cms/media/reports`)}
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
          <ReportBasicFields form={form} />

          {/* Tags and Keywords */}
          <ReportTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/media/reports`)}
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
