import { NextRequest, NextResponse } from "next/server";
import { ImagesRepository } from "@/lib/db/repositories/images";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Find image by slug (English or Arabic)
    const image = await ImagesRepository.findBySlug(decodedSlug);

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: "Image not found",
          details: `No image found with slug: ${decodedSlug}`
        },
        { status: 404 }
      );
    }

    // Increment view count (async, don't wait for it)
    ImagesRepository.incrementViews(image.id).catch(console.error);

    return NextResponse.json(image);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch image",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
