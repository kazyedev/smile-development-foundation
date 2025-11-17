import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Login API route started.");
  let email, password;
  try {
    const body = await request.json();
    email = body.email;
    password = body.password;
  } catch (e: any) {
    console.error("Failed to parse request body:", e.message);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Supabase login error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user });
}
