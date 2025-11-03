import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertNewsCategorySchema } from "@/lib/db/schema/newsCategories";

// Transform camelCase fields to snake_case for Supabase
// Using conditional transformation to only include defined fields
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.nameEn !== undefined) transformed.name_en = data.nameEn;
  if (data.nameAr !== undefined) transformed.name_ar = data.nameAr;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.descriptionEn !== undefined) transformed.description_en = data.descriptionEn;
  if (data.descriptionAr !== undefined) transformed.description_ar = data.descriptionAr;
  if (data.color !== undefined) transformed.color = data.color;
  if (data.icon !== undefined) transformed.icon = data.icon;
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
    .from("news_categories")
    .select(
      "id, name_en, name_ar, is_published, page_views, created_at"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`name_en.ilike.%${search}%,name_ar.ilike.%${search}%`);
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
    const validatedData = insertNewsCategorySchema.parse(body);

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);

    const { data, error } = await supabase
      .from("news_categories")
      .insert(databaseData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/news-categories - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}

