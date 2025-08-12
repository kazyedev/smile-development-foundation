"use client";

import { useMemo } from "react";
import * as Icons from "lucide-react";
import { Input } from "@/components/ui/input";

export type IconPickerProps = {
  value?: string;
  onChange: (iconName: string) => void;
};

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const all = useMemo(
    () => Object.keys(Icons).filter((k) => /^[A-Z]/.test(k)).slice(0, 200),
    []
  );
  const CurrentIcon = (value && (Icons as any)[value]) || Icons.Circle;

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <CurrentIcon className="size-5" />
        <Input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Icon name (e.g., BookOpen)"
        />
      </div>
      <div className="grid max-h-40 grid-cols-8 gap-2 overflow-auto rounded-md border p-2">
        {all.map((key) => {
          const Comp = (Icons as any)[key];
          return (
            <button
              key={key}
              type="button"
              className="flex items-center justify-center rounded border p-2 hover:bg-accent"
              onClick={() => onChange(key)}
            >
              <Comp className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}


