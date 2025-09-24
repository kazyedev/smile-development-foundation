"use client";

import { useState, useEffect } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ProjectBasicFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

interface Program {
  id: number;
  title_en: string;
  title_ar: string;
}

export function ProjectBasicFields({ control, errors, isArabic }: ProjectBasicFieldsProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(false);

  // Fetch programs for the dropdown
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoadingPrograms(true);
        const response = await fetch('/api/cms/programs');
        const result = await response.json();
        
        if (response.ok) {
          setPrograms(result.items || []);
        } else {
          toast.error('Failed to load programs');
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
        toast.error('Failed to load programs');
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []);

  const t = {
    en: {
      basicInfo: "Basic Information",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      descriptionEn: "Description (English)",
      descriptionAr: "Description (Arabic)",
      slugEn: "URL Slug (English)",
      slugAr: "URL Slug (Arabic)",
      color: "Color",
      featuredImage: "Featured Image URL",
      videoUrl: "Video URL",
      program: "Associated Program",
      selectProgram: "Select a program...",
      isPublished: "Published",
      isEnglish: "Available in English",
      isArabic: "Available in Arabic",
      languageSupport: "Language Support",
      mediaSettings: "Media Settings",
      publishSettings: "Publishing Settings",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      descriptionEn: "الوصف (إنجليزي)",
      descriptionAr: "الوصف (عربي)",
      slugEn: "رابط URL (إنجليزي)",
      slugAr: "رابط URL (عربي)",
      color: "اللون",
      featuredImage: "رابط الصورة المميزة",
      videoUrl: "رابط الفيديو",
      program: "البرنامج المرتبط",
      selectProgram: "اختر برنامجاً...",
      isPublished: "منشور",
      isEnglish: "متوفر باللغة الإنجليزية",
      isArabic: "متوفر باللغة العربية",
      languageSupport: "دعم اللغات",
      mediaSettings: "إعدادات الوسائط",
      publishSettings: "إعدادات النشر",
    }
  };

  const text = isArabic ? t.ar : t.en;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
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

          {/* Color and Program */}
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
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.program}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "none" ? null : parseInt(value))}
                    value={field.value?.toString() || "none"}
                    disabled={loadingPrograms}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loadingPrograms ? "Loading..." : text.selectProgram} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id.toString()}>
                          {isArabic ? program.title_ar : program.title_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Media Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{text.mediaSettings}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <FormField
            control={control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.videoUrl}</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Language Support */}
      <Card>
        <CardHeader>
          <CardTitle>{text.languageSupport}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="isEnglish"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{text.isEnglish}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="isArabic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{text.isArabic}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Publishing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{text.publishSettings}</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
