"use client";

import { Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsletterMemberFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function NewsletterMemberFields({ control, errors, isArabic }: NewsletterMemberFieldsProps) {
  const t = {
    en: {
      basicInfo: "Basic Information",
      email: "Email Address",
      emailPlaceholder: "Enter email address...",
      emailDescription: "Unique email address for the newsletter member",
      languagePreferences: "Language Preferences",
      languageDescription: "Select which language newsletters this member should receive",
      english: "English",
      arabic: "Arabic",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      email: "عنوان البريد الإلكتروني",
      emailPlaceholder: "أدخل عنوان البريد الإلكتروني...",
      emailDescription: "عنوان بريد إلكتروني فريد لعضو النشرة الإخبارية",
      languagePreferences: "تفضيلات اللغة",
      languageDescription: "حدد لغة النشرات الإخبارية التي يجب أن يتلقاها هذا العضو",
      english: "إنجليزي",
      arabic: "عربي",
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
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.email}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={text.emailPlaceholder} 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>{text.emailDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Language Preferences Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.languagePreferences}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormDescription className="mb-4">{text.languageDescription}</FormDescription>
          
          <div className="space-y-4">
            <FormField
              control={control}
              name="isEnglish"
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
                      {text.english}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="isArabic"
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
                      {text.arabic}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

