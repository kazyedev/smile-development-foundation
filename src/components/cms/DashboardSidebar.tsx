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
import {
  LayoutDashboard,
  Building2,
  Lightbulb,
  FolderOpen,
  Calendar,
  Handshake,
  Phone,
  Heart,
  HelpCircle,
  Image,
  Video,
  FileText,
  Trophy,
  Newspaper,
  Tags,
  Mail,
  BarChart3,
  Users,
  User,
  LogOut,
  ChevronRight,
  Settings,
  Plus,
  Search
} from "lucide-react"
import { motion } from "framer-motion"

interface DashboardSidebarProps {
  userProfile: any;
  locale: string;
}

export default function DashboardSidebar({ userProfile, locale }: DashboardSidebarProps) {
  const pathname = usePathname()
  const urlParams = useParams()

  // Get locale from props or fallback to URL params
  const currentLocale = locale || urlParams.locale || 'en'
  const isAr = currentLocale === "ar"

  // Debug logging
  console.log("DashboardSidebar props:", { userProfile, locale })
  console.log("DashboardSidebar URL params:", urlParams)
  console.log("DashboardSidebar currentLocale:", currentLocale)
  console.log("DashboardSidebar isAr:", isAr)

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
    statistics: isAr ? "الإحصائيات" : "Statistics",
    admins: isAr ? "المديرون" : "Admins",
    myProfile: isAr ? "حسابي" : "My Profile",
    logout: isAr ? "تسجيل الخروج" : "Logout",
    settings: isAr ? "الإعدادات" : "Settings",
    quickActions: isAr ? "إجراءات سريعة" : "Quick Actions",
    addNew: isAr ? "إضافة جديد" : "Add New",
    search: isAr ? "بحث" : "Search",
    welcome: isAr ? "مرحباً" : "Welcome",
    role: isAr ? "الدور" : "Role",
    admin: isAr ? "مدير" : "Admin",
    user: isAr ? "مستخدم" : "User",
  }

  const base = `/${currentLocale}/cms`

  const navigationGroups = [
    {
      label: t.quickActions,
      items: [
        {
          label: t.dashboard,
          href: `${base}/dashboard`,
          icon: LayoutDashboard,
          badge: null
        },
        // { 
        //   label: t.addNew, 
        //   href: `${base}/create`,
        //   icon: Plus,
        //   badge: "New"
        // },
      ],
    },
    {
      label: t.foundation,
      items: [
        {
          label: t.foundation,
          href: `${base}/identity/foundation-profile`,
          icon: Building2,
          badge: null
        },
        {
          label: t.programs,
          href: `${base}/Initiatives/programs`,
          icon: Lightbulb,
          badge: null
        },
        {
          label: t.projects,
          href: `${base}/Initiatives/projects`,
          icon: FolderOpen,
          badge: null
        },
        {
          label: t.activities,
          href: `${base}/Initiatives/activities`,
          icon: Calendar,
          badge: null
        },
        {
          label: t.partners,
          href: `${base}/identity/partners`,
          icon: Handshake,
          badge: null
        },
        {
          label: t.contact,
          href: `${base}/identity/contact-info`,
          icon: Phone,
          badge: null
        },
        {
          label: t.donations,
          href: `${base}/identity/donations-info`,
          icon: Heart,
          badge: null
        },
        {
          label: t.faqs,
          href: `${base}/identity/faqs`,
          icon: HelpCircle,
          badge: null
        },
      ],
    },
    {
      label: t.media,
      items: [
        {
          label: t.photos,
          href: `${base}/media/photo`,
          icon: Image,
          badge: null
        },
        {
          label: t.videos,
          href: `${base}/media/videos`,
          icon: Video,
          badge: null
        },
        {
          label: t.reports,
          href: `${base}/media/reports`,
          icon: FileText,
          badge: null
        },
        {
          label: t.stories,
          href: `${base}/media/success-stories`,
          icon: Trophy,
          badge: null
        },
        {
          label: t.news,
          href: `${base}/content/news`,
          icon: Newspaper,
          badge: null
        },
        {
          label: t.newsCategories,
          href: `${base}/content/news-categories`,
          icon: Tags,
          badge: null
        },
        {
          label: t.emailNewsletters,
          href: `${base}/content/email-newsletters`,
          icon: Mail,
          badge: null
        },
      ],
    },
    {
      label: t.statistics,
      items: [
        {
          label: t.statistics,
          href: `${base}/statistics`,
          icon: BarChart3,
          badge: null
        },
        {
          label: t.admins,
          href: `${base}/identity/admin-accounts`,
          icon: Users,
          badge: null
        },
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
      window.location.href = `/${currentLocale}`
    } catch { }
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  // Sidebar positioning based on locale
  const sidebarClasses = isAr
    ? "border-l border-border/40 bg-gradient-to-l from-background via-muted/5 to-background"
    : "border-r border-border/40 bg-gradient-to-r from-background via-muted/5 to-background"

  return (
    <Sidebar className={`${sidebarClasses} ${isAr ? 'right-0 left-auto' : 'left-0 right-auto'} `} dir={`${locale == "en" ? "ltr" : "rtl"}`}>
      {/* User Profile Header */}
      <SidebarHeader className="p-4 border-b border-border/40">
        <motion.div
          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {userProfile?.full_name ? getInitials(userProfile.full_name) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userProfile?.full_name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userProfile?.email || 'user@example.com'}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                {userProfile?.role === 'admin' ? t.admin : t.user}
              </span>
            </div>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Search Bar */}
        {/* <motion.div 
          className="mb-6"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all"
            />
          </div>
        </motion.div> */}

        {/* Navigation Groups */}
        {navigationGroups.map((group, gi) => (
          <motion.div
            key={gi}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: gi * 0.1 }}
          >
            <SidebarGroup>
              {group.label && (
                <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, ii) => {
                    const Icon = item.icon
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.href)}
                          className="group relative"
                        >
                          <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted/80 active:bg-muted">
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-brand-primary transition-colors" />
                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-brand-primary/20 text-brand-primary rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-brand-primary transition-colors opacity-0 group-hover:opacity-100" />
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {gi < navigationGroups.length - 1 && <SidebarSeparator className="my-4" />}
          </motion.div>
        ))}

        {/* Bottom Actions */}
        <motion.div
          className="mt-6 space-y-2"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false}>
                <Link href={`${base}/my-profile`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted/80">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t.myProfile}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={false}>
                <Link href={`${base}/settings`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted/80">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t.settings}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={false}
                asChild={false}
                onClick={onLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-600 text-red-500"
              >
                <span className="flex items-center gap-3">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.logout}</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </motion.div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}