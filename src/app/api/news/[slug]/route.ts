import { NextRequest, NextResponse } from "next/server";
import { NewsRepository } from "@/lib/db/repositories/news";

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

    // Find the news item by slug
    const newsItem = await NewsRepository.findBySlug(decodedSlug);

    if (!newsItem) {
      return NextResponse.json(
        {
          success: false,
          error: "News article not found"
        },
        { status: 404 }
      );
    }

    // Increment view count
    try {
      await NewsRepository.incrementViews(newsItem.id);
    } catch (viewError) {
      // Log error but don't fail the request
      console.error("Failed to increment views:", viewError);
    }

    return NextResponse.json({
      success: true,
      item: newsItem
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news article",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
