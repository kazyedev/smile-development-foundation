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

type Program = {
  id: number;
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

interface SuccessStoryBasicFieldsProps {
  form: UseFormReturn<any>;
}

export function SuccessStoryBasicFields({ form }: SuccessStoryBasicFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [programs, setPrograms] = useState<Program[]>([]);

  // Translations
  const t = {
    en: {
      basicInfo: {
        title: "Basic Information",
        description: "Essential details about the success story"
      },
      fields: {
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        contentEn: "Story Content (English)",
        contentAr: "Story Content (Arabic)",
        featuredImageUrl: "Featured Image URL",
        video: "Video URL",
        program: "Program",
        personNameEn: "Person Name (English)",
        personNameAr: "Person Name (Arabic)",
        personAge: "Person Age",
        personLocationEn: "Location (English)",
        personLocationAr: "Location (Arabic)",
        cityEn: "City (English)",
        cityAr: "City (Arabic)",
        slugEn: "URL Slug (English)",
        slugAr: "URL Slug (Arabic)",
        readTime: "Read Time (minutes)",
        isEnglish: "English Version Available",
        isArabic: "Arabic Version Available",
        isPublished: "Published"
      },
      placeholders: {
        titleEn: "Enter story title in English",
        titleAr: "Enter story title in Arabic",
        contentEn: "Enter the success story content in English",
        contentAr: "Enter the success story content in Arabic",
        featuredImageUrl: "https://example.com/image.jpg",
        video: "https://example.com/video.mp4",
        program: "Select program",
        personNameEn: "Person's name in English",
        personNameAr: "Person's name in Arabic",
        personAge: "Enter person's age",
        personLocationEn: "Person's location in English",
        personLocationAr: "Person's location in Arabic",
        cityEn: "City name in English",
        cityAr: "City name in Arabic",
        slugEn: "story-slug",
        slugAr: "story-slug-ar",
        readTime: "Estimated read time in minutes"
      },
      options: {
        noProgram: "No Program"
      }
    },
    ar: {
      basicInfo: {
        title: "المعلومات الأساسية",
        description: "التفاصيل الأساسية حول قصة النجاح"
      },
      fields: {
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        contentEn: "محتوى القصة (إنجليزي)",
        contentAr: "محتوى القصة (عربي)",
        featuredImageUrl: "رابط الصورة المميزة",
        video: "رابط الفيديو",
        program: "البرنامج",
        personNameEn: "اسم الشخص (إنجليزي)",
        personNameAr: "اسم الشخص (عربي)",
        personAge: "عمر الشخص",
        personLocationEn: "الموقع (إنجليزي)",
        personLocationAr: "الموقع (عربي)",
        cityEn: "المدينة (إنجليزي)",
        cityAr: "المدينة (عربي)",
        slugEn: "الرابط المختصر (إنجليزي)",
        slugAr: "الرابط المختصر (عربي)",
        readTime: "وقت القراءة (دقائق)",
        isEnglish: "النسخة الإنجليزية متوفرة",
        isArabic: "النسخة العربية متوفرة",
        isPublished: "منشور"
      },
      placeholders: {
        titleEn: "أدخل عنوان القصة بالإنجليزية",
        titleAr: "أدخل عنوان القصة بالعربية",
        contentEn: "أدخل محتوى قصة النجاح بالإنجليزية",
        contentAr: "أدخل محتوى قصة النجاح بالعربية",
        featuredImageUrl: "https://example.com/image.jpg",
        video: "https://example.com/video.mp4",
        program: "اختر البرنامج",
        personNameEn: "اسم الشخص بالإنجليزية",
        personNameAr: "اسم الشخص بالعربية",
        personAge: "أدخل عمر الشخص",
        personLocationEn: "موقع الشخص بالإنجليزية",
        personLocationAr: "موقع الشخص بالعربية",
        cityEn: "اسم المدينة بالإنجليزية",
        cityAr: "اسم المدينة بالعربية",
        slugEn: "story-slug",
        slugAr: "story-slug-ar",
        readTime: "وقت القراءة المقدر بالدقائق"
      },
      options: {
        noProgram: "بدون برنامج"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/cms/programs?published=true");
        if (response.ok) {
          const result = await response.json();
          setPrograms(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const { register, formState: { errors }, watch, setValue } = form;
  const titleEn = watch("titleEn");
  const titleAr = watch("titleAr");
  const isPublished = watch("isPublished");
  const isEnglish = watch("isEnglish");
  const isArabicVersion = watch("isArabic");
  const programId = watch("programId");

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
        {/* Language Availability */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isEnglish"
              checked={isEnglish}
              onCheckedChange={(checked) => setValue("isEnglish", checked)}
            />
            <Label htmlFor="isEnglish">{text.fields.isEnglish}</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isArabic"
              checked={isArabicVersion}
              onCheckedChange={(checked) => setValue("isArabic", checked)}
            />
            <Label htmlFor="isArabic">{text.fields.isArabic}</Label>
          </div>
        </div>

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

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contentEn">{text.fields.contentEn}</Label>
            <Textarea
              id="contentEn"
              {...register("contentEn", { required: "English content is required" })}
              placeholder={text.placeholders.contentEn}
              className={errors.contentEn ? "border-red-500" : ""}
              rows={6}
              dir="ltr"
            />
            {errors.contentEn && (
              <p className="text-red-500 text-sm mt-1">{errors.contentEn.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contentAr">{text.fields.contentAr}</Label>
            <Textarea
              id="contentAr"
              {...register("contentAr", { required: "Arabic content is required" })}
              placeholder={text.placeholders.contentAr}
              className={errors.contentAr ? "border-red-500" : ""}
              rows={6}
              dir="rtl"
            />
            {errors.contentAr && (
              <p className="text-red-500 text-sm mt-1">{errors.contentAr.message}</p>
            )}
          </div>
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="featuredImageUrl">{text.fields.featuredImageUrl}</Label>
            <Input
              id="featuredImageUrl"
              {...register("featuredImageUrl", { 
                required: "Featured image URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL"
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

          <div>
            <Label htmlFor="video">{text.fields.video}</Label>
            <Input
              id="video"
              {...register("video", { 
                required: "Video URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL"
                }
              })}
              placeholder={text.placeholders.video}
              className={errors.video ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.video && (
              <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
            )}
          </div>
        </div>

        {/* Person Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="personNameEn">{text.fields.personNameEn}</Label>
            <Input
              id="personNameEn"
              {...register("personNameEn", { required: "Person name in English is required" })}
              placeholder={text.placeholders.personNameEn}
              className={errors.personNameEn ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.personNameEn && (
              <p className="text-red-500 text-sm mt-1">{errors.personNameEn.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="personNameAr">{text.fields.personNameAr}</Label>
            <Input
              id="personNameAr"
              {...register("personNameAr", { required: "Person name in Arabic is required" })}
              placeholder={text.placeholders.personNameAr}
              className={errors.personNameAr ? "border-red-500" : ""}
              dir="rtl"
            />
            {errors.personNameAr && (
              <p className="text-red-500 text-sm mt-1">{errors.personNameAr.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="personAge">{text.fields.personAge}</Label>
            <Input
              id="personAge"
              type="number"
              {...register("personAge", { 
                required: "Person age is required",
                min: { value: 1, message: "Age must be greater than 0" }
              })}
              placeholder={text.placeholders.personAge}
              className={errors.personAge ? "border-red-500" : ""}
            />
            {errors.personAge && (
              <p className="text-red-500 text-sm mt-1">{errors.personAge.message}</p>
            )}
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="personLocationEn">{text.fields.personLocationEn}</Label>
              <Input
                id="personLocationEn"
                {...register("personLocationEn", { required: "Location in English is required" })}
                placeholder={text.placeholders.personLocationEn}
                className={errors.personLocationEn ? "border-red-500" : ""}
                dir="ltr"
              />
              {errors.personLocationEn && (
                <p className="text-red-500 text-sm mt-1">{errors.personLocationEn.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cityEn">{text.fields.cityEn}</Label>
              <Input
                id="cityEn"
                {...register("cityEn", { required: "City in English is required" })}
                placeholder={text.placeholders.cityEn}
                className={errors.cityEn ? "border-red-500" : ""}
                dir="ltr"
              />
              {errors.cityEn && (
                <p className="text-red-500 text-sm mt-1">{errors.cityEn.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="personLocationAr">{text.fields.personLocationAr}</Label>
              <Input
                id="personLocationAr"
                {...register("personLocationAr", { required: "Location in Arabic is required" })}
                placeholder={text.placeholders.personLocationAr}
                className={errors.personLocationAr ? "border-red-500" : ""}
                dir="rtl"
              />
              {errors.personLocationAr && (
                <p className="text-red-500 text-sm mt-1">{errors.personLocationAr.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cityAr">{text.fields.cityAr}</Label>
              <Input
                id="cityAr"
                {...register("cityAr", { required: "City in Arabic is required" })}
                placeholder={text.placeholders.cityAr}
                className={errors.cityAr ? "border-red-500" : ""}
                dir="rtl"
              />
              {errors.cityAr && (
                <p className="text-red-500 text-sm mt-1">{errors.cityAr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Program Selection */}
        <div>
          <Label htmlFor="programId">{text.fields.program}</Label>
          <Select
            value={programId ? String(programId) : "null"}
            onValueChange={(value) => setValue("programId", value === "null" ? null : Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder={text.placeholders.program} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">{text.options.noProgram}</SelectItem>
              {programs.map((program) => (
                <SelectItem key={program.id} value={String(program.id)}>
                  {isArabic ? program.nameAr : program.nameEn}
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

        {/* Read Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="readTime">{text.fields.readTime}</Label>
            <Input
              id="readTime"
              type="number"
              {...register("readTime", { 
                min: { value: 0, message: "Read time must be 0 or greater" }
              })}
              placeholder={text.placeholders.readTime}
              className={errors.readTime ? "border-red-500" : ""}
            />
            {errors.readTime && (
              <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>
            )}
          </div>
        </div>

        {/* Published Status */}
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
      </CardContent>
    </Card>
  );
}
