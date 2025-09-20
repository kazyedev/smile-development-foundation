import { eq, desc, asc, like, and, or, ilike } from "drizzle-orm";
import { database } from "@/lib/db";
import { reports, type Report, type NewReport } from "@/lib/db/schema/reports";

export class ReportsRepository {
  // Create a new report
  static async create(data: NewReport): Promise<Report> {
    const [report] = await database()
      .insert(reports)
      .values(data)
      .returning();
    return report;
  }

  // Get all reports with optional filters
  static async findMany({
    published,
    categoryId,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    categoryId?: number;
    limit?: number;
    offset?: number;
    orderBy?: keyof Report;
    order?: "asc" | "desc";
  } = {}): Promise<Report[]> {
    let query = database().select().from(reports);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(reports.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(reports.categoryId, categoryId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = reports[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get report by ID
  static async findById(id: number): Promise<Report | null> {
    const [report] = await database()
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);
    return report || null;
  }

  // Get report by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Report | null> {
    // Try English slug first
    const [reportEn] = await database()
      .select()
      .from(reports)
      .where(
        and(
          eq(reports.isPublished, true),
          eq(reports.slugEn, slug)
        )
      )
      .limit(1);

    if (reportEn) return reportEn;

    // Try Arabic slug
    const [reportAr] = await database()
      .select()
      .from(reports)
      .where(
        and(
          eq(reports.isPublished, true),
          eq(reports.slugAr, slug)
        )
      )
      .limit(1);

    return reportAr || null;
  }

  // Search reports by title, description, or keywords
  static async search(query: string, published = true): Promise<Report[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(reports)
      .where(
        and(
          published ? eq(reports.isPublished, true) : undefined,
          or(
            ilike(reports.titleEn, searchPattern),
            ilike(reports.titleAr, searchPattern),
            ilike(reports.descriptionEn, searchPattern),
            ilike(reports.descriptionAr, searchPattern)
          )
        )
      )
      .orderBy(desc(reports.publishedAt));
  }

  // Update report
  static async update(id: number, data: Partial<NewReport>): Promise<Report | null> {
    const [updated] = await database()
      .update(reports)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reports.id, id))
      .returning();
    return updated || null;
  }

  // Delete report
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(reports)
      .where(eq(reports.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish report
  static async publish(id: number, published: boolean): Promise<Report | null> {
    const [updated] = await database()
      .update(reports)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(reports.id, id))
      .returning();
    return updated || null;
  }

  // Increment report downloads
  static async incrementDownloads(id: number): Promise<number> {
    // First get the current downloads count
    const [currentReport] = await database()
      .select({ downloads: reports.downloads })
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);
    
    if (!currentReport) return 0;
    
    const newDownloads = (currentReport.downloads || 0) + 1;
    
    // Update with the new downloads count
    const [updated] = await database()
      .update(reports)
      .set({
        downloads: newDownloads,
        updatedAt: new Date(),
      })
      .where(eq(reports.id, id))
      .returning({ downloads: reports.downloads });
    
    return updated?.downloads || newDownloads;
  }

  // Get published reports count
  static async getPublishedCount(): Promise<number> {
    const result = await database()
      .select()
      .from(reports)
      .where(eq(reports.isPublished, true));
    
    return result.length;
  }

  // Get reports by category ID
  static async findByCategoryId(categoryId: number, published = true): Promise<Report[]> {
    return await database()
      .select()
      .from(reports)
      .where(
        and(
          eq(reports.categoryId, categoryId),
          published ? eq(reports.isPublished, true) : undefined
        )
      )
      .orderBy(desc(reports.publishedAt));
  }

  // Get most downloaded reports
  static async getMostDownloaded(limit = 10, published = true): Promise<Report[]> {
    return await database()
      .select()
      .from(reports)
      .where(
        published ? eq(reports.isPublished, true) : undefined
      )
      .orderBy(desc(reports.downloads))
      .limit(limit);
  }

  // Get recent reports
  static async getRecent(limit = 10, published = true): Promise<Report[]> {
    return await database()
      .select()
      .from(reports)
      .where(
        published ? eq(reports.isPublished, true) : undefined
      )
      .orderBy(desc(reports.publishedAt))
      .limit(limit);
  }

  // Get total count for pagination
  static async getTotalCount(filters: {
    published?: boolean;
    categoryId?: number;
    search?: string;
  } = {}): Promise<number> {
    let query = database().select().from(reports);

    const conditions = [];
    if (filters.published !== undefined) {
      conditions.push(eq(reports.isPublished, filters.published));
    }
    if (filters.categoryId !== undefined) {
      conditions.push(eq(reports.categoryId, filters.categoryId));
    }
    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(reports.titleEn, searchPattern),
          ilike(reports.titleAr, searchPattern),
          ilike(reports.descriptionEn, searchPattern),
          ilike(reports.descriptionAr, searchPattern)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query.execute();
    return result.length;
  }

  // Get reports by tags
  static async findByTags(tags: string[], published = true): Promise<Report[]> {
    // This is a simplified version - you might want to implement proper array overlap queries
    return await database()
      .select()
      .from(reports)
      .where(
        published ? eq(reports.isPublished, true) : undefined
      )
      .orderBy(desc(reports.publishedAt));
  }

  // Get reports by keywords
  static async findByKeywords(keywords: string[], published = true): Promise<Report[]> {
    // This is a simplified version - you might want to implement proper array overlap queries
    return await database()
      .select()
      .from(reports)
      .where(
        published ? eq(reports.isPublished, true) : undefined
      )
      .orderBy(desc(reports.publishedAt));
  }

  // Get unique tags for filter dropdown
  static async getUniqueTags(published = true): Promise<{ tagsEn: string[]; tagsAr: string[] }> {
    const reportsData = await database()
      .select({
        tagsEn: reports.tagsEn,
        tagsAr: reports.tagsAr,
      })
      .from(reports)
      .where(
        published ? eq(reports.isPublished, true) : undefined
      );

    // Flatten and deduplicate tags
    const allTagsEn = reportsData.flatMap(r => r.tagsEn || []);
    const allTagsAr = reportsData.flatMap(r => r.tagsAr || []);
    
    const uniqueTagsEn = Array.from(new Set(allTagsEn));
    const uniqueTagsAr = Array.from(new Set(allTagsAr));

    return {
      tagsEn: uniqueTagsEn,
      tagsAr: uniqueTagsAr,
    };
  }

  // Get reports published in date range
  static async findByDateRange(
    startDate: Date, 
    endDate: Date, 
    published = true
  ): Promise<Report[]> {
    return await database()
      .select()
      .from(reports)
      .where(
        and(
          published ? eq(reports.isPublished, true) : undefined,
          // Add date range filter when needed
        )
      )
      .orderBy(desc(reports.publishedAt));
  }
}
