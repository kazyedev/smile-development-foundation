import { NextRequest, NextResponse } from "next/server";
import { SuccessStoriesRepository } from "@/lib/db/repositories/successStories";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const programId = searchParams.get("programId");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof any) || "publishedAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const search = searchParams.get("search");

    // Build filter options
    const filterOptions = {
      published: published === "true" ? true : published === "false" ? false : undefined,
      programId: programId ? parseInt(programId) : undefined,
      limit,
      offset,
      orderBy,
      order,
    };

    let stories;
    let total;
    
    if (search && search.trim()) {
      // Use search functionality
      stories = await SuccessStoriesRepository.search(
        search.trim(),
        filterOptions.published
      );
      total = stories.length;
      
      // Apply pagination to search results
      stories = stories.slice(offset, offset + limit);
    } else {
      // Use regular findMany
      stories = await SuccessStoriesRepository.findMany(filterOptions);
      
      // Get total count for pagination
      total = await SuccessStoriesRepository.getTotalCount({
        published: filterOptions.published,
        programId: filterOptions.programId,
      });
    }

    // Add unified fields for compatibility
    const enhancedStories = stories.map(story => ({
      ...story,
      slug: story.slugEn, // Use English slug as primary
      tags: story.tagsEn || [],
      keywords: story.keywordsEn || [],
      otherImages: story.otherImagesUrl || []
    }));

    return NextResponse.json({
      success: true,
      items: enhancedStories,
      total,
      pagination: {
        limit,
        offset,
        hasMore: stories.length === limit && (offset + limit) < total
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch success stories",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
