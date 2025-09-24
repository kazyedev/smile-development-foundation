"use client";

import { Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgramBasicFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function ProgramBasicFields({ control, errors, isArabic }: ProgramBasicFieldsProps) {
  const t = {
    en: {
      basicInfo: "Basic Information",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      descriptionEn: "Description (English)",
      descriptionAr: "Description (Arabic)",
      aboutEn: "About (English)",
      aboutAr: "About (Arabic)",
      slugEn: "URL Slug (English)",
      slugAr: "URL Slug (Arabic)",
      color: "Color",
      featuredImage: "Featured Image URL",
      isPublished: "Published",
      includeInSitemapEn: "Include in English sitemap",
      includeInSitemapAr: "Include in Arabic sitemap",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      descriptionEn: "الوصف (إنجليزي)",
      descriptionAr: "الوصف (عربي)",
      aboutEn: "حول (إنجليزي)",
      aboutAr: "حول (عربي)",
      slugEn: "رابط URL (إنجليزي)",
      slugAr: "رابط URL (عربي)",
      color: "اللون",
      featuredImage: "رابط الصورة المميزة",
      isPublished: "منشور",
      includeInSitemapEn: "تضمين في خريطة الموقع الإنجليزي",
      includeInSitemapAr: "تضمين في خريطة الموقع العربي",
    }
  };

  const text = isArabic ? t.ar : t.en;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.basicInfo}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Title Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="titleEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.titleEn}</FormLabel>
                <FormControl>
                  <Input placeholder="Enter English title..." {...field} />
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
                  <Input placeholder="أدخل العنوان العربي..." {...field} dir="rtl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.descriptionEn}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter English description..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.descriptionAr}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="أدخل الوصف العربي..." 
                    className="min-h-[100px]"
                    dir="rtl"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* About Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="aboutEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.aboutEn}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter English about section..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="aboutAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.aboutAr}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="أدخل قسم حول بالعربية..." 
                    className="min-h-[100px]"
                    dir="rtl"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Slug Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="slugEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.slugEn}</FormLabel>
                <FormControl>
                  <Input placeholder="enter-english-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="slugAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.slugAr}</FormLabel>
                <FormControl>
                  <Input placeholder="ادخل-الرابط-العربي" {...field} dir="rtl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.color}</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="featuredImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.featuredImage}</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <FormField
            control={control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{text.isPublished}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="includeInSitemapEn"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{text.includeInSitemapEn}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="includeInSitemapAr"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{text.includeInSitemapAr}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
