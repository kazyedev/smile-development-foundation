import { NextRequest, NextResponse } from "next/server";
import { VideosRepository } from "@/lib/db/repositories/videos";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = decodeURIComponent(params.slug);
    
    const video = await VideosRepository.findBySlug(slug);
    
    if (!video) {
      return NextResponse.json(
        {
          success: false,
          error: "Video not found",
          details: `No video found with slug: ${slug}`
        },
        { status: 404 }
      );
    }

    // Increment views when video is accessed
    await VideosRepository.incrementViews(video.id);

    return NextResponse.json({
      success: true,
      ...video
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch video",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
