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

interface ActivityBasicFieldsProps {
  form: UseFormReturn<any>;
}

export function ActivityBasicFields({ form }: ActivityBasicFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [programs, setPrograms] = useState<Program[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Translations
  const t = {
    en: {
      basicInfo: {
        title: "Basic Information",
        description: "Essential details about the activity"
      },
      fields: {
        titleEn: "Title (English)",
        titleAr: "Title (Arabic)",
        contentEn: "Content (English)",
        contentAr: "Content (Arabic)",
        featuredImageUrl: "Featured Image URL",
        date: "Activity Date",
        programId: "Program",
        projectId: "Project (Optional)",
        slugEn: "URL Slug (English)",
        slugAr: "URL Slug (Arabic)",
        pageViews: "Page Views",
        isArabic: "Available in Arabic",
        isEnglish: "Available in English",
        isPublished: "Published"
      },
      placeholders: {
        titleEn: "Enter activity title in English",
        titleAr: "Enter activity title in Arabic",
        contentEn: "Enter activity content in English",
        contentAr: "Enter activity content in Arabic",
        featuredImageUrl: "https://example.com/activity-image.jpg",
        date: "Select activity date",
        program: "Select a program",
        project: "Select a project (optional)",
        slugEn: "activity-slug",
        slugAr: "activity-slug-ar",
        pageViews: "0"
      },
      options: {
        noProgram: "Select Program",
        noProject: "No Project"
      }
    },
    ar: {
      basicInfo: {
        title: "المعلومات الأساسية",
        description: "التفاصيل الأساسية حول النشاط"
      },
      fields: {
        titleEn: "العنوان (إنجليزي)",
        titleAr: "العنوان (عربي)",
        contentEn: "المحتوى (إنجليزي)",
        contentAr: "المحتوى (عربي)",
        featuredImageUrl: "رابط الصورة الرئيسية",
        date: "تاريخ النشاط",
        programId: "البرنامج",
        projectId: "المشروع (اختياري)",
        slugEn: "الرابط المختصر (إنجليزي)",
        slugAr: "الرابط المختصر (عربي)",
        pageViews: "مرات المشاهدة",
        isArabic: "متاح بالعربية",
        isEnglish: "متاح بالإنجليزية",
        isPublished: "منشور"
      },
      placeholders: {
        titleEn: "أدخل عنوان النشاط بالإنجليزية",
        titleAr: "أدخل عنوان النشاط بالعربية",
        contentEn: "أدخل محتوى النشاط بالإنجليزية",
        contentAr: "أدخل محتوى النشاط بالعربية",
        featuredImageUrl: "https://example.com/activity-image.jpg",
        date: "اختر تاريخ النشاط",
        program: "اختر برنامج",
        project: "اختر مشروع (اختياري)",
        slugEn: "activity-slug",
        slugAr: "activity-slug-ar",
        pageViews: "0"
      },
      options: {
        noProgram: "اختر البرنامج",
        noProject: "بدون مشروع"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch programs and projects
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/cms/programs?published=true");
        if (response.ok) {
          const result = await response.json();
          setPrograms(result.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/cms/projects?published=true");
        if (response.ok) {
          const result = await response.json();
          setProjects(result.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchPrograms();
    fetchProjects();
  }, []);

  const { register, formState: { errors }, watch, setValue } = form;
  const titleEn = watch("titleEn");
  const titleAr = watch("titleAr");
  const isPublished = watch("isPublished");
  const isArabicLang = watch("isArabic");
  const isEnglishLang = watch("isEnglish");
  const programId = watch("programId");
  const projectId = watch("projectId");

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

        {/* Featured Image URL and Date */}
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
            <Label htmlFor="date">{text.fields.date}</Label>
            <Input
              id="date"
              type="datetime-local"
              {...register("date")}
            />
          </div>
        </div>

        {/* Program and Project Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="programId">{text.fields.programId}</Label>
            <Select
              value={programId ? String(programId) : ""}
              onValueChange={(value) => setValue("programId", value ? Number(value) : 0)}
            >
              <SelectTrigger className={errors.programId ? "border-red-500" : ""}>
                <SelectValue placeholder={text.placeholders.program} />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={String(program.id)}>
                    {isArabic ? program.nameAr : program.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.programId && (
              <p className="text-red-500 text-sm mt-1">{errors.programId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="projectId">{text.fields.projectId}</Label>
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

        {/* Page Views */}
        <div>
          <Label htmlFor="pageViews">{text.fields.pageViews}</Label>
          <Input
            id="pageViews"
            type="number"
            {...register("pageViews", { 
              min: { value: 0, message: "Page views must be 0 or greater" }
            })}
            placeholder={text.placeholders.pageViews}
            className={errors.pageViews ? "border-red-500" : ""}
          />
          {errors.pageViews && (
            <p className="text-red-500 text-sm mt-1">{errors.pageViews.message}</p>
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
