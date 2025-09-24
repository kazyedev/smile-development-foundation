import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.isEnglish !== undefined) transformed.is_english = data.isEnglish;
  if (data.isArabic !== undefined) transformed.is_arabic = data.isArabic;
  if (data.titleEn !== undefined) transformed.title_en = data.titleEn;
  if (data.titleAr !== undefined) transformed.title_ar = data.titleAr;
  if (data.descriptionEn !== undefined) transformed.description_en = data.descriptionEn;
  if (data.descriptionAr !== undefined) transformed.description_ar = data.descriptionAr;
  if (data.url !== undefined) transformed.url = data.url;
  if (data.programId !== undefined) transformed.program_id = data.programId;
  if (data.projectId !== undefined) transformed.project_id = data.projectId;
  if (data.activityId !== undefined) transformed.activity_id = data.activityId;
  if (data.categoryId !== undefined) transformed.category_id = data.categoryId;
  if (data.featuredImageUrl !== undefined) transformed.featured_image_url = data.featuredImageUrl;
  if (data.coverImageUrl !== undefined) transformed.cover_image_url = data.coverImageUrl;
  if (data.attachmentUrl !== undefined) transformed.attachment_url = data.attachmentUrl;
  if (data.contentEn !== undefined) transformed.content_en = data.contentEn;
  if (data.contentAr !== undefined) transformed.content_ar = data.contentAr;
  if (data.authorEn !== undefined) transformed.author_en = data.authorEn;
  if (data.authorAr !== undefined) transformed.author_ar = data.authorAr;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.keywordsEn !== undefined) transformed.keywords_en = data.keywordsEn;
  if (data.keywordsAr !== undefined) transformed.keywords_ar = data.keywordsAr;
  if (data.tagsEn !== undefined) transformed.tags_en = data.tagsEn;
  if (data.tagsAr !== undefined) transformed.tags_ar = data.tagsAr;
  if (data.pageViews !== undefined) transformed.page_views = data.pageViews;
  if (data.downloads !== undefined) transformed.downloads = data.downloads;
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
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET /api/cms/publications/[id] - Database error:", error);
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
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
    console.error("PATCH /api/cms/publications/[id] - Authentication failed:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json().catch(() => ({}));
  console.log("PATCH /api/cms/publications/[id] - Payload:", JSON.stringify(payload, null, 2));
  
  // Prevent ID overwrite from client
  if (payload && typeof payload === "object") {
    delete (payload as Record<string, unknown>).id;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);
  console.log("PATCH /api/cms/publications/[id] - Database payload:", JSON.stringify(databasePayload, null, 2));

  const { data, error } = await supabase
    .from("publications")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("PATCH /api/cms/publications/[id] - Database error:", error);
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Publication not found" }, { status: 404 });
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
    console.error("DELETE /api/cms/publications/[id] - Authentication failed:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("publications").delete().eq("id", id);
  if (error) {
    console.error("DELETE /api/cms/publications/[id] - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ success: true });
}
