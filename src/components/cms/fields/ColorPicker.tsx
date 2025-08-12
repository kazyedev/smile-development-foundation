"use client";

import { Input } from "@/components/ui/input";

export default function ColorPicker({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const v = value ?? "#000000";
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={v} onChange={(e) => onChange(e.target.value)} />
      <Input value={v} onChange={(e) => onChange(e.target.value)} placeholder="#000000" />
    </div>
  );
}


