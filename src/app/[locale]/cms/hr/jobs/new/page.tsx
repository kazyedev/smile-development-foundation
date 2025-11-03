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
import { JobFields } from "@/components/cms/jobs/JobFields";
import Link from "next/link";

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

export default function NewJobPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newJob: "New Job",
      createJob: "Create a new job posting",
      backToJobs: "Back to Jobs",
      save: "Save Job",
      saving: "Saving...",
      createSuccess: "Job created successfully",
      createFailed: "Failed to create job",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newJob: "وظيفة جديدة",
      createJob: "إنشاء إعلان وظيفة جديد",
      backToJobs: "العودة إلى الوظائف",
      save: "حفظ الوظيفة",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء الوظيفة بنجاح",
      createFailed: "فشل في إنشاء الوظيفة",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

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
      
      const response = await fetch("/api/cms/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/hr/jobs`);
      } else {
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
          <h1 className="text-3xl font-bold text-foreground">{text.newJob}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createJob}
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

