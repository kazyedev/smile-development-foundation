import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
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

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ data });
}

export async function PATCH(req: Request, { params }: Params) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json().catch(() => ({}));
  // Prevent ID overwrite from client
  if (payload && typeof payload === "object") {
    delete (payload as Record<string, unknown>).id;
    delete (payload as Record<string, unknown>).created_at;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("donations")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("donations").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

