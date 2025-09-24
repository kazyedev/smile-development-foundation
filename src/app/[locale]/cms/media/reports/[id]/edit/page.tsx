"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ReportBasicFields } from "@/components/cms/media/reports/ReportBasicFields";
import { ReportTagsFields } from "@/components/cms/media/reports/ReportTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

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

interface EditReportPageProps {
  params: Promise<{ id: string }>;
}

export default function EditReportPage({ params }: EditReportPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reportId, setReportId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit Report",
      description: "Update report information and settings",
      updating: "Updating...",
      update: "Update Report",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "Report updated successfully",
      updateError: "Failed to update report",
      fetchError: "Failed to load report"
    },
    ar: {
      title: "تعديل التقرير",
      description: "تحديث معلومات وإعدادات التقرير",
      updating: "جاري التحديث...",
      update: "تحديث التقرير",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث التقرير بنجاح",
      updateError: "فشل في تحديث التقرير",
      fetchError: "فشل في تحميل التقرير"
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

  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const resolvedParams = await params;
        setReportId(resolvedParams.id);
        
        const response = await fetch(`/api/cms/reports/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch report");
        }

        const result = await response.json();
        const report = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          isEnglish: report.is_english || false,
          isArabic: report.is_arabic || false,
          titleEn: report.title_en || "",
          titleAr: report.title_ar || "",
          descriptionEn: report.description_en || "",
          descriptionAr: report.description_ar || "",
          url: report.url || "",
          categoryId: report.category_id || null,
          featuredImageUrl: report.featured_image_url || "",
          slugEn: report.slug_en || "",
          slugAr: report.slug_ar || "",
          keywordsEn: report.keywords_en || [],
          keywordsAr: report.keywords_ar || [],
          tagsEn: report.tags_en || [],
          tagsAr: report.tags_ar || [],
          downloads: report.downloads || 0,
          isPublished: report.is_published || false,
          publishedAt: report.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching report:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/media/reports`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update report");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/media/reports`);
    } catch (error) {
      console.error("Error updating report:", error);
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
