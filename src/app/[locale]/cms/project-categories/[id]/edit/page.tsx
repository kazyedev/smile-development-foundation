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
import { ProjectCategoryFields } from "@/components/cms/project-categories/ProjectCategoryFields";
import Link from "next/link";
import type { ProjectCategory } from "@/lib/db/schema/projectCategories";

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

export default function EditProjectCategoryPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<ProjectCategory | null>(null);

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

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editCategory: "Edit Project Category",
      updateCategory: "Update project category information",
      backToCategories: "Back to Categories",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading category...",
      updateSuccess: "Category updated successfully",
      updateFailed: "Failed to update category",
      loadFailed: "Failed to load category",
      notFound: "Category not found",
    },
    ar: {
      editCategory: "تعديل فئة المشروع",
      updateCategory: "تحديث معلومات فئة المشروع",
      backToCategories: "العودة إلى الفئات",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل الفئة...",
      updateSuccess: "تم تحديث الفئة بنجاح",
      updateFailed: "فشل في تحديث الفئة",
      loadFailed: "فشل في تحميل الفئة",
      notFound: "الفئة غير موجودة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load category data
  useEffect(() => {
    const loadCategory = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/project-categories/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const categoryData = result.data;
          setCategory(categoryData);

          // Transform database fields to form fields
          const formData: ProjectCategoryFormData = {
            titleEn: categoryData.title_en || "",
            titleAr: categoryData.title_ar || "",
            featuredImageUrl: categoryData.featured_image_url || "",
            slugEn: categoryData.slug_en || "",
            slugAr: categoryData.slug_ar || "",
            descriptionEn: categoryData.description_en || "",
            descriptionAr: categoryData.description_ar || "",
            keywordsEn: Array.isArray(categoryData.keywords_en) ? categoryData.keywords_en : [],
            keywordsAr: Array.isArray(categoryData.keywords_ar) ? categoryData.keywords_ar : [],
            tagsEn: Array.isArray(categoryData.tags_en) ? categoryData.tags_en : [],
            tagsAr: Array.isArray(categoryData.tags_ar) ? categoryData.tags_ar : [],
            isPublished: categoryData.is_published || false,
            pageViews: categoryData.page_views || 0,
          };

          reset(formData);
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/project-categories`);
        }
      } catch (error) {
        console.error("Failed to load category:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/project-categories`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: ProjectCategoryFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/cms/project-categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/project-categories`);
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

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/project-categories`}>
            <Button variant="outline" className="mt-4">
              {text.backToCategories}
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
          <h1 className="text-3xl font-bold text-foreground">{text.editCategory}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateCategory}
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

