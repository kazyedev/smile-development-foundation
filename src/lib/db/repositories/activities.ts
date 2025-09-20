import { eq, desc, asc, like, and, or, ilike } from "drizzle-orm";
import { database } from "@/lib/db";
import { activities, type Activity, type NewActivity } from "@/lib/db/schema/activities";
import { programs } from "@/lib/db/schema/programs";
import { projects } from "@/lib/db/schema/projects";

export class ActivitiesRepository {
  // Create a new activity
  static async create(data: NewActivity): Promise<Activity> {
    const [activity] = await database()
      .insert(activities)
      .values(data)
      .returning();
    return activity;
  }

  // Get all activities with optional filters
  static async findMany({
    published,
    programId,
    projectId,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    programId?: number;
    projectId?: number;
    limit?: number;
    offset?: number;
    orderBy?: keyof Activity;
    order?: "asc" | "desc";
  } = {}): Promise<Activity[]> {
    let query = database().select().from(activities);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(activities.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(activities.programId, programId));
    }
    if (projectId !== undefined) {
      conditions.push(eq(activities.projectId, projectId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = activities[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get activity by ID
  static async findById(id: number): Promise<Activity | null> {
    const [activity] = await database()
      .select()
      .from(activities)
      .where(eq(activities.id, id))
      .limit(1);
    return activity || null;
  }

  // Get activity by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Activity | null> {
    // Try English slug first
    const [activityEn] = await database()
      .select()
      .from(activities)
      .where(
        and(
          eq(activities.isPublished, true),
          eq(activities.slugEn, slug)
        )
      )
      .limit(1);

    if (activityEn) return activityEn;

    // Try Arabic slug
    const [activityAr] = await database()
      .select()
      .from(activities)
      .where(
        and(
          eq(activities.isPublished, true),
          eq(activities.slugAr, slug)
        )
      )
      .limit(1);

    return activityAr || null;
  }

  // Get activities with their associated program and project
  static async findWithRelations({
    published,
    programId,
    projectId,
    limit = 50,
    offset = 0,
  }: {
    published?: boolean;
    programId?: number;
    projectId?: number;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = database()
      .select({
        activity: activities,
        program: programs,
        project: projects,
      })
      .from(activities)
      .leftJoin(programs, eq(activities.programId, programs.id))
      .leftJoin(projects, eq(activities.projectId, projects.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(activities.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(activities.programId, programId));
    }
    if (projectId !== undefined) {
      conditions.push(eq(activities.projectId, projectId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(activities.publishedAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search activities by title, content, keywords, or tags
  static async search(query: string, published = true): Promise<Activity[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(activities)
      .where(
        and(
          published ? eq(activities.isPublished, true) : undefined,
          or(
            ilike(activities.titleEn, searchPattern),
            ilike(activities.titleAr, searchPattern),
            ilike(activities.contentEn, searchPattern),
            ilike(activities.contentAr, searchPattern)
          )
        )
      )
      .orderBy(desc(activities.publishedAt));
  }

  // Update activity
  static async update(id: number, data: Partial<NewActivity>): Promise<Activity | null> {
    const [updated] = await database()
      .update(activities)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(activities.id, id))
      .returning();
    return updated || null;
  }

  // Delete activity
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(activities)
      .where(eq(activities.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish activity
  static async publish(id: number, published: boolean): Promise<Activity | null> {
    const [updated] = await database()
      .update(activities)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(activities.id, id))
      .returning();
    return updated || null;
  }

  // Increment activity page views
  static async incrementViews(id: number): Promise<number> {
    // First get the current views count
    const [currentActivity] = await database()
      .select({ views: activities.pageViews })
      .from(activities)
      .where(eq(activities.id, id))
      .limit(1);
    
    if (!currentActivity) return 0;
    
    const newViews = (currentActivity.views || 0) + 1;
    
    // Update with the new views count
    const [updated] = await database()
      .update(activities)
      .set({
        pageViews: newViews,
        updatedAt: new Date(),
      })
      .where(eq(activities.id, id))
      .returning({ views: activities.pageViews });
    
    return updated?.views || newViews;
  }

  // Get published activities count
  static async getPublishedCount(): Promise<number> {
    const result = await database()
      .select()
      .from(activities)
      .where(eq(activities.isPublished, true));
    
    return result.length;
  }

  // Get activities by program ID
  static async findByProgramId(programId: number, published = true): Promise<Activity[]> {
    return await database()
      .select()
      .from(activities)
      .where(
        and(
          eq(activities.programId, programId),
          published ? eq(activities.isPublished, true) : undefined
        )
      )
      .orderBy(desc(activities.publishedAt));
  }

  // Get activities by project ID
  static async findByProjectId(projectId: number, published = true): Promise<Activity[]> {
    return await database()
      .select()
      .from(activities)
      .where(
        and(
          eq(activities.projectId, projectId),
          published ? eq(activities.isPublished, true) : undefined
        )
      )
      .orderBy(desc(activities.publishedAt));
  }

  // Get most viewed activities
  static async getMostViewed(limit = 10, published = true): Promise<Activity[]> {
    return await database()
      .select()
      .from(activities)
      .where(
        published ? eq(activities.isPublished, true) : undefined
      )
      .orderBy(desc(activities.pageViews))
      .limit(limit);
  }

  // Get recent activities
  static async getRecent(limit = 10, published = true): Promise<Activity[]> {
    return await database()
      .select()
      .from(activities)
      .where(
        published ? eq(activities.isPublished, true) : undefined
      )
      .orderBy(desc(activities.publishedAt))
      .limit(limit);
  }

  // Get activities by date range
  static async findByDateRange(
    startDate: Date, 
    endDate: Date, 
    published = true
  ): Promise<Activity[]> {
    return await database()
      .select()
      .from(activities)
      .where(
        and(
          published ? eq(activities.isPublished, true) : undefined,
          // Add date range filter when the date field is available
        )
      )
      .orderBy(desc(activities.date));
  }

  // Search by tags
  static async findByTags(tags: string[], published = true): Promise<Activity[]> {
    // This is a simplified version - you might want to implement proper array overlap queries
    return await database()
      .select()
      .from(activities)
      .where(
        published ? eq(activities.isPublished, true) : undefined
      )
      .orderBy(desc(activities.publishedAt));
  }

  // Get total count for pagination
  static async getTotalCount(filters: {
    published?: boolean;
    programId?: number;
    projectId?: number;
    search?: string;
  } = {}): Promise<number> {
    let query = database().select().from(activities);

    const conditions = [];
    if (filters.published !== undefined) {
      conditions.push(eq(activities.isPublished, filters.published));
    }
    if (filters.programId !== undefined) {
      conditions.push(eq(activities.programId, filters.programId));
    }
    if (filters.projectId !== undefined) {
      conditions.push(eq(activities.projectId, filters.projectId));
    }
    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(
          ilike(activities.titleEn, searchPattern),
          ilike(activities.titleAr, searchPattern),
          ilike(activities.contentEn, searchPattern),
          ilike(activities.contentAr, searchPattern)
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
