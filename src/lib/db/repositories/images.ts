import { eq, desc, asc, like, and } from "drizzle-orm";
import { database } from "@/lib/db";
import { images, type Image, type NewImage } from "@/lib/db/schema/images";
import { mediaCategories } from "@/lib/db/schema/mediaCategories";

export class ImagesRepository {
  // Create a new image
  static async create(data: NewImage): Promise<Image> {
    const [image] = await database()
      .insert(images)
      .values(data)
      .returning();
    return image;
  }

  // Get all images with optional filters
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
    orderBy?: keyof Image;
    order?: "asc" | "desc";
  } = {}): Promise<Image[]> {
    let query = database().select().from(images);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(images.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(images.categoryId, categoryId));
    }
    if (isPublic !== undefined) {
      conditions.push(eq(images.isPublic, isPublic));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = images[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get image by ID
  static async findById(id: number): Promise<Image | null> {
    const [image] = await database()
      .select()
      .from(images)
      .where(eq(images.id, id))
      .limit(1);
    return image || null;
  }

  // Get image by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Image | null> {
    const [image] = await database()
      .select()
      .from(images)
      .where(
        and(
          eq(images.isPublished, true),
          eq(images.isPublic, true),
          eq(images.slugEn, slug)
        )
      )
      .limit(1);

    if (image) return image;

    // Try Arabic slug
    const [imageAr] = await database()
      .select()
      .from(images)
      .where(
        and(
          eq(images.isPublished, true),
          eq(images.isPublic, true),
          eq(images.slugAr, slug)
        )
      )
      .limit(1);

    return imageAr || null;
  }

  // Get images with their associated category
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
        image: images,
        category: mediaCategories,
      })
      .from(images)
      .leftJoin(mediaCategories, eq(images.categoryId, mediaCategories.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(images.isPublished, published));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(images.categoryId, categoryId));
    }
    if (isPublic !== undefined) {
      conditions.push(eq(images.isPublic, isPublic));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(images.createdAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search images by title or description
  static async search(query: string, published = true, isPublic = true): Promise<Image[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(images)
      .where(
        and(
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined,
          // Search in English and Arabic titles and descriptions
          like(images.titleEn, searchPattern)
          // Note: Add OR conditions for other fields as needed
        )
      )
      .orderBy(desc(images.createdAt));
  }

  // Update image
  static async update(id: number, data: Partial<NewImage>): Promise<Image | null> {
    const [updated] = await database()
      .update(images)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(images.id, id))
      .returning();
    return updated || null;
  }

  // Delete image
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(images)
      .where(eq(images.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish image
  static async publish(id: number, published: boolean): Promise<Image | null> {
    const [updated] = await database()
      .update(images)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(images.id, id))
      .returning();
    return updated || null;
  }

  // Increment image views
  static async incrementViews(id: number): Promise<number> {
    // First get the current views count
    const [currentImage] = await database()
      .select({ views: images.views })
      .from(images)
      .where(eq(images.id, id))
      .limit(1);
    
    if (!currentImage) return 0;
    
    const newViews = (currentImage.views || 0) + 1;
    
    // Update with the new views count
    const [updated] = await database()
      .update(images)
      .set({
        views: newViews,
        updatedAt: new Date(),
      })
      .where(eq(images.id, id))
      .returning({ views: images.views });
    
    return updated?.views || newViews;
  }

  // Get published images count
  static async getPublishedCount(): Promise<number> {
    const [result] = await database()
      .select({ count: images.id })
      .from(images)
      .where(eq(images.isPublished, true));
    
    return result?.count || 0;
  }

  // Get images by category ID
  static async findByCategoryId(categoryId: number, published = true, isPublic = true): Promise<Image[]> {
    return await database()
      .select()
      .from(images)
      .where(
        and(
          eq(images.categoryId, categoryId),
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined
        )
      )
      .orderBy(desc(images.createdAt));
  }

  // Get most viewed images
  static async getMostViewed(limit = 10, published = true, isPublic = true): Promise<Image[]> {
    return await database()
      .select()
      .from(images)
      .where(
        and(
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined
        )
      )
      .orderBy(desc(images.views))
      .limit(limit);
  }

  // Get recent images
  static async getRecent(limit = 10, published = true, isPublic = true): Promise<Image[]> {
    return await database()
      .select()
      .from(images)
      .where(
        and(
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined
        )
      )
      .orderBy(desc(images.publishedAt))
      .limit(limit);
  }

  // Search by tags
  static async findByTags(tags: string[], published = true, isPublic = true): Promise<Image[]> {
    // Note: This is a simplified version. You might want to implement proper array overlap queries
    return await database()
      .select()
      .from(images)
      .where(
        and(
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined
          // Add array overlap condition for tags
        )
      )
      .orderBy(desc(images.createdAt));
  }

  // Get images by location
  static async findByLocation(location: string, published = true, isPublic = true): Promise<Image[]> {
    const searchPattern = `%${location}%`;
    
    return await database()
      .select()
      .from(images)
      .where(
        and(
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined,
          like(images.locationEn, searchPattern)
          // Note: Add OR condition for Arabic location
        )
      )
      .orderBy(desc(images.createdAt));
  }

  // Get images by program ID
  static async findByProgramId(programId: number, published = true, isPublic = true): Promise<Image[]> {
    return await database()
      .select()
      .from(images)
      .where(
        and(
          eq(images.programId, programId),
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined
        )
      )
      .orderBy(desc(images.createdAt));
  }

  // Get images by project ID
  static async findByProjectId(projectId: number, published = true, isPublic = true): Promise<Image[]> {
    return await database()
      .select()
      .from(images)
      .where(
        and(
          eq(images.projectId, projectId),
          published ? eq(images.isPublished, true) : undefined,
          isPublic ? eq(images.isPublic, true) : undefined
        )
      )
      .orderBy(desc(images.createdAt));
  }
}
