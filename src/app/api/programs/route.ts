import { NextRequest, NextResponse } from "next/server";
import { ProgramsRepository } from "@/lib/db/repositories/programs";
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

  try {
    let programs;
    
    if (search) {
      // Use search method if search query is provided
      programs = await ProgramsRepository.search(search, true);
      // Apply manual pagination for search results
      programs = programs.slice(offset, offset + limit);
    } else {
      // Use standard findMany with pagination
      programs = await ProgramsRepository.findMany({
        published: true,
        limit,
        offset,
        orderBy: "createdAt",
        order: "desc",
      });
    }

    // Transform the data to match the frontend interface
    const transformedData = programs?.map(program => ({
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
      pageViews: program.pageViews || 0,
      createdBy: "", // We don't expose this in the public API
      isPublished: program.isPublished,
      publishedAt: program.publishedAt ? new Date(program.publishedAt) : null,
      createdAt: program.createdAt ? new Date(program.createdAt) : null,
      updatedAt: program.updatedAt ? new Date(program.updatedAt) : null
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
