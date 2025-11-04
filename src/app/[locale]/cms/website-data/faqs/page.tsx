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

interface FAQListItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  views: number;
  isPublished: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function FAQsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  
  const [faqs, setFaqs] = useState<FAQListItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Translations
  const t = {
    en: {
      title: "FAQs",
      description: "Manage frequently asked questions and their answers",
      refresh: "Refresh",
      addFAQ: "Add FAQ",
      searchPlaceholder: "Search FAQs...",
      itemsSelected: "item(s) selected",
      question: "Question",
      answer: "Answer",
      status: "Status",
      views: "Views",
      created: "Created",
      actions: "Actions",
      loading: "Loading FAQs...",
      noResults: "No FAQs found matching your search.",
      noFAQs: "No FAQs found.",
      published: "Published",
      draft: "Draft",
      deleteTitle: "Delete FAQ",
      deleteDescription: "Are you sure you want to delete this FAQ? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      deleteSuccess: "FAQ deleted successfully",
      deleteFailed: "Failed to delete FAQ",
      fetchFailed: "Failed to fetch FAQs",
      bulkDelete: "Delete Selected",
      bulkDeleteSuccess: "Selected FAQs deleted successfully",
      bulkDeleteFailed: "Failed to delete selected FAQs"
    },
    ar: {
      title: "الأسئلة الشائعة",
      description: "إدارة الأسئلة الشائعة وإجاباتها",
      refresh: "تحديث",
      addFAQ: "إضافة سؤال",
      searchPlaceholder: "البحث في الأسئلة الشائعة...",
      itemsSelected: "عنصر محدد",
      question: "السؤال",
      answer: "الإجابة",
      status: "الحالة",
      views: "المشاهدات",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الأسئلة الشائعة...",
      noResults: "لم يتم العثور على أسئلة تطابق بحثك.",
      noFAQs: "لم يتم العثور على أسئلة.",
      published: "منشور",
      draft: "مسودة",
      deleteTitle: "حذف السؤال",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا السؤال؟ لا يمكن التراجع عن هذا الإجراء.",
      cancel: "إلغاء",
      delete: "حذف",
      deleteSuccess: "تم حذف السؤال بنجاح",
      deleteFailed: "فشل في حذف السؤال",
      fetchFailed: "فشل في جلب الأسئلة الشائعة",
      bulkDelete: "حذف المحدد",
      bulkDeleteSuccess: "تم حذف الأسئلة المحددة بنجاح",
      bulkDeleteFailed: "فشل في حذف الأسئلة المحددة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(`/api/faqs${qs}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setFaqs(data.items || []);
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
      // Check if CMS-specific endpoint exists, otherwise use generic endpoint
      const response = await fetch(`/api/cms/faqs/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success(text.deleteSuccess);
        setFaqs(prev => prev.filter(f => f.id !== id));
        setSelectedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      } else {
        // If CMS endpoint doesn't exist, show informative message
        const data = await response.json();
        if (response.status === 404) {
          toast.error("Delete endpoint not yet implemented. Please contact administrator.");
        } else {
          toast.error(data.error || text.deleteFailed);
        }
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
      const response = await fetch("/api/cms/faqs/bulk-delete", {
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
        setFaqs(prev => prev.filter(f => !selectedIds.has(f.id)));
        setSelectedIds(new Set());
      } else {
        if (response.status === 404) {
          toast.error("Bulk delete endpoint not yet implemented. Please contact administrator.");
        } else {
          throw new Error(result.error || text.bulkDeleteFailed);
        }
      }
    } catch (error: any) {
      toast.error(error.message || text.bulkDeleteFailed);
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(faqs.map(f => f.id)));
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

  useEffect(() => {
    fetchFAQs();
  }, [searchQuery]);

  const allSelected = faqs.length > 0 && selectedIds.size === faqs.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < faqs.length;

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

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
            onClick={fetchFAQs}
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
          
          <Link href={`/${locale}/cms/website-data/faqs/new`}>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{text.addFAQ}</span>
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
              <TableHead>{text.question}</TableHead>
              <TableHead className="hidden md:table-cell">{text.answer}</TableHead>
              <TableHead>{text.status}</TableHead>
              <TableHead>{text.views}</TableHead>
              <TableHead className="hidden sm:table-cell">{text.created}</TableHead>
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
            ) : faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? text.noResults : text.noFAQs}
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((faq) => (
                <TableRow key={faq.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(faq.id)}
                      onCheckedChange={(checked) => 
                        handleSelectOne(faq.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="max-w-xs font-medium">
                    <div className="space-y-1">
                      <p className="truncate">
                        {isArabic ? faq.questionAr : faq.questionEn}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {isArabic ? faq.questionEn : faq.questionAr}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs">
                    <p className="text-sm text-muted-foreground truncate">
                      {isArabic ? truncateText(faq.answerAr) : truncateText(faq.answerEn)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={faq.isPublished ? "default" : "secondary"}>
                      {faq.isPublished ? text.published : text.draft}
                    </Badge>
                  </TableCell>
                  <TableCell>{faq.views || 0}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(faq.createdAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/${locale}/cms/website-data/faqs/${faq.id}/edit`}>
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
                        onClick={() => setDeleteId(faq.id)}
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
