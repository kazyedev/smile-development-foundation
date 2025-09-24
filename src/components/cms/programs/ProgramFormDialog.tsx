"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Minus,
  Upload,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { insertProgramSchema, type Program } from "@/lib/db/schema/programs";
import { supabaseClient } from "@/lib/supabase/client";

// Form schema - matches the program schema
const formSchema = insertProgramSchema.extend({
  featuredImageUrl: z.string().optional(),
  goalsEn: z.array(z.string()).optional(),
  goalsAr: z.array(z.string()).optional(),
  keywordsEn: z.array(z.string()).optional(),
  keywordsAr: z.array(z.string()).optional(),
  tagsEn: z.array(z.string()).optional(),
  tagsAr: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProgramFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program?: Program;
  onSuccess?: () => void;
  isArabic?: boolean;
}

export function ProgramFormDialog({
  open,
  onOpenChange,
  program,
  onSuccess,
  isArabic = false,
}: ProgramFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState("english");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      aboutEn: "",
      aboutAr: "",
      goalsEn: [],
      goalsAr: [],
      statics: [],
      icon: "",
      color: "#000000",
      implementationLocationEn: "",
      implementationLocationAr: "",
      fundingProviders: [],
      donors: [],
      partners: [],
      featuredImageUrl: "",
      slides: [],
      slugEn: "",
      slugAr: "",
      keywordsEn: [],
      keywordsAr: [],
      tagsEn: [],
      tagsAr: [],
      includeInSitemapEn: true,
      includeInSitemapAr: true,
      isPublished: false,
    },
  });

  const {
    fields: staticsFields,
    append: appendStatic,
    remove: removeStatic,
  } = useFieldArray({
    control: form.control,
    name: "statics",
  });

  const {
    fields: fundingProvidersFields,
    append: appendFundingProvider,
    remove: removeFundingProvider,
  } = useFieldArray({
    control: form.control,
    name: "fundingProviders",
  });

  const {
    fields: donorsFields,
    append: appendDonor,
    remove: removeDonor,
  } = useFieldArray({
    control: form.control,
    name: "donors",
  });

  const {
    fields: partnersFields,
    append: appendPartner,
    remove: removePartner,
  } = useFieldArray({
    control: form.control,
    name: "partners",
  });

  const {
    fields: slidesFields,
    append: appendSlide,
    remove: removeSlide,
  } = useFieldArray({
    control: form.control,
    name: "slides",
  });

  // Handle goals as arrays
  const [goalsEn, setGoalsEn] = useState<string[]>([]);
  const [goalsAr, setGoalsAr] = useState<string[]>([]);
  const [keywordsEn, setKeywordsEn] = useState<string[]>([]);
  const [keywordsAr, setKeywordsAr] = useState<string[]>([]);
  const [tagsEn, setTagsEn] = useState<string[]>([]);
  const [tagsAr, setTagsAr] = useState<string[]>([]);

  // Placeholder translations based on current locale
  const placeholders = {
    en: {
      titleEn: "Program title in English",
      titleAr: "Program title in Arabic",
      descriptionEn: "Program description in English",
      descriptionAr: "Program description in Arabic",
      aboutEn: "About the program in English",
      aboutAr: "About the program in Arabic",
      implementationLocationEn: "Implementation location in English",
      implementationLocationAr: "Implementation location in Arabic",
      slugEn: "URL slug in English (e.g. my-program)",
      slugAr: "URL slug in Arabic",
      goalsEn: "Add a goal in English",
      goalsAr: "Add a goal in Arabic",
      keywordsEn: "Add a keyword in English",
      keywordsAr: "Add a keyword in Arabic",
      tagsEn: "Add a tag in English",
      tagsAr: "Add a tag in Arabic",
      featuredImageUrl: "Featured image URL",
      iconName: "Icon name",
    },
    ar: {
      titleEn: "عنوان البرنامج بالإنجليزية",
      titleAr: "عنوان البرنامج بالعربية",
      descriptionEn: "وصف البرنامج بالإنجليزية",
      descriptionAr: "وصف البرنامج بالعربية",
      aboutEn: "حول البرنامج بالإنجليزية",
      aboutAr: "حول البرنامج بالعربية",
      implementationLocationEn: "مكان تنفيذ البرنامج بالإنجليزية",
      implementationLocationAr: "مكان تنفيذ البرنامج بالعربية",
      slugEn: "رابط البرنامج بالإنجليزية",
      slugAr: "رابط البرنامج بالعربية",
      goalsEn: "أضف هدف بالإنجليزية",
      goalsAr: "أضف هدف بالعربية",
      keywordsEn: "أضف كلمة مفتاحية بالإنجليزية",
      keywordsAr: "أضف كلمة مفتاحية بالعربية",
      tagsEn: "أضف علامة بالإنجليزية",
      tagsAr: "أضف علامة بالعربية",
      featuredImageUrl: "رابط الصورة المميزة",
      iconName: "اسم الأيقونة",
    }
  };

  const t = isArabic ? placeholders.ar : placeholders.en;

  // Load existing data when editing
  useEffect(() => {
    if (program && open) {
      form.reset({
        titleEn: program.titleEn || "",
        titleAr: program.titleAr || "",
        descriptionEn: program.descriptionEn || "",
        descriptionAr: program.descriptionAr || "",
        aboutEn: program.aboutEn || "",
        aboutAr: program.aboutAr || "",
        statics: program.statics || [],
        icon: program.icon || "",
        color: program.color || "#000000",
        implementationLocationEn: program.implementationLocationEn || "",
        implementationLocationAr: program.implementationLocationAr || "",
        fundingProviders: program.fundingProviders || [],
        donors: program.donors || [],
        partners: program.partners || [],
        featuredImageUrl: program.featuredImageUrl || "",
        slides: program.slides || [],
        slugEn: program.slugEn || "",
        slugAr: program.slugAr || "",
        includeInSitemapEn: program.includeInSitemapEn ?? true,
        includeInSitemapAr: program.includeInSitemapAr ?? true,
        isPublished: program.isPublished ?? false,
      });
      
      setGoalsEn(program.goalsEn || []);
      setGoalsAr(program.goalsAr || []);
      setKeywordsEn(program.keywordsEn || []);
      setKeywordsAr(program.keywordsAr || []);
      setTagsEn(program.tagsEn || []);
      setTagsAr(program.tagsAr || []);
    } else if (!program && open) {
      form.reset();
      setGoalsEn([]);
      setGoalsAr([]);
      setKeywordsEn([]);
      setKeywordsAr([]);
      setTagsEn([]);
      setTagsAr([]);
    }
  }, [program, open, form]);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const supabase = supabaseClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `programs_images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("programs_images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrl } = supabase.storage
        .from("programs_images")
        .getPublicUrl(filePath);

      return publicUrl.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(isArabic ? "فشل في رفع الصورة" : "Failed to upload image");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Form data before submit:", data);
      
      const submitData = {
        ...data,
        goalsEn,
        goalsAr,
        keywordsEn,
        keywordsAr,
        tagsEn,
        tagsAr,
      };

      console.log("Submit data:", submitData);

      const url = program ? `/api/cms/programs/${program.id}` : "/api/cms/programs";
      const method = program ? "PATCH" : "POST";

      console.log("API call:", { url, method });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success(
        isArabic
          ? program
            ? "تم تحديث البرنامج بنجاح"
            : "تم إنشاء البرنامج بنجاح"
          : program
          ? "Program updated successfully"
          : "Program created successfully"
      );

      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || (isArabic ? "حدث خطأ" : "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const addArrayItem = (
    array: string[],
    setArray: (items: string[]) => void,
    value: string
  ) => {
    if (value.trim() && !array.includes(value.trim())) {
      setArray([...array, value.trim()]);
    }
  };

  const removeArrayItem = (
    array: string[],
    setArray: (items: string[]) => void,
    index: number
  ) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const ArrayFieldManager = ({
    array,
    setArray,
    label,
    placeholder,
  }: {
    array: string[];
    setArray: (items: string[]) => void;
    label: string;
    placeholder: string;
  }) => {
    const [inputValue, setInputValue] = useState("");

    return (
      <div className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem(array, setArray, inputValue);
                setInputValue("");
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              addArrayItem(array, setArray, inputValue);
              setInputValue("");
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {array.map((item, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeArrayItem(array, setArray, index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {program
              ? isArabic
                ? "تعديل البرنامج"
                : "Edit Program"
              : isArabic
              ? "إضافة برنامج جديد"
              : "Add New Program"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6 pb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="arabic">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="english" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information (English)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="titleEn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder={t.titleEn} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="descriptionEn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description *</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder={t.descriptionEn}
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="aboutEn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder={t.aboutEn}
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="implementationLocationEn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Implementation Location</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t.implementationLocationEn}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slugEn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t.slugEn}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <ArrayFieldManager
                        array={goalsEn}
                        setArray={setGoalsEn}
                        label="Goals"
                        placeholder={t.goalsEn}
                      />

                      <ArrayFieldManager
                        array={keywordsEn}
                        setArray={setKeywordsEn}
                        label="Keywords"
                        placeholder={t.keywordsEn}
                      />

                      <ArrayFieldManager
                        array={tagsEn}
                        setArray={setTagsEn}
                        label="Tags"
                        placeholder={t.tagsEn}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="arabic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>المعلومات الأساسية (العربية)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="titleAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>العنوان *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t.titleAr}
                                dir="rtl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="descriptionAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الوصف *</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder={t.descriptionAr}
                                rows={4}
                                dir="rtl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="aboutAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>حول البرنامج</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder={t.aboutAr}
                                rows={3}
                                dir="rtl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="implementationLocationAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>مكان التنفيذ</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t.implementationLocationAr}
                                dir="rtl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slugAr"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الرابط *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t.slugAr}
                                dir="rtl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <ArrayFieldManager
                        array={goalsAr}
                        setArray={setGoalsAr}
                        label="الأهداف"
                        placeholder={t.goalsAr}
                      />

                      <ArrayFieldManager
                        array={keywordsAr}
                        setArray={setKeywordsAr}
                        label="الكلمات المفتاحية"
                        placeholder={t.keywordsAr}
                      />

                      <ArrayFieldManager
                        array={tagsAr}
                        setArray={setTagsAr}
                        label="العلامات"
                        placeholder={t.tagsAr}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Separator />

              {/* JSONB Fields Section */}
              <div className="space-y-6">
                {/* Statistics Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "الإحصائيات" : "Statistics"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {staticsFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            {isArabic ? `إحصائية ${index + 1}` : `Statistic ${index + 1}`}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeStatic(index)}
                          >
                            <Minus className="w-4 h-4" />
                            {isArabic ? "حذف" : "Remove"}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`statics.${index}.titleEn`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "العنوان (إنجليزي)" : "Title (English)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Statistic title" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`statics.${index}.titleAr`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "العنوان (عربي)" : "Title (Arabic)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="عنوان الإحصائية" dir="rtl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`statics.${index}.value`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "القيمة" : "Value"}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="number" 
                                    placeholder="1000" 
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`statics.${index}.icon`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الأيقونة" : "Icon"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="icon-name" />
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
                      onClick={() => appendStatic({ 
                        titleEn: "", 
                        titleAr: "", 
                        value: 0, 
                        icon: ""
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isArabic ? "إضافة إحصائية" : "Add Statistic"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Funding Providers Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "مقدمو التمويل" : "Funding Providers"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {fundingProvidersFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            {isArabic ? `مقدم تمويل ${index + 1}` : `Funding Provider ${index + 1}`}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFundingProvider(index)}
                          >
                            <Minus className="w-4 h-4" />
                            {isArabic ? "حذف" : "Remove"}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`fundingProviders.${index}.nameEn`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الاسم (إنجليزي)" : "Name (English)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Provider name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`fundingProviders.${index}.nameAr`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الاسم (عربي)" : "Name (Arabic)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="اسم مقدم التمويل" dir="rtl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`fundingProviders.${index}.imageUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "رابط الصورة" : "Image URL"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="https://example.com/logo.jpg" />
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
                      onClick={() => appendFundingProvider({ 
                        nameEn: "", 
                        nameAr: "", 
                        imageUrl: "" 
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isArabic ? "إضافة مقدم تمويل" : "Add Funding Provider"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Donors Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "المتبرعون" : "Donors"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {donorsFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            {isArabic ? `متبرع ${index + 1}` : `Donor ${index + 1}`}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeDonor(index)}
                          >
                            <Minus className="w-4 h-4" />
                            {isArabic ? "حذف" : "Remove"}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`donors.${index}.nameEn`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الاسم (إنجليزي)" : "Name (English)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Donor name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`donors.${index}.nameAr`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الاسم (عربي)" : "Name (Arabic)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="اسم المتبرع" dir="rtl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`donors.${index}.imageUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "رابط الصورة" : "Image URL"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="https://example.com/logo.jpg" />
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
                      onClick={() => appendDonor({ 
                        nameEn: "", 
                        nameAr: "", 
                        imageUrl: "" 
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isArabic ? "إضافة متبرع" : "Add Donor"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Partners Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "الشركاء" : "Partners"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {partnersFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            {isArabic ? `شريك ${index + 1}` : `Partner ${index + 1}`}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePartner(index)}
                          >
                            <Minus className="w-4 h-4" />
                            {isArabic ? "حذف" : "Remove"}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`partners.${index}.nameEn`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الاسم (إنجليزي)" : "Name (English)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Partner name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`partners.${index}.nameAr`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "الاسم (عربي)" : "Name (Arabic)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="اسم الشريك" dir="rtl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`partners.${index}.imageUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "رابط الصورة" : "Image URL"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="https://example.com/logo.jpg" />
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
                      onClick={() => appendPartner({ 
                        nameEn: "", 
                        nameAr: "", 
                        imageUrl: "" 
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isArabic ? "إضافة شريك" : "Add Partner"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Slides Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "الشرائح" : "Slides"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {slidesFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            {isArabic ? `شريحة ${index + 1}` : `Slide ${index + 1}`}
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSlide(index)}
                          >
                            <Minus className="w-4 h-4" />
                            {isArabic ? "حذف" : "Remove"}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`slides.${index}.titleEn`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "العنوان (إنجليزي)" : "Title (English)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Slide title" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`slides.${index}.titleAr`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "العنوان (عربي)" : "Title (Arabic)"}
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="عنوان الشريحة" dir="rtl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`slides.${index}.imageUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {isArabic ? "رابط الصورة" : "Image URL"}
                                </FormLabel>
                                <FormControl>
                                  <div className="space-y-2">
                                    <Input {...field} placeholder="https://example.com/image.jpg" />
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const url = await handleImageUpload(file);
                                            if (url) {
                                              field.onChange(url);
                                            }
                                          }
                                        }}
                                        className="hidden"
                                        id={`slide-upload-${index}`}
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          document.getElementById(`slide-upload-${index}`)?.click();
                                        }}
                                        disabled={uploadingImage}
                                      >
                                        {uploadingImage ? (
                                          <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                          <Upload className="w-4 h-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
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
                      onClick={() => appendSlide({ 
                        titleEn: "", 
                        titleAr: "", 
                        imageUrl: "" 
                      })}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isArabic ? "إضافة شريحة" : "Add Slide"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Settings and Media Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "الإعدادات" : "Settings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{isArabic ? "الأيقونة" : "Icon"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t.iconName}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{isArabic ? "اللون" : "Color"}</FormLabel>
                          <FormControl>
                            <Input {...field} type="color" className="w-20 h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="isPublished"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-y-0 gap-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!m-0">
                              {isArabic ? "منشور" : "Published"}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="includeInSitemapEn"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-y-0 gap-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!m-0">
                              {isArabic ? "تضمين في الخريطة (إنجليزي)" : "Include in Sitemap (EN)"}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="includeInSitemapAr"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-y-0 gap-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!m-0">
                              {isArabic ? "تضمين في الخريطة (عربي)" : "Include in Sitemap (AR)"}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isArabic ? "الصورة المميزة" : "Featured Image"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="featuredImageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isArabic ? "رابط الصورة أو رفع صورة" : "Image URL or Upload"}
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input
                                {...field}
                                placeholder={t.featuredImageUrl}
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await handleImageUpload(file);
                                      if (url) {
                                        field.onChange(url);
                                      }
                                    }
                                  }}
                                  className="hidden"
                                  id="featured-image-upload"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    document
                                      .getElementById("featured-image-upload")
                                      ?.click();
                                  }}
                                  disabled={uploadingImage}
                                >
                                  {uploadingImage ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Upload className="w-4 h-4" />
                                  )}
                                  <span className="ml-2">
                                    {isArabic ? "رفع صورة" : "Upload Image"}
                                  </span>
                                </Button>
                              </div>
                              {field.value && (
                                <div className="mt-2">
                                  <img
                                    src={field.value}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded border"
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

                </div>
              </ScrollArea>
              
              <DialogFooter className="flex-shrink-0 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {isArabic ? "جاري الحفظ..." : "Saving..."}
                    </>
                  ) : program ? (
                    isArabic ? "تحديث" : "Update"
                  ) : (
                    isArabic ? "إنشاء" : "Create"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
