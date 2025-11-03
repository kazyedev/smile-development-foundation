import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.name !== undefined) transformed.name = data.name;
  if (data.email !== undefined) transformed.email = data.email;
  if (data.phone !== undefined) transformed.phone = data.phone;
  if (data.age !== undefined) transformed.age = data.age;
  if (data.interests !== undefined) transformed.interests = data.interests;
  if (data.availability !== undefined) transformed.availability = data.availability;
  if (data.experience !== undefined) transformed.experience = data.experience;
  if (data.motivation !== undefined) transformed.motivation = data.motivation;
  if (data.cvUrl !== undefined) transformed.cv_url = data.cvUrl;
  if (data.questionsAnswers !== undefined) transformed.questions_answers = data.questionsAnswers;
  if (data.status !== undefined) transformed.status = data.status;
  
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
    .from("volunteer_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Volunteer request not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  // Transform the response to camelCase
  const transformedData = {
    id: data.id,
    isEnglish: data.is_english,
    isArabic: data.is_arabic,
    name: data.name,
    email: data.email,
    phone: data.phone,
    age: data.age,
    interests: data.interests,
    availability: data.availability,
    experience: data.experience,
    motivation: data.motivation,
    cvUrl: data.cv_url,
    questionsAnswers: data.questions_answers,
    status: data.status,
    appliedAt: data.applied_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };

  return NextResponse.json({ data: transformedData });
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
    delete (payload as Record<string, unknown>).appliedAt;
    delete (payload as Record<string, unknown>).createdAt;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("volunteer_requests")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Volunteer request not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Transform response to camelCase
  const transformedData = {
    id: data.id,
    isEnglish: data.is_english,
    isArabic: data.is_arabic,
    name: data.name,
    email: data.email,
    phone: data.phone,
    age: data.age,
    interests: data.interests,
    availability: data.availability,
    experience: data.experience,
    motivation: data.motivation,
    cvUrl: data.cv_url,
    questionsAnswers: data.questions_answers,
    status: data.status,
    appliedAt: data.applied_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };

  return NextResponse.json({ data: transformedData });
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

  const { error } = await supabase.from("volunteer_requests").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

