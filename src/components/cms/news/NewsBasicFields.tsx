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

type NewsCategory = {
  id: number;
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

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
  nameEn: string;
  nameAr: string;
  isPublished: boolean;
};

interface NewsBasicFieldsProps {
  form: UseFormReturn<any>;
}

export function NewsBasicFields({ form }: NewsBasicFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [newsCategories, setNewsCategories] = useState<NewsCategory[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Translations
  const t = {
    en: {
      basicInfo: {
        title: "Basic Information",
        description: "Essential details about the news article"
      },
      fields: {
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        contentEn: "Content (English)",
        contentAr: "Content (Arabic)",
        featuredImageUrl: "Featured Image URL",
        otherImagesUrl: "Other Images URLs (comma-separated)",
        slugEn: "URL Slug (English)",
        slugAr: "URL Slug (Arabic)",
        category: "Category",
        program: "Program",
        project: "Project",
        activity: "Activity",
        readTime: "Read Time (minutes)",
        isEnglish: "Available in English",
        isArabic: "Available in Arabic",
        includeInSitemapEn: "Include in English Sitemap",
        includeInSitemapAr: "Include in Arabic Sitemap",
        isPublished: "Published"
      },
      placeholders: {
        titleEn: "Enter news title in English",
        titleAr: "Enter news title in Arabic",
        contentEn: "Enter news content in English",
        contentAr: "Enter news content in Arabic",
        featuredImageUrl: "https://example.com/featured-image.jpg",
        otherImagesUrl: "https://example.com/image1.jpg, https://example.com/image2.jpg",
        slugEn: "news-slug",
        slugAr: "news-slug-ar",
        category: "Select category",
        program: "Select program",
        project: "Select project",
        activity: "Select activity",
        readTime: "5"
      },
      options: {
        noCategory: "No Category",
        noProgram: "No Program",
        noProject: "No Project",
        noActivity: "No Activity"
      }
    },
    ar: {
      basicInfo: {
        title: "المعلومات الأساسية",
        description: "التفاصيل الأساسية حول الخبر"
      },
      fields: {
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        contentEn: "المحتوى (إنجليزي)",
        contentAr: "المحتوى (عربي)",
        featuredImageUrl: "رابط الصورة الرئيسية",
        otherImagesUrl: "روابط الصور الأخرى (مفصولة بفواصل)",
        slugEn: "الرابط المختصر (إنجليزي)",
        slugAr: "الرابط المختصر (عربي)",
        category: "الفئة",
        program: "البرنامج",
        project: "المشروع",
        activity: "النشاط",
        readTime: "وقت القراءة (بالدقائق)",
        isEnglish: "متاح بالإنجليزية",
        isArabic: "متاح بالعربية",
        includeInSitemapEn: "تضمين في خريطة الموقع الإنجليزية",
        includeInSitemapAr: "تضمين في خريطة الموقع العربية",
        isPublished: "منشور"
      },
      placeholders: {
        titleEn: "أدخل عنوان الخبر بالإنجليزية",
        titleAr: "أدخل عنوان الخبر بالعربية",
        contentEn: "أدخل محتوى الخبر بالإنجليزية",
        contentAr: "أدخل محتوى الخبر بالعربية",
        featuredImageUrl: "https://example.com/featured-image.jpg",
        otherImagesUrl: "https://example.com/image1.jpg, https://example.com/image2.jpg",
        slugEn: "news-slug",
        slugAr: "news-slug-ar",
        category: "اختر الفئة",
        program: "اختر البرنامج",
        project: "اختر المشروع",
        activity: "اختر النشاط",
        readTime: "5"
      },
      options: {
        noCategory: "بدون فئة",
        noProgram: "بدون برنامج",
        noProject: "بدون مشروع",
        noActivity: "بدون نشاط"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch related data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news categories
        const categoriesResponse = await fetch("/api/cms/news-categories?published=true");
        if (categoriesResponse.ok) {
          const categoriesResult = await categoriesResponse.json();
          setNewsCategories(categoriesResult.data || []);
        }

        // Fetch programs
        const programsResponse = await fetch("/api/cms/programs?published=true");
        if (programsResponse.ok) {
          const programsResult = await programsResponse.json();
          setPrograms(programsResult.data || []);
        }

        // Fetch projects
        const projectsResponse = await fetch("/api/cms/projects?published=true");
        if (projectsResponse.ok) {
          const projectsResult = await projectsResponse.json();
          setProjects(projectsResult.data || []);
        }

        // Fetch activities
        const activitiesResponse = await fetch("/api/cms/activities?published=true");
        if (activitiesResponse.ok) {
          const activitiesResult = await activitiesResponse.json();
          setActivities(activitiesResult.data || []);
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
  const isEnglish = watch("isEnglish");
  const isArabicLanguage = watch("isArabic");
  const includeInSitemapEn = watch("includeInSitemapEn");
  const includeInSitemapAr = watch("includeInSitemapAr");
  const categoryId = watch("categoryId");
  const programId = watch("programId");
  const projectId = watch("projectId");
  const activityId = watch("activityId");

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

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contentEn">{text.fields.contentEn}</Label>
            <Textarea
              id="contentEn"
              {...register("contentEn", { required: "English content is required" })}
              placeholder={text.placeholders.contentEn}
              rows={6}
              className={errors.contentEn ? "border-red-500" : ""}
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
              rows={6}
              className={errors.contentAr ? "border-red-500" : ""}
              dir="rtl"
            />
            {errors.contentAr && (
              <p className="text-red-500 text-sm mt-1">{errors.contentAr.message}</p>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
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
            <Label htmlFor="otherImagesUrl">{text.fields.otherImagesUrl}</Label>
            <Textarea
              id="otherImagesUrl"
              {...register("otherImagesUrl")}
              placeholder={text.placeholders.otherImagesUrl}
              rows={3}
              dir="ltr"
            />
          </div>
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

        {/* Category and Relations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {newsCategories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {isArabic ? category.nameAr : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="projectId">{text.fields.project}</Label>
            <Select
              value={projectId ? String(projectId) : "null"}
              onValueChange={(value) => setValue("projectId", value === "null" ? null : Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder={text.placeholders.project} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">{text.options.noProject}</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={String(project.id)}>
                    {isArabic ? project.nameAr : project.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="activityId">{text.fields.activity}</Label>
            <Select
              value={activityId ? String(activityId) : "null"}
              onValueChange={(value) => setValue("activityId", value === "null" ? null : Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder={text.placeholders.activity} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">{text.options.noActivity}</SelectItem>
                {activities.map((activity) => (
                  <SelectItem key={activity.id} value={String(activity.id)}>
                    {isArabic ? activity.nameAr : activity.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Read Time */}
        <div>
          <Label htmlFor="readTime">{text.fields.readTime}</Label>
          <Input
            id="readTime"
            type="number"
            {...register("readTime", { min: { value: 0, message: "Read time must be 0 or greater" } })}
            placeholder={text.placeholders.readTime}
            className={errors.readTime ? "border-red-500" : ""}
          />
          {errors.readTime && (
            <p className="text-red-500 text-sm mt-1">{errors.readTime.message}</p>
          )}
        </div>

        {/* Status Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
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
                checked={isArabicLanguage}
                onCheckedChange={(checked) => setValue("isArabic", checked)}
              />
              <Label htmlFor="isArabic">{text.fields.isArabic}</Label>
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

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeInSitemapEn"
                checked={includeInSitemapEn}
                onCheckedChange={(checked) => setValue("includeInSitemapEn", checked)}
              />
              <Label htmlFor="includeInSitemapEn">{text.fields.includeInSitemapEn}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeInSitemapAr"
                checked={includeInSitemapAr}
                onCheckedChange={(checked) => setValue("includeInSitemapAr", checked)}
              />
              <Label htmlFor="includeInSitemapAr">{text.fields.includeInSitemapAr}</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
