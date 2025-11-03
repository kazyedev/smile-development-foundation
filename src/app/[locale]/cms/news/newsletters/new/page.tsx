"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { NewsletterFields } from "@/components/cms/newsletters/NewsletterFields";
import Link from "next/link";

// Form schema
const newsletterFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required").max(500),
  titleAr: z.string().min(1, "Arabic title is required").max(500),
  contentEn: z.string().min(1, "English content is required"),
  contentAr: z.string().min(1, "Arabic content is required"),
});

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export default function NewNewsletterPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      contentEn: "",
      contentAr: "",
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newNewsletter: "New Newsletter",
      createNewsletter: "Create a new newsletter",
      backToNewsletters: "Back to Newsletters",
      save: "Save Newsletter",
      saving: "Saving...",
      createSuccess: "Newsletter created successfully",
      createFailed: "Failed to create newsletter",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newNewsletter: "نشرة إخبارية جديدة",
      createNewsletter: "إنشاء نشرة إخبارية جديدة",
      backToNewsletters: "العودة إلى النشرات الإخبارية",
      save: "حفظ النشرة الإخبارية",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء النشرة الإخبارية بنجاح",
      createFailed: "فشل في إنشاء النشرة الإخبارية",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/cms/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/news/newsletters`);
      } else {
        toast.error(result.error || text.createFailed);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(text.createFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{text.newNewsletter}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createNewsletter}
          </p>
        </div>
        <Link href={`/${locale}/cms/news/newsletters`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToNewsletters}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <NewsletterFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/news/newsletters`}>
              <Button type="button" variant="outline">
                {text.backToNewsletters}
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {text.saving}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {text.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

