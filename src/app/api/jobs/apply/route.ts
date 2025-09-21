import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { jobApplies, insertJobApplySchema } from '@/lib/db/schema/jobApplies';
import { jobs } from '@/lib/db/schema/jobs';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      jobId,
      name,
      email,
      phone,
      yearsOfExperience,
      coverLetter,
      cvUrl
    } = body;

    // Validate required fields
    if (!jobId || !name || !email || !phone || yearsOfExperience === undefined || !coverLetter) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if job exists and is published
    const [job] = await database()
      .select({ id: jobs.id })
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Validate the application data
    try {
      insertJobApplySchema.parse({
        jobId,
        name,
        email,
        phone,
        yearsOfExperience,
        coverLetter,
        cvUrl: cvUrl || null,
        status: 'pending'
      });
    } catch (validationError) {
      console.error('Validation error:', validationError);
      return NextResponse.json(
        { error: 'Invalid application data', details: validationError },
        { status: 400 }
      );
    }

    // Insert job application into database
    const [insertedApplication] = await database().insert(jobApplies).values({
      jobId,
      name,
      email,
      phone,
      yearsOfExperience,
      coverLetter,
      cvUrl: cvUrl || null,
      status: 'pending'
    }).returning();

    return NextResponse.json({
      success: true,
      message: 'Job application submitted successfully',
      data: insertedApplication
    });

  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
