import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.titleEn !== undefined) transformed.title_en = data.titleEn;
  if (data.titleAr !== undefined) transformed.title_ar = data.titleAr;
  if (data.captionEn !== undefined) transformed.caption_en = data.captionEn;
  if (data.captionAr !== undefined) transformed.caption_ar = data.captionAr;
  if (data.locationEn !== undefined) transformed.location_en = data.locationEn;
  if (data.locationAr !== undefined) transformed.location_ar = data.locationAr;
  if (data.featuredImageUrl !== undefined) transformed.featured_image_url = data.featuredImageUrl;
  if (data.linkTextEn !== undefined) transformed.link_text_en = data.linkTextEn;
  if (data.linkTextAr !== undefined) transformed.link_text_ar = data.linkTextAr;
  if (data.linkUrlEn !== undefined) transformed.link_url_en = data.linkUrlEn;
  if (data.linkUrlAr !== undefined) transformed.link_url_ar = data.linkUrlAr;
  if (data.slideType !== undefined) transformed.slide_type = data.slideType;
  if (data.referenceId !== undefined) transformed.reference_id = data.referenceId;
  if (data.sortOrder !== undefined) transformed.sort_order = data.sortOrder;
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
    .from("hero_slides")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  // Transform the response to camelCase
  const transformedData = {
    id: data.id,
    titleEn: data.title_en,
    titleAr: data.title_ar,
    captionEn: data.caption_en,
    captionAr: data.caption_ar,
    locationEn: data.location_en,
    locationAr: data.location_ar,
    featuredImageUrl: data.featured_image_url,
    linkTextEn: data.link_text_en,
    linkTextAr: data.link_text_ar,
    linkUrlEn: data.link_url_en,
    linkUrlAr: data.link_url_ar,
    slideType: data.slide_type,
    referenceId: data.reference_id,
    sortOrder: data.sort_order,
    isPublished: data.is_published,
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };

  return NextResponse.json({ data: transformedData });
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
    delete (payload as Record<string, unknown>).createdAt;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("hero_slides")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Transform response to camelCase
  const transformedData = {
    id: data.id,
    titleEn: data.title_en,
    titleAr: data.title_ar,
    captionEn: data.caption_en,
    captionAr: data.caption_ar,
    locationEn: data.location_en,
    locationAr: data.location_ar,
    featuredImageUrl: data.featured_image_url,
    linkTextEn: data.link_text_en,
    linkTextAr: data.link_text_ar,
    linkUrlEn: data.link_url_en,
    linkUrlAr: data.link_url_ar,
    slideType: data.slide_type,
    referenceId: data.reference_id,
    sortOrder: data.sort_order,
    isPublished: data.is_published,
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };

  return NextResponse.json({ data: transformedData });
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

  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

