"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { NewsBasicFields } from "@/components/cms/news/NewsBasicFields";
import { NewsTagsFields } from "@/components/cms/news/NewsTagsFields";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

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

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsId, setNewsId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit News Article",
      description: "Update news article information and settings",
      updating: "Updating...",
      update: "Update News Article",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "News article updated successfully",
      updateError: "Failed to update news article",
      fetchError: "Failed to load news article"
    },
    ar: {
      title: "تعديل المقال الإخباري",
      description: "تحديث معلومات وإعدادات المقال الإخباري",
      updating: "جاري التحديث...",
      update: "تحديث المقال الإخباري",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث المقال الإخباري بنجاح",
      updateError: "فشل في تحديث المقال الإخباري",
      fetchError: "فشل في تحميل المقال الإخباري"
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

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const resolvedParams = await params;
        setNewsId(resolvedParams.id);
        
        const response = await fetch(`/api/cms/news/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch news article");
        }

        const result = await response.json();
        const news = result.data;

        // Transform database fields to camelCase for the form
        form.reset({
          isEnglish: news.is_english ?? true,
          isArabic: news.is_arabic ?? true,
          includeInSitemapEn: news.include_in_sitemap_en ?? true,
          includeInSitemapAr: news.include_in_sitemap_ar ?? true,
          titleEn: news.title_en || "",
          titleAr: news.title_ar || "",
          featuredImageUrl: news.featured_image_url || "",
          otherImagesUrl: Array.isArray(news.other_images_url) ? news.other_images_url.join(", ") : "",
          contentEn: news.content_en || "",
          contentAr: news.content_ar || "",
          categoryId: news.category_id || null,
          programId: news.program_id || null,
          projectId: news.project_id || null,
          activityId: news.activity_id || null,
          slugEn: news.slug_en || "",
          slugAr: news.slug_ar || "",
          keywordsEn: news.keywords_en || [],
          keywordsAr: news.keywords_ar || [],
          tagsEn: news.tags_en || [],
          tagsAr: news.tags_ar || [],
          readTime: news.read_time || 0,
          pageViews: news.page_views || 0,
          isPublished: news.is_published || false,
          publishedAt: news.published_at || null,
        });
      } catch (error) {
        console.error("Error fetching news article:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/news/news`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/news/${newsId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update news article");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/news/news`);
    } catch (error) {
      console.error("Error updating news article:", error);
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
