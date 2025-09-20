import { eq, desc, asc, like, and, or, ilike } from "drizzle-orm";
import { database } from "@/lib/db";
import { newsCategories, type NewsCategory, type NewNewsCategory } from "@/lib/db/schema/newsCategories";

export class NewsCategoriesRepository {
  // Create a new news category
  static async create(data: NewNewsCategory): Promise<NewsCategory> {
    const [category] = await database()
      .insert(newsCategories)
      .values(data)
      .returning();
    return category;
  }

  // Get all categories with optional filters
  static async findMany({
    published,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    limit?: number;
    offset?: number;
    orderBy?: keyof NewsCategory;
    order?: "asc" | "desc";
  } = {}): Promise<NewsCategory[]> {
    let query = database().select().from(newsCategories);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(newsCategories.isPublished, published));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = newsCategories[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get category by ID
  static async findById(id: number): Promise<NewsCategory | null> {
    const [category] = await database()
      .select()
      .from(newsCategories)
      .where(eq(newsCategories.id, id))
      .limit(1);
    return category || null;
  }

  // Get category by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<NewsCategory | null> {
    // Try English slug first
    const [categoryEn] = await database()
      .select()
      .from(newsCategories)
      .where(
        and(
          eq(newsCategories.isPublished, true),
          eq(newsCategories.slugEn, slug)
        )
      )
      .limit(1);

    if (categoryEn) return categoryEn;

    // Try Arabic slug
    const [categoryAr] = await database()
      .select()
      .from(newsCategories)
      .where(
        and(
          eq(newsCategories.isPublished, true),
          eq(newsCategories.slugAr, slug)
        )
      )
      .limit(1);

    return categoryAr || null;
  }

  // Search categories by name or description
  static async search(query: string, published = true): Promise<NewsCategory[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(newsCategories)
      .where(
        and(
          published ? eq(newsCategories.isPublished, true) : undefined,
          or(
            ilike(newsCategories.nameEn, searchPattern),
            ilike(newsCategories.nameAr, searchPattern),
            ilike(newsCategories.descriptionEn, searchPattern),
            ilike(newsCategories.descriptionAr, searchPattern)
          )
        )
      )
      .orderBy(desc(newsCategories.createdAt));
  }

  // Update category
  static async update(id: number, data: Partial<NewNewsCategory>): Promise<NewsCategory | null> {
    const [updated] = await database()
      .update(newsCategories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(newsCategories.id, id))
      .returning();
    return updated || null;
  }

  // Delete category
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(newsCategories)
      .where(eq(newsCategories.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish category
  static async publish(id: number, published: boolean): Promise<NewsCategory | null> {
    const [updated] = await database()
      .update(newsCategories)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(newsCategories.id, id))
      .returning();
    return updated || null;
  }

  // Increment category page views
  static async incrementViews(id: number): Promise<number> {
    // First get the current views count
    const [currentCategory] = await database()
      .select({ views: newsCategories.pageViews })
      .from(newsCategories)
      .where(eq(newsCategories.id, id))
      .limit(1);
    
    if (!currentCategory) return 0;
    
    const newViews = (currentCategory.views || 0) + 1;
    
    // Update with the new views count
    const [updated] = await database()
      .update(newsCategories)
      .set({
        pageViews: newViews,
        updatedAt: new Date(),
      })
      .where(eq(newsCategories.id, id))
      .returning({ views: newsCategories.pageViews });
    
    return updated?.views || newViews;
  }

  // Get published categories count
  static async getPublishedCount(): Promise<number> {
    const result = await database()
      .select()
      .from(newsCategories)
      .where(eq(newsCategories.isPublished, true));
    
    return result.length;
  }

  // Get most viewed categories
  static async getMostViewed(limit = 10, published = true): Promise<NewsCategory[]> {
    return await database()
      .select()
      .from(newsCategories)
      .where(
        published ? eq(newsCategories.isPublished, true) : undefined
      )
      .orderBy(desc(newsCategories.pageViews))
      .limit(limit);
  }

  // Get all published categories (useful for dropdown/select lists)
  static async getAllPublished(): Promise<NewsCategory[]> {
    return await database()
      .select()
      .from(newsCategories)
      .where(eq(newsCategories.isPublished, true))
      .orderBy(asc(newsCategories.nameEn));
  }

  // Get total count for pagination
  static async getTotalCount(filters: {
    published?: boolean;
    search?: string;
  } = {}): Promise<number> {
    let query = database().select().from(newsCategories);

    const conditions = [];
    if (filters.published !== undefined) {
      conditions.push(eq(newsCategories.isPublished, filters.published));
    }
    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(newsCategories.nameEn, searchPattern),
          ilike(newsCategories.nameAr, searchPattern),
          ilike(newsCategories.descriptionEn, searchPattern),
          ilike(newsCategories.descriptionAr, searchPattern)
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
