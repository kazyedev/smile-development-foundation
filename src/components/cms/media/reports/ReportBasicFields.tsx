"use client";

import { useParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

interface ReportBasicFieldsProps {
  form: UseFormReturn<any>;
}

export function ReportBasicFields({ form }: ReportBasicFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [categories, setCategories] = useState<Category[]>([]);

  // Translations
  const t = {
    en: {
      basicInfo: {
        title: "Basic Information",
        description: "Essential details about the report"
      },
      fields: {
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        descriptionEn: "Description (English)",
        descriptionAr: "Description (Arabic)",
        url: "Report URL",
        categoryId: "Category (Optional)",
        featuredImageUrl: "Featured Image URL (Optional)",
        slugEn: "URL Slug (English)",
        slugAr: "URL Slug (Arabic)",
        downloads: "Downloads Count",
        isArabic: "Available in Arabic",
        isEnglish: "Available in English",
        isPublished: "Published"
      },
      placeholders: {
        titleEn: "Enter report title in English",
        titleAr: "Enter report title in Arabic",
        descriptionEn: "Enter report description in English",
        descriptionAr: "Enter report description in Arabic",
        url: "https://example.com/report.pdf",
        category: "Select a category (optional)",
        featuredImageUrl: "https://example.com/report-cover.jpg",
        slugEn: "report-slug",
        slugAr: "report-slug-ar",
        downloads: "0"
      },
      options: {
        noCategory: "No Category"
      }
    },
    ar: {
      basicInfo: {
        title: "المعلومات الأساسية",
        description: "التفاصيل الأساسية حول التقرير"
      },
      fields: {
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        descriptionEn: "الوصف (إنجليزي)",
        descriptionAr: "الوصف (عربي)",
        url: "رابط التقرير",
        categoryId: "الفئة (اختيارية)",
        featuredImageUrl: "رابط الصورة الرئيسية (اختياري)",
        slugEn: "الرابط المختصر (إنجليزي)",
        slugAr: "الرابط المختصر (عربي)",
        downloads: "عدد التحميلات",
        isArabic: "متاح بالعربية",
        isEnglish: "متاح بالإنجليزية",
        isPublished: "منشور"
      },
      placeholders: {
        titleEn: "أدخل عنوان التقرير بالإنجليزية",
        titleAr: "أدخل عنوان التقرير بالعربية",
        descriptionEn: "أدخل وصف التقرير بالإنجليزية",
        descriptionAr: "أدخل وصف التقرير بالعربية",
        url: "https://example.com/report.pdf",
        category: "اختر فئة (اختياري)",
        featuredImageUrl: "https://example.com/report-cover.jpg",
        slugEn: "report-slug",
        slugAr: "report-slug-ar",
        downloads: "0"
      },
      options: {
        noCategory: "بدون فئة"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/cms/report-categories?published=true");
        if (response.ok) {
          const result = await response.json();
          setCategories(result.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { register, formState: { errors }, watch, setValue } = form;
  const titleEn = watch("titleEn");
  const titleAr = watch("titleAr");
  const isPublished = watch("isPublished");
  const isArabicLang = watch("isArabic");
  const isEnglishLang = watch("isEnglish");
  const categoryId = watch("categoryId");

  // Generate slugs from titles
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  useEffect(() => {
    if (titleEn) {
      setValue("slugEn", generateSlug(titleEn));
    }
  }, [titleEn, setValue]);

  useEffect(() => {
    if (titleAr) {
      setValue("slugAr", generateSlug(titleAr));
    }
  }, [titleAr, setValue]);

  return (
    <Card className={isArabic ? "text-right" : ""}>
      <CardHeader>
        <CardTitle>{text.basicInfo.title}</CardTitle>
        <CardDescription>{text.basicInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="titleEn">{text.fields.titleEn}</Label>
            <Input
              id="titleEn"
              {...register("titleEn", { required: "English title is required" })}
              placeholder={text.placeholders.titleEn}
              className={errors.titleEn ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.titleEn && (
              <p className="text-red-500 text-sm mt-1">{errors.titleEn.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="titleAr">{text.fields.titleAr}</Label>
            <Input
              id="titleAr"
              {...register("titleAr", { required: "Arabic title is required" })}
              placeholder={text.placeholders.titleAr}
              className={errors.titleAr ? "border-red-500" : ""}
              dir="rtl"
            />
            {errors.titleAr && (
              <p className="text-red-500 text-sm mt-1">{errors.titleAr.message}</p>
            )}
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="descriptionEn">{text.fields.descriptionEn}</Label>
            <Textarea
              id="descriptionEn"
              {...register("descriptionEn")}
              placeholder={text.placeholders.descriptionEn}
              rows={4}
              dir="ltr"
            />
          </div>

          <div>
            <Label htmlFor="descriptionAr">{text.fields.descriptionAr}</Label>
            <Textarea
              id="descriptionAr"
              {...register("descriptionAr")}
              placeholder={text.placeholders.descriptionAr}
              rows={4}
              dir="rtl"
            />
          </div>
        </div>

        {/* Report URL and Featured Image URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="url">{text.fields.url}</Label>
            <Input
              id="url"
              {...register("url", { 
                required: "Report URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL"
                }
              })}
              placeholder={text.placeholders.url}
              className={errors.url ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="featuredImageUrl">{text.fields.featuredImageUrl}</Label>
            <Input
              id="featuredImageUrl"
              {...register("featuredImageUrl", {
                validate: (value) => {
                  if (!value) return true; // Optional field
                  return /^https?:\/\/.+/.test(value) || "Please enter a valid URL";
                }
              })}
              placeholder={text.placeholders.featuredImageUrl}
              className={errors.featuredImageUrl ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.featuredImageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.featuredImageUrl.message}</p>
            )}
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <Label htmlFor="categoryId">{text.fields.categoryId}</Label>
          <Select
            value={categoryId ? String(categoryId) : "null"}
            onValueChange={(value) => setValue("categoryId", value === "null" ? null : Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder={text.placeholders.category} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">{text.options.noCategory}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {isArabic ? category.nameAr : category.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Slugs (auto-generated) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="slugEn">{text.fields.slugEn}</Label>
            <Input
              id="slugEn"
              {...register("slugEn", { required: "English slug is required" })}
              placeholder={text.placeholders.slugEn}
              className={errors.slugEn ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.slugEn && (
              <p className="text-red-500 text-sm mt-1">{errors.slugEn.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="slugAr">{text.fields.slugAr}</Label>
            <Input
              id="slugAr"
              {...register("slugAr", { required: "Arabic slug is required" })}
              placeholder={text.placeholders.slugAr}
              className={errors.slugAr ? "border-red-500" : ""}
              dir="rtl"
            />
            {errors.slugAr && (
              <p className="text-red-500 text-sm mt-1">{errors.slugAr.message}</p>
            )}
          </div>
        </div>

        {/* Downloads Count */}
        <div>
          <Label htmlFor="downloads">{text.fields.downloads}</Label>
          <Input
            id="downloads"
            type="number"
            {...register("downloads", { 
              min: { value: 0, message: "Downloads must be 0 or greater" }
            })}
            placeholder={text.placeholders.downloads}
            className={errors.downloads ? "border-red-500" : ""}
          />
          {errors.downloads && (
            <p className="text-red-500 text-sm mt-1">{errors.downloads.message}</p>
          )}
        </div>

        {/* Status Checkboxes */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isArabic"
              checked={isArabicLang}
              onCheckedChange={(checked) => setValue("isArabic", checked)}
            />
            <Label htmlFor="isArabic">{text.fields.isArabic}</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isEnglish"
              checked={isEnglishLang}
              onCheckedChange={(checked) => setValue("isEnglish", checked)}
            />
            <Label htmlFor="isEnglish">{text.fields.isEnglish}</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPublished"
              checked={isPublished}
              onCheckedChange={(checked) => {
                setValue("isPublished", checked);
                if (checked) {
                  setValue("publishedAt", new Date().toISOString());
                } else {
                  setValue("publishedAt", null);
                }
              }}
            />
            <Label htmlFor="isPublished">{text.fields.isPublished}</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
