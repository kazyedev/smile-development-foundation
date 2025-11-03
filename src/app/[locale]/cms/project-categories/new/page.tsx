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
import { ProjectCategoryFields } from "@/components/cms/project-categories/ProjectCategoryFields";
import Link from "next/link";

// Form schema
const projectCategoryFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required").max(500),
  titleAr: z.string().min(1, "Arabic title is required").max(500),
  featuredImageUrl: z.string().url("Featured image URL must be a valid URL").min(1, "Featured image URL is required"),
  slugEn: z.string().min(1, "English slug is required").max(200),
  slugAr: z.string().min(1, "Arabic slug is required").max(200),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
  pageViews: z.number().default(0),
});

type ProjectCategoryFormData = z.infer<typeof projectCategoryFormSchema>;

export default function NewProjectCategoryPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectCategoryFormData>({
    resolver: zodResolver(projectCategoryFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      featuredImageUrl: "",
      slugEn: "",
      slugAr: "",
      descriptionEn: "",
      descriptionAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      isPublished: false,
      pageViews: 0,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newCategory: "New Project Category",
      createCategory: "Create a new project category",
      backToCategories: "Back to Categories",
      save: "Save Category",
      saving: "Saving...",
      createSuccess: "Category created successfully",
      createFailed: "Failed to create category",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newCategory: "فئة مشروع جديدة",
      createCategory: "إنشاء فئة مشروع جديدة",
      backToCategories: "العودة إلى الفئات",
      save: "حفظ الفئة",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء الفئة بنجاح",
      createFailed: "فشل في إنشاء الفئة",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: ProjectCategoryFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/cms/project-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/project-categories`);
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
        <Link href={`/${locale}/cms/project-categories`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToCategories}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ProjectCategoryFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/project-categories`}>
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

