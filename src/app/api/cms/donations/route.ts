import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertDonationSchema } from "@/lib/db/schema/donations";

// Transform camelCase fields to snake_case for Supabase
// Using conditional transformation to only include defined fields
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.amount !== undefined) transformed.amount = String(data.amount);
  if (data.currency !== undefined) transformed.currency = data.currency;
  if (data.method !== undefined) transformed.method = data.method;
  if (data.frequency !== undefined) transformed.frequency = data.frequency;
  if (data.status !== undefined) transformed.status = data.status;
  if (data.donorName !== undefined) transformed.donor_name = data.donorName;
  if (data.donorEmail !== undefined) transformed.donor_email = data.donorEmail;
  if (data.donorNote !== undefined) transformed.donor_note = data.donorNote;
  if (data.stripeSessionId !== undefined) transformed.stripe_session_id = data.stripeSessionId;
  if (data.stripePaymentIntentId !== undefined) transformed.stripe_payment_intent_id = data.stripePaymentIntentId;
  if (data.bankAccountId !== undefined) transformed.bank_account_id = data.bankAccountId;
  if (data.transferAttachmentUrl !== undefined) transformed.transfer_attachment_url = data.transferAttachmentUrl;
  if (data.depositAttachmentUrl !== undefined) transformed.deposit_attachment_url = data.depositAttachmentUrl;
  if (data.metadata !== undefined) transformed.metadata = data.metadata;
  
  return transformed;
};

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  
  let query = supabase
    .from("donations")
    .select(
      "id, amount, currency, donor_name, donor_email, method, status, created_at"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`donor_name.ilike.%${search}%,donor_email.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await supabaseServer();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate the input
    const validatedData = insertDonationSchema.parse(body);

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);

    const { data, error } = await supabase
      .from("donations")
      .insert(databaseData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/donations - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}

