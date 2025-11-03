import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.jobId !== undefined) transformed.job_id = data.jobId;
  if (data.name !== undefined) transformed.name = data.name;
  if (data.email !== undefined) transformed.email = data.email;
  if (data.phone !== undefined) transformed.phone = data.phone;
  if (data.yearsOfExperience !== undefined) transformed.years_of_experience = data.yearsOfExperience;
  if (data.coverLetter !== undefined) transformed.cover_letter = data.coverLetter;
  if (data.cvUrl !== undefined) transformed.cv_url = data.cvUrl;
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
    .from("jobs_applies")
    .select(
      `
      *,
      jobs:job_id (
        id,
        title_en,
        title_ar,
        department_en,
        department_ar
      )
      `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Job application not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  // Transform the response to camelCase and include job data
  const transformedData = {
    id: data.id,
    jobId: data.job_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    yearsOfExperience: data.years_of_experience,
    coverLetter: data.cover_letter,
    cvUrl: data.cv_url,
    status: data.status,
    appliedAt: data.applied_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    job: data.jobs ? {
      id: data.jobs.id,
      titleEn: data.jobs.title_en,
      titleAr: data.jobs.title_ar,
      departmentEn: data.jobs.department_en,
      departmentAr: data.jobs.department_ar,
    } : null,
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
    delete (payload as Record<string, unknown>).job;
    delete (payload as Record<string, unknown>).appliedAt;
    delete (payload as Record<string, unknown>).createdAt;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("jobs_applies")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Job application not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Transform response to camelCase
  const transformedData = {
    id: data.id,
    jobId: data.job_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    yearsOfExperience: data.years_of_experience,
    coverLetter: data.cover_letter,
    cvUrl: data.cv_url,
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

  const { error } = await supabase.from("jobs_applies").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

