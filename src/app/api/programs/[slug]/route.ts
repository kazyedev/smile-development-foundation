import { NextResponse } from "next/server";
import { ProgramsRepository } from "@/lib/db/repositories/programs";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Get database instance
    const database = db();
    if (!database) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { slug } = await params;
    
    // Decode the slug
    const decodedSlug = decodeURIComponent(slug);

    // Fetch the program using Drizzle
    const program = await ProgramsRepository.findBySlug(decodedSlug);

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // Increment page views asynchronously (don't wait for it)
    ProgramsRepository.incrementPageViews(program.id).catch(err => {
      console.error("Error updating page views:", err);
    });

    // Transform the data to match the frontend interface
    const transformedData = {
      id: program.id,
      titleEn: program.titleEn,
      titleAr: program.titleAr,
      descriptionEn: program.descriptionEn,
      descriptionAr: program.descriptionAr,
      aboutEn: program.aboutEn || "",
      aboutAr: program.aboutAr || "",
      goalsEn: program.goalsEn || [],
      goalsAr: program.goalsAr || [],
      statics: program.statics || [],
      icon: program.icon || "target",
      color: program.color || "#3498DB",
      implementationLocationEn: program.implementationLocationEn || "",
      implementationLocationAr: program.implementationLocationAr || "",
      fundingProviders: program.fundingProviders || [],
      donors: program.donors || [],
      partners: program.partners || [],
      featuredImageUrl: program.featuredImageUrl || "/assets/mockimage.jpg",
      slides: program.slides || [],
      slugEn: program.slugEn,
      slugAr: program.slugAr,
      keywordsEn: program.keywordsEn || [],
      keywordsAr: program.keywordsAr || [],
      tagsEn: program.tagsEn || [],
      tagsAr: program.tagsAr || [],
      includeInSitemapEn: program.includeInSitemapEn !== false,
      includeInSitemapAr: program.includeInSitemapAr !== false,
      pageViews: (program.pageViews || 0) + 1, // Return the incremented count
      createdBy: "", // We don't expose this in the public API
      isPublished: program.isPublished,
      publishedAt: program.publishedAt ? new Date(program.publishedAt) : null,
      createdAt: program.createdAt ? new Date(program.createdAt) : null,
      updatedAt: new Date() // Current timestamp since we just updated views
    };

    return NextResponse.json(transformedData);

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
