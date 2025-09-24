"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Image,
  Loader2,
} from "lucide-react";

type ImageItem = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  views: number;
  created_at: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  url: string;
  photographer?: string;
};

export default function ImagesPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  // Translations
  const t = {
    en: {
      title: "Images",
      description: "Manage image content and visual resources",
      refresh: "Refresh",
      addImage: "Add Image",
      searchPlaceholder: "Search images...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      status: "Status",
      views: "Views",
      size: "Size",
      dimensions: "Dimensions",
      photographer: "Photographer",
      created: "Created",
      actions: "Actions",
      loading: "Loading images...",
      noResults: "No images found matching your search.",
      noImages: "No images found.",
      noImagesDescription: "Start by adding your first image.",
      published: "Published",
      draft: "Draft",
      selectedCount: "selected",
      deleteSelected: "Delete Selected",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteTitle: "Delete Image",
      deleteDescription: "Are you sure you want to delete this image? This action cannot be undone.",
      bulkDeleteTitle: "Delete Images",
      bulkDeleteDescription: "Are you sure you want to delete these images? This action cannot be undone.",
      deleteSuccess: "Image deleted successfully",
      deleteFailed: "Failed to delete image",
      bulkDeleteSuccess: "Images deleted successfully",
      bulkDeleteFailed: "Failed to delete images",
      fetchError: "Failed to fetch images"
    },
    ar: {
      title: "الصور",
      description: "إدارة محتوى الصور والموارد البصرية",
      refresh: "تحديث",
      addImage: "إضافة صورة",
      searchPlaceholder: "البحث في الصور...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      status: "الحالة",
      views: "المشاهدات",
      size: "الحجم",
      dimensions: "الأبعاد",
      photographer: "المصور",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الصور...",
      noResults: "لم يتم العثور على صور تطابق بحثك.",
      noImages: "لم يتم العثور على صور.",
      noImagesDescription: "ابدأ بإضافة أول صورة لك.",
      published: "منشور",
      draft: "مسودة",
      selectedCount: "محدد",
      deleteSelected: "حذف المحدد",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      deleteTitle: "حذف الصورة",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteTitle: "حذف الصور",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الصور؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteSuccess: "تم حذف الصورة بنجاح",
      deleteFailed: "فشل في حذف الصورة",
      bulkDeleteSuccess: "تم حذف الصور بنجاح",
      bulkDeleteFailed: "فشل في حذف الصور",
      fetchError: "فشل في جلب الصور"
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch images
  const fetchImages = async () => {
    try {
      const url = new URL("/api/cms/images", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      
      const result = await response.json();
      setImages(result.items || []);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error(text.fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [searchTerm]);

  // Handle single image delete
  const handleDeleteImage = async (imageId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cms/images/${imageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      toast.success(text.deleteSuccess);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(text.deleteFailed);
    } finally {
      setIsDeleting(false);
      setImageToDelete(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/cms/images/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedImages }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete images");
      }

      toast.success(text.bulkDeleteSuccess);
      setSelectedImages([]);
      fetchImages();
    } catch (error) {
      console.error("Error deleting images:", error);
      toast.error(text.bulkDeleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle image selection
  const handleImageSelect = (imageId: number, checked: boolean) => {
    if (checked) {
      setSelectedImages([...selectedImages, imageId]);
    } else {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImages(images.map(image => image.id));
    } else {
      setSelectedImages([]);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isArabic ? "text-right" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{text.title}</CardTitle>
                  <CardDescription>{text.description}</CardDescription>
                </div>
                <Button
                  onClick={() => router.push(`/${locale}/cms/media/images/new`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {text.addImage}
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={text.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={fetchImages}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {text.refresh}
                </Button>
              </div>
              
              {selectedImages.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedImages.length} {text.selectedCount}
                  </span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" disabled={isDeleting}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {text.deleteSelected}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{text.bulkDeleteTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {text.bulkDeleteDescription}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{text.cancel}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleBulkDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {text.delete}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Images Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{text.noImages}</p>
                <p className="text-sm">{text.noImagesDescription}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedImages.length === images.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>{text.titleEn}</TableHead>
                    <TableHead>{text.status}</TableHead>
                    <TableHead>{text.views}</TableHead>
                    <TableHead>{text.size}</TableHead>
                    <TableHead>{text.dimensions}</TableHead>
                    <TableHead>{text.photographer}</TableHead>
                    <TableHead>{text.created}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {images.map((image) => (
                    <TableRow key={image.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedImages.includes(image.id)}
                          onCheckedChange={(checked) => handleImageSelect(image.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {isArabic ? image.title_ar : image.title_en}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? image.title_en : image.title_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={image.is_published ? "default" : "secondary"}>
                          {image.is_published ? text.published : text.draft}
                        </Badge>
                      </TableCell>
                      <TableCell>{image.views.toLocaleString()}</TableCell>
                      <TableCell>{formatFileSize(image.size)}</TableCell>
                      <TableCell>{image.width} × {image.height}</TableCell>
                      <TableCell>{image.photographer || "-"}</TableCell>
                      <TableCell>
                        {new Date(image.created_at).toLocaleDateString(locale)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => window.open(image.url, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              {text.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/${locale}/cms/media/images/${image.id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {text.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setImageToDelete(image.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {text.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={imageToDelete !== null} onOpenChange={() => setImageToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{text.deleteTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {text.deleteDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{text.cancel}</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => imageToDelete && handleDeleteImage(imageToDelete)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {text.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
