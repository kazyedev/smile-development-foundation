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

type Project = {
  id: number;
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

type Activity = {
  id: number;
  titleEn: string;
  titleAr: string;
  isPublished: boolean;
};

type Category = {
  id: number;
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

interface PublicationBasicFieldsProps {
  form: UseFormReturn<any>;
}

export function PublicationBasicFields({ form }: PublicationBasicFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [programs, setPrograms] = useState<Program[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Translations
  const t = {
    en: {
      basicInfo: {
        title: "Basic Information",
        description: "Essential details about the publication"
      },
      fields: {
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        descriptionEn: "Description (English)",
        descriptionAr: "Description (Arabic)",
        url: "Publication URL",
        authorEn: "Author (English)",
        authorAr: "Author (Arabic)",
        contentEn: "Content (English)",
        contentAr: "Content (Arabic)",
        programId: "Program (Optional)",
        projectId: "Project (Optional)",
        activityId: "Activity (Optional)",
        categoryId: "Category (Optional)",
        featuredImageUrl: "Featured Image URL (Optional)",
        coverImageUrl: "Cover Image URL (Optional)",
        attachmentUrl: "Attachment URL (Optional)",
        slugEn: "URL Slug (English)",
        slugAr: "URL Slug (Arabic)",
        pageViews: "Page Views",
        downloads: "Downloads Count",
        isArabic: "Available in Arabic",
        isEnglish: "Available in English",
        isPublished: "Published"
      }
    },
    ar: {
      basicInfo: {
        title: "المعلومات الأساسية",
        description: "التفاصيل الأساسية حول المنشور"
      },
      fields: {
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        descriptionEn: "الوصف (إنجليزي)",
        descriptionAr: "الوصف (عربي)",
        url: "رابط المنشور",
        authorEn: "المؤلف (إنجليزي)",
        authorAr: "المؤلف (عربي)",
        contentEn: "المحتوى (إنجليزي)",
        contentAr: "المحتوى (عربي)",
        programId: "البرنامج (اختياري)",
        projectId: "المشروع (اختياري)",
        activityId: "النشاط (اختياري)",
        categoryId: "الفئة (اختيارية)",
        featuredImageUrl: "رابط الصورة الرئيسية (اختياري)",
        coverImageUrl: "رابط صورة الغلاف (اختياري)",
        attachmentUrl: "رابط المرفق (اختياري)",
        slugEn: "الرابط المختصر (إنجليزي)",
        slugAr: "الرابط المختصر (عربي)",
        pageViews: "مرات المشاهدة",
        downloads: "عدد التحميلات",
        isArabic: "متاح بالعربية",
        isEnglish: "متاح بالإنجليزية",
        isPublished: "منشور"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch related entities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, projectsRes, activitiesRes, categoriesRes] = await Promise.all([
          fetch("/api/cms/programs?published=true").catch(() => ({ ok: false })),
          fetch("/api/cms/projects?published=true").catch(() => ({ ok: false })),
          fetch("/api/cms/activities?published=true").catch(() => ({ ok: false })),
          fetch("/api/cms/publication-categories?published=true").catch(() => ({ ok: false })),
        ]);

        if (programsRes.ok) {
          const result = await programsRes.json();
          setPrograms(result.items || []);
        }

        if (projectsRes.ok) {
          const result = await projectsRes.json();
          setProjects(result.items || []);
        }

        if (activitiesRes.ok) {
          const result = await activitiesRes.json();
          setActivities(result.items || []);
        }

        if (categoriesRes.ok) {
          const result = await categoriesRes.json();
          setCategories(result.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch related data:", error);
      }
    };

    fetchData();
  }, []);

  const { register, formState: { errors }, watch, setValue } = form;
  const titleEn = watch("titleEn");
  const titleAr = watch("titleAr");
  const isPublished = watch("isPublished");
  const isArabicLang = watch("isArabic");
  const isEnglishLang = watch("isEnglish");

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
    <div className="space-y-6">
      {/* Basic Information Card */}
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
                rows={3}
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="descriptionAr">{text.fields.descriptionAr}</Label>
              <Textarea
                id="descriptionAr"
                {...register("descriptionAr")}
                rows={3}
                dir="rtl"
              />
            </div>
          </div>

          {/* Authors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorEn">{text.fields.authorEn}</Label>
              <Input
                id="authorEn"
                {...register("authorEn")}
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="authorAr">{text.fields.authorAr}</Label>
              <Input
                id="authorAr"
                {...register("authorAr")}
                dir="rtl"
              />
            </div>
          </div>

          {/* URLs */}
          <div>
            <Label htmlFor="url">{text.fields.url}</Label>
            <Input
              id="url"
              {...register("url", { 
                required: "Publication URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL"
                }
              })}
              className={errors.url ? "border-red-500" : ""}
              dir="ltr"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="featuredImageUrl">{text.fields.featuredImageUrl}</Label>
              <Input
                id="featuredImageUrl"
                {...register("featuredImageUrl")}
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="coverImageUrl">{text.fields.coverImageUrl}</Label>
              <Input
                id="coverImageUrl"
                {...register("coverImageUrl")}
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="attachmentUrl">{text.fields.attachmentUrl}</Label>
            <Input
              id="attachmentUrl"
              {...register("attachmentUrl")}
              dir="ltr"
            />
          </div>

          {/* Relations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="programId">{text.fields.programId}</Label>
              <Select
                value={watch("programId") ? String(watch("programId")) : "null"}
                onValueChange={(value) => setValue("programId", value === "null" ? null : Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No Program</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={String(program.id)}>
                      {isArabic ? program.nameAr : program.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="projectId">{text.fields.projectId}</Label>
              <Select
                value={watch("projectId") ? String(watch("projectId")) : "null"}
                onValueChange={(value) => setValue("projectId", value === "null" ? null : Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No Project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={String(project.id)}>
                      {isArabic ? project.nameAr : project.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="activityId">{text.fields.activityId}</Label>
              <Select
                value={watch("activityId") ? String(watch("activityId")) : "null"}
                onValueChange={(value) => setValue("activityId", value === "null" ? null : Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No Activity</SelectItem>
                  {activities.map((activity) => (
                    <SelectItem key={activity.id} value={String(activity.id)}>
                      {isArabic ? activity.titleAr : activity.titleEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categoryId">{text.fields.categoryId}</Label>
              <Select
                value={watch("categoryId") ? String(watch("categoryId")) : "null"}
                onValueChange={(value) => setValue("categoryId", value === "null" ? null : Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No Category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {isArabic ? category.nameAr : category.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contentEn">{text.fields.contentEn}</Label>
              <Textarea
                id="contentEn"
                {...register("contentEn")}
                rows={4}
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="contentAr">{text.fields.contentAr}</Label>
              <Textarea
                id="contentAr"
                {...register("contentAr")}
                rows={4}
                dir="rtl"
              />
            </div>
          </div>

          {/* Slugs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="slugEn">{text.fields.slugEn}</Label>
              <Input
                id="slugEn"
                {...register("slugEn", { required: "English slug is required" })}
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
                className={errors.slugAr ? "border-red-500" : ""}
                dir="rtl"
              />
              {errors.slugAr && (
                <p className="text-red-500 text-sm mt-1">{errors.slugAr.message}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pageViews">{text.fields.pageViews}</Label>
              <Input
                id="pageViews"
                type="number"
                {...register("pageViews")}
              />
            </div>

            <div>
              <Label htmlFor="downloads">{text.fields.downloads}</Label>
              <Input
                id="downloads"
                type="number"
                {...register("downloads")}
              />
            </div>
          </div>

          {/* Status */}
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
    </div>
  );
}
