"use client";

import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface ProjectFinalFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function ProjectFinalFields({ control, errors, isArabic }: ProjectFinalFieldsProps) {
  const {
    fields: deliverablesFields,
    append: appendDeliverable,
    remove: removeDeliverable
  } = useFieldArray({
    control,
    name: "deliverables"
  });

  const {
    fields: resourcesFields,
    append: appendResource,
    remove: removeResource
  } = useFieldArray({
    control,
    name: "resources"
  });

  const {
    fields: costFields,
    append: appendCost,
    remove: removeCost
  } = useFieldArray({
    control,
    name: "cost"
  });

  const {
    fields: beneficiariesFields,
    append: appendBeneficiary,
    remove: removeBeneficiary
  } = useFieldArray({
    control,
    name: "beneficiaries"
  });

  const t = {
    en: {
      projectDetails: "Project Details",
      deliverables: "Deliverables",
      resources: "Resources",
      cost: "Project Costs",
      beneficiaries: "Beneficiaries",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      value: "Value",
      unitEn: "Unit (English)",
      unitAr: "Unit (Arabic)",
      image: "Image URL",
      costTitleEn: "Cost Title (English)",
      costTitleAr: "Cost Title (Arabic)",
      costAmount: "Cost Amount",
      costCurrencyEn: "Currency (English)",
      costCurrencyAr: "Currency (Arabic)",
      costPeriodEn: "Period (English)",
      costPeriodAr: "Period (Arabic)",
      beneficiaryAmount: "Beneficiary Amount",
      beneficiaryTargetEn: "Target (English)",
      beneficiaryTargetAr: "Target (Arabic)",
      addDeliverable: "Add Deliverable",
      addResource: "Add Resource",
      addCost: "Add Cost",
      addBeneficiary: "Add Beneficiary",
    },
    ar: {
      projectDetails: "تفاصيل المشروع",
      deliverables: "المخرجات",
      resources: "الموارد",
      cost: "تكاليف المشروع",
      beneficiaries: "المستفيدين",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      value: "القيمة",
      unitEn: "الوحدة (إنجليزي)",
      unitAr: "الوحدة (عربي)",
      image: "رابط الصورة",
      costTitleEn: "عنوان التكلفة (إنجليزي)",
      costTitleAr: "عنوان التكلفة (عربي)",
      costAmount: "مبلغ التكلفة",
      costCurrencyEn: "العملة (إنجليزي)",
      costCurrencyAr: "العملة (عربي)",
      costPeriodEn: "الفترة (إنجليزي)",
      costPeriodAr: "الفترة (عربي)",
      beneficiaryAmount: "عدد المستفيدين",
      beneficiaryTargetEn: "الفئة المستهدفة (إنجليزي)",
      beneficiaryTargetAr: "الفئة المستهدفة (عربي)",
      addDeliverable: "إضافة مخرج",
      addResource: "إضافة مورد",
      addCost: "إضافة تكلفة",
      addBeneficiary: "إضافة مستفيد",
    }
  };

  const text = isArabic ? t.ar : t.en;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.projectDetails}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deliverables Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.deliverables}</FormLabel>
          {deliverablesFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Deliverable #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeDeliverable(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`deliverables.${index}.titleEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Deliverable title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`deliverables.${index}.titleAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان المخرج بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`deliverables.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.value}</FormLabel>
                      <FormControl>
                        <Input placeholder="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`deliverables.${index}.unitEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.unitEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="items" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`deliverables.${index}.unitAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.unitAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="عناصر" {...field} dir="rtl" />
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
            onClick={() => appendDeliverable({ titleEn: "", titleAr: "", value: "", unitEn: "", unitAr: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addDeliverable}
          </Button>
        </div>

        {/* Resources Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.resources}</FormLabel>
          {resourcesFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Resource #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeResource(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`resources.${index}.titleEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Resource title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`resources.${index}.titleAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان المورد بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`resources.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.image}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/resource.jpg" {...field} />
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
            onClick={() => appendResource({ titleEn: "", titleAr: "", image: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addResource}
          </Button>
        </div>

        {/* Costs Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.cost}</FormLabel>
          {costFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cost #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCost(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`cost.${index}.costTitleEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costTitleEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Cost title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`cost.${index}.costTitleAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costTitleAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان التكلفة بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`cost.${index}.costAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costAmount}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`cost.${index}.costCurrencyEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costCurrencyEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="USD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`cost.${index}.costCurrencyAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costCurrencyAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="دولار أمريكي" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`cost.${index}.costPeriodEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costPeriodEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="monthly" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`cost.${index}.costPeriodAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.costPeriodAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="شهرياً" {...field} dir="rtl" />
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
            onClick={() => appendCost({ costTitleEn: "", costTitleAr: "", costAmount: 0, costCurrencyEn: "", costCurrencyAr: "", costPeriodEn: "", costPeriodAr: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addCost}
          </Button>
        </div>

        {/* Beneficiaries Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.beneficiaries}</FormLabel>
          {beneficiariesFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Beneficiary #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBeneficiary(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`beneficiaries.${index}.beneficiaryAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.beneficiaryAmount}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`beneficiaries.${index}.beneficiaryTargetEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.beneficiaryTargetEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Children" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`beneficiaries.${index}.beneficiaryTargetAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.beneficiaryTargetAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="أطفال" {...field} dir="rtl" />
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
            onClick={() => appendBeneficiary({ beneficiaryAmount: 0, beneficiaryTargetEn: "", beneficiaryTargetAr: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addBeneficiary}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
