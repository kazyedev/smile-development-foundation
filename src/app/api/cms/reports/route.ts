import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertReportSchema } from "@/lib/db/schema/reports";

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
    category_id: data.categoryId,
    featured_image_url: data.featuredImageUrl,
    slug_en: data.slugEn,
    slug_ar: data.slugAr,
    keywords_en: data.keywordsEn,
    keywords_ar: data.keywordsAr,
    tags_en: data.tagsEn,
    tags_ar: data.tagsAr,
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
    .from("reports")
    .select(
      "id, title_en, title_ar, is_published, downloads, created_at, url, featured_image_url, category_id"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/cms/reports - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/cms/reports - Starting request");
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
    const validatedData = insertReportSchema.parse(body);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);
    console.log("Database data:", JSON.stringify(databaseData, null, 2));

    const { data, error } = await supabase
      .from("reports")
      .insert(databaseData)
      .select()
      .single();

    console.log("Database result:", { data: data?.id, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully created report:", data?.id);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/reports - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}
