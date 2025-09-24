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

interface ProgramContentFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function ProgramContentFields({ control, errors, isArabic }: ProgramContentFieldsProps) {
  const [keywordInputEn, setKeywordInputEn] = useState("");
  const [keywordInputAr, setKeywordInputAr] = useState("");

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

  const t = {
    en: {
      contentInfo: "Content Information",
      goalsEn: "Goals (English)",
      goalsAr: "Goals (Arabic)",
      keywordsEn: "Keywords (English)",
      keywordsAr: "Keywords (Arabic)",
      implementationLocationEn: "Implementation Location (English)",
      implementationLocationAr: "Implementation Location (Arabic)",
      addGoal: "Add Goal",
      addKeyword: "Add Keyword",
      enterGoal: "Enter a goal...",
      enterKeyword: "Enter a keyword...",
      enterLocation: "Enter implementation location...",
    },
    ar: {
      contentInfo: "معلومات المحتوى",
      goalsEn: "الأهداف (إنجليزي)",
      goalsAr: "الأهداف (عربي)",
      keywordsEn: "الكلمات المفتاحية (إنجليزي)",
      keywordsAr: "الكلمات المفتاحية (عربي)",
      implementationLocationEn: "موقع التنفيذ (إنجليزي)",
      implementationLocationAr: "موقع التنفيذ (عربي)",
      addGoal: "إضافة هدف",
      addKeyword: "إضافة كلمة مفتاحية",
      enterGoal: "أدخل هدفاً...",
      enterKeyword: "أدخل كلمة مفتاحية...",
      enterLocation: "أدخل موقع التنفيذ...",
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

        {/* Implementation Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="implementationLocationEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.implementationLocationEn}</FormLabel>
                <FormControl>
                  <Input placeholder={text.enterLocation} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="implementationLocationAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.implementationLocationAr}</FormLabel>
                <FormControl>
                  <Input placeholder={text.enterLocation} {...field} dir="rtl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
      </CardContent>
    </Card>
  );
}
