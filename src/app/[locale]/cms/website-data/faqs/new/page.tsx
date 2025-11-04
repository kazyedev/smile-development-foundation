"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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

export default function NewFAQPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Create New FAQ",
      description: "Add a new frequently asked question and answer",
      questionInfo: "Question",
      questionEn: "Question (English)",
      questionAr: "Question (Arabic)",
      answerInfo: "Answer",
      answerEn: "Answer (English)",
      answerAr: "Answer (Arabic)",
      publishing: "Publishing",
      isPublished: "Published",
      publishedDesc: "Make this FAQ visible on the website",
      creating: "Creating...",
      create: "Create FAQ",
      cancel: "Cancel",
      back: "Back",
      createSuccess: "FAQ created successfully",
      createError: "Failed to create FAQ",
    },
    ar: {
      title: "إنشاء سؤال جديد",
      description: "إضافة سؤال وإجابة جديدين",
      questionInfo: "السؤال",
      questionEn: "السؤال (إنجليزي)",
      questionAr: "السؤال (عربي)",
      answerInfo: "الإجابة",
      answerEn: "الإجابة (إنجليزي)",
      answerAr: "الإجابة (عربي)",
      publishing: "النشر",
      isPublished: "منشور",
      publishedDesc: "جعل هذا السؤال مرئياً على الموقع",
      creating: "جاري الإنشاء...",
      create: "إنشاء سؤال",
      cancel: "إلغاء",
      back: "عودة",
      createSuccess: "تم إنشاء السؤال بنجاح",
      createError: "فشل في إنشاء السؤال",
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

  const onSubmit = async (data: FAQFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/cms/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create FAQ");
      }

      toast.success(text.createSuccess);

      router.push(`/${locale}/cms/website-data/faqs`);
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error(error instanceof Error ? error.message : text.createError);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <CardContent>
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
                        {text.creating}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {text.create}
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

