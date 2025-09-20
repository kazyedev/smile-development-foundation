import { NextRequest, NextResponse } from "next/server";
import { NewsRepository } from "@/lib/db/repositories/news";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const categoryId = searchParams.get("categoryId");
    const programId = searchParams.get("programId");
    const projectId = searchParams.get("projectId");
    const activityId = searchParams.get("activityId");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof any) || "publishedAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const search = searchParams.get("search");

    // Build filter options
    const filterOptions = {
      published: published === "true" ? true : published === "false" ? false : undefined,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      programId: programId ? parseInt(programId) : undefined,
      projectId: projectId ? parseInt(projectId) : undefined,
      activityId: activityId ? parseInt(activityId) : undefined,
      limit,
      offset,
      orderBy,
      order,
    };

    let newsItems;
    let total;
    
    if (search && search.trim()) {
      // Use search functionality
      newsItems = await NewsRepository.search(
        search.trim(),
        filterOptions.published
      );
      total = newsItems.length;
      
      // Apply pagination to search results
      newsItems = newsItems.slice(offset, offset + limit);
    } else {
      // Use regular findMany
      newsItems = await NewsRepository.findMany(filterOptions);
      
      // Get total count for pagination
      total = await NewsRepository.getTotalCount({
        published: filterOptions.published,
        categoryId: filterOptions.categoryId,
        programId: filterOptions.programId,
        projectId: filterOptions.projectId,
        activityId: filterOptions.activityId,
      });
    }

    return NextResponse.json({
      success: true,
      items: newsItems,
      total,
      pagination: {
        limit,
        offset,
        hasMore: newsItems.length === limit && (offset + limit) < total
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
