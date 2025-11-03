"use client";

import { useState, useEffect } from "react";
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
import type { Newsletter } from "@/lib/db/schema/newsletters";

// Form schema
const newsletterFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required").max(500),
  titleAr: z.string().min(1, "Arabic title is required").max(500),
  contentEn: z.string().min(1, "English content is required"),
  contentAr: z.string().min(1, "Arabic content is required"),
});

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export default function EditNewsletterPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      contentEn: "",
      contentAr: "",
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editNewsletter: "Edit Newsletter",
      updateNewsletter: "Update newsletter information",
      backToNewsletters: "Back to Newsletters",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading newsletter...",
      updateSuccess: "Newsletter updated successfully",
      updateFailed: "Failed to update newsletter",
      loadFailed: "Failed to load newsletter",
      notFound: "Newsletter not found",
    },
    ar: {
      editNewsletter: "تعديل النشرة الإخبارية",
      updateNewsletter: "تحديث معلومات النشرة الإخبارية",
      backToNewsletters: "العودة إلى النشرات الإخبارية",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل النشرة الإخبارية...",
      updateSuccess: "تم تحديث النشرة الإخبارية بنجاح",
      updateFailed: "فشل في تحديث النشرة الإخبارية",
      loadFailed: "فشل في تحميل النشرة الإخبارية",
      notFound: "النشرة الإخبارية غير موجودة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load newsletter data
  useEffect(() => {
    const loadNewsletter = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/newsletters/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const newsletterData = result.data;
          setNewsletter(newsletterData);

          // Transform database fields to form fields
          const formData: NewsletterFormData = {
            titleEn: newsletterData.title_en || "",
            titleAr: newsletterData.title_ar || "",
            contentEn: newsletterData.content_en || "",
            contentAr: newsletterData.content_ar || "",
          };

          reset(formData);
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/news/newsletters`);
        }
      } catch (error) {
        console.error("Failed to load newsletter:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/news/newsletters`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadNewsletter();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/cms/newsletters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/news/newsletters`);
      } else {
        toast.error(result.error || text.updateFailed);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(text.updateFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{text.loading}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/news/newsletters`}>
            <Button variant="outline" className="mt-4">
              {text.backToNewsletters}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{text.editNewsletter}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateNewsletter}
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

