import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertSuccessStorySchema } from "@/lib/db/schema/successStories";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  return {
    is_english: data.isEnglish,
    is_arabic: data.isArabic,
    title_en: data.titleEn,
    title_ar: data.titleAr,
    featured_image_url: data.featuredImageUrl,
    video: data.video,
    program_id: data.programId,
    person_name_en: data.personNameEn,
    person_name_ar: data.personNameAr,
    person_age: data.personAge,
    person_location_en: data.personLocationEn,
    person_location_ar: data.personLocationAr,
    city_en: data.cityEn,
    city_ar: data.cityAr,
    other_images_url: data.otherImagesUrl,
    content_en: data.contentEn,
    content_ar: data.contentAr,
    slug_en: data.slugEn,
    slug_ar: data.slugAr,
    keywords_en: data.keywordsEn,
    keywords_ar: data.keywordsAr,
    tags_en: data.tagsEn,
    tags_ar: data.tagsAr,
    read_time: data.readTime,
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
    .from("success_stories")
    .select(
      "id, title_en, title_ar, is_published, page_views, created_at, person_name_en, person_name_ar, person_age, city_en, city_ar"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%,person_name_en.ilike.%${search}%,person_name_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/cms/success-stories - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/cms/success-stories - Starting request");
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
    const validatedData = insertSuccessStorySchema.parse(body);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);
    console.log("Database data:", JSON.stringify(databaseData, null, 2));

    const { data, error } = await supabase
      .from("success_stories")
      .insert(databaseData)
      .select()
      .single();

    console.log("Database result:", { data: data?.id, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully created success story:", data?.id);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/success-stories - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}
