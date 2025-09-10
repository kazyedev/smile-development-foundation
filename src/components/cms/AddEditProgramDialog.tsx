"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  X, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  Palette,
  MapPin,
  Target,
  Tag,
  FileText,
  Users,
  DollarSign,
  Globe,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Program } from "@/types/program";

interface AddEditProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: number | null;
  initialValues?: Record<string, any>;
  locale: string;
  onSuccess: () => void;
}

export default function AddEditProgramDialog({
  open,
  onOpenChange,
  editingId,
  initialValues,
  locale,
  onSuccess
}: AddEditProgramDialogProps) {
  const isAr = locale === "ar";
  const isEditing = !!editingId;

  const t = {
    title: isEditing 
      ? (isAr ? "تعديل البرنامج" : "Edit Program")
      : (isAr ? "إضافة برنامج جديد" : "Add New Program"),
    description: isAr 
      ? "أدخل تفاصيل البرنامج والمعلومات المطلوبة"
      : "Enter program details and required information",
    save: isAr ? "حفظ" : "Save",
    saving: isAr ? "جاري الحفظ..." : "Saving...",
    cancel: isAr ? "إلغاء" : "Cancel",
    basic: isAr ? "أساسي" : "Basic",
    meta: isAr ? "بيانات وصفية" : "Meta",
    content: isAr ? "المحتوى" : "Content",
    lists: isAr ? "قوائم" : "Lists",
    locations: isAr ? "المواقع" : "Locations",
    media: isAr ? "الوسائط" : "Media",
    relations: isAr ? "العلاقات" : "Relations",
    settings: isAr ? "الإعدادات" : "Settings",
    titleEn: isAr ? "العنوان (إنجليزي)" : "Title (English)",
    titleAr: isAr ? "العنوان (عربي)" : "Title (Arabic)",
    descriptionEn: isAr ? "الوصف (إنجليزي)" : "Description (English)",
    descriptionAr: isAr ? "الوصف (عربي)" : "Description (Arabic)",
    aboutEn: isAr ? "حول البرنامج (إنجليزي)" : "About Program (English)",
    aboutAr: isAr ? "حول البرنامج (عربي)" : "About Program (Arabic)",
    slugEn: isAr ? "المعرف (إنجليزي)" : "Slug (English)",
    slugAr: isAr ? "المعرف (عربي)" : "Slug (Arabic)",
    icon: isAr ? "الأيقونة" : "Icon",
    color: isAr ? "اللون" : "Color",
    goals: isAr ? "الأهداف" : "Goals",
    keywords: isAr ? "الكلمات المفتاحية" : "Keywords",
    tags: isAr ? "الوسوم" : "Tags",
    implementationLocation: isAr ? "مكان التنفيذ" : "Implementation Location",
    featuredImage: isAr ? "الصورة الرئيسية" : "Featured Image",
    slides: isAr ? "الشرائح" : "Slides",
    statics: isAr ? "الإحصائيات" : "Statistics",
    fundingProviders: isAr ? "جهات التمويل" : "Funding Providers",
    donors: isAr ? "المانحون" : "Donors",
    partners: isAr ? "الشركاء" : "Partners",
    isPublished: isAr ? "منشور" : "Published",
    includeInSitemap: isAr ? "تضمين في خريطة الموقع" : "Include in Sitemap",
    addItem: isAr ? "إضافة عنصر" : "Add Item",
    removeItem: isAr ? "إزالة" : "Remove",
    uploadImage: isAr ? "رفع صورة" : "Upload Image",
    selectColor: isAr ? "اختر اللون" : "Select Color",
    success: isAr ? "تم الحفظ بنجاح" : "Saved successfully",
    error: isAr ? "حدث خطأ أثناء الحفظ" : "Error occurred while saving",
    required: isAr ? "مطلوب" : "Required",
    optional: isAr ? "اختياري" : "Optional"
  };

  // Form state
  const [formData, setFormData] = useState<Partial<Program>>({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    aboutEn: "",
    aboutAr: "",
    slugEn: "",
    slugAr: "",
    icon: "",
    color: "#3B82F6",
    goalsEn: [],
    goalsAr: [],
    keywordsEn: [],
    keywordsAr: [],
    tagsEn: [],
    tagsAr: [],
    implementationLocationEn: "",
    implementationLocationAr: "",
    featuredImageUrl: "",
    slides: [],
    statics: [],
    fundingProviders: [],
    donors: [],
    partners: [],
    isPublished: false,
    includeInSitemapEn: true,
    includeInSitemapAr: true,
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Initialize form with initial values
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  // Handle form input changes
  const handleInputChange = (field: keyof Program, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle array field changes
  const handleArrayChange = (field: keyof Program, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  // Add new item to array
  const addArrayItem = (field: keyof Program) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      return { ...prev, [field]: [...currentArray, ""] };
    });
  };

  // Remove item from array
  const removeArrayItem = (field: keyof Program, index: number) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      const newArray = currentArray.filter((_, i) => i !== index);
      return { ...prev, [field]: newArray };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId 
        ? `/api/cms/programs/${editingId}`
        : `/api/cms/programs`;
      
      const method = editingId ? "PATCH" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save program");
      }

      onSuccess();
      onOpenChange(false);
      setFormData({});
      setActiveTab("basic");
    } catch (error) {
      console.error("Error saving program:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate slug from title
  const generateSlug = (title: string, isEnglish: boolean) => {
    const field = isEnglish ? "slugEn" : "slugAr";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    handleInputChange(field, slug);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="basic">{t.basic}</TabsTrigger>
              <TabsTrigger value="meta">{t.meta}</TabsTrigger>
              <TabsTrigger value="content">{t.content}</TabsTrigger>
              <TabsTrigger value="lists">{t.lists}</TabsTrigger>
              <TabsTrigger value="locations">{t.locations}</TabsTrigger>
              <TabsTrigger value="media">{t.media}</TabsTrigger>
              <TabsTrigger value="relations">{t.relations}</TabsTrigger>
              <TabsTrigger value="settings">{t.settings}</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {t.basic}
                    </CardTitle>
                    <CardDescription>
                      {isAr ? "المعلومات الأساسية للبرنامج" : "Basic program information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="titleEn">
                          {t.titleEn} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="titleEn"
                          value={formData.titleEn || ""}
                          onChange={(e) => {
                            handleInputChange("titleEn", e.target.value);
                            generateSlug(e.target.value, true);
                          }}
                          placeholder={isAr ? "أدخل العنوان بالإنجليزية" : "Enter title in English"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleAr">
                          {t.titleAr} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="titleAr"
                          value={formData.titleAr || ""}
                          onChange={(e) => {
                            handleInputChange("titleAr", e.target.value);
                            generateSlug(e.target.value, false);
                          }}
                          placeholder={isAr ? "أدخل العنوان بالعربية" : "Enter title in Arabic"}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="descriptionEn">{t.descriptionEn}</Label>
                        <Textarea
                          id="descriptionEn"
                          value={formData.descriptionEn || ""}
                          onChange={(e) => handleInputChange("descriptionEn", e.target.value)}
                          placeholder={isAr ? "أدخل الوصف بالإنجليزية" : "Enter description in English"}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descriptionAr">{t.descriptionAr}</Label>
                        <Textarea
                          id="descriptionAr"
                          value={formData.descriptionAr || ""}
                          onChange={(e) => handleInputChange("descriptionAr", e.target.value)}
                          placeholder={isAr ? "أدخل الوصف بالعربية" : "Enter description in Arabic"}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aboutEn">{t.aboutEn}</Label>
                        <Textarea
                          id="aboutEn"
                          value={formData.aboutEn || ""}
                          onChange={(e) => handleInputChange("aboutEn", e.target.value)}
                          placeholder={isAr ? "أدخل معلومات حول البرنامج بالإنجليزية" : "Enter about program in English"}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aboutAr">{t.aboutAr}</Label>
                        <Textarea
                          id="aboutAr"
                          value={formData.aboutAr || ""}
                          onChange={(e) => handleInputChange("aboutAr", e.target.value)}
                          placeholder={isAr ? "أدخل معلومات حول البرنامج بالعربية" : "Enter about program in Arabic"}
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Meta Information Tab */}
            <TabsContent value="meta" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      {t.meta}
                    </CardTitle>
                    <CardDescription>
                      {isAr ? "المعرفات والبيانات الوصفية" : "Slugs and meta information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="slugEn">
                          {t.slugEn} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="slugEn"
                          value={formData.slugEn || ""}
                          onChange={(e) => handleInputChange("slugEn", e.target.value)}
                          placeholder="program-slug"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slugAr">
                          {t.slugAr} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="slugAr"
                          value={formData.slugAr || ""}
                          onChange={(e) => handleInputChange("slugAr", e.target.value)}
                          placeholder="معرف-البرنامج"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">{t.icon}</Label>
                        <Input
                          id="icon"
                          value={formData.icon || ""}
                          onChange={(e) => handleInputChange("icon", e.target.value)}
                          placeholder="🎯"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">{t.color}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="color"
                            type="color"
                            value={formData.color || "#3B82F6"}
                            onChange={(e) => handleInputChange("color", e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={formData.color || "#3B82F6"}
                            onChange={(e) => handleInputChange("color", e.target.value)}
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Lists Tab */}
            <TabsContent value="lists" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {t.lists}
                    </CardTitle>
                    <CardDescription>
                      {isAr ? "الأهداف والكلمات المفتاحية والوسوم" : "Goals, keywords, and tags"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Goals */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">{t.goals}</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem("goalsEn")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t.addItem}
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">English</Label>
                          {(formData.goalsEn || []).map((goal, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={goal}
                                onChange={(e) => handleArrayChange("goalsEn", index, e.target.value)}
                                placeholder="Enter goal"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("goalsEn", index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">العربية</Label>
                          {(formData.goalsAr || []).map((goal, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={goal}
                                onChange={(e) => handleArrayChange("goalsAr", index, e.target.value)}
                                placeholder="أدخل الهدف"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("goalsAr", index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Keywords */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">{t.keywords}</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem("keywordsEn")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t.addItem}
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">English</Label>
                          {(formData.keywordsEn || []).map((keyword, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={keyword}
                                onChange={(e) => handleArrayChange("keywordsEn", index, e.target.value)}
                                placeholder="Enter keyword"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("keywordsEn", index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">العربية</Label>
                          {(formData.keywordsAr || []).map((keyword, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={keyword}
                                onChange={(e) => handleArrayChange("keywordsAr", index, e.target.value)}
                                placeholder="أدخل الكلمة المفتاحية"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("keywordsAr", index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Tags */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">{t.tags}</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem("tagsEn")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t.addItem}
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">English</Label>
                          {(formData.tagsEn || []).map((tag, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={tag}
                                onChange={(e) => handleArrayChange("tagsEn", index, e.target.value)}
                                placeholder="Enter tag"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("tagsEn", index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">العربية</Label>
                          {(formData.tagsAr || []).map((tag, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={tag}
                                onChange={(e) => handleArrayChange("tagsAr", index, e.target.value)}
                                placeholder="أدخل الوسم"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("tagsAr", index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Locations Tab */}
            <TabsContent value="locations" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {t.locations}
                    </CardTitle>
                    <CardDescription>
                      {isAr ? "مواقع تنفيذ البرنامج" : "Program implementation locations"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="locationEn">{t.implementationLocation} (English)</Label>
                        <Input
                          id="locationEn"
                          value={formData.implementationLocationEn || ""}
                          onChange={(e) => handleInputChange("implementationLocationEn", e.target.value)}
                          placeholder="Enter implementation location"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="locationAr">{t.implementationLocation} (العربية)</Label>
                        <Input
                          id="locationAr"
                          value={formData.implementationLocationAr || ""}
                          onChange={(e) => handleInputChange("implementationLocationAr", e.target.value)}
                          placeholder="أدخل مكان التنفيذ"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {t.settings}
                    </CardTitle>
                    <CardDescription>
                      {isAr ? "إعدادات النشر والخريطة" : "Publishing and sitemap settings"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">{t.isPublished}</Label>
                        <p className="text-sm text-muted-foreground">
                          {isAr ? "هل البرنامج منشور ومتاح للجمهور؟" : "Is the program published and available to the public?"}
                        </p>
                      </div>
                      <Switch
                        checked={formData.isPublished || false}
                        onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-base">{t.includeInSitemap}</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">English</span>
                          <Switch
                            checked={formData.includeInSitemapEn || false}
                            onCheckedChange={(checked) => handleInputChange("includeInSitemapEn", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">العربية</span>
                          <Switch
                            checked={formData.includeInSitemapAr || false}
                            onCheckedChange={(checked) => handleInputChange("includeInSitemapAr", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Other tabs can be implemented similarly */}
            <TabsContent value="content" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Content</CardTitle>
                    <CardDescription>Additional content fields</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Content tab implementation coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Media</CardTitle>
                    <CardDescription>Images and slides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Media tab implementation coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="relations" className="space-y-4">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Relations</CardTitle>
                    <CardDescription>Partners, donors, and statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Relations tab implementation coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.saving}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
