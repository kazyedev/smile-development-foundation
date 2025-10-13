import { NextResponse } from "next/server";
import { ProjectsRepository } from "@/lib/db/repositories/projects";
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

    // Fetch the project using Drizzle
    const project = await ProjectsRepository.findBySlug(decodedSlug);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Increment page views asynchronously (don't wait for it)
    ProjectsRepository.incrementPageViews(project.id).catch(err => {
      console.error("Error updating page views:", err);
    });

    // Transform the data to match the frontend interface
    const transformedData = {
      id: project.id,
      titleEn: project.titleEn,
      titleAr: project.titleAr,
      descriptionEn: project.descriptionEn,
      descriptionAr: project.descriptionAr,
      featuredImageUrl: project.featuredImageUrl || "/assets/mockimage.jpg",
      color: project.color || "#3498DB",
      slugEn: project.slugEn,
      slugAr: project.slugAr,
      keywordsEn: project.keywordsEn || [],
      keywordsAr: project.keywordsAr || [],
      tagsEn: project.tagsEn || [],
      tagsAr: project.tagsAr || [],
      pageViews: (project.pageViews || 0) + 1, // Return the incremented count
      cost: project.cost || [],
      beneficiaries: project.beneficiaries || [],
      programId: project.programId || 0,
      isPublished: project.isPublished,
      publishedAt: project.publishedAt ? new Date(project.publishedAt) : null,
      createdAt: project.createdAt ? new Date(project.createdAt) : null,
      updatedAt: new Date(), // Current timestamp since we just updated views
      // Optional fields with defaults
      isEnglish: project.isEnglish ?? true,
      isArabic: project.isArabic ?? true,
      banners: project.banners || [],
      goalsEn: project.goalsEn || [],
      goalsAr: project.goalsAr || [],
      videoUrl: project.videoUrl || "",
      statics: project.statics || [],
      fundingProviders: project.fundingProviders || [],
      donors: project.donors || [],
      partners: project.partners || [],
      deliverables: project.deliverables || [],
      resources: project.resources || [],
      categoryId: project.categoryId || 0,
      activityIds: project.activityIds || []
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
