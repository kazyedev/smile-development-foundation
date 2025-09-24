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
import { ProjectBasicFields } from "@/components/cms/projects/ProjectBasicFields";
import { ProjectContentFields } from "@/components/cms/projects/ProjectContentFields";
import { ProjectAdvancedFields } from "@/components/cms/projects/ProjectAdvancedFields";
import { ProjectFinalFields } from "@/components/cms/projects/ProjectFinalFields";
import Link from "next/link";
import type { Project } from "@/lib/db/schema/projects";

// Form schema (same as new project)
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

export default function EditProjectPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

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

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editProject: "Edit Project",
      updateProject: "Update project information",
      backToProjects: "Back to Projects",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading project...",
      updateSuccess: "Project updated successfully",
      updateFailed: "Failed to update project",
      loadFailed: "Failed to load project",
      notFound: "Project not found",
    },
    ar: {
      editProject: "تعديل المشروع",
      updateProject: "تحديث معلومات المشروع",
      backToProjects: "العودة إلى المشاريع",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل المشروع...",
      updateSuccess: "تم تحديث المشروع بنجاح",
      updateFailed: "فشل في تحديث المشروع",
      loadFailed: "فشل في تحميل المشروع",
      notFound: "المشروع غير موجود",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        console.log("Loading project with ID:", id);
        
        const response = await fetch(`/api/cms/projects/${id}`);
        const result = await response.json();
        
        console.log("Project API response:", result);

        if (response.ok && result.data) {
          const projectData = result.data;
          setProject(projectData);

          // Transform database fields to form fields
          const formData: ProjectFormData = {
            titleEn: projectData.title_en || "",
            titleAr: projectData.title_ar || "",
            descriptionEn: projectData.description_en || "",
            descriptionAr: projectData.description_ar || "",
            featuredImageUrl: projectData.featured_image_url || "",
            color: projectData.color || "#000000",
            videoUrl: projectData.video_url || "",
            isEnglish: projectData.is_english !== false,
            isArabic: projectData.is_arabic !== false,
            slugEn: projectData.slug_en || "",
            slugAr: projectData.slug_ar || "",
            isPublished: projectData.is_published || false,
            programId: projectData.program_id || null,
            banners: Array.isArray(projectData.banners) ? projectData.banners : [],
            goalsEn: projectData.goals_en || [],
            goalsAr: projectData.goals_ar || [],
            keywordsEn: projectData.keywords_en || [],
            keywordsAr: projectData.keywords_ar || [],
            tagsEn: projectData.tags_en || [],
            tagsAr: projectData.tags_ar || [],
            statics: Array.isArray(projectData.statics) ? projectData.statics : [],
            fundingProviders: Array.isArray(projectData.funding_providers) ? projectData.funding_providers : [],
            donors: Array.isArray(projectData.donors) ? projectData.donors : [],
            partners: Array.isArray(projectData.partners) ? projectData.partners : [],
            deliverables: Array.isArray(projectData.deliverables) ? projectData.deliverables : [],
            resources: Array.isArray(projectData.resources) ? projectData.resources : [],
            cost: Array.isArray(projectData.cost) ? projectData.cost : [],
            beneficiaries: Array.isArray(projectData.beneficiaries) ? projectData.beneficiaries : [],
          };

          console.log("Form data:", formData);
          reset(formData);
        } else {
          console.error("Project not found:", result);
          toast.error(text.notFound);
          router.push(`/${locale}/cms/projects`);
        }
      } catch (error) {
        console.error("Failed to load project:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/projects`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting updated project data:", data);
      
      const response = await fetch(`/api/cms/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Update API response:", result);

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/projects`);
      } else {
        console.error("API error:", result);
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

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/projects`}>
            <Button variant="outline" className="mt-4">
              {text.backToProjects}
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
          <h1 className="text-3xl font-bold text-foreground">{text.editProject}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateProject}
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
          <ProjectBasicFields control={control} errors={errors} isArabic={isArabic} />
          <ProjectContentFields control={control} errors={errors} isArabic={isArabic} />
          <ProjectAdvancedFields control={control} errors={errors} isArabic={isArabic} />
          <ProjectFinalFields control={control} errors={errors} isArabic={isArabic} />

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
