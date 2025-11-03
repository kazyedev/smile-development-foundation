"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Form schema
const heroSlideFormSchema = z.object({
  titleEn: z.string().min(1, "English title is required").max(500),
  titleAr: z.string().min(1, "Arabic title is required").max(500),
  captionEn: z.string().min(1, "English caption is required"),
  captionAr: z.string().min(1, "Arabic caption is required"),
  locationEn: z.string().optional(),
  locationAr: z.string().optional(),
  featuredImageUrl: z.string().url("Valid image URL is required"),
  linkTextEn: z.string().optional(),
  linkTextAr: z.string().optional(),
  linkUrlEn: z.string().url("Valid URL is required").optional().or(z.literal("")),
  linkUrlAr: z.string().url("Valid URL is required").optional().or(z.literal("")),
  slideType: z.string().optional(),
  referenceId: z.number().int().positive().optional().or(z.null()),
  sortOrder: z.number().int().default(0).optional(),
  isPublished: z.boolean().default(false).optional(),
});

type HeroSlideFormData = z.infer<typeof heroSlideFormSchema>;

export default function NewHeroSlidePage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HeroSlideFormData>({
    resolver: zodResolver(heroSlideFormSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      captionEn: "",
      captionAr: "",
      locationEn: "",
      locationAr: "",
      featuredImageUrl: "",
      linkTextEn: "",
      linkTextAr: "",
      linkUrlEn: "",
      linkUrlAr: "",
      slideType: "",
      referenceId: null,
      sortOrder: 0,
      isPublished: false,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newSlide: "New Hero Slide",
      createSlide: "Create a new hero slide",
      backToSlides: "Back to Slides",
      save: "Save Slide",
      saving: "Saving...",
      createSuccess: "Hero slide created successfully",
      createFailed: "Failed to create hero slide",
      basicInfo: "Basic Information",
      content: "Content",
      links: "Links & Settings",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      captionEn: "Caption (English)",
      captionAr: "Caption (Arabic)",
      locationEn: "Location (English)",
      locationAr: "Location (Arabic)",
      featuredImageUrl: "Featured Image URL",
      linkTextEn: "Link Text (English)",
      linkTextAr: "Link Text (Arabic)",
      linkUrlEn: "Link URL (English)",
      linkUrlAr: "Link URL (Arabic)",
      slideType: "Slide Type",
      referenceId: "Reference ID",
      sortOrder: "Sort Order",
      isPublished: "Published",
      slideTypeDescription: "Type of slide (e.g., 'normal', 'program', 'project')",
      referenceIdDescription: "ID of referenced content (if slideType is set)",
      sortOrderDescription: "Order in which slides appear (lower numbers appear first)",
    },
    ar: {
      newSlide: "شريحة جديدة",
      createSlide: "إنشاء شريحة جديدة",
      backToSlides: "العودة إلى الشرائح",
      save: "حفظ الشريحة",
      saving: "جاري الحفظ...",
      createSuccess: "تم إنشاء الشريحة بنجاح",
      createFailed: "فشل في إنشاء الشريحة",
      basicInfo: "المعلومات الأساسية",
      content: "المحتوى",
      links: "الروابط والإعدادات",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      captionEn: "التعليق (إنجليزي)",
      captionAr: "التعليق (عربي)",
      locationEn: "الموقع (إنجليزي)",
      locationAr: "الموقع (عربي)",
      featuredImageUrl: "رابط الصورة الرئيسية",
      linkTextEn: "نص الرابط (إنجليزي)",
      linkTextAr: "نص الرابط (عربي)",
      linkUrlEn: "رابط الرابط (إنجليزي)",
      linkUrlAr: "رابط الرابط (عربي)",
      slideType: "نوع الشريحة",
      referenceId: "رقم المرجع",
      sortOrder: "ترتيب العرض",
      isPublished: "منشور",
      slideTypeDescription: "نوع الشريحة (مثل: 'عادي'، 'برنامج'، 'مشروع')",
      referenceIdDescription: "رقم المحتوى المرجعي (إذا تم تعيين slideType)",
      sortOrderDescription: "الترتيب الذي تظهر به الشرائح (الأرقام الأقل تظهر أولاً)",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: HeroSlideFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/cms/hero-slides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/website-data/home-slides`);
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
          <h1 className="text-3xl font-bold text-foreground">{text.newSlide}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createSlide}
          </p>
        </div>
        <Link href={`/${locale}/cms/website-data/home-slides`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToSlides}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>{text.basicInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="titleEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleEn}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="titleAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleAr}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="featuredImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.featuredImageUrl}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>{text.content}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="captionEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.captionEn}</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="captionAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.captionAr}</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="locationEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.locationEn}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="locationAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.locationAr}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Links & Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{text.links}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="linkTextEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.linkTextEn}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="linkTextAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.linkTextAr}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="linkUrlEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.linkUrlEn}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="linkUrlAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.linkUrlAr}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="slideType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.slideType}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>{text.slideTypeDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="referenceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.referenceId}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        />
                      </FormControl>
                      <FormDescription>{text.referenceIdDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="sortOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.sortOrder}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          value={field.value}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>{text.sortOrderDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          {text.isPublished}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/website-data/home-slides`}>
              <Button type="button" variant="outline">
                {text.backToSlides}
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

