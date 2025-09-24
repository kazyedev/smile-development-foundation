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
import type { Program } from "@/lib/db/schema/programs";

interface ProgramListItem {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  include_in_sitemap_en: boolean;
  include_in_sitemap_ar: boolean;
  page_views: number;
  created_at: string;
}

export default function ProgramsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
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
      title: "Programs",
      description: "Manage foundation programs and initiatives",
      sort: "Sort",
      refresh: "Refresh",
      addProgram: "Add Program",
      searchPlaceholder: "Search programs...",
      itemsSelected: "item(s) selected",
      id: "ID",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      status: "Status",
      views: "Views",
      created: "Created",
      actions: "Actions",
      loading: "Loading programs...",
      noResults: "No programs found matching your search.",
      noPrograms: "No programs found.",
      published: "Published",
      draft: "Draft",
      deleteTitle: "Delete Program",
      deleteDescription: "Are you sure you want to delete this program? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Program deleted successfully",
      deleteFailed: "Failed to delete program",
      fetchFailed: "Failed to fetch programs",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Programs",
      bulkDeleteDescription: "Are you sure you want to delete the selected programs? This action cannot be undone.",
      bulkDeleteSuccess: "Selected programs deleted successfully",
      bulkDeleteFailed: "Failed to delete selected programs"
    },
    ar: {
      title: "البرامج",
      description: "إدارة برامج ومبادرات المؤسسة",
      sort: "ترتيب",
      refresh: "تحديث",
      addProgram: "إضافة برنامج",
      searchPlaceholder: "البحث في البرامج...",
      itemsSelected: "عنصر محدد",
      id: "الرقم التعريفي",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      status: "الحالة",
      views: "المشاهدات",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل البرامج...",
      noResults: "لم يتم العثور على برامج تطابق بحثك.",
      noPrograms: "لم يتم العثور على برامج.",
      published: "منشور",
      draft: "مسودة",
      deleteTitle: "حذف البرنامج",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا البرنامج؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف البرنامج بنجاح",
      deleteFailed: "فشل في حذف البرنامج",
      fetchFailed: "فشل في جلب البرامج",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف البرامج المحددة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف البرامج المحددة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف البرامج المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف البرامج المحددة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/cms/programs${qs}`);
      const data = await response.json();
      
      if (response.ok) {
        setPrograms(data.items || []);
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
      const response = await fetch(`/api/cms/programs/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setPrograms(prev => prev.filter(p => p.id !== id));
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
      const response = await fetch("/api/cms/programs/bulk-delete", {
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
        setPrograms(prev => prev.filter(p => !selectedIds.has(p.id)));
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
      setSelectedIds(new Set(programs.map(p => p.id)));
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
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [searchQuery]);

  // Client-side sorting
  const sortedPrograms = [...programs].sort((a, b) => {
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

  const allSelected = programs.length > 0 && selectedIds.size === programs.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < programs.length;

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
            onClick={fetchPrograms}
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
          
          <Link href={`/${locale}/cms/programs/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addProgram}</span>
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
                    if (el) el.indeterminate = someSelected;
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
            ) : programs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? text.noResults : text.noPrograms}
                </TableCell>
              </TableRow>
            ) : (
              sortedPrograms.map((program) => (
                <TableRow key={program.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(program.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(program.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium">
                    {isArabic ? program.title_ar : program.title_en}
                  </TableCell>
                  <TableCell>
                    <Badge variant={program.is_published ? "default" : "secondary"}>
                      {program.is_published ? text.published : text.draft}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.page_views || 0}</TableCell>
                  <TableCell>
                    {new Date(program.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/programs/${program.id}/edit`}>
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
                        onClick={() => setDeleteId(program.id)}
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
