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
  Play,
  Loader2,
} from "lucide-react";

type Video = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  views: number;
  created_at: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  url: string;
};

export default function VideosPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";
  const router = useRouter();

  // Translations
  const t = {
    en: {
      title: "Videos",
      description: "Manage video content and multimedia resources",
      refresh: "Refresh",
      addVideo: "Add Video",
      searchPlaceholder: "Search videos...",
      itemsSelected: "item(s) selected",
      titleEn: "Title (EN)",
      titleAr: "Title (AR)",
      status: "Status",
      views: "Views",
      size: "Size",
      dimensions: "Dimensions",
      created: "Created",
      actions: "Actions",
      loading: "Loading videos...",
      noResults: "No videos found matching your search.",
      noVideos: "No videos found.",
      noVideosDescription: "Start by adding your first video.",
      published: "Published",
      draft: "Draft",
      selectedCount: "selected",
      deleteSelected: "Delete Selected",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      deleteTitle: "Delete Video",
      deleteDescription: "Are you sure you want to delete this video? This action cannot be undone.",
      bulkDeleteTitle: "Delete Videos",
      bulkDeleteDescription: "Are you sure you want to delete these videos? This action cannot be undone.",
      deleteSuccess: "Video deleted successfully",
      deleteFailed: "Failed to delete video",
      bulkDeleteSuccess: "Videos deleted successfully",
      bulkDeleteFailed: "Failed to delete videos",
      fetchError: "Failed to fetch videos"
    },
    ar: {
      title: "الفيديوهات",
      description: "إدارة محتوى الفيديو والموارد المتعددة الوسائط",
      refresh: "تحديث",
      addVideo: "إضافة فيديو",
      searchPlaceholder: "البحث في الفيديوهات...",
      itemsSelected: "عنصر محدد",
      titleEn: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      status: "الحالة",
      views: "المشاهدات",
      size: "الحجم",
      dimensions: "الأبعاد",
      created: "تاريخ الإنشاء",
      actions: "الإجراءات",
      loading: "جاري تحميل الفيديوهات...",
      noResults: "لم يتم العثور على فيديوهات تطابق بحثك.",
      noVideos: "لم يتم العثور على فيديوهات.",
      noVideosDescription: "ابدأ بإضافة أول فيديو لك.",
      published: "منشور",
      draft: "مسودة",
      selectedCount: "محدد",
      deleteSelected: "حذف المحدد",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
      cancel: "إلغاء",
      deleteTitle: "حذف الفيديو",
      deleteDescription: "هل أنت متأكد من أنك تريد حذف هذا الفيديو؟ لا يمكن التراجع عن هذا الإجراء.",
      bulkDeleteTitle: "حذف الفيديوهات",
      bulkDeleteDescription: "هل أنت متأكد من أنك تريد حذف هذه الفيديوهات؟ لا يمكن التراجع عن هذا الإجراء.",
      deleteSuccess: "تم حذف الفيديو بنجاح",
      deleteFailed: "فشل في حذف الفيديو",
      bulkDeleteSuccess: "تم حذف الفيديوهات بنجاح",
      bulkDeleteFailed: "فشل في حذف الفيديوهات",
      fetchError: "فشل في جلب الفيديوهات"
    }
  };

  const text = isArabic ? t.ar : t.en;

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null);

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const url = new URL("/api/cms/videos", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      
      const result = await response.json();
      setVideos(result.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error(text.fetchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [searchTerm]);

  // Handle single video delete
  const handleDeleteVideo = async (videoId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cms/videos/${videoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      toast.success(text.deleteSuccess);

      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error(text.deleteFailed);
    } finally {
      setIsDeleting(false);
      setVideoToDelete(null);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedVideos.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/cms/videos/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedVideos }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete videos");
      }

      toast.success(text.bulkDeleteSuccess);

      setSelectedVideos([]);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting videos:", error);
      toast.error(text.bulkDeleteFailed);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle video selection
  const handleVideoSelect = (videoId: number, checked: boolean) => {
    if (checked) {
      setSelectedVideos([...selectedVideos, videoId]);
    } else {
      setSelectedVideos(selectedVideos.filter(id => id !== videoId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVideos(videos.map(video => video.id));
    } else {
      setSelectedVideos([]);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
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
                  onClick={() => router.push(`/${locale}/cms/media/videos/new`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {text.addVideo}
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
                  onClick={fetchVideos}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {text.refresh}
                </Button>
              </div>
              
              {selectedVideos.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedVideos.length} {text.selectedCount}
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

        {/* Videos Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">{text.loading}</span>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{text.noVideos}</p>
                <p className="text-sm">{text.noVideosDescription}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedVideos.length === videos.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>{text.titleEn}</TableHead>
                    <TableHead>{text.status}</TableHead>
                    <TableHead>{text.views}</TableHead>
                    <TableHead>{text.size}</TableHead>
                    <TableHead>{text.dimensions}</TableHead>
                    <TableHead>{text.created}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedVideos.includes(video.id)}
                          onCheckedChange={(checked) => handleVideoSelect(video.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {isArabic ? video.title_ar : video.title_en}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? video.title_en : video.title_ar}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={video.is_published ? "default" : "secondary"}>
                          {video.is_published ? text.published : text.draft}
                        </Badge>
                      </TableCell>
                      <TableCell>{video.views.toLocaleString()}</TableCell>
                      <TableCell>{formatFileSize(video.size)}</TableCell>
                      <TableCell>{video.width} × {video.height}</TableCell>
                      <TableCell>
                        {new Date(video.created_at).toLocaleDateString(locale)}
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
                              onClick={() => window.open(video.url, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              {text.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/${locale}/cms/media/videos/${video.id}/edit`)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {text.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setVideoToDelete(video.id)}
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
        <AlertDialog open={videoToDelete !== null} onOpenChange={() => setVideoToDelete(null)}>
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
                onClick={() => videoToDelete && handleDeleteVideo(videoToDelete)}
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
