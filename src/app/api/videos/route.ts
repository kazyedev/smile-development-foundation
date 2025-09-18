import { NextRequest, NextResponse } from "next/server";
import { VideosRepository } from "@/lib/db/repositories/videos";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const categoryId = searchParams.get("categoryId");
    const isPublic = searchParams.get("isPublic");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof any) || "createdAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const search = searchParams.get("search");

    // Build filter options
    const filterOptions = {
      published: published === "true" ? true : published === "false" ? false : undefined,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      isPublic: isPublic === "true" ? true : isPublic === "false" ? false : undefined,
      limit,
      offset,
      orderBy,
      order,
    };

    let videos;
    
    if (search) {
      // Use search functionality
      videos = await VideosRepository.search(
        search,
        filterOptions.published,
        filterOptions.isPublic
      );
    } else {
      // Use regular findMany
      videos = await VideosRepository.findMany(filterOptions);
    }

    return NextResponse.json({
      success: true,
      items: videos,
      total: videos.length,
      pagination: {
        limit,
        offset,
        hasMore: videos.length === limit
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch videos",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
