"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { NewsBasicFields } from "@/components/cms/news/NewsBasicFields";
import { NewsTagsFields } from "@/components/cms/news/NewsTagsFields";
import { ArrowLeft, Save } from "lucide-react";

// News validation schema
const newsSchema = z.object({
  isEnglish: z.boolean().default(true),
  isArabic: z.boolean().default(true),
  includeInSitemapEn: z.boolean().default(true),
  includeInSitemapAr: z.boolean().default(true),
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  featuredImageUrl: z.string().url("Must be a valid URL"),
  otherImagesUrl: z.string().optional().transform((val) => {
    if (!val || val.trim() === "") return [];
    return val.split(",").map(url => url.trim()).filter(url => url.length > 0);
  }),
  contentEn: z.string().min(1, "English content is required"),
  contentAr: z.string().min(1, "Arabic content is required"),
  categoryId: z.number().optional().nullable(),
  programId: z.number().optional().nullable(),
  projectId: z.number().optional().nullable(),
  activityId: z.number().optional().nullable(),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  readTime: z.number().min(0).default(0),
  pageViews: z.number().min(0).default(0),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().nullable().optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

export default function NewNewsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New News Article",
      description: "Add a new news article to the website",
      creating: "Creating...",
      create: "Create News Article",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "News article created successfully",
      createError: "Failed to create news article"
    },
    ar: {
      title: "إنشاء مقال إخباري جديد",
      description: "إضافة مقال إخباري جديد إلى الموقع",
      creating: "جاري الإنشاء...",
      create: "إنشاء مقال إخباري",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء المقال الإخباري بنجاح",
      createError: "فشل في إنشاء المقال الإخباري"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      isEnglish: true,
      isArabic: true,
      includeInSitemapEn: true,
      includeInSitemapAr: true,
      titleEn: "",
      titleAr: "",
      featuredImageUrl: "",
      otherImagesUrl: [],
      contentEn: "",
      contentAr: "",
      categoryId: null,
      programId: null,
      projectId: null,
      activityId: null,
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

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create news article");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/news/news`);
    } catch (error) {
      console.error("Error creating news article:", error);
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
              onClick={() => router.push(`/${locale}/cms/news/news`)}
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
          <NewsBasicFields form={form} />

          {/* Tags and Keywords */}
          <NewsTagsFields form={form} />

          {/* Submit Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${locale}/cms/news/news`)}
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
