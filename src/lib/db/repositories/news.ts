import { eq, desc, asc, like, and, or, ilike } from "drizzle-orm";
import { database } from "@/lib/db";
import { news, type News, type NewNews } from "@/lib/db/schema/news";
import { newsCategories } from "@/lib/db/schema/newsCategories";

export class NewsRepository {
  // Create a new news article
  static async create(data: NewNews): Promise<News> {
    const [newsItem] = await database()
      .insert(news)
      .values(data)
      .returning();
    return newsItem;
  }

  // Get all news with optional filters
  static async findMany({
    published,
    categoryId,
    programId,
    projectId,
    activityId,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    categoryId?: number;
    programId?: number;
    projectId?: number;
    activityId?: number;
    limit?: number;
    offset?: number;
    orderBy?: keyof News;
    order?: "asc" | "desc";
  } = {}): Promise<News[]> {
    let query = database().select().from(news);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(news.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(news.categoryId, categoryId));
    }
    if (programId !== undefined) {
      conditions.push(eq(news.programId, programId));
    }
    if (projectId !== undefined) {
      conditions.push(eq(news.projectId, projectId));
    }
    if (activityId !== undefined) {
      conditions.push(eq(news.activityId, activityId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = news[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get news by ID
  static async findById(id: number): Promise<News | null> {
    const [newsItem] = await database()
      .select()
      .from(news)
      .where(eq(news.id, id))
      .limit(1);
    return newsItem || null;
  }

  // Get news by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<News | null> {
    // Try English slug first
    const [newsItemEn] = await database()
      .select()
      .from(news)
      .where(
        and(
          eq(news.isPublished, true),
          eq(news.slugEn, slug)
        )
      )
      .limit(1);

    if (newsItemEn) return newsItemEn;

    // Try Arabic slug
    const [newsItemAr] = await database()
      .select()
      .from(news)
      .where(
        and(
          eq(news.isPublished, true),
          eq(news.slugAr, slug)
        )
      )
      .limit(1);

    return newsItemAr || null;
  }

  // Get news with their associated category
  static async findWithCategory({
    published,
    categoryId,
    limit = 50,
    offset = 0,
  }: {
    published?: boolean;
    categoryId?: number;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = database()
      .select({
        news: news,
        category: newsCategories,
      })
      .from(news)
      .leftJoin(newsCategories, eq(news.categoryId, newsCategories.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(news.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(news.categoryId, categoryId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(news.publishedAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search news by title, content, keywords, or tags
  static async search(query: string, published = true): Promise<News[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(news)
      .where(
        and(
          published ? eq(news.isPublished, true) : undefined,
          or(
            ilike(news.titleEn, searchPattern),
            ilike(news.titleAr, searchPattern),
            ilike(news.contentEn, searchPattern),
            ilike(news.contentAr, searchPattern)
          )
        )
      )
      .orderBy(desc(news.publishedAt));
  }

  // Update news
  static async update(id: number, data: Partial<NewNews>): Promise<News | null> {
    const [updated] = await database()
      .update(news)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();
    return updated || null;
  }

  // Delete news
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(news)
      .where(eq(news.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish news
  static async publish(id: number, published: boolean): Promise<News | null> {
    const [updated] = await database()
      .update(news)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(news.id, id))
      .returning();
    return updated || null;
  }

  // Increment news page views
  static async incrementViews(id: number): Promise<number> {
    // First get the current views count
    const [currentNews] = await database()
      .select({ views: news.pageViews })
      .from(news)
      .where(eq(news.id, id))
      .limit(1);
    
    if (!currentNews) return 0;
    
    const newViews = (currentNews.views || 0) + 1;
    
    // Update with the new views count
    const [updated] = await database()
      .update(news)
      .set({
        pageViews: newViews,
        updatedAt: new Date(),
      })
      .where(eq(news.id, id))
      .returning({ views: news.pageViews });
    
    return updated?.views || newViews;
  }

  // Get published news count
  static async getPublishedCount(): Promise<number> {
    const result = await database()
      .select()
      .from(news)
      .where(eq(news.isPublished, true));
    
    return result.length;
  }

  // Get news by category ID
  static async findByCategoryId(categoryId: number, published = true): Promise<News[]> {
    return await database()
      .select()
      .from(news)
      .where(
        and(
          eq(news.categoryId, categoryId),
          published ? eq(news.isPublished, true) : undefined
        )
      )
      .orderBy(desc(news.publishedAt));
  }

  // Get most viewed news
  static async getMostViewed(limit = 10, published = true): Promise<News[]> {
    return await database()
      .select()
      .from(news)
      .where(
        published ? eq(news.isPublished, true) : undefined
      )
      .orderBy(desc(news.pageViews))
      .limit(limit);
  }

  // Get recent news
  static async getRecent(limit = 10, published = true): Promise<News[]> {
    return await database()
      .select()
      .from(news)
      .where(
        published ? eq(news.isPublished, true) : undefined
      )
      .orderBy(desc(news.publishedAt))
      .limit(limit);
  }

  // Search by tags
  static async findByTags(tags: string[], published = true): Promise<News[]> {
    // This is a simplified version - you might want to implement proper array overlap queries
    return await database()
      .select()
      .from(news)
      .where(
        published ? eq(news.isPublished, true) : undefined
      )
      .orderBy(desc(news.publishedAt));
  }

  // Get featured news (could be based on views, recency, or a specific flag)
  static async getFeatured(limit = 3, published = true): Promise<News[]> {
    return await database()
      .select()
      .from(news)
      .where(
        published ? eq(news.isPublished, true) : undefined
      )
      .orderBy(desc(news.pageViews), desc(news.publishedAt))
      .limit(limit);
  }

  // Get total count for pagination
  static async getTotalCount(filters: {
    published?: boolean;
    categoryId?: number;
    programId?: number;
    projectId?: number;
    activityId?: number;
    search?: string;
  } = {}): Promise<number> {
    let query = database().select().from(news);

    const conditions = [];
    if (filters.published !== undefined) {
      conditions.push(eq(news.isPublished, filters.published));
    }
    if (filters.categoryId !== undefined) {
      conditions.push(eq(news.categoryId, filters.categoryId));
    }
    if (filters.programId !== undefined) {
      conditions.push(eq(news.programId, filters.programId));
    }
    if (filters.projectId !== undefined) {
      conditions.push(eq(news.projectId, filters.projectId));
    }
    if (filters.activityId !== undefined) {
      conditions.push(eq(news.activityId, filters.activityId));
    }
    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(news.titleEn, searchPattern),
          ilike(news.titleAr, searchPattern),
          ilike(news.contentEn, searchPattern),
          ilike(news.contentAr, searchPattern)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query.execute();
    return result.length;
  }
}
