import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await supabaseServer();
    const { slug } = await params;

    // First, get the program ID from the slug
    const { data: programData, error: programError } = await supabase
      .from("programs")
      .select("id")
      .or(`slug_en.eq.${slug},slug_ar.eq.${slug}`)
      .eq("is_published", true)
      .single();

    if (programError || !programData) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // Then fetch projects linked to this program
    const { data: projectsData, error: projectsError } = await supabase
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
        program_id,
        is_published,
        published_at,
        created_at,
        updated_at
      `)
      .eq("program_id", programData.id)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (projectsError) {
      console.error("Database error:", projectsError);
      return NextResponse.json({ error: projectsError.message }, { status: 400 });
    }

    // Transform the data to match the frontend interface
    const transformedData = projectsData?.map(project => ({
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
      programId: project.program_id || 0,
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
      categoryId: 0,
      activityIds: []
    })) || [];

    return NextResponse.json({ 
      items: transformedData,
      total: transformedData.length,
      programId: programData.id
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
