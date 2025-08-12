"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IconPicker from "./IconPicker";

export type StaticItem = { icon: string; titleEn: string; titleAr: string; value: number; unitEn: string; unitAr: string };

export default function StaticsEditor({ value, onChange }: { value?: StaticItem[]; onChange: (v: StaticItem[]) => void }) {
  const list: StaticItem[] = value ?? [];
  function setList(next: StaticItem[]) { onChange(next); }
  return (
    <div className="space-y-3">
      {list.map((item, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-2 rounded-md border p-3 md:grid-cols-6">
          <div className="md:col-span-2">
            <IconPicker value={item.icon} onChange={(icon) => { const n=[...list]; n[idx]={...n[idx], icon}; setList(n); }} />
          </div>
          <Input placeholder="Title EN" value={item.titleEn} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], titleEn:e.target.value}; setList(n); }} />
          <Input placeholder="العنوان AR" value={item.titleAr} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], titleAr:e.target.value}; setList(n); }} />
          <Input placeholder="Value" type="number" value={item.value} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], value:Number(e.target.value)||0}; setList(n); }} />
          <div className="grid grid-cols-2 gap-2 md:col-span-2">
            <Input placeholder="Unit EN" value={item.unitEn} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], unitEn:e.target.value}; setList(n); }} />
            <Input placeholder="الوحدة AR" value={item.unitAr} onChange={(e) => { const n=[...list]; n[idx]={...n[idx], unitAr:e.target.value}; setList(n); }} />
          </div>
          <div className="md:col-span-6 flex items-start justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => { const n=list.filter((_, i)=> i!==idx); setList(n); }}>Remove</Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => setList([...(list ?? []), { icon: "Circle", titleEn: "", titleAr: "", value: 0, unitEn: "", unitAr: "" }])}>+ Static</Button>
    </div>
  );
}


