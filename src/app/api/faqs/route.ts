import { NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { desc, asc, ilike, or, and, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const orderBy = (searchParams.get("orderBy") as keyof typeof faqs.$inferSelect) || "createdAt";
    const order = (searchParams.get("order") as "asc" | "desc") || "desc";
    const search = searchParams.get("search");

    // Get database instance
    const db = database();
    
    // Build the base query
    let query = db.select().from(faqs);

    // Apply filters
    const whereConditions = [];

    // Published filter
    if (published === "true") {
      whereConditions.push(eq(faqs.isPublished, true));
    } else if (published === "false") {
      whereConditions.push(eq(faqs.isPublished, false));
    }

    // Search filter (search in both English and Arabic questions and answers)
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      whereConditions.push(
        or(
          ilike(faqs.questionEn, searchTerm),
          ilike(faqs.questionAr, searchTerm),
          ilike(faqs.answerEn, searchTerm),
          ilike(faqs.answerAr, searchTerm)
        )
      );
    }

    // Apply where conditions
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // Apply ordering
    if (orderBy === "views") {
      query = query.orderBy(order === "asc" ? asc(faqs.views) : desc(faqs.views));
    } else if (orderBy === "createdAt") {
      query = query.orderBy(order === "asc" ? asc(faqs.createdAt) : desc(faqs.createdAt));
    } else if (orderBy === "updatedAt") {
      query = query.orderBy(order === "asc" ? asc(faqs.updatedAt) : desc(faqs.updatedAt));
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);

    // Execute query
    const result = await query;

    // Get total count for pagination (without limit/offset)
    let countQuery = db.select({ count: faqs.id }).from(faqs);
    
    if (whereConditions.length > 0) {
      countQuery = countQuery.where(and(...whereConditions));
    }

    const totalResult = await countQuery;
    const total = totalResult.length;

    return NextResponse.json({
      success: true,
      items: result,
      total,
      pagination: {
        limit,
        offset,
        hasMore: result.length === limit && (offset + limit) < total
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch FAQs",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
