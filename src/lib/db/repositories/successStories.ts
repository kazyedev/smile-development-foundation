import { eq, desc, asc, like, and, or, ilike } from "drizzle-orm";
import { database } from "@/lib/db";
import { successStories, type SuccessStory, type NewSuccessStory } from "@/lib/db/schema/successStories";
import { programs } from "@/lib/db/schema/programs";

export class SuccessStoriesRepository {
  // Create a new success story
  static async create(data: NewSuccessStory): Promise<SuccessStory> {
    const [story] = await database()
      .insert(successStories)
      .values(data)
      .returning();
    return story;
  }

  // Get all success stories with optional filters
  static async findMany({
    published,
    programId,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    programId?: number;
    limit?: number;
    offset?: number;
    orderBy?: keyof SuccessStory;
    order?: "asc" | "desc";
  } = {}): Promise<SuccessStory[]> {
    let query = database().select().from(successStories);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(successStories.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(successStories.programId, programId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = successStories[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get success story by ID
  static async findById(id: number): Promise<SuccessStory | null> {
    const [story] = await database()
      .select()
      .from(successStories)
      .where(eq(successStories.id, id))
      .limit(1);
    return story || null;
  }

  // Get success story by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<SuccessStory | null> {
    // Try English slug first
    const [storyEn] = await database()
      .select()
      .from(successStories)
      .where(
        and(
          eq(successStories.isPublished, true),
          eq(successStories.slugEn, slug)
        )
      )
      .limit(1);

    if (storyEn) return storyEn;

    // Try Arabic slug
    const [storyAr] = await database()
      .select()
      .from(successStories)
      .where(
        and(
          eq(successStories.isPublished, true),
          eq(successStories.slugAr, slug)
        )
      )
      .limit(1);

    return storyAr || null;
  }

  // Get success stories with their associated program
  static async findWithPrograms({
    published,
    programId,
    limit = 50,
    offset = 0,
  }: {
    published?: boolean;
    programId?: number;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = database()
      .select({
        story: successStories,
        program: programs,
      })
      .from(successStories)
      .leftJoin(programs, eq(successStories.programId, programs.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(successStories.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(successStories.programId, programId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(successStories.publishedAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search success stories by title, content, person name, or location
  static async search(query: string, published = true): Promise<SuccessStory[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(successStories)
      .where(
        and(
          published ? eq(successStories.isPublished, true) : undefined,
          or(
            ilike(successStories.titleEn, searchPattern),
            ilike(successStories.titleAr, searchPattern),
            ilike(successStories.contentEn, searchPattern),
            ilike(successStories.contentAr, searchPattern),
            ilike(successStories.personNameEn, searchPattern),
            ilike(successStories.personNameAr, searchPattern),
            ilike(successStories.cityEn, searchPattern),
            ilike(successStories.cityAr, searchPattern),
            ilike(successStories.personLocationEn, searchPattern),
            ilike(successStories.personLocationAr, searchPattern)
          )
        )
      )
      .orderBy(desc(successStories.publishedAt));
  }

  // Update success story
  static async update(id: number, data: Partial<NewSuccessStory>): Promise<SuccessStory | null> {
    const [updated] = await database()
      .update(successStories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(successStories.id, id))
      .returning();
    return updated || null;
  }

  // Delete success story
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(successStories)
      .where(eq(successStories.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish success story
  static async publish(id: number, published: boolean): Promise<SuccessStory | null> {
    const [updated] = await database()
      .update(successStories)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(successStories.id, id))
      .returning();
    return updated || null;
  }

  // Increment success story page views
  static async incrementViews(id: number): Promise<number> {
    // First get the current views count
    const [currentStory] = await database()
      .select({ views: successStories.pageViews })
      .from(successStories)
      .where(eq(successStories.id, id))
      .limit(1);
    
    if (!currentStory) return 0;
    
    const newViews = (currentStory.views || 0) + 1;
    
    // Update with the new views count
    const [updated] = await database()
      .update(successStories)
      .set({
        pageViews: newViews,
        updatedAt: new Date(),
      })
      .where(eq(successStories.id, id))
      .returning({ views: successStories.pageViews });
    
    return updated?.views || newViews;
  }

  // Get published success stories count
  static async getPublishedCount(): Promise<number> {
    const result = await database()
      .select()
      .from(successStories)
      .where(eq(successStories.isPublished, true));
    
    return result.length;
  }

  // Get success stories by program ID
  static async findByProgramId(programId: number, published = true): Promise<SuccessStory[]> {
    return await database()
      .select()
      .from(successStories)
      .where(
        and(
          eq(successStories.programId, programId),
          published ? eq(successStories.isPublished, true) : undefined
        )
      )
      .orderBy(desc(successStories.publishedAt));
  }

  // Get most viewed success stories
  static async getMostViewed(limit = 10, published = true): Promise<SuccessStory[]> {
    return await database()
      .select()
      .from(successStories)
      .where(
        published ? eq(successStories.isPublished, true) : undefined
      )
      .orderBy(desc(successStories.pageViews))
      .limit(limit);
  }

  // Get recent success stories
  static async getRecent(limit = 10, published = true): Promise<SuccessStory[]> {
    return await database()
      .select()
      .from(successStories)
      .where(
        published ? eq(successStories.isPublished, true) : undefined
      )
      .orderBy(desc(successStories.publishedAt))
      .limit(limit);
  }

  // Get success stories by location/city
  static async findByCity(cityEn: string, cityAr: string, published = true): Promise<SuccessStory[]> {
    return await database()
      .select()
      .from(successStories)
      .where(
        and(
          published ? eq(successStories.isPublished, true) : undefined,
          or(
            eq(successStories.cityEn, cityEn),
            eq(successStories.cityAr, cityAr)
          )
        )
      )
      .orderBy(desc(successStories.publishedAt));
  }

  // Get total count for pagination
  static async getTotalCount(filters: {
    published?: boolean;
    programId?: number;
    search?: string;
  } = {}): Promise<number> {
    let query = database().select().from(successStories);

    const conditions = [];
    if (filters.published !== undefined) {
      conditions.push(eq(successStories.isPublished, filters.published));
    }
    if (filters.programId !== undefined) {
      conditions.push(eq(successStories.programId, filters.programId));
    }
    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(successStories.titleEn, searchPattern),
          ilike(successStories.titleAr, searchPattern),
          ilike(successStories.contentEn, searchPattern),
          ilike(successStories.contentAr, searchPattern),
          ilike(successStories.personNameEn, searchPattern),
          ilike(successStories.personNameAr, searchPattern),
          ilike(successStories.cityEn, searchPattern),
          ilike(successStories.cityAr, searchPattern)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query.execute();
    return result.length;
  }

  // Get unique cities for filter dropdown
  static async getUniqueCities(published = true): Promise<{ cityEn: string; cityAr: string }[]> {
    const stories = await database()
      .select({
        cityEn: successStories.cityEn,
        cityAr: successStories.cityAr,
      })
      .from(successStories)
      .where(
        published ? eq(successStories.isPublished, true) : undefined
      );

    // Remove duplicates
    const uniqueCities = Array.from(
      new Set(stories.map(s => `${s.cityEn}|${s.cityAr}`))
    ).map(cityPair => {
      const [cityEn, cityAr] = cityPair.split('|');
      return { cityEn, cityAr };
    });

    return uniqueCities;
  }
}
