"use client";

import { useParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ImageTagsFieldsProps {
  form: UseFormReturn<any>;
}

export function ImageTagsFields({ form }: ImageTagsFieldsProps) {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";

  // Simple translations - you can expand these later
  const text = {
    title: isArabic ? "الكلمات المفتاحية والعلامات" : "Tags and Keywords",
    description: isArabic ? "إدارة الكلمات المفتاحية والعلامات" : "Manage keywords and tags",
    keywordsEn: isArabic ? "الكلمات المفتاحية (إنجليزي)" : "Keywords (English)",
    keywordsAr: isArabic ? "الكلمات المفتاحية (عربي)" : "Keywords (Arabic)",
    tagsEn: isArabic ? "العلامات (إنجليزي)" : "Tags (English)",
    tagsAr: isArabic ? "العلامات (عربي)" : "Tags (Arabic)",
    keywordPlaceholder: isArabic ? "أدخل كلمة مفتاحية" : "Enter keyword",
    tagPlaceholder: isArabic ? "أدخل علامة" : "Enter tag",
    noKeywords: isArabic ? "لا توجد كلمات مفتاحية" : "No keywords added",
    noTags: isArabic ? "لا توجد علامات" : "No tags added"
  };

  const { watch, setValue } = form;
  const keywordsEn = watch("keywordsEn") || [];
  const keywordsAr = watch("keywordsAr") || [];
  const tagsEn = watch("tagsEn") || [];
  const tagsAr = watch("tagsAr") || [];

  const [newKeywordEn, setNewKeywordEn] = useState("");
  const [newKeywordAr, setNewKeywordAr] = useState("");
  const [newTagEn, setNewTagEn] = useState("");
  const [newTagAr, setNewTagAr] = useState("");

  // Keywords handlers
  const addKeywordEn = () => {
    if (newKeywordEn.trim() && !keywordsEn.includes(newKeywordEn.trim())) {
      setValue("keywordsEn", [...keywordsEn, newKeywordEn.trim()]);
      setNewKeywordEn("");
    }
  };

  const addKeywordAr = () => {
    if (newKeywordAr.trim() && !keywordsAr.includes(newKeywordAr.trim())) {
      setValue("keywordsAr", [...keywordsAr, newKeywordAr.trim()]);
      setNewKeywordAr("");
    }
  };

  const removeKeywordEn = (keyword: string) => {
    setValue("keywordsEn", keywordsEn.filter((k: string) => k !== keyword));
  };

  const removeKeywordAr = (keyword: string) => {
    setValue("keywordsAr", keywordsAr.filter((k: string) => k !== keyword));
  };

  // Tags handlers
  const addTagEn = () => {
    if (newTagEn.trim() && !tagsEn.includes(newTagEn.trim())) {
      setValue("tagsEn", [...tagsEn, newTagEn.trim()]);
      setNewTagEn("");
    }
  };

  const addTagAr = () => {
    if (newTagAr.trim() && !tagsAr.includes(newTagAr.trim())) {
      setValue("tagsAr", [...tagsAr, newTagAr.trim()]);
      setNewTagAr("");
    }
  };

  const removeTagEn = (tag: string) => {
    setValue("tagsEn", tagsEn.filter((t: string) => t !== tag));
  };

  const removeTagAr = (tag: string) => {
    setValue("tagsAr", tagsAr.filter((t: string) => t !== tag));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    action: () => void
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Card className={isArabic ? "text-right" : ""}>
      <CardHeader>
        <CardTitle>{text.title}</CardTitle>
        <CardDescription>{text.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Keywords Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Keywords */}
          <div>
            <Label className="text-base font-medium">{text.keywordsEn}</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newKeywordEn}
                  onChange={(e) => setNewKeywordEn(e.target.value)}
                  placeholder={text.keywordPlaceholder}
                  onKeyDown={(e) => handleKeyDown(e, addKeywordEn)}
                  dir="ltr"
                />
                <Button
                  type="button"
                  onClick={addKeywordEn}
                  size="sm"
                  disabled={!newKeywordEn.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {keywordsEn.length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    {text.noKeywords}
                  </span>
                ) : (
                  keywordsEn.map((keyword: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeKeywordEn(keyword)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Arabic Keywords */}
          <div>
            <Label className="text-base font-medium">{text.keywordsAr}</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newKeywordAr}
                  onChange={(e) => setNewKeywordAr(e.target.value)}
                  placeholder={text.keywordPlaceholder}
                  onKeyDown={(e) => handleKeyDown(e, addKeywordAr)}
                  dir="rtl"
                />
                <Button
                  type="button"
                  onClick={addKeywordAr}
                  size="sm"
                  disabled={!newKeywordAr.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {keywordsAr.length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    {text.noKeywords}
                  </span>
                ) : (
                  keywordsAr.map((keyword: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeKeywordAr(keyword)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Tags */}
          <div>
            <Label className="text-base font-medium">{text.tagsEn}</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTagEn}
                  onChange={(e) => setNewTagEn(e.target.value)}
                  placeholder={text.tagPlaceholder}
                  onKeyDown={(e) => handleKeyDown(e, addTagEn)}
                  dir="ltr"
                />
                <Button
                  type="button"
                  onClick={addTagEn}
                  size="sm"
                  disabled={!newTagEn.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {tagsEn.length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    {text.noTags}
                  </span>
                ) : (
                  tagsEn.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeTagEn(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Arabic Tags */}
          <div>
            <Label className="text-base font-medium">{text.tagsAr}</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTagAr}
                  onChange={(e) => setNewTagAr(e.target.value)}
                  placeholder={text.tagPlaceholder}
                  onKeyDown={(e) => handleKeyDown(e, addTagAr)}
                  dir="rtl"
                />
                <Button
                  type="button"
                  onClick={addTagAr}
                  size="sm"
                  disabled={!newTagAr.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {tagsAr.length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    {text.noTags}
                  </span>
                ) : (
                  tagsAr.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeTagAr(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
