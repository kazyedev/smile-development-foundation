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
  if (data.featuredImageUrl !== undefined) transformed.featured_image_url = data.featuredImageUrl;
  if (data.video !== undefined) transformed.video = data.video;
  if (data.programId !== undefined) transformed.program_id = data.programId;
  if (data.personNameEn !== undefined) transformed.person_name_en = data.personNameEn;
  if (data.personNameAr !== undefined) transformed.person_name_ar = data.personNameAr;
  if (data.personAge !== undefined) transformed.person_age = data.personAge;
  if (data.personLocationEn !== undefined) transformed.person_location_en = data.personLocationEn;
  if (data.personLocationAr !== undefined) transformed.person_location_ar = data.personLocationAr;
  if (data.cityEn !== undefined) transformed.city_en = data.cityEn;
  if (data.cityAr !== undefined) transformed.city_ar = data.cityAr;
  if (data.otherImagesUrl !== undefined) transformed.other_images_url = data.otherImagesUrl;
  if (data.contentEn !== undefined) transformed.content_en = data.contentEn;
  if (data.contentAr !== undefined) transformed.content_ar = data.contentAr;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.keywordsEn !== undefined) transformed.keywords_en = data.keywordsEn;
  if (data.keywordsAr !== undefined) transformed.keywords_ar = data.keywordsAr;
  if (data.tagsEn !== undefined) transformed.tags_en = data.tagsEn;
  if (data.tagsAr !== undefined) transformed.tags_ar = data.tagsAr;
  if (data.readTime !== undefined) transformed.read_time = data.readTime;
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
    .from("success_stories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET /api/cms/success-stories/[id] - Database error:", error);
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Success story not found" }, { status: 404 });
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
    console.error("PATCH /api/cms/success-stories/[id] - Authentication failed:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json().catch(() => ({}));
  console.log("PATCH /api/cms/success-stories/[id] - Payload:", JSON.stringify(payload, null, 2));
  
  // Prevent ID overwrite from client
  if (payload && typeof payload === "object") {
    delete (payload as Record<string, unknown>).id;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);
  console.log("PATCH /api/cms/success-stories/[id] - Database payload:", JSON.stringify(databasePayload, null, 2));

  const { data, error } = await supabase
    .from("success_stories")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("PATCH /api/cms/success-stories/[id] - Database error:", error);
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Success story not found" }, { status: 404 });
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
    console.error("DELETE /api/cms/success-stories/[id] - Authentication failed:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("success_stories").delete().eq("id", id);
  if (error) {
    console.error("DELETE /api/cms/success-stories/[id] - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ success: true });
}
