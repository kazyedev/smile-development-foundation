import { eq, desc, asc, like, and } from "drizzle-orm";
import { database } from "@/lib/db";
import { videos, type Video, type NewVideo } from "@/lib/db/schema/videos";
import { mediaCategories } from "@/lib/db/schema/mediaCategories";

export class VideosRepository {
  // Create a new video
  static async create(data: NewVideo): Promise<Video> {
    const [video] = await database()
      .insert(videos)
      .values(data)
      .returning();
    return video;
  }

  // Get all videos with optional filters
  static async findMany({
    published,
    categoryId,
    isPublic,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    categoryId?: number;
    isPublic?: boolean;
    limit?: number;
    offset?: number;
    orderBy?: keyof Video;
    order?: "asc" | "desc";
  } = {}): Promise<Video[]> {
    let query = database().select().from(videos);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(videos.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(videos.categoryId, categoryId));
    }
    if (isPublic !== undefined) {
      conditions.push(eq(videos.isPublic, isPublic));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = videos[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get video by ID
  static async findById(id: number): Promise<Video | null> {
    const [video] = await database()
      .select()
      .from(videos)
      .where(eq(videos.id, id))
      .limit(1);
    return video || null;
  }

  // Get video by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Video | null> {
    const [video] = await database()
      .select()
      .from(videos)
      .where(
        and(
          eq(videos.isPublished, true),
          eq(videos.slugEn, slug)
        )
      )
      .limit(1);

    if (video) return video;

    // Try Arabic slug
    const [videoAr] = await database()
      .select()
      .from(videos)
      .where(
        and(
          eq(videos.isPublished, true),
          eq(videos.slugAr, slug)
        )
      )
      .limit(1);

    return videoAr || null;
  }

  // Get videos with their associated category
  static async findWithCategory({
    published,
    categoryId,
    isPublic,
    limit = 50,
    offset = 0,
  }: {
    published?: boolean;
    categoryId?: number;
    isPublic?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = database()
      .select({
        video: videos,
        category: mediaCategories,
      })
      .from(videos)
      .leftJoin(mediaCategories, eq(videos.categoryId, mediaCategories.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(videos.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(videos.categoryId, categoryId));
    }
    if (isPublic !== undefined) {
      conditions.push(eq(videos.isPublic, isPublic));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(videos.createdAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search videos by title or description
  static async search(query: string, published = true, isPublic = true): Promise<Video[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(videos)
      .where(
        and(
          published ? eq(videos.isPublished, true) : undefined,
          isPublic ? eq(videos.isPublic, true) : undefined,
          // Search in English and Arabic titles and descriptions
          like(videos.titleEn, searchPattern)
          // Note: Add OR conditions for other fields as needed
        )
      )
      .orderBy(desc(videos.createdAt));
  }

  // Update video
  static async update(id: number, data: Partial<NewVideo>): Promise<Video | null> {
    const [updated] = await database()
      .update(videos)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(videos.id, id))
      .returning();
    return updated || null;
  }

  // Delete video
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(videos)
      .where(eq(videos.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish video
  static async publish(id: number, published: boolean): Promise<Video | null> {
    const [updated] = await database()
      .update(videos)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(videos.id, id))
      .returning();
    return updated || null;
  }

  // Increment video views
  static async incrementViews(id: number): Promise<number> {
    const [updated] = await database()
      .update(videos)
      .set({
        views: videos.views + 1,
        updatedAt: new Date(),
      })
      .where(eq(videos.id, id))
      .returning({ views: videos.views });
    
    return updated?.views || 0;
  }

  // Get published videos count
  static async getPublishedCount(): Promise<number> {
    const [result] = await database()
      .select({ count: videos.id })
      .from(videos)
      .where(eq(videos.isPublished, true));
    
    return result?.count || 0;
  }

  // Get videos by category ID
  static async findByCategoryId(categoryId: number, published = true, isPublic = true): Promise<Video[]> {
    return await database()
      .select()
      .from(videos)
      .where(
        and(
          eq(videos.categoryId, categoryId),
          published ? eq(videos.isPublished, true) : undefined,
          isPublic ? eq(videos.isPublic, true) : undefined
        )
      )
      .orderBy(desc(videos.createdAt));
  }

  // Get most viewed videos
  static async getMostViewed(limit = 10, published = true, isPublic = true): Promise<Video[]> {
    return await database()
      .select()
      .from(videos)
      .where(
        and(
          published ? eq(videos.isPublished, true) : undefined,
          isPublic ? eq(videos.isPublic, true) : undefined
        )
      )
      .orderBy(desc(videos.views))
      .limit(limit);
  }

  // Get recent videos
  static async getRecent(limit = 10, published = true, isPublic = true): Promise<Video[]> {
    return await database()
      .select()
      .from(videos)
      .where(
        and(
          published ? eq(videos.isPublished, true) : undefined,
          isPublic ? eq(videos.isPublic, true) : undefined
        )
      )
      .orderBy(desc(videos.publishedAt))
      .limit(limit);
  }

  // Search by tags
  static async findByTags(tags: string[], published = true, isPublic = true): Promise<Video[]> {
    // Note: This is a simplified version. You might want to implement proper array overlap queries
    return await database()
      .select()
      .from(videos)
      .where(
        and(
          published ? eq(videos.isPublished, true) : undefined,
          isPublic ? eq(videos.isPublic, true) : undefined
          // Add array overlap condition for tags
        )
      )
      .orderBy(desc(videos.createdAt));
  }

  // Get videos by location
  static async findByLocation(location: string, published = true, isPublic = true): Promise<Video[]> {
    const searchPattern = `%${location}%`;
    
    return await database()
      .select()
      .from(videos)
      .where(
        and(
          published ? eq(videos.isPublished, true) : undefined,
          isPublic ? eq(videos.isPublic, true) : undefined,
          like(videos.locationEn, searchPattern)
          // Note: Add OR condition for Arabic location
        )
      )
      .orderBy(desc(videos.createdAt));
  }
}
