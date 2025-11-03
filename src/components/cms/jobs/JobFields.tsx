"use client";

import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface JobFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function JobFields({ control, errors, isArabic }: JobFieldsProps) {
  const {
    fields: benefitsEnFields,
    append: appendBenefitEn,
    remove: removeBenefitEn
  } = useFieldArray({
    control,
    name: "benefitsEn"
  });

  const {
    fields: benefitsArFields,
    append: appendBenefitAr,
    remove: removeBenefitAr
  } = useFieldArray({
    control,
    name: "benefitsAr"
  });

  const {
    fields: requirementsEnFields,
    append: appendRequirementEn,
    remove: removeRequirementEn
  } = useFieldArray({
    control,
    name: "requirementsEn"
  });

  const {
    fields: requirementsArFields,
    append: appendRequirementAr,
    remove: removeRequirementAr
  } = useFieldArray({
    control,
    name: "requirementsAr"
  });

  const {
    fields: responsibilitiesEnFields,
    append: appendResponsibilityEn,
    remove: removeResponsibilityEn
  } = useFieldArray({
    control,
    name: "responsibilitiesEn"
  });

  const {
    fields: responsibilitiesArFields,
    append: appendResponsibilityAr,
    remove: removeResponsibilityAr
  } = useFieldArray({
    control,
    name: "responsibilitiesAr"
  });

  const t = {
    en: {
      basicInfo: "Basic Information",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      slugEn: "URL Slug (English)",
      slugAr: "URL Slug (Arabic)",
      descriptionEn: "Description (English)",
      descriptionAr: "Description (Arabic)",
      jobDetails: "Job Details",
      departmentEn: "Department (English)",
      departmentAr: "Department (Arabic)",
      locationEn: "Location (English)",
      locationAr: "Location (Arabic)",
      type: "Job Type",
      experience: "Experience Level",
      availablePositions: "Available Positions",
      salary: "Salary Information",
      salaryMin: "Minimum Salary",
      salaryMax: "Maximum Salary",
      salaryCurrency: "Currency",
      benefits: "Benefits",
      benefitsEn: "Benefits (English)",
      benefitsAr: "Benefits (Arabic)",
      requirements: "Requirements",
      requirementsEn: "Requirements (English)",
      requirementsAr: "Requirements (Arabic)",
      responsibilities: "Responsibilities",
      responsibilitiesEn: "Responsibilities (English)",
      responsibilitiesAr: "Responsibilities (Arabic)",
      publishing: "Publishing",
      isPublished: "Published",
      urgent: "Urgent",
      applyUrl: "Apply URL",
      publishedAt: "Published Date",
      expiresAt: "Expires Date",
      languageFlags: "Language Availability",
      isEnglish: "English",
      isArabic: "Arabic",
      addItem: "Add Item",
      enterItem: "Enter item...",
      entry: "Entry Level",
      mid: "Mid Level",
      senior: "Senior Level",
      fullTime: "Full-time",
      partTime: "Part-time",
      contract: "Contract",
      internship: "Internship",
      volunteer: "Volunteer",
    },
    ar: {
      basicInfo: "المعلومات الأساسية",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      slugEn: "رابط URL (إنجليزي)",
      slugAr: "رابط URL (عربي)",
      descriptionEn: "الوصف (إنجليزي)",
      descriptionAr: "الوصف (عربي)",
      jobDetails: "تفاصيل الوظيفة",
      departmentEn: "القسم (إنجليزي)",
      departmentAr: "القسم (عربي)",
      locationEn: "الموقع (إنجليزي)",
      locationAr: "الموقع (عربي)",
      type: "نوع الوظيفة",
      experience: "مستوى الخبرة",
      availablePositions: "المناصب المتاحة",
      salary: "معلومات الراتب",
      salaryMin: "الحد الأدنى للراتب",
      salaryMax: "الحد الأقصى للراتب",
      salaryCurrency: "العملة",
      benefits: "المزايا",
      benefitsEn: "المزايا (إنجليزي)",
      benefitsAr: "المزايا (عربي)",
      requirements: "المتطلبات",
      requirementsEn: "المتطلبات (إنجليزي)",
      requirementsAr: "المتطلبات (عربي)",
      responsibilities: "المسؤوليات",
      responsibilitiesEn: "المسؤوليات (إنجليزي)",
      responsibilitiesAr: "المسؤوليات (عربي)",
      publishing: "النشر",
      isPublished: "منشور",
      urgent: "عاجل",
      applyUrl: "رابط التقديم",
      publishedAt: "تاريخ النشر",
      expiresAt: "تاريخ الانتهاء",
      languageFlags: "توفر اللغة",
      isEnglish: "إنجليزي",
      isArabic: "عربي",
      addItem: "إضافة عنصر",
      enterItem: "أدخل عنصراً...",
      entry: "مبتدئ",
      mid: "متوسط",
      senior: "خبير",
      fullTime: "دوام كامل",
      partTime: "دوام جزئي",
      contract: "عقد",
      internship: "تدريب",
      volunteer: "تطوع",
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
        </CardContent>
      </Card>

      {/* Job Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.jobDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="departmentEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.departmentEn}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="departmentAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.departmentAr}</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل القسم..." {...field} dir="rtl" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="locationEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.locationEn}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="locationAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.locationAr}</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الموقع..." {...field} dir="rtl" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.type}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={text.type} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">{text.fullTime}</SelectItem>
                      <SelectItem value="part-time">{text.partTime}</SelectItem>
                      <SelectItem value="contract">{text.contract}</SelectItem>
                      <SelectItem value="internship">{text.internship}</SelectItem>
                      <SelectItem value="volunteer">{text.volunteer}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.experience}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={text.experience} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="entry">{text.entry}</SelectItem>
                      <SelectItem value="mid">{text.mid}</SelectItem>
                      <SelectItem value="senior">{text.senior}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="availablePositions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.availablePositions}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter number of positions..." 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Salary Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.salary}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="salaryMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.salaryMin}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Min salary..." 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="salaryMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.salaryMax}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Max salary..." 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="salaryCurrency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.salaryCurrency}</FormLabel>
                  <FormControl>
                    <Input placeholder="USD, SAR, etc..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.benefits}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Benefits */}
            <div className="space-y-4">
              <FormLabel>{text.benefitsEn}</FormLabel>
              <div className="space-y-2">
                {benefitsEnFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`benefitsEn.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={text.enterItem} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeBenefitEn(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendBenefitEn("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {text.addItem}
                </Button>
              </div>
            </div>

            {/* Arabic Benefits */}
            <div className="space-y-4">
              <FormLabel>{text.benefitsAr}</FormLabel>
              <div className="space-y-2">
                {benefitsArFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`benefitsAr.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={text.enterItem} {...field} dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeBenefitAr(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendBenefitAr("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {text.addItem}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.requirements}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Requirements */}
            <div className="space-y-4">
              <FormLabel>{text.requirementsEn}</FormLabel>
              <div className="space-y-2">
                {requirementsEnFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`requirementsEn.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={text.enterItem} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirementEn(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendRequirementEn("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {text.addItem}
                </Button>
              </div>
            </div>

            {/* Arabic Requirements */}
            <div className="space-y-4">
              <FormLabel>{text.requirementsAr}</FormLabel>
              <div className="space-y-2">
                {requirementsArFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`requirementsAr.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={text.enterItem} {...field} dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirementAr(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendRequirementAr("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {text.addItem}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsibilities Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.responsibilities}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Responsibilities */}
            <div className="space-y-4">
              <FormLabel>{text.responsibilitiesEn}</FormLabel>
              <div className="space-y-2">
                {responsibilitiesEnFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`responsibilitiesEn.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={text.enterItem} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeResponsibilityEn(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendResponsibilityEn("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {text.addItem}
                </Button>
              </div>
            </div>

            {/* Arabic Responsibilities */}
            <div className="space-y-4">
              <FormLabel>{text.responsibilitiesAr}</FormLabel>
              <div className="space-y-2">
                {responsibilitiesArFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`responsibilitiesAr.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={text.enterItem} {...field} dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeResponsibilityAr(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendResponsibilityAr("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {text.addItem}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.publishing}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="applyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.applyUrl}</FormLabel>
                  <FormControl>
                    <Input 
                      type="url"
                      placeholder="https://..." 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.publishedAt}</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local"
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.expiresAt}</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local"
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
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

            <FormField
              control={control}
              name="urgent"
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
                      {text.urgent}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Flags Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.languageFlags}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                    {text.isEnglish}
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
                    {text.isArabic}
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

