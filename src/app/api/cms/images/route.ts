import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertImageSchema } from "@/lib/db/schema/images";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  return {
    title_en: data.titleEn,
    title_ar: data.titleAr,
    description_en: data.descriptionEn,
    description_ar: data.descriptionAr,
    mime_type: data.mimeType,
    size: data.size,
    width: data.width,
    height: data.height,
    url: data.url,
    alt: data.alt,
    location_en: data.locationEn,
    location_ar: data.locationAr,
    taken_at: data.takenAt,
    photographer: data.photographer,
    is_public: data.isPublic,
    program_id: data.programId,
    project_id: data.projectId,
    activity_id: data.activityId,
    category_id: data.categoryId,
    slug_en: data.slugEn,
    slug_ar: data.slugAr,
    keywords_en: data.keywordsEn,
    keywords_ar: data.keywordsAr,
    tags_en: data.tagsEn,
    tags_ar: data.tagsAr,
    views: data.views,
    is_published: data.isPublished,
    published_at: data.publishedAt,
    created_at: data.createdAt,
    updated_at: data.updatedAt
  };
};

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  
  let query = supabase
    .from("images")
    .select(
      "id, title_en, title_ar, is_published, views, created_at, mime_type, size, width, height, url, photographer"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/cms/images - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/cms/images - Starting request");
    const supabase = await supabaseServer();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log("Auth result:", { user: user?.id, authError });
    if (authError || !user) {
      console.log("Authentication failed");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    // Validate the input
    const validatedData = insertImageSchema.parse(body);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);
    console.log("Database data:", JSON.stringify(databaseData, null, 2));

    const { data, error } = await supabase
      .from("images")
      .insert(databaseData)
      .select()
      .single();

    console.log("Database result:", { data: data?.id, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully created image:", data?.id);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/images - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}
