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
import { NewsCategoryFields } from "@/components/cms/news-categories/NewsCategoryFields";
import Link from "next/link";

// Form schema
const newsCategoryFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required").max(200),
  nameAr: z.string().min(1, "Arabic name is required").max(200),
  slugEn: z.string().min(1, "English slug is required").max(200),
  slugAr: z.string().min(1, "Arabic slug is required").max(200),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  color: z.string().max(20).optional().or(z.literal("")),
  icon: z.string().max(100).optional(),
  isPublished: z.boolean().default(false),
  pageViews: z.number().default(0),
});

type NewsCategoryFormData = z.infer<typeof newsCategoryFormSchema>;

export default function NewNewsCategoryPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsCategoryFormData>({
    resolver: zodResolver(newsCategoryFormSchema),
    defaultValues: {
      nameEn: "",
      nameAr: "",
      slugEn: "",
      slugAr: "",
      descriptionEn: "",
      descriptionAr: "",
      color: "",
      icon: "",
      isPublished: false,
      pageViews: 0,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newCategory: "New News Category",
      createCategory: "Create a new news category",
      backToCategories: "Back to Categories",
      save: "Save Category",
      saving: "Saving...",
      createSuccess: "Category created successfully",
      createFailed: "Failed to create category",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newCategory: "فئة أخبار جديدة",
      createCategory: "إنشاء فئة أخبار جديدة",
      backToCategories: "العودة إلى الفئات",
      save: "حفظ الفئة",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء الفئة بنجاح",
      createFailed: "فشل في إنشاء الفئة",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: NewsCategoryFormData) => {
    try {
      setIsSubmitting(true);
      
      // Clean up empty strings for optional fields
      const submitData = {
        ...data,
        color: data.color || undefined,
        icon: data.icon || undefined,
      };
      
      const response = await fetch("/api/cms/news-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/news/categories`);
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
          <h1 className="text-3xl font-bold text-foreground">{text.newCategory}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createCategory}
          </p>
        </div>
        <Link href={`/${locale}/cms/news/categories`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToCategories}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <NewsCategoryFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/news/categories`}>
              <Button type="button" variant="outline">
                {text.backToCategories}
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

