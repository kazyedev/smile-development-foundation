import { supabaseServer } from "@/lib/supabase/server";

// Check user role
export async function requireRole(role: string) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Assume role is stored in user metadata
  if (user.user_metadata.role !== role) throw new Error("Forbidden");

  return user;
}

export async function uploadFile(bucket: string, path: string, file: File) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  return data.fullPath;
}


// Delete old file from bucket
export async function deleteFile(bucket: string, path: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export async function deleteFolder(bucket: string, path: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

