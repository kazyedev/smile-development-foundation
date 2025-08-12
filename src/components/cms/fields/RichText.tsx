"use client";

import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";

export default function RichText({
  value,
  onChange,
}: {
  value?: string;
  onChange: (html: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  function exec(cmd: string, arg?: string) {
    document.execCommand(cmd, false, arg);
    editorRef.current?.focus();
    // Propagate changes triggered by toolbar actions
    requestAnimationFrame(() => {
      onChange(editorRef.current?.innerHTML || "");
    });
  }

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="grid gap-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 rounded-md border p-2 bg-background text-xs">
        {/* Basic formatting */}
        <Button size="sm" variant="outline" onClick={() => exec("bold")}>B</Button>
        <Button size="sm" variant="outline" onClick={() => exec("italic")}>I</Button>
        <Button size="sm" variant="outline" onClick={() => exec("underline")}>U</Button>
        <Button size="sm" variant="outline" onClick={() => exec("strikeThrough")}>S</Button>
        <Button size="sm" variant="outline" onClick={() => exec("subscript")}>x₂</Button>
        <Button size="sm" variant="outline" onClick={() => exec("superscript")}>x²</Button>

        {/* Headings */}
        <Button size="sm" variant="outline" onClick={() => exec("formatBlock", "H2")}>H2</Button>
        <Button size="sm" variant="outline" onClick={() => exec("formatBlock", "H3")}>H3</Button>

        {/* Lists */}
        <Button size="sm" variant="outline" onClick={() => exec("insertUnorderedList")}>• List</Button>
        <Button size="sm" variant="outline" onClick={() => exec("insertOrderedList")}>1. List</Button>

        {/* Links & Images */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const url = prompt("Enter link URL");
            if (url) exec("createLink", url);
          }}
        >
          🔗 Link
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) exec("insertImage", url);
          }}
        >
          🖼 Image
        </Button>

        {/* Table */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const rows = parseInt(prompt("Number of rows?", "2") || "2", 10);
            const cols = parseInt(prompt("Number of columns?", "2") || "2", 10);
            let table = "<table border='1' style='border-collapse: collapse; width: 100%;'>";
            for (let r = 0; r < rows; r++) {
              table += "<tr>";
              for (let c = 0; c < cols; c++) {
                table += "<td style='padding:4px'>Cell</td>";
              }
              table += "</tr>";
            }
            table += "</table>";
            exec("insertHTML", table);
          }}
        >
          Table
        </Button>

        {/* Colors */}
        <input
          type="color"
          className="h-8 w-8 rounded border"
          onChange={(e) => exec("foreColor", e.target.value)}
          title="Text Color"
        />
        <input
          type="color"
          className="h-8 w-8 rounded border"
          onChange={(e) => exec("hiliteColor", e.target.value)}
          title="Highlight Color"
        />

        {/* Clear formatting */}
        <Button size="sm" variant="outline" onClick={() => exec("removeFormat")}>
          Clear
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        className="min-h-40 rounded-md border p-3 bg-background text-foreground prose prose-sm max-w-none dark:prose-invert"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        onBlur={() => onChange(editorRef.current?.innerHTML || "")}
      />
    </div>
  );
}
