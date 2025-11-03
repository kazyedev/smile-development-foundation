import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  const jobId = searchParams.get('jobId');
  
  // Build query with join to jobs table
  let query = supabase
    .from("jobs_applies")
    .select(
      `
      id,
      name,
      email,
      phone,
      job_id,
      status,
      applied_at,
      created_at,
      jobs:job_id (
        id,
        title_en,
        title_ar
      )
      `
    )
    .order("applied_at", { ascending: false });

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  // Apply status filter
  if (status) {
    query = query.eq("status", status);
  }

  // Apply jobId filter
  if (jobId) {
    const jobIdNum = Number(jobId);
    if (Number.isFinite(jobIdNum)) {
      query = query.eq("job_id", jobIdNum);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Transform the data to flatten the join result
  const items = (data ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    jobId: item.job_id,
    jobTitle: item.jobs ? (item.jobs.title_en || item.jobs.title_ar || '') : '',
    status: item.status,
    appliedAt: item.applied_at,
    createdAt: item.created_at,
  }));

  return NextResponse.json({ items });
}

