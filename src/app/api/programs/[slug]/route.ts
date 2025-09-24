import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await supabaseServer();
    const { slug } = await params;

    // First, fetch the program
    const { data, error } = await supabase
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
      .or(`slug_en.eq.${slug},slug_ar.eq.${slug}`)
      .eq("is_published", true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: "Program not found" }, { status: 404 });
      }
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Increment page views atomically
    const { error: updateError } = await supabase
      .from("programs")
      .update({ 
        page_views: (data.page_views || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq("id", data.id);

    if (updateError) {
      console.error("Error updating page views:", updateError);
      // Don't fail the request if page view update fails, just log it
    }

    // Transform the data to match the frontend interface
    const transformedData = {
      id: data.id,
      titleEn: data.title_en,
      titleAr: data.title_ar,
      descriptionEn: data.description_en,
      descriptionAr: data.description_ar,
      aboutEn: data.about_en || "",
      aboutAr: data.about_ar || "",
      goalsEn: data.goals_en || [],
      goalsAr: data.goals_ar || [],
      statics: data.statics || [],
      icon: data.icon || "target",
      color: data.color || "#3498DB",
      implementationLocationEn: data.implementation_location_en || "",
      implementationLocationAr: data.implementation_location_ar || "",
      fundingProviders: data.funding_providers || [],
      donors: data.donors || [],
      partners: data.partners || [],
      featuredImageUrl: data.featured_image_url || "/assets/mockimage.jpg",
      slides: data.slides || [],
      slugEn: data.slug_en,
      slugAr: data.slug_ar,
      keywordsEn: data.keywords_en || [],
      keywordsAr: data.keywords_ar || [],
      tagsEn: data.tags_en || [],
      tagsAr: data.tags_ar || [],
      includeInSitemapEn: data.include_in_sitemap_en !== false,
      includeInSitemapAr: data.include_in_sitemap_ar !== false,
      pageViews: (data.page_views || 0) + 1, // Return the incremented count
      createdBy: "", // We don't expose this in the public API
      isPublished: data.is_published,
      publishedAt: new Date(data.published_at),
      createdAt: new Date(data.created_at),
      updatedAt: new Date() // Current timestamp since we just updated it
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
