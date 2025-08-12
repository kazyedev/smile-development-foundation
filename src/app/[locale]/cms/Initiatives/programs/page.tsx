"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddEditDialog from "@/components/cms/AddEditDialog";

type ProgramRow = {
  id: number;
  title_en: string;
  title_ar: string;
  is_published: boolean;
  include_in_sitemap_en: boolean;
  include_in_sitemap_ar: boolean;
  page_views: number;
  created_at: string;
};

export default function CmsProgramsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isAr = locale === "ar";
  const t = {
    title: isAr ? "البرامج" : "Programs",
    add: isAr ? "إضافة برنامج" : "Add Program",
    thTitle: isAr ? "العنوان" : "Title",
    thPublished: isAr ? "منشور" : "Published",
    thSitemap: isAr ? "الخريطة" : "Sitemap",
    thViews: isAr ? "الزيارات" : "Views",
    thCreatedAt: isAr ? "التاريخ" : "Created",
    thActions: isAr ? "إجراءات" : "Actions",
    edit: isAr ? "تعديل" : "Edit",
    delete: isAr ? "حذف" : "Delete",
  };

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ProgramRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<Record<string, any> | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/cms/programs`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");
        if (!cancelled) setRows(data.items as ProgramRow[]);
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
    const confirmed = window.confirm(isAr ? "هل تريد حذف هذا البرنامج؟" : "Delete this program?");
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{t.title}</h1>
        <Button onClick={() => { setEditingId(null); setInitialValues(undefined); setOpen(true); }}>{t.add}</Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[45%]">{t.thTitle}</TableHead>
              <TableHead>{t.thPublished}</TableHead>
              <TableHead>{t.thSitemap}</TableHead>
              <TableHead>{t.thViews}</TableHead>
              <TableHead>{t.thCreatedAt}</TableHead>
              <TableHead className="text-right">{t.thActions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  {isAr ? p.title_ar : p.title_en}
                </TableCell>
                <TableCell>{p.is_published ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {(isAr ? p.include_in_sitemap_ar : p.include_in_sitemap_en) ? "Yes" : "No"}
                </TableCell>
                <TableCell>{p.page_views}</TableCell>
                <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2 rtl:space-x-reverse">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(p.id)}>
                    {t.edit}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>
                    {t.delete}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            {rows.length === 0 ? (isAr ? "لا توجد بيانات" : "No data") : null}
          </TableCaption>
        </Table>
      )}
      <AddEditDialog
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setEditingId(null);
            setInitialValues(undefined);
          }
          setOpen(v);
        }}
        title={isAr ? "إضافة / تعديل برنامج" : "Add / Edit Program"}
        initial={initialValues}
        sections={[
          {
            id: "basic",
            title: isAr ? "الأساسي" : "Basic",
            fields: [
              { type: "text", name: "title_en", label: "Title (EN)", required: true },
              { type: "text", name: "title_ar", label: "العنوان (AR)", required: true },
              { type: "richtext", name: "description_en", label: "Description (EN)" },
              { type: "richtext", name: "description_ar", label: "الوصف (AR)" },
              { type: "richtext", name: "about_en", label: "About (EN)" },
              { type: "richtext", name: "about_ar", label: "حول (AR)" },
            ],
          },
          {
            id: "meta",
            title: isAr ? "البيانات الوصفية" : "Meta",
            fields: [
              { type: "text", name: "slug_en", label: "Slug (EN)", required: true },
              { type: "text", name: "slug_ar", label: "المعرف (AR)", required: true },
              { type: "boolean", name: "include_in_sitemap_en", label: "Include in sitemap (EN)" },
              { type: "boolean", name: "include_in_sitemap_ar", label: "Include in sitemap (AR)" },
              { type: "icon", name: "icon", label: "Icon" },
              { type: "color", name: "color", label: "Color" },
            ],
          },
          {
            id: "lists",
            title: isAr ? "قوائم" : "Lists",
            fields: [
              { type: "array:text", name: "goals_en", label: "Goals (EN)" },
              { type: "array:text", name: "goals_ar", label: "الأهداف (AR)" },
              { type: "array:text", name: "keywords_en", label: "Keywords (EN)" },
              { type: "array:text", name: "keywords_ar", label: "الكلمات المفتاحية (AR)" },
              { type: "array:text", name: "tags_en", label: "Tags (EN)" },
              { type: "array:text", name: "tags_ar", label: "الوسوم (AR)" },
            ],
          },
          {
            id: "locations",
            title: isAr ? "المواقع" : "Locations",
            fields: [
              { type: "text", name: "implementation_location_en", label: "Implementation Location (EN)" },
              { type: "text", name: "implementation_location_ar", label: "مكان التنفيذ (AR)" },
            ],
          },
          {
            id: "media",
            title: isAr ? "الوسائط" : "Media",
            fields: [
              { type: "image", name: "featured_image_url", label: isAr ? "الصورة الرئيسية" : "Featured Image" },
              { type: "slides", name: "slides", label: isAr ? "الشرائح" : "Slides" },
            ],
          },
          {
            id: "relations",
            title: isAr ? "العلاقات" : "Relations",
            fields: [
              { type: "statics", name: "statics", label: isAr ? "الإحصائيات" : "Statics" },
              { type: "json", name: "funding_providers", label: isAr ? "جهات التمويل (JSON)" : "Funding Providers (JSON)" },
              { type: "json", name: "donors", label: isAr ? "المانحون (JSON)" : "Donors (JSON)" },
              { type: "json", name: "partners", label: isAr ? "الشركاء (JSON)" : "Partners (JSON)" },
            ],
          },
          {
            id: "flags",
            title: isAr ? "إعدادات" : "Settings",
            fields: [
              { type: "boolean", name: "is_published", label: isAr ? "منشور" : "Published" },
            ],
          },
        ]}
        onSubmit={async (values) => {
          try {
            if (editingId) {
              const res = await fetch(`/api/cms/programs/${editingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || "Failed to update");
            }
            setOpen(false);
            setEditingId(null);
            setInitialValues(undefined);
            await refreshList();
          } catch (e: any) {
            setError(e.message);
          }
        }}
      />
    </div>
  );
}



