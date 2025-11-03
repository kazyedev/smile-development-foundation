"use client";

import { Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsletterFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function NewsletterFields({ control, errors, isArabic }: NewsletterFieldsProps) {
  const t = {
    en: {
      basicInfo: "Basic Information",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      content: "Content",
      contentEn: "Content (English)",
      contentAr: "Content (Arabic)",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      content: "المحتوى",
      contentEn: "المحتوى (إنجليزي)",
      contentAr: "المحتوى (عربي)",
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
        </CardContent>
      </Card>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.content}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="contentEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.contentEn}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter English content..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="contentAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.contentAr}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل المحتوى العربي..."
                      className="min-h-[200px]"
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
    </>
  );
}

