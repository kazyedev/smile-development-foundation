"use client";

import { useParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";

interface PublicationTagsFieldsProps {
  form: UseFormReturn<any>;
}

export function PublicationTagsFields({ form }: PublicationTagsFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const [newKeywordEn, setNewKeywordEn] = useState("");
  const [newKeywordAr, setNewKeywordAr] = useState("");
  const [newTagEn, setNewTagEn] = useState("");
  const [newTagAr, setNewTagAr] = useState("");

  // Translations
  const t = {
    en: {
      keywords: {
        title: "Keywords",
        description: "Add relevant keywords to help with searchability",
        newEn: "Add English Keyword",
        newAr: "Add Arabic Keyword",
        addEn: "Add English",
        addAr: "Add Arabic",
        english: "English Keywords",
        arabic: "Arabic Keywords",
        placeholder: "Enter keyword"
      },
      tags: {
        title: "Tags",
        description: "Organize publications with tags",
        newEn: "Add English Tag",
        newAr: "Add Arabic Tag",
        addEn: "Add English",
        addAr: "Add Arabic",
        english: "English Tags",
        arabic: "Arabic Tags",
        placeholder: "Enter tag"
      },
      actions: {
        remove: "Remove"
      },
      validation: {
        keywordExists: "This keyword already exists",
        tagExists: "This tag already exists",
        empty: "Cannot add empty item"
      }
    },
    ar: {
      keywords: {
        title: "الكلمات المفتاحية",
        description: "أضف كلمات مفتاحية ذات صلة لتحسين قابلية البحث",
        newEn: "أضف كلمة مفتاحية إنجليزية",
        newAr: "أضف كلمة مفتاحية عربية",
        addEn: "أضف إنجليزي",
        addAr: "أضف عربي",
        english: "الكلمات المفتاحية الإنجليزية",
        arabic: "الكلمات المفتاحية العربية",
        placeholder: "أدخل الكلمة المفتاحية"
      },
      tags: {
        title: "العلامات",
        description: "نظم المنشورات بالعلامات",
        newEn: "أضف علامة إنجليزية",
        newAr: "أضف علامة عربية",
        addEn: "أضف إنجليزي",
        addAr: "أضف عربي",
        english: "العلامات الإنجليزية",
        arabic: "العلامات العربية",
        placeholder: "أدخل العلامة"
      },
      actions: {
        remove: "إزالة"
      },
      validation: {
        keywordExists: "هذه الكلمة المفتاحية موجودة بالفعل",
        tagExists: "هذه العلامة موجودة بالفعل",
        empty: "لا يمكن إضافة عنصر فارغ"
      }
    }
  };

  const text = isArabic ? t.ar : t.en;

  const { watch, setValue } = form;
  const keywordsEn = watch("keywordsEn") || [];
  const keywordsAr = watch("keywordsAr") || [];
  const tagsEn = watch("tagsEn") || [];
  const tagsAr = watch("tagsAr") || [];

  // Keyword handlers
  const handleAddKeywordEn = () => {
    const trimmedKeyword = newKeywordEn.trim();
    if (!trimmedKeyword) {
      alert(text.validation.empty);
      return;
    }

    if (keywordsEn.includes(trimmedKeyword)) {
      alert(text.validation.keywordExists);
      return;
    }

    setValue("keywordsEn", [...keywordsEn, trimmedKeyword]);
    setNewKeywordEn("");
  };

  const handleAddKeywordAr = () => {
    const trimmedKeyword = newKeywordAr.trim();
    if (!trimmedKeyword) {
      alert(text.validation.empty);
      return;
    }

    if (keywordsAr.includes(trimmedKeyword)) {
      alert(text.validation.keywordExists);
      return;
    }

    setValue("keywordsAr", [...keywordsAr, trimmedKeyword]);
    setNewKeywordAr("");
  };

  const handleRemoveKeywordEn = (index: number) => {
    const updated = keywordsEn.filter((_: string, i: number) => i !== index);
    setValue("keywordsEn", updated);
  };

  const handleRemoveKeywordAr = (index: number) => {
    const updated = keywordsAr.filter((_: string, i: number) => i !== index);
    setValue("keywordsAr", updated);
  };

  // Tag handlers
  const handleAddTagEn = () => {
    const trimmedTag = newTagEn.trim();
    if (!trimmedTag) {
      alert(text.validation.empty);
      return;
    }

    if (tagsEn.includes(trimmedTag)) {
      alert(text.validation.tagExists);
      return;
    }

    setValue("tagsEn", [...tagsEn, trimmedTag]);
    setNewTagEn("");
  };

  const handleAddTagAr = () => {
    const trimmedTag = newTagAr.trim();
    if (!trimmedTag) {
      alert(text.validation.empty);
      return;
    }

    if (tagsAr.includes(trimmedTag)) {
      alert(text.validation.tagExists);
      return;
    }

    setValue("tagsAr", [...tagsAr, trimmedTag]);
    setNewTagAr("");
  };

  const handleRemoveTagEn = (index: number) => {
    const updated = tagsEn.filter((_: string, i: number) => i !== index);
    setValue("tagsEn", updated);
  };

  const handleRemoveTagAr = (index: number) => {
    const updated = tagsAr.filter((_: string, i: number) => i !== index);
    setValue("tagsAr", updated);
  };

  // Handle Enter key press
  const handleKeyPress = (
    e: React.KeyboardEvent,
    handler: () => void
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handler();
    }
  };

  return (
    <div className="space-y-6">
      {/* Keywords Card */}
      <Card className={isArabic ? "text-right" : ""}>
        <CardHeader>
          <CardTitle>{text.keywords.title}</CardTitle>
          <CardDescription>{text.keywords.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Keywords */}
            <div className="space-y-3">
              <Label>{text.keywords.english}</Label>
              <div className="flex gap-2">
                <Input
                  value={newKeywordEn}
                  onChange={(e) => setNewKeywordEn(e.target.value)}
                  placeholder={text.keywords.placeholder}
                  onKeyPress={(e) => handleKeyPress(e, handleAddKeywordEn)}
                  dir="ltr"
                />
                <Button
                  type="button"
                  onClick={handleAddKeywordEn}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  {text.keywords.addEn}
                </Button>
              </div>
              
              {/* Display English Keywords */}
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {keywordsEn.map((keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <span dir="ltr">{keyword}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveKeywordEn(index)}
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Arabic Keywords */}
            <div className="space-y-3">
              <Label>{text.keywords.arabic}</Label>
              <div className="flex gap-2">
                <Input
                  value={newKeywordAr}
                  onChange={(e) => setNewKeywordAr(e.target.value)}
                  placeholder={text.keywords.placeholder}
                  onKeyPress={(e) => handleKeyPress(e, handleAddKeywordAr)}
                  dir="rtl"
                />
                <Button
                  type="button"
                  onClick={handleAddKeywordAr}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  {text.keywords.addAr}
                </Button>
              </div>
              
              {/* Display Arabic Keywords */}
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {keywordsAr.map((keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <span dir="rtl">{keyword}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveKeywordAr(index)}
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Card */}
      <Card className={isArabic ? "text-right" : ""}>
        <CardHeader>
          <CardTitle>{text.tags.title}</CardTitle>
          <CardDescription>{text.tags.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Tags */}
            <div className="space-y-3">
              <Label>{text.tags.english}</Label>
              <div className="flex gap-2">
                <Input
                  value={newTagEn}
                  onChange={(e) => setNewTagEn(e.target.value)}
                  placeholder={text.tags.placeholder}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTagEn)}
                  dir="ltr"
                />
                <Button
                  type="button"
                  onClick={handleAddTagEn}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  {text.tags.addEn}
                </Button>
              </div>
              
              {/* Display English Tags */}
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {tagsEn.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <span dir="ltr">{tag}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveTagEn(index)}
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Arabic Tags */}
            <div className="space-y-3">
              <Label>{text.tags.arabic}</Label>
              <div className="flex gap-2">
                <Input
                  value={newTagAr}
                  onChange={(e) => setNewTagAr(e.target.value)}
                  placeholder={text.tags.placeholder}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTagAr)}
                  dir="rtl"
                />
                <Button
                  type="button"
                  onClick={handleAddTagAr}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  {text.tags.addAr}
                </Button>
              </div>
              
              {/* Display Arabic Tags */}
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {tagsAr.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <span dir="rtl">{tag}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveTagAr(index)}
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
