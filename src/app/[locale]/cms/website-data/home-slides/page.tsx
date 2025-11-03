"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Search,
  Loader2 
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

interface HeroSlideListItem {
  id: number;
  title_en: string;
  title_ar: string;
  featured_image_url: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "true", label: "Published" },
  { value: "false", label: "Draft" },
] as const;

const STATUS_OPTIONS_AR = [
  { value: "all", label: "جميع الحالات" },
  { value: "true", label: "منشور" },
  { value: "false", label: "مسودة" },
] as const;

export default function HomeSlidesPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [slides, setSlides] = useState<HeroSlideListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"title" | "sort_order" | "created_at">("sort_order");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Home Page Slides",
      description: "Manage homepage carousel slides and hero content",
      refresh: "Refresh",
      addSlide: "Add Slide",
      searchPlaceholder: "Search slides...",
      itemsSelected: "item(s) selected",
      id: "ID",
      columnTitle: "Title",
      image: "Image",
      status: "Status",
      sortOrder: "Sort Order",
      created: "Created",
      actions: "Actions",
      loading: "Loading slides...",
      noResults: "No slides found matching your search.",
      noSlides: "No slides found.",
      published: "Published",
      draft: "Draft",
      deleteTitle: "Delete Slide",
      deleteDescription: "Are you sure you want to delete this slide? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Slide deleted successfully",
      deleteFailed: "Failed to delete slide",
      fetchFailed: "Failed to fetch slides",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Slides",
      bulkDeleteDescription: "Are you sure you want to delete the selected slides? This action cannot be undone.",
      bulkDeleteSuccess: "Selected slides deleted successfully",
      bulkDeleteFailed: "Failed to delete selected slides",
      filterStatus: "Filter by Status",
    },
    ar: {
      title: "شرائح الصفحة الرئيسية",
      description: "إدارة شرائح الصفحة الرئيسية والمحتوى",
      refresh: "تحديث",
      addSlide: "إضافة شريحة",
      searchPlaceholder: "البحث في الشرائح...",
      itemsSelected: "عنصر محدد",
      id: "الرقم التعريفي",
      columnTitle: "العنوان",
      image: "الصورة",
      status: "الحالة",
      sortOrder: "ترتيب العرض",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الشرائح...",
      noResults: "لم يتم العثور على شرائح تطابق بحثك.",
      noSlides: "لم يتم العثور على شرائح.",
      published: "منشور",
      draft: "مسودة",
      deleteTitle: "حذف الشريحة",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الشريحة؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف الشريحة بنجاح",
      deleteFailed: "فشل في حذف الشريحة",
      fetchFailed: "فشل في جلب الشرائح",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف الشرائح المحددة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف الشرائح المحددة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف الشرائح المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف الشرائح المحددة",
      filterStatus: "التصفية حسب الحالة",
    }
  };

  const text = isArabic ? t.ar : t.en;
  const statusOptions = isArabic ? STATUS_OPTIONS_AR : STATUS_OPTIONS;

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      // Only add status filter if it's not "all"
      if (statusFilter && statusFilter !== "all") {
        params.append("isPublished", statusFilter);
      }
      
      const qs = params.toString();
      const response = await fetch(`/api/cms/hero-slides${qs ? `?${qs}` : ""}`);
      const data = await response.json();
      
      if (response.ok) {
        setSlides(data.items || []);
      } else {
        toast.error(data.error || text.fetchFailed);
      }
    } catch (error) {
      toast.error(text.fetchFailed);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/cms/hero-slides/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setSlides(prev => prev.filter(s => s.id !== id));
        setSelectedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      } else {
        const data = await response.json();
        toast.error(data.error || text.deleteFailed);
      }
    } catch (error) {
      toast.error(text.deleteFailed);
      console.error(error);
    }
    setDeleteId(null);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    
    try {
      setBulkDeleting(true);
      const response = await fetch("/api/cms/hero-slides/bulk-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message || text.bulkDeleteSuccess);
        setSlides(prev => prev.filter(s => !selectedIds.has(s.id)));
        setSelectedIds(new Set());
      } else {
        throw new Error(result.error || text.bulkDeleteFailed);
      }
    } catch (error: any) {
      toast.error(error.message || text.bulkDeleteFailed);
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(slides.map(s => s.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedIds(newSet);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column as typeof sortBy);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchSlides();
  }, [searchQuery, statusFilter]);

  // Client-side sorting
  const sortedSlides = [...slides].sort((a, b) => {
    let aVal: any, bVal: any;
    
    if (sortBy === "title") {
      aVal = isArabic ? a.title_ar : a.title_en;
      bVal = isArabic ? b.title_ar : b.title_en;
    } else if (sortBy === "sort_order") {
      aVal = a.sort_order || 0;
      bVal = b.sort_order || 0;
    } else if (sortBy === "created_at") {
      aVal = new Date(a.created_at).getTime();
      bVal = new Date(b.created_at).getTime();
    } else {
      return 0;
    }
    
    if (sortOrder === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  const allSelected = slides.length > 0 && selectedIds.size === slides.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < slides.length;

  return (
    <div className="space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{text.title}</h1>
          <p className="text-muted-foreground mt-1">
            {text.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSlides}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{text.refresh}</span>
          </Button>
          
          <Link href={`/${locale}/cms/website-data/home-slides/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addSlide}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
          <Input
            placeholder={text.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={isArabic ? "pr-10" : "pl-10"}
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={text.filterStatus} />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {selectedIds.size} {text.itemsSelected}
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex items-center gap-2"
            >
              {bulkDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{text.bulkDelete}</span>
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">{text.id}</TableHead>
              <TableHead className="w-24">{text.image}</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("title")}
              >
                {text.columnTitle}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("sort_order")}
              >
                {text.sortOrder}
              </TableHead>
              <TableHead>{text.status}</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("created_at")}
              >
                {text.created}
              </TableHead>
              <TableHead className="w-24">{text.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{text.loading}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : slides.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {searchQuery || (statusFilter && statusFilter !== "all") ? text.noResults : text.noSlides}
                </TableCell>
              </TableRow>
            ) : (
              sortedSlides.map((slide) => (
                <TableRow key={slide.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(slide.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(slide.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{slide.id}</TableCell>
                  <TableCell>
                    <div className="w-16 h-10 relative rounded overflow-hidden bg-muted">
                      {slide.featured_image_url ? (
                        <Image
                          src={slide.featured_image_url}
                          alt={isArabic ? slide.title_ar : slide.title_en}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium">
                    {isArabic ? slide.title_ar : slide.title_en}
                  </TableCell>
                  <TableCell>{slide.sort_order || 0}</TableCell>
                  <TableCell>
                    <Badge variant={slide.is_published ? "default" : "secondary"}>
                      {slide.is_published ? text.published : text.draft}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(slide.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/website-data/home-slides/${slide.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(slide.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
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
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {text.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
