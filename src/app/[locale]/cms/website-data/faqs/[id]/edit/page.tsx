"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

// FAQ validation schema
const faqSchema = z.object({
  questionEn: z.string().min(1, "English question is required"),
  questionAr: z.string().min(1, "Arabic question is required"),
  answerEn: z.string().min(1, "English answer is required"),
  answerAr: z.string().min(1, "Arabic answer is required"),
  isPublished: z.boolean().default(false),
  views: z.number().min(0).default(0).optional(),
});

type FAQFormData = z.infer<typeof faqSchema>;

interface EditFAQPageProps {
  params: Promise<{ id: string }>;
}

export default function EditFAQPage({ params }: EditFAQPageProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [faqId, setFaqId] = useState<string>("");

  // Translations
  const t = {
    en: {
      title: "Edit FAQ",
      description: "Update frequently asked question and answer",
      questionInfo: "Question",
      questionEn: "Question (English)",
      questionAr: "Question (Arabic)",
      answerInfo: "Answer",
      answerEn: "Answer (English)",
      answerAr: "Answer (Arabic)",
      publishing: "Publishing",
      isPublished: "Published",
      publishedDesc: "Make this FAQ visible on the website",
      views: "Views",
      updating: "Updating...",
      update: "Update FAQ",
      cancel: "Cancel",
      back: "Back",
      loading: "Loading...",
      updateSuccess: "FAQ updated successfully",
      updateError: "Failed to update FAQ",
      fetchError: "Failed to load FAQ",
      notFound: "FAQ not found",
    },
    ar: {
      title: "تعديل السؤال",
      description: "تحديث السؤال والإجابة الشائعة",
      questionInfo: "السؤال",
      questionEn: "السؤال (إنجليزي)",
      questionAr: "السؤال (عربي)",
      answerInfo: "الإجابة",
      answerEn: "الإجابة (إنجليزي)",
      answerAr: "الإجابة (عربي)",
      publishing: "النشر",
      isPublished: "منشور",
      publishedDesc: "جعل هذا السؤال مرئياً على الموقع",
      views: "المشاهدات",
      updating: "جاري التحديث...",
      update: "تحديث السؤال",
      cancel: "إلغاء",
      back: "عودة",
      loading: "جاري التحميل...",
      updateSuccess: "تم تحديث السؤال بنجاح",
      updateError: "فشل في تحديث السؤال",
      fetchError: "فشل في تحميل السؤال",
      notFound: "السؤال غير موجود",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const form = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      questionEn: "",
      questionAr: "",
      answerEn: "",
      answerAr: "",
      isPublished: false,
      views: 0,
    },
  });

  // Fetch FAQ data
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const resolvedParams = await params;
        setFaqId(resolvedParams.id);
        
        // Try CMS endpoint first, fallback to regular API
        let response = await fetch(`/api/cms/faqs/${resolvedParams.id}`);
        if (!response.ok && response.status === 404) {
          // Fallback to regular API endpoint
          response = await fetch(`/api/faqs?id=${resolvedParams.id}`);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch FAQ");
        }

        const result = await response.json();
        const faq = result.data || result.items?.[0] || result;

        if (!faq) {
          throw new Error("FAQ not found");
        }

        // Transform database fields to camelCase for the form
        // Handle both camelCase (from Drizzle) and snake_case (from raw DB) formats
        form.reset({
          questionEn: faq.questionEn || faq.question_en || "",
          questionAr: faq.questionAr || faq.question_ar || "",
          answerEn: faq.answerEn || faq.answer_en || "",
          answerAr: faq.answerAr || faq.answer_ar || "",
          isPublished: faq.isPublished !== undefined ? faq.isPublished : (faq.is_published || false),
          views: faq.views || 0,
        });
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        toast.error(text.fetchError);
        router.push(`/${locale}/cms/website-data/faqs`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQ();
  }, [params, form, router, locale, text.fetchError]);

  const onSubmit = async (data: FAQFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/cms/faqs/${faqId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update FAQ");
      }

      toast.success(text.updateSuccess);

      router.push(`/${locale}/cms/website-data/faqs`);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error(error instanceof Error ? error.message : text.updateError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 py-8 ${isArabic ? "text-right" : ""}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className={`${isArabic ? 'mr-2' : 'ml-2'}`}>{text.loading}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isArabic ? "text-right" : ""}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/${locale}/cms/website-data/faqs`)}
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Question Fields */}
            <Card>
              <CardHeader>
                <CardTitle>{text.questionInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="questionEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.questionEn}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter English question..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="questionAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.questionAr}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أدخل السؤال بالعربية..."
                            className="min-h-[100px]"
                            dir="rtl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Answer Fields */}
            <Card>
              <CardHeader>
                <CardTitle>{text.answerInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="answerEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.answerEn}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter English answer..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="answerAr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{text.answerAr}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أدخل الإجابة بالعربية..."
                            className="min-h-[150px]"
                            dir="rtl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Publishing Card */}
            <Card>
              <CardHeader>
                <CardTitle>{text.publishing}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {text.isPublished}
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {text.publishedDesc}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Views count (read-only display) */}
                <FormField
                  control={form.control}
                  name="views"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {text.views}
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {field.value || 0} {isArabic ? "مشاهدة" : "views"}
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/${locale}/cms/website-data/faqs`)}
                    disabled={isSubmitting}
                  >
                    {text.cancel}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {text.updating}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {text.update}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

