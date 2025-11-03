import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertHeroSlideSchema } from "@/lib/db/schema/heroSlides";

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

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const isPublished = searchParams.get('isPublished');
  
  let query = supabase
    .from("hero_slides")
    .select(
      "id, title_en, title_ar, featured_image_url, is_published, sort_order, created_at"
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Apply search filter
  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%`);
  }

  // Apply published filter
  if (isPublished === "true") {
    query = query.eq("is_published", true);
  } else if (isPublished === "false") {
    query = query.eq("is_published", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await supabaseServer();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate the input
    const validatedData = insertHeroSlideSchema.parse(body);

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);

    const { data, error } = await supabase
      .from("hero_slides")
      .insert(databaseData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/hero-slides - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}

