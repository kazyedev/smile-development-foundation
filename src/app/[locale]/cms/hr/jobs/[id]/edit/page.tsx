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
import { JobFields } from "@/components/cms/jobs/JobFields";
import Link from "next/link";
import type { Job } from "@/lib/db/schema/jobs";

// Form schema
const jobFormSchema = z.object({
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
  titleEn: z.string().min(1, "English title is required").max(500),
  titleAr: z.string().min(1, "Arabic title is required").max(500),
  slugEn: z.string().min(1, "English slug is required").max(200),
  slugAr: z.string().min(1, "Arabic slug is required").max(200),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  departmentEn: z.string().max(255).optional().or(z.literal("")),
  departmentAr: z.string().max(255).optional().or(z.literal("")),
  experience: z.enum(["entry", "mid", "senior"]).optional(),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  salaryCurrency: z.string().max(10).optional().or(z.literal("")),
  benefitsEn: z.array(z.string()).default([]),
  benefitsAr: z.array(z.string()).default([]),
  urgent: z.boolean().default(false),
  availablePositions: z.number().int().positive().optional(),
  requirementsEn: z.array(z.string()).default([]),
  requirementsAr: z.array(z.string()).default([]),
  responsibilitiesEn: z.array(z.string()).default([]),
  responsibilitiesAr: z.array(z.string()).default([]),
  locationEn: z.string().max(200).optional().or(z.literal("")),
  locationAr: z.string().max(200).optional().or(z.literal("")),
  type: z.enum(["full-time", "part-time", "contract", "internship", "volunteer"]),
  applyUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

export default function EditJobPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      isEnglish: false,
      isArabic: false,
      titleEn: "",
      titleAr: "",
      slugEn: "",
      slugAr: "",
      descriptionEn: "",
      descriptionAr: "",
      departmentEn: "",
      departmentAr: "",
      experience: undefined,
      salaryMin: undefined,
      salaryMax: undefined,
      salaryCurrency: "",
      benefitsEn: [],
      benefitsAr: [],
      urgent: false,
      availablePositions: undefined,
      requirementsEn: [],
      requirementsAr: [],
      responsibilitiesEn: [],
      responsibilitiesAr: [],
      locationEn: "",
      locationAr: "",
      type: "full-time",
      applyUrl: "",
      isPublished: false,
      publishedAt: undefined,
      expiresAt: undefined,
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editJob: "Edit Job",
      updateJob: "Update job information",
      backToJobs: "Back to Jobs",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading job...",
      updateSuccess: "Job updated successfully",
      updateFailed: "Failed to update job",
      loadFailed: "Failed to load job",
      notFound: "Job not found",
    },
    ar: {
      editJob: "تعديل الوظيفة",
      updateJob: "تحديث معلومات الوظيفة",
      backToJobs: "العودة إلى الوظائف",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل الوظيفة...",
      updateSuccess: "تم تحديث الوظيفة بنجاح",
      updateFailed: "فشل في تحديث الوظيفة",
      loadFailed: "فشل في تحميل الوظيفة",
      notFound: "الوظيفة غير موجودة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load job data
  useEffect(() => {
    const loadJob = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/jobs/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const jobData = result.data;
          setJob(jobData);

          // Transform database fields to form fields
          const formData: JobFormData = {
            isEnglish: jobData.is_english || false,
            isArabic: jobData.is_arabic || false,
            titleEn: jobData.title_en || "",
            titleAr: jobData.title_ar || "",
            slugEn: jobData.slug_en || "",
            slugAr: jobData.slug_ar || "",
            descriptionEn: jobData.description_en || "",
            descriptionAr: jobData.description_ar || "",
            departmentEn: jobData.department_en || "",
            departmentAr: jobData.department_ar || "",
            experience: jobData.experience || undefined,
            salaryMin: jobData.salary_min || undefined,
            salaryMax: jobData.salary_max || undefined,
            salaryCurrency: jobData.salary_currency || "",
            benefitsEn: Array.isArray(jobData.benefits_en) ? jobData.benefits_en : [],
            benefitsAr: Array.isArray(jobData.benefits_ar) ? jobData.benefits_ar : [],
            urgent: jobData.urgent || false,
            availablePositions: jobData.available_positions || undefined,
            requirementsEn: Array.isArray(jobData.requirements_en) ? jobData.requirements_en : [],
            requirementsAr: Array.isArray(jobData.requirements_ar) ? jobData.requirements_ar : [],
            responsibilitiesEn: Array.isArray(jobData.responsibilities_en) ? jobData.responsibilities_en : [],
            responsibilitiesAr: Array.isArray(jobData.responsibilities_ar) ? jobData.responsibilities_ar : [],
            locationEn: jobData.location_en || "",
            locationAr: jobData.location_ar || "",
            type: jobData.type || "full-time",
            applyUrl: jobData.apply_url || "",
            isPublished: jobData.is_published || false,
            publishedAt: jobData.published_at ? new Date(jobData.published_at).toISOString() : undefined,
            expiresAt: jobData.expires_at ? new Date(jobData.expires_at).toISOString() : undefined,
          };

          reset(formData);
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/hr/jobs`);
        }
      } catch (error) {
        console.error("Failed to load job:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/hr/jobs`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadJob();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: JobFormData) => {
    try {
      setIsSubmitting(true);
      
      // Clean up empty strings for optional fields
      const submitData = {
        ...data,
        departmentEn: data.departmentEn || undefined,
        departmentAr: data.departmentAr || undefined,
        salaryCurrency: data.salaryCurrency || undefined,
        locationEn: data.locationEn || undefined,
        locationAr: data.locationAr || undefined,
        applyUrl: data.applyUrl || undefined,
        publishedAt: data.publishedAt || undefined,
        expiresAt: data.expiresAt || undefined,
      };
      
      const response = await fetch(`/api/cms/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/hr/jobs`);
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

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/hr/jobs`}>
            <Button variant="outline" className="mt-4">
              {text.backToJobs}
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
          <h1 className="text-3xl font-bold text-foreground">{text.editJob}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateJob}
          </p>
        </div>
        <Link href={`/${locale}/cms/hr/jobs`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToJobs}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <JobFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/hr/jobs`}>
              <Button type="button" variant="outline">
                {text.backToJobs}
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

