"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import AddEditProgramDialog from "@/components/cms/AddEditProgramDialog";

type ProgramRow = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  include_in_sitemap_en: boolean;
  include_in_sitemap_ar: boolean;
  page_views: number;
  created_at: string;
  statics?: any[];
  partners?: any[];
  donors?: any[];
};

export default function CmsProgramsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isAr = locale === "ar";
  const t = {
    title: isAr ? "البرامج" : "Programs",
    subtitle: isAr ? "إدارة البرامج والمبادرات" : "Manage programs and initiatives",
    add: isAr ? "إضافة برنامج" : "Add Program",
    search: isAr ? "البحث في البرامج..." : "Search programs...",
    filter: isAr ? "تصفية" : "Filter",
    thTitle: isAr ? "العنوان" : "Title",
    thPublished: isAr ? "الحالة" : "Status",
    thSitemap: isAr ? "الخريطة" : "Sitemap",
    thViews: isAr ? "الزيارات" : "Views",
    thCreatedAt: isAr ? "التاريخ" : "Created",
    thActions: isAr ? "إجراءات" : "Actions",
    edit: isAr ? "تعديل" : "Edit",
    delete: isAr ? "حذف" : "Delete",
    view: isAr ? "عرض" : "View",
    published: isAr ? "منشور" : "Published",
    draft: isAr ? "مسودة" : "Draft",
    totalPrograms: isAr ? "إجمالي البرامج" : "Total Programs",
    publishedPrograms: isAr ? "البرامج المنشورة" : "Published Programs",
    totalViews: isAr ? "إجمالي المشاهدات" : "Total Views",
    activeLocations: isAr ? "المواقع النشطة" : "Active Locations",
    noData: isAr ? "لا توجد بيانات" : "No data",
    confirmDelete: isAr ? "هل تريد حذف هذا البرنامج؟" : "Delete this program?",
    deleteSuccess: isAr ? "تم حذف البرنامج بنجاح" : "Program deleted successfully",
    deleteError: isAr ? "فشل في حذف البرنامج" : "Failed to delete program",
  };

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ProgramRow[]>([]);
  const [filteredRows, setFilteredRows] = useState<ProgramRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any> | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/cms/programs`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");
        if (!cancelled) {
          setRows(data.items as ProgramRow[]);
          setFilteredRows(data.items as ProgramRow[]);
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = rows;
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(row => 
        statusFilter === "published" ? row.is_published : !row.is_published
      );
    }
    
    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(row => 
        row.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.title_ar.includes(searchTerm) ||
        row.id.toString().includes(searchTerm)
      );
    }
    
    setFilteredRows(filtered);
  }, [rows, searchTerm, statusFilter]);

  async function refreshList() {
    try {
      setLoading(true);
      const res = await fetch(`/api/cms/programs`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setRows(data.items as ProgramRow[]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id: number) {
    setEditingId(id);
    setOpen(true);
    try {
      const res = await fetch(`/api/cms/programs/${id}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch program");
      const p = data.item as Record<string, any>;
      setInitialValues(p);
    } catch (e) {
      // keep dialog open but without data
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(t.confirmDelete);
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/cms/programs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      await refreshList();
    } catch (e: any) {
      setError(e.message);
    }
  }

  // Calculate statistics
  const stats = {
    total: rows.length,
    published: rows.filter(r => r.is_published).length,
    totalViews: rows.reduce((sum, r) => sum + (r.page_views || 0), 0),
    activeLocations: new Set(rows.filter(r => r.statics?.length > 0).map(r => r.implementation_location_en)).size
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>
        <Button 
          onClick={() => { setEditingId(null); setInitialValues(undefined); setOpen(true); }}
          className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.add}
        </Button>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div variants={fadeInUp}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t.totalPrograms}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
                {t.publishedPrograms}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{stats.published}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {t.totalViews}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">
                {t.activeLocations}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">{stats.activeLocations}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            size="sm"
          >
            {isAr ? "الكل" : "All"}
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            onClick={() => setStatusFilter("published")}
            size="sm"
          >
            {t.published}
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            onClick={() => setStatusFilter("draft")}
            size="sm"
          >
            {t.draft}
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div 
        className="bg-card rounded-lg border shadow-sm"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-6">
            <p className="text-destructive text-center">{error}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[40%]">{t.thTitle}</TableHead>
                <TableHead className="text-center">{t.thPublished}</TableHead>
                <TableHead className="text-center">{t.thSitemap}</TableHead>
                <TableHead className="text-center">{t.thViews}</TableHead>
                <TableHead className="text-center">{t.thCreatedAt}</TableHead>
                <TableHead className="text-center">{t.thActions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="font-semibold">
                        {isAr ? p.title_ar : p.title_en}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isAr ? p.title_en : p.title_ar}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={p.is_published ? "default" : "secondary"}>
                      {p.is_published ? t.published : t.draft}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1 items-center">
                      <Badge variant="outline" className="text-xs">
                        {p.include_in_sitemap_en ? "EN" : "—"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {p.include_in_sitemap_ar ? "AR" : "—"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">{p.page_views?.toLocaleString() || 0}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(p.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {filteredRows.length === 0 && (
              <TableCaption className="py-8">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium">{t.noData}</p>
                  <p className="text-sm mt-1">
                    {searchTerm || statusFilter !== "all" 
                      ? (isAr ? "جرب تغيير معايير البحث" : "Try changing search criteria")
                      : (isAr ? "ابدأ بإضافة برنامج جديد" : "Start by adding a new program")
                    }
                  </p>
                </div>
              </TableCaption>
            )}
          </Table>
        )}
      </motion.div>

      {/* Add/Edit Dialog */}
      <AddEditProgramDialog
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setEditingId(null);
            setInitialValues(undefined);
          }
          setOpen(v);
        }}
        editingId={editingId}
        initialValues={initialValues}
        locale={locale as string}
        onSuccess={refreshList}
      />
    </div>
  );
}



