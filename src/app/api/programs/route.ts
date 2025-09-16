import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const search = searchParams.get("search");

  try {
    const supabase = await supabaseServer();
    let query = supabase
      .from("programs")
      .select(`
        id,
        title_en,
        title_ar,
        description_en,
        description_ar,
        about_en,
        about_ar,
        goals_en,
        goals_ar,
        statics,
        icon,
        color,
        implementation_location_en,
        implementation_location_ar,
        funding_providers,
        donors,
        partners,
        featured_image_url,
        slides,
        slug_en,
        slug_ar,
        keywords_en,
        keywords_ar,
        tags_en,
        tags_ar,
        include_in_sitemap_en,
        include_in_sitemap_ar,
        page_views,
        is_published,
        published_at,
        created_at,
        updated_at
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    // Apply search filter if provided
    if (search) {
      query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%,description_en.ilike.%${search}%,description_ar.ilike.%${search}%,implementation_location_en.ilike.%${search}%,implementation_location_ar.ilike.%${search}%`);
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
    const transformedData = data?.map(program => ({
      id: program.id,
      titleEn: program.title_en,
      titleAr: program.title_ar,
      descriptionEn: program.description_en,
      descriptionAr: program.description_ar,
      aboutEn: program.about_en || "",
      aboutAr: program.about_ar || "",
      goalsEn: program.goals_en || [],
      goalsAr: program.goals_ar || [],
      statics: program.statics || [],
      icon: program.icon || "target",
      color: program.color || "#3498DB",
      implementationLocationEn: program.implementation_location_en || "",
      implementationLocationAr: program.implementation_location_ar || "",
      fundingProviders: program.funding_providers || [],
      donors: program.donors || [],
      partners: program.partners || [],
      featuredImageUrl: program.featured_image_url || "/assets/mockimage.jpg",
      slides: program.slides || [],
      slugEn: program.slug_en,
      slugAr: program.slug_ar,
      keywordsEn: program.keywords_en || [],
      keywordsAr: program.keywords_ar || [],
      tagsEn: program.tags_en || [],
      tagsAr: program.tags_ar || [],
      includeInSitemapEn: program.include_in_sitemap_en !== false,
      includeInSitemapAr: program.include_in_sitemap_ar !== false,
      pageViews: program.page_views || 0,
      createdBy: "", // We don't expose this in the public API
      isPublished: program.is_published,
      publishedAt: new Date(program.published_at),
      createdAt: new Date(program.created_at),
      updatedAt: new Date(program.updated_at)
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
