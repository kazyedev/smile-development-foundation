import { requireRole } from "@/lib/middlewares";
import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  await requireRole("admin"); // only admin can create
  const body = await request.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase.from("posts").insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data?.[0]);
}
