import { NextRequest, NextResponse } from "next/server";
import { PublicationsRepository } from "@/lib/db/repositories/publications";

// Enhanced publication interface for frontend
interface EnhancedPublication {
  id: number;
  titleEn: string | null;
  titleAr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  contentEn: string | null;
  contentAr: string | null;
  slugEn: string | null;
  slugAr: string | null;
  coverImageUrl: string | null;
  attachmentUrl: string | null;
  authorEn: string | null;
  authorAr: string | null;
  keywordsEn: string[] | null;
  keywordsAr: string[] | null;
  tagsEn: string[] | null;
  tagsAr: string[] | null;
  categoryId: number | null;
  programId: number | null;
  projectId: number | null;
  activityId: number | null;
  publishedAt: Date | null;
  pageViews: number | null;
  downloads: number | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  // Enhanced fields for frontend consistency
  slug: string;
  tags: string[];
  keywords: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find publication by slug (English or Arabic)
    const publication = await PublicationsRepository.findBySlug(slug);

    if (!publication) {
      return NextResponse.json(
        {
          error: "Publication not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Increment page views
    await PublicationsRepository.incrementViews(publication.id);

    // Transform publication to include enhanced fields
    const enhancedPublication: EnhancedPublication = {
      ...publication,
      // Use English slug as primary slug, fallback to Arabic
      slug: publication.slugEn || publication.slugAr || `publication-${publication.id}`,
      // Combine tags for easier frontend handling
      tags: [
        ...(publication.tagsEn || []),
        ...(publication.tagsAr || [])
      ].filter(Boolean),
      // Combine keywords for easier frontend handling
      keywords: [
        ...(publication.keywordsEn || []),
        ...(publication.keywordsAr || [])
      ].filter(Boolean),
    };

    return NextResponse.json({
      publication: enhancedPublication,
      success: true,
    });

  } catch (error) {
    console.error("Error fetching publication:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch publication",
        success: false,
      },
      { status: 500 }
    );
  }
}

// Handle download tracking
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const action = body.action;

    if (action !== "download") {
      return NextResponse.json(
        {
          error: "Invalid action",
          success: false,
        },
        { status: 400 }
      );
    }

    // Find publication by slug
    const publication = await PublicationsRepository.findBySlug(slug);

    if (!publication) {
      return NextResponse.json(
        {
          error: "Publication not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Increment downloads count
    const newDownloadCount = await PublicationsRepository.incrementDownloads(publication.id);

    return NextResponse.json({
      success: true,
      downloads: newDownloadCount,
      message: "Download tracked successfully",
    });

  } catch (error) {
    console.error("Error tracking download:", error);
    return NextResponse.json(
      {
        error: "Failed to track download",
        success: false,
      },
      { status: 500 }
    );
  }
}
