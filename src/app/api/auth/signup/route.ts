import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password, role } = await request.json();
  const supabase = await supabaseServer();

  // Sign up the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role }
    }
  });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
  // If user was created successfully, add them to the users table
  if (data.user) {
    try {
      const { error: insertError } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          email: data.user.email,
          role: role || 'default',
          name_en: data.user.email?.split('@')[0] || 'User', // Default name from email
          name_ar: data.user.email?.split('@')[0] || 'مستخدم', // Default Arabic name
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (insertError) {
        console.error('Error inserting user into users table:', insertError);
        // Don't fail the signup if user table insert fails, but log it
      }
    } catch (insertException) {
      console.error('Exception inserting user into users table:', insertException);
    }
  }

  return NextResponse.json({ user: data.user });
}
