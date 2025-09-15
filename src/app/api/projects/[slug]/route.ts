import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await supabaseServer();
    const { slug } = params;

    const { data, error } = await supabase
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
      .or(`slug_en.eq.${slug},slug_ar.eq.${slug}`)
      .eq("is_published", true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Transform the data to match the frontend interface
    const transformedData = {
      id: data.id,
      titleEn: data.title_en,
      titleAr: data.title_ar,
      descriptionEn: data.description_en,
      descriptionAr: data.description_ar,
      featuredImageUrl: data.featured_image_url,
      color: data.color,
      slugEn: data.slug_en,
      slugAr: data.slug_ar,
      keywordsEn: data.keywords_en || [],
      keywordsAr: data.keywords_ar || [],
      tagsEn: data.tags_en || [],
      tagsAr: data.tags_ar || [],
      pageViews: data.page_views || 0,
      cost: data.cost || [],
      beneficiaries: data.beneficiaries || [],
      isPublished: data.is_published,
      publishedAt: new Date(data.published_at),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
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
    };

    return NextResponse.json(transformedData);

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
