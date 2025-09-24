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
  CalendarDays,
  Loader2,
} from "lucide-react";

type ActivityItem = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  page_views: number;
  created_at: string;
  date: string | null;
  featured_image_url: string;
  program_id: number;
  project_id: number | null;
};

export default function ActivitiesPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();

  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<number | null>(null);

  // Translations
  const t = {
    en: {
      title: "Activities",
      description: "Manage foundation activities, events, and initiatives",
      refresh: "Refresh",
      addActivity: "Add Activity",
      searchPlaceholder: "Search activities...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      status: "Status",
      views: "Views",
      date: "Date",
      created: "Created",
      actions: "Actions",
      loading: "Loading activities...",
      noResults: "No activities found matching your search.",
      noItems: "No activities found.",
      noItemsDescription: "Start by adding your first activity.",
      published: "Published",
      draft: "Draft",
      selectedCount: "selected",
      deleteSelected: "Delete Selected",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteTitle: "Delete Activity",
      deleteDescription: "Are you sure you want to delete this activity? This action cannot be undone.",
      bulkDeleteTitle: "Delete Activities",
      bulkDeleteDescription: "Are you sure you want to delete these activities? This action cannot be undone.",
      deleteSuccess: "Activity deleted successfully",
      deleteFailed: "Failed to delete activity",
      bulkDeleteSuccess: "Activities deleted successfully",
      bulkDeleteFailed: "Failed to delete activities",
      fetchError: "Failed to fetch activities"
    },
    ar: {
      title: "الأنشطة",
      description: "إدارة أنشطة المؤسسة والفعاليات والمبادرات",
      refresh: "تحديث",
      addActivity: "إضافة نشاط",
      searchPlaceholder: "البحث في الأنشطة...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      status: "الحالة",
      views: "المشاهدات",
      date: "التاريخ",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الأنشطة...",
      noResults: "لم يتم العثور على أنشطة تطابق بحثك.",
      noItems: "لم يتم العثور على أنشطة.",
      noItemsDescription: "ابدأ بإضافة أول نشاط لك.",
      published: "منشور",
      draft: "مسودة",
      selectedCount: "محدد",
      deleteSelected: "حذف المحدد",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      deleteTitle: "حذف النشاط",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا النشاط؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteTitle: "حذف الأنشطة",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الأنشطة؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteSuccess: "تم حذف النشاط بنجاح",
      deleteFailed: "فشل في حذف النشاط",
      bulkDeleteSuccess: "تم حذف الأنشطة بنجاح",
      bulkDeleteFailed: "فشل في حذف الأنشطة",
      fetchError: "فشل في جلب الأنشطة"
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch activities
  const fetchActivities = async () => {
    try {
      const url = new URL("/api/cms/activities", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }
      
      const result = await response.json();
      setActivities(result.items || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error(text.fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [searchTerm]);

  // Handle single activity delete
  const handleDeleteActivity = async (activityId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cms/activities/${activityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete activity");
      }

      toast.success(text.deleteSuccess);
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error(text.deleteFailed);
    } finally {
      setIsDeleting(false);
      setActivityToDelete(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedActivities.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/cms/activities/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedActivities }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete activities");
      }

      toast.success(text.bulkDeleteSuccess);
      setSelectedActivities([]);
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activities:", error);
      toast.error(text.bulkDeleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle selection
  const handleSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedActivities([...selectedActivities, id]);
    } else {
      setSelectedActivities(selectedActivities.filter(x => x !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedActivities(activities.map(item => item.id));
    } else {
      setSelectedActivities([]);
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
                  onClick={() => router.push(`/${locale}/cms/media/activities/new`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {text.addActivity}
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
                  onClick={fetchActivities}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {text.refresh}
                </Button>
              </div>
              
              {selectedActivities.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedActivities.length} {text.selectedCount}
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

        {/* Activities Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{text.noItems}</p>
                <p className="text-sm">{text.noItemsDescription}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedActivities.length === activities.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>{text.titleEn}</TableHead>
                    <TableHead>{text.status}</TableHead>
                    <TableHead>{text.views}</TableHead>
                    <TableHead>{text.date}</TableHead>
                    <TableHead>{text.created}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedActivities.includes(item.id)}
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
                      <TableCell>{(item.page_views ?? 0).toLocaleString()}</TableCell>
                      <TableCell>
                        {item.date ? new Date(item.date).toLocaleDateString(locale) : "-"}
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
                              onClick={() => router.push(`/${locale}/cms/media/activities/${item.id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {text.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setActivityToDelete(item.id)}
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
        <AlertDialog open={activityToDelete !== null} onOpenChange={() => setActivityToDelete(null)}>
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
                onClick={() => activityToDelete && handleDeleteActivity(activityToDelete)}
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
