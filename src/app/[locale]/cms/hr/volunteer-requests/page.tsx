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

interface VolunteerRequestListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: string;
  interests: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
] as const;

const STATUS_OPTIONS_AR = [
  { value: "all", label: "جميع الحالات" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "approved", label: "موافق عليه" },
  { value: "rejected", label: "مرفوض" },
] as const;

export default function VolunteerRequestsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [requests, setRequests] = useState<VolunteerRequestListItem[]>([]);
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
      title: "Volunteer Requests",
      description: "Manage volunteer applications, opportunities, and assignments",
      refresh: "Refresh",
      searchPlaceholder: "Search by name, email, or phone...",
      itemsSelected: "item(s) selected",
      id: "ID",
      name: "Name",
      email: "Email",
      phone: "Phone",
      age: "Age",
      interests: "Interests",
      status: "Status",
      appliedDate: "Applied Date",
      actions: "Actions",
      loading: "Loading requests...",
      noResults: "No requests found matching your search.",
      noRequests: "No requests found.",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      deleteTitle: "Delete Request",
      deleteDescription: "Are you sure you want to delete this request? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Request deleted successfully",
      deleteFailed: "Failed to delete request",
      fetchFailed: "Failed to fetch requests",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Requests",
      bulkDeleteDescription: "Are you sure you want to delete the selected requests? This action cannot be undone.",
      bulkDeleteSuccess: "Selected requests deleted successfully",
      bulkDeleteFailed: "Failed to delete selected requests",
      filterStatus: "Filter by Status",
    },
    ar: {
      title: "طلبات التطوع",
      description: "إدارة طلبات التطوع والفرص والمهام",
      refresh: "تحديث",
      searchPlaceholder: "البحث بالاسم أو البريد الإلكتروني أو الهاتف...",
      itemsSelected: "عنصر محدد",
      id: "الرقم التعريفي",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      age: "العمر",
      interests: "الاهتمامات",
      status: "الحالة",
      appliedDate: "تاريخ التقديم",
      actions: "الإجراءات",
      loading: "جاري تحميل الطلبات...",
      noResults: "لم يتم العثور على طلبات تطابق بحثك.",
      noRequests: "لم يتم العثور على طلبات.",
      pending: "قيد الانتظار",
      approved: "موافق عليه",
      rejected: "مرفوض",
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
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      // Only add status filter if it's not "all"
      if (statusFilter && statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      
      const qs = params.toString();
      const response = await fetch(`/api/cms/volunteer-requests${qs ? `?${qs}` : ""}`);
      const data = await response.json();
      
      if (response.ok) {
        setRequests(data.items || []);
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
      const response = await fetch(`/api/cms/volunteer-requests/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setRequests(prev => prev.filter(r => r.id !== id));
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
      const response = await fetch("/api/cms/volunteer-requests/bulk-delete", {
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
        setRequests(prev => prev.filter(r => !selectedIds.has(r.id)));
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
      setSelectedIds(new Set(requests.map(r => r.id)));
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
    fetchRequests();
  }, [searchQuery, statusFilter]);

  // Client-side sorting
  const sortedRequests = [...requests].sort((a, b) => {
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

  const allSelected = requests.length > 0 && selectedIds.size === requests.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < requests.length;

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
            onClick={fetchRequests}
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
              <TableHead>{text.phone}</TableHead>
              <TableHead>{text.age}</TableHead>
              <TableHead className="max-w-xs">{text.interests}</TableHead>
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
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{text.loading}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  {searchQuery || (statusFilter && statusFilter !== "all") ? text.noResults : text.noRequests}
                </TableCell>
              </TableRow>
            ) : (
              sortedRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(request.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(request.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{request.id}</TableCell>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell className="text-sm">{request.email}</TableCell>
                  <TableCell className="text-sm">{request.phone}</TableCell>
                  <TableCell className="text-sm">{request.age}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm">
                    {request.interests || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusBadgeVariant(request.status)}
                      className={getStatusColor(request.status)}
                    >
                      {request.status === "pending" && text.pending}
                      {request.status === "approved" && text.approved}
                      {request.status === "rejected" && text.rejected}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(request.appliedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/hr/volunteer-requests/${request.id}/edit`}>
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
                        onClick={() => setDeleteId(request.id)}
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
