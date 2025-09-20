import { eq, desc, asc, like, and, or, ilike } from "drizzle-orm";
import { database } from "@/lib/db";
import { publications, type Publication, type NewPublication } from "@/lib/db/schema/publications";
import { programs } from "@/lib/db/schema/programs";
import { projects } from "@/lib/db/schema/projects";
import { activities } from "@/lib/db/schema/activities";

export class PublicationsRepository {
  // Create a new publication
  static async create(data: NewPublication): Promise<Publication> {
    const [publication] = await database()
      .insert(publications)
      .values(data)
      .returning();
    return publication;
  }

  // Get all publications with optional filters
  static async findMany({
    published,
    programId,
    projectId,
    activityId,
    categoryId,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    programId?: number;
    projectId?: number;
    activityId?: number;
    categoryId?: number;
    limit?: number;
    offset?: number;
    orderBy?: keyof Publication;
    order?: "asc" | "desc";
  } = {}): Promise<Publication[]> {
    let query = database().select().from(publications);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(publications.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(publications.programId, programId));
    }
    if (projectId !== undefined) {
      conditions.push(eq(publications.projectId, projectId));
    }
    if (activityId !== undefined) {
      conditions.push(eq(publications.activityId, activityId));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(publications.categoryId, categoryId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = publications[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get publication by ID
  static async findById(id: number): Promise<Publication | null> {
    const [publication] = await database()
      .select()
      .from(publications)
      .where(eq(publications.id, id))
      .limit(1);
    return publication || null;
  }

  // Get publication by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Publication | null> {
    // Try English slug first
    const [publicationEn] = await database()
      .select()
      .from(publications)
      .where(
        and(
          eq(publications.isPublished, true),
          eq(publications.slugEn, slug)
        )
      )
      .limit(1);

    if (publicationEn) return publicationEn;

    // Try Arabic slug
    const [publicationAr] = await database()
      .select()
      .from(publications)
      .where(
        and(
          eq(publications.isPublished, true),
          eq(publications.slugAr, slug)
        )
      )
      .limit(1);

    return publicationAr || null;
  }

  // Get publications with their associated program, project, and activity
  static async findWithRelations({
    published,
    programId,
    projectId,
    activityId,
    limit = 50,
    offset = 0,
  }: {
    published?: boolean;
    programId?: number;
    projectId?: number;
    activityId?: number;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = database()
      .select({
        publication: publications,
        program: programs,
        project: projects,
        activity: activities,
      })
      .from(publications)
      .leftJoin(programs, eq(publications.programId, programs.id))
      .leftJoin(projects, eq(publications.projectId, projects.id))
      .leftJoin(activities, eq(publications.activityId, activities.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(publications.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(publications.programId, programId));
    }
    if (projectId !== undefined) {
      conditions.push(eq(publications.projectId, projectId));
    }
    if (activityId !== undefined) {
      conditions.push(eq(publications.activityId, activityId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(publications.publishedAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search publications by title, description, or keywords
  static async search(query: string, published = true): Promise<Publication[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(publications)
      .where(
        and(
          published ? eq(publications.isPublished, true) : undefined,
          or(
            ilike(publications.titleEn, searchPattern),
            ilike(publications.titleAr, searchPattern),
            ilike(publications.descriptionEn, searchPattern),
            ilike(publications.descriptionAr, searchPattern)
          )
        )
      )
      .orderBy(desc(publications.publishedAt));
  }

  // Update publication
  static async update(id: number, data: Partial<NewPublication>): Promise<Publication | null> {
    const [updated] = await database()
      .update(publications)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(publications.id, id))
      .returning();
    return updated || null;
  }

  // Delete publication
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(publications)
      .where(eq(publications.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish publication
  static async publish(id: number, published: boolean): Promise<Publication | null> {
    const [updated] = await database()
      .update(publications)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(publications.id, id))
      .returning();
    return updated || null;
  }

  // Increment publication page views
  static async incrementViews(id: number): Promise<number> {
    // First get the current views count
    const [currentPublication] = await database()
      .select({ views: publications.pageViews })
      .from(publications)
      .where(eq(publications.id, id))
      .limit(1);
    
    if (!currentPublication) return 0;
    
    const newViews = (currentPublication.views || 0) + 1;
    
    // Update with the new views count
    const [updated] = await database()
      .update(publications)
      .set({
        pageViews: newViews,
        updatedAt: new Date(),
      })
      .where(eq(publications.id, id))
      .returning({ views: publications.pageViews });
    
    return updated?.views || newViews;
  }

  // Increment publication downloads
  static async incrementDownloads(id: number): Promise<number> {
    // First get the current downloads count
    const [currentPublication] = await database()
      .select({ downloads: publications.downloads })
      .from(publications)
      .where(eq(publications.id, id))
      .limit(1);
    
    if (!currentPublication) return 0;
    
    const newDownloads = (currentPublication.downloads || 0) + 1;
    
    // Update with the new downloads count
    const [updated] = await database()
      .update(publications)
      .set({
        downloads: newDownloads,
        updatedAt: new Date(),
      })
      .where(eq(publications.id, id))
      .returning({ downloads: publications.downloads });
    
    return updated?.downloads || newDownloads;
  }

  // Get published publications count
  static async getPublishedCount(): Promise<number> {
    const result = await database()
      .select()
      .from(publications)
      .where(eq(publications.isPublished, true));
    
    return result.length;
  }

  // Get publications by program ID
  static async findByProgramId(programId: number, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        and(
          eq(publications.programId, programId),
          published ? eq(publications.isPublished, true) : undefined
        )
      )
      .orderBy(desc(publications.publishedAt));
  }

  // Get publications by project ID
  static async findByProjectId(projectId: number, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        and(
          eq(publications.projectId, projectId),
          published ? eq(publications.isPublished, true) : undefined
        )
      )
      .orderBy(desc(publications.publishedAt));
  }

  // Get publications by activity ID
  static async findByActivityId(activityId: number, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        and(
          eq(publications.activityId, activityId),
          published ? eq(publications.isPublished, true) : undefined
        )
      )
      .orderBy(desc(publications.publishedAt));
  }

  // Get most viewed publications
  static async getMostViewed(limit = 10, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        published ? eq(publications.isPublished, true) : undefined
      )
      .orderBy(desc(publications.pageViews))
      .limit(limit);
  }

  // Get most downloaded publications
  static async getMostDownloaded(limit = 10, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        published ? eq(publications.isPublished, true) : undefined
      )
      .orderBy(desc(publications.downloads))
      .limit(limit);
  }

  // Get recent publications
  static async getRecent(limit = 10, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        published ? eq(publications.isPublished, true) : undefined
      )
      .orderBy(desc(publications.publishedAt))
      .limit(limit);
  }

  // Get publications by category ID
  static async findByCategoryId(categoryId: number, published = true): Promise<Publication[]> {
    return await database()
      .select()
      .from(publications)
      .where(
        and(
          eq(publications.categoryId, categoryId),
          published ? eq(publications.isPublished, true) : undefined
        )
      )
      .orderBy(desc(publications.publishedAt));
  }

  // Get total count for pagination
  static async getTotalCount(filters: {
    published?: boolean;
    programId?: number;
    projectId?: number;
    activityId?: number;
    categoryId?: number;
    search?: string;
  } = {}): Promise<number> {
    let query = database().select().from(publications);

    const conditions = [];
    if (filters.published !== undefined) {
      conditions.push(eq(publications.isPublished, filters.published));
    }
    if (filters.programId !== undefined) {
      conditions.push(eq(publications.programId, filters.programId));
    }
    if (filters.projectId !== undefined) {
      conditions.push(eq(publications.projectId, filters.projectId));
    }
    if (filters.activityId !== undefined) {
      conditions.push(eq(publications.activityId, filters.activityId));
    }
    if (filters.categoryId !== undefined) {
      conditions.push(eq(publications.categoryId, filters.categoryId));
    }
    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(publications.titleEn, searchPattern),
          ilike(publications.titleAr, searchPattern),
          ilike(publications.descriptionEn, searchPattern),
          ilike(publications.descriptionAr, searchPattern)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query.execute();
    return result.length;
  }

  // Get publications by tags
  static async findByTags(tags: string[], published = true): Promise<Publication[]> {
    // This is a simplified version - you might want to implement proper array overlap queries
    return await database()
      .select()
      .from(publications)
      .where(
        published ? eq(publications.isPublished, true) : undefined
      )
      .orderBy(desc(publications.publishedAt));
  }

  // Get unique tags for filter dropdown
  static async getUniqueTags(published = true): Promise<{ tagsEn: string[]; tagsAr: string[] }> {
    const publicationsData = await database()
      .select({
        tagsEn: publications.tagsEn,
        tagsAr: publications.tagsAr,
      })
      .from(publications)
      .where(
        published ? eq(publications.isPublished, true) : undefined
      );

    // Flatten and deduplicate tags
    const allTagsEn = publicationsData.flatMap(p => p.tagsEn || []);
    const allTagsAr = publicationsData.flatMap(p => p.tagsAr || []);
    
    const uniqueTagsEn = Array.from(new Set(allTagsEn));
    const uniqueTagsAr = Array.from(new Set(allTagsAr));

    return {
      tagsEn: uniqueTagsEn,
      tagsAr: uniqueTagsAr,
    };
  }
}
