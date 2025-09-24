import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertActivitySchema } from "@/lib/db/schema/activities";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  return {
    is_arabic: data.isArabic,
    is_english: data.isEnglish,
    title_en: data.titleEn,
    title_ar: data.titleAr,
    featured_image_url: data.featuredImageUrl,
    date: data.date,
    content_en: data.contentEn,
    content_ar: data.contentAr,
    other_images_url: data.otherImagesUrl,
    program_id: data.programId,
    project_id: data.projectId,
    slug_en: data.slugEn,
    slug_ar: data.slugAr,
    keywords_en: data.keywordsEn,
    keywords_ar: data.keywordsAr,
    tags_en: data.tagsEn,
    tags_ar: data.tagsAr,
    page_views: data.pageViews,
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
    .from("activities")
    .select(
      "id, title_en, title_ar, is_published, page_views, created_at, date, featured_image_url, program_id, project_id"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/cms/activities - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/cms/activities - Starting request");
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
    const validatedData = insertActivitySchema.parse(body);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);
    console.log("Database data:", JSON.stringify(databaseData, null, 2));

    const { data, error } = await supabase
      .from("activities")
      .insert(databaseData)
      .select()
      .single();

    console.log("Database result:", { data: data?.id, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully created activity:", data?.id);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/activities - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}
