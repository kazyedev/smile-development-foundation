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
  Eye,
  FileText,
  Loader2,
} from "lucide-react";

type NewsItem = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  page_views: number;
  created_at: string;
  featured_image_url: string;
  read_time: number;
  author_id: string;
  category_id?: number;
  program_id?: number;
  project_id?: number;
};

export default function NewsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);

  // Translations
  const t = {
    en: {
      title: "News Articles",
      description: "Manage news articles, updates, and announcements",
      refresh: "Refresh",
      addNews: "Add News Article",
      searchPlaceholder: "Search news articles...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      status: "Status",
      views: "Views",
      readTime: "Read Time",
      created: "Created",
      actions: "Actions",
      loading: "Loading news articles...",
      noResults: "No news articles found matching your search.",
      noNews: "No news articles found.",
      noNewsDescription: "Start by adding your first news article.",
      published: "Published",
      draft: "Draft",
      selectedCount: "selected",
      deleteSelected: "Delete Selected",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteTitle: "Delete News Article",
      deleteDescription: "Are you sure you want to delete this news article? This action cannot be undone.",
      bulkDeleteTitle: "Delete News Articles",
      bulkDeleteDescription: "Are you sure you want to delete these news articles? This action cannot be undone.",
      deleteSuccess: "News article deleted successfully",
      deleteFailed: "Failed to delete news article",
      bulkDeleteSuccess: "News articles deleted successfully",
      bulkDeleteFailed: "Failed to delete news articles",
      fetchError: "Failed to fetch news articles",
      minutes: "min"
    },
    ar: {
      title: "المقالات الإخبارية",
      description: "إدارة المقالات الإخبارية والتحديثات والإعلانات",
      refresh: "تحديث",
      addNews: "إضافة مقال إخباري",
      searchPlaceholder: "البحث في المقالات الإخبارية...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      status: "الحالة",
      views: "المشاهدات",
      readTime: "وقت القراءة",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل المقالات الإخبارية...",
      noResults: "لم يتم العثور على مقالات إخبارية تطابق بحثك.",
      noNews: "لم يتم العثور على مقالات إخبارية.",
      noNewsDescription: "ابدأ بإضافة أول مقال إخباري لك.",
      published: "منشور",
      draft: "مسودة",
      selectedCount: "محدد",
      deleteSelected: "حذف المحدد",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      deleteTitle: "حذف المقال الإخباري",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا المقال الإخباري؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteTitle: "حذف المقالات الإخبارية",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف هذه المقالات الإخبارية؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteSuccess: "تم حذف المقال الإخباري بنجاح",
      deleteFailed: "فشل في حذف المقال الإخباري",
      bulkDeleteSuccess: "تم حذف المقالات الإخبارية بنجاح",
      bulkDeleteFailed: "فشل في حذف المقالات الإخبارية",
      fetchError: "فشل في جلب المقالات الإخبارية",
      minutes: "دقيقة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch news
  const fetchNews = async () => {
    try {
      const url = new URL("/api/cms/news", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch news articles");
      }
      
      const result = await response.json();
      setNews(result.items || []);
    } catch (error) {
      console.error("Error fetching news articles:", error);
      toast.error(text.fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [searchTerm]);

  // Handle single news delete
  const handleDeleteNews = async (newsId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cms/news/${newsId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete news article");
      }

      toast.success(text.deleteSuccess);
      fetchNews();
    } catch (error) {
      console.error("Error deleting news article:", error);
      toast.error(text.deleteFailed);
    } finally {
      setIsDeleting(false);
      setNewsToDelete(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedNews.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/cms/news/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedNews }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete news articles");
      }

      toast.success(text.bulkDeleteSuccess);
      setSelectedNews([]);
      fetchNews();
    } catch (error) {
      console.error("Error deleting news articles:", error);
      toast.error(text.bulkDeleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle news selection
  const handleNewsSelect = (newsId: number, checked: boolean) => {
    if (checked) {
      setSelectedNews([...selectedNews, newsId]);
    } else {
      setSelectedNews(selectedNews.filter(id => id !== newsId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNews(news.map(article => article.id));
    } else {
      setSelectedNews([]);
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
                  onClick={() => router.push(`/${locale}/cms/news/news/new`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {text.addNews}
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
                  onClick={fetchNews}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {text.refresh}
                </Button>
              </div>
              
              {selectedNews.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedNews.length} {text.selectedCount}
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

        {/* News Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{text.noNews}</p>
                <p className="text-sm">{text.noNewsDescription}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedNews.length === news.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>{text.titleEn}</TableHead>
                    <TableHead>{text.status}</TableHead>
                    <TableHead>{text.views}</TableHead>
                    <TableHead>{text.readTime}</TableHead>
                    <TableHead>{text.created}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedNews.includes(article.id)}
                          onCheckedChange={(checked) => handleNewsSelect(article.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {isArabic ? article.title_ar : article.title_en}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? article.title_en : article.title_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.is_published ? "default" : "secondary"}>
                          {article.is_published ? text.published : text.draft}
                        </Badge>
                      </TableCell>
                      <TableCell>{article.page_views.toLocaleString()}</TableCell>
                      <TableCell>{article.read_time} {text.minutes}</TableCell>
                      <TableCell>
                        {new Date(article.created_at).toLocaleDateString(locale)}
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
                              onClick={() => window.open(article.featured_image_url, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              {text.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/${locale}/cms/news/news/${article.id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {text.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setNewsToDelete(article.id)}
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
        <AlertDialog open={newsToDelete !== null} onOpenChange={() => setNewsToDelete(null)}>
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
                onClick={() => newsToDelete && handleDeleteNews(newsToDelete)}
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
