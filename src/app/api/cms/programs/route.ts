import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertProgramSchema } from "@/lib/db/schema/programs";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  return {
    title_en: data.titleEn,
    title_ar: data.titleAr,
    description_en: data.descriptionEn,
    description_ar: data.descriptionAr,
    about_en: data.aboutEn,
    about_ar: data.aboutAr,
    goals_en: data.goalsEn,
    goals_ar: data.goalsAr,
    statics: data.statics,
    icon: data.icon,
    color: data.color,
    implementation_location_en: data.implementationLocationEn,
    implementation_location_ar: data.implementationLocationAr,
    funding_providers: data.fundingProviders,
    donors: data.donors,
    partners: data.partners,
    featured_image_url: data.featuredImageUrl,
    slides: data.slides,
    slug_en: data.slugEn,
    slug_ar: data.slugAr,
    keywords_en: data.keywordsEn,
    keywords_ar: data.keywordsAr,
    tags_en: data.tagsEn,
    tags_ar: data.tagsAr,
    include_in_sitemap_en: data.includeInSitemapEn,
    include_in_sitemap_ar: data.includeInSitemapAr,
    page_views: data.pageViews,
    created_by: data.createdBy,
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
    .from("programs")
    .select(
      "id, title_en, title_ar, is_published, include_in_sitemap_en, include_in_sitemap_ar, page_views, created_at"
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
    console.log("POST /api/cms/programs - Starting request");
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
    const dataToValidate = {
      ...body,
      createdBy: user.id,
    };
    console.log("Data to validate:", JSON.stringify(dataToValidate, null, 2));
    
    const validatedData = insertProgramSchema.parse(dataToValidate);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);
    console.log("Database data:", JSON.stringify(databaseData, null, 2));

    const { data, error } = await supabase
      .from("programs")
      .insert(databaseData)
      .select()
      .single();

    console.log("Database result:", { data: data?.id, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully created program:", data?.id);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/programs - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}


