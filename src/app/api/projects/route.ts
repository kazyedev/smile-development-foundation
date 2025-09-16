import { NextRequest, NextResponse } from "next/server";
import { ProjectsRepository } from "@/lib/db/repositories/projects";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  // Get database instance
  const database = db();
  if (!database) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const search = searchParams.get("search");
  const programId = searchParams.get("programId");
  const categoryId = searchParams.get("categoryId");

  try {
    let projects;
    
    if (search) {
      // Use search method if search query is provided
      projects = await ProjectsRepository.search(search, true);
      // Apply manual pagination for search results
      projects = projects.slice(offset, offset + limit);
    } else {
      // Use standard findMany with filters and pagination
      projects = await ProjectsRepository.findMany({
        published: true,
        programId: programId ? parseInt(programId, 10) : undefined,
        categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
        limit,
        offset,
        orderBy: "createdAt",
        order: "desc",
      });
    }

    // Transform the data to match the frontend interface
    const transformedData = projects?.map(project => ({
      id: project.id,
      titleEn: project.titleEn,
      titleAr: project.titleAr,
      descriptionEn: project.descriptionEn,
      descriptionAr: project.descriptionAr,
      featuredImageUrl: project.featuredImageUrl,
      color: project.color,
      slugEn: project.slugEn,
      slugAr: project.slugAr,
      keywordsEn: project.keywordsEn || [],
      keywordsAr: project.keywordsAr || [],
      tagsEn: project.tagsEn || [],
      tagsAr: project.tagsAr || [],
      pageViews: project.pageViews || 0,
      cost: project.cost || [],
      beneficiaries: project.beneficiaries || [],
      programId: project.programId || null,
      categoryId: project.categoryId || null,
      activityIds: project.activityIds || [],
      isPublished: project.isPublished,
      publishedAt: project.publishedAt ? new Date(project.publishedAt) : null,
      createdAt: project.createdAt ? new Date(project.createdAt) : null,
      updatedAt: project.updatedAt ? new Date(project.updatedAt) : null,
      // Include all the new fields from Drizzle schema
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
      resources: project.resources || []
    })) || [];

    return NextResponse.json({ 
      items: transformedData,
      total: transformedData.length, // Note: For proper pagination, you'd want to implement a separate count query
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
