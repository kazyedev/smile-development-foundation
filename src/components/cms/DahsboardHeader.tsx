"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams } from "next/navigation"

export default function CMSHeader() {
  const { locale } = useParams<{ locale: string }>()
  const isAr = locale === "ar"
  const t = {
    title: isAr ? "لوحة التحكم" : "Dashboard",
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center gap-2 border-b bg-background/80 px-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-4">
      <SidebarTrigger className="md:hidden" />
      <div className="font-medium">{t.title}</div>
    </header>
  )
}