"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Globe,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Navigation() {
  const { locale } = useParams<{ locale: string }>();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isEnglish = locale === "en";

  const navigation = {
    en: {
      home: "Home",
      about: "About",
      programs: "Programs",
      projects: "Projects",
      news: "News",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      language: "Language"
    },
    ar: {
      home: "الرئيسية",
      about: "من نحن",
      programs: "البرامج",
      projects: "المشاريع",
      news: "الأخبار",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      dashboard: "لوحة التحكم",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      language: "اللغة"
    }
  };

  const t = isEnglish ? navigation.en : navigation.ar;

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    window.location.href = `/${newLocale}`;
  };

  if (isLoading) {
    return (
      <nav className="bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="w-32 h-8 bg-muted animate-pulse rounded"></div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg"></div>
            <span className="font-bold text-xl bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {isEnglish ? "Ibtisama" : "ابتسامة"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}`} className="text-foreground hover:text-brand-primary transition-colors">
              {t.home}
            </Link>
            <Link href={`/${locale}/about-us`} className="text-foreground hover:text-brand-primary transition-colors">
              {t.about}
            </Link>
            <Link href={`/${locale}/programs`} className="text-foreground hover:text-brand-primary transition-colors">
              {t.programs}
            </Link>
            <Link href={`/${locale}/projects`} className="text-foreground hover:text-brand-primary transition-colors">
              {t.projects}
            </Link>
            <Link href={`/${locale}/news`} className="text-foreground hover:text-brand-primary transition-colors">
              {t.news}
            </Link>
            <Link href={`/${locale}/contact`} className="text-foreground hover:text-brand-primary transition-colors">
              {t.contact}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="w-9 h-9 p-0"
            >
              <Globe className="w-4 h-4" />
            </Button>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link href={`/${locale}/login`}>
                  <Button variant="ghost" size="sm">
                    {t.login}
                  </Button>
                </Link>
                <Link href={`/${locale}/signup`}>
                  <Button size="sm" className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                    {t.signup}
                  </Button>
                </Link>
              </div>
            ) : (
              /* User Menu */
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.email}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    <Link href={`/${locale}/cms`}>
                      <div className="px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>{t.dashboard}</span>
                      </div>
                    </Link>
                    <Link href={`/${locale}/profile`}>
                      <div className="px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{t.profile}</span>
                      </div>
                    </Link>
                    <div className="border-t border-border my-1"></div>
                    <div
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-600 hover:bg-muted cursor-pointer flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.logout}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 p-0"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col space-y-4">
              <Link href={`/${locale}`} className="text-foreground hover:text-brand-primary transition-colors">
                {t.home}
              </Link>
              <Link href={`/${locale}/about-us`} className="text-foreground hover:text-brand-primary transition-colors">
                {t.about}
              </Link>
              <Link href={`/${locale}/programs`} className="text-foreground hover:text-brand-primary transition-colors">
                {t.programs}
              </Link>
              <Link href={`/${locale}/projects`} className="text-foreground hover:text-brand-primary transition-colors">
                {t.projects}
              </Link>
              <Link href={`/${locale}/news`} className="text-foreground hover:text-brand-primary transition-colors">
                {t.news}
              </Link>
              <Link href={`/${locale}/contact`} className="text-foreground hover:text-brand-primary transition-colors">
                {t.contact}
              </Link>

              <div className="border-t border-border/40 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-9 h-9 p-0"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="w-9 h-9 p-0"
                  >
                    <Globe className="w-4 h-4" />
                  </Button>
                </div>

                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link href={`/${locale}/login`}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t.login}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/signup`}>
                      <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                        {t.signup}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href={`/${locale}/cms`}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        {t.dashboard}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t.logout}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
