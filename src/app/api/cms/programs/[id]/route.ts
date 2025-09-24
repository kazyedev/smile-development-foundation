import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.titleEn !== undefined) transformed.title_en = data.titleEn;
  if (data.titleAr !== undefined) transformed.title_ar = data.titleAr;
  if (data.descriptionEn !== undefined) transformed.description_en = data.descriptionEn;
  if (data.descriptionAr !== undefined) transformed.description_ar = data.descriptionAr;
  if (data.aboutEn !== undefined) transformed.about_en = data.aboutEn;
  if (data.aboutAr !== undefined) transformed.about_ar = data.aboutAr;
  if (data.goalsEn !== undefined) transformed.goals_en = data.goalsEn;
  if (data.goalsAr !== undefined) transformed.goals_ar = data.goalsAr;
  if (data.statics !== undefined) transformed.statics = data.statics;
  if (data.icon !== undefined) transformed.icon = data.icon;
  if (data.color !== undefined) transformed.color = data.color;
  if (data.implementationLocationEn !== undefined) transformed.implementation_location_en = data.implementationLocationEn;
  if (data.implementationLocationAr !== undefined) transformed.implementation_location_ar = data.implementationLocationAr;
  if (data.fundingProviders !== undefined) transformed.funding_providers = data.fundingProviders;
  if (data.donors !== undefined) transformed.donors = data.donors;
  if (data.partners !== undefined) transformed.partners = data.partners;
  if (data.featuredImageUrl !== undefined) transformed.featured_image_url = data.featuredImageUrl;
  if (data.slides !== undefined) transformed.slides = data.slides;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.keywordsEn !== undefined) transformed.keywords_en = data.keywordsEn;
  if (data.keywordsAr !== undefined) transformed.keywords_ar = data.keywordsAr;
  if (data.tagsEn !== undefined) transformed.tags_en = data.tagsEn;
  if (data.tagsAr !== undefined) transformed.tags_ar = data.tagsAr;
  if (data.includeInSitemapEn !== undefined) transformed.include_in_sitemap_en = data.includeInSitemapEn;
  if (data.includeInSitemapAr !== undefined) transformed.include_in_sitemap_ar = data.includeInSitemapAr;
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
    .from("programs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
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
    delete (payload as Record<string, unknown>).created_by;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("programs")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
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

  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}


