import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await supabaseServer();
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          new URL("/en/login?error=auth_callback_error", request.url)
        );
      }

      // Get the current user to determine redirect
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check if this is a password reset completion
        if (next.includes("reset-password") || requestUrl.searchParams.get("type") === "recovery") {
          return NextResponse.redirect(
            new URL("/en/reset-password/complete", request.url)
          );
        }
        
        // For regular auth, redirect to CMS if user has proper role
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        
        if (profile?.role && profile.role !== "default") {
          return NextResponse.redirect(new URL("/en/cms", request.url));
        }
      }

      // Default redirect
      return NextResponse.redirect(new URL(next, request.url));
    } catch (error) {
      console.error("Auth callback exception:", error);
      return NextResponse.redirect(
        new URL("/en/login?error=auth_callback_error", request.url)
      );
    }
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL("/en/login", request.url));
}
