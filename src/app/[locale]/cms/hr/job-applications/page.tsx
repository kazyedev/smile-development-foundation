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
  RefreshCw, 
  Edit2, 
  Trash2, 
  Search,
  Loader2 
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface JobApplicationListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobId: number;
  jobTitle: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "hired";
  appliedAt: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "reviewing", label: "Reviewing" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
] as const;

const STATUS_OPTIONS_AR = [
  { value: "all", label: "جميع الحالات" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "reviewing", label: "قيد المراجعة" },
  { value: "shortlisted", label: "قائمة المرشحين" },
  { value: "rejected", label: "مرفوض" },
  { value: "hired", label: "تم التوظيف" },
] as const;

export default function JobApplicationsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [applications, setApplications] = useState<JobApplicationListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "status" | "appliedAt">("appliedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "Job Applications",
      description: "Manage job applications, candidate profiles, and hiring process",
      refresh: "Refresh",
      searchPlaceholder: "Search by name, email, or phone...",
      itemsSelected: "item(s) selected",
      id: "ID",
      name: "Name",
      email: "Email",
      jobTitle: "Job Title",
      status: "Status",
      appliedDate: "Applied Date",
      actions: "Actions",
      loading: "Loading applications...",
      noResults: "No applications found matching your search.",
      noApplications: "No applications found.",
      pending: "Pending",
      reviewing: "Reviewing",
      shortlisted: "Shortlisted",
      rejected: "Rejected",
      hired: "Hired",
      deleteTitle: "Delete Application",
      deleteDescription: "Are you sure you want to delete this application? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Application deleted successfully",
      deleteFailed: "Failed to delete application",
      fetchFailed: "Failed to fetch applications",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Applications",
      bulkDeleteDescription: "Are you sure you want to delete the selected applications? This action cannot be undone.",
      bulkDeleteSuccess: "Selected applications deleted successfully",
      bulkDeleteFailed: "Failed to delete selected applications",
      filterStatus: "Filter by Status",
    },
    ar: {
      title: "طلبات التوظيف",
      description: "إدارة طلبات التوظيف وملفات المرشحين وعملية التوظيف",
      refresh: "تحديث",
      searchPlaceholder: "البحث بالاسم أو البريد الإلكتروني أو الهاتف...",
      itemsSelected: "عنصر محدد",
      id: "الرقم التعريفي",
      name: "الاسم",
      email: "البريد الإلكتروني",
      jobTitle: "المسمى الوظيفي",
      status: "الحالة",
      appliedDate: "تاريخ التقديم",
      actions: "الإجراءات",
      loading: "جاري تحميل الطلبات...",
      noResults: "لم يتم العثور على طلبات تطابق بحثك.",
      noApplications: "لم يتم العثور على طلبات.",
      pending: "قيد الانتظار",
      reviewing: "قيد المراجعة",
      shortlisted: "قائمة المرشحين",
      rejected: "مرفوض",
      hired: "تم التوظيف",
      deleteTitle: "حذف الطلب",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف الطلب بنجاح",
      deleteFailed: "فشل في حذف الطلب",
      fetchFailed: "فشل في جلب الطلبات",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف الطلبات المحددة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف الطلبات المحددة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف الطلبات المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف الطلبات المحددة",
      filterStatus: "التصفية حسب الحالة",
    }
  };

  const text = isArabic ? t.ar : t.en;
  const statusOptions = isArabic ? STATUS_OPTIONS_AR : STATUS_OPTIONS;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "reviewing":
        return "default";
      case "shortlisted":
        return "default";
      case "rejected":
        return "destructive";
      case "hired":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "reviewing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "shortlisted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "hired":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      default:
        return "";
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      // Only add status filter if it's not "all"
      if (statusFilter && statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      
      const qs = params.toString();
      const response = await fetch(`/api/cms/job-applications${qs ? `?${qs}` : ""}`);
      const data = await response.json();
      
      if (response.ok) {
        setApplications(data.items || []);
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
      const response = await fetch(`/api/cms/job-applications/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setApplications(prev => prev.filter(a => a.id !== id));
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
      const response = await fetch("/api/cms/job-applications/bulk-delete", {
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
        setApplications(prev => prev.filter(a => !selectedIds.has(a.id)));
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
      setSelectedIds(new Set(applications.map(a => a.id)));
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
    fetchApplications();
  }, [searchQuery, statusFilter]);

  // Client-side sorting
  const sortedApplications = [...applications].sort((a, b) => {
    let aVal: any, bVal: any;
    
    if (sortBy === "name") {
      aVal = a.name.toLowerCase();
      bVal = b.name.toLowerCase();
    } else if (sortBy === "status") {
      aVal = a.status;
      bVal = b.status;
    } else if (sortBy === "appliedAt") {
      aVal = new Date(a.appliedAt).getTime();
      bVal = new Date(b.appliedAt).getTime();
    } else {
      return 0;
    }
    
    if (sortOrder === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  const allSelected = applications.length > 0 && selectedIds.size === applications.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < applications.length;

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
            onClick={fetchApplications}
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
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                />
              </TableHead>
              <TableHead className="w-16">{text.id}</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("name")}
              >
                {text.name}
              </TableHead>
              <TableHead>{text.email}</TableHead>
              <TableHead>{text.jobTitle}</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("status")}
              >
                {text.status}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("appliedAt")}
              >
                {text.appliedDate}
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
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {searchQuery || (statusFilter && statusFilter !== "all") ? text.noResults : text.noApplications}
                </TableCell>
              </TableRow>
            ) : (
              sortedApplications.map((application) => (
                <TableRow key={application.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(application.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(application.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{application.id}</TableCell>
                  <TableCell className="font-medium">{application.name}</TableCell>
                  <TableCell className="text-sm">{application.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{application.jobTitle || `Job #${application.jobId}`}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusBadgeVariant(application.status)}
                      className={getStatusColor(application.status)}
                    >
                      {application.status === "pending" && text.pending}
                      {application.status === "reviewing" && text.reviewing}
                      {application.status === "shortlisted" && text.shortlisted}
                      {application.status === "rejected" && text.rejected}
                      {application.status === "hired" && text.hired}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/hr/job-applications/${application.id}/edit`}>
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
                        onClick={() => setDeleteId(application.id)}
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
