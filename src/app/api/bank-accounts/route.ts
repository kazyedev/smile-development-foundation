import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { bankAccounts } from '@/lib/db/schema/bankAccounts';
import { eq } from 'drizzle-orm';

// Valid currencies
const VALID_CURRENCIES = ['USD', 'SAR', 'AED', 'YER'] as const;
type ValidCurrency = typeof VALID_CURRENCIES[number];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const currency = searchParams.get('currency');
    
    // Validate currency parameter
    if (currency && !VALID_CURRENCIES.includes(currency as ValidCurrency)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid currency. Must be one of: ${VALID_CURRENCIES.join(', ')}`,
        },
        { status: 400 }
      );
    }
    
    const db = database();
    
    let query = db.select({
      id: bankAccounts.id,
      bankNameEn: bankAccounts.bankNameEn,
      bankNameAr: bankAccounts.bankNameAr,
      bankLogo: bankAccounts.bankLogo,
      accountNumber: bankAccounts.accountNumber,
      accountNameEn: bankAccounts.accountNameEn,
      accountNameAr: bankAccounts.accountNameAr,
      accountCurrency: bankAccounts.accountCurrency,
    }).from(bankAccounts);
    
    // Filter by currency if provided
    if (currency) {
      query = query.where(eq(bankAccounts.accountCurrency, currency as ValidCurrency));
    }
    
    const accounts = await query;
    
    return NextResponse.json({
      success: true,
      data: accounts,
      count: accounts.length,
    });
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch bank accounts',
      },
      { status: 500 }
    );
  }
}
