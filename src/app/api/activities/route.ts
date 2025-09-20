import { NextRequest, NextResponse } from "next/server";
import { ActivitiesRepository } from "@/lib/db/repositories/activities";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const programId = searchParams.get("programId");
    const projectId = searchParams.get("projectId");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof any) || "publishedAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const search = searchParams.get("search");

    // Build filter options
    const filterOptions = {
      published: published === "true" ? true : published === "false" ? false : undefined,
      programId: programId ? parseInt(programId) : undefined,
      projectId: projectId ? parseInt(projectId) : undefined,
      limit,
      offset,
      orderBy,
      order,
    };

    let activities;
    let total;
    
    if (search && search.trim()) {
      // Use search functionality
      activities = await ActivitiesRepository.search(
        search.trim(),
        filterOptions.published
      );
      total = activities.length;
      
      // Apply pagination to search results
      activities = activities.slice(offset, offset + limit);
    } else {
      // Use regular findMany
      activities = await ActivitiesRepository.findMany(filterOptions);
      
      // Get total count for pagination
      total = await ActivitiesRepository.getTotalCount({
        published: filterOptions.published,
        programId: filterOptions.programId,
        projectId: filterOptions.projectId,
      });
    }

    // Add unified fields for compatibility
    const enhancedActivities = activities.map(activity => ({
      ...activity,
      slug: activity.slugEn, // Use English slug as primary
      tags: activity.tagsEn || [],
      keywords: activity.keywordsEn || [],
      otherImages: activity.otherImagesUrl || []
    }));

    return NextResponse.json({
      success: true,
      items: enhancedActivities,
      total,
      pagination: {
        limit,
        offset,
        hasMore: activities.length === limit && (offset + limit) < total
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch activities",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
