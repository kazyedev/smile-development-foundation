import { supabaseServer } from "@/lib/supabase/server";
import { requireRole, uploadFile, deleteFolder } from "@/lib/middlewares";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("createdAt", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
export async function POST(request: Request) {
  await requireRole("admin");
  
  const formData = await request.formData();
  const featuredImage = formData.get("featuredImage") as File;
  const otherImages = formData.getAll("otherImages") as File[];
  const newsData = JSON.parse(formData.get("newsData") as string);

  const supabase = await supabaseServer();
  const { data: inserted, error } = await supabase
    .from("news")
    .insert([{ ...newsData }])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const folder = `${inserted.id}`;
  if (featuredImage) {
    newsData.featuredImageUrl = await uploadFile("news-images", `${folder}/featured.jpg`, featuredImage);
  }
  if (otherImages.length) {
    newsData.otherImagesUrl = [];
    for (let i = 0; i < otherImages.length; i++) {
      const path = `${folder}/other-${i + 1}.jpg`;
      await uploadFile("news-images", path, otherImages[i]);
      newsData.otherImagesUrl.push(path);
    }
  }

  await supabase.from("news").update(newsData).eq("id", inserted.id);

  return NextResponse.json({ id: inserted.id });
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await requireRole("admin");

  const formData = await req.formData();
  const featuredImage = formData.get("featuredImage") as File;
  const otherImages = formData.getAll("otherImages") as File[];
  const updates = JSON.parse(formData.get("newsData") as string);

  const supabase = await supabaseServer();
  const folder = `${params.id}`;

  if (featuredImage) {
    updates.featuredImageUrl = await uploadFile("news-images", `${folder}/featured.jpg`, featuredImage);
  }
  if (otherImages.length) {
    updates.otherImagesUrl = [];
    for (let i = 0; i < otherImages.length; i++) {
      const path = `${folder}/other-${i + 1}.jpg`;
      await uploadFile("news-images", path, otherImages[i]);
      updates.otherImagesUrl.push(path);
    }
  }

  const { error } = await supabase.from("news").update(updates).eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await requireRole("admin");

  const supabase = await supabaseServer();
  await deleteFolder("news-images", params.id);

  const { error } = await supabase.from("news").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
