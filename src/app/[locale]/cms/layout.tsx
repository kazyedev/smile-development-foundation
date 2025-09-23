"use client";

import { ReactNode, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/auth-provider";
import {
  Sun,
  Moon,
  Languages,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Image,
  BarChart3,
  Globe
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface CMSLayoutProps {
  children: ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const isArabic = locale === "ar";

  const translations = {
    en: {
      dashboard: "Dashboard",
      users: "Users",
      content: "Content",
      media: "Media",
      analytics: "Analytics",
      settings: "Settings",
      logout: "Logout",
      toggleTheme: "Toggle theme",
      switchLanguage: "Switch language",
      toggleSidebar: "Toggle sidebar"
    },
    ar: {
      dashboard: "لوحة التحكم",
      users: "المستخدمين",
      content: "المحتوى",
      media: "الوسائط",
      analytics: "التحليلات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      toggleTheme: "تبديل المظهر",
      switchLanguage: "تبديل اللغة",
      toggleSidebar: "تبديل الشريط الجانبي"
    }
  } as const;

  const t = isArabic ? translations.ar : translations.en;

  const handleLanguageSwitch = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  };

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}/login`);
  };

  const sidebarItems = useMemo(() => ([
    { icon: LayoutDashboard, label: t.dashboard, href: `/${locale}/cms/dashboard` },
    { icon: Users,            label: t.users,     href: `/${locale}/cms/users`     },
    { icon: FileText,         label: t.content,   href: `/${locale}/cms/content`   },
    { icon: Image,            label: t.media,     href: `/${locale}/cms/media`     },
    { icon: BarChart3,        label: t.analytics, href: `/${locale}/cms/analytics` },
    { icon: Settings,         label: t.settings,  href: `/${locale}/cms/settings`  },
  ]), [locale, t.dashboard, t.users, t.content, t.media, t.analytics, t.settings]);

  if (!mounted) {
    return null; // Avoid hydration issues with theme
  }

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside
        className={`fixed inset-y-0 z-50 w-64 transform transition-transform duration-200 ease-in-out
          ${isArabic ? 'right-0' : 'left-0'}
          ${sidebarOpen ? 'translate-x-0' : isArabic ? 'translate-x-full' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
          bg-card border-border ${isArabic ? 'lg:border-l' : 'lg:border-r'}
          flex flex-col overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-foreground">CMS</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label={t.toggleSidebar}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${active
                    ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content (offset for desktop sidebar) */}
      <div className={`${isArabic ? 'lg:pr-64' : 'lg:pl-64'} min-h-screen flex flex-col min-w-0`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Left side - Mobile menu button */}
            <div className="flex items-center gap-4 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label={t.toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-foreground truncate">
                {t.dashboard}
              </h1>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Language Switch */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageSwitch}
                aria-label={t.switchLanguage}
                className="hover:bg-muted"
              >
                <Languages className="w-4 h-4" />
                <span className="ml-2 hidden sm:inline text-sm font-medium">
                  {locale.toUpperCase()}
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label={t.toggleTheme}
                className="hover:bg-muted"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                aria-label={t.logout}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span className="ml-2 text-sm font-medium hidden md:inline">
                  {t.logout}
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
