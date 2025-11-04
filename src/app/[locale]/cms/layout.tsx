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
  Globe,
  ChevronDown,
  ChevronRight,
  Folder,
  Video,
  BookOpen,
  Newspaper,
  Mail,
  Heart,
  Briefcase,
  UserPlus,
  HelpCircle,
  Home,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { routeToSection, hasSectionAccess, extractSectionNames } from "@/lib/utils/section-mapping";

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
  const [userProfile, setUserProfile] = useState<any>(null);
  const [allowedSections, setAllowedSections] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string>('');

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user profile and extract allowed sections
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profRes = await fetch("/api/auth/profile", { cache: "no-store" });
        if (profRes.ok) {
          const profileData = await profRes.json();
          if (profileData.profile) {
            setUserProfile(profileData.profile);
            setUserRole(profileData.profile.role || '');
            
            // Extract section names from allowedSections array
            const sections = extractSectionNames(profileData.profile.allowed_sections || []);
            setAllowedSections(sections);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const isArabic = locale === "ar";

  const translations = {
    en: {
      dashboard: "Dashboard",
      programs: "Programs",
      projects: "Projects",
      projectCategories: "Project Categories",
      donations: "Donations",

      mediaGroup: "Media",
      videos: "Videos",
      images: "Images",
      publications: "Publications",
      reports: "Reports",
      activities: "Activities",
      successStories: "Success Stories",
      mediaCategories: "Media Categories",

      newsGroup: "News",
      news: "News",
      newsCategories: "News Categories",
      newsletters: "Newsletters",
      newsletterMembers: "Newsletter Members",

      hrGroup: "HR",
      jobs: "Jobs",
      jobApplications: "Job Applications",
      volunteerRequests: "Volunteer Requests",

      websiteDataGroup: "Website Data",
      homeSlides: "Home Page Slides",
      faqs: "FAQs",

      foundationInfoGroup: "Foundation Info",
      team: "Team",

      myProfile: "My Profile",

      logout: "Logout",
      toggleTheme: "Toggle theme",
      switchLanguage: "Switch language",
      toggleSidebar: "Toggle sidebar"
    },
    ar: {
      dashboard: "لوحة التحكم",
      programs: "البرامج",
      projects: "المشاريع",
      projectCategories: "تصنيفات المشاريع",
      donations: "التبرعات",

      mediaGroup: "الوسائط",
      videos: "الفيديوهات",
      images: "الصور",
      publications: "المنشورات",
      reports: "التقارير",
      activities: "الأنشطة",
      successStories: "قصص النجاح",
      mediaCategories: "تصنيفات الوسائط",

      newsGroup: "الأخبار",
      news: "الأخبار",
      newsCategories: "تصنيفات الأخبار",
      newsletters: "النشرات البريدية",
      newsletterMembers: "مشتركو النشرة",

      hrGroup: "الموارد البشرية",
      jobs: "الوظائف",
      jobApplications: "طلبات التوظيف",
      volunteerRequests: "طلبات التطوع",

      websiteDataGroup: "بيانات الموقع",
      homeSlides: "شرائح الصفحة الرئيسية",
      faqs: "الأسئلة الشائعة",

      foundationInfoGroup: "معلومات المؤسسة",
      team: "الفريق",

      myProfile: "حسابي",

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

  type LinkItem = { type: 'link'; icon: any; label: string; href: string };
  type GroupItem = { type: 'group'; key: string; icon: any; label: string; children: LinkItem[] };
  type SidebarItem = LinkItem | GroupItem;

  const allSidebarItems: SidebarItem[] = useMemo(() => ([
    { type: 'link', icon: LayoutDashboard, label: t.dashboard, href: `/${locale}/cms/dashboard` },
    { type: 'link', icon: Folder,          label: t.programs,  href: `/${locale}/cms/programs`  },
    { type: 'link', icon: FileText,        label: t.projects,  href: `/${locale}/cms/projects`  },
    { type: 'link', icon: Folder,          label: t.projectCategories, href: `/${locale}/cms/project-categories` },

    {
      type: 'group', key: 'media', icon: Image, label: t.mediaGroup, children: [
        { type: 'link', icon: Video,     label: t.videos,          href: `/${locale}/cms/media/videos` },
        { type: 'link', icon: Image,     label: t.images,          href: `/${locale}/cms/media/images` },
        { type: 'link', icon: BookOpen,  label: t.publications,    href: `/${locale}/cms/media/publications` },
        { type: 'link', icon: FileText,  label: t.reports,         href: `/${locale}/cms/media/reports` },
        { type: 'link', icon: HelpCircle,label: t.activities,      href: `/${locale}/cms/media/activities` },
        { type: 'link', icon: BookOpen,  label: t.successStories,  href: `/${locale}/cms/media/success-stories` },
        { type: 'link', icon: Folder,    label: t.mediaCategories, href: `/${locale}/cms/media/categories` },
      ]
    },

    {
      type: 'group', key: 'news', icon: Newspaper, label: t.newsGroup, children: [
        { type: 'link', icon: Newspaper, label: t.news,              href: `/${locale}/cms/news/news` },
        { type: 'link', icon: Folder,    label: t.newsCategories,    href: `/${locale}/cms/news/categories` },
        { type: 'link', icon: Mail,      label: t.newsletters,       href: `/${locale}/cms/news/newsletters` },
        { type: 'link', icon: Users,     label: t.newsletterMembers, href: `/${locale}/cms/news/newsletter-members` },
      ]
    },

    { type: 'link', icon: Heart, label: t.donations, href: `/${locale}/cms/donations` },

    {
      type: 'group', key: 'hr', icon: Users, label: t.hrGroup, children: [
        { type: 'link', icon: Briefcase, label: t.jobs,              href: `/${locale}/cms/hr/jobs` },
        { type: 'link', icon: UserPlus,  label: t.jobApplications,   href: `/${locale}/cms/hr/job-applications` },
        { type: 'link', icon: HelpCircle,label: t.volunteerRequests, href: `/${locale}/cms/hr/volunteer-requests` },
      ]
    },

    {
      type: 'group', key: 'website-data', icon: Home, label: t.websiteDataGroup, children: [
        { type: 'link', icon: Home,       label: t.homeSlides, href: `/${locale}/cms/website-data/home-slides` },
        { type: 'link', icon: HelpCircle, label: t.faqs,       href: `/${locale}/cms/website-data/faqs` },
      ]
    },

    {
      type: 'group', key: 'foundation-info', icon: Users, label: t.foundationInfoGroup, children: [
        { type: 'link', icon: Users, label: t.team, href: `/${locale}/cms/foundation-info/team` },
      ]
    },
  ]), [locale, t]);

  // Filter sidebar items based on user permissions
  const sidebarItems: SidebarItem[] = useMemo(() => {
    // Filter sidebar items based on user permissions
    const filterItems = (items: SidebarItem[]): SidebarItem[] => {
      return items
        .map(item => {
          if (item.type === 'link') {
            const section = routeToSection(item.href);
            if (hasSectionAccess(section, userRole, allowedSections)) {
              return item;
            }
            return null;
          }
          
          if (item.type === 'group') {
            const filteredChildren = item.children.filter(child => {
              const section = routeToSection(child.href);
              return hasSectionAccess(section, userRole, allowedSections);
            });
            
            // Only include group if it has visible children
            if (filteredChildren.length > 0) {
              return {
                ...item,
                children: filteredChildren
              };
            }
            return null;
          }
          
          return null;
        })
        .filter((item): item is SidebarItem => item !== null);
    };

    return filterItems(allSidebarItems);
  }, [allSidebarItems, userRole, allowedSections]);

  // Track which groups are open
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    ["media", "news", "hr", "website-data", "foundation-info"].forEach((key) => {
      if (pathname?.startsWith(`/${locale}/cms/${key}`)) initial[key] = true;
    });
    setOpenGroups(initial);
  }, [pathname, locale]);

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
          lg:translate-x-0
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
            if (item.type === 'link') {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;
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
            }

            // Group item
            const groupOpen = !!openGroups[item.key];
            const toggle = () => setOpenGroups((prev) => ({ ...prev, [item.key]: !prev[item.key] }));
            const GroupIcon = item.icon;
            return (
              <div key={item.key} className="space-y-1">
                <button
                  type="button"
                  onClick={toggle}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${groupOpen ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                  aria-expanded={groupOpen}
                >
                  <span className="flex items-center gap-3">
                    <GroupIcon className="w-4 h-4" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {groupOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {groupOpen && (
                  <div className="ml-6 space-y-1">
                    {item.children.map((child) => {
                      const active = pathname?.startsWith(child.href);
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`
                            flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors
                            ${active
                              ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                          `}
                        >
                          <ChildIcon className="w-4 h-4" />
                          <span className="truncate">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* My Profile Link */}
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href={`/${locale}/cms/my-profile`}
              className={`
                flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${pathname?.startsWith(`/${locale}/cms/my-profile`)
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
              `}
            >
              <User className="w-4 h-4" />
              <span className="truncate">{t.myProfile}</span>
            </Link>
          </div>
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
      <div className={`${isArabic ? 'lg:mr-64' : 'lg:ml-64'} min-h-screen flex flex-col min-w-0`}>
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
