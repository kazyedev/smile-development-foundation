import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.nameEn !== undefined) transformed.name_en = data.nameEn;
  if (data.nameAr !== undefined) transformed.name_ar = data.nameAr;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.descriptionEn !== undefined) transformed.description_en = data.descriptionEn;
  if (data.descriptionAr !== undefined) transformed.description_ar = data.descriptionAr;
  if (data.imageUrl !== undefined) transformed.image_url = data.imageUrl;
  if (data.imageAltEn !== undefined) transformed.image_alt_en = data.imageAltEn;
  if (data.imageAltAr !== undefined) transformed.image_alt_ar = data.imageAltAr;
  if (data.color !== undefined) transformed.color = data.color;
  if (data.icon !== undefined) transformed.icon = data.icon;
  if (data.isEnglish !== undefined) transformed.is_english = data.isEnglish;
  if (data.isArabic !== undefined) transformed.is_arabic = data.isArabic;
  if (data.pageViews !== undefined) transformed.page_views = data.pageViews;
  if (data.isPublished !== undefined) transformed.is_published = data.isPublished;
  if (data.publishedAt !== undefined) transformed.published_at = data.publishedAt;
  
  return transformed;
};

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("media_categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Media category not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ data });
}

export async function PATCH(req: Request, { params }: Params) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json().catch(() => ({}));
  // Prevent ID overwrite from client
  if (payload && typeof payload === "object") {
    delete (payload as Record<string, unknown>).id;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("media_categories")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Media category not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("media_categories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

