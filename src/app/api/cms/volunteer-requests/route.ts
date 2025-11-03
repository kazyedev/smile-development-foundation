import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  
  // Build query
  let query = supabase
    .from("volunteer_requests")
    .select(
      `
      id,
      name,
      email,
      phone,
      age,
      interests,
      status,
      applied_at,
      created_at
      `
    )
    .order("applied_at", { ascending: false });

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  // Apply status filter
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching volunteer requests:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Transform the data to camelCase
  const items = (data ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    age: item.age,
    interests: item.interests,
    status: item.status,
    appliedAt: item.applied_at,
    createdAt: item.created_at,
  }));

  return NextResponse.json({ items });
}

