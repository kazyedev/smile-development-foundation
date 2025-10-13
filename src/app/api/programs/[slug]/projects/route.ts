import { NextResponse } from "next/server";
import { ProgramsRepository } from "@/lib/db/repositories/programs";
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
    const decodedSlug = decodeURIComponent(slug);

    // First, get the program from the slug
    const program = await ProgramsRepository.findBySlug(decodedSlug);

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // Then fetch projects linked to this program
    const projectsData = await ProjectsRepository.findByProgramId(program.id, true);

    // Transform the data to match the frontend interface
    const transformedData = projectsData?.map(project => ({
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
      pageViews: project.pageViews || 0,
      cost: project.cost || [],
      beneficiaries: project.beneficiaries || [],
      programId: project.programId || 0,
      isPublished: project.isPublished,
      publishedAt: project.publishedAt ? new Date(project.publishedAt) : null,
      createdAt: project.createdAt ? new Date(project.createdAt) : null,
      updatedAt: project.updatedAt ? new Date(project.updatedAt) : null,
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
    })) || [];

    return NextResponse.json({ 
      items: transformedData,
      total: transformedData.length,
      programId: program.id
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
