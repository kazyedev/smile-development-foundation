import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function DELETE(req: Request) {
  const supabase = await supabaseServer();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("DELETE /api/cms/images/bulk-delete - Authentication failed:", authError);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json().catch(() => ({}));
  console.log("DELETE /api/cms/images/bulk-delete - Payload:", JSON.stringify(payload, null, 2));
  
  if (!payload || !Array.isArray(payload.ids) || payload.ids.length === 0) {
    return NextResponse.json({ error: "Invalid request body. Expected { ids: number[] }" }, { status: 400 });
  }

  const ids = payload.ids.filter((id: any) => Number.isFinite(Number(id))).map(Number);
  if (ids.length === 0) {
    return NextResponse.json({ error: "No valid IDs provided" }, { status: 400 });
  }

  const { error } = await supabase.from("images").delete().in("id", ids);
  if (error) {
    console.error("DELETE /api/cms/images/bulk-delete - Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ 
    success: true, 
    message: `Successfully deleted ${ids.length} image(s)`,
    deletedIds: ids 
  });
}
