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
import { MediaCategoryFields } from "@/components/cms/media-categories/MediaCategoryFields";
import Link from "next/link";
import type { MediaCategory } from "@/lib/db/schema/mediaCategories";

// Form schema
const mediaCategoryFormSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  imageUrl: z.string().url("Image URL must be a valid URL").optional().or(z.literal("")),
  imageAltEn: z.string().optional(),
  imageAltAr: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex color").optional().or(z.literal("")),
  icon: z.string().optional(),
  isEnglish: z.boolean().default(true),
  isArabic: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  pageViews: z.number().default(0),
});

type MediaCategoryFormData = z.infer<typeof mediaCategoryFormSchema>;

export default function EditMediaCategoryPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<MediaCategory | null>(null);

  const form = useForm<MediaCategoryFormData>({
    resolver: zodResolver(mediaCategoryFormSchema),
    defaultValues: {
      nameEn: "",
      nameAr: "",
      slugEn: "",
      slugAr: "",
      descriptionEn: "",
      descriptionAr: "",
      imageUrl: "",
      imageAltEn: "",
      imageAltAr: "",
      color: "#000000",
      icon: "",
      isEnglish: true,
      isArabic: true,
      isPublished: false,
      pageViews: 0,
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editCategory: "Edit Media Category",
      updateCategory: "Update media category information",
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
      editCategory: "تعديل فئة الوسائط",
      updateCategory: "تحديث معلومات فئة الوسائط",
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
        
        const response = await fetch(`/api/cms/media-categories/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const categoryData = result.data;
          setCategory(categoryData);

          // Transform database fields to form fields
          const formData: MediaCategoryFormData = {
            nameEn: categoryData.name_en || "",
            nameAr: categoryData.name_ar || "",
            slugEn: categoryData.slug_en || "",
            slugAr: categoryData.slug_ar || "",
            descriptionEn: categoryData.description_en || "",
            descriptionAr: categoryData.description_ar || "",
            imageUrl: categoryData.image_url || "",
            imageAltEn: categoryData.image_alt_en || "",
            imageAltAr: categoryData.image_alt_ar || "",
            color: categoryData.color || "#000000",
            icon: categoryData.icon || "",
            isEnglish: categoryData.is_english !== false,
            isArabic: categoryData.is_arabic !== false,
            isPublished: categoryData.is_published || false,
            pageViews: categoryData.page_views || 0,
          };

          reset(formData);
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/media/categories`);
        }
      } catch (error) {
        console.error("Failed to load category:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/media/categories`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: MediaCategoryFormData) => {
    try {
      setIsSubmitting(true);
      
      // Clean up empty strings for optional fields
      const submitData = {
        ...data,
        imageUrl: data.imageUrl || undefined,
        color: data.color || undefined,
      };
      
      const response = await fetch(`/api/cms/media-categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/media/categories`);
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
          <Link href={`/${locale}/cms/media/categories`}>
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
        <Link href={`/${locale}/cms/media/categories`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToCategories}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <MediaCategoryFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/media/categories`}>
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

