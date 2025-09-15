import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  try {
    const supabase = await supabaseServer();
    let query = supabase
      .from("projects")
      .select(`
        id,
        title_en,
        title_ar,
        description_en,
        description_ar,
        featured_image_url,
        color,
        slug_en,
        slug_ar,
        keywords_en,
        keywords_ar,
        tags_en,
        tags_ar,
        page_views,
        cost,
        beneficiaries,
        is_published,
        published_at,
        created_at,
        updated_at
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    // Apply search filter if provided
    if (search) {
      query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%,description_en.ilike.%${search}%,description_ar.ilike.%${search}%`);
    }

    // Apply category filter if provided and not "all"
    if (category && category !== "all") {
      query = query.or(`tags_en.cs.{${category}},tags_ar.cs.{${category}}`);
    }

    // Apply pagination
    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .limit(limit);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Transform the data to match the frontend interface
    const transformedData = data?.map(project => ({
      id: project.id,
      titleEn: project.title_en,
      titleAr: project.title_ar,
      descriptionEn: project.description_en,
      descriptionAr: project.description_ar,
      featuredImageUrl: project.featured_image_url,
      color: project.color,
      slugEn: project.slug_en,
      slugAr: project.slug_ar,
      keywordsEn: project.keywords_en || [],
      keywordsAr: project.keywords_ar || [],
      tagsEn: project.tags_en || [],
      tagsAr: project.tags_ar || [],
      pageViews: project.page_views || 0,
      cost: project.cost || [],
      beneficiaries: project.beneficiaries || [],
      isPublished: project.is_published,
      publishedAt: new Date(project.published_at),
      createdAt: new Date(project.created_at),
      updatedAt: new Date(project.updated_at),
      // Default values for fields not in database yet
      isEnglish: true,
      isArabic: true,
      banners: [],
      goalsEn: [],
      goalsAr: [],
      videoUrl: "",
      statics: [],
      fundingProviders: [],
      donors: [],
      partners: [],
      deliverables: [],
      resources: [],
      programId: 0,
      categoryId: 0,
      activityIds: []
    })) || [];

    return NextResponse.json({ 
      items: transformedData,
      total: count || transformedData.length,
      offset,
      limit
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
