import { NextRequest, NextResponse } from "next/server";
import { ReportsRepository } from "@/lib/db/repositories/reports";

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

    // Find the report by slug
    const report = await ReportsRepository.findBySlug(decodedSlug);

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: "Report not found"
        },
        { status: 404 }
      );
    }

    // Increment download count
    try {
      await ReportsRepository.incrementDownloads(report.id);
    } catch (downloadError) {
      // Log error but don't fail the request
      console.error("Failed to increment downloads:", downloadError);
    }

    // Add unified fields for compatibility
    const enhancedReport = {
      ...report,
      slug: report.slugEn, // Use English slug as primary
      tags: report.tagsEn || [],
      keywords: report.keywordsEn || [],
    };

    return NextResponse.json({
      success: true,
      item: enhancedReport
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch report",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
