import { NextRequest, NextResponse } from "next/server";
import { ActivitiesRepository } from "@/lib/db/repositories/activities";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    if (!decodedSlug) {
      return NextResponse.json(
        {
          success: false,
          error: "Slug parameter is required"
        },
        { status: 400 }
      );
    }

    // Find the activity by slug
    const activity = await ActivitiesRepository.findBySlug(decodedSlug);

    if (!activity) {
      return NextResponse.json(
        {
          success: false,
          error: "Activity not found"
        },
        { status: 404 }
      );
    }

    // Increment view count
    try {
      await ActivitiesRepository.incrementViews(activity.id);
    } catch (viewError) {
      // Log error but don't fail the request
      console.error("Failed to increment views:", viewError);
    }

    // Add unified fields for compatibility
    const enhancedActivity = {
      ...activity,
      slug: activity.slugEn, // Use English slug as primary
      tags: activity.tagsEn || [],
      keywords: activity.keywordsEn || [],
      otherImages: activity.otherImagesUrl || []
    };

    return NextResponse.json({
      success: true,
      item: enhancedActivity
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch activity",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
