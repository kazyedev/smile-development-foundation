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
  BookOpen,
  Loader2,
} from "lucide-react";

type SuccessStoryItem = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  page_views: number;
  created_at: string;
  person_name_en: string;
  person_name_ar: string;
  person_age: number;
  city_en: string;
  city_ar: string;
};

export default function SuccessStoriesPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();

  const [stories, setStories] = useState<SuccessStoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStories, setSelectedStories] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<number | null>(null);

  // Translations
  const t = {
    en: {
      title: "Success Stories",
      description: "Manage inspiring success stories and testimonials",
      refresh: "Refresh",
      addStory: "Add Success Story",
      searchPlaceholder: "Search stories...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      person: "Person",
      age: "Age",
      location: "Location",
      status: "Status",
      views: "Views",
      created: "Created",
      actions: "Actions",
      loading: "Loading stories...",
      noResults: "No stories found matching your search.",
      noStories: "No success stories found.",
      noStoriesDescription: "Start by adding your first success story.",
      published: "Published",
      draft: "Draft",
      selectedCount: "selected",
      deleteSelected: "Delete Selected",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteTitle: "Delete Success Story",
      deleteDescription: "Are you sure you want to delete this success story? This action cannot be undone.",
      bulkDeleteTitle: "Delete Success Stories",
      bulkDeleteDescription: "Are you sure you want to delete these success stories? This action cannot be undone.",
      deleteSuccess: "Success story deleted successfully",
      deleteFailed: "Failed to delete success story",
      bulkDeleteSuccess: "Success stories deleted successfully",
      bulkDeleteFailed: "Failed to delete success stories",
      fetchError: "Failed to fetch success stories"
    },
    ar: {
      title: "قصص النجاح",
      description: "إدارة قصص النجاح الملهمة والشهادات",
      refresh: "تحديث",
      addStory: "إضافة قصة نجاح",
      searchPlaceholder: "البحث في القصص...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      person: "الشخص",
      age: "العمر",
      location: "الموقع",
      status: "الحالة",
      views: "المشاهدات",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل القصص...",
      noResults: "لم يتم العثور على قصص تطابق بحثك.",
      noStories: "لم يتم العثور على قصص نجاح.",
      noStoriesDescription: "ابدأ بإضافة أول قصة نجاح لك.",
      published: "منشور",
      draft: "مسودة",
      selectedCount: "محدد",
      deleteSelected: "حذف المحدد",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      deleteTitle: "حذف قصة النجاح",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف قصة النجاح هذه؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteTitle: "حذف قصص النجاح",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف قصص النجاح هذه؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteSuccess: "تم حذف قصة النجاح بنجاح",
      deleteFailed: "فشل في حذف قصة النجاح",
      bulkDeleteSuccess: "تم حذف قصص النجاح بنجاح",
      bulkDeleteFailed: "فشل في حذف قصص النجاح",
      fetchError: "فشل في جلب قصص النجاح"
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Fetch success stories
  const fetchStories = async () => {
    try {
      const url = new URL("/api/cms/success-stories", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch success stories");
      }
      
      const result = await response.json();
      setStories(result.items || []);
    } catch (error) {
      console.error("Error fetching success stories:", error);
      toast.error(text.fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [searchTerm]);

  // Handle single story delete
  const handleDeleteStory = async (storyId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cms/success-stories/${storyId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete success story");
      }

      toast.success(text.deleteSuccess);
      fetchStories();
    } catch (error) {
      console.error("Error deleting success story:", error);
      toast.error(text.deleteFailed);
    } finally {
      setIsDeleting(false);
      setStoryToDelete(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedStories.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/cms/success-stories/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedStories }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete success stories");
      }

      toast.success(text.bulkDeleteSuccess);
      setSelectedStories([]);
      fetchStories();
    } catch (error) {
      console.error("Error deleting success stories:", error);
      toast.error(text.bulkDeleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle story selection
  const handleStorySelect = (storyId: number, checked: boolean) => {
    if (checked) {
      setSelectedStories([...selectedStories, storyId]);
    } else {
      setSelectedStories(selectedStories.filter(id => id !== storyId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStories(stories.map(story => story.id));
    } else {
      setSelectedStories([]);
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
                  onClick={() => router.push(`/${locale}/cms/media/success-stories/new`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {text.addStory}
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
                  onClick={fetchStories}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {text.refresh}
                </Button>
              </div>
              
              {selectedStories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedStories.length} {text.selectedCount}
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

        {/* Success Stories Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            ) : stories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{text.noStories}</p>
                <p className="text-sm">{text.noStoriesDescription}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedStories.length === stories.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>{text.titleEn}</TableHead>
                    <TableHead>{text.person}</TableHead>
                    <TableHead>{text.age}</TableHead>
                    <TableHead>{text.location}</TableHead>
                    <TableHead>{text.status}</TableHead>
                    <TableHead>{text.views}</TableHead>
                    <TableHead>{text.created}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStories.includes(story.id)}
                          onCheckedChange={(checked) => handleStorySelect(story.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {isArabic ? story.title_ar : story.title_en}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? story.title_en : story.title_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {isArabic ? story.person_name_ar : story.person_name_en}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? story.person_name_en : story.person_name_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{story.person_age}</TableCell>
                      <TableCell>
                        {isArabic ? story.city_ar : story.city_en}
                      </TableCell>
                      <TableCell>
                        <Badge variant={story.is_published ? "default" : "secondary"}>
                          {story.is_published ? text.published : text.draft}
                        </Badge>
                      </TableCell>
                      <TableCell>{story.page_views.toLocaleString()}</TableCell>
                      <TableCell>
                        {new Date(story.created_at).toLocaleDateString(locale)}
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
                              onClick={() => router.push(`/${locale}/cms/media/success-stories/${story.id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {text.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setStoryToDelete(story.id)}
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
        <AlertDialog open={storyToDelete !== null} onOpenChange={() => setStoryToDelete(null)}>
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
                onClick={() => storyToDelete && handleDeleteStory(storyToDelete)}
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
