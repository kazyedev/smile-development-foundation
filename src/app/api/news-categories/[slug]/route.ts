import { NextRequest, NextResponse } from "next/server";
import { NewsCategoriesRepository } from "@/lib/db/repositories/newsCategories";

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

    // Find the category by slug
    const category = await NewsCategoriesRepository.findBySlug(decodedSlug);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: "News category not found"
        },
        { status: 404 }
      );
    }

    // Increment view count
    try {
      await NewsCategoriesRepository.incrementViews(category.id);
    } catch (viewError) {
      // Log error but don't fail the request
      console.error("Failed to increment views:", viewError);
    }

    return NextResponse.json({
      success: true,
      item: category
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news category",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
