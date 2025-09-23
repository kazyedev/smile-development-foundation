import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { error } = await supabase.auth.updateUser({ data: { otp_verified: true } });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Create user row (id/email) in users table if it doesn't exist
  const { error: insertError } = await supabase
    .from("users")
    .upsert(
      [
        {
          id: user.id,
          email: user.email ?? null,
          role: 'default',
          name_en: user.email?.split('@')[0] || 'User',
          name_ar: user.email?.split('@')[0] || 'مستخدم',
          last_login: user.last_sign_in_at ?? null,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
      ],
      { onConflict: "id", ignoreDuplicates: true }
    );
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}


