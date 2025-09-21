import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { newsletterMembers, insertNewsletterMemberSchema } from '@/lib/db/schema/newsletterMembers';
import { z } from 'zod';

// Request body schema
const subscribeSchema = z.object({
  email: z.string().email().max(200),
  locale: z.string().min(2).max(5).default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = subscribeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address or locale',
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { email, locale } = validation.data;
    const db = database();

    // Determine language preferences based on locale
    const isEnglish = locale === 'en';
    const isArabic = locale === 'ar';

    try {
      // Try to insert the new subscriber
      const newSubscriber = await db
        .insert(newsletterMembers)
        .values({
          email,
          isEnglish,
          isArabic,
        })
        .returning();

      return NextResponse.json(
        {
          success: true,
          message: 'Successfully subscribed to newsletter',
          data: {
            id: newSubscriber[0].id,
            email: newSubscriber[0].email,
          },
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      // Check if the error is due to unique constraint violation (email already exists)
      if (dbError.code === '23505' || dbError.constraint === 'newsletter_members_email_unique') {
        // Email already exists - return success message anyway
        return NextResponse.json(
          {
            success: true,
            message: 'Email is already subscribed to newsletter',
            data: {
              email,
              alreadySubscribed: true,
            },
          },
          { status: 200 }
        );
      }

      // Re-throw other database errors
      throw dbError;
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe to newsletter. Please try again.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed. Use POST to subscribe.',
    },
    { status: 405 }
  );
}
