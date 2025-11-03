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
import type { Donation } from "@/lib/db/schema/donations";
import { CURRENCIES } from "@/lib/db/schema/donations";

interface DonationListItem {
  id: number;
  amount: string;
  currency: string;
  donor_name: string | null;
  donor_email: string;
  method: string;
  status: string;
  created_at: string;
}

export default function DonationsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [donations, setDonations] = useState<DonationListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"amount" | "donor" | "status" | "created_at">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkDeleting, setBulkDeleting] = useState(false);


  // Translations
  const t = {
    en: {
      title: "Donations",
      description: "Manage donations, donors, and fundraising campaigns",
      sort: "Sort",
      refresh: "Refresh",
      addDonation: "Add Donation",
      searchPlaceholder: "Search donations...",
      itemsSelected: "item(s) selected",
      amount: "Amount",
      donor: "Donor",
      method: "Method",
      status: "Status",
      created: "Created",
      actions: "Actions",
      loading: "Loading donations...",
      noResults: "No donations found matching your search.",
      noDonations: "No donations found.",
      pending: "Pending",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
      stripe: "Stripe",
      cashTransfer: "Cash Transfer",
      bankDeposit: "Bank Deposit",
      deleteTitle: "Delete Donation",
      deleteDescription: "Are you sure you want to delete this donation? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Donation deleted successfully",
      deleteFailed: "Failed to delete donation",
      fetchFailed: "Failed to fetch donations",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Donations",
      bulkDeleteDescription: "Are you sure you want to delete the selected donations? This action cannot be undone.",
      bulkDeleteSuccess: "Selected donations deleted successfully",
      bulkDeleteFailed: "Failed to delete selected donations"
    },
    ar: {
      title: "التبرعات",
      description: "إدارة التبرعات والمانحين وحملات جمع التبرعات",
      sort: "ترتيب",
      refresh: "تحديث",
      addDonation: "إضافة تبرع",
      searchPlaceholder: "البحث في التبرعات...",
      itemsSelected: "عنصر محدد",
      amount: "المبلغ",
      donor: "المانح",
      method: "طريقة الدفع",
      status: "الحالة",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل التبرعات...",
      noResults: "لم يتم العثور على تبرعات تطابق بحثك.",
      noDonations: "لم يتم العثور على تبرعات.",
      pending: "قيد الانتظار",
      completed: "مكتمل",
      failed: "فشل",
      cancelled: "ملغي",
      stripe: "سترايب",
      cashTransfer: "تحويل نقدي",
      bankDeposit: "إيداع بنكي",
      deleteTitle: "حذف التبرع",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا التبرع؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف التبرع بنجاح",
      deleteFailed: "فشل في حذف التبرع",
      fetchFailed: "فشل في جلب التبرعات",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف التبرعات المحددة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف التبرعات المحددة؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف التبرعات المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف التبرعات المحددة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return text.pending;
      case "completed":
        return text.completed;
      case "failed":
        return text.failed;
      case "cancelled":
        return text.cancelled;
      default:
        return status;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "stripe":
        return text.stripe;
      case "cash_transfer":
        return text.cashTransfer;
      case "bank_deposit":
        return text.bankDeposit;
      default:
        return method;
    }
  };

  const formatAmount = (amount: string, currency: string) => {
    const currencyInfo = CURRENCIES[currency as keyof typeof CURRENCIES];
    const symbol = currencyInfo?.symbol || currency;
    return `${symbol}${parseFloat(amount).toLocaleString()}`;
  };

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/cms/donations${qs}`);
      const data = await response.json();
      
      if (response.ok) {
        setDonations(data.items || []);
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
      const response = await fetch(`/api/cms/donations/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setDonations(prev => prev.filter(d => d.id !== id));
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
      const response = await fetch("/api/cms/donations/bulk-delete", {
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
        setDonations(prev => prev.filter(d => !selectedIds.has(d.id)));
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
      setSelectedIds(new Set(donations.map(d => d.id)));
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

  const handleSort = (column: "amount" | "donor" | "status" | "created_at") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [searchQuery]);

  // Client-side sorting
  const sortedDonations = [...donations].sort((a, b) => {
    let aVal: any, bVal: any;
    
    if (sortBy === "amount") {
      aVal = parseFloat(a.amount);
      bVal = parseFloat(b.amount);
    } else if (sortBy === "donor") {
      aVal = (a.donor_name || a.donor_email).toLowerCase();
      bVal = (b.donor_name || b.donor_email).toLowerCase();
    } else if (sortBy === "status") {
      aVal = a.status;
      bVal = b.status;
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

  const allSelected = donations.length > 0 && selectedIds.size === donations.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < donations.length;

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
            onClick={fetchDonations}
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
          
          <Link href={`/${locale}/cms/donations/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addDonation}</span>
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
                onClick={() => handleSort("amount")}
              >
                {text.amount}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("donor")}
              >
                {text.donor}
              </TableHead>
              <TableHead>{text.method}</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("status")}
              >
                {text.status}
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
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{text.loading}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : donations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? text.noResults : text.noDonations}
                </TableCell>
              </TableRow>
            ) : (
              sortedDonations.map((donation) => (
                <TableRow key={donation.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(donation.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(donation.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatAmount(donation.amount, donation.currency)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {donation.donor_name || donation.donor_email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getMethodLabel(donation.method)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(donation.status)}>
                      {getStatusLabel(donation.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(donation.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/donations/${donation.id}/edit`}>
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
                        onClick={() => setDeleteId(donation.id)}
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
