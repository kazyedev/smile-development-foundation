import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { jobs } from '@/lib/db/schema/jobs';
import { eq, desc, and, or, like } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') !== 'false'; // Default to published only
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';
    const type = searchParams.get('type') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = database().select().from(jobs);

    // Build where conditions
    const conditions = [];
    
    if (published) {
      conditions.push(eq(jobs.isPublished, true));
    }

    if (search) {
      conditions.push(
        or(
          like(jobs.titleEn, `%${search}%`),
          like(jobs.titleAr, `%${search}%`),
          like(jobs.departmentEn, `%${search}%`),
          like(jobs.departmentAr, `%${search}%`),
          like(jobs.descriptionEn, `%${search}%`),
          like(jobs.descriptionAr, `%${search}%`)
        )
      );
    }

    if (department) {
      conditions.push(
        or(
          eq(jobs.departmentEn, department),
          eq(jobs.departmentAr, department)
        )
      );
    }

    if (type) {
      conditions.push(eq(jobs.type, type as any));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add ordering (urgent jobs first, then by posted date)
    query = query
      .orderBy(desc(jobs.urgent), desc(jobs.postedDate))
      .limit(limit)
      .offset(offset);

    const jobResults = await query.execute();

    return NextResponse.json({
      success: true,
      data: jobResults,
      count: jobResults.length
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
