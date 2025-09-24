import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/cms/projects/bulk-delete - Starting request");
    const supabase = await supabaseServer();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.log("Authentication failed");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids } = await request.json();
    console.log("Bulk delete project IDs:", ids);

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid or empty IDs array" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("projects")
      .delete()
      .in("id", ids);

    if (error) {
      console.error("Bulk delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Successfully bulk deleted projects");
    return NextResponse.json({ 
      message: `Successfully deleted ${ids.length} project(s)`,
      data 
    });
  } catch (error: any) {
    console.error("POST /api/cms/projects/bulk-delete - Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete projects" }, 
      { status: 500 }
    );
  }
}
