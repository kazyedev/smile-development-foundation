"use client";

import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface ProjectContentFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function ProjectContentFields({ control, errors, isArabic }: ProjectContentFieldsProps) {
  const [keywordInputEn, setKeywordInputEn] = useState("");
  const [keywordInputAr, setKeywordInputAr] = useState("");
  const [tagInputEn, setTagInputEn] = useState("");
  const [tagInputAr, setTagInputAr] = useState("");

  const {
    fields: goalsEnFields,
    append: appendGoalEn,
    remove: removeGoalEn
  } = useFieldArray({
    control,
    name: "goalsEn"
  });

  const {
    fields: goalsArFields,
    append: appendGoalAr,
    remove: removeGoalAr
  } = useFieldArray({
    control,
    name: "goalsAr"
  });

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

  const {
    fields: bannersFields,
    append: appendBanner,
    remove: removeBanner
  } = useFieldArray({
    control,
    name: "banners"
  });

  const t = {
    en: {
      contentInfo: "Content Information",
      goalsEn: "Goals (English)",
      goalsAr: "Goals (Arabic)",
      keywordsEn: "Keywords (English)",
      keywordsAr: "Keywords (Arabic)",
      tagsEn: "Tags (English)",
      tagsAr: "Tags (Arabic)",
      banners: "Project Banners",
      addGoal: "Add Goal",
      addKeyword: "Add Keyword",
      addTag: "Add Tag",
      addBanner: "Add Banner",
      enterGoal: "Enter a goal...",
      enterKeyword: "Enter a keyword...",
      enterTag: "Enter a tag...",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      imageUrl: "Image URL",
    },
    ar: {
      contentInfo: "معلومات المحتوى",
      goalsEn: "الأهداف (إنجليزي)",
      goalsAr: "الأهداف (عربي)",
      keywordsEn: "الكلمات المفتاحية (إنجليزي)",
      keywordsAr: "الكلمات المفتاحية (عربي)",
      tagsEn: "العلامات (إنجليزي)",
      tagsAr: "العلامات (عربي)",
      banners: "بنرات المشروع",
      addGoal: "إضافة هدف",
      addKeyword: "إضافة كلمة مفتاحية",
      addTag: "إضافة علامة",
      addBanner: "إضافة بنر",
      enterGoal: "أدخل هدفاً...",
      enterKeyword: "أدخل كلمة مفتاحية...",
      enterTag: "أدخل علامة...",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      imageUrl: "رابط الصورة",
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
    <Card>
      <CardHeader>
        <CardTitle>{text.contentInfo}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Goals */}
          <div className="space-y-4">
            <FormLabel>{text.goalsEn}</FormLabel>
            <div className="space-y-2">
              {goalsEnFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={control}
                    name={`goalsEn.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={text.enterGoal} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeGoalEn(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendGoalEn("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                {text.addGoal}
              </Button>
            </div>
          </div>

          {/* Arabic Goals */}
          <div className="space-y-4">
            <FormLabel>{text.goalsAr}</FormLabel>
            <div className="space-y-2">
              {goalsArFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={control}
                    name={`goalsAr.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={text.enterGoal} {...field} dir="rtl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeGoalAr(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendGoalAr("")}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                {text.addGoal}
              </Button>
            </div>
          </div>
        </div>

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
                <Badge key={field.id} variant="outline" className="flex items-center gap-1">
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
                <Badge key={field.id} variant="outline" className="flex items-center gap-1">
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

        {/* Banners Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.banners}</FormLabel>
          {bannersFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Banner #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBanner(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`banners.${index}.titleEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Banner title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`banners.${index}.titleAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان البنر بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`banners.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.imageUrl}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/banner.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendBanner({ titleEn: "", titleAr: "", imageUrl: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addBanner}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
