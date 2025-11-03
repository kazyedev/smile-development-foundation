"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsCategoryFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function NewsCategoryFields({ control, errors, isArabic }: NewsCategoryFieldsProps) {
  const t = {
    en: {
      basicInfo: "Basic Information",
      nameEn: "Name (English)",
      nameAr: "Name (Arabic)",
      slugEn: "URL Slug (English)",
      slugAr: "URL Slug (Arabic)",
      descriptionInfo: "Description",
      descriptionEn: "Description (English)",
      descriptionAr: "Description (Arabic)",
      visualElements: "Visual Elements",
      color: "Color",
      icon: "Icon",
      publishing: "Publishing",
      isPublished: "Published",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      nameEn: "الاسم (إنجليزي)",
      nameAr: "الاسم (عربي)",
      slugEn: "رابط URL (إنجليزي)",
      slugAr: "رابط URL (عربي)",
      descriptionInfo: "الوصف",
      descriptionEn: "الوصف (إنجليزي)",
      descriptionAr: "الوصف (عربي)",
      visualElements: "العناصر المرئية",
      color: "اللون",
      icon: "الأيقونة",
      publishing: "النشر",
      isPublished: "منشور",
    }
  };

  const text = isArabic ? t.ar : t.en;

  return (
    <>
      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.basicInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.nameEn}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter English name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="nameAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.nameAr}</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الاسم العربي..." {...field} dir="rtl" />
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
                    <Input placeholder="english-slug" {...field} />
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
                    <Input placeholder="الرابط-العربي" {...field} dir="rtl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.descriptionInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Visual Elements Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.visualElements}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color and Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.color}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="color" 
                        className="w-20 h-10 p-1 cursor-pointer" 
                        value={field.value || "#000000"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <Input 
                        placeholder="#000000" 
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.icon}</FormLabel>
                  <FormControl>
                    <Input placeholder="Icon name or class..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Publishing Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.publishing}</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </>
  );
}

