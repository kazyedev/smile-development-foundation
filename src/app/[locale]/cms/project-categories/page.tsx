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
import type { ProjectCategory } from "@/lib/db/schema/projectCategories";

interface ProjectCategoryListItem {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  page_views: number;
  created_at: string;
}

export default function ProjectCategoriesPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [categories, setCategories] = useState<ProjectCategoryListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "page_views" | "created_at">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkDeleting, setBulkDeleting] = useState(false);


  // Translations
  const t = {
    en: {
      title: "Project Categories",
      description: "Manage project categories and classifications",
      sort: "Sort",
      refresh: "Refresh",
      addCategory: "Add Category",
      searchPlaceholder: "Search categories...",
      itemsSelected: "item(s) selected",
      id: "ID",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      status: "Status",
      views: "Views",
      created: "Created",
      actions: "Actions",
      loading: "Loading categories...",
      noResults: "No categories found matching your search.",
      noCategories: "No categories found.",
      published: "Published",
      draft: "Draft",
      deleteTitle: "Delete Category",
      deleteDescription: "Are you sure you want to delete this category? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Category deleted successfully",
      deleteFailed: "Failed to delete category",
      fetchFailed: "Failed to fetch categories",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Categories",
      bulkDeleteDescription: "Are you sure you want to delete the selected categories? This action cannot be undone.",
      bulkDeleteSuccess: "Selected categories deleted successfully",
      bulkDeleteFailed: "Failed to delete selected categories"
    },
    ar: {
      title: "فئات المشاريع",
      description: "إدارة فئات وتصنيفات المشاريع",
      sort: "ترتيب",
      refresh: "تحديث",
      addCategory: "إضافة فئة",
      searchPlaceholder: "البحث في الفئات...",
      itemsSelected: "عنصر محدد",
      id: "الرقم التعريفي",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      status: "الحالة",
      views: "المشاهدات",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الفئات...",
      noResults: "لم يتم العثور على فئات تطابق بحثك.",
      noCategories: "لم يتم العثور على فئات.",
      published: "منشور",
      draft: "مسودة",
      deleteTitle: "حذف الفئة",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الفئة؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف الفئة بنجاح",
      deleteFailed: "فشل في حذف الفئة",
      fetchFailed: "فشل في جلب الفئات",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف الفئات المحددة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف الفئات المحددة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف الفئات المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف الفئات المحددة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/cms/project-categories${qs}`);
      const data = await response.json();
      
      if (response.ok) {
        setCategories(data.items || []);
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
      const response = await fetch(`/api/cms/project-categories/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setCategories(prev => prev.filter(c => c.id !== id));
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
      const response = await fetch("/api/cms/project-categories/bulk-delete", {
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
        setCategories(prev => prev.filter(c => !selectedIds.has(c.id)));
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
      setSelectedIds(new Set(categories.map(c => c.id)));
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

  const handleSort = (column: "title" | "page_views" | "created_at") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchQuery]);

  // Client-side sorting
  const sortedCategories = [...categories].sort((a, b) => {
    let aVal: any, bVal: any;
    
    if (sortBy === "title") {
      aVal = isArabic ? a.title_ar : a.title_en;
      bVal = isArabic ? b.title_ar : b.title_en;
    } else if (sortBy === "page_views") {
      aVal = a.page_views || 0;
      bVal = b.page_views || 0;
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

  const allSelected = categories.length > 0 && selectedIds.size === categories.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < categories.length;

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
            onClick={fetchCategories}
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
          
          <Link href={`/${locale}/cms/project-categories/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addCategory}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
          <Input
            placeholder={text.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={isArabic ? "pr-10" : "pl-10"}
          />
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
                  ref={(el) => {
                    if (el) {
                      const input = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
                      if (input) input.indeterminate = someSelected;
                    }
                  }}
                />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("title")}
              >
                {isArabic ? text.titleAr : text.titleEn}
              </TableHead>
              <TableHead>{text.status}</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("page_views")}
              >
                {text.views}
              </TableHead>
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
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{text.loading}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? text.noResults : text.noCategories}
                </TableCell>
              </TableRow>
            ) : (
              sortedCategories.map((category) => (
                <TableRow key={category.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(category.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(category.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium">
                    {isArabic ? category.title_ar : category.title_en}
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.is_published ? "default" : "secondary"}>
                      {category.is_published ? text.published : text.draft}
                    </Badge>
                  </TableCell>
                  <TableCell>{category.page_views || 0}</TableCell>
                  <TableCell>
                    {new Date(category.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/project-categories/${category.id}/edit`}>
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
                        onClick={() => setDeleteId(category.id)}
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
