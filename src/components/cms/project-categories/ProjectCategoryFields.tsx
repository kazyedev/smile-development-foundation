"use client";

import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ProjectCategoryFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function ProjectCategoryFields({ control, errors, isArabic }: ProjectCategoryFieldsProps) {
  const [keywordInputEn, setKeywordInputEn] = useState("");
  const [keywordInputAr, setKeywordInputAr] = useState("");
  const [tagInputEn, setTagInputEn] = useState("");
  const [tagInputAr, setTagInputAr] = useState("");

  const {
    fields: keywordsEnFields,
    append: appendKeywordEn,
    remove: removeKeywordEn
  } = useFieldArray({
    control,
    name: "keywordsEn"
  });

  const {
    fields: keywordsArFields,
    append: appendKeywordAr,
    remove: removeKeywordAr
  } = useFieldArray({
    control,
    name: "keywordsAr"
  });

  const {
    fields: tagsEnFields,
    append: appendTagEn,
    remove: removeTagEn
  } = useFieldArray({
    control,
    name: "tagsEn"
  });

  const {
    fields: tagsArFields,
    append: appendTagAr,
    remove: removeTagAr
  } = useFieldArray({
    control,
    name: "tagsAr"
  });

  const t = {
    en: {
      basicInfo: "Basic Information",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      slugEn: "URL Slug (English)",
      slugAr: "URL Slug (Arabic)",
      featuredImage: "Featured Image URL",
      descriptionInfo: "Description",
      descriptionEn: "Description (English)",
      descriptionAr: "Description (Arabic)",
      metadataInfo: "Metadata",
      keywordsEn: "Keywords (English)",
      keywordsAr: "Keywords (Arabic)",
      tagsEn: "Tags (English)",
      tagsAr: "Tags (Arabic)",
      isPublished: "Published",
      addKeyword: "Add Keyword",
      addTag: "Add Tag",
      enterKeyword: "Enter a keyword...",
      enterTag: "Enter a tag...",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      slugEn: "رابط URL (إنجليزي)",
      slugAr: "رابط URL (عربي)",
      featuredImage: "رابط الصورة المميزة",
      descriptionInfo: "الوصف",
      descriptionEn: "الوصف (إنجليزي)",
      descriptionAr: "الوصف (عربي)",
      metadataInfo: "البيانات الوصفية",
      keywordsEn: "الكلمات المفتاحية (إنجليزي)",
      keywordsAr: "الكلمات المفتاحية (عربي)",
      tagsEn: "الوسوم (إنجليزي)",
      tagsAr: "الوسوم (عربي)",
      isPublished: "منشور",
      addKeyword: "إضافة كلمة مفتاحية",
      addTag: "إضافة وسم",
      enterKeyword: "أدخل كلمة مفتاحية...",
      enterTag: "أدخل وسم...",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const handleAddKeywordEn = () => {
    if (keywordInputEn.trim()) {
      appendKeywordEn(keywordInputEn.trim());
      setKeywordInputEn("");
    }
  };

  const handleAddKeywordAr = () => {
    if (keywordInputAr.trim()) {
      appendKeywordAr(keywordInputAr.trim());
      setKeywordInputAr("");
    }
  };

  const handleAddTagEn = () => {
    if (tagInputEn.trim()) {
      appendTagEn(tagInputEn.trim());
      setTagInputEn("");
    }
  };

  const handleAddTagAr = () => {
    if (tagInputAr.trim()) {
      appendTagAr(tagInputAr.trim());
      setTagInputAr("");
    }
  };

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

          {/* Featured Image URL */}
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

          {/* Published Status */}
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

      {/* Metadata Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.metadataInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Keywords Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Keywords */}
            <div className="space-y-4">
              <FormLabel>{text.keywordsEn}</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder={text.enterKeyword}
                  value={keywordInputEn}
                  onChange={(e) => setKeywordInputEn(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeywordEn())}
                />
                <Button type="button" variant="outline" onClick={handleAddKeywordEn}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywordsEnFields.map((field, index) => (
                  <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                    <span>{field.value}</span>
                    <button
                      type="button"
                      onClick={() => removeKeywordEn(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Arabic Keywords */}
            <div className="space-y-4">
              <FormLabel>{text.keywordsAr}</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder={text.enterKeyword}
                  value={keywordInputAr}
                  onChange={(e) => setKeywordInputAr(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeywordAr())}
                  dir="rtl"
                />
                <Button type="button" variant="outline" onClick={handleAddKeywordAr}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywordsArFields.map((field, index) => (
                  <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                    <span>{field.value}</span>
                    <button
                      type="button"
                      onClick={() => removeKeywordAr(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Tags */}
            <div className="space-y-4">
              <FormLabel>{text.tagsEn}</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder={text.enterTag}
                  value={tagInputEn}
                  onChange={(e) => setTagInputEn(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTagEn())}
                />
                <Button type="button" variant="outline" onClick={handleAddTagEn}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tagsEnFields.map((field, index) => (
                  <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                    <span>{field.value}</span>
                    <button
                      type="button"
                      onClick={() => removeTagEn(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Arabic Tags */}
            <div className="space-y-4">
              <FormLabel>{text.tagsAr}</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder={text.enterTag}
                  value={tagInputAr}
                  onChange={(e) => setTagInputAr(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTagAr())}
                  dir="rtl"
                />
                <Button type="button" variant="outline" onClick={handleAddTagAr}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tagsArFields.map((field, index) => (
                  <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                    <span>{field.value}</span>
                    <button
                      type="button"
                      onClick={() => removeTagAr(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

