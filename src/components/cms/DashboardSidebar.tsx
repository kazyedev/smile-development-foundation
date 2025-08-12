"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export default function DashboardSidebar() {
  const { locale } = useParams<{ locale: string }>()
  const pathname = usePathname()
  const isAr = locale === "ar"

  const t = {
    dashboard: isAr ? "لوحة التحكم" : "Dashboard",
    foundation: isAr ? "الملف التعريفي" : "Foundation Profile",
    programs: isAr ? "البرامج" : "Programs",
    projects: isAr ? "المشاريع" : "Projects",
    activities: isAr ? "الأنشطة" : "Activities",
    partners: isAr ? "الشركاء" : "Partners",
    contact: isAr ? "معلومات الاتصال" : "Contact Info",
    donations: isAr ? "معلومات التبرعات" : "Donations Info",
    faqs: isAr ? "الأسئلة الشائعة" : "FAQs",
    media: isAr ? "الوسائط" : "Media",
    photos: isAr ? "الصور" : "Photos",
    videos: isAr ? "الفيديوهات" : "Videos",
    reports: isAr ? "التقارير" : "Reports",
    stories: isAr ? "قصص النجاح" : "Success Stories",
    news: isAr ? "الأخبار" : "News",
    newsCategories: isAr ? "تصنيفات الأخبار" : "News Categories",
    emailNewsletters: isAr ? "النشرات البريدية" : "Email Newsletter",
    statics: isAr ? "الإحصائيات" : "Statics",
    admins: isAr ? "المديرون" : "Admins",
    myProfile: isAr ? "حسابي" : "My Profile",
    logout: isAr ? "تسجيل الخروج" : "Logout",
  }

  const base = `/${locale}/cms`

  const groups = [
    {
      label: "",
      items: [
        { label: t.dashboard, href: `${base}/dashboard` },
      ],
    },
    {
      label: t.foundation,
      items: [
        { label: t.foundation, href: `${base}/identity/foundation-profile` },
        { label: t.programs, href: `${base}/Initiatives/programs` },
        { label: t.projects, href: `${base}/Initiatives/projects` },
        { label: t.activities, href: `${base}/Initiatives/activities` },
        { label: t.partners, href: `${base}/identity/partners` },
        { label: t.contact, href: `${base}/identity/contact-info` },
        { label: t.donations, href: `${base}/identity/donations-info` },
        { label: t.faqs, href: `${base}/identity/faqs` },
      ],
    },
    {
      label: t.media,
      items: [
        { label: t.photos, href: `${base}/media/photo` },
        { label: t.videos, href: `${base}/media/videos` },
        { label: t.reports, href: `${base}/media/reports` },
        { label: t.stories, href: `${base}/media/success-stories` },
        { label: t.news, href: `${base}/content/news` },
        { label: t.newsCategories, href: `${base}/content/news-categories` },
        { label: t.emailNewsletters, href: `${base}/content/email-newsletters` },
      ],
    },
    {
      label: "",
      items: [
        { label: t.statics, href: `${base}/statics` },
        { label: t.admins, href: `${base}/identity/admin-accounts` },
        { label: t.myProfile, href: `${base}/my-profile` },
        { label: t.logout, href: `${base}/logout` },
      ],
    },
  ]

  function isActive(href: string) {
    if (!pathname) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  async function onLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = `/${locale}`
    } catch {}
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {groups.map((group, gi) => (
          <SidebarGroup key={gi}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    {item.label === t.logout ? (
                      <SidebarMenuButton
                        isActive={false}
                        asChild={false}
                        onClick={onLogout}
                      >
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton asChild isActive={isActive(item.href)}>
                        <Link href={item.href}>{item.label}</Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            {gi < groups.length - 1 && <SidebarSeparator />}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}