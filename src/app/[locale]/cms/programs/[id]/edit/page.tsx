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
import { ProgramBasicFields } from "@/components/cms/programs/ProgramBasicFields";
import { ProgramContentFields } from "@/components/cms/programs/ProgramContentFields";
import { ProgramJsonFields } from "@/components/cms/programs/ProgramJsonFields";
import Link from "next/link";
import type { Program } from "@/lib/db/schema/programs";

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

export default function EditProgramPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [program, setProgram] = useState<Program | null>(null);

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

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editProgram: "Edit Program",
      updateProgram: "Update program information",
      backToPrograms: "Back to Programs",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading program...",
      updateSuccess: "Program updated successfully",
      updateFailed: "Failed to update program",
      loadFailed: "Failed to load program",
      notFound: "Program not found",
    },
    ar: {
      editProgram: "تعديل البرنامج",
      updateProgram: "تحديث معلومات البرنامج",
      backToPrograms: "العودة إلى البرامج",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل البرنامج...",
      updateSuccess: "تم تحديث البرنامج بنجاح",
      updateFailed: "فشل في تحديث البرنامج",
      loadFailed: "فشل في تحميل البرنامج",
      notFound: "البرنامج غير موجود",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load program data
  useEffect(() => {
    const loadProgram = async () => {
      try {
        setIsLoading(true);
        console.log("Loading program with ID:", id);
        
        const response = await fetch(`/api/cms/programs/${id}`);
        const result = await response.json();
        
        console.log("Program API response:", result);

        if (response.ok && result.data) {
          const programData = result.data;
          setProgram(programData);

          // Transform database fields to form fields
          const formData: ProgramFormData = {
            titleEn: programData.title_en || "",
            titleAr: programData.title_ar || "",
            descriptionEn: programData.description_en || "",
            descriptionAr: programData.description_ar || "",
            aboutEn: programData.about_en || "",
            aboutAr: programData.about_ar || "",
            goalsEn: programData.goals_en || [],
            goalsAr: programData.goals_ar || [],
            implementationLocationEn: programData.implementation_location_en || "",
            implementationLocationAr: programData.implementation_location_ar || "",
            keywordsEn: programData.keywords_en || [],
            keywordsAr: programData.keywords_ar || [],
            slugEn: programData.slug_en || "",
            slugAr: programData.slug_ar || "",
            color: programData.color || "#E74C3C",
            featuredImageUrl: programData.featured_image_url || "",
            isPublished: programData.is_published || false,
            includeInSitemapEn: programData.include_in_sitemap_en !== false,
            includeInSitemapAr: programData.include_in_sitemap_ar !== false,
            statics: Array.isArray(programData.statics) ? programData.statics : [],
            fundingProviders: Array.isArray(programData.funding_providers) ? programData.funding_providers : [],
            donors: Array.isArray(programData.donors) ? programData.donors : [],
            partners: Array.isArray(programData.partners) ? programData.partners : [],
            slides: Array.isArray(programData.slides) ? programData.slides : [],
          };

          console.log("Form data:", formData);
          reset(formData);
        } else {
          console.error("Program not found:", result);
          toast.error(text.notFound);
          router.push(`/${locale}/cms/programs`);
        }
      } catch (error) {
        console.error("Failed to load program:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/programs`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProgram();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: ProgramFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting updated program data:", data);
      
      const response = await fetch(`/api/cms/programs/${id}`, {
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
        router.push(`/${locale}/cms/programs`);
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

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/programs`}>
            <Button variant="outline" className="mt-4">
              {text.backToPrograms}
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
          <h1 className="text-3xl font-bold text-foreground">{text.editProgram}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateProgram}
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
