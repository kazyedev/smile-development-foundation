import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { insertJobSchema } from "@/lib/db/schema/jobs";

// Transform camelCase fields to snake_case for Supabase
// Using conditional transformation to only include defined fields
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

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  
  let query = supabase
    .from("jobs")
    .select(
      "id, title_en, title_ar, department_en, department_ar, type, location_en, location_ar, is_published, urgent, created_at"
    )
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%,department_en.ilike.%${search}%,department_ar.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await supabaseServer();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate the input
    const validatedData = insertJobSchema.parse(body);

    // Transform camelCase to snake_case for database
    const databaseData = transformToDatabaseFields(validatedData);

    const { data, error } = await supabase
      .from("jobs")
      .insert(databaseData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("POST /api/cms/jobs - Error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid data" }, 
      { status: 400 }
    );
  }
}

