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
import type { NewsletterMember } from "@/lib/db/schema/newsletterMembers";

interface NewsletterMemberListItem {
  id: number;
  email: string;
  is_english: boolean;
  is_arabic: boolean;
  created_at: string;
}

export default function NewsletterMembersPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [members, setMembers] = useState<NewsletterMemberListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"email" | "created_at">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [bulkDeleting, setBulkDeleting] = useState(false);


  // Translations
  const t = {
    en: {
      title: "Newsletter Members",
      description: "Manage newsletter subscribers and mailing list",
      sort: "Sort",
      refresh: "Refresh",
      addMember: "Add Member",
      searchPlaceholder: "Search members...",
      itemsSelected: "item(s) selected",
      email: "Email",
      languages: "Languages",
      created: "Created",
      actions: "Actions",
      loading: "Loading members...",
      noResults: "No members found matching your search.",
      noMembers: "No members found.",
      english: "English",
      arabic: "Arabic",
      deleteTitle: "Delete Member",
      deleteDescription: "Are you sure you want to delete this member? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "Member deleted successfully",
      deleteFailed: "Failed to delete member",
      fetchFailed: "Failed to fetch members",
      bulkDelete: "Delete Selected",
      bulkDeleteConfirm: "Delete Selected Members",
      bulkDeleteDescription: "Are you sure you want to delete the selected members? This action cannot be undone.",
      bulkDeleteSuccess: "Selected members deleted successfully",
      bulkDeleteFailed: "Failed to delete selected members"
    },
    ar: {
      title: "أعضاء النشرة الإخبارية",
      description: "إدارة المشتركين في النشرة الإخبارية وقائمة البريد",
      sort: "ترتيب",
      refresh: "تحديث",
      addMember: "إضافة عضو",
      searchPlaceholder: "البحث في الأعضاء...",
      itemsSelected: "عنصر محدد",
      email: "البريد الإلكتروني",
      languages: "اللغات",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الأعضاء...",
      noResults: "لم يتم العثور على أعضاء تطابق بحثك.",
      noMembers: "لم يتم العثور على أعضاء.",
      english: "إنجليزي",
      arabic: "عربي",
      deleteTitle: "حذف العضو",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا العضو؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف العضو بنجاح",
      deleteFailed: "فشل في حذف العضو",
      fetchFailed: "فشل في جلب الأعضاء",
      bulkDelete: "حذف المحدد",
      bulkDeleteConfirm: "حذف الأعضاء المحددين",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف الأعضاء المحددين؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteSuccess: "تم حذف الأعضاء المحددين بنجاح",
      bulkDeleteFailed: "فشل في حذف الأعضاء المحددين"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/cms/newsletter-members${qs}`);
      const data = await response.json();
      
      if (response.ok) {
        setMembers(data.items || []);
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
      const response = await fetch(`/api/cms/newsletter-members/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setMembers(prev => prev.filter(m => m.id !== id));
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
      const response = await fetch("/api/cms/newsletter-members/bulk-delete", {
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
        setMembers(prev => prev.filter(m => !selectedIds.has(m.id)));
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
      setSelectedIds(new Set(members.map(m => m.id)));
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

  const handleSort = (column: "email" | "created_at") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [searchQuery]);

  // Client-side sorting
  const sortedMembers = [...members].sort((a, b) => {
    let aVal: any, bVal: any;
    
    if (sortBy === "email") {
      aVal = a.email.toLowerCase();
      bVal = b.email.toLowerCase();
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

  const allSelected = members.length > 0 && selectedIds.size === members.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < members.length;

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
            onClick={fetchMembers}
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
          
          <Link href={`/${locale}/cms/news/newsletter-members/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addMember}</span>
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
                onClick={() => handleSort("email")}
              >
                {text.email}
              </TableHead>
              <TableHead>{text.languages}</TableHead>
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
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{text.loading}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? text.noResults : text.noMembers}
                </TableCell>
              </TableRow>
            ) : (
              sortedMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(member.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(member.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {member.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {member.is_english && (
                        <Badge variant="secondary">{text.english}</Badge>
                      )}
                      {member.is_arabic && (
                        <Badge variant="secondary">{text.arabic}</Badge>
                      )}
                      {!member.is_english && !member.is_arabic && (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(member.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/news/newsletter-members/${member.id}/edit`}>
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
                        onClick={() => setDeleteId(member.id)}
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
