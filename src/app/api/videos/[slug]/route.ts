import { NextRequest, NextResponse } from "next/server";
import { VideosRepository } from "@/lib/db/repositories/videos";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    
    const video = await VideosRepository.findBySlug(decodedSlug);
    
    if (!video) {
      return NextResponse.json(
        {
          success: false,
          error: "Video not found",
          details: `No video found with slug: ${decodedSlug}`
        },
        { status: 404 }
      );
    }

    // Increment views when video is accessed
    try {
      await VideosRepository.incrementViews(video.id);
    } catch (viewError) {
      console.error(`Error incrementing views for video ${video.id}:`, viewError);
      // Don't fail the request if view increment fails
    }

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
