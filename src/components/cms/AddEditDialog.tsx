"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import IconPicker from "./fields/IconPicker"
import ColorPicker from "./fields/ColorPicker"
import ImagePicker from "./fields/ImagePicker"
import RichText from "./fields/RichText"
import SlidesEditor from "./fields/SlidesEditor"
import StaticsEditor from "./fields/StaticsEditor"

type SectionField =
  | { type: "text"; name: string; label: string; placeholder?: string; required?: boolean }
  | { type: "textarea"; name: string; label: string; placeholder?: string; required?: boolean }
  | { type: "array:text"; name: string; label: string; placeholder?: string }
  | { type: "json"; name: string; label: string; hint?: string }
  | { type: "boolean"; name: string; label: string }
  | { type: "richtext"; name: string; label: string; placeholder?: string }
  | { type: "icon"; name: string; label: string }
  | { type: "color"; name: string; label: string }
  | { type: "image"; name: string; label: string; bucket?: string }
  | { type: "slides"; name: string; label: string }
  | { type: "statics"; name: string; label: string }

type AddEditDialogProps<T extends Record<string, any>> = {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  sections: Array<{
    id: string
    title: string
    fields: SectionField[]
  }>
  initial?: Partial<T>
  onSubmit: (values: T) => Promise<void> | void
}

export default function AddEditDialog<T extends Record<string, any>>({
  open,
  onOpenChange,
  title,
  sections,
  initial,
  onSubmit,
}: AddEditDialogProps<T>) {
  const [values, setValues] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [activeLang, setActiveLang] = useState<"en" | "ar">("en")
  const isMobile = useIsMobile()

  useEffect(() => {
    setValues(initial ?? {})
  }, [initial])

  function setValue(name: string, value: any) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function handleSubmit() {
    setSaving(true)
    try {
      await onSubmit(values as T)
      // keep dialog open; caller decides whether to close
    } finally {
      setSaving(false)
    }
  }

  const content = (
    <div className="mt-2 space-y-6">
      {/* Language Tabs */}
      <div className="flex items-center gap-2">
        <Button type="button" size="sm" variant={activeLang === 'en' ? 'default' : 'outline'} onClick={() => setActiveLang('en')}>English</Button>
        <Button type="button" size="sm" variant={activeLang === 'ar' ? 'default' : 'outline'} onClick={() => setActiveLang('ar')}>العربية</Button>
      </div>
      {sections.map((section) => (
        <div key={section.id} className="space-y-3">
          <div className="text-sm font-medium opacity-70">{section.title}</div>
          <div className="grid grid-cols-1 gap-3">
            {section.fields.map((field) => {
              const key = `${section.id}.${field.name}`
              const isBilingual = /_(en|ar)$/.test(field.name)
              if (isBilingual) {
                const suffix = field.name.endsWith('_en') ? 'en' : 'ar'
                if (suffix !== activeLang) return null
              }
              if (field.type === "text")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <Input
                      placeholder={field.placeholder}
                      required={field.required}
                      value={values[field.name] ?? ""}
                      onChange={(e) => setValue(field.name, e.target.value)}
                    />
                  </div>
                )
              if (field.type === "textarea")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <Textarea
                      rows={5}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={values[field.name] ?? ""}
                      onChange={(e) => setValue(field.name, e.target.value)}
                    />
                  </div>
                )
              if (field.type === "richtext")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <RichText value={values[field.name] ?? ""} onChange={(html) => setValue(field.name, html)} />
                  </div>
                )
              if (field.type === "array:text")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <div className="space-y-2">
                      {(values[field.name] ?? [""]).map((val: string, idx: number) => (
                        <div className="flex gap-2" key={idx}>
                          <Input
                            value={val}
                            onChange={(e) => {
                              const next = [...(values[field.name] ?? [""])]
                              next[idx] = e.target.value
                              setValue(field.name, next)
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              const next = (values[field.name] ?? [""]).filter((_: string, i: number) => i !== idx)
                              setValue(field.name, next.length ? next : [""])
                            }}
                          >
                            −
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setValue(field.name, [...(values[field.name] ?? [""]), ""])}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )
              if (field.type === "json")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <Textarea
                      rows={6}
                      placeholder={field.hint ?? '{ "items": [] }'}
                      value={JSON.stringify(values[field.name] ?? [], null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value)
                          setValue(field.name, parsed)
                        } catch {
                          // keep value as-is
                        }
                      }}
                    />
                  </div>
                )
              if (field.type === "boolean")
                return (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(e) => setValue(field.name, e.target.checked)}
                    />
                    {field.label}
                  </label>
                )
              if (field.type === "icon")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <IconPicker value={values[field.name] ?? ""} onChange={(v) => setValue(field.name, v)} />
                  </div>
                )
              if (field.type === "color")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <ColorPicker value={values[field.name]} onChange={(v) => setValue(field.name, v)} />
                  </div>
                )
              if (field.type === "image")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <ImagePicker value={values[field.name]} bucket={(field as any).bucket} onChange={(url) => setValue(field.name, url)} />
                  </div>
                )
              if (field.type === "slides")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <SlidesEditor value={values[field.name]} onChange={(v) => setValue(field.name, v)} />
                  </div>
                )
              if (field.type === "statics")
                return (
                  <div key={key} className="grid gap-1.5">
                    <label className="text-xs font-medium">{field.label}</label>
                    <StaticsEditor value={values[field.name]} onChange={(v) => setValue(field.name, v)} />
                  </div>
                )
              return null
            })}
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 bg-background pt-2">
        <div className="flex justify-end gap-2 border-t pt-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>{"Close"}</Button>
          <Button onClick={handleSubmit} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    )
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={(e) => e.stopPropagation()} />
      <div className="relative z-10 mx-4 w-full max-w-5xl rounded-lg border bg-background shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <div className="text-lg font-semibold">{title}</div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>✕</Button>
        </div>
        <div className="max-h-[80svh] overflow-y-auto p-4">{content}</div>
      </div>
    </div>
  )
}

// NOTE: End of component.
