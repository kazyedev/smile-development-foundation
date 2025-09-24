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
import { Plus, X, Upload } from "lucide-react";

interface ProgramJsonFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function ProgramJsonFields({ control, errors, isArabic }: ProgramJsonFieldsProps) {
  const {
    fields: staticsFields,
    append: appendStatic,
    remove: removeStatic
  } = useFieldArray({
    control,
    name: "statics"
  });

  const {
    fields: fundingProvidersFields,
    append: appendFundingProvider,
    remove: removeFundingProvider
  } = useFieldArray({
    control,
    name: "fundingProviders"
  });

  const {
    fields: donorsFields,
    append: appendDonor,
    remove: removeDonor
  } = useFieldArray({
    control,
    name: "donors"
  });

  const {
    fields: partnersFields,
    append: appendPartner,
    remove: removePartner
  } = useFieldArray({
    control,
    name: "partners"
  });

  const {
    fields: slidesFields,
    append: appendSlide,
    remove: removeSlide
  } = useFieldArray({
    control,
    name: "slides"
  });

  const t = {
    en: {
      jsonbFields: "Additional Information",
      statics: "Statistics",
      fundingProviders: "Funding Providers",
      donors: "Donors",
      partners: "Partners",
      slides: "Slides",
      titleEn: "Title (English)",
      titleAr: "Title (Arabic)",
      nameEn: "Name (English)",
      nameAr: "Name (Arabic)",
      value: "Value",
      imageUrl: "Image URL",
      addStatic: "Add Statistic",
      addProvider: "Add Provider",
      addDonor: "Add Donor",
      addPartner: "Add Partner",
      addSlide: "Add Slide",
    },
    ar: {
      jsonbFields: "معلومات إضافية",
      statics: "الإحصائيات",
      fundingProviders: "مقدمي التمويل",
      donors: "المتبرعين",
      partners: "الشركاء",
      slides: "الشرائح",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      nameEn: "الاسم (إنجليزي)",
      nameAr: "الاسم (عربي)",
      value: "القيمة",
      imageUrl: "رابط الصورة",
      addStatic: "إضافة إحصائية",
      addProvider: "إضافة مقدم تمويل",
      addDonor: "إضافة متبرع",
      addPartner: "إضافة شريك",
      addSlide: "إضافة شريحة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.jsonbFields}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.statics}</FormLabel>
          {staticsFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Statistic #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeStatic(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`statics.${index}.titleEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`statics.${index}.titleAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="العنوان بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`statics.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.value}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
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
            onClick={() => appendStatic({ titleEn: "", titleAr: "", value: 0 })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addStatic}
          </Button>
        </div>

        {/* Funding Providers Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.fundingProviders}</FormLabel>
          {fundingProvidersFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Provider #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFundingProvider(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`fundingProviders.${index}.nameEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.nameEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Provider name in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`fundingProviders.${index}.nameAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.nameAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="اسم المقدم بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`fundingProviders.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.imageUrl}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/logo.jpg" {...field} />
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
            onClick={() => appendFundingProvider({ nameEn: "", nameAr: "", imageUrl: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addProvider}
          </Button>
        </div>

        {/* Donors Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.donors}</FormLabel>
          {donorsFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Donor #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeDonor(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`donors.${index}.nameEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.nameEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Donor name in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`donors.${index}.nameAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.nameAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="اسم المتبرع بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`donors.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.imageUrl}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/logo.jpg" {...field} />
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
            onClick={() => appendDonor({ nameEn: "", nameAr: "", imageUrl: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addDonor}
          </Button>
        </div>

        {/* Partners Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.partners}</FormLabel>
          {partnersFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Partner #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removePartner(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`partners.${index}.nameEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.nameEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Partner name in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`partners.${index}.nameAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.nameAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="اسم الشريك بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`partners.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.imageUrl}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/logo.jpg" {...field} />
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
            onClick={() => appendPartner({ nameEn: "", nameAr: "", imageUrl: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addPartner}
          </Button>
        </div>

        {/* Slides Section */}
        <div className="space-y-4">
          <FormLabel className="text-lg font-semibold">{text.slides}</FormLabel>
          {slidesFields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Slide #{index + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSlide(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`slides.${index}.titleEn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleEn}</FormLabel>
                      <FormControl>
                        <Input placeholder="Slide title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`slides.${index}.titleAr`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.titleAr}</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان الشريحة بالعربية" {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`slides.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.imageUrl}</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/slide.jpg" {...field} />
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
            onClick={() => appendSlide({ titleEn: "", titleAr: "", imageUrl: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {text.addSlide}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
