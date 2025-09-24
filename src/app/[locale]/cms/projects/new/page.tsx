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
import { ProjectBasicFields } from "@/components/cms/projects/ProjectBasicFields";
import { ProjectContentFields } from "@/components/cms/projects/ProjectContentFields";
import { ProjectAdvancedFields } from "@/components/cms/projects/ProjectAdvancedFields";
import { ProjectFinalFields } from "@/components/cms/projects/ProjectFinalFields";
import Link from "next/link";

// Form schema
const projectFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  featuredImageUrl: z.string().url("Must be a valid URL"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  videoUrl: z.string().url().optional().or(z.literal("")),
  isEnglish: z.boolean().default(true),
  isArabic: z.boolean().default(true),
  slugEn: z.string().min(1, "English slug is required"),
  slugAr: z.string().min(1, "Arabic slug is required"),
  isPublished: z.boolean().default(false),
  programId: z.number().nullable().optional(),
  banners: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    imageUrl: z.string(),
  })).default([]),
  goalsEn: z.array(z.string()).default([]),
  goalsAr: z.array(z.string()).default([]),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  tagsEn: z.array(z.string()).default([]),
  tagsAr: z.array(z.string()).default([]),
  statics: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    icon: z.string(),
    value: z.number(),
    unitEn: z.string(),
    unitAr: z.string(),
  })).default([]),
  fundingProviders: z.array(z.object({
    nameEn: z.string(),
    nameAr: z.string(),
    imageUrl: z.string(),
  })).default([]),
  donors: z.array(z.object({
    nameEn: z.string(),
    nameAr: z.string(),
    imageUrl: z.string(),
  })).default([]),
  partners: z.array(z.object({
    nameEn: z.string(),
    nameAr: z.string(),
    imageUrl: z.string(),
  })).default([]),
  deliverables: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    value: z.string(),
    unitEn: z.string(),
    unitAr: z.string(),
  })).default([]),
  resources: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    image: z.string(),
  })).default([]),
  cost: z.array(z.object({
    costTitleEn: z.string(),
    costTitleAr: z.string(),
    costAmount: z.number(),
    costCurrencyEn: z.string(),
    costCurrencyAr: z.string(),
    costPeriodEn: z.string(),
    costPeriodAr: z.string(),
  })).default([]),
  beneficiaries: z.array(z.object({
    beneficiaryAmount: z.number(),
    beneficiaryTargetEn: z.string(),
    beneficiaryTargetAr: z.string(),
  })).default([]),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export default function NewProjectPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      featuredImageUrl: "",
      color: "#000000",
      videoUrl: "",
      isEnglish: true,
      isArabic: true,
      slugEn: "",
      slugAr: "",
      isPublished: false,
      programId: null,
      banners: [],
      goalsEn: [],
      goalsAr: [],
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      statics: [],
      fundingProviders: [],
      donors: [],
      partners: [],
      deliverables: [],
      resources: [],
      cost: [],
      beneficiaries: [],
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newProject: "New Project",
      createProject: "Create a new project",
      backToProjects: "Back to Projects",
      save: "Save Project",
      saving: "Saving...",
      createSuccess: "Project created successfully",
      createFailed: "Failed to create project",
    },
    ar: {
      newProject: "مشروع جديد",
      createProject: "إنشاء مشروع جديد",
      backToProjects: "العودة إلى المشاريع",
      save: "حفظ المشروع",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء المشروع بنجاح",
      createFailed: "فشل في إنشاء المشروع",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting project data:", data);
      
      const response = await fetch("/api/cms/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/projects`);
      } else {
        console.error("API error:", result);
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
          <h1 className="text-3xl font-bold text-foreground">{text.newProject}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createProject}
          </p>
        </div>
        <Link href={`/${locale}/cms/projects`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToProjects}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ProjectBasicFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />
          
          <ProjectContentFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />
          
          <ProjectAdvancedFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />
          
          <ProjectFinalFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/projects`}>
              <Button type="button" variant="outline">
                {text.backToProjects}
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
