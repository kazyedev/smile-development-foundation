import { eq, desc, asc, like, and } from "drizzle-orm";
import { database } from "@/lib/db";
import { mediaCategories, type MediaCategory, type NewMediaCategory } from "@/lib/db/schema/mediaCategories";

export class MediaCategoriesRepository {
  // Create a new media category
  static async create(data: NewMediaCategory): Promise<MediaCategory> {
    const [category] = await database()
      .insert(mediaCategories)
      .values(data)
      .returning();
    return category;
  }

  // Get all media categories with optional filters
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
    orderBy?: keyof MediaCategory;
    order?: "asc" | "desc";
  } = {}): Promise<MediaCategory[]> {
    let query = database().select().from(mediaCategories);

    // Add published filter
    if (published !== undefined) {
      query = query.where(eq(mediaCategories.isPublished, published));
    }

    // Add ordering
    const orderColumn = mediaCategories[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get media category by ID
  static async findById(id: number): Promise<MediaCategory | null> {
    const [category] = await database()
      .select()
      .from(mediaCategories)
      .where(eq(mediaCategories.id, id))
      .limit(1);
    return category || null;
  }

  // Get media category by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<MediaCategory | null> {
    const [category] = await database()
      .select()
      .from(mediaCategories)
      .where(
        and(
          eq(mediaCategories.isPublished, true),
          eq(mediaCategories.slugEn, slug)
        )
      )
      .limit(1);

    if (category) return category;

    // Try Arabic slug
    const [categoryAr] = await database()
      .select()
      .from(mediaCategories)
      .where(
        and(
          eq(mediaCategories.isPublished, true),
          eq(mediaCategories.slugAr, slug)
        )
      )
      .limit(1);

    return categoryAr || null;
  }

  // Search media categories by name
  static async search(query: string, published = true): Promise<MediaCategory[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(mediaCategories)
      .where(
        and(
          published ? eq(mediaCategories.isPublished, true) : undefined,
          // Search in English and Arabic names
          like(mediaCategories.nameEn, searchPattern)
          // Note: Add OR conditions for other fields as needed
        )
      )
      .orderBy(desc(mediaCategories.createdAt));
  }

  // Update media category
  static async update(id: number, data: Partial<NewMediaCategory>): Promise<MediaCategory | null> {
    const [updated] = await database()
      .update(mediaCategories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(mediaCategories.id, id))
      .returning();
    return updated || null;
  }

  // Delete media category
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(mediaCategories)
      .where(eq(mediaCategories.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish media category
  static async publish(id: number, published: boolean): Promise<MediaCategory | null> {
    const [updated] = await database()
      .update(mediaCategories)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(mediaCategories.id, id))
      .returning();
    return updated || null;
  }

  // Increment page views
  static async incrementPageViews(id: number): Promise<number> {
    const [updated] = await database()
      .update(mediaCategories)
      .set({
        pageViews: mediaCategories.pageViews + 1,
        updatedAt: new Date(),
      })
      .where(eq(mediaCategories.id, id))
      .returning({ pageViews: mediaCategories.pageViews });
    
    return updated?.pageViews || 0;
  }

  // Get published media categories count
  static async getPublishedCount(): Promise<number> {
    const [result] = await database()
      .select({ count: mediaCategories.id })
      .from(mediaCategories)
      .where(eq(mediaCategories.isPublished, true));
    
    return result?.count || 0;
  }

  // Get all published categories (for dropdowns, etc.)
  static async getAllPublished(): Promise<MediaCategory[]> {
    return await database()
      .select()
      .from(mediaCategories)
      .where(eq(mediaCategories.isPublished, true))
      .orderBy(asc(mediaCategories.nameEn));
  }
}
