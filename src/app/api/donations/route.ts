import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { donations, insertDonationSchema } from '@/lib/db/schema/donations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      amount,
      currency,
      method,
      frequency,
      donorName,
      donorEmail,
      donorNote,
      bankAccountId,
      transferAttachmentUrl,
      depositAttachmentUrl
    } = body;

    // Validate required fields
    if (!amount || !currency || !method || !donorEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: amount, currency, method, donorEmail',
        },
        { status: 400 }
      );
    }

    // Validate method-specific requirements
    if (method === 'cash_transfer' && !transferAttachmentUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Transfer receipt upload is required for cash transfer method',
        },
        { status: 400 }
      );
    }

    if (method === 'bank_deposit' && (!depositAttachmentUrl || !bankAccountId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Deposit certificate upload and bank account selection are required for bank deposit method',
        },
        { status: 400 }
      );
    }

    // Prepare donation data
    const donationData = {
      amount: parseFloat(amount),
      currency: currency as 'USD' | 'SAR' | 'AED' | 'YER',
      method: method as 'stripe' | 'cash_transfer' | 'bank_deposit',
      frequency: (frequency || 'once') as 'once' | 'monthly',
      donorName: donorName || null,
      donorEmail,
      donorNote: donorNote || null,
      bankAccountId: bankAccountId ? parseInt(bankAccountId) : null,
      status: 'pending' as const,
      transferAttachmentUrl: transferAttachmentUrl || null,
      depositAttachmentUrl: depositAttachmentUrl || null,
    };

    // Validate with Zod schema
    const validatedData = insertDonationSchema.parse(donationData);

    const db = database();

    // Insert donation into database
    const [newDonation] = await db
      .insert(donations)
      .values(validatedData)
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Donation recorded successfully',
        data: {
          id: newDonation.id,
          amount: newDonation.amount,
          currency: newDonation.currency,
          method: newDonation.method,
          status: newDonation.status,
          transferAttachmentUrl: newDonation.transferAttachmentUrl,
          depositAttachmentUrl: newDonation.depositAttachmentUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Donation API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = database();
    const allDonations = await db.select().from(donations).limit(10);
    
    return NextResponse.json({
      success: true,
      data: allDonations,
      count: allDonations.length,
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch donations',
      },
      { status: 500 }
    );
  }
}
