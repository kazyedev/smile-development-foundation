import { NextRequest, NextResponse } from "next/server";
import { SuccessStoriesRepository } from "@/lib/db/repositories/successStories";

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

    // Find the success story by slug
    const story = await SuccessStoriesRepository.findBySlug(decodedSlug);

    if (!story) {
      return NextResponse.json(
        {
          success: false,
          error: "Success story not found"
        },
        { status: 404 }
      );
    }

    // Increment view count
    try {
      await SuccessStoriesRepository.incrementViews(story.id);
    } catch (viewError) {
      // Log error but don't fail the request
      console.error("Failed to increment views:", viewError);
    }

    // Add unified fields for compatibility
    const enhancedStory = {
      ...story,
      slug: story.slugEn, // Use English slug as primary
      tags: story.tagsEn || [],
      keywords: story.keywordsEn || [],
      otherImages: story.otherImagesUrl || []
    };

    return NextResponse.json({
      success: true,
      item: enhancedStory
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch success story",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
