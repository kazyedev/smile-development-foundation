import { NextRequest, NextResponse } from "next/server";
import { NewsCategoriesRepository } from "@/lib/db/repositories/newsCategories";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof any) || "nameEn";
    const order = (searchParams.get("order") as "asc" | "desc") || "asc";
    const search = searchParams.get("search");

    // Build filter options
    const filterOptions = {
      published: published === "true" ? true : published === "false" ? false : undefined,
      limit,
      offset,
      orderBy,
      order,
    };

    let categories;
    let total;
    
    if (search && search.trim()) {
      // Use search functionality
      categories = await NewsCategoriesRepository.search(
        search.trim(),
        filterOptions.published
      );
      total = categories.length;
      
      // Apply pagination to search results
      categories = categories.slice(offset, offset + limit);
    } else {
      // Use regular findMany
      categories = await NewsCategoriesRepository.findMany(filterOptions);
      
      // Get total count for pagination
      total = await NewsCategoriesRepository.getTotalCount({
        published: filterOptions.published,
      });
    }

    return NextResponse.json({
      success: true,
      items: categories,
      total,
      pagination: {
        limit,
        offset,
        hasMore: categories.length === limit && (offset + limit) < total
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news categories",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
