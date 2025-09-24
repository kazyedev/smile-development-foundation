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
import { ProgramBasicFields } from "@/components/cms/programs/ProgramBasicFields";
import { ProgramContentFields } from "@/components/cms/programs/ProgramContentFields";
import { ProgramJsonFields } from "@/components/cms/programs/ProgramJsonFields";
import Link from "next/link";

// Form schema
const programFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required").max(500),
  titleAr: z.string().min(1, "Arabic title is required").max(500),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  aboutEn: z.string().optional(),
  aboutAr: z.string().optional(),
  goalsEn: z.array(z.string()).default([]),
  goalsAr: z.array(z.string()).default([]),
  implementationLocationEn: z.string().optional(),
  implementationLocationAr: z.string().optional(),
  keywordsEn: z.array(z.string()).default([]),
  keywordsAr: z.array(z.string()).default([]),
  slugEn: z.string().min(1, "English slug is required").max(200),
  slugAr: z.string().min(1, "Arabic slug is required").max(200),
  color: z.string().optional(),
  featuredImageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
  includeInSitemapEn: z.boolean().default(true),
  includeInSitemapAr: z.boolean().default(true),
  statics: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    value: z.number(),
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
  slides: z.array(z.object({
    titleEn: z.string(),
    titleAr: z.string(),
    imageUrl: z.string(),
  })).default([]),
});

type ProgramFormData = z.infer<typeof programFormSchema>;

export default function NewProgramPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      aboutEn: "",
      aboutAr: "",
      goalsEn: [],
      goalsAr: [],
      implementationLocationEn: "",
      implementationLocationAr: "",
      keywordsEn: [],
      keywordsAr: [],
      slugEn: "",
      slugAr: "",
      color: "#E74C3C",
      featuredImageUrl: "",
      isPublished: false,
      includeInSitemapEn: true,
      includeInSitemapAr: true,
      statics: [],
      fundingProviders: [],
      donors: [],
      partners: [],
      slides: [],
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newProgram: "New Program",
      createProgram: "Create a new program",
      backToPrograms: "Back to Programs",
      save: "Save Program",
      saving: "Saving...",
      createSuccess: "Program created successfully",
      createFailed: "Failed to create program",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newProgram: "برنامج جديد",
      createProgram: "إنشاء برنامج جديد",
      backToPrograms: "العودة إلى البرامج",
      save: "حفظ البرنامج",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء البرنامج بنجاح",
      createFailed: "فشل في إنشاء البرنامج",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: ProgramFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting program data:", data);
      
      const response = await fetch("/api/cms/programs", {
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
        router.push(`/${locale}/cms/programs`);
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
          <h1 className="text-3xl font-bold text-foreground">{text.newProgram}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createProgram}
          </p>
        </div>
        <Link href={`/${locale}/cms/programs`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToPrograms}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ProgramBasicFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />
          
          <ProgramContentFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />
          
          <ProgramJsonFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/programs`}>
              <Button type="button" variant="outline">
                {text.backToPrograms}
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
