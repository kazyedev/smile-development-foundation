import { eq, desc, asc, like, and, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, type Project, type NewProject } from "@/lib/db/schema/projects";
import { programs } from "@/lib/db/schema/programs";

export class ProjectsRepository {
  // Create a new project
  static async create(data: NewProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(data)
      .returning();
    return project;
  }

  // Get all projects with optional filters
  static async findMany({
    published,
    programId,
    categoryId,
    limit = 50,
    offset = 0,
    orderBy = "createdAt",
    order = "desc",
  }: {
    published?: boolean;
    programId?: number;
    categoryId?: number;
    limit?: number;
    offset?: number;
    orderBy?: keyof Project;
    order?: "asc" | "desc";
  } = {}): Promise<Project[]> {
    let query = db.select().from(projects);

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(projects.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(projects.programId, programId));
    }
    if (categoryId !== undefined) {
      conditions.push(eq(projects.categoryId, categoryId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering
    const orderColumn = projects[orderBy];
    if (orderColumn) {
      query = query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query = query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get project by ID
  static async findById(id: number): Promise<Project | null> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return project || null;
  }

  // Get project by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Project | null> {
    const [project] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.isPublished, true),
          eq(projects.slugEn, slug)
        )
      )
      .limit(1);

    if (project) return project;

    // Try Arabic slug
    const [projectAr] = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.isPublished, true),
          eq(projects.slugAr, slug)
        )
      )
      .limit(1);

    return projectAr || null;
  }

  // Get projects with their associated program
  static async findWithProgram({
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
    let query = db
      .select({
        project: projects,
        program: programs,
      })
      .from(projects)
      .leftJoin(programs, eq(projects.programId, programs.id));

    // Build where conditions
    const conditions = [];
    if (published !== undefined) {
      conditions.push(eq(projects.isPublished, published));
    }
    if (programId !== undefined) {
      conditions.push(eq(projects.programId, programId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query
      .orderBy(desc(projects.createdAt))
      .limit(limit)
      .offset(offset);

    return await query.execute();
  }

  // Search projects by title or description
  static async search(query: string, published = true): Promise<Project[]> {
    const searchPattern = `%${query}%`;
    
    return await db
      .select()
      .from(projects)
      .where(
        and(
          published ? eq(projects.isPublished, true) : undefined,
          // Search in English and Arabic titles and descriptions
          like(projects.titleEn, searchPattern)
          // Note: Add OR conditions for other fields as needed
        )
      )
      .orderBy(desc(projects.createdAt));
  }

  // Update project
  static async update(id: number, data: Partial<NewProject>): Promise<Project | null> {
    const [updated] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updated || null;
  }

  // Delete project
  static async delete(id: number): Promise<boolean> {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish project
  static async publish(id: number, published: boolean): Promise<Project | null> {
    const [updated] = await db
      .update(projects)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();
    return updated || null;
  }

  // Increment page views
  static async incrementPageViews(id: number): Promise<number> {
    const [updated] = await db
      .update(projects)
      .set({
        pageViews: projects.pageViews + 1,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning({ pageViews: projects.pageViews });
    
    return updated?.pageViews || 0;
  }

  // Get published projects count
  static async getPublishedCount(): Promise<number> {
    const [result] = await db
      .select({ count: projects.id })
      .from(projects)
      .where(eq(projects.isPublished, true));
    
    return result?.count || 0;
  }

  // Get projects by program ID
  static async findByProgramId(programId: number, published = true): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.programId, programId),
          published ? eq(projects.isPublished, true) : undefined
        )
      )
      .orderBy(desc(projects.createdAt));
  }

  // Get projects by activity IDs
  static async findByActivityIds(activityIds: number[], published = true): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(
        and(
          // Note: This requires a custom SQL condition for array overlap
          // You might need to adjust this based on your actual query needs
          published ? eq(projects.isPublished, true) : undefined
        )
      )
      .orderBy(desc(projects.createdAt));
  }

  // Get projects by category ID
  static async findByCategoryId(categoryId: number, published = true): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.categoryId, categoryId),
          published ? eq(projects.isPublished, true) : undefined
        )
      )
      .orderBy(desc(projects.createdAt));
  }

  // Get most viewed projects
  static async getMostViewed(limit = 10, published = true): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(published ? eq(projects.isPublished, true) : undefined)
      .orderBy(desc(projects.pageViews))
      .limit(limit);
  }

  // Get recent projects
  static async getRecent(limit = 10, published = true): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(published ? eq(projects.isPublished, true) : undefined)
      .orderBy(desc(projects.publishedAt))
      .limit(limit);
  }
}
