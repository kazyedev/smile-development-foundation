"use client";

import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/lib/supabase/client";

async function uploadToBucket(file: File, bucket = "media"): Promise<string | null> {
  try {
    const supabase = supabaseClient();
    const ext = file.name.split(".").pop() || "bin";
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function ImagePicker({ value, onChange, bucket }: { value?: string; onChange: (url: string) => void; bucket?: string }) {
  return (
    <div className="grid gap-2">
      {value ? (
        <img src={value} alt="preview" className="h-28 w-28 rounded object-cover" />
      ) : (
        <div className="h-28 w-28 rounded border bg-muted" />
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const uploaded = await uploadToBucket(f, bucket);
          if (uploaded) onChange(uploaded);
        }}
      />
    </div>
  );
}


