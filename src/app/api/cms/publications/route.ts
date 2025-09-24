import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertPublicationSchema } from "@/lib/db/schema/publications";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  return {
    is_english: data.isEnglish,
    is_arabic: data.isArabic,
    title_en: data.titleEn,
    title_ar: data.titleAr,
    description_en: data.descriptionEn,
    description_ar: data.descriptionAr,
    url: data.url,
    program_id: data.programId,
    project_id: data.projectId,
    activity_id: data.activityId,
    category_id: data.categoryId,
    featured_image_url: data.featuredImageUrl,
    cover_image_url: data.coverImageUrl,
    attachment_url: data.attachmentUrl,
    content_en: data.contentEn,
    content_ar: data.contentAr,
    author_en: data.authorEn,
    author_ar: data.authorAr,
    slug_en: data.slugEn,
    slug_ar: data.slugAr,
    keywords_en: data.keywordsEn,
    keywords_ar: data.keywordsAr,
    tags_en: data.tagsEn,
    tags_ar: data.tagsAr,
    page_views: data.pageViews,
    downloads: data.downloads,
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
    .from("publications")
    .select(
      "id, title_en, title_ar, is_published, page_views, downloads, created_at, url, featured_image_url, program_id, project_id, activity_id, category_id, author_en, author_ar"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%,author_en.ilike.%${search}%,author_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/cms/publications - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/cms/publications - Starting request");
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
    const validatedData = insertPublicationSchema.parse(body);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);
    console.log("Database data:", JSON.stringify(databaseData, null, 2));

    const { data, error } = await supabase
      .from("publications")
      .insert(databaseData)
      .select()
      .single();

    console.log("Database result:", { data: data?.id, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully created publication:", data?.id);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/publications - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}
