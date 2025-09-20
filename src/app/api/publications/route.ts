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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const search = searchParams.get("search") || undefined;
    const programId = searchParams.get("programId") ? parseInt(searchParams.get("programId")!) : undefined;
    const projectId = searchParams.get("projectId") ? parseInt(searchParams.get("projectId")!) : undefined;
    const activityId = searchParams.get("activityId") ? parseInt(searchParams.get("activityId")!) : undefined;
    const categoryId = searchParams.get("categoryId") ? parseInt(searchParams.get("categoryId")!) : undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const orderByParam = searchParams.get("orderBy") || "publishedAt";
    // Ensure orderBy is a valid field
    const validOrderByFields = ['publishedAt', 'createdAt', 'updatedAt', 'pageViews', 'downloads', 'titleEn', 'titleAr'];
    const orderBy = validOrderByFields.includes(orderByParam) ? orderByParam : 'publishedAt';
    const order = searchParams.get("order") as "asc" | "desc" || "desc";
    const published = searchParams.get("published") !== "false"; // Default to true (published only)

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    let publications: any[];
    let totalCount: number;

    // If search query exists, use search function
    if (search) {
      publications = await PublicationsRepository.search(search, published);
      // Filter by additional parameters if needed
      if (programId) {
        publications = publications.filter(pub => pub.programId === programId);
      }
      if (projectId) {
        publications = publications.filter(pub => pub.projectId === projectId);
      }
      if (activityId) {
        publications = publications.filter(pub => pub.activityId === activityId);
      }
      if (categoryId) {
        publications = publications.filter(pub => pub.categoryId === categoryId);
      }
      
      totalCount = publications.length;
      // Apply pagination manually for search results
      publications = publications.slice(offset, offset + limit);
    } else {
      // Use findMany for regular queries with filters
      publications = await PublicationsRepository.findMany({
        published,
        programId,
        projectId,
        activityId,
        categoryId,
        limit,
        offset,
        orderBy,
        order,
      });

      // Get total count for pagination
      totalCount = await PublicationsRepository.getTotalCount({
        published,
        programId,
        projectId,
        activityId,
        categoryId,
        search,
      });
    }

    // Transform publications to include enhanced fields
    const enhancedPublications: EnhancedPublication[] = publications.map(publication => ({
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
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      publications: enhancedPublications,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPreviousPage,
        limit,
      },
      success: true,
    });

  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch publications",
        success: false,
      },
      { status: 500 }
    );
  }
}
