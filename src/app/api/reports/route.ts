import { NextRequest, NextResponse } from "next/server";
import { ReportsRepository } from "@/lib/db/repositories/reports";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const categoryId = searchParams.get("categoryId");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof any) || "publishedAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const search = searchParams.get("search");

    // Build filter options
    const filterOptions = {
      published: published === "true" ? true : published === "false" ? false : undefined,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      limit,
      offset,
      orderBy,
      order,
    };

    let reportsData;
    let total;
    
    if (search && search.trim()) {
      // Use search functionality
      reportsData = await ReportsRepository.search(
        search.trim(),
        filterOptions.published
      );
      total = reportsData.length;
      
      // Apply pagination to search results
      reportsData = reportsData.slice(offset, offset + limit);
    } else {
      // Use regular findMany
      reportsData = await ReportsRepository.findMany(filterOptions);
      
      // Get total count for pagination
      total = await ReportsRepository.getTotalCount({
        published: filterOptions.published,
        categoryId: filterOptions.categoryId,
      });
    }

    // Add unified fields for compatibility
    const enhancedReports = reportsData.map(report => ({
      ...report,
      slug: report.slugEn, // Use English slug as primary
      tags: report.tagsEn || [],
      keywords: report.keywordsEn || [],
    }));

    return NextResponse.json({
      success: true,
      items: enhancedReports,
      total,
      pagination: {
        limit,
        offset,
        hasMore: reportsData.length === limit && (offset + limit) < total
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reports",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
