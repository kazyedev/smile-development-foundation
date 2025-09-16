import { eq, desc, asc, like, and, isNull, isNotNull } from "drizzle-orm";
import { database } from "@/lib/db";
import { programs, type Program, type NewProgram } from "@/lib/db/schema/programs";

export class ProgramsRepository {
  // Create a new program
  static async create(data: NewProgram): Promise<Program> {
    const [program] = await database()
      .insert(programs)
      .values(data)
      .returning();
    return program;
  }

  // Get all programs with optional filters
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
    orderBy?: keyof Program;
    order?: "asc" | "desc";
  } = {}): Promise<Program[]> {
    const query = database().select().from(programs);

    // Add published filter
    if (published !== undefined) {
      query.where(eq(programs.isPublished, published));
    }

    // Add ordering
    const orderColumn = programs[orderBy];
    if (orderColumn) {
      query.orderBy(order === "asc" ? asc(orderColumn) : desc(orderColumn));
    }

    // Add pagination
    query.limit(limit).offset(offset);

    return await query.execute();
  }

  // Get program by ID
  static async findById(id: number): Promise<Program | null> {
    const [program] = await database()
      .select()
      .from(programs)
      .where(eq(programs.id, id))
      .limit(1);
    return program || null;
  }

  // Get program by slug (English or Arabic)
  static async findBySlug(slug: string): Promise<Program | null> {
    const [program] = await database()
      .select()
      .from(programs)
      .where(
        and(
          eq(programs.isPublished, true),
          eq(programs.slugEn, slug)
        )
      )
      .limit(1);

    if (program) return program;

    // Try Arabic slug
    const [programAr] = await database()
      .select()
      .from(programs)
      .where(
        and(
          eq(programs.isPublished, true),
          eq(programs.slugAr, slug)
        )
      )
      .limit(1);

    return programAr || null;
  }

  // Search programs by title or description
  static async search(query: string, published = true): Promise<Program[]> {
    const searchPattern = `%${query}%`;
    
    return await database()
      .select()
      .from(programs)
      .where(
        and(
          published ? eq(programs.isPublished, true) : undefined,
          // Search in English and Arabic titles and descriptions
          like(programs.titleEn, searchPattern)
          // Note: Add OR conditions for other fields as needed
        )
      )
      .orderBy(desc(programs.createdAt));
  }

  // Update program
  static async update(id: number, data: Partial<NewProgram>): Promise<Program | null> {
    const [updated] = await database()
      .update(programs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();
    return updated || null;
  }

  // Delete program
  static async delete(id: number): Promise<boolean> {
    const result = await database()
      .delete(programs)
      .where(eq(programs.id, id));
    return result.rowCount > 0;
  }

  // Publish/unpublish program
  static async publish(id: number, published: boolean): Promise<Program | null> {
    const [updated] = await database()
      .update(programs)
      .set({
        isPublished: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(programs.id, id))
      .returning();
    return updated || null;
  }

  // Increment page views
  static async incrementPageViews(id: number): Promise<number> {
    const [updated] = await database()
      .update(programs)
      .set({
        pageViews: programs.pageViews + 1,
        updatedAt: new Date(),
      })
      .where(eq(programs.id, id))
      .returning({ pageViews: programs.pageViews });
    
    return updated?.pageViews || 0;
  }

  // Get published programs count
  static async getPublishedCount(): Promise<number> {
    const [result] = await database()
      .select({ count: programs.id })
      .from(programs)
      .where(eq(programs.isPublished, true));
    
    return result?.count || 0;
  }

  // Get programs by created user
  static async findByCreatedBy(userId: string): Promise<Program[]> {
    return await database()
      .select()
      .from(programs)
      .where(eq(programs.createdBy, userId))
      .orderBy(desc(programs.createdAt));
  }
}
