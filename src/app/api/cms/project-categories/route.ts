import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertProjectCategorySchema } from "@/lib/db/schema/projectCategories";

// Transform camelCase fields to snake_case for Supabase
// Using conditional transformation to only include defined fields
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.titleEn !== undefined) transformed.title_en = data.titleEn;
  if (data.titleAr !== undefined) transformed.title_ar = data.titleAr;
  if (data.featuredImageUrl !== undefined) transformed.featured_image_url = data.featuredImageUrl;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.descriptionEn !== undefined) transformed.description_en = data.descriptionEn;
  if (data.descriptionAr !== undefined) transformed.description_ar = data.descriptionAr;
  if (data.keywordsEn !== undefined) transformed.keywords_en = data.keywordsEn;
  if (data.keywordsAr !== undefined) transformed.keywords_ar = data.keywordsAr;
  if (data.tagsEn !== undefined) transformed.tags_en = data.tagsEn;
  if (data.tagsAr !== undefined) transformed.tags_ar = data.tagsAr;
  if (data.pageViews !== undefined) transformed.page_views = data.pageViews;
  if (data.isPublished !== undefined) transformed.is_published = data.isPublished;
  if (data.publishedAt !== undefined) transformed.published_at = data.publishedAt;
  
  return transformed;
};

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  
  let query = supabase
    .from("project_categories")
    .select(
      "id, title_en, title_ar, is_published, page_views, created_at"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

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
    const validatedData = insertProjectCategorySchema.parse(body);

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);

    const { data, error } = await supabase
      .from("project_categories")
      .insert(databaseData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/project-categories - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}

