import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { volunteerRequests } from '@/lib/db/schema/volunteerRequests';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      age,
      interests,
      availability,
      experience,
      motivation,
      cvUrl
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !age || !interests || !availability || !motivation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate age is a number
    if (typeof age !== 'number' || age <= 0) {
      return NextResponse.json(
        { error: 'Age must be a positive number' },
        { status: 400 }
      );
    }

    // Validate interests is an array
    if (!Array.isArray(interests) || interests.length === 0) {
      return NextResponse.json(
        { error: 'At least one area of interest must be selected' },
        { status: 400 }
      );
    }

    // Insert volunteer request into database
    const [insertedRequest] = await database().insert(volunteerRequests).values({
      name,
      email,
      phone,
      age: age.toString(),
      interests: interests.join(','), // Store as comma-separated string
      availability,
      experience: experience || '',
      motivation,
      cvUrl: cvUrl || null,
      status: 'pending'
    }).returning();

    return NextResponse.json({
      success: true,
      message: 'Volunteer request submitted successfully',
      data: insertedRequest
    });

  } catch (error) {
    console.error('Error processing volunteer request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
