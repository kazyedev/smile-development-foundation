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

type MediaCategory = {
  id: number;
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

interface ImageBasicFieldsProps {
  form: UseFormReturn<any>;
}

export function ImageBasicFields({ form }: ImageBasicFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [mediaCategories, setMediaCategories] = useState<MediaCategory[]>([]);

  // Translations
  const t = {
    en: {
      basicInfo: {
        title: "Basic Information",
        description: "Essential details about the image"
      },
      fields: {
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        descriptionEn: "Description (English)",
        descriptionAr: "Description (Arabic)",
        url: "Image URL",
        alt: "Alt Text",
        width: "Width (px)",
        height: "Height (px)",
        size: "File Size (bytes)",
        mimeType: "MIME Type",
        photographer: "Photographer",
        takenAt: "Date Taken",
        category: "Category",
        slugEn: "URL Slug (English)",
        slugAr: "URL Slug (Arabic)",
        locationEn: "Location (English)",
        locationAr: "Location (Arabic)",
        isPublic: "Public Image",
        isPublished: "Published"
      },
      placeholders: {
        titleEn: "Enter image title in English",
        titleAr: "Enter image title in Arabic",
        descriptionEn: "Enter image description in English",
        descriptionAr: "Enter image description in Arabic",
        url: "https://example.com/image.jpg",
        alt: "Descriptive text for accessibility",
        width: "1920",
        height: "1080",
        size: "File size in bytes",
        mimeType: "Select MIME type",
        photographer: "Name of photographer",
        takenAt: "When was this photo taken",
        category: "Select category",
        slugEn: "image-slug",
        slugAr: "image-slug-ar",
        locationEn: "Image location in English",
        locationAr: "Image location in Arabic"
      },
      options: {
        noCategory: "No Category"
      }
    },
    ar: {
      basicInfo: {
        title: "المعلومات الأساسية",
        description: "التفاصيل الأساسية حول الصورة"
      },
      fields: {
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        descriptionEn: "الوصف (إنجليزي)",
        descriptionAr: "الوصف (عربي)",
        url: "رابط الصورة",
        alt: "النص البديل",
        width: "العرض (بكسل)",
        height: "الارتفاع (بكسل)",
        size: "حجم الملف (بايت)",
        mimeType: "نوع MIME",
        photographer: "المصور",
        takenAt: "تاريخ التصوير",
        category: "الفئة",
        slugEn: "الرابط المختصر (إنجليزي)",
        slugAr: "الرابط المختصر (عربي)",
        locationEn: "الموقع (إنجليزي)",
        locationAr: "الموقع (عربي)",
        isPublic: "صورة عامة",
        isPublished: "منشور"
      },
      placeholders: {
        titleEn: "أدخل عنوان الصورة بالإنجليزية",
        titleAr: "أدخل عنوان الصورة بالعربية",
        descriptionEn: "أدخل وصف الصورة بالإنجليزية",
        descriptionAr: "أدخل وصف الصورة بالعربية",
        url: "https://example.com/image.jpg",
        alt: "نص وصفي للوصول",
        width: "1920",
        height: "1080",
        size: "حجم الملف بالبايت",
        mimeType: "اختر نوع MIME",
        photographer: "اسم المصور",
        takenAt: "متى تم التقاط هذه الصورة",
        category: "اختر الفئة",
        slugEn: "image-slug",
        slugAr: "image-slug-ar",
        locationEn: "موقع الصورة بالإنجليزية",
        locationAr: "موقع الصورة بالعربية"
      },
      options: {
        noCategory: "بدون فئة"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch media categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/cms/media-categories?published=true");
        if (response.ok) {
          const result = await response.json();
          setMediaCategories(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch media categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { register, formState: { errors }, watch, setValue } = form;
  const titleEn = watch("titleEn");
  const titleAr = watch("titleAr");
  const isPublished = watch("isPublished");
  const isPublic = watch("isPublic");
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

        {/* Image URL and Alt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="url">{text.fields.url}</Label>
            <Input
              id="url"
              {...register("url", { 
                required: "Image URL is required",
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
            <Label htmlFor="alt">{text.fields.alt}</Label>
            <Input
              id="alt"
              {...register("alt")}
              placeholder={text.placeholders.alt}
              dir="ltr"
            />
          </div>
        </div>

        {/* Technical Properties */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="width">{text.fields.width}</Label>
            <Input
              id="width"
              type="number"
              {...register("width", { 
                required: "Width is required",
                min: { value: 1, message: "Width must be greater than 0" }
              })}
              placeholder={text.placeholders.width}
              className={errors.width ? "border-red-500" : ""}
            />
            {errors.width && (
              <p className="text-red-500 text-sm mt-1">{errors.width.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="height">{text.fields.height}</Label>
            <Input
              id="height"
              type="number"
              {...register("height", { 
                required: "Height is required",
                min: { value: 1, message: "Height must be greater than 0" }
              })}
              placeholder={text.placeholders.height}
              className={errors.height ? "border-red-500" : ""}
            />
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="size">{text.fields.size}</Label>
            <Input
              id="size"
              type="number"
              {...register("size", { 
                required: "File size is required",
                min: { value: 1, message: "Size must be greater than 0" }
              })}
              placeholder={text.placeholders.size}
              className={errors.size ? "border-red-500" : ""}
            />
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>
            )}
          </div>
        </div>

        {/* MIME Type */}
        <div>
          <Label htmlFor="mimeType">{text.fields.mimeType}</Label>
          <Select
            value={watch("mimeType") || "image/jpeg"}
            onValueChange={(value) => setValue("mimeType", value)}
          >
            <SelectTrigger className={errors.mimeType ? "border-red-500" : ""}>
              <SelectValue placeholder={text.placeholders.mimeType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image/jpeg">image/jpeg</SelectItem>
              <SelectItem value="image/png">image/png</SelectItem>
              <SelectItem value="image/webp">image/webp</SelectItem>
              <SelectItem value="image/gif">image/gif</SelectItem>
              <SelectItem value="image/svg+xml">image/svg+xml</SelectItem>
            </SelectContent>
          </Select>
          {errors.mimeType && (
            <p className="text-red-500 text-sm mt-1">{errors.mimeType.message}</p>
          )}
        </div>

        {/* Photographer and Date Taken */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="photographer">{text.fields.photographer}</Label>
            <Input
              id="photographer"
              {...register("photographer")}
              placeholder={text.placeholders.photographer}
              dir="ltr"
            />
          </div>

          <div>
            <Label htmlFor="takenAt">{text.fields.takenAt}</Label>
            <Input
              id="takenAt"
              type="datetime-local"
              {...register("takenAt")}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <Label htmlFor="categoryId">{text.fields.category}</Label>
          <Select
            value={categoryId ? String(categoryId) : "null"}
            onValueChange={(value) => setValue("categoryId", value === "null" ? null : Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder={text.placeholders.category} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">{text.options.noCategory}</SelectItem>
              {mediaCategories.map((category) => (
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

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="locationEn">{text.fields.locationEn}</Label>
            <Input
              id="locationEn"
              {...register("locationEn")}
              placeholder={text.placeholders.locationEn}
              dir="ltr"
            />
          </div>

          <div>
            <Label htmlFor="locationAr">{text.fields.locationAr}</Label>
            <Input
              id="locationAr"
              {...register("locationAr")}
              placeholder={text.placeholders.locationAr}
              dir="rtl"
            />
          </div>
        </div>

        {/* Status Checkboxes */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPublic"
              checked={isPublic}
              onCheckedChange={(checked) => setValue("isPublic", checked)}
            />
            <Label htmlFor="isPublic">{text.fields.isPublic}</Label>
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
