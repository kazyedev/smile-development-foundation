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
import type { Job } from "@/lib/db/schema/jobs";

interface JobListItem {
  id: number;
  title_en: string | null;
  title_ar: string | null;
  department_en: string | null;
  department_ar: string | null;
  type: string;
  location_en: string | null;
  location_ar: string | null;
  is_published: boolean;
  urgent: boolean;
  created_at: string;
}

export default function JobsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "department" | "type" | "created_at">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkDeleting, setBulkDeleting] = useState(false);


  // Translations
  const t = {
    en: {
      title: "Jobs",
      description: "Manage job postings, career opportunities, and positions",
      sort: "Sort",
      refresh: "Refresh",
      addJob: "Add Job",
      searchPlaceholder: "Search jobs...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      department: "Department",
      type: "Type",
      location: "Location",
      status: "Status",
      created: "Created",
      actions: "Actions",
      loading: "Loading jobs...",
      noResults: "No jobs found matching your search.",
      noJobs: "No jobs found.",
      published: "Published",
      draft: "Draft",
      urgent: "Urgent",
      fullTime: "Full-time",
      partTime: "Part-time",
      contract: "Contract",
      internship: "Internship",
      volunteer: "Volunteer",
      deleteTitle: "Delete Job",
      deleteDescription: "Are you sure you want to delete this job? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Job deleted successfully",
      deleteFailed: "Failed to delete job",
      fetchFailed: "Failed to fetch jobs",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Jobs",
      bulkDeleteDescription: "Are you sure you want to delete the selected jobs? This action cannot be undone.",
      bulkDeleteSuccess: "Selected jobs deleted successfully",
      bulkDeleteFailed: "Failed to delete selected jobs"
    },
    ar: {
      title: "الوظائف",
      description: "إدارة الإعلانات الوظيفية وفرص العمل والمناصب",
      sort: "ترتيب",
      refresh: "تحديث",
      addJob: "إضافة وظيفة",
      searchPlaceholder: "البحث في الوظائف...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      department: "القسم",
      type: "النوع",
      location: "الموقع",
      status: "الحالة",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الوظائف...",
      noResults: "لم يتم العثور على وظائف تطابق بحثك.",
      noJobs: "لم يتم العثور على وظائف.",
      published: "منشور",
      draft: "مسودة",
      urgent: "عاجل",
      fullTime: "دوام كامل",
      partTime: "دوام جزئي",
      contract: "عقد",
      internship: "تدريب",
      volunteer: "تطوع",
      deleteTitle: "حذف الوظيفة",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الوظيفة؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف الوظيفة بنجاح",
      deleteFailed: "فشل في حذف الوظيفة",
      fetchFailed: "فشل في جلب الوظائف",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف الوظائف المحددة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف الوظائف المحددة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف الوظائف المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف الوظائف المحددة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "full-time":
        return text.fullTime;
      case "part-time":
        return text.partTime;
      case "contract":
        return text.contract;
      case "internship":
        return text.internship;
      case "volunteer":
        return text.volunteer;
      default:
        return type;
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/cms/jobs${qs}`);
      const data = await response.json();
      
      if (response.ok) {
        setJobs(data.items || []);
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
      const response = await fetch(`/api/cms/jobs/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setJobs(prev => prev.filter(j => j.id !== id));
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
      const response = await fetch("/api/cms/jobs/bulk-delete", {
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
        setJobs(prev => prev.filter(j => !selectedIds.has(j.id)));
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
      setSelectedIds(new Set(jobs.map(j => j.id)));
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

  const handleSort = (column: "title" | "department" | "type" | "created_at") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery]);

  // Client-side sorting
  const sortedJobs = [...jobs].sort((a, b) => {
    let aVal: any, bVal: any;
    
    if (sortBy === "title") {
      aVal = (isArabic ? a.title_ar : a.title_en) || "";
      bVal = (isArabic ? b.title_ar : b.title_en) || "";
    } else if (sortBy === "department") {
      aVal = (isArabic ? a.department_ar : a.department_en) || "";
      bVal = (isArabic ? b.department_ar : b.department_en) || "";
    } else if (sortBy === "type") {
      aVal = a.type;
      bVal = b.type;
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

  const allSelected = jobs.length > 0 && selectedIds.size === jobs.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < jobs.length;

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
            onClick={fetchJobs}
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
          
          <Link href={`/${locale}/cms/hr/jobs/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addJob}</span>
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
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("department")}
              >
                {text.department}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("type")}
              >
                {text.type}
              </TableHead>
              <TableHead>{text.location}</TableHead>
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
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? text.noResults : text.noJobs}
                </TableCell>
              </TableRow>
            ) : (
              sortedJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(job.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(job.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium">
                    <div className="flex items-center gap-2">
                      {isArabic ? job.title_ar : job.title_en}
                      {job.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          {text.urgent}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {isArabic ? job.department_ar : job.department_en || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getTypeLabel(job.type)}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {isArabic ? job.location_ar : job.location_en || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.is_published ? "default" : "secondary"}>
                      {job.is_published ? text.published : text.draft}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(job.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/hr/jobs/${job.id}/edit`}>
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
                        onClick={() => setDeleteId(job.id)}
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
