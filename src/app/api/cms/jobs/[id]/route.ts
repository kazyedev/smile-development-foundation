import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

// Transform camelCase fields to snake_case for Supabase
const transformToDatabaseFields = (data: any) => {
  const transformed: any = {};
  
  // Only transform fields that exist in the data
  if (data.isEnglish !== undefined) transformed.is_english = data.isEnglish;
  if (data.isArabic !== undefined) transformed.is_arabic = data.isArabic;
  if (data.titleEn !== undefined) transformed.title_en = data.titleEn;
  if (data.titleAr !== undefined) transformed.title_ar = data.titleAr;
  if (data.slugEn !== undefined) transformed.slug_en = data.slugEn;
  if (data.slugAr !== undefined) transformed.slug_ar = data.slugAr;
  if (data.descriptionEn !== undefined) transformed.description_en = data.descriptionEn;
  if (data.descriptionAr !== undefined) transformed.description_ar = data.descriptionAr;
  if (data.departmentEn !== undefined) transformed.department_en = data.departmentEn;
  if (data.departmentAr !== undefined) transformed.department_ar = data.departmentAr;
  if (data.experience !== undefined) transformed.experience = data.experience;
  if (data.salaryMin !== undefined) transformed.salary_min = data.salaryMin;
  if (data.salaryMax !== undefined) transformed.salary_max = data.salaryMax;
  if (data.salaryCurrency !== undefined) transformed.salary_currency = data.salaryCurrency;
  if (data.benefitsEn !== undefined) transformed.benefits_en = data.benefitsEn;
  if (data.benefitsAr !== undefined) transformed.benefits_ar = data.benefitsAr;
  if (data.urgent !== undefined) transformed.urgent = data.urgent;
  if (data.availablePositions !== undefined) transformed.available_positions = data.availablePositions;
  if (data.requirementsEn !== undefined) transformed.requirements_en = data.requirementsEn;
  if (data.requirementsAr !== undefined) transformed.requirements_ar = data.requirementsAr;
  if (data.responsibilitiesEn !== undefined) transformed.responsibilities_en = data.responsibilitiesEn;
  if (data.responsibilitiesAr !== undefined) transformed.responsibilities_ar = data.responsibilitiesAr;
  if (data.locationEn !== undefined) transformed.location_en = data.locationEn;
  if (data.locationAr !== undefined) transformed.location_ar = data.locationAr;
  if (data.type !== undefined) transformed.type = data.type;
  if (data.applyUrl !== undefined) transformed.apply_url = data.applyUrl;
  if (data.isPublished !== undefined) transformed.is_published = data.isPublished;
  if (data.publishedAt !== undefined) transformed.published_at = data.publishedAt;
  if (data.expiresAt !== undefined) transformed.expires_at = data.expiresAt;
  
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
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ data });
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
    delete (payload as Record<string, unknown>).created_at;
  }

  // Transform camelCase to snake_case for database
  const databasePayload = transformToDatabaseFields(payload);

  const { data, error } = await supabase
    .from("jobs")
    .update({ ...databasePayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
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

  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}

