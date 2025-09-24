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
  FileText,
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";

type ReportItem = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  downloads: number;
  created_at: string;
  url: string;
  featured_image_url: string | null;
  category_id: number | null;
};

export default function ReportsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<number | null>(null);

  // Translations
  const t = {
    en: {
      title: "Reports",
      description: "Manage annual reports, impact reports, and documentation",
      refresh: "Refresh",
      addReport: "Add Report",
      searchPlaceholder: "Search reports...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      status: "Status",
      downloads: "Downloads",
      created: "Created",
      actions: "Actions",
      loading: "Loading reports...",
      noResults: "No reports found matching your search.",
      noItems: "No reports found.",
      noItemsDescription: "Start by adding your first report.",
      published: "Published",
      draft: "Draft",
      selectedCount: "selected",
      deleteSelected: "Delete Selected",
      view: "View Report",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteTitle: "Delete Report",
      deleteDescription: "Are you sure you want to delete this report? This action cannot be undone.",
      bulkDeleteTitle: "Delete Reports",
      bulkDeleteDescription: "Are you sure you want to delete these reports? This action cannot be undone.",
      deleteSuccess: "Report deleted successfully",
      deleteFailed: "Failed to delete report",
      bulkDeleteSuccess: "Reports deleted successfully",
      bulkDeleteFailed: "Failed to delete reports",
      fetchError: "Failed to fetch reports"
    },
    ar: {
      title: "التقارير",
      description: "إدارة التقارير السنوية وتقارير الأثر والوثائق",
      refresh: "تحديث",
      addReport: "إضافة تقرير",
      searchPlaceholder: "البحث في التقارير...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      status: "الحالة",
      downloads: "التحميلات",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل التقارير...",
      noResults: "لم يتم العثور على تقارير تطابق بحثك.",
      noItems: "لم يتم العثور على تقارير.",
      noItemsDescription: "ابدأ بإضافة أول تقرير لك.",
      published: "منشور",
      draft: "مسودة",
      selectedCount: "محدد",
      deleteSelected: "حذف المحدد",
      view: "عرض التقرير",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      deleteTitle: "حذف التقرير",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا التقرير؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteTitle: "حذف التقارير",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف هذه التقارير؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteSuccess: "تم حذف التقرير بنجاح",
      deleteFailed: "فشل في حذف التقرير",
      bulkDeleteSuccess: "تم حذف التقارير بنجاح",
      bulkDeleteFailed: "فشل في حذف التقارير",
      fetchError: "فشل في جلب التقارير"
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch reports
  const fetchReports = async () => {
    try {
      const url = new URL("/api/cms/reports", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      
      const result = await response.json();
      setReports(result.items || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error(text.fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [searchTerm]);

  // Handle single report delete
  const handleDeleteReport = async (reportId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cms/reports/${reportId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      toast.success(text.deleteSuccess);
      fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error(text.deleteFailed);
    } finally {
      setIsDeleting(false);
      setReportToDelete(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedReports.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/cms/reports/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedReports }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete reports");
      }

      toast.success(text.bulkDeleteSuccess);
      setSelectedReports([]);
      fetchReports();
    } catch (error) {
      console.error("Error deleting reports:", error);
      toast.error(text.bulkDeleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle selection
  const handleSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, id]);
    } else {
      setSelectedReports(selectedReports.filter(x => x !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(reports.map(item => item.id));
    } else {
      setSelectedReports([]);
    }
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
                  onClick={() => router.push(`/${locale}/cms/media/reports/new`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {text.addReport}
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
                  onClick={fetchReports}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {text.refresh}
                </Button>
              </div>
              
              {selectedReports.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedReports.length} {text.selectedCount}
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

        {/* Reports Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{text.noItems}</p>
                <p className="text-sm">{text.noItemsDescription}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedReports.length === reports.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>{text.titleEn}</TableHead>
                    <TableHead>{text.status}</TableHead>
                    <TableHead>{text.downloads}</TableHead>
                    <TableHead>{text.created}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedReports.includes(item.id)}
                          onCheckedChange={(checked) => handleSelect(item.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {isArabic ? item.title_ar : item.title_en}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? item.title_en : item.title_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.is_published ? "default" : "secondary"}>
                          {item.is_published ? text.published : text.draft}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          {(item.downloads ?? 0).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString(locale)}
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
                              onClick={() => window.open(item.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {text.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/${locale}/cms/media/reports/${item.id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {text.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setReportToDelete(item.id)}
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
        <AlertDialog open={reportToDelete !== null} onOpenChange={() => setReportToDelete(null)}>
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
                onClick={() => reportToDelete && handleDeleteReport(reportToDelete)}
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
