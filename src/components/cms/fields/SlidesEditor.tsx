"use client";

import { Button } from "@/components/ui/button";
import ImagePicker from "./ImagePicker";
import { Input } from "@/components/ui/input";

export type Slide = { titleEn: string; titleAr: string; imageUrl: string };

export default function SlidesEditor({ value, onChange }: { value?: Slide[]; onChange: (v: Slide[]) => void }) {
  const list: Slide[] = value ?? [];
  function setList(next: Slide[]) { onChange(next); }
  return (
    <div className="space-y-3">
      {list.map((item, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-2 rounded-md border p-3 md:grid-cols-3">
          <div>
            <ImagePicker value={item.imageUrl} onChange={(url) => { const n=[...list]; n[idx]={...n[idx], imageUrl:url}; setList(n); }} />
          </div>
          <div className="grid gap-2">
            <Input placeholder="Title EN" value={item.titleEn} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], titleEn:e.target.value}; setList(n); }} />
            <Input placeholder="العنوان AR" value={item.titleAr} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], titleAr:e.target.value}; setList(n); }} />
          </div>
          <div className="flex items-start justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => { const n=list.filter((_, i) => i !== idx); setList(n); }}>Remove</Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => setList([...(list ?? []), { titleEn: "", titleAr: "", imageUrl: "" }])}>+ Slide</Button>
    </div>
  );
}


